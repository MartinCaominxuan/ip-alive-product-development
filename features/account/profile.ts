export type AccountMode = "demo" | "production";
export type RegistrationStatus = "demo" | "registered";
export type ProfileLifecycleStatus = "active" | "paused";
export interface UserProfile { id: string; mode: AccountMode; registrationStatus: RegistrationStatus; lifecycleStatus: ProfileLifecycleStatus; displayName: string; createdAt: string; firstActiveAt: string; timezone: string; locale: "en" | "zh"; pausedAt?: string; avatarKey?: string; }
export const DEMO_PROFILE: UserProfile = { id: "demo-account", mode: "demo", registrationStatus: "demo", lifecycleStatus: "active", displayName: "Martin", createdAt: "2026-07-24T00:00:00.000Z", firstActiveAt: "2026-07-24T00:00:00.000Z", timezone: "Asia/Shanghai", locale: "zh" };
