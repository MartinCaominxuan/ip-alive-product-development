import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { getRelationshipStage } from "../utils/relationship";

type CharacterCardProps = {
  name: string;
  emoji: string;
  level: number;
  status: string;
  onPress?: () => void;
};

export default function CharacterCard({
  name,
  emoji,
  level,
  status,
  onPress,
}: CharacterCardProps) {
  const relationshipStage =
    getRelationshipStage(level);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <View style={styles.content}>
        <Text 
          style={styles.name}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>

        <Text 
           style={styles.relationship}
            numberOfLines={1}
            ellipsizeMode="tail"
        >
          {relationshipStage.emoji} {relationshipStage.name}
        </Text>

        <Text
          style={styles.status}
          numberOfLines={2}
        >
          {status}
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

  avatarContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F4F1FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  emoji: {
    fontSize: 32,
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

  
});