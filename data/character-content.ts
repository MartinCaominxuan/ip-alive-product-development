import type { CharacterMail } from "@/features/mail";
import type { CharacterJourney } from "@/features/travel";
import type { InventoryItem, Outfit } from "@/features/wardrobe";

export const outfits: Outfit[] = [
  { id: "daily-knit", name: "Daily Knit", characterIds: ["luna", "starter-luna"], rarity: "common", artAssetId: "outfit-daily-knit" },
  { id: "starlight-coat", name: "Starlight Coat", characterIds: ["luna", "starter-luna"], rarity: "rare", artAssetId: "outfit-starlight" },
  { id: "summer-sailor", name: "Summer Sailor", characterIds: ["luna", "starter-luna"], rarity: "seasonal", artAssetId: "outfit-summer" },
  { id: "moon-festival", name: "Moon Festival", characterIds: ["luna", "starter-luna"], rarity: "limited", artAssetId: "outfit-moon" },
];

export const inventory: InventoryItem[] = [
  { accountId: "demo-account", outfitId: "daily-knit", acquiredAt: "2026-07-24T00:00:00.000Z", equippedCharacterId: "luna" },
  { accountId: "demo-account", outfitId: "starlight-coat", acquiredAt: "2026-07-28T00:00:00.000Z" },
  { accountId: "demo-account", outfitId: "summer-sailor", acquiredAt: "2026-08-03T00:00:00.000Z" },
];

export const characterJourneys: CharacterJourney[] = [
  { id: "journey-kyoto", companionId: "luna", destinationId: "kyoto", status: "returned", departedAt: "2026-08-11T02:00:00.000Z", returnsAt: "2026-08-11T18:00:00.000Z", postcardId: "kyoto-rain" },
  { id: "journey-seaside", companionId: "luna", destinationId: "seaside", status: "returned", departedAt: "2026-08-02T01:00:00.000Z", returnsAt: "2026-08-02T12:00:00.000Z", postcardId: "blue-coast" },
];

export const characterMails: CharacterMail[] = [
  { id: "mail-1", accountId: "demo-account", characterId: "luna", subject: "I found a quiet street", body: "The rain made every shop light look warmer. I saved the view for you.", sentAt: "2026-08-11T18:10:00.000Z", attachmentIds: ["kyoto-rain"] },
  { id: "mail-2", accountId: "demo-account", characterId: "luna", subject: "Back from the sea", body: "I brought back a shell and a little courage for our next trip.", sentAt: "2026-08-02T12:10:00.000Z", readAt: "2026-08-02T13:00:00.000Z" },
];
