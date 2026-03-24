import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn(key => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = String(value); }),
    removeItem: vi.fn(key => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

import Dashboard from '../pages/Dashboard';
import CycleTracker from '../pages/CycleTracker';
import MoodTracker from '../pages/MoodTracker';
import SelfCare from '../pages/SelfCare';

describe('Dashboard', () => {
  it('renders greeting and app name', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
    expect(screen.getByText(/Welcome to Attune/i)).toBeInTheDocument();
  });

  it('shows prompt to log first period when no cycles', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
    expect(screen.getByText(/Log your first period/i)).toBeInTheDocument();
  });

  it('shows default avg cycle length of 28 days', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
    expect(screen.getByText(/28 days/i)).toBeInTheDocument();
  });
});

describe('CycleTracker', () => {
  it('renders heading', () => {
    render(<MemoryRouter><CycleTracker /></MemoryRouter>);
    expect(screen.getByText(/Cycle Tracker/i)).toBeInTheDocument();
  });

  it('shows empty state when no cycles logged', () => {
    render(<MemoryRouter><CycleTracker /></MemoryRouter>);
    expect(screen.getByText(/No cycles logged yet/i)).toBeInTheDocument();
  });

  it('shows the log period form when button clicked', () => {
    render(<MemoryRouter><CycleTracker /></MemoryRouter>);
    fireEvent.click(screen.getByText(/\+ Log Period/i));
    expect(screen.getByLabelText(/Period start date/i)).toBeInTheDocument();
  });

  it('shows error when submitting form with no start date', () => {
    render(<MemoryRouter><CycleTracker /></MemoryRouter>);
    fireEvent.click(screen.getByText(/\+ Log Period/i));
    // Directly submit the form element using querySelector
    const form = document.querySelector('form');
    fireEvent.submit(form);
    expect(screen.getByRole('alert')).toHaveTextContent(/Please enter a start date/i);
  });
});

describe('MoodTracker', () => {
  it('renders heading', () => {
    render(<MemoryRouter><MoodTracker /></MemoryRouter>);
    expect(screen.getByText(/Mood & Symptoms/i)).toBeInTheDocument();
  });

  it('shows all mood options', () => {
    render(<MemoryRouter><MoodTracker /></MemoryRouter>);
    expect(screen.getByText('Great')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument();
    expect(screen.getByText('Okay')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('Anxious')).toBeInTheDocument();
  });

  it('shows empty state when no entries', () => {
    render(<MemoryRouter><MoodTracker /></MemoryRouter>);
    expect(screen.getByText(/No mood entries yet/i)).toBeInTheDocument();
  });

  it('save button is disabled when no mood selected', () => {
    render(<MemoryRouter><MoodTracker /></MemoryRouter>);
    const saveBtn = screen.getByRole('button', { name: /Save Entry/i });
    expect(saveBtn).toBeDisabled();
  });

  it('enables save button after selecting a mood', () => {
    render(<MemoryRouter><MoodTracker /></MemoryRouter>);
    fireEvent.click(screen.getByText('Great'));
    const saveBtn = screen.getByRole('button', { name: /Save Entry/i });
    expect(saveBtn).not.toBeDisabled();
  });
});

describe('SelfCare', () => {
  it('renders self-care heading', () => {
    render(<MemoryRouter><SelfCare /></MemoryRouter>);
    expect(screen.getByText(/Self-Care Hub/i)).toBeInTheDocument();
  });

  it('shows all phase categories', () => {
    render(<MemoryRouter><SelfCare /></MemoryRouter>);
    expect(screen.getByText('Menstrual Phase')).toBeInTheDocument();
    expect(screen.getByText('Follicular Phase')).toBeInTheDocument();
    expect(screen.getByText('Ovulatory Phase')).toBeInTheDocument();
    expect(screen.getByText('Luteal Phase')).toBeInTheDocument();
    expect(screen.getByText('Mental Wellbeing')).toBeInTheDocument();
  });

  it('shows when to see a doctor section', () => {
    render(<MemoryRouter><SelfCare /></MemoryRouter>);
    expect(screen.getByText(/When to See a Doctor/i)).toBeInTheDocument();
  });
});
