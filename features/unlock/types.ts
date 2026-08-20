export type UnlockChannel = "qr" | "nfc" | "admin";

export interface PhysicalProductToken {
  token: string;
  productId: string;
  characterId: string;
  channel: UnlockChannel;
}

export interface UnlockResult {
  status: "unlocked" | "already-unlocked" | "invalid" | "expired";
  characterId?: string;
  unlockedAt?: string;
}

export interface UnlockGateway {
  redeem(token: string, accountId: string): Promise<UnlockResult>;
}
