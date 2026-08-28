export const ACCOUNT_EXP_PER_LEVEL = 10000;
export function getAccountProgress(totalExperience: number) { const safe = Math.max(0, Math.floor(totalExperience)); return { level: Math.floor(safe / ACCOUNT_EXP_PER_LEVEL) + 1, experienceInLevel: safe % ACCOUNT_EXP_PER_LEVEL, nextLevelExperience: ACCOUNT_EXP_PER_LEVEL }; }
