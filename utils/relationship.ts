export type RelationshipStage = {
  name: string;
  emoji: string;
};

const relationshipStages: RelationshipStage[] = [
  {
    name: "New Friend",
    emoji: "🌱",
  },
  {
    name: "Friend",
    emoji: "🤝",
  },
  {
    name: "Close Friend",
    emoji: "🌸",
  },
  {
    name: "Trusted Companion",
    emoji: "⭐",
  },
  {
    name: "Lifelong Companion",
    emoji: "💖",
  },
  {
    name: "Soulmate",
    emoji: "✨",
  },
];

export function getRelationshipStage(
  level: number
): RelationshipStage {
  const highestStageIndex = relationshipStages.length - 1;

  const safeLevel = Math.min(
    Math.max(level, 0),
    highestStageIndex
  );

  return relationshipStages[safeLevel];
}