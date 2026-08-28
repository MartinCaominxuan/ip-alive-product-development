import type { OriginalCharacterCanon } from "@/features/characters/canon";
import type { CharacterStoryEvent } from "@/features/characters/story-events";

export interface CharacterContentPack {
  schemaVersion: 1;
  packId: string;
  version: string;
  displayName: string;
  ownership: "original-demo" | "licensed" | "partner-supplied";
  replaceable: boolean;
  characterIds: string[];
  mainlines: Record<string, OriginalCharacterCanon>;
  events: CharacterStoryEvent[];
  eventPlacements: Record<string, { kind: "stage-event"; requiredBondLevel: number }>;
}
