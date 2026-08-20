import type { VisitedPlace } from "@/features/account";

export const visitedPlaces: VisitedPlace[] = [
  { id: "shanghai-hkri", name: "IP Alive HKRI Store", city: "Shanghai", country: "China", latitude: 31.225, longitude: 121.473, visitedAt: "2026-07-26T10:00:00.000Z", source: "store-purchase" },
  { id: "beijing-sanlitun", name: "Sanlitun Flagship", city: "Beijing", country: "China", latitude: 39.933, longitude: 116.455, visitedAt: "2026-06-18T10:00:00.000Z", source: "store-purchase" },
  { id: "tokyo-shibuya", name: "Shibuya Limited Event", city: "Tokyo", country: "Japan", latitude: 35.66, longitude: 139.7, visitedAt: "2026-05-04T10:00:00.000Z", source: "event-check-in" },
];
