import type { AccountTitle } from "./types";

export const ACCOUNT_TITLES: AccountTitle[] = [
  { name: "New Collector", minimumLevel: 1, accent: "#78909C" },
  { name: "Character Friend", minimumLevel: 5, accent: "#5C6BC0" },
  { name: "Rising Curator", minimumLevel: 10, accent: "#7C4DFF" },
  { name: "World Traveler", minimumLevel: 20, accent: "#00897B" },
  { name: "Legendary Keeper", minimumLevel: 35, accent: "#F59E0B" },
];

export function getAccountTitle(level: number): AccountTitle {
  return [...ACCOUNT_TITLES]
    .reverse()
    .find((title) => level >= title.minimumLevel) ?? ACCOUNT_TITLES[0];
}

export function getNextAccountTitle(level: number): AccountTitle | undefined {
  return ACCOUNT_TITLES.find((title) => title.minimumLevel > level);
}
