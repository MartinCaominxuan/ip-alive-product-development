import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import LanguageToggle from "@/components/LanguageToggle";
import { demoAccount, demoAccountStats } from "@/data/account";
import { SERIES_INFO } from "@/data/characters";
import { visitedPlaces } from "@/data/user-journey";
import { getAccountTitle, getNextAccountTitle } from "@/features/account";
import { getCharacterViews } from "@/features/characters";
import { useLanguage } from "@/hooks/use-language";
import { useGameProgress } from "@/hooks/use-game-progress";
import { useLifeProgress } from "@/hooks/use-life-progress";

const LEVEL_EXPERIENCE_TARGET = 10000;

export default function MeScreen() {
  const { text } = useLanguage();
  const { bubbles, lifetimeScore, accountExperience, accountLevel } = useGameProgress();
  const life = useLifeProgress();
  const title = getAccountTitle(accountLevel);
  const nextTitle = getNextAccountTitle(accountLevel);
  const characterViews = getCharacterViews();
  const unlockedCharacters = characterViews.filter(({ companion }) => companion.unlocked).length;
  const totalCharacters = Object.values(SERIES_INFO).reduce((sum, series) => sum + series.total, 0);
  const experienceInLevel = accountExperience % LEVEL_EXPERIENCE_TARGET;
  const levelProgress = experienceInLevel / LEVEL_EXPERIENCE_TARGET;
  const collectionProgress = totalCharacters === 0 ? 0 : unlockedCharacters / totalCharacters;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.pageTop}><Text style={styles.pageTitle}>{text("Me", "我的")}</Text><LanguageToggle /></View>
      <Pressable style={styles.identityCard} onPress={() => router.push({ pathname: "/me/[section]", params: { section: "level" } })}>
        <View style={styles.levelOrb}>
          <Text style={styles.levelCaption}>LEVEL</Text>
          <Text style={styles.levelNumber}>{accountLevel}</Text>
        </View>
        <View style={styles.identityCopy}>
          <Text style={styles.eyebrow}>{text("COLLECTOR PROFILE", "收藏家档案")}</Text>
          <Text style={styles.name}>{demoAccount.displayName}</Text>
          <View style={[styles.titleBadge, { backgroundColor: title.accent }]}>
          <Text style={styles.titleBadgeText}>✦ {text(title.name, title.name === "World Weaver" ? "世界织梦者" : title.name === "Time Friend" ? "时空旅伴" : "收藏家")}</Text>
          </View>
        </View>
      </Pressable>

      <Pressable style={styles.levelCard} onPress={() => router.push({ pathname: "/me/[section]", params: { section: "level" } })}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>{text("Account Level", "账号等级")}</Text>
          <Text style={styles.experienceText}>{experienceInLevel.toLocaleString()} / {LEVEL_EXPERIENCE_TARGET.toLocaleString()} EXP</Text>
        </View>
        <View style={styles.levelTrack}>
          <View style={[styles.levelFill, { width: `${levelProgress * 100}%` }]} />
        </View>
        <Text style={styles.levelHint}>
          {nextTitle ? text(`${nextTitle.minimumLevel - accountLevel} levels until “${nextTitle.name}”`, `距离下一称号还差 ${nextTitle.minimumLevel - accountLevel} 级`) : text("Highest title achieved", "已获得最高称号")}
        </Text>
      </Pressable>

      <Pressable style={styles.walletCard} onPress={() => router.push({ pathname: "/me/[section]", params: { section: "wallet" } })}>
        <View>
          <Text style={styles.walletLabel}>{text("BUBBLE BALANCE", "BUBBLE 余额")}</Text>
          <Text style={styles.walletValue}>◉ {bubbles.toLocaleString()}</Text>
        </View>
        <View style={styles.walletDecoration}><Text style={styles.walletDecorationText}>B</Text></View>
      </Pressable>
      <View style={styles.gameAccount}><View><Text style={styles.gameAccountLabel}>{text("MATCH ACCOUNT", "三消账户")}</Text><Text style={styles.gameAccountValue}>{lifetimeScore.toLocaleString()}</Text></View><Text style={styles.gameAccountUnit}>{text("lifetime points", "累计积分")}</Text></View>
      <Pressable style={styles.shopButton} onPress={() => router.push("/shop")}>
        <View><Text style={styles.shopEyebrow}>BUBBLE SHOP</Text><Text style={styles.shopTitle}>{text("Discover outfits & limited drops", "探索服装与限定商品")}</Text></View>
        <Text style={styles.shopArrow}>›</Text>
      </Pressable>
      <Pressable style={styles.lifeButton} onPress={() => router.push("/life" as never)}><View><Text style={styles.lifeEyebrow}>{text("LIFE COMPANION", "生活陪伴")}</Text><Text style={styles.lifeTitle}>{text("Goals, schedule, budget & health", "目标、日程、预算与健康")}</Text><Text style={styles.lifeText}>{text("Real records · Smart daily allocation · Achievements", "真实记录 · 智能每日分配 · 生活成就")}</Text></View><Text style={styles.lifeArrow}>›</Text></Pressable>

      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionHeading}>{text("My world journey", "我的世界足迹")}</Text>
        <Text style={styles.viewAll}>{text(`${visitedPlaces.length} places lit`, `已点亮 ${visitedPlaces.length} 个地点`)}</Text>
      </View>
      <Pressable style={styles.mapCard} onPress={() => router.push({ pathname: "/me/[section]", params: { section: "journey" } })}>
        <Text style={styles.mapBackdrop}>·    ◉       ·  ◉    ·{`\n`}   ·      ◉       ·</Text>
        <View style={styles.mapCopy}><Text style={styles.mapTitle}>{text("Your collection across the world", "你的全球收藏足迹")}</Text><Text style={styles.mapText}>{text("Stores and events light up automatically after a verified purchase or check-in.", "完成验证购买或活动签到后，地点会自动点亮。")}</Text></View>
        <View style={styles.placeRow}>{visitedPlaces.map((place) => <View key={place.id} style={styles.placePill}><Text style={styles.placeText}>● {place.city}</Text></View>)}</View>
      </Pressable>

      <Text style={styles.sectionHeading}>{text("My collection", "我的收藏")}</Text>
      <Pressable style={styles.collectionCard} onPress={() => router.push({ pathname: "/me/[section]", params: { section: "collection" } })}>
        <View style={styles.collectionRing}>
          <Text style={styles.collectionPercent}>{Math.round(collectionProgress * 100)}%</Text>
          <Text style={styles.collectionRingLabel}>{text("COMPLETE", "完成度")}</Text>
        </View>
        <View style={styles.collectionCopy}>
          <Text style={styles.collectionCount}>{unlockedCharacters} / {totalCharacters} {text("characters", "个角色")}</Text>
          <Text style={styles.collectionDescription}>{text("Every physical collectible expands your digital world.", "每一个实体收藏都会扩展你的数字世界。")}</Text>
          <View style={styles.collectionTrack}>
            <View style={[styles.collectionFill, { width: `${collectionProgress * 100}%` }]} />
          </View>
        </View>
      </Pressable>

      <View style={styles.statsGrid}>
        <StatCard icon="◎" value={visitedPlaces.length} label={text("Places", "地点")} onPress={() => router.push({ pathname: "/me/[section]", params: { section: "journey" } })} />
        <StatCard icon="✉" value={demoAccountStats.postcards} label={text("Postcards", "明信片")} onPress={() => router.push({ pathname: "/me/[section]", params: { section: "postcards" } })} />
        <StatCard icon="♢" value={demoAccountStats.outfits} label={text("Outfits", "服装")} onPress={() => router.push({ pathname: "/me/[section]", params: { section: "outfits" } })} />
      </View>

      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionHeading}>{text("Showcase", "荣誉展示")}</Text>
        <Text style={styles.viewAll}>{text("3 badges earned", "已获得 3 枚徽章")}</Text>
      </View>
      <View style={styles.achievementRow}>
        <Achievement icon="🌱" name={text("First Bond", "初次羁绊")} tone="#E7F6EC" onPress={() => router.push({ pathname: "/me/[section]", params: { section: "achievements" } })} />
        <Achievement icon="🗺️" name={text("Traveler", "旅行家")} tone="#E8F1FC" onPress={() => router.push({ pathname: "/me/[section]", params: { section: "achievements" } })} />
        <Achievement icon="✨" name={text("Series Star", "系列之星")} tone="#F4ECFF" onPress={() => router.push({ pathname: "/me/[section]", params: { section: "achievements" } })} />
      </View>
      <Pressable style={styles.lifeAchievement} onPress={() => router.push("/life" as never)}><View><Text style={styles.lifeAchievementTitle}>{text("Life achievements", "生活成就")}</Text><Text style={styles.lifeAchievementText}>{text("Earned through real tasks, budgeting and health actions", "通过真实任务、预算和健康行动获得")}</Text></View><Text style={styles.lifeAchievementCount}>{life.achievements.length}/7 ›</Text></Pressable>
    </ScrollView>
  );
}

