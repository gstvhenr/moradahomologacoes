'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return {
    theme,
    mounted,
    toggleTheme,
  };
}
