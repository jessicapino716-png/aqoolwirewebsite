import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Palette, Moon, Sun } from "lucide-react";
import { useTheme, AccentColor } from "@/contexts/ThemeContext";

const accentOptions: { value: AccentColor; label: string; color: string }[] = [
  { value: 'wire', label: 'Wire', color: '#4ECDC4' },
  { value: 'emerald', label: 'Emerald', color: '#10b981' },
  { value: 'aqua', label: 'Aqua', color: '#06b6d4' },
  { value: 'royal', label: 'Royal', color: '#6366f1' },
  { value: 'sunset', label: 'Sunset', color: '#f59e0b' }
];

export default function ThemeControls() {
  const { accentColor, setAccentColor, isDarkMode, toggleDarkMode, colorPalette } = useTheme();

  return (
    <></>
  );
}