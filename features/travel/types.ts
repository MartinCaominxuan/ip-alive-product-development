export interface TravelDestination {
  id: string;
  name: string;
  durationMinutes: number;
  requiredLevel: number;
  artAssetId: string;
}

export interface CharacterJourney {
  id: string;
  companionId: string;
  destinationId: string;
  status: "planned" | "traveling" | "returned";
  departedAt: string;
  returnsAt: string;
  postcardId?: string;
}

export type TravelSession = CharacterJourney;
