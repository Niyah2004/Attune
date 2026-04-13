import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export const lightColors = {
  background: '#dad6d3',
  card: '#faf8f5',
  cardAlt: '#fcf3e3',
  border: '#12101a',
  text: '#12101a',
  textMuted: '#8b80a6',
  accent: '#12101a',
  highlight: '#e0dad6', 
  shadow: '#12101a',
};

export const darkColors = {
  background: '#12101a',
  card: '#1a1725',
  cardAlt: '#211e2f',
  border: '#2d263f',
  text: '#fdf5c9',
  textMuted: '#8b80a6',
  accent: '#fdf5c9',
  highlight: '#2d263f',
  shadow: '#fdf5c9', // or transparent depending on if we want glowing borders
};

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const systemPrefersDark = useColorScheme() === 'dark';
  const [isDark, setIsDark] = useState(systemPrefersDark);

  const toggleTheme = () => setIsDark(prev => !prev);
  const setTheme = (dark: boolean) => setIsDark(dark);

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
