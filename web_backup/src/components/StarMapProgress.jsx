import React from 'react';

const StarMapProgress = ({ activeDotsCount }) => {
  // We mock a constellation map.
  // The more habits logged, the more stars light up
  const starsMap = [
    { id: 1, cx: 20, cy: 30, r: 1.5 },
    { id: 2, cx: 50, cy: 20, r: 2 },
    { id: 3, cx: 80, cy: 40, r: 1 },
    { id: 4, cx: 40, cy: 60, r: 2.5 },
    { id: 5, cx: 70, cy: 80, r: 1.5 },
    { id: 6, cx: 90, cy: 10, r: 1 },
    { id: 7, cx: 10, cy: 80, r: 2 }
  ];

  return (
    <div className="glass-panel fade-in" style={{ marginTop: '24px', textAlign: 'center' }}>
      <h3 className="section-title">Cosmic Alignment</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
        Each mindful moment reveals a part of your constellation today.
      </p>
      
      <div style={{ position: 'relative', height: '120px', width: '100%', background: 'var(--bg-panel)', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
        <svg fill="none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          {starsMap.map((star, i) => {
            const isActive = i < activeDotsCount;
            return (
              <circle 
                key={star.id} 
                cx={star.cx} 
                cy={star.cy} 
                r={star.r} 
                fill={isActive ? 'var(--moon-glow)' : 'var(--border-subtle)'}
                className={isActive ? 'animate-pulse-slow' : ''}
                style={{
                  transition: 'fill 1s ease-in-out, filter 1s ease-in-out',
                  filter: isActive ? 'blur(0.5px) drop-shadow(0 0 4px var(--star-glow))' : 'none'
                }}
              />
            );
          })}
          
          {/* Constellation Lines if enough are active */}
          {activeDotsCount >= 2 && (
            <line x1={20} y1={30} x2={50} y2={20} stroke="var(--border-subtle)" strokeWidth="0.5" />
          )}
          {activeDotsCount >= 4 && (
            <line x1={50} y1={20} x2={40} y2={60} stroke="var(--border-subtle)" strokeWidth="0.5" />
          )}
          {activeDotsCount >= 5 && (
            <line x1={40} y1={60} x2={70} y2={80} stroke="var(--border-subtle)" strokeWidth="0.5" />
          )}
        </svg>
      </div>
    </div>
  );
};

export default StarMapProgress;
