import { createContext, useContext } from 'react';

interface ThemeContextProps {
  theme: 'light' | 'dark';
  colors: {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    accentColor: string;
    textColor: string;
  };
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeContext, useTheme };
