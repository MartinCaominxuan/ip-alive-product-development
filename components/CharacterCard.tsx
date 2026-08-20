import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { getRelationshipStage } from "@/utils/relationship";

type CharacterCardProps = {
  name: string;
  emoji: string;
  level: number;
  status: string;
  unlocked: boolean;
  onPress?: () => void;
};

export default function CharacterCard({
  name,
  emoji,
  level,
  status,
  unlocked,
  onPress,
}: CharacterCardProps) {
  const relationshipStage =
    getRelationshipStage(level);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        !unlocked && styles.cardLocked,
        pressed && unlocked && styles.cardPressed,
      ]}
      disabled={!unlocked}
      onPress={unlocked ? onPress : undefined}
    >
      <View style={[styles.avatarContainer, !unlocked && styles.avatarLocked]}>
        <Text style={[styles.emoji, !unlocked && styles.emojiLocked]}>
          {unlocked ? emoji : "?"}
        </Text>
        {!unlocked && (
          <View style={styles.lockBadge}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text 
          style={[styles.name, !unlocked && styles.textLocked]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>

        <Text
           style={[styles.relationship, !unlocked && styles.textLocked]}
            numberOfLines={1}
            ellipsizeMode="tail"
        >
          {unlocked ? `${relationshipStage.emoji} ${relationshipStage.name}` : "Locked character"}
        </Text>

        <Text
          style={[styles.status, !unlocked && styles.textLocked]}
          numberOfLines={2}
        >
          {unlocked ? status : "Unlock with a physical collectible"}
        </Text>
      </View>

      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  cardPressed: {
    opacity: 0.7,
    transform: [
      {
        scale: 0.99,
      },
    ],
  },

  cardLocked: {
    backgroundColor: "#E9E9EC",
    shadowOpacity: 0,
    elevation: 0,
  },

  avatarContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F4F1FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  avatarLocked: {
    backgroundColor: "#D5D5DA",
  },

  emoji: {
    fontSize: 32,
  },

  emojiLocked: {
    color: "#929298",
    fontWeight: "800",
  },

  lockBadge: {
    position: "absolute",
    right: -3,
    bottom: -3,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  lockIcon: {
    fontSize: 12,
  },

  content: {
    flex: 1,
    minWidth: 0,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222222",
  },

  relationship: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#6750A4",
  },

  status: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 19,
    color: "#777777",
  },

  textLocked: {
    color: "#85858C",
  },

  
});
