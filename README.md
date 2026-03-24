# Attune 🌸

**Attune** is a self-help and health app for women, focused on menstrual cycle tracking and holistic wellness.

## Features

- **Dashboard** — At-a-glance view of your cycle phase, next period prediction, and today's mood
- **Cycle Tracker** — Log your period dates and get personalised cycle phase insights (Menstrual, Follicular, Ovulatory, Luteal)
- **Mood & Symptom Logger** — Track how you're feeling each day with mood ratings, symptom tags, and personal notes
- **Self-Care Hub** — Evidence-based wellness tips tailored to each phase of your cycle, plus guidance on when to seek medical advice

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [TailwindCSS](https://tailwindcss.com/) for styling
- [React Router](https://reactrouter.com/) for navigation
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) for tests
- `localStorage` for client-side data persistence (no server needed)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run all tests |
| `npm run lint` | Lint source files |

## Project Structure

```
src/
├── components/        # Shared UI components (NavBar, PhaseCard)
├── hooks/             # Custom React hooks (useCycleData, useMoodData)
├── pages/             # Page components (Dashboard, CycleTracker, MoodTracker, SelfCare)
├── test/              # Unit and component tests
└── utils/             # Pure utility functions (cycleUtils)
```
