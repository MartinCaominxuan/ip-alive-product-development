export interface AccountProfile {
  id: string;
  displayName: string;
  level: number;
  experience: number;
  createdAt: string;
}

export interface AccountTitle {
  name: string;
  minimumLevel: number;
  accent: string;
}

export interface VisitedPlace {
  id: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  visitedAt: string;
  source: "store-purchase" | "event-check-in" | "manual";
}
