const emojis = [

  "🐱",

  "🐶",

  "🐰",

  "🦊",

  "🐼",

  "🐻",

  "🐸",

  "🐧",

  "🦄",

  "🐵",

];

export function randomEmoji() {

  return emojis[Math.floor(Math.random() * emojis.length)];

}

export function randomLevel() {

  return Math.floor(Math.random() * 50) + 1;

}