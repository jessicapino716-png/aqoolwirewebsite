export function SignalScanningVignette() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
      <defs>
        <radialGradient id="radarGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#2BD4A7" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2BD4A7" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Radar arc */}
      <circle cx="60" cy="60" r="40" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.3" />
      <circle cx="60" cy="60" r="25" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.3" />
      
      {/* Radar sweep line */}
      <line x1="60" y1="60" x2="90" y2="35" stroke="#2BD4A7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      
      {/* Ping */}
      <circle cx="90" cy="35" r="4" fill="#2BD4A7">
        <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="90" cy="35" r="2" fill="#2BD4A7" />
    </svg>
  );
}

export function OperationalMappingVignette() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
      <g transform="translate(-10, 20)">
        {/* Announcement */}
        <rect x="10" y="15" width="30" height="40" rx="8" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.4" />
        <line x1="18" y1="25" x2="32" y2="25" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
        <line x1="18" y1="32" x2="32" y2="32" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
        
        {/* Arrow */}
        <line x1="45" y1="35" x2="60" y2="35" stroke="#2BD4A7" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="60,35 56,32 56,38" fill="#2BD4A7" />
        
        {/* Capability blocks */}
        <rect x="70" y="10" width="25" height="15" rx="4" fill="#2BD4A7" opacity="0.2" stroke="#2BD4A7" strokeWidth="1.5" />
        <rect x="70" y="30" width="25" height="15" rx="4" fill="#2BD4A7" opacity="0.2" stroke="#2BD4A7" strokeWidth="1.5" />
        <rect x="70" y="50" width="25" height="15" rx="4" fill="#2BD4A7" opacity="0.2" stroke="#2BD4A7" strokeWidth="1.5" />
        
        {/* Timeline */}
        <line x1="105" y1="35" x2="130" y2="35" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="110" cy="35" r="2" fill="hsl(var(--muted-foreground))" />
        <circle cx="120" cy="35" r="2" fill="hsl(var(--muted-foreground))" />
        <circle cx="130" cy="35" r="3" fill="#2BD4A7" />
      </g>
    </svg>
  );
}

export function ExecutionTimingVignette() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
      {/* Cycle ring */}
      <circle cx="60" cy="60" r="35" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.3" />
      
      {/* Highlighted window arc */}
      <path
        d="M 85 35 A 35 35 0 0 1 85 85"
        fill="none"
        stroke="#2BD4A7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Window markers */}
      <circle cx="85" cy="35" r="4" fill="#2BD4A7" />
      <circle cx="85" cy="85" r="4" fill="#2BD4A7" />
      
      {/* Center dot */}
      <circle cx="60" cy="60" r="3" fill="hsl(var(--muted-foreground))" />
      
      {/* Tick marks */}
      <line x1="60" y1="20" x2="60" y2="25" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.3" />
      <line x1="95" y1="60" x2="100" y2="60" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.3" />
      <line x1="60" y1="95" x2="60" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.3" />
      <line x1="20" y1="60" x2="25" y2="60" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}
