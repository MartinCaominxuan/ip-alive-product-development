// src/data/companions.ts

import type { Companion } from "@/features/companions";

export const companions: Companion[] = [
  {
    characterId: "starter-luna",
    unlocked: true,
    level: 0,
    experience: 0,
    relationshipLevel: 1,
    status: "Welcome to IP Alive.",
    firstContactCompleted: false,
  },
  {
    characterId: "luna",
    unlocked: true,
    level: 0,
    experience: 0,
    relationshipLevel: 1,
    status: "Waiting for you...",
    firstContactCompleted: false,
  },
  {
    characterId: "angel",
    unlocked: true,
    level: 0,
    experience: 0,
    relationshipLevel: 1,
    status: "Ready to brighten your day.",
    firstContactCompleted: false,
  },
  ...[
    ["crystal", "A new memory is waiting."],
    ["fino", "What shall we explore today?"],
    ["monica", "Take a moment for yourself."],
    ["charlie", "I am always here to listen."],
    ["kevin", "Ready for today's challenge?"],
    ["stefan", "Let us look at the bigger picture."],
    ["seven", "Something wonderful may happen today."],
    ["martin", "You are stronger than you think."],
  ].map(([characterId, status], index): Companion => ({
    characterId,
    unlocked: true,
    level: index % 4,
    experience: index * 35,
    relationshipLevel: Math.min(index + 1, 6),
    status,
    firstContactCompleted: index > 1,
  })),
];
