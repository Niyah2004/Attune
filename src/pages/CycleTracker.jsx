import React from 'react';
import { useState } from 'react';
import { useCycleData } from '../hooks/useCycleData';
import { predictNextPeriod, getAvgCycleLength, getCyclePhase, formatDate, daysUntil } from '../utils/cycleUtils';
import PhaseCard from '../components/PhaseCard';

export default function CycleTracker() {
  const { cycles, addCycle, removeCycle } = useCycleData();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const avgCycleLength = getAvgCycleLength(cycles);
  const sortedCycles = [...cycles].sort((a, b) => new Date(b.start) - new Date(a.start));
  const latestCycle = sortedCycles[0] || null;
  const phase = latestCycle ? getCyclePhase(latestCycle.start, avgCycleLength) : null;
  const nextPeriod = predictNextPeriod(cycles, avgCycleLength);
  const daysToNext = daysUntil(nextPeriod);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!startDate) { setError('Please enter a start date.'); return; }
    if (endDate && endDate < startDate) { setError('End date cannot be before start date.'); return; }
    addCycle(startDate, endDate || null);
    setStartDate('');
    setEndDate('');
    setShowForm(false);
  };

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🌙 Cycle Tracker</h1>
        <p className="text-gray-500 text-sm mt-1">Track your period and understand your cycle</p>
      </div>

      {/* Phase card */}
      {phase && (
        <div className="mb-4">
          <PhaseCard phase={phase} />
        </div>
      )}

      {/* Next Period Card */}
      {nextPeriod && (
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-2xl p-4 mb-4">
          <p className="text-sm text-pink-600 font-medium">Predicted next period</p>
          <p className="text-xl font-bold text-pink-700 mt-1">{formatDate(nextPeriod)}</p>
          <p className="text-xs text-pink-500 mt-0.5">
            {daysToNext !== null
              ? daysToNext === 0
                ? 'Today!'
                : daysToNext > 0
                ? `In ${daysToNext} day${daysToNext !== 1 ? 's' : ''}`
                : `${Math.abs(daysToNext)} day${Math.abs(daysToNext) !== 1 ? 's' : ''} ago`
              : ''}
          </p>
          <p className="text-xs text-gray-400 mt-1">Based on avg {avgCycleLength}-day cycle</p>
        </div>
      )}

      {/* Log Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full mb-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-2xl shadow hover:shadow-md transition-all"
      >
        {showForm ? 'Cancel' : '+ Log Period'}
      </button>

      {/* Log Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-pink-100 rounded-2xl p-5 mb-4 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">Log Period</h2>
          {error && (
            <div role="alert" className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2 mb-3">
              {error}
            </div>
          )}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="startDate">
              Period start date <span className="text-pink-500">*</span>
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="endDate">
              Period end date <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              min={startDate}
              max={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl transition-colors"
          >
            Save
          </button>
        </form>
      )}

      {/* History */}
      <div>
        <h2 className="font-semibold text-gray-700 mb-3">Period History</h2>
        {sortedCycles.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <span className="text-4xl">📅</span>
            <p className="mt-2 text-sm">No cycles logged yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedCycles.map((cycle, i) => (
              <div
                key={cycle.id}
                className="bg-white border border-pink-100 rounded-2xl p-4 flex items-center justify-between shadow-sm"
              >
                <div>
                  {i === 0 && (
                    <span className="text-xs bg-pink-100 text-pink-600 font-medium px-2 py-0.5 rounded-full mr-2">Latest</span>
                  )}
                  <p className="font-medium text-gray-700 text-sm mt-1">
                    {formatDate(cycle.start)}
                    {cycle.end && ` → ${formatDate(cycle.end)}`}
                  </p>
                  {cycle.start && cycle.end && (
                    <p className="text-xs text-gray-400">
                      {Math.round((new Date(cycle.end) - new Date(cycle.start)) / (1000 * 60 * 60 * 24) + 1)} days
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeCycle(cycle.id)}
                  aria-label="Delete cycle"
                  className="text-gray-300 hover:text-red-400 transition-colors text-lg ml-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
