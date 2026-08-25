import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";

interface GameProgressValue {
  bubbles: number;
  lifetimeScore: number;
  selectedCharacterId: string;
  unlockedRewardIds: string[];
  setSelectedCharacterId: (id: string) => void;
  addLevelReward: (score: number, bubbles: number) => void;
  unlockReward: (id: string, cost: number) => boolean;
}

const GameProgressContext = createContext<GameProgressValue | undefined>(undefined);

export function GameProgressProvider({ children }: { children: ReactNode }) {
  const [bubbles, setBubbles] = useState(2480);
  const [lifetimeScore, setLifetimeScore] = useState(6840);
  const [selectedCharacterId, setSelectedCharacterId] = useState("mia");
  const [unlockedRewardIds, setUnlockedRewardIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { void AsyncStorage.getItem("ip-alive:game-progress:v1").then((raw) => { if (raw) { const saved = JSON.parse(raw) as { bubbles: number; lifetimeScore: number; selectedCharacterId: string; unlockedRewardIds: string[] }; setBubbles(saved.bubbles); setLifetimeScore(saved.lifetimeScore); setSelectedCharacterId(saved.selectedCharacterId); setUnlockedRewardIds(saved.unlockedRewardIds); } }).finally(() => setHydrated(true)); }, []);
  useEffect(() => { if (hydrated) void AsyncStorage.setItem("ip-alive:game-progress:v1", JSON.stringify({ bubbles, lifetimeScore, selectedCharacterId, unlockedRewardIds })); }, [bubbles, lifetimeScore, selectedCharacterId, unlockedRewardIds, hydrated]);

  const value = useMemo<GameProgressValue>(() => ({
    bubbles, lifetimeScore, selectedCharacterId, unlockedRewardIds, setSelectedCharacterId,
    addLevelReward: (score, reward) => { setLifetimeScore((current) => current + score); setBubbles((current) => current + reward); },
    unlockReward: (id, cost) => {
      if (bubbles < cost || unlockedRewardIds.includes(id)) return false;
      setBubbles((current) => current - cost); setUnlockedRewardIds((current) => [...current, id]); return true;
    },
  }), [bubbles, lifetimeScore, selectedCharacterId, unlockedRewardIds]);
  return <GameProgressContext.Provider value={value}>{children}</GameProgressContext.Provider>;
}

export function useGameProgress() {
  const value = useContext(GameProgressContext);
  if (!value) throw new Error("useGameProgress must be used inside GameProgressProvider");
  return value;
}
