import { describe, it, expect } from 'vitest';
import {
  predictNextPeriod,
  getAvgCycleLength,
  getCyclePhase,
  formatDate,
  daysUntil,
} from '../utils/cycleUtils';

describe('predictNextPeriod', () => {
  it('returns null when no cycles', () => {
    expect(predictNextPeriod([])).toBeNull();
  });

  it('uses default 28-day cycle length with one entry', () => {
    const cycles = [{ start: '2025-01-01', end: '2025-01-05' }];
    const result = predictNextPeriod(cycles);
    expect(result).toBe('2025-01-29');
  });

  it('calculates average cycle length from multiple entries', () => {
    const cycles = [
      { start: '2025-03-01', end: '2025-03-05' },
      { start: '2025-02-01', end: '2025-02-05' },
    ];
    const result = predictNextPeriod(cycles);
    // 2025-03-01 + 28 days = 2025-03-29
    expect(result).toBe('2025-03-29');
  });

  it('uses actual cycle length when given two cycles 30 days apart', () => {
    // diff = 30 days, so next = 2025-02-01 + 30 = 2025-03-03
    const cyclesValid = [
      { start: '2025-02-01', end: null },
      { start: '2025-01-02', end: null },
    ];
    const result = predictNextPeriod(cyclesValid);
    expect(result).toBe('2025-03-03');
  });
});

describe('getAvgCycleLength', () => {
  it('returns 28 with no cycles', () => {
    expect(getAvgCycleLength([])).toBe(28);
  });

  it('returns 28 with only one cycle', () => {
    expect(getAvgCycleLength([{ start: '2025-01-01' }])).toBe(28);
  });

  it('calculates correctly for two cycles 30 days apart', () => {
    const cycles = [
      { start: '2025-02-01' },
      { start: '2025-01-02' },
    ];
    expect(getAvgCycleLength(cycles)).toBe(30);
  });
});

describe('getCyclePhase', () => {
  it('returns null with no start date', () => {
    expect(getCyclePhase(null)).toBeNull();
  });

  it('returns Menstrual phase on day 1', () => {
    const today = new Date().toISOString().split('T')[0];
    const phase = getCyclePhase(today);
    expect(phase.phase).toBe('Menstrual');
    expect(phase.day).toBe(1);
  });

  it('returns Follicular phase on day 8', () => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    const start = d.toISOString().split('T')[0];
    const phase = getCyclePhase(start, 28);
    expect(phase.phase).toBe('Follicular');
  });

  it('returns Ovulatory phase around mid cycle', () => {
    const d = new Date();
    d.setDate(d.getDate() - 14);
    const start = d.toISOString().split('T')[0];
    const phase = getCyclePhase(start, 28);
    expect(phase.phase).toBe('Ovulatory');
  });

  it('returns Luteal phase late in cycle', () => {
    const d = new Date();
    d.setDate(d.getDate() - 22);
    const start = d.toISOString().split('T')[0];
    const phase = getCyclePhase(start, 28);
    expect(phase.phase).toBe('Luteal');
  });
});

describe('formatDate', () => {
  it('returns empty string for falsy input', () => {
    expect(formatDate('')).toBe('');
    expect(formatDate(null)).toBe('');
  });

  it('formats a known date', () => {
    const result = formatDate('2025-06-15');
    expect(result).toContain('June');
    expect(result).toContain('15');
    expect(result).toContain('2025');
  });
});

describe('daysUntil', () => {
  it('returns null for no date', () => {
    expect(daysUntil(null)).toBeNull();
  });

  it('returns 0 for today', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(daysUntil(today)).toBe(0);
  });

  it('returns positive number for future date', () => {
    const future = new Date();
    future.setDate(future.getDate() + 7);
    const dateStr = future.toISOString().split('T')[0];
    expect(daysUntil(dateStr)).toBe(7);
  });

  it('returns negative number for past date', () => {
    const past = new Date();
    past.setDate(past.getDate() - 3);
    const dateStr = past.toISOString().split('T')[0];
    expect(daysUntil(dateStr)).toBe(-3);
  });
});
