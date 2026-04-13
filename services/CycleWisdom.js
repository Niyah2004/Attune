// Spiritual & Physical Recommendations based on inner seasons

export const getInnerSeason = (cycleDay, cycleLength = 28) => {
  // Normalize based on 28 days for simple mapping
  const normalizedDay = (cycleDay / cycleLength) * 28;

  if (normalizedDay >= 1 && normalizedDay <= 6) {
    return {
      season: 'Winter',
      name: 'Menstrual Phase',
      color: '#d94b58',
      vibe: 'Rest & Reflect',
      feelings: "You may feel deeply introspective, physically fatigued, or highly sensitive to your surroundings.",
      balance: "Prioritize rest and solitude. It is completely okay to say no to social obligations to recharge your battery.",
      affirmation: "I honor my body's need for strict rest and safely release what no longer serves me.",
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
      color: '#76a68f',
      vibe: 'Plan & Initiate',
      feelings: "You may feel a sudden rise in energy, mental optimism, and creativity as estrogen slowly begins to climb.",
      balance: "Pace yourself. Use this energy to brainstorm and begin new healthy habits, but avoid burning out before your cycle peaks.",
      affirmation: "I am open to bold new beginnings and trust the creative energy flowing through me.",
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
      color: '#6b8cae',
      vibe: 'Connect & Express',
      feelings: "You may feel highly sociable, extremely confident, magnetic, and physically energized.",
      balance: "Channel this peak outward energy into communication and community, but remember to stay hydrated and grounded.",
      affirmation: "I am radiant, capable, and entirely worthy of taking up space.",
      recommendations: [
        'Peak energy! Take on challenging workouts or strength training.',
        'Schedule important meetings or social gatherings.',
        'Eat raw veggies and antioxidant-rich foods to support liver detox.',
        'Communicate your needs and desires clearly.'
      ]
    };
  } else {
    return {
      season: 'Autumn',
      name: 'Luteal Phase',
      color: '#a67b5b',
      vibe: 'Nurture & Wind Down',
      feelings: "You might notice your energy turning inward, with a desire to organize, nest, and deliberately slow down.",
      balance: "Focus on completing existing tasks rather than starting new ones. Forgive yourself for needing more sleep.",
      affirmation: "I listen closely to my body's boundaries and prepare my physical space for rest without guilt.",
      recommendations: [
        'Focus on completing tasks rather than starting new ones.',
        'Transition to pilates or walking as energy dips.',
        'Eat complex carbs (sweet potatoes, squash) to stabilize mood.',
        'Prioritize boundaries and say no to draining events.'
      ]
    };
  }
};
