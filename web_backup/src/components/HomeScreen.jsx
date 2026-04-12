import React, { useState, useEffect } from 'react';
import { getPrivateData, updateSettings, addCycle } from '../services/PrivateStorage';
import { predictNextCycle } from '../services/LocalPredictor';
import { FiTrendingUp, FiActivity, FiCpu, FiCalendar, FiPlus } from 'react-icons/fi';
import '../App.css'; // inherit glasses panel and animations

const HomeScreen = ({ onSettingsChange }) => {
  const [data, setData] = useState(null);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  
  // New entry state
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  // ML Prediction state
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const rawData = getPrivateData();
    setData(rawData);
    setCycleLength(rawData.settings.averageCycleLength);
    setPeriodLength(rawData.settings.averagePeriodLength);
  }, []);

  useEffect(() => {
    if (data && data.cycles) {
      predictNextCycle(data.cycles).then(res => setPrediction(res));
    }
  }, [data]);

  const handleSave = () => {
    const newData = updateSettings({ 
      averageCycleLength: Number(cycleLength) || 28, 
      averagePeriodLength: Number(periodLength) || 5 
    });
    setData(newData);
    if (onSettingsChange) onSettingsChange(newData);
  };

  const handleLogCycle = () => {
    if (newStartDate && newEndDate) {
      const newData = addCycle(newStartDate, newEndDate);
      setData(newData);
      setNewStartDate('');
      setNewEndDate('');
      if (onSettingsChange) onSettingsChange(newData);
    }
  };

  if (!data) return null;

  const totalCycles = data.cycles.length;
  const totalLogs = data.logs ? Object.keys(data.logs).length : 0;

  return (
    <div className="home-screen fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      
      <div className="glass-panel fade-in" style={{ animationDelay: '0.1s' }}>
        <h3 className="section-title">
          <FiActivity /> Statistics
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '24px 0 8px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', color: 'var(--moon-glow)' }}>{totalCycles}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Cycles</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', color: 'var(--moon-glow)' }}>{totalLogs}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Vibes Logged</div>
          </div>
        </div>
      </div>

      {/* AI Oracle View */}
      {prediction && (
        <div className="glass-panel fade-in" style={{ animationDelay: '0.15s', borderColor: prediction.isML ? 'var(--moon-glow)' : 'var(--border-subtle)' }}>
          <h3 className="section-title text-gradient">
            <FiCpu /> AI Oracle Prediction
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px 0 8px' }}>
             <div style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                Next Period: <strong style={{ color: 'var(--moon-glow)', marginLeft: '8px' }}>
                  {prediction.nextPeriod.toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}
                </strong>
             </div>
             <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Estimated Length: {prediction.estimatedLength} days
             </div>
             <div style={{ fontSize: '0.8rem', marginTop: '12px', padding: '4px 12px', borderRadius: '12px', backgroundColor: prediction.isML ? 'rgba(253, 245, 201, 0.1)' : 'var(--bg-dark)', color: prediction.isML ? 'var(--moon-glow)' : 'var(--text-muted)' }}>
                {prediction.isML ? '✨ Powered by Local ML' : '📊 Based on Average (Log more cycles for AI)'}
             </div>
          </div>
        </div>
      )}

      {/* Log Cycle View */}
      <div className="glass-panel fade-in" style={{ animationDelay: '0.2s' }}>
        <h3 className="section-title">
          <FiCalendar /> Log Past Cycle
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Enter past cycles to train your local AI predictor. Enter chronologically.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>Start Date</label>
            <input 
              type="date" 
              value={newStartDate}
              onChange={(e) => setNewStartDate(e.target.value)}
              style={{
                padding: '8px', borderRadius: '8px', 
                background: 'var(--bg-dark)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)', fontSize: '0.9rem'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>End Date</label>
            <input 
              type="date" 
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
              style={{
                padding: '8px', borderRadius: '8px', 
                background: 'var(--bg-dark)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)', fontSize: '0.9rem'
              }}
            />
          </div>
          <button 
            onClick={handleLogCycle}
            disabled={!newStartDate || !newEndDate}
            style={{
              marginTop: '8px',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: newStartDate && newEndDate ? 'var(--bg-panel-hover)' : 'var(--bg-dark)',
              color: newStartDate && newEndDate ? 'var(--moon-glow)' : 'var(--text-muted)',
              border: `1px solid ${newStartDate && newEndDate ? 'var(--moon-glow)' : 'var(--border-subtle)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s'
            }}
          >
            <FiPlus /> Log Cycle
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div className="glass-panel fade-in" style={{ animationDelay: '0.3s' }}>
        <h3 className="section-title">
          <FiTrendingUp /> Rhythm Settings
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ color: 'var(--text-primary)' }}>Average Cycle Length</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="number" 
                value={cycleLength} 
                onChange={(e) => setCycleLength(e.target.value)}
                onBlur={handleSave}
                style={{
                  width: '60px', padding: '8px', borderRadius: '8px', 
                  background: 'var(--bg-dark)', border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)', textAlign: 'center'
                }}
              />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>days</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ color: 'var(--text-primary)' }}>Average Period Length</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="number" 
                value={periodLength} 
                onChange={(e) => setPeriodLength(e.target.value)}
                onBlur={handleSave}
                style={{
                  width: '60px', padding: '8px', borderRadius: '8px', 
                  background: 'var(--bg-dark)', border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)', textAlign: 'center'
                }}
              />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>days</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomeScreen;
