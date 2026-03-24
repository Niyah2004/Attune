import React from 'react';
import { useState } from 'react';
import { useMoodData, MOODS, SYMPTOMS } from '../hooks/useMoodData';
import { formatDate } from '../utils/cycleUtils';

export default function MoodTracker() {
  const { entries, addEntry, removeEntry } = useMoodData();
  const today = new Date().toISOString().split('T')[0];

  const [selectedMood, setSelectedMood] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(today);
  const [saved, setSaved] = useState(false);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) return;
    addEntry(date, selectedMood, selectedSymptoms, notes);
    setSelectedMood('');
    setSelectedSymptoms([]);
    setNotes('');
    setDate(today);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">💜 Mood & Symptoms</h1>
        <p className="text-gray-500 text-sm mt-1">Log how you&apos;re feeling today</p>
      </div>

      {/* Log Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-purple-100 rounded-2xl p-5 mb-6 shadow-sm">
        {saved && (
          <div role="status" className="text-green-700 text-sm bg-green-50 rounded-lg px-3 py-2 mb-4">
            ✓ Mood logged successfully!
          </div>
        )}

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="moodDate">Date</label>
          <input
            id="moodDate"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            max={today}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* Mood selector */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-2">How are you feeling? <span className="text-pink-500">*</span></p>
          <div className="flex gap-2 flex-wrap">
            {MOODS.map(mood => (
              <button
                key={mood.value}
                type="button"
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center px-3 py-2 rounded-xl border transition-all ${
                  selectedMood === mood.value
                    ? 'border-purple-400 bg-purple-50 scale-105'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs text-gray-600 mt-0.5">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-2">Symptoms (optional)</p>
          <div className="flex flex-wrap gap-2">
            {SYMPTOMS.map(symptom => (
              <button
                key={symptom}
                type="button"
                onClick={() => toggleSymptom(symptom)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  selectedSymptoms.includes(symptom)
                    ? 'bg-pink-100 border-pink-300 text-pink-700 font-medium'
                    : 'border-gray-200 text-gray-500 hover:border-pink-200'
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="moodNotes">
            Notes <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="moodNotes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="How was your day? Any thoughts to capture..."
            rows={3}
            maxLength={500}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!selectedMood}
          className="w-full py-2.5 bg-purple-500 hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
        >
          Save Entry
        </button>
      </form>

      {/* History */}
      <div>
        <h2 className="font-semibold text-gray-700 mb-3">Recent Entries</h2>
        {entries.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <span className="text-4xl">📝</span>
            <p className="mt-2 text-sm">No mood entries yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.slice(0, 30).map(entry => {
              const moodObj = MOODS.find(m => m.value === entry.mood);
              return (
                <div key={entry.id} className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{moodObj?.emoji}</span>
                      <div>
                        <span className="font-medium text-gray-700 text-sm">{moodObj?.label}</span>
                        <p className="text-xs text-gray-400">{formatDate(entry.date)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeEntry(entry.id)}
                      aria-label="Delete entry"
                      className="text-gray-300 hover:text-red-400 transition-colors text-lg"
                    >
                      ×
                    </button>
                  </div>
                  {entry.symptoms && entry.symptoms.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {entry.symptoms.map(s => (
                        <span key={s} className="text-xs bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                  )}
                  {entry.notes && (
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{entry.notes}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
