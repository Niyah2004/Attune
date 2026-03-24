/**
 * Calculate the predicted next period start date based on past cycles.
 * @param {Array<{start: string, end: string}>} cycles - Array of cycle objects with ISO date strings
 * @param {number} defaultCycleLength - Default cycle length in days if no history
 * @returns {string|null} - Predicted start date as ISO string, or null
 */
export function predictNextPeriod(cycles, defaultCycleLength = 28) {
  if (!cycles || cycles.length === 0) return null;

  const sorted = [...cycles].sort((a, b) => new Date(b.start) - new Date(a.start));
  const lastStart = new Date(sorted[0].start);

  let avgCycleLength = defaultCycleLength;
  if (sorted.length >= 2) {
    const lengths = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      const diff =
        (new Date(sorted[i].start) - new Date(sorted[i + 1].start)) / (1000 * 60 * 60 * 24);
      if (diff > 0 && diff < 60) lengths.push(diff);
    }
    if (lengths.length > 0) {
      avgCycleLength = Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
    }
  }

  const nextDate = new Date(lastStart);
  nextDate.setDate(nextDate.getDate() + avgCycleLength);
  return nextDate.toISOString().split('T')[0];
}

/**
 * Calculate the average cycle length from past cycles.
 * @param {Array<{start: string, end: string}>} cycles
 * @returns {number}
 */
export function getAvgCycleLength(cycles) {
  if (!cycles || cycles.length < 2) return 28;
  const sorted = [...cycles].sort((a, b) => new Date(b.start) - new Date(a.start));
  const lengths = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const diff =
      (new Date(sorted[i].start) - new Date(sorted[i + 1].start)) / (1000 * 60 * 60 * 24);
    if (diff > 0 && diff < 60) lengths.push(diff);
  }
  if (lengths.length === 0) return 28;
  return Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
}

/**
 * Get the current cycle phase based on the last period start.
 * @param {string} lastPeriodStart - ISO date string
 * @param {number} cycleLength - Cycle length in days
 * @returns {{ phase: string, day: number, description: string }}
 */
export function getCyclePhase(lastPeriodStart, cycleLength = 28) {
  if (!lastPeriodStart) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(lastPeriodStart);
  start.setHours(0, 0, 0, 0);
  const dayOfCycle = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;

  if (dayOfCycle < 1) return null;

  const ovulationDay = Math.round(cycleLength / 2);

  if (dayOfCycle <= 5) {
    return { phase: 'Menstrual', day: dayOfCycle, description: 'Your period is here. Rest and be gentle with yourself.' };
  } else if (dayOfCycle <= ovulationDay - 3) {
    return { phase: 'Follicular', day: dayOfCycle, description: 'Energy is building. Great time for new projects and socialising.' };
  } else if (dayOfCycle <= ovulationDay + 3) {
    return { phase: 'Ovulatory', day: dayOfCycle, description: 'Peak energy and confidence. Make the most of it!' };
  } else if (dayOfCycle <= cycleLength) {
    return { phase: 'Luteal', day: dayOfCycle, description: 'Wind down and focus on self-care as your body prepares.' };
  }
  return null;
}

/**
 * Format a date string as a human-readable date.
 * @param {string} dateStr - ISO date string
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/**
 * Returns how many days until a given date.
 * @param {string} dateStr - ISO date string
 * @returns {number}
 */
export function daysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}
