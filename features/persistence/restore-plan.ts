export type RestoreOperation = { kind: "set"; key: string; value: string } | { kind: "remove"; key: string };
export function buildRestorePlan(keys: readonly string[], data: Record<string,string|null>): RestoreOperation[] { return keys.map((key)=>data[key]===null?{kind:"remove",key}:{kind:"set",key,value:data[key]}); }
