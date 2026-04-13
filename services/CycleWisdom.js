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
      cosmicMessage: 'The moon retreats behind veiled clouds, and so does your energy — intentionally, beautifully. This is not emptiness. This is sacred preparation.',
      feelings: "You may feel deeply introspective, physically fatigued, or heightened in your emotional sensitivity. Your body is working hard beneath the surface, shedding and renewing simultaneously.",
      balance: "Prioritize rest and solitude above all else. It is completely okay — necessary, even — to say no to social obligations. Your only job right now is to restore.",
      affirmation: "I honor my body's need for rest and release what no longer serves me — without guilt.",
      snapshot: "Your body is in full shed and renewal mode. Estrogen and progesterone are at their lowest, which is exactly why everything feels heavier. This is not weakness — it is your system clearing the slate. Conserve energy deliberately today.",
      todaysFocus: "One nourishing act of rest. Nothing more is required of you.",
      ritual: 'Create a warm, grounding sanctuary for yourself and drink a nourishing herbal tea in silence.',
      steps: [
        'Brew a cup of ginger or raspberry leaf tea and hold the warm mug with both hands for a full minute before drinking.',
        'Dim the lights and light a candle if available. Sit comfortably and take 5 slow, deliberate breaths.',
        'Open your journal to a blank page. Write the words "I release..." and let whatever comes flow freely.',
        'Close with a body scan — starting at your feet, consciously relax each muscle group upward.',
        'Eat something warm and mineral-rich like a lentil stew or dark leafy greens before resting.'
      ],
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
      cosmicMessage: 'The moon emerges fresh and curious, pulling the tide of your creativity toward the surface. Seeds planted now carry the momentum of the entire season ahead.',
      feelings: "You may feel a rising surge of energy, mental optimism, and creative curiosity as estrogen steadily climbs. Ideas come quickly. The world feels full of possibility.",
      balance: "Pace yourself with intention. Use this rising energy to brainstorm, begin new habits, and say yes to things that excite you — but avoid burning out before your cycle reaches its peak.",
      affirmation: "I am open to bold new beginnings and I trust the creative energy flowing through me.",
      snapshot: "Estrogen is climbing and your brain is literally producing more serotonin right now. Your focus is sharper, your tolerance is higher, and new ideas are surfacing faster than usual. This window is short — use it with intention.",
      todaysFocus: "Start the one thing you've been putting off. Your body is chemically primed for it.",
      ritual: 'Plant a physical seed or write one clear, inspiring intention for this cycle on paper.',
      steps: [
        'Find a small pot, seed packet, or simply write your intention on a piece of paper.',
        'Sit quietly and ask yourself: what do I truly want to call in this month? Write it as "I am..." not "I want..."',
        'Fold the paper or water your seed — this act is a physical commitment to your intention.',
        'Place it somewhere visible (windowsill, altar, desk) as a daily reminder.',
        'Each morning this week, read your intention aloud before starting your day.'
      ],
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
      cosmicMessage: 'The moon hangs full and luminous, radiating the same magnetic confidence your body holds right now. You are at your most visible, most powerful, most alive.',
      feelings: "You may feel highly sociable, magnetically confident, and physically charged with vitality. Communication flows naturally. People are drawn to your presence without you even trying.",
      balance: "Channel this outward peak energy into meaningful connection and bold expression. Show up, speak up, and let yourself be seen — but stay hydrated and grounded as you move through the world.",
      affirmation: "I am radiant, fully capable, and entirely worthy of taking up every inch of space.",
      snapshot: "LH just surged and your body released an egg. Estrogen is at its absolute peak, which means so is your verbal fluency, pain tolerance, and social magnetism. People will respond to you differently today — lean into it.",
      todaysFocus: "Say the thing you've been holding back. Make the ask. Have the conversation.",
      ritual: 'Schedule one important conversation, meeting, or creative act you have been putting off.',
      steps: [
        'Identify the one conversation, pitch, or creative act you have been delaying.',
        'Block time on your calendar today — even 30 minutes — to make it happen.',
        'Before the moment, do 2 minutes of power posture: stand tall, shoulders back, chin up.',
        'Drink a full glass of water and eat something grounding beforehand (avocado, nuts, eggs).',
        'Afterwards, acknowledge your courage — write one sentence about how it went.'
      ],
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
      cosmicMessage: 'The moon begins her descent, gathering wisdom from all she has witnessed. This is the season of harvest — of completing, nesting, and turning lovingly inward.',
      feelings: "You might notice your energy turning noticeably inward, with a deep desire to organize, nest, and slow down. Emotions may feel closer to the surface. This is your body\'s intelligence — not a flaw.",
      balance: "Focus on completing what already exists rather than starting anything new. Forgive yourself for needing more sleep, more quiet, more softness. You are integrating all you have experienced.",
      affirmation: "I listen deeply to my body's boundaries and prepare my space for rest — without guilt.",
      snapshot: "Progesterone is peaking then dropping, pulling your energy inward. Your brain is in detail and completion mode — not creation mode. You may feel more irritable or emotionally raw near the end of this phase; that is progesterone withdrawing, not a personal failing.",
      todaysFocus: "Finish one thing. Tidy one space. Say no to one thing that drains you.",
      ritual: 'Prepare your physical space with intention — clear one area and create a nourishing evening routine.',
      steps: [
        'Choose one small area to tidy: your nightstand, desk, or kitchen counter. Remove anything that creates visual stress.',
        'Light something calming — a candle, incense, or a diffuser with lavender or cedarwood.',
        'Prepare a grounding snack: sweet potato, oatmeal, or dark chocolate.',
        'Set your phone to Do Not Disturb one hour before you want to sleep.',
        'Write tomorrow\'s top 3 priorities in your journal so your mind can fully release for the night.'
      ],
      recommendations: [
        'Focus on completing tasks rather than starting new ones.',
        'Transition to pilates or walking as energy dips.',
        'Eat complex carbs (sweet potatoes, squash) to stabilize mood.',
        'Prioritize boundaries and say no to draining events.'
      ]
    };
  }
};
