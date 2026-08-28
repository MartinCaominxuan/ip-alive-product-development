import type { UnlockResult } from "./types";
export interface DemoUnlockDefinition{code:string;productId:string;characterId:string;expiresAt?:string;}
export interface LocalUnlockGrant{characterId:string;productId:string;tokenFingerprint:string;unlockedAt:string;source:"demo-seed"|"offline-code";}
export const DEMO_UNLOCK_CODES:DemoUnlockDefinition[]=[
  {code:"IPALIVE-DEMO-CRYSTAL-7K2M",productId:"figure-series-a-crystal",characterId:"crystal"},
  {code:"IPALIVE-DEMO-FINO-4P9X",productId:"figure-series-a-fino",characterId:"fino"},
  {code:"IPALIVE-DEMO-MONICA-8R3Q",productId:"figure-series-a-monica",characterId:"monica"},
];
export const DEMO_SEED_CHARACTER_IDS=["starter-luna","yunzhou","mia","nova","luna","angel"];
export function tokenFingerprint(value:string){let hash=2166136261;for(let index=0;index<value.length;index+=1){hash^=value.charCodeAt(index);hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).padStart(8,"0")}
export function validateOfflineDemoCode(code:string,grants:LocalUnlockGrant[],now=new Date()):{result:UnlockResult;definition?:DemoUnlockDefinition}{const normalized=code.trim().toUpperCase();const definition=DEMO_UNLOCK_CODES.find((item)=>item.code===normalized);if(!definition)return{result:{status:"invalid"}};if(definition.expiresAt&&new Date(definition.expiresAt).getTime()<now.getTime())return{result:{status:"expired",characterId:definition.characterId}};if(grants.some((grant)=>grant.characterId===definition.characterId||grant.tokenFingerprint===tokenFingerprint(normalized)))return{result:{status:"already-unlocked",characterId:definition.characterId,unlockedAt:grants.find((grant)=>grant.characterId===definition.characterId)?.unlockedAt}};return{definition,result:{status:"unlocked",characterId:definition.characterId,unlockedAt:now.toISOString()}}}
