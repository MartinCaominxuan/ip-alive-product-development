export type Match3Tile = "red" | "blue" | "green" | "yellow" | "purple";

export type Match3Goal =
  | { kind: "score"; target: number }
  | { kind: "collect"; color: Match3Tile; target: number }
  | { kind: "clear-ice"; target: number };

export interface Match3Level {
  id: string;
  number: number;
  name: { en: string; zh: string };
  width: number;
  height: number;
  moveLimit: number;
  goals: Match3Goal[];
  iceIndices: number[];
  rewardBubbles: number;
  rewardBond: number;
}

export interface Match3Result {
  levelId: string;
  score: number;
  movesUsed: number;
  completed: boolean;
}
