import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { demoAccount, demoAccountStats } from "@/data/account";
import { SERIES_INFO } from "@/data/characters";
import { visitedPlaces } from "@/data/user-journey";
import { getAccountTitle, getNextAccountTitle } from "@/features/account";
import { getCharacterViews } from "@/features/characters";

const LEVEL_EXPERIENCE_TARGET = 3200;

export default function MeScreen() {
  const title = getAccountTitle(demoAccount.level);
  const nextTitle = getNextAccountTitle(demoAccount.level);
  const characterViews = getCharacterViews();
  const unlockedCharacters = characterViews.filter(({ companion }) => companion.unlocked).length;
  const totalCharacters = Object.values(SERIES_INFO).reduce((sum, series) => sum + series.total, 0);
  const levelProgress = Math.min(demoAccount.experience / LEVEL_EXPERIENCE_TARGET, 1);
  const collectionProgress = totalCharacters === 0 ? 0 : unlockedCharacters / totalCharacters;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.identityCard}>
        <View style={styles.levelOrb}>
          <Text style={styles.levelCaption}>LEVEL</Text>
          <Text style={styles.levelNumber}>{demoAccount.level}</Text>
        </View>
        <View style={styles.identityCopy}>
          <Text style={styles.eyebrow}>COLLECTOR PROFILE</Text>
          <Text style={styles.name}>{demoAccount.displayName}</Text>
          <View style={[styles.titleBadge, { backgroundColor: title.accent }]}>
            <Text style={styles.titleBadgeText}>✦ {title.name}</Text>
          </View>
        </View>
      </View>

      <View style={styles.levelCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Account Level</Text>
          <Text style={styles.experienceText}>{demoAccount.experience.toLocaleString()} / {LEVEL_EXPERIENCE_TARGET.toLocaleString()} EXP</Text>
        </View>
        <View style={styles.levelTrack}>
          <View style={[styles.levelFill, { width: `${levelProgress * 100}%` }]} />
        </View>
        <Text style={styles.levelHint}>
          {nextTitle ? `${nextTitle.minimumLevel - demoAccount.level} levels until “${nextTitle.name}”` : "Highest title achieved"}
        </Text>
      </View>

      <View style={styles.walletCard}>
        <View>
          <Text style={styles.walletLabel}>BUBBLE BALANCE</Text>
          <Text style={styles.walletValue}>◉ {demoAccountStats.bubbles.toLocaleString()}</Text>
        </View>
        <View style={styles.walletDecoration}><Text style={styles.walletDecorationText}>B</Text></View>
      </View>
      <Pressable style={styles.shopButton} onPress={() => router.push("/shop")}>
        <View><Text style={styles.shopEyebrow}>BUBBLE SHOP</Text><Text style={styles.shopTitle}>Discover outfits & limited drops</Text></View>
        <Text style={styles.shopArrow}>›</Text>
      </Pressable>

      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionHeading}>My world journey</Text>
        <Text style={styles.viewAll}>{visitedPlaces.length} places lit</Text>
      </View>
      <View style={styles.mapCard}>
        <Text style={styles.mapBackdrop}>·    ◉       ·  ◉    ·{`\n`}   ·      ◉       ·</Text>
        <View style={styles.mapCopy}><Text style={styles.mapTitle}>Your collection across the world</Text><Text style={styles.mapText}>Stores and events light up automatically after a verified purchase or check-in.</Text></View>
        <View style={styles.placeRow}>{visitedPlaces.map((place) => <View key={place.id} style={styles.placePill}><Text style={styles.placeText}>● {place.city}</Text></View>)}</View>
      </View>

      <Text style={styles.sectionHeading}>My collection</Text>
      <View style={styles.collectionCard}>
        <View style={styles.collectionRing}>
          <Text style={styles.collectionPercent}>{Math.round(collectionProgress * 100)}%</Text>
          <Text style={styles.collectionRingLabel}>COMPLETE</Text>
        </View>
        <View style={styles.collectionCopy}>
          <Text style={styles.collectionCount}>{unlockedCharacters} / {totalCharacters} characters</Text>
          <Text style={styles.collectionDescription}>Every physical collectible expands your digital world.</Text>
          <View style={styles.collectionTrack}>
            <View style={[styles.collectionFill, { width: `${collectionProgress * 100}%` }]} />
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatCard icon="◎" value={visitedPlaces.length} label="Places" />
        <StatCard icon="✉" value={demoAccountStats.postcards} label="Postcards" />
        <StatCard icon="♢" value={demoAccountStats.outfits} label="Outfits" />
      </View>

      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionHeading}>Showcase</Text>
        <Text style={styles.viewAll}>3 badges earned</Text>
      </View>
      <View style={styles.achievementRow}>
        <Achievement icon="🌱" name="First Bond" tone="#E7F6EC" />
        <Achievement icon="🗺️" name="Traveler" tone="#E8F1FC" />
        <Achievement icon="✨" name="Series Star" tone="#F4ECFF" />
      </View>
    </ScrollView>
  );
}

function StatCard({ icon, value, label }: { icon: string; value: number; label: string }) {
  return <View style={styles.statCard}><Text style={styles.statIcon}>{icon}</Text><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
}

