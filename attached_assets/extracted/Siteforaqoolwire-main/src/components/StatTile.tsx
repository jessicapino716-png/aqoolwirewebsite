interface StatTileProps {
  value: string;
  label: string;
  hint?: string;
}

export function StatTile({ value, label, hint }: StatTileProps) {
  return (
    <div className="bg-surface border border-border rounded-[16px] p-8 relative overflow-hidden">
      {/* Sparkline background */}
      <svg 
        className="absolute bottom-0 right-0 w-full h-16 opacity-20" 
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
      >
        <polyline
          points="0,45 40,38 80,42 120,30 160,35 200,25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent"
        />
        <circle cx="200" cy="25" r="3" fill="currentColor" className="text-accent" />
      </svg>
      
      <div className="relative z-10">
        <div className="stat-value mb-2">{value}</div>
        <div className="text-muted">{label}</div>
        {hint && <div className="text-muted text-sm mt-1">{hint}</div>}
      </div>
    </div>
  );
}
