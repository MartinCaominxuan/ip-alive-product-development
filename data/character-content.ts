import type { CharacterMail } from "@/features/mail";
import type { CharacterJourney } from "@/features/travel";
import type { InventoryItem, Outfit } from "@/features/wardrobe";

export const outfits: Outfit[] = [
  { id: "daily-knit", name: "Daily Knit", nameZh: "日常针织", characterIds: ["luna", "starter-luna"], rarity: "common", artAssetId: "outfit-daily-knit", previewAssetKey: "wardrobe/daily-knit.webp" },
  { id: "starlight-coat", name: "Starlight Coat", nameZh: "星光外套", characterIds: ["luna", "starter-luna"], rarity: "rare", artAssetId: "outfit-starlight", previewAssetKey: "wardrobe/starlight-coat.webp" },
  { id: "summer-sailor", name: "Summer Sailor", nameZh: "夏日水手服", characterIds: ["luna", "starter-luna"], rarity: "seasonal", artAssetId: "outfit-summer", previewAssetKey: "wardrobe/summer-sailor.webp" },
  { id: "moon-festival", name: "Moon Festival", nameZh: "月夜限定", characterIds: ["luna", "starter-luna"], rarity: "limited", artAssetId: "outfit-moon", previewAssetKey: "wardrobe/moon-festival.webp" },
  { id: "yunzhou-scholar", name: "Traveling Scholar", nameZh: "游学书生", characterIds: ["yunzhou"], rarity: "common", artAssetId: "outfit-yunzhou-scholar", previewAssetKey: "wardrobe/yunzhou-scholar.webp" },
  { id: "yunzhou-2026", name: "First Day in 2026", nameZh: "初到二〇二六", characterIds: ["yunzhou"], rarity: "limited", artAssetId: "outfit-yunzhou-now", previewAssetKey: "wardrobe/yunzhou-2026.webp" },
  { id: "mia-weekend", name: "Weekend Layers", nameZh: "周末叠穿", characterIds: ["mia"], rarity: "common", artAssetId: "outfit-mia-weekend", previewAssetKey: "wardrobe/mia-weekend.webp" },
  { id: "mia-concert", name: "Night Concert", nameZh: "夜场演出", characterIds: ["mia"], rarity: "rare", artAssetId: "outfit-mia-concert", previewAssetKey: "wardrobe/mia-concert.webp" },
  { id: "mia-bubble-tee", name: "Bubble Tee", nameZh: "泡泡短袖", characterIds: ["mia"], rarity: "common", artAssetId: "outfit-mia-bubble-tee", previewAssetKey: "wardrobe/mia-bubble-tee.webp" },
  { id: "nova-orbit", name: "Orbital Uniform", nameZh: "轨道制服", characterIds: ["nova"], rarity: "common", artAssetId: "outfit-nova-orbit", previewAssetKey: "wardrobe/nova-orbit.webp" },
  { id: "nova-retro", name: "Retro 2026", nameZh: "复古二〇二六", characterIds: ["nova"], rarity: "limited", artAssetId: "outfit-nova-retro", previewAssetKey: "wardrobe/nova-retro.webp" },
];

export const inventory: InventoryItem[] = [
  { accountId: "demo-account", outfitId: "daily-knit", acquiredAt: "2026-07-24T00:00:00.000Z", equippedCharacterId: "luna" },
  { accountId: "demo-account", outfitId: "starlight-coat", acquiredAt: "2026-07-28T00:00:00.000Z" },
  { accountId: "demo-account", outfitId: "summer-sailor", acquiredAt: "2026-08-03T00:00:00.000Z" },
  { accountId: "demo-account", outfitId: "yunzhou-scholar", acquiredAt: "2026-08-20T00:00:00.000Z", equippedCharacterId: "yunzhou" },
  { accountId: "demo-account", outfitId: "mia-weekend", acquiredAt: "2026-08-20T00:00:00.000Z", equippedCharacterId: "mia" },
  { accountId: "demo-account", outfitId: "mia-concert", acquiredAt: "2026-08-21T00:00:00.000Z" },
  { accountId: "demo-account", outfitId: "nova-orbit", acquiredAt: "2026-08-20T00:00:00.000Z", equippedCharacterId: "nova" },
  { accountId: "demo-account", outfitId: "nova-retro", acquiredAt: "2026-08-22T00:00:00.000Z" },
];

export const characterJourneys: CharacterJourney[] = [
  { id: "journey-kyoto", companionId: "luna", destinationId: "kyoto", status: "returned", departedAt: "2026-08-11T02:00:00.000Z", returnsAt: "2026-08-11T18:00:00.000Z", postcardId: "kyoto-rain" },
  { id: "journey-seaside", companionId: "luna", destinationId: "seaside", status: "returned", departedAt: "2026-08-02T01:00:00.000Z", returnsAt: "2026-08-02T12:00:00.000Z", postcardId: "blue-coast" },
];

export const characterMails: CharacterMail[] = [
  { id: "mail-1", accountId: "demo-account", characterId: "luna", subject: "I found a quiet street", body: "The rain made every shop light look warmer. I saved the view for you.", sentAt: "2026-08-11T18:10:00.000Z", attachmentIds: ["kyoto-rain"] },
  { id: "mail-2", accountId: "demo-account", characterId: "luna", subject: "Back from the sea", body: "I brought back a shell and a little courage for our next trip.", sentAt: "2026-08-02T12:10:00.000Z", readAt: "2026-08-02T13:00:00.000Z" },
  { id: "mail-yunzhou", accountId: "demo-account", characterId: "yunzhou", subject: "灯下寄来的信", body: "今夜长安风暖。我仍不明白这掌中镜如何把字送到你那里，却愿再写一封。", sentAt: "2026-08-23T12:10:00.000Z" },
  { id: "mail-mia", accountId: "demo-account", characterId: "mia", subject: "Weekend plan", body: "I saved a place by the window. Bring your phone charger this time.", sentAt: "2026-08-23T12:10:00.000Z", readAt: "2026-08-23T13:00:00.000Z" },
  { id: "mail-nova", accountId: "demo-account", characterId: "nova", subject: "Archive: 2026", body: "Your era's messages are inefficient, but I have started looking forward to them.", sentAt: "2026-08-24T12:10:00.000Z" },
];
