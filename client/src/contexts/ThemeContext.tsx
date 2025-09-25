import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AccentColor = 'emerald' | 'aqua' | 'royal' | 'wire' | 'sunset';

interface ColorPalette {
  name: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  gradient: string;
  wireGradient: string;
}

const colorPalettes: Record<AccentColor, ColorPalette> = {
  emerald: {
    name: 'Emerald',
    primary: '#10b981',
    primaryHover: '#059669',
    secondary: '#a7f3d0',
    accent: '#065f46',
    gradient: 'linear-gradient(90deg, #10b981 0%, #059669 50%, #047857 100%)',
    wireGradient: 'linear-gradient(180deg, #10b981 0%, #059669 30%, #047857 70%, #065f46 100%)'
  },
  aqua: {
    name: 'Aqua',
    primary: '#06b6d4',
    primaryHover: '#0891b2',
    secondary: '#a5f3fc',
    accent: '#164e63',
    gradient: 'linear-gradient(90deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)',
    wireGradient: 'linear-gradient(180deg, #06b6d4 0%, #0891b2 30%, #0e7490 70%, #164e63 100%)'
  },
  royal: {
    name: 'Royal',
    primary: '#6366f1',
    primaryHover: '#5b21b6',
    secondary: '#c7d2fe',
    accent: '#312e81',
    gradient: 'linear-gradient(90deg, #6366f1 0%, #5b21b6 50%, #4c1d95 100%)',
    wireGradient: 'linear-gradient(180deg, #6366f1 0%, #5b21b6 30%, #4c1d95 70%, #312e81 100%)'
  },
  wire: {
    name: 'Wire',
    primary: '#4ECDC4',
    primaryHover: '#5FBDAB',
    secondary: '#a7f3d0',
    accent: '#39ff14',
    gradient: 'linear-gradient(90deg, #4ECDC4 0%, #5FBDAB 50%, #39ff14 100%)',
    wireGradient: 'linear-gradient(180deg, #4ECDC4 0%, #5FBDAB 30%, #39ff14 70%, #2dd4bf 100%)'
  },
  sunset: {
    name: 'Sunset',
    primary: '#f59e0b',
    primaryHover: '#d97706',
    secondary: '#fef3c7',
    accent: '#92400e',
    gradient: 'linear-gradient(90deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
    wireGradient: 'linear-gradient(180deg, #f59e0b 0%, #d97706 30%, #b45309 70%, #92400e 100%)'
  }
};

interface ThemeContextType {
  accentColor: AccentColor;
  colorPalette: ColorPalette;
  setAccentColor: (color: AccentColor) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [accentColor, setAccentColorState] = useState<AccentColor>('wire');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load theme preferences from localStorage
    const storedAccent = localStorage.getItem('theme_accent') as AccentColor;
    const storedDarkMode = localStorage.getItem('theme_dark') === 'true';
    
    if (storedAccent && colorPalettes[storedAccent]) {
      setAccentColorState(storedAccent);
    }
    
    setIsDarkMode(storedDarkMode);
    
    // Apply initial dark mode class
    if (storedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Update CSS custom properties when accent color changes
    const palette = colorPalettes[accentColor];
    const root = document.documentElement;
    
    root.style.setProperty('--theme-primary', palette.primary);
    root.style.setProperty('--theme-primary-hover', palette.primaryHover);
    root.style.setProperty('--theme-secondary', palette.secondary);
    root.style.setProperty('--theme-accent', palette.accent);
    root.style.setProperty('--theme-gradient', palette.gradient);
    root.style.setProperty('--theme-wire-gradient', palette.wireGradient);
    
    // Update the --primary CSS variable used by shadcn components
    const hslPrimary = hexToHsl(palette.primary);
    root.style.setProperty('--primary', hslPrimary);
  }, [accentColor]);

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem('theme_accent', color);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('theme_dark', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const colorPalette = colorPalettes[accentColor];

  return (
    <ThemeContext.Provider value={{
      accentColor,
      colorPalette,
      setAccentColor,
      isDarkMode,
      toggleDarkMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Helper function to convert hex to HSL format for CSS variables
function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}