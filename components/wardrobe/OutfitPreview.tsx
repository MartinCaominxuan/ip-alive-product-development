import { StyleSheet, Text, View } from "react-native";

const LOOKS: Record<string, { icon: string; color: string }> = {
  "yunzhou-scholar": { icon: "袍", color: "#788CA5" }, "yunzhou-2026": { icon: "夹", color: "#D99068" },
  "mia-weekend": { icon: "衫", color: "#7F72CA" }, "mia-concert": { icon: "演", color: "#313246" },
  "mia-bubble-tee": { icon: "泡", color: "#76BBDD" },
  "nova-orbit": { icon: "轨", color: "#A9B8C8" }, "nova-retro": { icon: "复", color: "#E4B75D" },
};

export default function OutfitPreview({ outfitId, locked }: { outfitId: string; locked?: boolean }) {
  const look = LOOKS[outfitId] ?? { icon: "衣", color: "#9B8BC7" };
  return <View style={[styles.box, { backgroundColor: locked ? "#E2E0E5" : `${look.color}33` }]}><View style={[styles.garment, { backgroundColor: locked ? "#BDBAC1" : look.color }]}><Text style={styles.icon}>{locked ? "🔒" : look.icon}</Text></View><View style={styles.assetBadge}><Text style={styles.assetText}>ART SLOT</Text></View></View>;
}

const styles = StyleSheet.create({ box: { height: 105, alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: 15 }, garment: { width: 67, height: 61, alignItems: "center", justifyContent: "center", borderTopLeftRadius: 22, borderTopRightRadius: 22, borderBottomLeftRadius: 9, borderBottomRightRadius: 9 }, icon: { fontSize: 19, fontWeight: "900", color: "#FFFFFF" }, assetBadge: { position: "absolute", right: 5, bottom: 5, paddingHorizontal: 5, paddingVertical: 3, borderRadius: 5, backgroundColor: "#FFFFFFCC" }, assetText: { fontSize: 6, fontWeight: "900", color: "#746D78" } });
