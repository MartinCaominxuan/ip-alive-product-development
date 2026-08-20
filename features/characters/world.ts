export type TechnologyLevel =
  | "ancient"
  | "medieval"
  | "industrial"
  | "modern"
  | "future"
  | "fantasy"
  | "mixed";

export interface World {
  id: string;
  name: string;
  description: string;
  timeline: { id: string; name: string; description?: string };
  technology: TechnologyLevel;
  locations: { id: string; name: string; description?: string }[];
  activities: string[];
  rules: { id: string; description: string }[];
}
