export type SeriesId = "starter" | "time-travelers" | "series-a" | "series-b" | "series-c";
export type CharacterEra = "ancient" | "modern" | "future";

export interface Character {
  id: string;
  name: string;
  displayName: string;
  displayNameZh?: string;
  emoji?: string;
  avatar?: string;
  worldId?: string;
  series: SeriesId;
  unlocked: boolean;
  level: number;
  experience: number;
  status: string;
  statusZh?: string;
  era?: CharacterEra;
  homeYear?: number;
}

export interface Personality {
  traits: string[];
  strangerAttitude: "friendly" | "neutral" | "cautious" | "cold" | "suspicious";
  emotionalExpression: "reserved" | "moderate" | "expressive";
}

export interface SpeechStyle {
  tones: string[];
  catchphrases: string[];
  formal: boolean;
  sarcastic: boolean;
  responseLength: "short" | "medium" | "long";
}

export interface CharacterDefinition {
  worldId?: string;
  personality?: Personality;
  speech?: SpeechStyle;
  activityIds?: string[];
  restrictions?: CharacterRestriction[];
  firstContact?: FirstContactDefinition;
}

export interface CharacterRestriction {
  id: string;
  type: "physical" | "timeline" | "world" | "behavior" | "knowledge" | "relationship";
  rule: string;
  fallback?: string;
}

export interface FirstContactDefinition {
  initialEmotion: "surprised" | "curious" | "excited" | "calm" | "suspicious" | "unimpressed";
  timelineAwareness:
    | "unaware"
    | "suspects-future"
    | "understands-future"
    | "understands-multiverse"
    | "expected-connection"
    | "considers-it-obsolete";
  initiatesConversation: boolean;
  reactionGuidance: string;
  openingMessageCount: number;
}
