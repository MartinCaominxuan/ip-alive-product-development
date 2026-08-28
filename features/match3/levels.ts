import type { Match3Goal, Match3Level, Match3Tile } from "./types";

const base = { width: 6, height: 7, rewardBond: 50 } as const;
export const MATCH3_LEVELS: Match3Level[] = [
  { ...base, id: "garden-1", number: 1, name: { en: "First Bloom", zh: "初次绽放" }, moveLimit: 20, goals: [{ kind: "score", target: 5200 }], iceIndices: [], rewardBubbles: 220 },
  { ...base, id: "garden-2", number: 2, name: { en: "Blue Letter", zh: "蓝色来信" }, moveLimit: 22, goals: [{ kind: "score", target: 4300 }, { kind: "collect", color: "blue", target: 18 }], iceIndices: [], rewardBubbles: 260 },
  { ...base, id: "garden-3", number: 3, name: { en: "Two Promises", zh: "两份约定" }, moveLimit: 24, goals: [{ kind: "collect", color: "red", target: 15 }, { kind: "collect", color: "green", target: 15 }], iceIndices: [], rewardBubbles: 300 },
  { ...base, id: "garden-4", number: 4, name: { en: "Frozen Memory", zh: "冰封记忆" }, moveLimit: 24, goals: [{ kind: "score", target: 5000 }, { kind: "clear-ice", target: 8 }], iceIndices: [8, 9, 14, 15, 20, 21, 26, 27], rewardBubbles: 340 },
  { ...base, id: "garden-5", number: 5, name: { en: "Violet Night", zh: "紫罗兰之夜" }, moveLimit: 25, goals: [{ kind: "collect", color: "purple", target: 20 }, { kind: "clear-ice", target: 12 }], iceIndices: [7, 8, 9, 10, 13, 16, 19, 22, 25, 26, 27, 28], rewardBubbles: 390 },
  { ...base, id: "garden-6", number: 6, name: { en: "Garden Keeper", zh: "花园守望者" }, moveLimit: 27, goals: [{ kind: "score", target: 9000 }, { kind: "collect", color: "yellow", target: 22 }, { kind: "clear-ice", target: 14 }], iceIndices: [6, 7, 10, 11, 13, 16, 18, 19, 22, 23, 25, 28, 30, 35], rewardBubbles: 480 },
];

export type Match3Progress = { score: number; collected: Partial<Record<Match3Tile, number>>; iceCleared: number };
export function goalValue(goal: Match3Goal, progress: Match3Progress) { if (goal.kind === "score") return progress.score; if (goal.kind === "clear-ice") return progress.iceCleared; return progress.collected[goal.color] ?? 0; }
export function isLevelComplete(level: Match3Level, progress: Match3Progress) { return level.goals.every((goal) => goalValue(goal, progress) >= goal.target); }
export function starsForLevel(level: Match3Level, movesRemaining: number) { const ratio = movesRemaining / level.moveLimit; return ratio >= .35 ? 3 : ratio >= .15 ? 2 : 1; }
