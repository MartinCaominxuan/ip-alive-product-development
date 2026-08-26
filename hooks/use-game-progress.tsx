import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { getAccountProgress } from "@/features/progression";

interface GameProgressValue {
  bubbles: number;
  lifetimeScore: number;
  accountExperience: number;
  accountLevel: number;
  selectedCharacterId: string;
  unlockedRewardIds: string[];
  setSelectedCharacterId: (id: string) => void;
  addLevelReward: (score: number, bubbles: number) => void;
  addLifeReward: (bubbles: number, experience?: number) => void;
  addAccountExperience: (experience: number) => void;
  unlockReward: (id: string, cost: number) => boolean;
}

const GameProgressContext = createContext<GameProgressValue | undefined>(undefined);

export function GameProgressProvider({ children }: { children: ReactNode }) {
  const [bubbles, setBubbles] = useState(2480);
  const [lifetimeScore, setLifetimeScore] = useState(6840);
  const [accountExperience, setAccountExperience] = useState(112380);
  const [selectedCharacterId, setSelectedCharacterId] = useState("mia");
  const [unlockedRewardIds, setUnlockedRewardIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { void AsyncStorage.getItem("ip-alive:game-progress:v2").then(async (raw) => { const legacy = raw ?? await AsyncStorage.getItem("ip-alive:game-progress:v1"); if (legacy) { const saved = JSON.parse(legacy) as { bubbles?: number; lifetimeScore?: number; accountExperience?: number; selectedCharacterId?: string; unlockedRewardIds?: string[] }; setBubbles(saved.bubbles ?? 2480); setLifetimeScore(saved.lifetimeScore ?? 6840); setAccountExperience(saved.accountExperience ?? 112380); setSelectedCharacterId(saved.selectedCharacterId ?? "mia"); setUnlockedRewardIds(saved.unlockedRewardIds ?? []); } }).finally(() => setHydrated(true)); }, []);
  useEffect(() => { if (hydrated) void AsyncStorage.setItem("ip-alive:game-progress:v2", JSON.stringify({ schemaVersion: 2, bubbles, lifetimeScore, accountExperience, selectedCharacterId, unlockedRewardIds })); }, [bubbles, lifetimeScore, accountExperience, selectedCharacterId, unlockedRewardIds, hydrated]);

  const value = useMemo<GameProgressValue>(() => ({
    bubbles, lifetimeScore, accountExperience, accountLevel: getAccountProgress(accountExperience).level, selectedCharacterId, unlockedRewardIds, setSelectedCharacterId,
    addLevelReward: (score, reward) => { setLifetimeScore((current) => current + score); setBubbles((current) => current + reward); setAccountExperience((current) => current + 50); },
    addLifeReward: (reward, experience = 0) => { setBubbles((current) => current + reward); setAccountExperience((current) => current + experience); },
    addAccountExperience: (experience) => setAccountExperience((current) => current + experience),
    unlockReward: (id, cost) => {
      if (bubbles < cost || unlockedRewardIds.includes(id)) return false;
      setBubbles((current) => current - cost); setUnlockedRewardIds((current) => [...current, id]); return true;
    },
  }), [bubbles, lifetimeScore, accountExperience, selectedCharacterId, unlockedRewardIds]);
  return <GameProgressContext.Provider value={value}>{children}</GameProgressContext.Provider>;
}

export function useGameProgress() {
  const value = useContext(GameProgressContext);
  if (!value) throw new Error("useGameProgress must be used inside GameProgressProvider");
  return value;
}
