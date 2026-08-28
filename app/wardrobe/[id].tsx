import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import LanguageToggle from "@/components/LanguageToggle";
import Mannequin from "@/components/wardrobe/Mannequin";
import OutfitPreview from "@/components/wardrobe/OutfitPreview";
import { inventory, outfits } from "@/data/character-content";
import { characterNamesZh } from "@/data/localized-content";
import { getCharacterViewById } from "@/features/characters";
import { useLanguage } from "@/hooks/use-language";
import { useGameProgress } from "@/hooks/use-game-progress";
import { useAffinity } from "@/hooks/use-affinity";

export default function WardrobeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { language, text } = useLanguage();
  const { unlockedRewardIds } = useGameProgress();
  const affinity = useAffinity();
  const view = getCharacterViewById(id);
  const owned = useMemo(() => new Set([...inventory.map((item) => item.outfitId), ...unlockedRewardIds]), [unlockedRewardIds]);
  const looks = outfits.filter((item) => item.characterIds.includes(id));
  const [selected, setSelected] = useState(inventory.find((item) => item.equippedCharacterId === id)?.outfitId ?? looks[0]?.id);
  const [saved, setSaved] = useState(false);
  const characterName = language === "zh" ? view?.character.displayNameZh ?? characterNamesZh[view?.character.displayName ?? ""] ?? view?.character.displayName : view?.character.displayName;
  const current = looks.find((item) => item.id === selected);

  return <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.top}><Pressable onPress={() => router.back()}><Text style={styles.back}>‹ {text("Character", "角色")}</Text></Pressable><LanguageToggle compact /></View>
    <Text style={styles.eyebrow}>{text("VISUAL WARDROBE", "可视化衣橱")}</Text><Text style={styles.title}>{text(`${characterName}'s looks`, `${characterName}的造型`)}</Text>
    <View style={styles.stage}><Mannequin outfitId={selected} /><View style={styles.lookLabel}><Text style={styles.lookName}>{current ? (language === "zh" ? current.nameZh : current.name) : text("Base model", "素体模型")}</Text><Text style={styles.lookMeta}>{text("Layered art preview", "服装叠层预览")}</Text></View></View>
    <View style={styles.info}><Text style={styles.infoText}>{text("The neutral mannequin and every clothing tile are wired to artAssetId/previewAssetKey. Final transparent artwork can replace these placeholders without changing this screen.", "中性素体和每一件服装都已连接 artAssetId / previewAssetKey。未来只需替换透明底美术素材，不必改动页面结构。")}</Text></View>
    <Text style={styles.section}>{text("Choose an outfit", "选择服装")}</Text>
    <View style={styles.grid}>{looks.map((outfit) => { const isOwned = owned.has(outfit.id); const active = selected === outfit.id; return <Pressable key={outfit.id} disabled={!isOwned} onPress={() => { setSelected(outfit.id); setSaved(false); }} style={[styles.card, active && styles.active, !isOwned && styles.locked]}><OutfitPreview outfitId={outfit.id} locked={!isOwned} /><Text style={styles.cardName}>{language === "zh" ? outfit.nameZh : outfit.name}</Text><Text style={styles.cardMeta}>{active ? text("WEARING", "穿着中") : isOwned ? text("OWNED", "已拥有") : text("LOCKED", "未解锁")}</Text></Pressable>; })}</View>
    <Pressable style={[styles.save, saved && styles.saved]} onPress={() => { setSaved(true); if (selected) affinity.award(id, 25, "outfit", selected); }}><Text style={styles.saveText}>{saved ? text("Look saved · Bond +25 ✓", "造型已保存 · 好感度 +25 ✓") : text("Save this look", "保存当前造型")}</Text></Pressable>
  </ScrollView>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: "#F5F2F8" }, content: { paddingHorizontal: 18, paddingTop: 56, paddingBottom: 45 }, top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, back: { fontSize: 15, fontWeight: "800", color: "#664DD0" }, eyebrow: { marginTop: 24, fontSize: 9, fontWeight: "900", letterSpacing: 1.6, color: "#8068DD" }, title: { marginTop: 5, fontSize: 29, fontWeight: "900", color: "#2D2733" }, stage: { marginTop: 17, alignItems: "center", paddingTop: 17, borderRadius: 28, backgroundColor: "#FFFFFF" }, lookLabel: { width: "100%", alignItems: "center", paddingVertical: 15, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#E7E2EB" }, lookName: { fontSize: 16, fontWeight: "900", color: "#332D3A" }, lookMeta: { marginTop: 3, fontSize: 9, color: "#89818D" }, info: { marginTop: 12, padding: 13, borderRadius: 16, backgroundColor: "#E9E3FA" }, infoText: { fontSize: 10, lineHeight: 15, color: "#65597C" }, section: { marginTop: 24, marginBottom: 12, fontSize: 18, fontWeight: "900", color: "#332D38" }, grid: { flexDirection: "row", flexWrap: "wrap", gap: 11 }, card: { width: "48%", padding: 8, borderRadius: 19, borderWidth: 2, borderColor: "transparent", backgroundColor: "#FFFFFF" }, active: { borderColor: "#7458E8" }, locked: { opacity: 0.6 }, cardName: { marginTop: 8, fontSize: 12, fontWeight: "800", color: "#38313E" }, cardMeta: { marginTop: 3, fontSize: 7, fontWeight: "900", color: "#8068DD" }, save: { alignItems: "center", marginTop: 22, paddingVertical: 16, borderRadius: 19, backgroundColor: "#694DDA" }, saved: { backgroundColor: "#3E9362" }, saveText: { fontSize: 14, fontWeight: "900", color: "#FFFFFF" } });
