import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import LanguageToggle from "@/components/LanguageToggle";
import { memories } from "@/data/memories";
import { characterNamesZh } from "@/data/localized-content";
import { useLanguage } from "@/hooks/use-language";

export default function MemoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { language, text } = useLanguage();
  const memory = memories.find((item) => item.id === id);
  if (!memory) return <View style={styles.center}><Text>{text("Memory not found.", "没有找到这段回忆。")}</Text></View>;

  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <View style={styles.header}><Pressable onPress={() => router.back()}><Text style={styles.back}>‹ {text("Memories", "回忆")}</Text></Pressable><LanguageToggle /></View>
    <View style={styles.hero}><Text style={styles.emoji}>{memory.emoji}</Text><Text style={styles.kicker}>{language === "zh" ? characterNamesZh[memory.characterName] ?? memory.characterName : memory.characterName} · {memory.date}</Text><Text style={styles.title}>{language === "en" ? memory.titleEn : memory.titleZh}</Text></View>
    <View style={styles.story}><Text style={styles.storyText}>{language === "en" ? memory.bodyEn : memory.bodyZh}</Text></View>
    <View style={styles.saved}><Text style={styles.savedIcon}>✦</Text><View><Text style={styles.savedTitle}>{text("Relationship memory", "关系回忆")}</Text><Text style={styles.savedText}>{text("Saved locally for this runnable demo.", "在这个可运行 Demo 中保存在本地。")}</Text></View></View>
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F4FA" }, content: { padding: 20, paddingTop: 58, paddingBottom: 44 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, back: { fontSize: 15, fontWeight: "800", color: "#6D4FE3" },
  hero: { alignItems: "center", marginTop: 42 }, emoji: { fontSize: 58 }, kicker: { marginTop: 16, fontSize: 10, fontWeight: "800", color: "#807588" }, title: { marginTop: 8, fontSize: 29, lineHeight: 36, fontWeight: "900", textAlign: "center", color: "#2E2735" },
  story: { marginTop: 28, padding: 22, borderRadius: 24, backgroundColor: "#FFFFFF" }, storyText: { fontSize: 15, lineHeight: 25, color: "#554D5C" },
  saved: { flexDirection: "row", alignItems: "center", marginTop: 16, padding: 16, borderRadius: 19, backgroundColor: "#ECE6FF" }, savedIcon: { marginRight: 12, fontSize: 23, color: "#6D4FE3" }, savedTitle: { fontSize: 13, fontWeight: "800", color: "#493A76" }, savedText: { marginTop: 3, fontSize: 10, color: "#756996" }, center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
