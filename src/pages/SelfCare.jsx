import React from 'react';
const tips = [
  {
    category: 'Menstrual Phase',
    emoji: '🩸',
    color: 'bg-red-50 border-red-200',
    headerColor: 'text-red-700',
    items: [
      { title: 'Rest & restore', body: 'Honour your body\'s need for extra sleep and rest. Naps are not laziness—they\'re medicine.' },
      { title: 'Gentle movement', body: 'Try yin yoga, stretching, or slow walks instead of intense exercise to reduce cramps.' },
      { title: 'Warm comfort', body: 'A heat pack on your lower abdomen can significantly ease cramp pain.' },
      { title: 'Nourishing foods', body: 'Iron-rich foods like lentils, spinach, and pumpkin seeds help replenish nutrients lost during your period.' },
    ],
  },
  {
    category: 'Follicular Phase',
    emoji: '🌱',
    color: 'bg-yellow-50 border-yellow-200',
    headerColor: 'text-yellow-700',
    items: [
      { title: 'Channel rising energy', body: 'This is a great time to start new projects, set goals, or try something new.' },
      { title: 'Exercise more', body: 'Your body is primed for higher-intensity workouts like running, HIIT, or strength training.' },
      { title: 'Social connection', body: 'Oestrogen is rising—lean into socialising and creative collaboration.' },
    ],
  },
  {
    category: 'Ovulatory Phase',
    emoji: '✨',
    color: 'bg-green-50 border-green-200',
    headerColor: 'text-green-700',
    items: [
      { title: 'Speak your truth', body: 'Communication peaks at ovulation. Great time for important conversations or presentations.' },
      { title: 'Stay hydrated', body: 'Your basal body temperature rises slightly—drink plenty of water.' },
      { title: 'Celebrate yourself', body: 'You\'re radiating confidence. Wear something you love and acknowledge your strength.' },
    ],
  },
  {
    category: 'Luteal Phase',
    emoji: '🌙',
    color: 'bg-purple-50 border-purple-200',
    headerColor: 'text-purple-700',
    items: [
      { title: 'Slow down', body: 'Progesterone is high—your body naturally wants to turn inward. Honour that.' },
      { title: 'Reduce sugar & caffeine', body: 'These can worsen PMS symptoms. Try herbal teas and dark chocolate instead.' },
      { title: 'Journaling', body: 'The luteal phase brings heightened intuition. Writing down thoughts can bring clarity.' },
      { title: 'Magnesium-rich foods', body: 'Bananas, avocado, and dark chocolate can ease PMS symptoms and improve sleep.' },
    ],
  },
  {
    category: 'Mental Wellbeing',
    emoji: '💜',
    color: 'bg-violet-50 border-violet-200',
    headerColor: 'text-violet-700',
    items: [
      { title: 'Mindfulness & breathing', body: 'A 5-minute breathing exercise can reset your nervous system anytime, anywhere.' },
      { title: 'Set gentle boundaries', body: 'Saying no is a form of self-respect. You don\'t owe anyone your energy.' },
      { title: 'Seek support', body: 'If your mood consistently interferes with life, speaking to a healthcare provider or therapist is a courageous step.' },
      { title: 'Celebrate small wins', body: 'Acknowledge what you accomplished today—no matter how small.' },
    ],
  },
  {
    category: 'Nutrition & Hydration',
    emoji: '🥗',
    color: 'bg-lime-50 border-lime-200',
    headerColor: 'text-lime-700',
    items: [
      { title: 'Drink water', body: 'Aim for 8 glasses a day. Add lemon or cucumber to make it more enjoyable.' },
      { title: 'Anti-inflammatory foods', body: 'Blueberries, turmeric, salmon, and walnuts can help reduce cycle-related inflammation.' },
      { title: 'Don\'t skip meals', body: 'Regular meals stabilise blood sugar and reduce mood swings and fatigue.' },
    ],
  },
  {
    category: 'When to See a Doctor',
    emoji: '🏥',
    color: 'bg-blue-50 border-blue-200',
    headerColor: 'text-blue-700',
    items: [
      { title: 'Severe cramps', body: 'Debilitating period pain could indicate endometriosis. You deserve a pain-free life—ask your GP.' },
      { title: 'Very heavy bleeding', body: 'Soaking through a pad/tampon every hour may indicate fibroids or other conditions worth investigating.' },
      { title: 'Irregular cycles', body: 'Cycles shorter than 21 days or longer than 35 days, or sudden changes, warrant medical advice.' },
      { title: 'Severe mood changes', body: 'PMDD is a real condition that is treatable. If PMS severely impacts your life, please see a doctor.' },
    ],
  },
];

export default function SelfCare() {
  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🌸 Self-Care Hub</h1>
        <p className="text-gray-500 text-sm mt-1">Evidence-based tips for every phase of your cycle</p>
      </div>

      <div className="space-y-5">
        {tips.map(section => (
          <div key={section.category} className={`rounded-2xl border p-5 ${section.color}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{section.emoji}</span>
              <h2 className={`font-bold text-base ${section.headerColor}`}>{section.category}</h2>
            </div>
            <div className="space-y-3">
              {section.items.map(item => (
                <div key={item.title} className="bg-white bg-opacity-70 rounded-xl p-3">
                  <p className="font-semibold text-gray-700 text-sm mb-0.5">{item.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-pink-50 border border-pink-200 rounded-2xl p-4 text-center">
        <p className="text-sm text-pink-700">
          🌺 <strong>Remember:</strong> Your body is incredible. Every phase has its wisdom.
        </p>
      </div>
    </div>
  );
}
