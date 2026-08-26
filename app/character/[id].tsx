import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import LanguageToggle from "@/components/LanguageToggle";
import { characterMails, inventory, outfits } from "@/data/character-content";
import { characterNamesZh, mailTranslationsZh } from "@/data/localized-content";
import { getCharacterViewById } from "@/features/characters";
import { getJourneyOptions } from "@/features/travel";
import { useLanguage } from "@/hooks/use-language";
import { AFFINITY_LEVELS, getAffinityLevel, useAffinity } from "@/hooks/use-affinity";

const OUTFIT_EMOJI: Record<string, string> = {
  "daily-knit": "🧶",
  "starlight-coat": "🌌",
  "summer-sailor": "⛵",
  "moon-festival": "🌕",
  "yunzhou-scholar": "📜",
  "yunzhou-2026": "🧥",
  "mia-weekend": "🎧",
  "mia-concert": "🎤",
  "nova-orbit": "🛰️",
  "nova-retro": "📱",
};

export default function CharacterHomeScreen() {
  const { language, text } = useLanguage();
  const affinity = useAffinity();
  const { id } = useLocalSearchParams<{ id: string }>();
  const view = getCharacterViewById(id);
  const ownedOutfitIds = useMemo(() => new Set(inventory.map((item) => item.outfitId)), []);
  const characterOutfits = outfits.filter((outfit) => outfit.characterIds.includes(id));
  const ownedCharacterOutfits = characterOutfits.filter((outfit) => ownedOutfitIds.has(outfit.id));
  const [equippedOutfitId, setEquippedOutfitId] = useState(
    inventory.find((item) => item.equippedCharacterId === id)?.outfitId ?? characterOutfits[0]?.id,
  );

  if (!view) {
    return <View style={styles.missing}><Text>Character not found.</Text><Pressable onPress={() => router.back()}><Text style={styles.link}>Go back</Text></Pressable></View>;
  }

  const { character, companion } = view;
  const staticMails = characterMails.filter((mail) => mail.characterId === id);
  const mails = [
    ...affinity.runtimeMails.filter((mail) => mail.characterId === id).map((mail) => ({ id: mail.id, subject: language === "zh" ? mail.subjectZh : mail.subjectEn, body: language === "zh" ? mail.bodyZh : mail.bodyEn, readAt: mail.readAt })),
    ...staticMails.map((mail) => ({ id: mail.id, subject: language === "zh" ? mailTranslationsZh[mail.id]?.subject ?? mail.subject : mail.subject, body: language === "zh" ? mailTranslationsZh[mail.id]?.body ?? mail.body : mail.body, readAt: mail.readAt ?? (affinity.awardedEvents.includes(`mail:${id}:${mail.id}`) ? "read" : undefined) })),
  ];
  const startedAt = affinity.metrics[id]?.relationshipStartedAt;
  const daysTogether = startedAt ? Math.max(1, Math.ceil((Date.now() - new Date(startedAt).getTime()) / 86400000)) : 1;
  const characterName = language === "zh" ? character.displayNameZh ?? characterNamesZh[character.displayName] ?? character.displayName : character.displayName;
  const bondPoints = affinity.points[id] ?? 0;
  const bondLevel = getAffinityLevel(bondPoints);
  const currentThreshold = AFFINITY_LEVELS[bondLevel - 1] ?? 0;
  const nextThreshold = AFFINITY_LEVELS[bondLevel] ?? currentThreshold;
  const bondProgress = nextThreshold === currentThreshold ? 1 : (bondPoints - currentThreshold) / (nextThreshold - currentThreshold);
  const journeyOptions = getJourneyOptions(character.era ?? "modern", bondLevel);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}><Pressable style={styles.backButton} onPress={() => router.back()}><Text style={styles.backText}>‹ {text("Characters", "角色")}</Text></Pressable><LanguageToggle /></View>

      <View style={styles.hero}>
        <View style={styles.avatar}><Text style={styles.avatarEmoji}>{character.emoji ?? "🙂"}</Text></View>
        <Text style={styles.name}>{characterName}</Text>
        <Text style={styles.outfitLabel}>{(() => { const selectedOutfit = characterOutfits.find((item) => item.id === equippedOutfitId); return selectedOutfit ? (language === "zh" ? selectedOutfit.nameZh : selectedOutfit.name) : text("Default look", "默认造型"); })()}</Text>
        <View style={styles.bondBadge}><Text style={styles.bondBadgeText}>{"♥".repeat(Math.min(bondLevel, 6))} · Lv.{bondLevel}</Text></View>
        <Text style={styles.status}>{language === "zh" ? character.statusZh ?? companion.status : companion.status}</Text>
      </View>

      <View style={styles.statsRow}>
        <Stat value={daysTogether} label={text("Days together", "陪伴天数")} />
        <Stat value={affinity.metrics[id]?.chatCount ?? 0} label={text("Messages", "消息数量")} />
        <Stat value={bondLevel} label={text("Bond level", "好感等级")} />
      </View>

      {id === "nova" && <View style={styles.eventCard}><View><Text style={styles.eventEyebrow}>{text("LIVE CHARACTER EVENT", "角色事件进行中")}</Text><Text style={styles.eventTitle}>{text("Europa Archive Journey", "木卫二档案之旅")}</Text><Text style={styles.eventDetail}>{text("Keep talking with Nova to receive all three travel updates.", "继续与诺瓦聊天，收齐三封旅行动态邮件。")}</Text></View><Text style={styles.eventProgress}>{Math.min(3, affinity.runtimeMails.filter((mail) => mail.id.startsWith("event-nova-europa")).length)}/3</Text></View>}

      <View style={styles.affinityCard}><View style={styles.affinityTop}><Text style={styles.affinityTitle}>{text("Bond journey", "好感度旅程")}</Text><Text style={styles.affinityPoints}>{bondPoints} / {nextThreshold} ♥</Text></View><View style={styles.affinityTrack}><View style={[styles.affinityFill,{width:`${Math.max(0,Math.min(bondProgress,1))*100}%`}]} /></View><View style={styles.milestoneRow}>{[
        {level:bondLevel+1,en:"New mail",zh:"新邮件"},{level:bondLevel+2,en:"Special outfit",zh:"限定服装"},{level:bondLevel+3,en:"Present portal",zh:"现世旅行"}
      ].map((item,index)=><View key={index} style={styles.milestone}><View style={styles.milestoneLock}><Text style={styles.milestoneIcon}>🔒</Text></View><Text style={styles.milestoneLevel}>♥ {item.level}</Text><Text style={styles.milestoneName}>{text(item.en,item.zh)}</Text></View>)}</View></View>

      <SectionHeader title={text("Wardrobe", "衣柜")} detail={`${ownedCharacterOutfits.length}/${characterOutfits.length} ${text("unlocked", "已解锁")}`} />
      <Pressable style={styles.wardrobeButton} onPress={() => router.push({ pathname: "/wardrobe/[id]", params: { id } })}><View><Text style={styles.wardrobeEyebrow}>{text("VISUAL DRESS-UP", "可视化换装")}</Text><Text style={styles.wardrobeTitle}>{text("Open full wardrobe", "打开完整衣橱")}</Text></View><Text style={styles.wardrobeArrow}>›</Text></Pressable>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.outfitRow}>
        {characterOutfits.map((outfit) => {
          const owned = ownedOutfitIds.has(outfit.id);
          const selected = equippedOutfitId === outfit.id;
          return (
            <Pressable key={outfit.id} disabled={!owned} onPress={() => setEquippedOutfitId(outfit.id)} style={[styles.outfitCard, !owned && styles.lockedCard, selected && styles.selectedCard]}>
              <Text style={styles.outfitEmoji}>{owned ? OUTFIT_EMOJI[outfit.id] : "🔒"}</Text>
              <Text style={[styles.outfitName, !owned && styles.muted]} numberOfLines={1}>{language === "zh" ? outfit.nameZh : outfit.name}</Text>
              <Text style={styles.outfitRarity}>{selected ? text("EQUIPPED", "穿着中") : owned ? text(outfit.rarity.toUpperCase(), "已拥有") : text("LOCKED", "未解锁")}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <SectionHeader title={text(`${characterName}'s journeys`, `${characterName}的旅行`)} detail={`${text("Bond", "亲密度")} Lv.${bondLevel}`} />
      {journeyOptions.map((journey) => (
        <View key={journey.id} style={[styles.featureCard, !journey.unlocked && styles.journeyLocked]}>
          <View style={styles.featureIcon}><Text style={styles.featureEmoji}>{journey.unlocked ? journey.emoji : "🔒"}</Text></View>
          <View style={styles.featureCopy}>
            <Text style={[styles.featureTitle, !journey.unlocked && styles.muted]}>{language === "zh" ? journey.nameZh : journey.name}</Text>
            <Text style={styles.featureText}>{journey.unlocked ? (language === "zh" ? journey.descriptionZh : journey.description) : text(`Reach Bond Lv.${journey.requiredBondLevel} to break the timeline barrier.`, `亲密度达到 ${journey.requiredBondLevel} 级后解锁时空边界。`)}</Text>
          </View>
          <Text style={styles.chevron}>{journey.unlocked ? "›" : ""}</Text>
        </View>
      ))}

      <SectionHeader title={text("Mail from your character", "角色来信")} detail={`${mails.filter((mail) => !mail.readAt).length} ${text("unread", "封未读")}`} />
      {mails.map((mail) => (
        <Pressable key={mail.id} style={styles.mailCard} onPress={() => router.push({ pathname: "/mail/[id]", params: { id: mail.id } })}>
          <View style={[styles.unreadDot, mail.readAt && styles.readDot]} />
          <View style={styles.mailCopy}><Text style={styles.mailSubject}>{mail.subject}</Text><Text style={styles.mailPreview} numberOfLines={2}>{mail.body}</Text></View>
          <Text style={styles.mailIcon}>✉</Text>
        </Pressable>
      ))}

      <Pressable style={styles.chatButton} onPress={() => router.push({ pathname: "/chat", params: { id } })}>
        <Text style={styles.chatButtonText}>{text(`Talk with ${characterName}`, `和${characterName}聊天`)}</Text>
      </Pressable>
      <Pressable style={styles.gameButton} onPress={() => router.push({ pathname: "/play", params: { id } })}><Text style={styles.gameButtonIcon}>✦ ◆ ●</Text><View style={styles.gameButtonCopy}><Text style={styles.gameButtonTitle}>{text(`Play with ${characterName}`, `和${characterName}一起玩`)}</Text><Text style={styles.gameButtonText}>{text("Earn Bubble and unlock outfits", "赢取 Bubble，解锁服装")}</Text></View><Text style={styles.gameButtonArrow}>›</Text></Pressable>
    </ScrollView>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return <View style={styles.stat}><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
}

function SectionHeader({ title, detail }: { title: string; detail: string }) {
  return <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{title}</Text><Text style={styles.sectionDetail}>{detail}</Text></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F6F4FA" },
  content: { paddingHorizontal: 18, paddingTop: 56, paddingBottom: 46 },
  backButton: { alignSelf: "flex-start", paddingVertical: 8 },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  backText: { fontSize: 15, fontWeight: "700", color: "#6E55D8" },
  hero: { alignItems: "center", paddingVertical: 16 },
  avatar: { width: 116, height: 116, borderRadius: 58, alignItems: "center", justifyContent: "center", backgroundColor: "#ECE6FF", borderWidth: 5, borderColor: "#FFFFFF" },
  avatarEmoji: { fontSize: 61 },
  name: { marginTop: 12, fontSize: 30, fontWeight: "900", color: "#27222E" },
  outfitLabel: { marginTop: 2, fontSize: 12, color: "#7A7283" },
  bondBadge: { marginTop: 10, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: "#E7DFFF" },
  bondBadgeText: { fontSize: 12, fontWeight: "800", color: "#5B42B6" },
  status: { marginTop: 12, fontSize: 14, color: "#6E6875" },
  statsRow: { flexDirection: "row", paddingVertical: 16, borderRadius: 22, backgroundColor: "#FFFFFF" },
  eventCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12, padding: 16, borderRadius: 22, backgroundColor: "#DDEBFF" }, eventEyebrow: { fontSize: 8, fontWeight: "900", letterSpacing: 1.1, color: "#4672A8" }, eventTitle: { marginTop: 4, fontSize: 15, fontWeight: "900", color: "#243C5C" }, eventDetail: { maxWidth: 250, marginTop: 5, fontSize: 9, lineHeight: 13, color: "#5C7190" }, eventProgress: { fontSize: 21, fontWeight: "900", color: "#3F6FA9" },
  affinityCard: { marginTop: 12, padding: 17, borderRadius: 22, backgroundColor: "#FFF" }, affinityTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, affinityTitle: { fontSize: 15, fontWeight: "900", color: "#342D3C" }, affinityPoints: { fontSize: 10, fontWeight: "900", color: "#D65B81" }, affinityTrack: { height: 10, marginTop: 12, overflow: "hidden", borderRadius: 5, backgroundColor: "#F1DDE5" }, affinityFill: { height: "100%", borderRadius: 5, backgroundColor: "#E7648E" }, milestoneRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 }, milestone: { width: "31%", alignItems: "center" }, milestoneLock: { width: 35, height: 35, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: "#EEEAF2" }, milestoneIcon: { fontSize: 13 }, milestoneLevel: { marginTop: 5, fontSize: 8, fontWeight: "900", color: "#D65B81" }, milestoneName: { marginTop: 2, fontSize: 8, textAlign: "center", color: "#756D7B" },
  stat: { flex: 1, alignItems: "center", borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: "#DED9E5" },
  statValue: { fontSize: 22, fontWeight: "900", color: "#322B3B" },
  statLabel: { marginTop: 3, fontSize: 9, color: "#807887" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 25, marginBottom: 11 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#29242F" },
  sectionDetail: { fontSize: 11, fontWeight: "700", color: "#745BDB" },
  outfitRow: { gap: 10, paddingRight: 18 },
  wardrobeButton: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 11, padding: 16, borderRadius: 19, backgroundColor: "#29203E" },
  wardrobeEyebrow: { fontSize: 8, fontWeight: "900", letterSpacing: 1.3, color: "#BCA9FF" }, wardrobeTitle: { marginTop: 4, fontSize: 14, fontWeight: "900", color: "#FFFFFF" }, wardrobeArrow: { fontSize: 28, color: "#FFFFFF" },
  outfitCard: { width: 116, padding: 13, borderRadius: 18, backgroundColor: "#FFFFFF", borderWidth: 2, borderColor: "transparent" },
  selectedCard: { borderColor: "#7C5CFC", backgroundColor: "#F4F0FF" },
  lockedCard: { opacity: 0.55, backgroundColor: "#E4E2E6" },
  outfitEmoji: { fontSize: 31 },
  outfitName: { marginTop: 9, fontSize: 12, fontWeight: "800", color: "#332E39" },
  outfitRarity: { marginTop: 4, fontSize: 8, fontWeight: "800", color: "#7967C9" },
  muted: { color: "#8D8991" },
  featureCard: { flexDirection: "row", alignItems: "center", padding: 15, borderRadius: 20, backgroundColor: "#E9F2FF" },
  journeyLocked: { marginTop: 9, opacity: 0.65, backgroundColor: "#E6E3E9" },
  featureIcon: { width: 50, height: 50, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  featureEmoji: { fontSize: 25 },
  featureCopy: { flex: 1, marginLeft: 13 },
  featureTitle: { fontSize: 14, fontWeight: "800", color: "#273548" },
  featureText: { marginTop: 4, fontSize: 11, color: "#657286" },
  chevron: { fontSize: 27, color: "#77869A" },
  mailCard: { flexDirection: "row", alignItems: "center", marginBottom: 9, padding: 15, borderRadius: 18, backgroundColor: "#FFFFFF" },
  unreadDot: { width: 8, height: 8, borderRadius: 4, marginRight: 11, backgroundColor: "#7C5CFC" },
  readDot: { backgroundColor: "#D2CED7" },
  mailCopy: { flex: 1 },
  mailSubject: { fontSize: 13, fontWeight: "800", color: "#302A37" },
  mailPreview: { marginTop: 4, fontSize: 11, lineHeight: 16, color: "#7B7480" },
  mailIcon: { marginLeft: 12, color: "#756C7C" },
  chatButton: { alignItems: "center", marginTop: 25, paddingVertical: 16, borderRadius: 20, backgroundColor: "#6D4FE3" },
  chatButtonText: { fontSize: 15, fontWeight: "800", color: "#FFFFFF" },
  gameButton: { flexDirection: "row", alignItems: "center", marginTop: 10, padding: 15, borderRadius: 20, backgroundColor: "#FFF0C5" }, gameButtonIcon: { fontSize: 13, fontWeight: "900", color: "#876913" }, gameButtonCopy: { flex: 1, marginLeft: 12 }, gameButtonTitle: { fontSize: 13, fontWeight: "900", color: "#57430D" }, gameButtonText: { marginTop: 3, fontSize: 9, color: "#806D39" }, gameButtonArrow: { fontSize: 25, color: "#8A6D22" },
  missing: { flex: 1, alignItems: "center", justifyContent: "center" },
  link: { marginTop: 12, color: "#6D4FE3" },
});
