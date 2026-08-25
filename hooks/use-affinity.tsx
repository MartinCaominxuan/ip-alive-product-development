import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type AffinitySource = "chat" | "mail" | "outfit" | "game";
export const AFFINITY_LEVELS = [0, 100, 260, 500, 850, 1300, 1900];
const INITIAL: Record<string, number> = { yunzhou: 160, mia: 610, nova: 940 };

interface AffinityContextValue {
  points: Record<string, number>;
  awardedEvents: string[];
  award: (characterId: string, amount: number, source: AffinitySource, uniqueKey?: string) => boolean;
}
const Context = createContext<AffinityContextValue | undefined>(undefined);

export function AffinityProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(INITIAL);
  const [awardedEvents, setAwardedEvents] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { void AsyncStorage.getItem("ip-alive:affinity:v1").then((raw) => { if (raw) { const saved = JSON.parse(raw) as { points: Record<string, number>; awardedEvents: string[] }; setPoints(saved.points); setAwardedEvents(saved.awardedEvents); } }).finally(() => setHydrated(true)); }, []);
  useEffect(() => { if (hydrated) void AsyncStorage.setItem("ip-alive:affinity:v1", JSON.stringify({ points, awardedEvents })); }, [points, awardedEvents, hydrated]);
  const value = useMemo<AffinityContextValue>(() => ({
    points, awardedEvents,
    award: (characterId, amount, source, uniqueKey) => {
      const eventId = uniqueKey ? `${source}:${characterId}:${uniqueKey}` : undefined;
      if (eventId && awardedEvents.includes(eventId)) return false;
      setPoints((current) => ({ ...current, [characterId]: (current[characterId] ?? 0) + amount }));
      if (eventId) setAwardedEvents((current) => [...current, eventId]);
      return true;
    },
  }), [points, awardedEvents]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useAffinity() { const value = useContext(Context); if (!value) throw new Error("useAffinity must be used inside AffinityProvider"); return value; }
export function getAffinityLevel(points: number) { let level = 1; AFFINITY_LEVELS.forEach((threshold, index) => { if (points >= threshold) level = index + 1; }); return Math.min(level, AFFINITY_LEVELS.length); }
