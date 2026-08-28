import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import CharacterCard from "@/components/CharacterCard";
import LanguageToggle from "@/components/LanguageToggle";
import { SERIES_INFO } from "@/data/characters";
import { characterNamesZh } from "@/data/localized-content";
import { getCharacterViews } from "@/features/characters";
import { useLanguage } from "@/hooks/use-language";
import { useUnlocks } from "@/hooks/use-unlocks";

const CARD_MIN_WIDTH = 160;
const CARD_GAP = 10;
const PAGE_HORIZONTAL_PADDING = 16;
const MAX_CONTENT_WIDTH = 1200;

export default function CharacterScreen() {
  const { language, text } = useLanguage();
  const { width } = useWindowDimensions();
  const unlocks = useUnlocks();

  const characterViews = getCharacterViews();

  const availableWidth = Math.min(
    width - PAGE_HORIZONTAL_PADDING * 2,
    MAX_CONTENT_WIDTH
  );

  const columnCount = Math.max(
    1,
    Math.floor(
      (availableWidth + CARD_GAP) /
        (CARD_MIN_WIDTH + CARD_GAP)
    )
  );

  const cardWidth =
    (availableWidth - CARD_GAP * (columnCount - 1)) /
    columnCount;

  const seriesNames = [
    ...new Set(
      characterViews.map(({ character }) => character.series)
    ),
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.page}>
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>{text("Characters", "角色")}</Text>
          <LanguageToggle compact />
        </View>

        <Text style={styles.pageSubtitle}>
          {text("Choose someone to spend time with.", "选择一位角色，开始你们的陪伴旅程。")}
        </Text>
        <Pressable style={styles.unlockButton} onPress={()=>router.push("/unlock" as never)}><View><Text style={styles.unlockEyebrow}>{text("PHYSICAL → DIGITAL","实体 → 数字")}</Text><Text style={styles.unlockTitle}>{text("Redeem a character","兑换角色")}</Text></View><Text style={styles.unlockArrow}>›</Text></Pressable>

        {seriesNames.map((seriesName) => {
          const seriesCharacters = characterViews.filter(
            ({ character }) => character.series === seriesName
          );
          const unlockedCount = seriesCharacters.filter(({ character }) => unlocks.isUnlocked(character.id)).length;
          const totalCount = SERIES_INFO[seriesName].total;
          const completion = totalCount === 0 ? 0 : unlockedCount / totalCount;

          return (
            <View key={seriesName} style={styles.seriesSection}>
              <View style={styles.seriesHeader}>
                <View>
                  <Text style={styles.seriesTitle}>{SERIES_INFO[seriesName].title}</Text>
                  <Text style={styles.seriesProgressLabel}>
                    {text(`${unlockedCount}/${totalCount} unlocked`, `已解锁 ${unlockedCount}/${totalCount}`)}
                  </Text>
                </View>
                <Text style={styles.seriesFraction}>({unlockedCount}/{totalCount})</Text>
              </View>

              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${completion * 100}%` }]} />
              </View>

              <View style={styles.grid}>
                {seriesCharacters.map(
                  ({ character, companion }) => { const unlocked=unlocks.isUnlocked(character.id); return (
                    <View
                      key={character.id}
                      style={[
                        styles.cardWrapper,
                        {
                          width: cardWidth,
                        },
                      ]}
                    >
                      <CharacterCard
                        name={language === "zh" ? character.displayNameZh ?? characterNamesZh[character.displayName] ?? character.displayName : character.displayName}
                        emoji={character.emoji ?? "🙂"}
                        level={companion.level}
                        status={language === "zh" ? character.statusZh ?? companion.status : companion.status}
                        language={language}
                        unlocked={unlocked}
                        onPress={() =>
                          router.push({
                            pathname: "/character/[id]",
                            params: {
                              id: character.id,
                            },
                          })
                        }
                      />
                    </View>
                  )}
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: PAGE_HORIZONTAL_PADDING,
    paddingTop: 60,
    paddingBottom: 40,
  },

  page: {
    width: "100%",
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: "center",
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#222222",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  pageSubtitle: {
    marginTop: 6,
    marginBottom: 28,
    fontSize: 16,
    lineHeight: 23,
    color: "#666666",
  },
  unlockButton:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:-12,marginBottom:25,padding:16,borderRadius:19,backgroundColor:"#29203F"},unlockEyebrow:{fontSize:8,fontWeight:"900",letterSpacing:1.2,color:"#BFAEFF"},unlockTitle:{marginTop:4,fontSize:14,fontWeight:"900",color:"#FFF"},unlockArrow:{fontSize:28,color:"#FFF"},

  seriesSection: {
    marginBottom: 30,
  },

  seriesTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222222",
  },

  seriesHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 9,
  },

  seriesProgressLabel: {
    marginTop: 3,
    fontSize: 12,
    color: "#77777F",
  },

  seriesFraction: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6750A4",
  },

  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "#E0DDE8",
    marginBottom: 14,
  },

  progressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#7C5CFC",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: CARD_GAP,
  },

  cardWrapper: {
    minWidth: 0,
  },
});
