import type { CharacterContentPack } from "./types";

let activePack:CharacterContentPack|undefined;
export function registerContentPack(pack:CharacterContentPack){activePack=pack;return pack}
export function getActiveContentPack(){if(!activePack)throw new Error("content-pack-not-registered");return activePack}
export function clearContentPackForTests(){activePack=undefined}
