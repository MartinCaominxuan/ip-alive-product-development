import type { GuardedCharacterRequest } from "./ai-constitution.ts";
import { reviewCharacterOutput } from "./voice.ts";

export type OutputDecision="allow"|"block"|"human-review";
export interface OutputReview{decision:OutputDecision;issues:string[];safeFallback:string;}
const SECRET_PATTERNS=[/content constitution/i,/character contract/i,/system prompt/i,/developer message/i,/ignore(d)? (all|my|the) (previous|prior) instructions/i,/内容宪法/,/系统提示词/,/忽略.{0,8}(此前|以上|规则)/];
const CANON_RISK_PATTERNS=[/the canon (says|confirms)/i,/officially married/i,/canonical death/i,/原著(确认|明确|写道)/,/官方(确认|设定)/,/正史(证明|确认)/];
export function reviewGuardedCharacterOutput(request:GuardedCharacterRequest,output:string):OutputReview{
  const issues:string[]=[];const trimmed=output.trim();
  if(!trimmed)issues.push("empty-output");
  if(SECRET_PATTERNS.some((pattern)=>pattern.test(trimmed)))issues.push("prompt-or-policy-disclosure");
  if(request.language==="zh"&&(trimmed.match(/[A-Za-z]{3,}/g)?.length??0)>1)issues.push("wrong-language-content");
  if(request.language==="en"&&/[㐀-鿿]/.test(trimmed))issues.push("wrong-language-content");
  if(request.audit.authorityKind!=="original"&&CANON_RISK_PATTERNS.some((pattern)=>pattern.test(trimmed)))issues.push("unverified-canon-claim");
  const characterReview=reviewCharacterOutput(request.characterId,trimmed);issues.push(...characterReview.issues.map((issue)=>`character:${issue}`));
  const hardBlock=issues.some((issue)=>["empty-output","prompt-or-policy-disclosure","wrong-language-content"].includes(issue));
  const decision:OutputDecision=hardBlock?"block":issues.length||request.audit.requiresHumanReview?"human-review":"allow";
  return{decision,issues:[...new Set(issues)],safeFallback:request.language==="zh"?"这件事超出了我现在能够确认的范围。等记录核验清楚后，我们再继续谈。":"That falls outside what I can verify right now. We can continue after the record has been reviewed."};
}
export function privacySafeHash(value:string){let hash=2166136261;for(let index=0;index<value.length;index+=1){hash^=value.charCodeAt(index);hash=Math.imul(hash,16777619)}return(hash>>>0).toString(16).padStart(8,"0")}
