import { StyleSheet, View } from "react-native";

const PALETTES: Record<string, { main: string; trim: string }> = {
  "yunzhou-scholar": { main: "#788CA5", trim: "#E8D6A4" },
  "yunzhou-2026": { main: "#D99068", trim: "#F3E8D9" },
  "mia-weekend": { main: "#7F72CA", trim: "#DAD3FF" },
  "mia-concert": { main: "#313246", trim: "#F26B9A" },
  "mia-bubble-tee": { main: "#76BBDD", trim: "#FFF1A8" },
  "nova-orbit": { main: "#A9B8C8", trim: "#79E0E8" },
  "nova-retro": { main: "#E4B75D", trim: "#685193" },
};

export default function Mannequin({ outfitId }: { outfitId?: string }) {
  const palette = outfitId ? PALETTES[outfitId] : undefined;
  return (
    <View style={styles.stage}>
      <View style={styles.shadow} />
      <View style={styles.head} />
      <View style={styles.neck} />
      <View style={styles.body}>
        {palette && <View style={[styles.top, { backgroundColor: palette.main }]}><View style={[styles.collar, { borderColor: palette.trim }]} /></View>}
      </View>
      <View style={[styles.arm, styles.leftArm, palette && { backgroundColor: palette.main }]} />
      <View style={[styles.arm, styles.rightArm, palette && { backgroundColor: palette.main }]} />
      <View style={[styles.leg, styles.leftLeg]} />
      <View style={[styles.leg, styles.rightLeg]} />
      {palette && <View style={[styles.skirt, { borderTopColor: palette.main }]} />}
    </View>
  );
}

const BASE = "#E7E7EA";
const styles = StyleSheet.create({
  stage: { width: 220, height: 330, alignItems: "center", position: "relative" },
  shadow: { position: "absolute", bottom: 4, width: 125, height: 20, borderRadius: 62, backgroundColor: "#D8D3DF" },
  head: { position: "absolute", top: 5, width: 82, height: 91, borderRadius: 42, backgroundColor: BASE },
  neck: { position: "absolute", top: 88, width: 28, height: 29, backgroundColor: BASE },
  body: { position: "absolute", top: 108, width: 105, height: 118, borderTopLeftRadius: 37, borderTopRightRadius: 37, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: "hidden", backgroundColor: BASE },
  top: { width: "100%", height: "100%", alignItems: "center" }, collar: { width: 42, height: 25, borderBottomWidth: 4, borderLeftWidth: 4, borderRightWidth: 4, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  arm: { position: "absolute", top: 121, width: 31, height: 127, borderRadius: 17, backgroundColor: BASE }, leftArm: { left: 35, transform: [{ rotate: "8deg" }] }, rightArm: { right: 35, transform: [{ rotate: "-8deg" }] },
  leg: { position: "absolute", top: 215, width: 40, height: 106, borderRadius: 20, backgroundColor: BASE }, leftLeg: { left: 67, transform: [{ rotate: "2deg" }] }, rightLeg: { right: 67, transform: [{ rotate: "-2deg" }] },
  skirt: { position: "absolute", top: 194, width: 125, height: 0, borderLeftWidth: 18, borderRightWidth: 18, borderTopWidth: 62, borderLeftColor: "transparent", borderRightColor: "transparent" },
});
