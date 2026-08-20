export type Match3Tile = "red" | "blue" | "green" | "yellow" | "purple";

export interface Match3Level {
  id: string;
  width: number;
  height: number;
  moveLimit: number;
  targetScore: number;
  rewardId: string;
}

export interface Match3Result {
  levelId: string;
  score: number;
  movesUsed: number;
  completed: boolean;
}
