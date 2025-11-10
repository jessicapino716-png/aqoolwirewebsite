import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, hover = true, className = '', ...props }: CardProps) {
  const hoverStyles = hover 
    ? 'hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300' 
    : '';

  return (
    <div
      className={`bg-surface border border-border rounded-[16px] p-8 ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
