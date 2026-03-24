import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/cycle', label: 'Cycle', icon: '🌙' },
  { to: '/mood', label: 'Mood', icon: '💜' },
  { to: '/selfcare', label: 'Self-Care', icon: '🌸' },
];

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 shadow-lg z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors min-w-[60px] ${
                isActive
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-400 hover:text-pink-400'
              }`
            }
          >
            <span className="text-xl">{icon}</span>
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
