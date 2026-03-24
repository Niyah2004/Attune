import React from 'react';
const phaseColors = {
  Menstrual: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100', icon: '🩸' },
  Follicular: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-100', icon: '🌱' },
  Ovulatory: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100', icon: '✨' },
  Luteal: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100', icon: '🌙' },
};

export default function PhaseCard({ phase }) {
  if (!phase) return null;
  const colors = phaseColors[phase.phase] || phaseColors.Follicular;

  return (
    <div className={`rounded-2xl border p-4 ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{colors.icon}</span>
        <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${colors.badge} ${colors.text}`}>
          {phase.phase} Phase · Day {phase.day}
        </span>
      </div>
      <p className={`text-sm ${colors.text}`}>{phase.description}</p>
    </div>
  );
}
