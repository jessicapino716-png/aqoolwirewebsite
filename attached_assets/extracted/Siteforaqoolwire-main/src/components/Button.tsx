import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'lg' | 'md' | 'sm';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 transition-all duration-200 rounded-[12px]';
    
    const variants = {
      solid: 'bg-accent text-background hover:bg-accent/90',
      outline: 'border border-border text-text hover:border-accent/50 hover:text-accent',
      ghost: 'text-muted hover:text-text hover:bg-surface',
    };

    const sizes = {
      lg: 'px-8 py-4 min-h-[56px]',
      md: 'px-6 py-3 min-h-[44px]',
      sm: 'px-4 py-2 min-h-[36px]',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
