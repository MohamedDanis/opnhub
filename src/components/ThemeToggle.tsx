
"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as Theme || Theme.LIGHT;
    }
    return Theme.LIGHT;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === Theme.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded">
      {theme === Theme.LIGHT ? (
        <FontAwesomeIcon icon={faMoon} className="text-orange-800" size="2x" />
      ) : (
        <FontAwesomeIcon icon={faSun} className="text-yellow-500" size="2x"/>
      )}
    </button>
  );
};

export default ThemeToggle;
