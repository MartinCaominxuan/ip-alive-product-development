import type { ExperienceProgress } from "./types";

export const experienceRequiredForLevel = (level: number): number =>
  Math.max(100, Math.floor(100 * Math.pow(Math.max(level, 1), 1.25)));

export function grantExperience(
  current: ExperienceProgress,
  amount: number,
): ExperienceProgress {
  let level = current.level;
  let experience = current.experience + Math.max(0, amount);
  let required = experienceRequiredForLevel(level);

  while (experience >= required) {
    experience -= required;
    level += 1;
    required = experienceRequiredForLevel(level);
  }

  return { level, experience, experienceToNextLevel: required };
}
