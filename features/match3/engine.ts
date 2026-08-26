import type { Match3Tile } from "./types";

export type SpecialKind = "row" | "column" | "burst";
export interface MatchCell { id: string; color: Match3Tile; special?: SpecialKind; }
export interface MoveResult { board: Array<MatchCell | null>; clear: Set<number>; createdSpecial?: { index: number; kind: SpecialKind }; }
const COLORS: Match3Tile[] = ["red", "blue", "green", "yellow", "purple"];
let sequence = 0;
const newCell = (): MatchCell => ({ id: `tile-${Date.now()}-${sequence++}`, color: COLORS[Math.floor(Math.random() * COLORS.length)] });

export function createBoard(rows: number, columns: number) {
  const board: MatchCell[] = [];
  for (let index = 0; index < rows * columns; index += 1) { let cell = newCell(); while ((index % columns >= 2 && board[index - 1].color === cell.color && board[index - 2].color === cell.color) || (index >= columns * 2 && board[index - columns].color === cell.color && board[index - columns * 2].color === cell.color)) cell = newCell(); board.push(cell); }
  return board;
}

export function findRuns(board: Array<MatchCell | null>, rows: number, columns: number) {
  const horizontal: number[][] = [], vertical: number[][] = [];
  for (let row = 0; row < rows; row += 1) { let start = 0; while (start < columns) { const index = row * columns + start, color = board[index]?.color; let end = start + 1; while (color && end < columns && board[row * columns + end]?.color === color) end += 1; if (color && end - start >= 3) horizontal.push(Array.from({ length: end - start }, (_, offset) => index + offset)); start = end; } }
  for (let column = 0; column < columns; column += 1) { let start = 0; while (start < rows) { const index = start * columns + column, color = board[index]?.color; let end = start + 1; while (color && end < rows && board[end * columns + column]?.color === color) end += 1; if (color && end - start >= 3) vertical.push(Array.from({ length: end - start }, (_, offset) => index + offset * columns)); start = end; } }
  return { horizontal, vertical };
}

export function expandSpecials(board: Array<MatchCell | null>, seed: Set<number>, rows: number, columns: number) {
  const clear = new Set(seed); const queue = [...seed]; const activated: SpecialKind[] = [];
  while (queue.length) { const index = queue.shift()!; const special = board[index]?.special; if (!special) continue; activated.push(special); const row = Math.floor(index / columns), column = index % columns; const targets: number[] = [];
    if (special === "row") for (let c = 0; c < columns; c += 1) targets.push(row * columns + c);
    if (special === "column") for (let r = 0; r < rows; r += 1) targets.push(r * columns + column);
    if (special === "burst") for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r += 1) for (let c = Math.max(0, column - 1); c <= Math.min(columns - 1, column + 1); c += 1) targets.push(r * columns + c);
    targets.forEach((target) => { if (!clear.has(target)) { clear.add(target); queue.push(target); } });
  }
  return { clear, activated };
}

export function analyzeSwap(board: MatchCell[], from: number, to: number, rows: number, columns: number): MoveResult | undefined {
  const swapped = [...board]; [swapped[from], swapped[to]] = [swapped[to], swapped[from]];
  if (swapped[from].special || swapped[to].special) {
    const specials = new Set<number>();
    if (swapped[from].special) specials.add(from);
    if (swapped[to].special) specials.add(to);
    return { board: swapped, clear: expandSpecials(swapped, specials, rows, columns).clear };
  }
  const runs = findRuns(swapped, rows, columns); const touching = [...runs.horizontal, ...runs.vertical].filter((run) => run.includes(from) || run.includes(to)); if (!touching.length) return undefined;
  const seed = new Set(touching.flat()); const horizontal = runs.horizontal.some((run) => run.includes(to)), vertical = runs.vertical.some((run) => run.includes(to)); let kind: SpecialKind | undefined;
  if (horizontal && vertical) kind = "burst"; else if (touching.some((run) => run.length >= 4)) kind = Math.floor(from / columns) === Math.floor(to / columns) ? "row" : "column";
  const expanded = expandSpecials(swapped, seed, rows, columns); if (kind) { expanded.clear.delete(to); swapped[to] = { ...swapped[to], special: kind }; }
  return { board: swapped, clear: expanded.clear, createdSpecial: kind ? { index: to, kind } : undefined };
}

export function cascadeMatches(board: Array<MatchCell | null>, rows: number, columns: number) { const runs = findRuns(board, rows, columns); const seed = new Set([...runs.horizontal, ...runs.vertical].flat()); return expandSpecials(board, seed, rows, columns).clear; }
export function removeCells(board: Array<MatchCell | null>, clear: Set<number>) { return board.map((cell, index) => clear.has(index) ? null : cell); }
export function fallCells(board: Array<MatchCell | null>, rows: number, columns: number) { const next: Array<MatchCell | null> = Array(rows * columns).fill(null); for (let column = 0; column < columns; column += 1) { let target = rows - 1; for (let row = rows - 1; row >= 0; row -= 1) { const cell = board[row * columns + column]; if (cell) { next[target * columns + column] = cell; target -= 1; } } } return next; }
export function refillCells(board: Array<MatchCell | null>) { return board.map((cell) => cell ?? newCell()); }

export function hasValidMove(board: MatchCell[], rows: number, columns: number) {
  for (let index = 0; index < board.length; index += 1) {
    const right = index % columns < columns - 1 ? index + 1 : undefined; const down = index + columns < board.length ? index + columns : undefined;
    if ((right !== undefined && analyzeSwap(board, index, right, rows, columns)) || (down !== undefined && analyzeSwap(board, index, down, rows, columns))) return true;
  }
  return false;
}

export function shuffleBoard(board: MatchCell[], rows: number, columns: number) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const next = [...board]; for (let index = next.length - 1; index > 0; index -= 1) { const target = Math.floor(Math.random() * (index + 1)); [next[index], next[target]] = [next[target], next[index]]; }
    const runs = findRuns(next, rows, columns); if (!runs.horizontal.length && !runs.vertical.length && hasValidMove(next, rows, columns)) return next;
  }
  return createBoard(rows, columns);
}
