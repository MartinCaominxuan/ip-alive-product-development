import { originalCharacterCanon } from "../../features/characters/canon.ts";
import { characterStoryEvents } from "../../features/characters/story-events.ts";
import type { CharacterContentPack } from "../../features/content-packs/types.ts";

export const originalDemoContentPack:CharacterContentPack={schemaVersion:1,packId:"ip-alive.original-demo",version:"1.0.0",displayName:"Across Time · Original Demo Pack",ownership:"original-demo",replaceable:true,characterIds:["yunzhou","mia","nova"],mainlines:originalCharacterCanon,events:characterStoryEvents,eventPlacements:{"yunzhou-examination":{kind:"stage-event",requiredBondLevel:2},"yunzhou-history-office":{kind:"stage-event",requiredBondLevel:4},"mia-moot-court":{kind:"stage-event",requiredBondLevel:1},"mia-legal-aid":{kind:"stage-event",requiredBondLevel:5},"nova-ship-243":{kind:"stage-event",requiredBondLevel:3},"nova-europa-archive":{kind:"stage-event",requiredBondLevel:5}}};
