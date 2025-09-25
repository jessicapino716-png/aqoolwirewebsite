import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { useTheme } from '@/contexts/ThemeContext';

export default function ScrollProgressLine() {
  const { percentage, direction } = useScrollProgress();
  const { colorPalette } = useTheme();

  return (
    <div 
      className="scroll-progress-container fixed left-0 top-0 z-50 w-1 h-full pointer-events-none"
      data-testid="scroll-progress-container"
      aria-hidden="true"
    >
      {/* Background track */}
      <div 
        className="absolute inset-0 bg-gray-200 dark:bg-gray-800 opacity-30"
        data-testid="scroll-progress-track"
      />
      
      {/* Progress indicator */}
      <div
        className="scroll-progress-indicator absolute top-0 left-0 w-full origin-top transition-all duration-75 ease-out"
        style={{
          height: `${percentage}%`,
          background: colorPalette.wireGradient,
          boxShadow: `
            0 0 8px ${colorPalette.primary}40,
            0 0 12px ${colorPalette.accent}30,
            inset 0 0 4px rgba(255, 255, 255, 0.2)
          `
        }}
        data-testid="scroll-progress-indicator"
      />
      
      {/* Animated tip for scroll direction */}
      {percentage > 0 && percentage < 100 && (
        <div
          className="scroll-progress-tip absolute w-2 h-2 rounded-full transition-all duration-150 ease-out"
          style={{
            top: `${percentage}%`,
            left: '-2px',
            background: direction === 'down' ? colorPalette.accent : colorPalette.primary,
            boxShadow: `0 0 6px ${direction === 'down' ? colorPalette.accent : colorPalette.primary}80`,
            transform: 'translateY(-50%)',
          }}
          data-testid="scroll-progress-tip"
        />
      )}
      
    </div>
  );
}