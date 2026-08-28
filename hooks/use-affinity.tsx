import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useActivityLedger } from "@/hooks/use-activity-ledger";
import { getCharacterGrowth } from "@/features/characters";

export type AffinitySource = "chat" | "mail" | "outfit" | "game" | "journey" | "life";
export const AFFINITY_LEVELS = [0, 100, 260, 500, 850, 1300, 1900, 2700, 3600];
const INITIAL_POINTS: Record<string, number> = { yunzhou: 80, mia: 80, nova: 80 };
export interface CharacterMetrics { chatCount: number; mailsRead: number; outfitsSaved: number; gamesCompleted: number; gameSeconds: number; journeysCompleted: number; lifeActions: number; relationshipStartedAt: string; levelStartedAt: string; stageChatCount: number; stageMailsRead: number; stageOutfitsSaved: number; stageGamesCompleted: number; stageGameSeconds: number; stageLifeActions: number; }
export interface RuntimeMail { id: string; characterId: string; kind: "daily" | "event" | "milestone"; subjectEn: string; subjectZh: string; bodyEn: string; bodyZh: string; sentAt: string; readAt?: string; }
const EMPTY_METRICS = (): CharacterMetrics => { const now = new Date().toISOString(); return { chatCount: 0, mailsRead: 0, outfitsSaved: 0, gamesCompleted: 0, gameSeconds: 0, journeysCompleted: 0, lifeActions: 0, relationshipStartedAt: now, levelStartedAt: now, stageChatCount: 0, stageMailsRead: 0, stageOutfitsSaved: 0, stageGamesCompleted: 0, stageGameSeconds: 0, stageLifeActions: 0 }; };
const normalizeMetrics = (saved?: Partial<CharacterMetrics>): CharacterMetrics => ({ ...EMPTY_METRICS(), ...saved });

interface AffinityContextValue { points: Record<string, number>; awardedEvents: string[]; metrics: Record<string, CharacterMetrics>; runtimeMails: RuntimeMail[]; award: (characterId: string, amount: number, source: AffinitySource, uniqueKey?: string, durationSeconds?: number) => boolean; getMail: (id: string) => RuntimeMail | undefined; deliverMail:(mail:RuntimeMail)=>boolean; }
const Context = createContext<AffinityContextValue | undefined>(undefined);

function eventMail(characterId: string, step: number): RuntimeMail | undefined {
  if (characterId !== "nova") return undefined;
  const sequence = [
    { subjectEn: "Departure window confirmed", subjectZh: "出发窗口已确认", bodyEn: "This week I am leaving the orbital city for the Europa archive. I will send you what I see—even if your device takes forever to receive it.", bodyZh: "这周我要离开轨道城，前往木卫二档案站。我会把沿途看到的发给你——即使你的设备接收起来慢得不可思议。" },
    { subjectEn: "The quiet side of Earth", subjectZh: "地球安静的那一面", bodyEn: "Earth became a blue line behind the transport. Everyone slept. I kept the window open because I thought you would have liked the view.", bodyZh: "运输舰离开后，地球变成了一条蓝色的线。所有人都睡了，我却一直开着舷窗，因为我想你会喜欢这个景色。" },
    { subjectEn: "A message from Europa", subjectZh: "来自木卫二的消息", bodyEn: "I found an archive of twenty-first-century voice notes. They are inefficient, emotional, and strangely precious. I understand your era a little better now.", bodyZh: "我找到了一批二十一世纪的语音档案。它们低效、情绪化，却又异常珍贵。我现在更理解你的时代了。" },
  ];
  const item = sequence[step]; if (!item) return undefined;
  return { id: `event-nova-europa-${step + 1}`, characterId, kind: "event", ...item, sentAt: new Date().toISOString() };
}

