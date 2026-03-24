import React from 'react';
import { Link } from 'react-router-dom';
import { useCycleData } from '../hooks/useCycleData';
import { useMoodData, MOODS } from '../hooks/useMoodData';
import { predictNextPeriod, getCyclePhase, getAvgCycleLength, formatDate, daysUntil } from '../utils/cycleUtils';
import PhaseCard from '../components/PhaseCard';

export default function Dashboard() {
  const { cycles } = useCycleData();
  const { getTodayEntry } = useMoodData();

  const latestCycle = cycles.length > 0
    ? [...cycles].sort((a, b) => new Date(b.start) - new Date(a.start))[0]
    : null;

  const avgCycleLength = getAvgCycleLength(cycles);
  const phase = latestCycle ? getCyclePhase(latestCycle.start, avgCycleLength) : null;
  const nextPeriod = predictNextPeriod(cycles, avgCycleLength);
  const daysToNext = daysUntil(nextPeriod);
  const todayMood = getTodayEntry();
  const todayMoodObj = MOODS.find(m => m.value === todayMood?.mood);

  const today = new Date();
  const greeting = today.getHours() < 12 ? 'Good morning' : today.getHours() < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm">{greeting}</p>
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Attune 🌸</h1>
        <p className="text-gray-500 text-sm mt-1">Your personal wellness companion</p>
      </div>

      {/* Cycle Phase */}
      {phase ? (
        <div className="mb-4">
          <PhaseCard phase={phase} />
        </div>
      ) : (
        <div className="mb-4 rounded-2xl border border-pink-200 bg-pink-50 p-4">
          <p className="text-sm text-pink-700">
            👋 Start tracking your cycle to see personalised insights.
          </p>
          <Link to="/cycle" className="text-sm font-semibold text-pink-600 underline mt-1 inline-block">
            Log your first period →
          </Link>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-2xl border border-pink-100 p-4 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Next period</p>
          {nextPeriod ? (
            <>
              <p className="text-lg font-bold text-pink-600">
                {daysToNext !== null && daysToNext >= 0 ? `${daysToNext}d` : 'Today!'}
              </p>
              <p className="text-xs text-gray-400">{formatDate(nextPeriod)}</p>
            </>
          ) : (
            <p className="text-sm text-gray-400">—</p>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-purple-100 p-4 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Avg cycle</p>
          <p className="text-lg font-bold text-purple-600">{avgCycleLength} days</p>
          <p className="text-xs text-gray-400">{cycles.length} cycle{cycles.length !== 1 ? 's' : ''} logged</p>
        </div>
      </div>

      {/* Today's Mood */}
      <div className="bg-white rounded-2xl border border-lavender-100 p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">Today&apos;s mood</p>
            {todayMoodObj ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{todayMoodObj.emoji}</span>
                <span className="font-semibold text-gray-700">{todayMoodObj.label}</span>
              </div>
            ) : (
              <p className="text-sm text-gray-400">Not logged yet</p>
            )}
          </div>
          <Link to="/mood" className="text-sm font-semibold text-purple-500 hover:text-purple-700">
            {todayMoodObj ? 'Update →' : 'Log →'}
          </Link>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/cycle"
          className="bg-gradient-to-br from-pink-400 to-rose-500 text-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="text-2xl">🌙</span>
          <p className="font-semibold mt-2">Cycle Tracker</p>
          <p className="text-xs opacity-80">Log & predict periods</p>
        </Link>
        <Link
          to="/selfcare"
          className="bg-gradient-to-br from-purple-400 to-violet-500 text-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="text-2xl">🌸</span>
          <p className="font-semibold mt-2">Self-Care</p>
          <p className="text-xs opacity-80">Tips & resources</p>
        </Link>
      </div>
    </div>
  );
}
