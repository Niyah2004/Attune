import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import CycleTracker from './pages/CycleTracker';
import MoodTracker from './pages/MoodTracker';
import SelfCare from './pages/SelfCare';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-pink-50/30">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cycle" element={<CycleTracker />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/selfcare" element={<SelfCare />} />
        </Routes>
        <NavBar />
      </div>
    </BrowserRouter>
  );
}
