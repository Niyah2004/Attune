import React from 'react';
import { getInnerSeason } from '../services/CycleWisdom';

const MoonPhaseDial = ({ cycleDay, cycleLength = 28 }) => {
  const normDay = (cycleDay / cycleLength) * 28;
  const wisdom = getInnerSeason(cycleDay, cycleLength);
  
  // Calculate phase visual properties (0 to 1 scale)
  // 1 is New Moon (dark), 14 is Full Moon (bright), 28 is New Moon (dark)
  const fullness = Math.sin((normDay / 28) * Math.PI - (Math.PI / 2)); 
  // Map sin (-1 to 1) to (0 to 1) fullness
  const phaseValue = (fullness + 1) / 2;

  return (
    <div className="moon-container fade-in" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'
    }}>
      <div 
        className="moon animate-pulse-slow"
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, var(--moon-glow) ${phaseValue * 100}%, var(--bg-dark) ${phaseValue * 100 + 10}%)`,
          boxShadow: `0 0 ${20 + phaseValue * 60}px var(--star-glow), inset 0 0 20px rgba(0,0,0,0.5)`,
          border: '1px solid var(--border-subtle)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute', top: '20%', left: '30%', width: '10px', height: '10px', 
          backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute', top: '60%', left: '60%', width: '15px', height: '15px', 
          backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '50%'
        }}></div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: wisdom.color, marginBottom: '8px' }}>
          Day {cycleDay} • {wisdom.season}
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{wisdom.vibe}</p>
      </div>
    </div>
  );
};

export default MoonPhaseDial;