function StatCard({ icon, value, label, onPress }: { icon: string; value: number; label: string; onPress: () => void }) {
  return <Pressable style={styles.statCard} onPress={onPress}><Text style={styles.statIcon}>{icon}</Text><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></Pressable>;
}

function Achievement({ icon, name, tone, onPress }: { icon: string; name: string; tone: string; onPress: () => void }) {
  return <Pressable style={styles.achievement} onPress={onPress}><View style={[styles.achievementIcon, { backgroundColor: tone }]}><Text style={styles.achievementEmoji}>{icon}</Text></View><Text style={styles.achievementName}>{name}</Text></Pressable>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F6F4FA" },
  content: { paddingHorizontal: 18, paddingTop: 62, paddingBottom: 44, gap: 16 },
  pageTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  pageTitle: { fontSize: 29, fontWeight: "900", color: "#2C2632" },
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
  gameAccount: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 17, paddingVertical: 14, borderRadius: 18, backgroundColor: "#E9E4F8" }, gameAccountLabel: { fontSize: 8, fontWeight: "900", letterSpacing: 1.3, color: "#7964B7" }, gameAccountValue: { marginTop: 3, fontSize: 23, fontWeight: "900", color: "#3B3156" }, gameAccountUnit: { fontSize: 9, color: "#766D83" },
  shopButton: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, paddingVertical: 15, borderRadius: 19, backgroundColor: "#6D4FE3" },
  shopEyebrow: { fontSize: 9, fontWeight: "800", letterSpacing: 1.2, color: "#D7CEFF" },
  shopTitle: { marginTop: 3, fontSize: 14, fontWeight: "800", color: "#FFFFFF" },
  shopArrow: { fontSize: 30, color: "#FFFFFF" },
  lifeButton: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 18, borderRadius: 21, backgroundColor: "#DDF2E9" }, lifeEyebrow: { fontSize: 8, fontWeight: "900", letterSpacing: 1.3, color: "#377662" }, lifeTitle: { marginTop: 4, fontSize: 15, fontWeight: "900", color: "#244D40" }, lifeText: { marginTop: 4, fontSize: 9, color: "#5A7D72" }, lifeArrow: { fontSize: 29, color: "#3E806A" },
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
  lifeAchievement: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderRadius: 19, backgroundColor: "#E7F4EE" }, lifeAchievementTitle: { fontSize: 13, fontWeight: "900", color: "#2D5E4F" }, lifeAchievementText: { maxWidth: 250, marginTop: 3, fontSize: 9, color: "#668277" }, lifeAchievementCount: { fontSize: 13, fontWeight: "900", color: "#3C7864" },
});
