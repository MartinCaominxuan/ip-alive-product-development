import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { demoAccountStats } from "@/data/account";
import LanguageToggle from "@/components/LanguageToggle";
import { outfits } from "@/data/character-content";
import { shopOffers } from "@/data/shop";
import { useLanguage } from "@/hooks/use-language";

const OFFER_EMOJI: Record<string, string> = {
  "daily-knit": "🧶",
  "starlight-coat": "🌌",
  "summer-sailor": "⛵",
  "moon-festival": "🌕",
  "collector-pack": "🎁",
};

export default function ShopScreen() {
  const { language, text } = useLanguage();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ {text("Me", "我的")}</Text></Pressable>
        <View style={styles.headerTools}><LanguageToggle compact /><View style={styles.balance}><Text style={styles.balanceText}>◉ {demoAccountStats.bubbles.toLocaleString()}</Text></View></View>
      </View>
      <Text style={styles.eyebrow}>BUBBLE SHOP</Text>
      <Text style={styles.title}>{text("Find their next favorite look.", "寻找他们下一套心仪造型。")}</Text>
      <Text style={styles.subtitle}>{text("Available pieces, future drops, and limited items all remain visible in the catalog.", "可购买、即将推出和限定服装都会保留在图鉴中。")}</Text>

      <View style={styles.featured}>
        <View style={styles.featuredCopy}><Text style={styles.featuredLabel}>{text("LIMITED PREVIEW", "限定预览")}</Text><Text style={styles.featuredTitle}>{text("Moon Festival", "月夜限定")}</Text><Text style={styles.featuredText}>{text("Returns once a year. Keep it on your wish list.", "每年仅回归一次，可以先加入愿望单。")}</Text></View>
        <Text style={styles.featuredEmoji}>🌕</Text>
      </View>

      <Text style={styles.sectionTitle}>{text("All items", "全部商品")}</Text>
      <View style={styles.grid}>
        {shopOffers.map((offer) => {
          const outfit = outfits.find((item) => item.id === offer.itemId);
          const itemName = outfit ? (language === "zh" ? outfit.nameZh ?? outfit.name : outfit.name) : text("Collector Bundle", "收藏家组合包");
          const available = offer.availability === "available";
          const price = offer.price.currency === "bubble"
            ? `◉ ${offer.price.amount.toLocaleString()}`
            : `${offer.price.currencyCode} ${(offer.price.amountMinor / 100).toFixed(2)}`;
          return (
            <View key={offer.id} style={[styles.offerCard, !available && styles.offerUnavailable]}>
              <View style={styles.artBox}><Text style={styles.artEmoji}>{OFFER_EMOJI[offer.itemId]}</Text><View style={styles.tag}><Text style={styles.tagText}>{offer.label}</Text></View></View>
              <Text style={styles.offerName}>{itemName}</Text>
              <Text style={styles.offerType}>{language === "zh" ? (offer.itemType === "outfit" ? "服装" : "组合包") : offer.itemType.toUpperCase()}</Text>
              <View style={styles.offerFooter}><Text style={styles.price}>{price}</Text><View style={[styles.buyState, available ? styles.buyAvailable : styles.buyLocked]}><Text style={[styles.buyText, !available && styles.buyTextLocked]}>{available ? "+" : availabilityLabel(offer.availability)}</Text></View></View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

function availabilityLabel(status: string) {
  if (status === "coming-soon") return "SOON";
  if (status === "limited-locked") return "LOCKED";
  return "SOLD";
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F4FC" },
  content: { paddingHorizontal: 18, paddingTop: 58, paddingBottom: 48 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTools: { flexDirection: "row", alignItems: "center", gap: 8 },
  back: { fontSize: 15, fontWeight: "700", color: "#6D4FE3" },
  balance: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 16, backgroundColor: "#FFF0BC" },
  balanceText: { fontSize: 12, fontWeight: "800", color: "#6B4B00" },
  eyebrow: { marginTop: 27, fontSize: 10, fontWeight: "900", letterSpacing: 1.7, color: "#7D64E7" },
  title: { marginTop: 7, maxWidth: 320, fontSize: 31, lineHeight: 37, fontWeight: "900", color: "#282230" },
  subtitle: { marginTop: 9, maxWidth: 350, fontSize: 13, lineHeight: 19, color: "#77707D" },
  featured: { flexDirection: "row", alignItems: "center", marginTop: 23, padding: 20, borderRadius: 24, backgroundColor: "#271E3B" },
  featuredCopy: { flex: 1 },
  featuredLabel: { fontSize: 9, fontWeight: "900", letterSpacing: 1.3, color: "#BBA5FF" },
  featuredTitle: { marginTop: 5, fontSize: 21, fontWeight: "900", color: "#FFFFFF" },
  featuredText: { marginTop: 5, maxWidth: 210, fontSize: 11, lineHeight: 16, color: "#C2B9CE" },
  featuredEmoji: { fontSize: 55 },
  sectionTitle: { marginTop: 27, marginBottom: 12, fontSize: 19, fontWeight: "800", color: "#302A36" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 11 },
  offerCard: { width: "48%", padding: 12, borderRadius: 20, backgroundColor: "#FFFFFF" },
  offerUnavailable: { opacity: 0.68 },
  artBox: { height: 113, alignItems: "center", justifyContent: "center", borderRadius: 15, backgroundColor: "#EEE9FA" },
  artEmoji: { fontSize: 46 },
  tag: { position: "absolute", left: 7, top: 7, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 8, backgroundColor: "#FFFFFF" },
  tagText: { fontSize: 7, fontWeight: "900", color: "#665581" },
  offerName: { marginTop: 10, fontSize: 13, fontWeight: "800", color: "#332D38" },
  offerType: { marginTop: 3, fontSize: 8, fontWeight: "800", color: "#968E9B" },
  offerFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 11 },
  price: { fontSize: 12, fontWeight: "800", color: "#5E4B14" },
  buyState: { minWidth: 27, height: 27, paddingHorizontal: 6, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  buyAvailable: { backgroundColor: "#6D4FE3" },
  buyLocked: { backgroundColor: "#DDD9E1" },
  buyText: { fontSize: 16, fontWeight: "900", color: "#FFFFFF" },
  buyTextLocked: { fontSize: 7, color: "#716B76" },
});
