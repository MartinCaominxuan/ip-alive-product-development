import { StyleSheet, Text, View } from "react-native";

type AvatarProps = {
  name: string;
  emoji: string;
  level: number;
};

export default function Avatar({
  name,
  emoji,
  level,
}: AvatarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarEmoji}>{emoji}</Text>
      </View>

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.level}>
        Relationship Level {level}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 24,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarEmoji: {
    fontSize: 58,
  },

  name: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: "700",
  },

  level: {
    marginTop: 6,
    fontSize: 15,
    color: "#666666",
  },
});