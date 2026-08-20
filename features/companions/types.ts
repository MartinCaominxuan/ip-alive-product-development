export interface Companion {
  characterId: string;
  unlocked: boolean;
  level: number;
  experience: number;
  relationshipLevel: number;
  status: string;
  firstContactCompleted: boolean;
  unlockedAt?: string;
  lastInteractionAt?: string;
}
