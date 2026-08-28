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
  completedLevelIds: string[];
  bestLevelScores: Record<string, number>;
  levelStars: Record<string, number>;
  setSelectedCharacterId: (id: string) => void;
  addLevelReward: (score: number, bubbles: number) => void;
  completeMatch3Level: (levelId: string, score: number, reward: number, stars: number) => boolean;
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
  const [completedLevelIds, setCompletedLevelIds] = useState<string[]>([]);
  const [bestLevelScores, setBestLevelScores] = useState<Record<string, number>>({});
  const [levelStars, setLevelStars] = useState<Record<string, number>>({});
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { void AsyncStorage.getItem("ip-alive:game-progress:v3").then(async (raw) => { const legacy = raw ?? await AsyncStorage.getItem("ip-alive:game-progress:v2") ?? await AsyncStorage.getItem("ip-alive:game-progress:v1"); if (legacy) { const saved = JSON.parse(legacy) as { bubbles?: number; lifetimeScore?: number; accountExperience?: number; selectedCharacterId?: string; unlockedRewardIds?: string[]; completedLevelIds?: string[]; bestLevelScores?: Record<string,number>; levelStars?: Record<string,number> }; setBubbles(saved.bubbles ?? 2480); setLifetimeScore(saved.lifetimeScore ?? 6840); setAccountExperience(saved.accountExperience ?? 112380); setSelectedCharacterId(saved.selectedCharacterId ?? "mia"); setUnlockedRewardIds(saved.unlockedRewardIds ?? []); setCompletedLevelIds(saved.completedLevelIds ?? []); setBestLevelScores(saved.bestLevelScores ?? {}); setLevelStars(saved.levelStars ?? {}); } }).finally(() => setHydrated(true)); }, []);
  useEffect(() => { if (hydrated) void AsyncStorage.setItem("ip-alive:game-progress:v3", JSON.stringify({ schemaVersion: 3, bubbles, lifetimeScore, accountExperience, selectedCharacterId, unlockedRewardIds, completedLevelIds, bestLevelScores, levelStars })); }, [bubbles, lifetimeScore, accountExperience, selectedCharacterId, unlockedRewardIds, completedLevelIds, bestLevelScores, levelStars, hydrated]);

  const value = useMemo<GameProgressValue>(() => ({
    bubbles, lifetimeScore, accountExperience, accountLevel: getAccountProgress(accountExperience).level, selectedCharacterId, unlockedRewardIds, completedLevelIds, bestLevelScores, levelStars, setSelectedCharacterId,
    addLevelReward: (score, reward) => { setLifetimeScore((current) => current + score); setBubbles((current) => current + reward); setAccountExperience((current) => current + 50); },
    completeMatch3Level: (levelId, score, reward, stars) => { const first = !completedLevelIds.includes(levelId); setBestLevelScores((current) => ({...current,[levelId]:Math.max(current[levelId]??0,score)})); setLevelStars((current)=>({...current,[levelId]:Math.max(current[levelId]??0,stars)})); if(first){setCompletedLevelIds((current)=>[...current,levelId]);setLifetimeScore((current)=>current+score);setBubbles((current)=>current+reward);setAccountExperience((current)=>current+50);} return first; },
    addLifeReward: (reward, experience = 0) => { setBubbles((current) => current + reward); setAccountExperience((current) => current + experience); },
    addAccountExperience: (experience) => setAccountExperience((current) => current + experience),
    unlockReward: (id, cost) => {
      if (bubbles < cost || unlockedRewardIds.includes(id)) return false;
      setBubbles((current) => current - cost); setUnlockedRewardIds((current) => [...current, id]); return true;
    },
  }), [bubbles, lifetimeScore, accountExperience, selectedCharacterId, unlockedRewardIds, completedLevelIds, bestLevelScores, levelStars]);
  return <GameProgressContext.Provider value={value}>{children}</GameProgressContext.Provider>;
}

export function useGameProgress() {
  const value = useContext(GameProgressContext);
  if (!value) throw new Error("useGameProgress must be used inside GameProgressProvider");
  return value;
}
