export type Price =
  | { currency: "bubble"; amount: number }
  | { currency: "real"; amountMinor: number; currencyCode: string };

export interface ShopOffer {
  id: string;
  itemType: "outfit" | "character" | "bundle";
  itemId: string;
  price: Price;
  availability: "available" | "coming-soon" | "limited-locked" | "sold-out";
  label?: string;
  activeFrom?: string;
  activeUntil?: string;
}

export interface PurchaseGateway {
  purchase(offerId: string, accountId: string): Promise<{ receiptId: string }>;
}
