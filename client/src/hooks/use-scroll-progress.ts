import { useState, useEffect } from 'react';

interface ScrollProgress {
  percentage: number;
  direction: 'up' | 'down' | 'static';
  isAtTop: boolean;
  isAtBottom: boolean;
}

export function useScrollProgress(): ScrollProgress {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    percentage: 0,
    direction: 'static',
    isAtTop: true,
    isAtBottom: false,
  });

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let rafId: number;
    let isThrottled = false;

    const updateScrollProgress = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (documentHeight <= 0) {
        setScrollProgress({
          percentage: 0,
          direction: 'static',
          isAtTop: true,
          isAtBottom: false,
        });
        return;
      }

      const percentage = Math.min(Math.max((currentScrollY / documentHeight) * 100, 0), 100);
      
      let direction: 'up' | 'down' | 'static' = 'static';
      if (currentScrollY > previousScrollY) {
        direction = 'down';
      } else if (currentScrollY < previousScrollY) {
        direction = 'up';
      }

      const isAtTop = currentScrollY <= 10;
      const isAtBottom = currentScrollY >= documentHeight - 10;

      setScrollProgress({
        percentage,
        direction,
        isAtTop,
        isAtBottom,
      });

      previousScrollY = currentScrollY;
      isThrottled = false;
    };

    const handleScroll = () => {
      if (isThrottled) return;
      
      isThrottled = true;
      rafId = requestAnimationFrame(updateScrollProgress);
    };

    // Initial calculation
    updateScrollProgress();

    // Add passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return scrollProgress;
}