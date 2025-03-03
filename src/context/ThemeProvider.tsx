import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme: string | null = localStorage.getItem('theme');
  const [theme, setThemeState] = useState<'light' | 'dark'>(storedTheme ? (storedTheme as 'light' | 'dark') : 'light');

  useEffect(() => {
    console.log('Сохраняем тему:', theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  const colors = theme === 'light'
    ? {
        primaryColor: '#e6ccff', // Светло-сиреневый
        secondaryColor: '#f8f0fa', // Нежно-розовый
        tertiaryColor: '#ffffff', // Белый
        accentColor: '#d8b4fe', // Более насыщенный сиреневый
        textColor: '#333333', // Темно-серый для текста
      }
    : {
        primaryColor: '#7a4d8e', // Темно-сиреневый
        secondaryColor: '#5c3c6d', // Темно-розовый
        tertiaryColor: '#333333', // Темно-серый
        accentColor: '#6c2e8c', // Более насыщенный темно-сиреневый
        textColor: '#ffffff', // Белый для текста
      };

  const setTheme = (theme: 'light' | 'dark') => {
    setThemeState(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
