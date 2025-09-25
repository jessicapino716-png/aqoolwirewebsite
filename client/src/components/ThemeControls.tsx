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
    <>
      {/* Dark Mode Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        className="relative"
        data-testid="button-dark-mode-toggle"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>

      {/* Color Theme Selector */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            data-testid="button-theme-selector"
            aria-label="Change color theme"
          >
            <Palette className="h-4 w-4" />
            <div
              className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
              style={{ backgroundColor: colorPalette.primary }}
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="end">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm" data-testid="text-theme-title">Color Theme</h4>
              <p className="text-xs text-muted-foreground" data-testid="text-theme-description">
                Choose your preferred color accent for the interface and scroll indicator
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {accentOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={accentColor === option.value ? "default" : "outline"}
                  className="h-auto p-3 flex flex-col items-center gap-2 hover-elevate"
                  onClick={() => setAccentColor(option.value)}
                  data-testid={`button-accent-${option.value}`}
                >
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ 
                      background: option.value === 'wire' 
                        ? 'linear-gradient(45deg, #4ECDC4 0%, #39ff14 100%)'
                        : option.color
                    }}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium">{option.label}</span>
                  {accentColor === option.value && (
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      Active
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            <div className="pt-3 border-t">
              <div className="space-y-2">
                <h5 className="font-medium text-xs text-muted-foreground">Preview</h5>
                <div className="flex items-center gap-2">
                  <div
                    className="w-12 h-3 rounded-full"
                    style={{ background: colorPalette.wireGradient }}
                    aria-hidden="true"
                  />
                  <span className="text-xs text-muted-foreground">Scroll indicator</span>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}