import type { BubbleTransaction, BubbleWallet } from "./types";

export function applyBubbleTransaction(
  wallet: BubbleWallet,
  transaction: BubbleTransaction,
): BubbleWallet {
  const balance = wallet.balance + transaction.amount;

  if (balance < 0) throw new Error("INSUFFICIENT_BUBBLES");
  if (wallet.transactions.some((item) => item.id === transaction.id)) return wallet;

  return {
    ...wallet,
    balance,
    transactions: [...wallet.transactions, transaction],
  };
}
