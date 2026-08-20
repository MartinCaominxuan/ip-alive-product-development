import { characters } from "@/data/characters";
import { companions } from "@/data/companions";
import type { Companion } from "@/features/companions/types";

import type { Character } from "./types";

export interface CharacterView {
  character: Character;
  companion: Companion;
}

function createDefaultCompanion(characterId: string): Companion {
  return {
    characterId,
    unlocked: false,
    level: 0,
    experience: 0,
    relationshipLevel: 1,
    status: "Waiting for you...",
    firstContactCompleted: false,
  };
}

export function getCharacterViews(): CharacterView[] {
  return characters.map((character) => ({
    character,
    companion:
      companions.find((item) => item.characterId === character.id) ??
      createDefaultCompanion(character.id),
  }));
}

export function getCharacterViewById(characterId: string): CharacterView | undefined {
  const character = characters.find((item) => item.id === characterId);

  if (!character) return undefined;

  return {
    character,
    companion:
      companions.find((item) => item.characterId === characterId) ??
      createDefaultCompanion(characterId),
  };
}
