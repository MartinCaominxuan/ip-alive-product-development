export type BubbleTransactionReason =
  | "match3-reward"
  | "travel-reward"
  | "purchase"
  | "event-reward"
  | "admin-adjustment";

export interface BubbleTransaction {
  id: string;
  amount: number;
  reason: BubbleTransactionReason;
  createdAt: string;
  referenceId?: string;
}

export interface BubbleWallet {
  accountId: string;
  balance: number;
  transactions: BubbleTransaction[];
}
