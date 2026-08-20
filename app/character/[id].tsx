import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { characterJourneys, characterMails, inventory, outfits } from "@/data/character-content";
import { getCharacterViewById } from "@/features/characters";
import { getRelationshipStage } from "@/utils/relationship";

const OUTFIT_EMOJI: Record<string, string> = {
  "daily-knit": "🧶",
  "starlight-coat": "🌌",
  "summer-sailor": "⛵",
  "moon-festival": "🌕",
};

export default function CharacterHomeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const view = getCharacterViewById(id);
  const ownedOutfitIds = useMemo(() => new Set(inventory.map((item) => item.outfitId)), []);
  const characterOutfits = outfits.filter((outfit) => outfit.characterIds.includes(id));
  const [equippedOutfitId, setEquippedOutfitId] = useState(
    inventory.find((item) => item.equippedCharacterId === id)?.outfitId ?? characterOutfits[0]?.id,
  );

  if (!view) {
    return <View style={styles.missing}><Text>Character not found.</Text><Pressable onPress={() => router.back()}><Text style={styles.link}>Go back</Text></Pressable></View>;
  }

  const { character, companion } = view;
  const relationship = getRelationshipStage(companion.relationshipLevel - 1);
  const journeys = characterJourneys.filter((journey) => journey.companionId === id);
  const mails = characterMails.filter((mail) => mail.characterId === id);
  const daysTogether = 28;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Pressable style={styles.backButton} onPress={() => router.back()}><Text style={styles.backText}>‹ Characters</Text></Pressable>

      <View style={styles.hero}>
        <View style={styles.avatar}><Text style={styles.avatarEmoji}>{character.emoji ?? "🙂"}</Text></View>
        <Text style={styles.name}>{character.displayName}</Text>
        <Text style={styles.outfitLabel}>{characterOutfits.find((item) => item.id === equippedOutfitId)?.name ?? "Default look"}</Text>
        <View style={styles.bondBadge}><Text style={styles.bondBadgeText}>{relationship.emoji} {relationship.name}</Text></View>
        <Text style={styles.status}>{companion.status}</Text>
      </View>

      <View style={styles.statsRow}>
        <Stat value={daysTogether} label="Days together" />
        <Stat value={146} label="Messages" />
        <Stat value={companion.relationshipLevel} label="Bond level" />
      </View>

      <SectionHeader title="Wardrobe" detail={`${ownedOutfitIds.size}/${characterOutfits.length} unlocked`} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.outfitRow}>
        {characterOutfits.map((outfit) => {
          const owned = ownedOutfitIds.has(outfit.id);
          const selected = equippedOutfitId === outfit.id;
          return (
            <Pressable key={outfit.id} disabled={!owned} onPress={() => setEquippedOutfitId(outfit.id)} style={[styles.outfitCard, !owned && styles.lockedCard, selected && styles.selectedCard]}>
              <Text style={styles.outfitEmoji}>{owned ? OUTFIT_EMOJI[outfit.id] : "🔒"}</Text>
              <Text style={[styles.outfitName, !owned && styles.muted]} numberOfLines={1}>{outfit.name}</Text>
              <Text style={styles.outfitRarity}>{selected ? "EQUIPPED" : owned ? outfit.rarity.toUpperCase() : "LOCKED"}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <SectionHeader title={`${character.displayName}'s journeys`} detail={`${journeys.length} returned`} />
      <View style={styles.featureCard}>
        <View style={styles.featureIcon}><Text style={styles.featureEmoji}>🗺️</Text></View>
        <View style={styles.featureCopy}><Text style={styles.featureTitle}>Kyoto after the rain</Text><Text style={styles.featureText}>Returned with a postcard · 9 days ago</Text></View>
        <Text style={styles.chevron}>›</Text>
      </View>

      <SectionHeader title="Mail from your character" detail={`${mails.filter((mail) => !mail.readAt).length} unread`} />
      {mails.map((mail) => (
        <View key={mail.id} style={styles.mailCard}>
          <View style={[styles.unreadDot, mail.readAt && styles.readDot]} />
          <View style={styles.mailCopy}><Text style={styles.mailSubject}>{mail.subject}</Text><Text style={styles.mailPreview} numberOfLines={2}>{mail.body}</Text></View>
          <Text style={styles.mailIcon}>✉</Text>
        </View>
      ))}

      <Pressable style={styles.chatButton} onPress={() => router.push({ pathname: "/chat", params: { id } })}>
        <Text style={styles.chatButtonText}>Talk with {character.displayName}</Text>
      </Pressable>
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
  stat: { flex: 1, alignItems: "center", borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: "#DED9E5" },
  statValue: { fontSize: 22, fontWeight: "900", color: "#322B3B" },
  statLabel: { marginTop: 3, fontSize: 9, color: "#807887" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 25, marginBottom: 11 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#29242F" },
  sectionDetail: { fontSize: 11, fontWeight: "700", color: "#745BDB" },
  outfitRow: { gap: 10, paddingRight: 18 },
  outfitCard: { width: 116, padding: 13, borderRadius: 18, backgroundColor: "#FFFFFF", borderWidth: 2, borderColor: "transparent" },
  selectedCard: { borderColor: "#7C5CFC", backgroundColor: "#F4F0FF" },
  lockedCard: { opacity: 0.55, backgroundColor: "#E4E2E6" },
  outfitEmoji: { fontSize: 31 },
  outfitName: { marginTop: 9, fontSize: 12, fontWeight: "800", color: "#332E39" },
  outfitRarity: { marginTop: 4, fontSize: 8, fontWeight: "800", color: "#7967C9" },
  muted: { color: "#8D8991" },
  featureCard: { flexDirection: "row", alignItems: "center", padding: 15, borderRadius: 20, backgroundColor: "#E9F2FF" },
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
  missing: { flex: 1, alignItems: "center", justifyContent: "center" },
  link: { marginTop: 12, color: "#6D4FE3" },
});
