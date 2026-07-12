import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <label className="theme-switch" title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
      <input 
        type="checkbox" 
        checked={theme === 'dark'} 
        onChange={handleToggle}
        aria-label="Toggle theme"
      />
      <span className="slider round">
        <span className="slider-icon light-sun">
          <Sun size={12} strokeWidth={2.5} />
        </span>
        <span className="slider-icon dark-moon">
          <Moon size={12} strokeWidth={2.5} />
        </span>
        <span className="slider-thumb"></span>
      </span>
    </label>
  );
}
