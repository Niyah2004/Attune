import React, { useState } from 'react';

const habitsList = [
  { id: 'water', icon: '💧', label: 'Hydrated' },
  { id: 'meditation', icon: '🧘‍♀️', label: 'Meditation' },
  { id: 'noscreen', icon: '📱', label: 'Screen Detox' },
  { id: 'movement', icon: '✨', label: 'Gentle Flow' }
];

const DailyVibeCheck = ({ onLogVibe }) => {
  const [mood, setMood] = useState(50);
  const [habits, setHabits] = useState([]);
  
  const handleHabitToggle = (id) => {
    setHabits(prev => 
      prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]
    );
  };

  const getMoodEmoji = (val) => {
    if (val < 25) return '🌑';
    if (val < 50) return '🌘';
    if (val < 75) return '🌗';
    return '🌕';
  };

  return (
    <div className="glass-panel fade-in" style={{ marginTop: '24px' }}>
      <h3 className="section-title">Daily Vibe</h3>
      
      {/* Mood Slider */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '1.2rem' }}>{getMoodEmoji(mood)}</span>
          <span style={{ color: 'var(--text-muted)' }}>
            {mood < 30 ? 'Low Energy' : mood > 70 ? 'Radiant' : 'Balanced'}
          </span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={mood} 
          onChange={(e) => setMood(parseInt(e.target.value))}
          style={{
            width: '100%',
            appearance: 'none',
            height: '6px',
            background: 'var(--border-subtle)',
            borderRadius: '4px',
            outline: 'none'
          }}
        />
        <style>{`
          input[type=range]::-webkit-slider-thumb {
            appearance: none; width: 20px; height: 20px; border-radius: 50%;
            background: var(--moon-glow); cursor: pointer;
            box-shadow: 0 0 10px var(--star-glow);
          }
        `}</style>
      </div>
      
      {/* Habits Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {habitsList.map(h => (
          <button 
            key={h.id}
            onClick={() => handleHabitToggle(h.id)}
            style={{
              padding: '12px',
              borderRadius: 'var(--border-radius)',
              background: habits.includes(h.id) ? 'var(--bg-panel-hover)' : 'var(--bg-panel)',
              border: `1px solid ${habits.includes(h.id) ? 'var(--accent-soft)' : 'var(--border-subtle)'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'var(--transition-smooth)',
              boxShadow: habits.includes(h.id) ? '0 0 12px rgba(133, 127, 164, 0.2)' : 'none'
            }}
          >
            <span>{h.icon}</span> 
            <span style={{ fontSize: '0.9rem' }}>{h.label}</span>
          </button>
        ))}
      </div>

      <button 
        onClick={() => onLogVibe({ mood, habits })}
        style={{
          width: '100%', padding: '14px', marginTop: '24px',
          borderRadius: 'var(--border-radius)',
          background: 'linear-gradient(90deg, var(--accent-soft), var(--season-winter))',
          color: 'var(--bg-dark)', fontWeight: '600',
          transition: 'var(--transition-smooth)'
        }}
      >
        Attune
      </button>
    </div>
  );
};

export default DailyVibeCheck;
