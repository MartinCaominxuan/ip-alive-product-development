import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import CharacterCard from "@/components/CharacterCard";
import { SERIES_INFO } from "@/data/characters";
import { getCharacterViews } from "@/features/characters";

const CARD_MIN_WIDTH = 160;
const CARD_GAP = 10;
const PAGE_HORIZONTAL_PADDING = 16;
const MAX_CONTENT_WIDTH = 1200;

export default function CharacterScreen() {
  const { width } = useWindowDimensions();

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
        <Text style={styles.pageTitle}>Characters</Text>

        <Text style={styles.pageSubtitle}>
          Choose someone to spend time with.
        </Text>

        {seriesNames.map((seriesName) => {
          const seriesCharacters = characterViews.filter(
            ({ character }) => character.series === seriesName
          );
          const unlockedCount = seriesCharacters.filter(
            ({ companion }) => companion.unlocked
          ).length;
          const totalCount = SERIES_INFO[seriesName].total;
          const completion = totalCount === 0 ? 0 : unlockedCount / totalCount;

          return (
            <View key={seriesName} style={styles.seriesSection}>
              <View style={styles.seriesHeader}>
                <View>
                  <Text style={styles.seriesTitle}>{SERIES_INFO[seriesName].title}</Text>
                  <Text style={styles.seriesProgressLabel}>
                    {unlockedCount}/{totalCount} unlocked
                  </Text>
                </View>
                <Text style={styles.seriesFraction}>({unlockedCount}/{totalCount})</Text>
              </View>

              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${completion * 100}%` }]} />
              </View>

              <View style={styles.grid}>
                {seriesCharacters.map(
                  ({ character, companion }) => (
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
                        name={character.displayName}
                        emoji={character.emoji ?? "🙂"}
                        level={companion.level}
                        status={companion.status}
                        unlocked={companion.unlocked}
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
                  )
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

  pageSubtitle: {
    marginTop: 6,
    marginBottom: 28,
    fontSize: 16,
    lineHeight: 23,
    color: "#666666",
  },

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
