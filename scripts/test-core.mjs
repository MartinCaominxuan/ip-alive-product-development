import assert from "node:assert/strict";
import { analyzeSwap, createBoard, findRuns, hasValidMove, shuffleBoard } from "../features/match3/engine.ts";
import { calculateBudgetPlan, calculateWeeklyWeightChange } from "../features/progression/life-planning.ts";
import { getAccountProgress } from "../features/progression/account-level.ts";

for (let attempt = 0; attempt < 50; attempt += 1) {
  const board = createBoard(7, 6); const runs = findRuns(board, 7, 6);
  assert.equal(runs.horizontal.length + runs.vertical.length, 0, "new boards must not start with matches");
  const shuffled = shuffleBoard(board, 7, 6); assert.equal(hasValidMove(shuffled, 7, 6), true, "shuffled boards must be playable");
}
const specialBoard = createBoard(7, 6); specialBoard[0] = { ...specialBoard[0], special: "row" };
assert.ok(analyzeSwap(specialBoard, 0, 1, 7, 6)?.clear.size >= 6, "a row special must clear at least one row");
assert.deepEqual(calculateBudgetPlan({ income: 12000, fixedCosts: 5000, savingsTarget: 3000, spent: 1000, daysLeft: 10 }), { flexibleBudget: 4000, remaining: 3000, dailyBudget: 300, projectedSavings: 6000, onTrack: true });
assert.equal(calculateWeeklyWeightChange(70, 50, "2026-09-01", new Date("2026-08-25").getTime()).safePlanningBand, false);
assert.deepEqual(getAccountProgress(112380), { level: 12, experienceInLevel: 2380, nextLevelExperience: 10000 });
console.log("Core logic tests passed.");
