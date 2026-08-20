export type OutfitRarity = "common" | "rare" | "seasonal" | "limited";

export interface Outfit {
  id: string;
  name: string;
  characterIds: string[];
  rarity: OutfitRarity;
  artAssetId: string;
  availableFrom?: string;
  availableUntil?: string;
}

export interface InventoryItem {
  accountId: string;
  outfitId: string;
  acquiredAt: string;
  equippedCharacterId?: string;
}
