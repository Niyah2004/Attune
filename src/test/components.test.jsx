import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PhaseCard from '../components/PhaseCard';
import NavBar from '../components/NavBar';

describe('PhaseCard', () => {
  it('renders nothing when phase is null', () => {
    const { container } = render(<PhaseCard phase={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('displays phase name and day', () => {
    const phase = { phase: 'Menstrual', day: 2, description: 'Rest and be gentle with yourself.' };
    render(<PhaseCard phase={phase} />);
    expect(screen.getByText(/Menstrual Phase · Day 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Rest and be gentle/i)).toBeInTheDocument();
  });

  it('renders Follicular phase correctly', () => {
    const phase = { phase: 'Follicular', day: 8, description: 'Energy is building.' };
    render(<PhaseCard phase={phase} />);
    expect(screen.getByText(/Follicular Phase · Day 8/i)).toBeInTheDocument();
  });
});

describe('NavBar', () => {
  it('renders all navigation items', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Cycle')).toBeInTheDocument();
    expect(screen.getByText('Mood')).toBeInTheDocument();
    expect(screen.getByText('Self-Care')).toBeInTheDocument();
  });
});
