export type RewardGrant =
  | { kind: "bubble"; amount: number }
  | { kind: "experience"; amount: number }
  | { kind: "outfit"; outfitId: string }
  | { kind: "postcard"; postcardId: string };

export interface RewardDefinition {
  id: string;
  grants: RewardGrant[];
}