function Achievement({ icon, name, tone }: { icon: string; name: string; tone: string }) {
  return <View style={styles.achievement}><View style={[styles.achievementIcon, { backgroundColor: tone }]}><Text style={styles.achievementEmoji}>{icon}</Text></View><Text style={styles.achievementName}>{name}</Text></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F6F4FA" },
  content: { paddingHorizontal: 18, paddingTop: 62, paddingBottom: 44, gap: 16 },
  identityCard: { flexDirection: "row", alignItems: "center", padding: 20, borderRadius: 26, backgroundColor: "#241B3A" },
  levelOrb: { width: 92, height: 92, borderRadius: 46, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "#BFA9FF", backgroundColor: "#352654" },
  levelCaption: { fontSize: 10, fontWeight: "800", letterSpacing: 1.4, color: "#CFC2F7" },
  levelNumber: { marginTop: -2, fontSize: 38, fontWeight: "900", color: "#FFFFFF" },
  identityCopy: { flex: 1, marginLeft: 18, alignItems: "flex-start" },
  eyebrow: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5, color: "#AA9BBC" },
  name: { marginTop: 4, fontSize: 27, fontWeight: "800", color: "#FFFFFF" },
  titleBadge: { marginTop: 9, paddingHorizontal: 11, paddingVertical: 6, borderRadius: 20 },
  titleBadgeText: { fontSize: 12, fontWeight: "800", color: "#FFFFFF" },
  levelCard: { padding: 17, borderRadius: 20, backgroundColor: "#FFFFFF" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#29252F" },
  experienceText: { fontSize: 11, fontWeight: "700", color: "#746D7E" },
  levelTrack: { height: 10, marginTop: 13, borderRadius: 5, overflow: "hidden", backgroundColor: "#ECE8F4" },
  levelFill: { height: "100%", borderRadius: 5, backgroundColor: "#7C5CFC" },
  levelHint: { marginTop: 9, fontSize: 12, color: "#756D7F" },
  walletCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", overflow: "hidden", padding: 20, borderRadius: 22, backgroundColor: "#FFF1C9" },
  walletLabel: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5, color: "#8C6B14" },
  walletValue: { marginTop: 5, fontSize: 29, fontWeight: "900", color: "#5D4300" },
  walletDecoration: { width: 57, height: 57, borderRadius: 29, alignItems: "center", justifyContent: "center", backgroundColor: "#F7C948" },
  walletDecorationText: { fontSize: 27, fontWeight: "900", color: "#6B4B00" },
  shopButton: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, paddingVertical: 15, borderRadius: 19, backgroundColor: "#6D4FE3" },
  shopEyebrow: { fontSize: 9, fontWeight: "800", letterSpacing: 1.2, color: "#D7CEFF" },
  shopTitle: { marginTop: 3, fontSize: 14, fontWeight: "800", color: "#FFFFFF" },
  shopArrow: { fontSize: 30, color: "#FFFFFF" },
  mapCard: { overflow: "hidden", padding: 18, borderRadius: 22, backgroundColor: "#DFF3EE" },
  mapBackdrop: { position: "absolute", right: 12, top: 6, fontSize: 20, lineHeight: 28, color: "#58A997", opacity: 0.4 },
  mapCopy: { maxWidth: "75%" },
  mapTitle: { fontSize: 15, fontWeight: "800", color: "#214A42" },
  mapText: { marginTop: 5, fontSize: 11, lineHeight: 16, color: "#577B74" },
  placeRow: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 14 },
  placePill: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 13, backgroundColor: "#FFFFFF" },
  placeText: { fontSize: 9, fontWeight: "700", color: "#327465" },
  sectionHeading: { marginTop: 5, fontSize: 19, fontWeight: "800", color: "#29252F" },
  collectionCard: { flexDirection: "row", alignItems: "center", padding: 18, borderRadius: 22, backgroundColor: "#FFFFFF" },
  collectionRing: { width: 82, height: 82, borderRadius: 41, borderWidth: 8, borderColor: "#8B72F7", alignItems: "center", justifyContent: "center" },
  collectionPercent: { fontSize: 20, fontWeight: "900", color: "#3E315C" },
  collectionRingLabel: { fontSize: 7, fontWeight: "800", letterSpacing: 0.7, color: "#877C93" },
  collectionCopy: { flex: 1, marginLeft: 17 },
  collectionCount: { fontSize: 16, fontWeight: "800", color: "#302A39" },
  collectionDescription: { marginTop: 5, fontSize: 12, lineHeight: 17, color: "#7B7484" },
  collectionTrack: { height: 6, marginTop: 11, overflow: "hidden", borderRadius: 3, backgroundColor: "#EBE8F0" },
  collectionFill: { height: "100%", borderRadius: 3, backgroundColor: "#8B72F7" },
  statsGrid: { flexDirection: "row", gap: 10 },
  statCard: { flex: 1, alignItems: "center", paddingVertical: 15, borderRadius: 18, backgroundColor: "#FFFFFF" },
  statIcon: { fontSize: 18, color: "#665481" },
  statValue: { marginTop: 5, fontSize: 21, fontWeight: "800", color: "#302A39" },
  statLabel: { marginTop: 2, fontSize: 10, color: "#7C7585" },
  sectionTitleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  viewAll: { fontSize: 11, fontWeight: "700", color: "#7C5CFC" },
  achievementRow: { flexDirection: "row", justifyContent: "space-between", padding: 16, borderRadius: 22, backgroundColor: "#FFFFFF" },
  achievement: { width: "31%", alignItems: "center" },
  achievementIcon: { width: 58, height: 58, borderRadius: 29, alignItems: "center", justifyContent: "center" },
  achievementEmoji: { fontSize: 26 },
  achievementName: { marginTop: 8, fontSize: 11, fontWeight: "700", textAlign: "center", color: "#514A59" },
});
