interface StatTileProps {
  value: string;
  label: string;
  hint?: string;
}

export function StatTile({ value, label, hint }: StatTileProps) {
  return (
    <div className="bg-card border border-card-border rounded-lg p-8 relative overflow-hidden">
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
          className="text-[#2BD4A7]"
        />
        <circle cx="200" cy="25" r="3" fill="currentColor" className="text-[#2BD4A7]" />
      </svg>
      
      <div className="relative z-10">
        <div className="text-3xl font-bold mb-2 tabular-nums">{value}</div>
        <div className="text-muted-foreground">{label}</div>
        {hint && <div className="text-muted-foreground text-sm mt-1">{hint}</div>}
      </div>
    </div>
  );
}
