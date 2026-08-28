import type { CharacterMail } from "@/features/mail";

export const characterNamesZh: Record<string, string> = { Yunzhou: "云舟", Mia: "米娅", Nova: "诺瓦", Luna: "露娜", Angel: "安琪", Crystal: "克里斯朵", Fino: "菲诺", Monica: "莫妮卡", Charlie: "查理", Kevin: "凯文", Stefan: "斯特凡", Seven: "小七", Martin: "马丁", Alex: "亚历克斯", Jason: "杰森", Ela: "艾拉" };

export const mailTranslationsZh: Record<string, Pick<CharacterMail, "subject" | "body">> = {
  "mail-1": { subject: "我发现了一条安静的街", body: "雨让每一家店的灯光都显得更温暖。我把这个景色留给了你。" },
  "mail-2": { subject: "从海边回来了", body: "我带回了一枚贝壳，还有一点留给我们下次旅行的勇气。" },
  "mail-yunzhou": { subject: "灯下寄来的信", body: "今夜长安风暖。我仍不明白这掌中镜如何把字送到你那里，却愿再写一封。" },
  "mail-mia": { subject: "周末计划", body: "我留了一个靠窗的位置。这次记得带手机充电器。" },
  "mail-nova": { subject: "档案：二〇二六", body: "你们时代的消息很低效，但我已经开始期待收到它们。" },
};

export const mailTranslationsEn: Record<string, Pick<CharacterMail, "subject" | "body">> = {
  "mail-yunzhou": { subject: "A letter beneath the lantern", body: "The Chang'an night is warm. I still do not understand how this palm mirror carries words to you, yet I wished to write again." },
};
