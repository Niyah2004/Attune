import { useState, useEffect } from 'react';

const STORAGE_KEY = 'attune_cycles';

export function useCycleData() {
  const [cycles, setCycles] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cycles));
  }, [cycles]);

  const addCycle = (start, end) => {
    const newCycle = { id: Date.now(), start, end };
    setCycles(prev => [newCycle, ...prev]);
  };

  const removeCycle = (id) => {
    setCycles(prev => prev.filter(c => c.id !== id));
  };

  return { cycles, addCycle, removeCycle };
}
