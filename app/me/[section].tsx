import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import LanguageToggle from "@/components/LanguageToggle";
import { demoAccount, demoAccountStats } from "@/data/account";
import { outfits } from "@/data/character-content";
import { memories } from "@/data/memories";
import { visitedPlaces } from "@/data/user-journey";
import { getCharacterViews } from "@/features/characters";
import { useLanguage } from "@/hooks/use-language";

type SectionKey = "level" | "wallet" | "journey" | "collection" | "postcards" | "outfits" | "achievements";

const sectionMeta: Record<SectionKey, { icon: string; en: string; zh: string; noteEn: string; noteZh: string }> = {
  level: { icon: "✦", en: "Level & Titles", zh: "等级与称号", noteEn: "Every bond, journey and collection adds to your account EXP.", noteZh: "角色羁绊、旅行和收藏都会增加账号 EXP。" },
  wallet: { icon: "◉", en: "Bubble Wallet", zh: "Bubble 钱包", noteEn: "Demo currency only. No real payment is connected.", noteZh: "当前仅为演示货币，不连接真实支付。" },
  journey: { icon: "◎", en: "World Journey", zh: "世界足迹", noteEn: "Verified store visits and events light up your map.", noteZh: "经过验证的门店购买与活动签到会点亮地图。" },
  collection: { icon: "◇", en: "My Collection", zh: "我的收藏", noteEn: "Unlocked and locked characters remain visible in every series.", noteZh: "每个系列中，已解锁和未解锁角色都会保留展示。" },
  postcards: { icon: "✉", en: "Postcards", zh: "明信片", noteEn: "Small records brought back from character journeys.", noteZh: "角色旅行带回来的小小记录。" },
  outfits: { icon: "♢", en: "Outfit Archive", zh: "服装图鉴", noteEn: "Unlocked outfits can be equipped from each character page.", noteZh: "已解锁服装可在对应角色页中更换。" },
  achievements: { icon: "🏆", en: "Achievement Showcase", zh: "成就展示", noteEn: "Titles and badges make your progress visible.", noteZh: "称号与徽章让成长进度清晰可见。" },
};

export default function MeSectionScreen() {
  const { section = "level" } = useLocalSearchParams<{ section?: string }>();
  const key: SectionKey = section in sectionMeta ? section as SectionKey : "level";
  const meta = sectionMeta[key];
  const { language, text } = useLanguage();

  const rows = getRows(key, language);
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <Pressable style={styles.back} onPress={() => router.back()}><Text style={styles.backText}>‹</Text></Pressable>
        <LanguageToggle compact />
      </View>
      <View style={styles.hero}>
        <Text style={styles.heroIcon}>{meta.icon}</Text>
        <Text style={styles.title}>{language === "zh" ? meta.zh : meta.en}</Text>
        <Text style={styles.note}>{language === "zh" ? meta.noteZh : meta.noteEn}</Text>
      </View>

      {key === "level" && (
        <View style={styles.levelFeature}>
          <Text style={styles.levelLabel}>{text("CURRENT LEVEL", "当前等级")}</Text>
          <Text style={styles.levelValue}>{demoAccount.level}</Text>
          <Text style={styles.levelTitle}>✦ {text("World Weaver", "世界织梦者")}</Text>
          <View style={styles.track}><View style={[styles.fill, { width: "71%" }]} /></View>
          <Text style={styles.progressText}>{demoAccount.experience.toLocaleString()} / 3,200 EXP</Text>
        </View>
      )}
      {key === "wallet" && <View style={styles.balance}><Text style={styles.balanceLabel}>BUBBLE BALANCE</Text><Text style={styles.balanceValue}>◉ {demoAccountStats.bubbles.toLocaleString()}</Text></View>}

      <View style={styles.list}>
        {rows.map((row, index) => (
          <View key={`${key}-${index}-${row.title}`} style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: row.tone }]}><Text style={styles.rowEmoji}>{row.icon}</Text></View>
            <View style={styles.rowCopy}><Text style={styles.rowTitle}>{row.title}</Text><Text style={styles.rowDetail}>{row.detail}</Text></View>
            <Text style={styles.chevron}>›</Text>
          </View>
        ))}
      </View>
      <View style={styles.demoNote}><Text style={styles.demoText}>{text("Interactive demo · Data is stored locally", "交互式 Demo · 数据保存在本地")}</Text></View>
    </ScrollView>
  );
}

