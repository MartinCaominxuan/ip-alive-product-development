export function calculateBudgetPlan(input: { income: number; fixedCosts: number; savingsTarget: number; spent: number; daysLeft: number }) {
  const flexibleBudget = Math.max(0, input.income - input.fixedCosts - input.savingsTarget);
  const remaining = flexibleBudget - input.spent;
  return { flexibleBudget, remaining, dailyBudget: remaining / Math.max(1, input.daysLeft), projectedSavings: input.income - input.fixedCosts - input.spent, onTrack: input.income - input.fixedCosts - input.spent >= input.savingsTarget };
}

export function calculateWeeklyWeightChange(currentWeight: number, targetWeight: number, targetDate: string, now = Date.now()) {
  const weeks = Math.max(1, (new Date(`${targetDate}T12:00:00`).getTime() - now) / 604800000);
  const weeklyChange = (currentWeight - targetWeight) / weeks;
  return { weeklyChange, safePlanningBand: Math.abs(weeklyChange) <= 1 };
}
