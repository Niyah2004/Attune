// Spiritual & Physical Recommendations based on inner seasons

export const getInnerSeason = (cycleDay, cycleLength = 28) => {
  // Normalize based on 28 days for simple mapping
  const normalizedDay = (cycleDay / cycleLength) * 28;

  if (normalizedDay >= 1 && normalizedDay <= 6) {
    return {
      season: 'Winter',
      name: 'Menstrual Phase',
      color: 'var(--season-winter)',
      vibe: 'Rest & Reflect',
      recommendations: [
        'Drink warm grounding teas (ginger, raspberry leaf).',
        'Avoid intense workouts; opt for gentle stretching or yin yoga.',
        'Journal intentions for the upcoming cycle.',
        'Eat mineral-rich, warm foods like stews and dark leafy greens.'
      ]
    };
  } else if (normalizedDay > 6 && normalizedDay <= 13) {
    return {
      season: 'Spring',
      name: 'Follicular Phase',
      color: 'var(--season-spring)',
      vibe: 'Plan & Initiate',
      recommendations: [
        'Start new projects or learn something new.',
        'Incorporate light cardio and outdoor walks.',
        'Eat fresh, light, and vibrant foods (salads, berries, seeds).',
        'Socialize and connect with your community.'
      ]
    };
  } else if (normalizedDay > 13 && normalizedDay <= 17) {
    return {
      season: 'Summer',
      name: 'Ovulatory Phase',
      color: 'var(--season-summer)',
      vibe: 'Connect & Express',
      recommendations: [
        'Peak energy! Take on challenging workouts or strength training.',
        'Schedule important meetings or social gatherings.',
        'Eat raw veggies and antioxidant-rich foods to support liver detox.',
        'Communicate your needs and desires clearly.'
      ]
    };
  } else {
    // 18 - 28
    return {
      season: 'Autumn',
      name: 'Luteal Phase',
      color: 'var(--season-autumn)',
      vibe: 'Nurture & Wind Down',
      recommendations: [
        'Focus on completing tasks rather than starting new ones.',
        'Transition to pilates or walking as energy dips.',
        'Eat complex carbs (sweet potatoes, squash) to stabilize mood.',
        'Prioritize boundaries and say no to draining events.'
      ]
    };
  }
};
