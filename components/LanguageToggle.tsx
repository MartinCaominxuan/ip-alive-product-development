import { Pressable, StyleSheet, Text, View } from "react-native";

import { useLanguage } from "@/hooks/use-language";

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {(["en", "zh"] as const).map((item) => (
        <Pressable key={item} onPress={() => setLanguage(item)} style={[styles.option, compact && styles.compactOption, language === item && styles.active]}>
          <Text style={[styles.label, language === item && styles.activeLabel]}>{item === "en" ? "EN" : "中文"}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 3, borderRadius: 15, backgroundColor: "#E8E4ED" },
  compactContainer: { padding: 2 },
  option: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12 },
  compactOption: { paddingHorizontal: 7, paddingVertical: 4 },
  active: { backgroundColor: "#FFFFFF" },
  label: { fontSize: 9, fontWeight: "800", color: "#8B8490" },
  activeLabel: { color: "#5F45CB" },
});
