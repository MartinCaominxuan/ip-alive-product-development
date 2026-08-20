export interface ExperienceProgress {
  level: number;
  experience: number;
  experienceToNextLevel: number;
}

export interface ExperienceGrant {
  source: "match3" | "travel" | "unlock" | "reward" | "interaction";
  amount: number;
  grantedAt: string;
}
