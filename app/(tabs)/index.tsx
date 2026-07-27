import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import CharacterCard from "@/components/CharacterCard";
import { characters } from "@/data/character";

const CARD_MIN_WIDTH = 160;
const CARD_GAP = 10;
const PAGE_HORIZONTAL_PADDING = 16;
const MAX_CONTENT_WIDTH = 1200;

export default function CharacterScreen() {
  const { width } = useWindowDimensions();

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
    ...new Set(characters.map((character) => character.series)),
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
          const seriesCharacters = characters.filter(
            (character) => character.series === seriesName
          );

          return (
            <View key={seriesName} style={styles.seriesSection}>
              <Text style={styles.seriesTitle}>{seriesName}</Text>

              <View style={styles.grid}>
                {seriesCharacters.map((character) => (
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
                      name={character.name}
                      emoji={character.emoji}
                      level={character.level}
                      status={character.status}
                      onPress={() =>
                        router.push({
                          pathname: "/chat",
                          params: {
                            id: character.id,
                          },
                        })
                      }
                    />
                  </View>
                ))}
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
    marginBottom: 14,
    fontSize: 21,
    fontWeight: "700",
    color: "#222222",
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