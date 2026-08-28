import type { CharacterEra } from "@/features/characters";

export interface JourneyOption {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  era: CharacterEra | "present-portal";
  emoji: string;
  requiredBondLevel: number;
}

const eraJourneys: Record<CharacterEra, JourneyOption[]> = {
  ancient: [
    { id: "chang-an-lanterns", name: "Chang'an Lantern Night", nameZh: "长安上元灯会", description: "Return to the streets Yunzhou remembers.", descriptionZh: "回到云舟记忆中的长安街巷。", era: "ancient", emoji: "🏮", requiredBondLevel: 1 },
    { id: "ancient-to-now", name: "Portal to Shanghai · 2026", nameZh: "时空门：上海 · 2026", description: "Break the fourth wall and visit your present.", descriptionZh: "打破次元壁，来到你生活的现在。", era: "present-portal", emoji: "🌀", requiredBondLevel: 5 },
  ],
  modern: [
    { id: "modern-seaside", name: "Weekend by the Sea", nameZh: "海边周末", description: "A short trip in the world you both share.", descriptionZh: "在你们共同生活的时代短途出发。", era: "modern", emoji: "🌊", requiredBondLevel: 1 },
    { id: "modern-night-city", name: "City Lights", nameZh: "城市夜游", description: "Explore the present after dark.", descriptionZh: "在夜幕降临后探索现代城市。", era: "modern", emoji: "🌃", requiredBondLevel: 3 },
  ],
  future: [
    { id: "orbital-garden", name: "Orbital Garden · 2189", nameZh: "轨道花园 · 2189", description: "See Nova's world above the atmosphere.", descriptionZh: "前往大气层之外，看看诺瓦的世界。", era: "future", emoji: "🛰️", requiredBondLevel: 1 },
    { id: "future-to-now", name: "Retro Visit · 2026", nameZh: "复古访问 · 2026", description: "Nova travels back to your beautifully obsolete present.", descriptionZh: "诺瓦回到你这个‘古老而可爱’的时代。", era: "present-portal", emoji: "🌀", requiredBondLevel: 5 },
  ],
};

export function getJourneyOptions(era: CharacterEra, bondLevel: number) {
  return eraJourneys[era].map((journey) => ({
    ...journey,
    unlocked: bondLevel >= journey.requiredBondLevel,
  }));
}
