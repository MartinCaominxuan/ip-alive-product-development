import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import LanguageToggle from "@/components/LanguageToggle";
import { memories } from "@/data/memories";
import { characterNamesZh } from "@/data/localized-content";
import { useLanguage } from "@/hooks/use-language";

export default function MemoryScreen() {
  const { language, text } = useLanguage();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}><View><Text style={styles.title}>{text("Memories", "回忆")}</Text><Text style={styles.subtitle}>{text("Moments your relationships made worth keeping.", "值得被留下的陪伴片段。")}</Text></View><LanguageToggle /></View>
      <View style={styles.summary}>
        <Text style={styles.summaryNumber}>{memories.length}</Text><Text style={styles.summaryLabel}>{text("MEMORIES SAVED", "已保存回忆")}</Text>
        <View style={styles.timelineLine} />
      </View>
      {memories.map((memory, index) => (
        <Pressable key={memory.id} style={styles.card} onPress={() => router.push({ pathname: "/memory/[id]", params: { id: memory.id } })}>
          <View style={styles.timelineColumn}><View style={styles.dot} />{index < memories.length - 1 && <View style={styles.connector} />}</View>
          <View style={styles.cardBody}>
            <View style={styles.cardTop}><View style={styles.characterPill}><Text>{memory.emoji}</Text><Text style={styles.characterName}>{language === "zh" ? characterNamesZh[memory.characterName] ?? memory.characterName : memory.characterName}</Text></View><Text style={styles.date}>{memory.date}</Text></View>
            <Text style={styles.cardTitle}>{language === "en" ? memory.titleEn : memory.titleZh}</Text>
            <Text style={styles.cardSummary}>{language === "en" ? memory.summaryEn : memory.summaryZh}</Text>
            <Text style={styles.open}>{text("Open memory  ›", "打开回忆  ›")}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F4FA" },
  content: { paddingHorizontal: 18, paddingTop: 60, paddingBottom: 44 },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  title: { fontSize: 30, fontWeight: "900", color: "#2C2632" },
  subtitle: { maxWidth: 245, marginTop: 5, fontSize: 12, lineHeight: 17, color: "#7A7380" },
  summary: { overflow: "hidden", marginTop: 23, marginBottom: 18, padding: 18, borderRadius: 22, backgroundColor: "#2B213F" },
  summaryNumber: { fontSize: 33, fontWeight: "900", color: "#FFFFFF" },
  summaryLabel: { marginTop: 2, fontSize: 9, fontWeight: "900", letterSpacing: 1.4, color: "#C4B5ED" },
  timelineLine: { position: "absolute", right: -20, top: 30, width: 170, height: 3, transform: [{ rotate: "-12deg" }], backgroundColor: "#745BDD" },
  card: { flexDirection: "row", minHeight: 152 },
  timelineColumn: { width: 24, alignItems: "center" },
  dot: { width: 12, height: 12, marginTop: 21, borderRadius: 6, borderWidth: 3, borderColor: "#CDBFFF", backgroundColor: "#6D4FE3" },
  connector: { flex: 1, width: 2, backgroundColor: "#DCD5E8" },
  cardBody: { flex: 1, marginLeft: 7, marginBottom: 13, padding: 16, borderRadius: 20, backgroundColor: "#FFFFFF" },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  characterPill: { flexDirection: "row", alignItems: "center", gap: 5 },
  characterName: { fontSize: 10, fontWeight: "800", color: "#665B70" },
  date: { fontSize: 9, color: "#9A929F" },
  cardTitle: { marginTop: 10, fontSize: 16, fontWeight: "800", color: "#322C38" },
  cardSummary: { marginTop: 5, fontSize: 11, lineHeight: 16, color: "#7A7380" },
  open: { marginTop: 9, fontSize: 10, fontWeight: "800", color: "#6D4FE3" },
});
