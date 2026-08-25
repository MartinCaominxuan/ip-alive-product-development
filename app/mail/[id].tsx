import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import LanguageToggle from "@/components/LanguageToggle";
import { characterMails } from "@/data/character-content";
import { mailTranslationsEn, mailTranslationsZh } from "@/data/localized-content";
import { getCharacterViewById } from "@/features/characters";
import { useLanguage } from "@/hooks/use-language";
import { useAffinity } from "@/hooks/use-affinity";

export default function MailDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { language, text } = useLanguage();
  const affinity = useAffinity();
  const mail = characterMails.find((item) => item.id === id);
  useEffect(() => { if (mail) affinity.award(mail.characterId, 18, "mail", mail.id); }, [affinity, mail]);
  if (!mail) return <View style={styles.center}><Text>{text("Mail not found.", "没有找到这封信。")}</Text></View>;
  const character = getCharacterViewById(mail.characterId)?.character;
  const translated = language === "zh" ? mailTranslationsZh[mail.id] : mailTranslationsEn[mail.id];
  const characterName = language === "zh" ? character?.displayNameZh ?? character?.displayName : character?.displayName;

  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <View style={styles.header}><Pressable onPress={() => router.back()}><Text style={styles.back}>‹ {text("Character", "角色主页")}</Text></Pressable><LanguageToggle /></View>
    <View style={styles.envelope}><Text style={styles.emoji}>{character?.emoji ?? "✉️"}</Text><Text style={styles.from}>{text("A letter from", "来自")} {characterName ?? mail.characterId}</Text><Text style={styles.date}>{mail.sentAt.slice(0, 10)}</Text></View>
    <View style={styles.letter}><Text style={styles.subject}>{translated?.subject ?? mail.subject}</Text><View style={styles.divider} /><Text style={styles.body}>{translated?.body ?? mail.body}</Text><Text style={styles.signature}>— {characterName ?? mail.characterId}</Text></View>
    <View style={styles.reward}><Text style={styles.rewardIcon}>✦</Text><Text style={styles.rewardText}>{text("Opened mail is saved to Memory.", "打开的邮件会保存到回忆中。")}</Text></View>
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F1E9" }, content: { padding: 20, paddingTop: 58, paddingBottom: 44 }, header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, back: { fontSize: 15, fontWeight: "800", color: "#765B3D" },
  envelope: { alignItems: "center", marginTop: 32 }, emoji: { fontSize: 53 }, from: { marginTop: 12, fontSize: 11, fontWeight: "800", color: "#806D59" }, date: { marginTop: 4, fontSize: 9, color: "#A09182" },
  letter: { marginTop: 24, padding: 24, borderRadius: 4, backgroundColor: "#FFFDF7", shadowColor: "#5B4631", shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 5 } }, subject: { fontSize: 23, lineHeight: 30, fontWeight: "800", color: "#3C332A" }, divider: { width: 44, height: 2, marginVertical: 20, backgroundColor: "#C7A979" }, body: { fontSize: 15, lineHeight: 26, color: "#5D5146" }, signature: { marginTop: 30, fontSize: 13, fontWeight: "800", textAlign: "right", color: "#725C46" },
  reward: { flexDirection: "row", alignItems: "center", marginTop: 16, padding: 14, borderRadius: 16, backgroundColor: "#E8DFCF" }, rewardIcon: { marginRight: 9, color: "#907244" }, rewardText: { fontSize: 10, fontWeight: "700", color: "#6E5B45" }, center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
