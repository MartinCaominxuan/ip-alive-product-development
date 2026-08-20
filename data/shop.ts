import type { ShopOffer } from "@/features/shop";

export const shopOffers: ShopOffer[] = [
  { id: "offer-knit", itemType: "outfit", itemId: "daily-knit", price: { currency: "bubble", amount: 600 }, availability: "available", label: "EVERYDAY" },
  { id: "offer-starlight", itemType: "outfit", itemId: "starlight-coat", price: { currency: "bubble", amount: 1400 }, availability: "available", label: "POPULAR" },
  { id: "offer-summer", itemType: "outfit", itemId: "summer-sailor", price: { currency: "bubble", amount: 2200 }, availability: "coming-soon", label: "NEXT SEASON" },
  { id: "offer-moon", itemType: "outfit", itemId: "moon-festival", price: { currency: "bubble", amount: 3200 }, availability: "limited-locked", label: "LIMITED 2026" },
  { id: "offer-collector", itemType: "bundle", itemId: "collector-pack", price: { currency: "real", amountMinor: 1999, currencyCode: "USD" }, availability: "sold-out", label: "SOLD OUT" },
];