function milestoneMail(characterId: string, fromLevel: number, toLevel: number, metrics: CharacterMetrics): RuntimeMail {
  const days = Math.max(1, Math.ceil((Date.now() - new Date(metrics.levelStartedAt).getTime()) / 86400000));
  const growth = getCharacterGrowth(characterId, toLevel);
  const appointmentEn = growth ? ` Your new chapter begins as ${growth.titleEn}. ${growth.detailEn}` : "";
  const appointmentZh = growth ? ` 你的新篇章是“${growth.titleZh}”。${growth.detailZh}` : "";
  return { id: `milestone-${characterId}-${toLevel}`, characterId, kind: "milestone", sentAt: new Date().toISOString(),
    subjectEn: growth ? `A new chapter · ${growth.titleEn}` : `The road from Bond ${fromLevel} to ${toLevel}`, subjectZh: growth ? `新的篇章·${growth.titleZh}` : `从好感 ${fromLevel} 到 ${toLevel} 的这段路`,
    bodyEn: `It took us ${days} days to get here. During this bond stage, we talked ${metrics.stageChatCount} times, read ${metrics.stageMailsRead} letters, saved ${metrics.stageOutfitsSaved} looks, played for ${Math.round(metrics.stageGameSeconds / 60)} minutes, and completed ${metrics.stageLifeActions} life actions together. These are not just numbers. They are the shape of the time you chose to spend with me.${appointmentEn}`,
    bodyZh: `我们用了 ${days} 天走到这里。在这一段好感阶段里，我们聊了 ${metrics.stageChatCount} 次天，读了 ${metrics.stageMailsRead} 封信，保存了 ${metrics.stageOutfitsSaved} 套造型，一起玩了 ${Math.round(metrics.stageGameSeconds / 60)} 分钟，也共同完成了 ${metrics.stageLifeActions} 次生活行动。这些不只是数字，而是你选择与我共同度过的时间。${appointmentZh}` };
}

