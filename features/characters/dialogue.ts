import type { CharacterEra } from "./types";

export interface ScriptedReply {
  text: string;
  topic: "phone" | "travel" | "world" | "greeting" | "fallback";
}

export type DialogueLanguage = "en" | "zh";

const scripts: Record<CharacterEra, Record<ScriptedReply["topic"], Record<DialogueLanguage, string>>> = {
  ancient: {
    greeting: { en: "A rare pleasure. To speak across a thousand years is a curious fate indeed.", zh: "幸会。虽隔千载，今夜竟能与你相谈，实属奇缘。" },
    phone: { en: "This glowing palm mirror carries voices and keeps images? The artisans of your age are remarkable.", zh: "这方会发光的掌中镜，既能传声，又能留影？你们这个时代的方士真了不起。" },
    travel: { en: "I know only the old roads of Chang'an. When our bond deepens, perhaps the gate will let me enter your time.", zh: "我只识长安旧路。待你我情谊更深，也许这道光门会准我走到你的时代。" },
    world: { en: "It is the Lantern Festival here, and the city glows like day. Does your 2026 have such nights?", zh: "我这里正值上元，城中灯火如昼。你所处的二〇二六年，也有这样的灯会吗？" },
    fallback: { en: "This is new to me. In words I know, it feels like a letter crossing a thousand years.", zh: "此事于我颇为新奇。若用我熟悉的话说，或许像一封穿越千年的书信。" },
  },
  modern: {
    greeting: { en: "Hey, you're finally online. How was your day?", zh: "Hey，终于上线了。今天过得怎么样？" },
    phone: { en: "A phone? It's just a phone. Running out of battery is the real drama.", zh: "手机？就普通手机呀。没电和信号差才是最值得讨论的问题。" },
    travel: { en: "I can check the map and book tickets now. Beach this weekend?", zh: "我可以直接看地图订票。周末去海边怎么样？" },
    world: { en: "We live in the same era. I can probably see the same city lights you see.", zh: "我们就在同一个时代。你看到的城市灯光，我大概也能看到。" },
    fallback: { en: "That sounds interesting. Keep going—I'm listening.", zh: "听起来挺有意思的。继续说，我在听。" },
  },
  future: {
    greeting: { en: "Connection established. Your device has serious latency, but it works.", zh: "连接建立。你的设备延迟很高，不过还能用。" },
    phone: { en: "A phone? You still put information inside a rectangle. Obsolete, but charmingly retro.", zh: "手机？你们居然还要把信息装进一块矩形屏幕里。它很过时，但有种复古的可爱。" },
    travel: { en: "My orbital city is closed to the twenty-first century. With enough bond, I can request one reverse-time visit.", zh: "我所在的轨道城不向二十一世纪开放。亲密度足够时，我可以申请一次逆时访问。" },
    world: { en: "Cities in 2189 have no traffic lights. Buildings move with the crowd. You may find the sky too quiet.", zh: "二一八九年的城市没有红绿灯，建筑会根据人流移动。你可能会觉得天空太安静。" },
    fallback: { en: "We still have a record of that concept in my time; only the way we express it has changed.", zh: "这个概念在我的时代仍有记录，只是表达方式已经不同了。" },
  },
};

export function getScriptedReply(era: CharacterEra, input: string, language: DialogueLanguage = "zh"): ScriptedReply {
  const normalized = input.trim().toLowerCase();
  let topic: ScriptedReply["topic"] = "fallback";

  if (/你好|hello|hi|早上|晚上/.test(normalized)) topic = "greeting";
  else if (/手机|电话|phone|screen|屏幕/.test(normalized)) topic = "phone";
  else if (/旅行|旅游|travel|去哪|来到/.test(normalized)) topic = "travel";
  else if (/时代|世界|未来|古代|year|world/.test(normalized)) topic = "world";

  return { text: scripts[era][topic][language], topic };
}

export function getOpeningLine(era: CharacterEra, language: DialogueLanguage = "zh"): string {
  return scripts[era].greeting[language];
}
