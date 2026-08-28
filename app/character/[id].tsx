import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import LanguageToggle from "@/components/LanguageToggle";
import { characterMails, inventory, outfits } from "@/data/character-content";
import { characterNamesZh, mailTranslationsZh } from "@/data/localized-content";
import { getCharacterCanon, getCharacterGrowth, getCharacterViewById, getStoryEvent } from "@/features/characters";
import { getJourneyOptions } from "@/features/travel";
import { useLanguage } from "@/hooks/use-language";
import { AFFINITY_LEVELS, getAffinityLevel, useAffinity } from "@/hooks/use-affinity";
import { useStoryEvents } from "@/hooks/use-story-events";
import { useUnlocks } from "@/hooks/use-unlocks";

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
  const stories = useStoryEvents();
  const unlocks = useUnlocks();
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
  if(!unlocks.isUnlocked(id)){return <View style={styles.missing}><Text style={styles.lockedTitle}>{text("Character locked","角色尚未解锁")}</Text><Text style={styles.lockedText}>{text("Redeem the matching physical product code before entering this character's world.","请先兑换对应实体商品码，再进入这个角色的世界。")}</Text><Pressable style={styles.unlockLink} onPress={()=>router.replace("/unlock" as never)}><Text style={styles.unlockLinkText}>{text("Open redemption","前往兑换")}</Text></Pressable></View>}

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
  const canon = getCharacterCanon(id);
  const career = getCharacterGrowth(id, bondLevel);
  const nextCareer = canon?.growth.find((stage) => stage.bondLevel > bondLevel);
  const futureGrowth = canon?.growth.filter((stage) => stage.bondLevel > bondLevel).slice(0, 3) ?? [];
  const storyEvent = getStoryEvent(id);
  const storyState = storyEvent ? stories.getState(storyEvent) : undefined;

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

      {canon && career && <View style={styles.canonCard}><Text style={styles.canonEyebrow}>{text("ORIGINAL CHARACTER CANON", "原创角色正典")}</Text><Text style={styles.canonOrigin}>{language === "zh" ? canon.originZh : canon.originEn}</Text><View style={styles.careerNow}><Text style={styles.careerLabel}>{text("Current identity", "当前身份")}</Text><Text style={styles.careerTitle}>{language === "zh" ? career.titleZh : career.titleEn}</Text><Text style={styles.careerDetail}>{language === "zh" ? career.detailZh : career.detailEn}</Text></View>{nextCareer && <View style={styles.careerNext}><Text style={styles.nextLock}>🔒</Text><View style={{flex:1}}><Text style={styles.nextLabel}>{text(`Bond Lv.${nextCareer.bondLevel} growth`, `好感 ${nextCareer.bondLevel} 级成长`)}</Text><Text style={styles.nextTitle}>{language === "zh" ? nextCareer.titleZh : nextCareer.titleEn}</Text></View></View>}</View>}

      {storyEvent && storyState && <View style={styles.storyCard}><View style={styles.storyTop}><View style={{flex:1}}><Text style={styles.storyEyebrow}>{storyState.claimed?text("EVENT ARCHIVED","事件已归档"):text("LIVE CHARACTER EVENT","角色事件进行中")}</Text><Text style={styles.storyTitle}>{language==="zh"?storyEvent.titleZh:storyEvent.titleEn}</Text></View><Text style={styles.storyProgress}>{storyState.completedCount}/{storyState.objectives.length}</Text></View><Text style={styles.storyPremise}>{language==="zh"?storyEvent.premiseZh:storyEvent.premiseEn}</Text><View style={styles.objectiveList}>{storyState.objectives.map((objective,index)=><View key={`${objective.type}-${index}`} style={styles.objective}><Text style={styles.objectiveCheck}>{objective.complete?"✓":"○"}</Text><Text style={styles.objectiveText}>{language==="zh"?objective.labelZh:objective.labelEn}</Text><Text style={styles.objectiveCount}>{objective.current}/{objective.target}</Text></View>)}</View><Text style={styles.storyMailHint}>{text("Each completed objective delivers a new story letter.","每完成一项目标，角色都会寄来一封新的剧情邮件。")}</Text><Pressable disabled={!storyState.completed||storyState.claimed} onPress={()=>stories.claim(storyEvent)} style={[styles.claimButton,(!storyState.completed||storyState.claimed)&&styles.claimDisabled]}><Text style={styles.claimText}>{storyState.claimed?text("Reward claimed","奖励已领取"):storyState.completed?text(`Claim ${storyEvent.rewardBubbles} Bubble · ${storyEvent.rewardBond} Bond`,`领取 ${storyEvent.rewardBubbles} Bubble · ${storyEvent.rewardBond} 好感`):text("Complete all objectives to claim","完成全部目标后领取")}</Text></Pressable></View>}

      <View style={styles.affinityCard}><View style={styles.affinityTop}><Text style={styles.affinityTitle}>{text("Bond journey", "好感度旅程")}</Text><Text style={styles.affinityPoints}>{bondLevel >= AFFINITY_LEVELS.length ? `${bondPoints} ♥` : `${bondPoints} / ${nextThreshold} ♥`}</Text></View><View style={styles.affinityTrack}><View style={[styles.affinityFill,{width:`${Math.max(0,Math.min(bondProgress,1))*100}%`}]} /></View><View style={styles.milestoneRow}>{futureGrowth.length ? futureGrowth.map((item)=><View key={item.bondLevel} style={styles.milestone}><View style={styles.milestoneLock}><Text style={styles.milestoneIcon}>🔒</Text></View><Text style={styles.milestoneLevel}>♥ {item.bondLevel}</Text><Text style={styles.milestoneName}>{language === "zh" ? item.titleZh : item.titleEn}</Text></View>) : <View style={styles.completedGrowth}><Text style={styles.completedGrowthText}>{text("All current character chapters completed", "当前角色篇章已全部完成")}</Text></View>}</View></View>

      {canon && <><SectionHeader title={text("Life path", "人物履历")} detail={`${canon.growth.filter((stage)=>stage.bondLevel<=bondLevel).length}/${canon.growth.length}`} />{canon.growth.map((stage)=>{const unlocked=stage.bondLevel<=bondLevel;const current=career?.bondLevel===stage.bondLevel;return <View key={stage.bondLevel} style={[styles.historyRow,!unlocked&&styles.historyLocked,current&&styles.historyCurrent]}><View style={styles.historyMarker}><Text style={styles.historyMarkerText}>{unlocked?current?"◆":"✓":"🔒"}</Text></View><View style={{flex:1}}><Text style={styles.historyLevel}>{text(`BOND ${stage.bondLevel}`,`好感 ${stage.bondLevel} 级`)}</Text><Text style={styles.historyTitle}>{language==="zh"?stage.titleZh:stage.titleEn}</Text><Text style={styles.historyDetail}>{unlocked?(language==="zh"?stage.detailZh:stage.detailEn):text("Reach this bond level to reveal the chapter.","达到对应好感等级后揭晓这一篇章。")}</Text></View></View>})}</>}

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
  canonCard:{marginTop:12,padding:17,borderRadius:22,backgroundColor:"#F0E9D9"},canonEyebrow:{fontSize:8,fontWeight:"900",letterSpacing:1.2,color:"#8A6E37"},canonOrigin:{marginTop:7,fontSize:11,lineHeight:17,color:"#5D513D"},careerNow:{marginTop:13,padding:14,borderRadius:17,backgroundColor:"#FFF9ED"},careerLabel:{fontSize:8,fontWeight:"900",color:"#9A7A3A"},careerTitle:{marginTop:4,fontSize:15,fontWeight:"900",color:"#443722"},careerDetail:{marginTop:4,fontSize:9,lineHeight:14,color:"#75654A"},careerNext:{flexDirection:"row",alignItems:"center",marginTop:9,padding:12,borderRadius:16,backgroundColor:"#DED6C8"},nextLock:{marginRight:11,fontSize:17},nextLabel:{fontSize:8,fontWeight:"800",color:"#867962"},nextTitle:{marginTop:3,fontSize:11,fontWeight:"900",color:"#5B5142"},
  eventCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12, padding: 16, borderRadius: 22, backgroundColor: "#DDEBFF" }, eventEyebrow: { fontSize: 8, fontWeight: "900", letterSpacing: 1.1, color: "#4672A8" }, eventTitle: { marginTop: 4, fontSize: 15, fontWeight: "900", color: "#243C5C" }, eventDetail: { maxWidth: 250, marginTop: 5, fontSize: 9, lineHeight: 13, color: "#5C7190" }, eventProgress: { fontSize: 21, fontWeight: "900", color: "#3F6FA9" },
  storyCard:{marginTop:12,padding:17,borderRadius:23,backgroundColor:"#DDEBFF"},storyTop:{flexDirection:"row",alignItems:"center"},storyEyebrow:{fontSize:8,fontWeight:"900",letterSpacing:1.1,color:"#4672A8"},storyTitle:{marginTop:4,fontSize:17,fontWeight:"900",color:"#243C5C"},storyProgress:{fontSize:22,fontWeight:"900",color:"#3F6FA9"},storyPremise:{marginTop:8,fontSize:10,lineHeight:16,color:"#5C7190"},objectiveList:{marginTop:12,gap:7},objective:{flexDirection:"row",alignItems:"center",padding:10,borderRadius:14,backgroundColor:"#F5F9FF"},objectiveCheck:{width:23,fontSize:14,fontWeight:"900",color:"#4E7AB0"},objectiveText:{flex:1,fontSize:10,fontWeight:"700",color:"#344E6C"},objectiveCount:{fontSize:10,fontWeight:"900",color:"#537BA8"},storyMailHint:{marginTop:9,fontSize:8,lineHeight:13,color:"#617C9B"},claimButton:{alignItems:"center",marginTop:11,paddingVertical:12,borderRadius:15,backgroundColor:"#4F75B6"},claimDisabled:{backgroundColor:"#A9BAD1"},claimText:{fontSize:10,fontWeight:"900",color:"#FFFFFF"},
  affinityCard: { marginTop: 12, padding: 17, borderRadius: 22, backgroundColor: "#FFF" }, affinityTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, affinityTitle: { fontSize: 15, fontWeight: "900", color: "#342D3C" }, affinityPoints: { fontSize: 10, fontWeight: "900", color: "#D65B81" }, affinityTrack: { height: 10, marginTop: 12, overflow: "hidden", borderRadius: 5, backgroundColor: "#F1DDE5" }, affinityFill: { height: "100%", borderRadius: 5, backgroundColor: "#E7648E" }, milestoneRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 }, milestone: { width: "31%", alignItems: "center" }, milestoneLock: { width: 35, height: 35, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: "#EEEAF2" }, milestoneIcon: { fontSize: 13 }, milestoneLevel: { marginTop: 5, fontSize: 8, fontWeight: "900", color: "#D65B81" }, milestoneName: { marginTop: 2, fontSize: 8, textAlign: "center", color: "#756D7B" },
  completedGrowth:{flex:1,alignItems:"center",padding:12,borderRadius:15,backgroundColor:"#F3E8ED"},completedGrowthText:{fontSize:10,fontWeight:"800",color:"#A04968"},historyRow:{flexDirection:"row",alignItems:"flex-start",marginBottom:8,padding:14,borderRadius:18,backgroundColor:"#FFFFFF"},historyLocked:{opacity:.55,backgroundColor:"#E7E4E9"},historyCurrent:{borderWidth:2,borderColor:"#D8B25E",backgroundColor:"#FFF9EA"},historyMarker:{width:34,height:34,marginRight:12,borderRadius:17,alignItems:"center",justifyContent:"center",backgroundColor:"#EEE7F7"},historyMarkerText:{fontSize:12,fontWeight:"900",color:"#7257C8"},historyLevel:{fontSize:7,fontWeight:"900",letterSpacing:1,color:"#9070C5"},historyTitle:{marginTop:3,fontSize:13,fontWeight:"900",color:"#3B3441"},historyDetail:{marginTop:4,fontSize:9,lineHeight:14,color:"#766E7B"},
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
  lockedTitle:{fontSize:23,fontWeight:"900",color:"#302936"},lockedText:{maxWidth:280,marginTop:8,fontSize:11,lineHeight:17,textAlign:"center",color:"#7A7280"},unlockLink:{marginTop:17,paddingHorizontal:18,paddingVertical:12,borderRadius:16,backgroundColor:"#6D4FE3"},unlockLinkText:{fontSize:12,fontWeight:"900",color:"#FFF"},
});
