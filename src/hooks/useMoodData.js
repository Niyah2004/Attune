import { useState, useEffect } from 'react';

const STORAGE_KEY = 'attune_moods';

export const MOODS = [
  { value: 'great', label: 'Great', emoji: '😄' },
  { value: 'good', label: 'Good', emoji: '🙂' },
  { value: 'okay', label: 'Okay', emoji: '😐' },
  { value: 'low', label: 'Low', emoji: '😔' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' },
];

export const SYMPTOMS = [
  'Cramps', 'Bloating', 'Headache', 'Fatigue', 'Breast tenderness',
  'Mood swings', 'Acne', 'Back pain', 'Nausea', 'Insomnia',
];

export function useMoodData() {
  const [entries, setEntries] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = (date, mood, symptoms, notes) => {
    const newEntry = { id: Date.now(), date, mood, symptoms, notes };
    setEntries(prev => {
      const filtered = prev.filter(e => e.date !== date);
      return [newEntry, ...filtered].sort((a, b) => b.date.localeCompare(a.date));
    });
  };

  const removeEntry = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const getTodayEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    return entries.find(e => e.date === today) || null;
  };

  return { entries, addEntry, removeEntry, getTodayEntry };
}