function getRows(key: SectionKey, language: "en" | "zh") {
  const pick = (en: string, zh: string) => language === "zh" ? zh : en;
  if (key === "journey") return visitedPlaces.map((place) => ({ icon: "●", tone: "#DDF3EB", title: place.city, detail: `${place.country} · ${place.visitedAt}`, }));
  if (key === "collection") return getCharacterViews().slice(0, 8).map(({ character, companion }) => ({ icon: companion.unlocked ? character.emoji ?? "✦" : "🔒", tone: companion.unlocked ? "#EEE8FF" : "#ECEAEC", title: language === "zh" ? character.displayNameZh ?? character.displayName : character.displayName, detail: companion.unlocked ? pick(`Level ${companion.level} · Unlocked`, `${companion.level} 级 · 已解锁`) : pick("Locked silhouette", "未解锁剪影") }));
  if (key === "postcards") return memories.slice(0, 3).map((memory) => ({ icon: "✉", tone: "#FFF0D8", title: language === "zh" ? memory.titleZh : memory.titleEn, detail: `${memory.characterName} · ${memory.date}` }));
  if (key === "outfits") return outfits.map((outfit) => ({ icon: "♢", tone: "#F3EAFE", title: outfit.name, detail: pick(`${outfit.rarity} · Character wardrobe`, `${outfit.rarity} · 角色衣橱`) }));
  if (key === "achievements") return [
    { icon: "🌱", tone: "#E7F6EC", title: pick("First Bond", "初次羁绊"), detail: pick("Reach Bond Lv. 1", "任意角色羁绊达到 1 级") },
    { icon: "🗺️", tone: "#E8F1FC", title: pick("Traveler", "旅行家"), detail: pick("Light up 3 places", "点亮 3 个地点") },
    { icon: "✨", tone: "#F4ECFF", title: pick("Series Star", "系列之星"), detail: pick("Unlock 10 characters", "解锁 10 个角色") },
  ];
  if (key === "wallet") return [
    { icon: "+", tone: "#E6F6EC", title: pick("Journey reward", "旅行奖励"), detail: "+120 Bubble" },
    { icon: "+", tone: "#E6F6EC", title: pick("Daily bond", "每日羁绊"), detail: "+30 Bubble" },
    { icon: "−", tone: "#FFF0E5", title: pick("Outfit preview", "服装预览"), detail: "−180 Bubble" },
  ];
  return [
    { icon: "✓", tone: "#E7F6EC", title: pick("Collector", "收藏家"), detail: pick("Unlocked at Level 1", "1 级解锁") },
    { icon: "✓", tone: "#E7F6EC", title: pick("Time Friend", "时空旅伴"), detail: pick("Unlocked at Level 8", "8 级解锁") },
    { icon: "🔒", tone: "#ECEAEC", title: pick("World Weaver", "世界织梦者"), detail: pick("Next prestige tier", "下一荣誉阶段") },
  ];
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F6F4FA" }, content: { paddingHorizontal: 18, paddingTop: 56, paddingBottom: 44 },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, back: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" }, backText: { marginTop: -4, fontSize: 34, color: "#3C3445" },
  hero: { alignItems: "center", paddingVertical: 24 }, heroIcon: { fontSize: 35 }, title: { marginTop: 8, fontSize: 28, fontWeight: "900", color: "#2E2736" }, note: { maxWidth: 330, marginTop: 8, textAlign: "center", fontSize: 13, lineHeight: 19, color: "#756D7D" },
  levelFeature: { alignItems: "center", padding: 22, borderRadius: 24, backgroundColor: "#2B2041" }, levelLabel: { fontSize: 9, fontWeight: "800", letterSpacing: 1.4, color: "#B9A9D6" }, levelValue: { fontSize: 56, fontWeight: "900", color: "#FFFFFF" }, levelTitle: { fontSize: 14, fontWeight: "800", color: "#D7C9FF" }, track: { width: "100%", height: 8, marginTop: 18, borderRadius: 4, overflow: "hidden", backgroundColor: "#493C60" }, fill: { height: "100%", backgroundColor: "#A68CFF" }, progressText: { marginTop: 7, fontSize: 10, color: "#BFB2D0" },
  balance: { alignItems: "center", padding: 25, borderRadius: 24, backgroundColor: "#FFF0BF" }, balanceLabel: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5, color: "#896A13" }, balanceValue: { marginTop: 5, fontSize: 34, fontWeight: "900", color: "#5E4300" },
  list: { marginTop: 16, gap: 10 }, row: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 19, backgroundColor: "#FFFFFF" }, rowIcon: { width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center" }, rowEmoji: { fontSize: 21 }, rowCopy: { flex: 1, marginLeft: 13 }, rowTitle: { fontSize: 15, fontWeight: "800", color: "#332D39" }, rowDetail: { marginTop: 3, fontSize: 11, color: "#817987" }, chevron: { fontSize: 25, color: "#B0A8B6" },
  demoNote: { alignItems: "center", marginTop: 18 }, demoText: { fontSize: 10, color: "#918A97" },
});
