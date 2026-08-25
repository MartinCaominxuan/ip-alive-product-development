export interface MemoryRecord {
  id: string;
  characterId: "yunzhou" | "mia" | "nova";
  characterName: string;
  emoji: string;
  titleEn: string;
  titleZh: string;
  summaryEn: string;
  summaryZh: string;
  bodyEn: string;
  bodyZh: string;
  date: string;
  type: "conversation" | "journey" | "mail" | "outfit";
}

export const memories: MemoryRecord[] = [
  { id: "palm-mirror", characterId: "yunzhou", characterName: "Yunzhou", emoji: "🏮", titleEn: "The glowing palm mirror", titleZh: "会发光的掌中镜", summaryEn: "Yunzhou saw a phone for the first time.", summaryZh: "云舟第一次看见手机。", bodyEn: "He held the phone at arm's length and asked whether a tiny spirit lived behind the glass. When your voice returned through it, surprise became a careful smile.", bodyZh: "他把手机举到一臂之外，问玻璃后面是否住着一只小精怪。当你的声音从里面传回来时，他的惊讶慢慢变成了谨慎的微笑。", date: "2026-08-20", type: "conversation" },
  { id: "weekend-sea", characterId: "mia", characterName: "Mia", emoji: "🌊", titleEn: "A weekend by the sea", titleZh: "海边的周末", summaryEn: "Mia returned with a blue postcard.", summaryZh: "Mia 带回了一张蓝色明信片。", bodyEn: "The train was crowded, the weather app was wrong, and the sea was still worth it. Mia saved a seat by the window for the next journey.", bodyZh: "列车很拥挤，天气软件也预报错了，但海边依然值得。Mia 说下次旅行会替你留一个靠窗的位置。", date: "2026-08-21", type: "journey" },
  { id: "retro-device", characterId: "nova", characterName: "Nova", emoji: "📱", titleEn: "A beautifully obsolete device", titleZh: "一台美丽的过时设备", summaryEn: "Nova archived your phone as a historical object.", summaryZh: "Nova 把你的手机收录为历史物件。", bodyEn: "Nova catalogued the rectangular screen, physical charging port, and notification sounds. The final note reads: inefficient, distracting, unexpectedly charming.", bodyZh: "Nova 记录了矩形屏幕、实体充电口和通知声音。最后的评语是：低效、扰人，却意外地可爱。", date: "2026-08-24", type: "conversation" },
  { id: "first-portal", characterId: "nova", characterName: "Nova", emoji: "🌀", titleEn: "The first timeline crossing", titleZh: "第一次跨越时间线", summaryEn: "Bond Level 5 opened a route to 2026.", summaryZh: "亲密度 5 解锁了通往 2026 的路线。", bodyEn: "For twelve minutes, the timeline barrier stabilized. Nova stepped into 2026 and stared at a traffic light as if it belonged in a museum.", bodyZh: "时间线屏障稳定了十二分钟。Nova 踏进 2026 年，并用看博物馆藏品的眼神盯着红绿灯。", date: "2026-08-25", type: "journey" },
];