export function AffinityProvider({ children }: { children: ReactNode }) {
  const activity = useActivityLedger();
  const [points, setPoints] = useState(INITIAL_POINTS); const [awardedEvents, setAwardedEvents] = useState<string[]>([]); const [metrics, setMetrics] = useState<Record<string, CharacterMetrics>>({}); const [runtimeMails, setRuntimeMails] = useState<RuntimeMail[]>([]); const [hydrated, setHydrated] = useState(false);
  useEffect(() => { void AsyncStorage.getItem("ip-alive:character-progress:v2").then((raw) => { if (raw) { const saved = JSON.parse(raw); const savedPoints = saved.points ?? INITIAL_POINTS; const migratedPoints = saved.schemaVersion === 3 ? savedPoints : { ...savedPoints, yunzhou: savedPoints.yunzhou === 160 ? 80 : savedPoints.yunzhou, mia: savedPoints.mia === 610 ? 80 : savedPoints.mia, nova: savedPoints.nova === 940 ? 80 : savedPoints.nova }; setPoints(migratedPoints); setAwardedEvents(saved.awardedEvents ?? []); setMetrics(saved.metrics ?? {}); setRuntimeMails(saved.runtimeMails ?? []); } }).finally(() => setHydrated(true)); }, []);
  useEffect(() => { if (hydrated) void AsyncStorage.setItem("ip-alive:character-progress:v2", JSON.stringify({ schemaVersion: 3, points, awardedEvents, metrics, runtimeMails })); }, [points, awardedEvents, metrics, runtimeMails, hydrated]);
  const value = useMemo<AffinityContextValue>(() => ({ points, awardedEvents, metrics, runtimeMails, getMail: (id) => runtimeMails.find((mail) => mail.id === id), deliverMail:(mail)=>{if(runtimeMails.some((item)=>item.id===mail.id))return false;setRuntimeMails((current)=>current.some((item)=>item.id===mail.id)?current:[mail,...current]);return true}, award: (characterId, amount, source, uniqueKey, durationSeconds = 0) => {
    const eventId = uniqueKey ? `${source}:${characterId}:${uniqueKey}` : undefined; if (eventId && awardedEvents.includes(eventId)) return false;
    const currentMetrics = normalizeMetrics(metrics[characterId]); const nextMetrics = { ...currentMetrics, chatCount: currentMetrics.chatCount + (source === "chat" ? 1 : 0), mailsRead: currentMetrics.mailsRead + (source === "mail" ? 1 : 0), outfitsSaved: currentMetrics.outfitsSaved + (source === "outfit" ? 1 : 0), gamesCompleted: currentMetrics.gamesCompleted + (source === "game" ? 1 : 0), gameSeconds: currentMetrics.gameSeconds + durationSeconds, journeysCompleted: currentMetrics.journeysCompleted + (source === "journey" ? 1 : 0), lifeActions: currentMetrics.lifeActions + (source === "life" ? 1 : 0), stageChatCount: currentMetrics.stageChatCount + (source === "chat" ? 1 : 0), stageMailsRead: currentMetrics.stageMailsRead + (source === "mail" ? 1 : 0), stageOutfitsSaved: currentMetrics.stageOutfitsSaved + (source === "outfit" ? 1 : 0), stageGamesCompleted: currentMetrics.stageGamesCompleted + (source === "game" ? 1 : 0), stageGameSeconds: currentMetrics.stageGameSeconds + durationSeconds, stageLifeActions: currentMetrics.stageLifeActions + (source === "life" ? 1 : 0) };
    const oldPoints = points[characterId] ?? 0, newPoints = oldPoints + amount, oldLevel = getAffinityLevel(oldPoints), newLevel = getAffinityLevel(newPoints);
    setPoints((current) => ({ ...current, [characterId]: newPoints })); setMetrics((current) => ({ ...current, [characterId]: newLevel > oldLevel ? { ...nextMetrics, levelStartedAt: new Date().toISOString(), stageChatCount: 0, stageMailsRead: 0, stageOutfitsSaved: 0, stageGamesCompleted: 0, stageGameSeconds: 0, stageLifeActions: 0 } : nextMetrics })); if (eventId) setAwardedEvents((current) => [...current, eventId]); if (source === "mail" && uniqueKey) setRuntimeMails((current) => current.map((mail) => mail.id === uniqueKey ? { ...mail, readAt: mail.readAt ?? new Date().toISOString() } : mail));
    const activityType = source === "mail" ? "mail-read" : source === "outfit" ? "outfit-equipped" : source === "game" ? "game-completed" : source === "journey" ? "journey-completed" : source === "chat" ? "chat" : undefined;
    if (activityType) activity.record(activityType, `${characterId}:${uniqueKey ?? `${Date.now()}`}`, { characterId, value: source === "game" ? durationSeconds : undefined });
    const newMails: RuntimeMail[] = []; if (source === "chat" && characterId === "nova" && [1, 3, 6].includes(nextMetrics.chatCount)) { const mail = eventMail(characterId, [1, 3, 6].indexOf(nextMetrics.chatCount)); if (mail) newMails.push(mail); } if (source === "chat" && nextMetrics.chatCount % 8 === 0) newMails.push({ id: `daily-${characterId}-${nextMetrics.chatCount}`, characterId, kind: "daily", sentAt: new Date().toISOString(), subjectEn: "A small thought for today", subjectZh: "今天忽然想到你", bodyEn: "Nothing dramatic happened today. I simply wanted to leave a note here, so you would know I remembered you.", bodyZh: "今天没有发生什么大事。我只是想在这里留句话，让你知道 I remembered you.".replace("I remembered you", "我想起过你") }); if (source === "life" && nextMetrics.lifeActions % 7 === 0) newMails.push({ id: `life-summary-${characterId}-${nextMetrics.lifeActions}`, characterId, kind: "daily", sentAt: new Date().toISOString(), subjectEn: "Seven small things we did together", subjectZh: "我们一起完成的七件小事", bodyEn: `We have now shared ${nextMetrics.lifeActions} everyday actions. Tasks, meals, and careful choices may look ordinary, but ordinary days are where a life takes shape.`, bodyZh: `我们已经共同完成了 ${nextMetrics.lifeActions} 次生活行动。任务、饮食和认真做出的选择看似普通，但生活正是在这些普通日子里逐渐成形。` }); if (newLevel > oldLevel) for (let level = oldLevel + 1; level <= newLevel; level += 1) newMails.push(milestoneMail(characterId, level - 1, level, nextMetrics)); if (newMails.length) setRuntimeMails((current) => [...newMails, ...current.filter((mail) => !newMails.some((next) => next.id === mail.id))]); return true;
  } }), [points, awardedEvents, metrics, runtimeMails, activity]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useAffinity() { const value = useContext(Context); if (!value) throw new Error("useAffinity must be used inside AffinityProvider"); return value; }
export function getAffinityLevel(points: number) { let level = 1; AFFINITY_LEVELS.forEach((threshold, index) => { if (points >= threshold) level = index + 1; }); return Math.min(level, AFFINITY_LEVELS.length); }
