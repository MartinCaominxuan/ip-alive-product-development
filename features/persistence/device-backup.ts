import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

import { BACKUP_KEYS, createBackupPayload, parseBackupPayload, type BackupKey } from "./backup-codec";
import { buildRestorePlan } from "./restore-plan";

const ROLLBACK_KEY = "ip-alive:restore-rollback:v1";
async function readCurrentData() { const pairs = await AsyncStorage.multiGet([...BACKUP_KEYS]); return Object.fromEntries(pairs) as Record<BackupKey, string | null>; }
async function applyPayload(data: Record<BackupKey, string | null>) { const plan=buildRestorePlan(BACKUP_KEYS,data);const sets=plan.filter((item):item is Extract<typeof item,{kind:"set"}>=>item.kind==="set").map((item)=>[item.key,item.value] as [string,string]);if(sets.length)await AsyncStorage.multiSet(sets);for(const item of plan)if(item.kind==="remove")await AsyncStorage.removeItem(item.key); }
export async function exportDeviceBackup() { const payload = createBackupPayload(await readCurrentData()); const file = new File(Paths.cache, `ip-alive-backup-${payload.exportedAt.slice(0, 10)}.json`); if (file.exists) file.delete(); file.create(); file.write(JSON.stringify(payload, null, 2)); if (!await Sharing.isAvailableAsync()) throw new Error("sharing-unavailable"); await Sharing.shareAsync(file.uri, { mimeType: "application/json", UTI: "public.json", dialogTitle: "Export IP Alive backup" }); return payload; }
export async function importDeviceBackup() { const result = await DocumentPicker.getDocumentAsync({ type: "application/json", copyToCacheDirectory: true, multiple: false }); if (result.canceled || !result.assets[0]) return undefined; const file = new File(result.assets[0].uri); if (file.size > 5_000_000) throw new Error("file-too-large"); const payload = parseBackupPayload(file.textSync()); const rollback = createBackupPayload(await readCurrentData()); await AsyncStorage.setItem(ROLLBACK_KEY, JSON.stringify(rollback)); try { await applyPayload(payload.data); } catch (error) { await applyPayload(rollback.data); throw error; } return payload; }
export async function restorePreviousSnapshot() { const raw = await AsyncStorage.getItem(ROLLBACK_KEY); if (!raw) return false; const payload = parseBackupPayload(raw); await applyPayload(payload.data); return true; }
export async function hasRollbackSnapshot() { return Boolean(await AsyncStorage.getItem(ROLLBACK_KEY)); }
export async function clearLocalProductData(){const rollback=createBackupPayload(await readCurrentData());await AsyncStorage.setItem(ROLLBACK_KEY,JSON.stringify(rollback));for(const key of BACKUP_KEYS)await AsyncStorage.removeItem(key);return rollback;}
