import React, { useState, useEffect } from 'react';
import MoonPhaseDial from './components/MoonPhaseDial';
import DailyVibeCheck from './components/DailyVibeCheck';
import StarMapProgress from './components/StarMapProgress';
import LofiAudioPlayer from './components/LofiAudioPlayer';
import CalendarOverview from './components/CalendarOverview';
import HomeScreen from './components/HomeScreen';
import { getPrivateData, logDailyVibe, addCycle } from './services/PrivateStorage';
import { predictNextCycle } from './services/LocalPredictor';
import { FiHome, FiSettings } from 'react-icons/fi';
import './App.css';

function App() {
  const [cycleDay, setCycleDay] = useState(1);
  const [cycleData, setCycleData] = useState(null);
  const [activeDotsCount, setActiveDotsCount] = useState(0);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    // Initialize data
    const data = getPrivateData();
    setCycleData(data);
    
    // Default mock cycle day based on local time difference from a past date
    // In a real app we'd fetch the latest cycle start date. 
    // Creating a mock cycle for demonstration:
    if (!data.cycles.length) {
      const mockStartDate = new Date();
      mockStartDate.setDate(mockStartDate.getDate() - 14); // pretend day 14
      setCycleDay(14);
    } else {
       // logic to set actual day
       const lastStart = new Date(data.cycles[data.cycles.length - 1].startDate);
       const diffTime = Math.abs(new Date() - lastStart);
       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
       setCycleDay(diffDays);
    }
    
    // Simulate training prediction
    // predictNextCycle(data.cycles).then(prediction => console.log('Prediction:', prediction));
  }, []);

  const handleLogVibe = (payload) => {
    // payload: { mood, habits }
    const today = new Date().toISOString().split('T')[0];
    logDailyVibe(today, payload);
    // Increase active dot count based on habits selected
    setActiveDotsCount(payload.habits.length);
  };

  const handleAddCycle = (start, end) => {
    const newData = addCycle(start, end);
    setCycleData(newData);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Attune</h1>
        <div className="header-actions">
          <LofiAudioPlayer />
          <button 
            className="icon-button"
            onClick={() => setCurrentView(currentView === 'dashboard' ? 'home' : 'dashboard')}
            aria-label="Toggle View"
          >
            {currentView === 'dashboard' ? <FiSettings /> : <FiHome />}
          </button>
        </div>
      </header>
      
      <main>
        {currentView === 'dashboard' ? (
          <>
            <MoonPhaseDial cycleDay={cycleDay} cycleLength={cycleData?.settings?.averageCycleLength || 28} />
            <StarMapProgress activeDotsCount={activeDotsCount} />
            <DailyVibeCheck onLogVibe={handleLogVibe} />
            <CalendarOverview 
              cycleLogs={cycleData?.logs} 
              cycles={cycleData?.cycles || []} 
              onAddCycle={handleAddCycle}
            />
          </>
        ) : (
          <HomeScreen onSettingsChange={(newData) => setCycleData(newData)} />
        )}
      </main>
    </div>
  );
}

export default App;
