export function ArchitectureLayers() {
  return (
    <svg width="500" height="280" viewBox="0 0 500 280" className="mx-auto">
      {/* Layers */}
      <g opacity="0.8">
        {/* Data layer */}
        <rect x="50" y="200" width="120" height="50" rx="8" fill="var(--color-surface)" stroke="var(--color-text-muted)" strokeWidth="1.5" />
        <text x="110" y="230" textAnchor="middle" fill="var(--color-text-muted)" fontSize="14">Data</text>
        
        {/* Models layer */}
        <rect x="50" y="130" width="120" height="50" rx="8" fill="var(--color-surface)" stroke="var(--color-text-muted)" strokeWidth="1.5" />
        <text x="110" y="160" textAnchor="middle" fill="var(--color-text-muted)" fontSize="14">Models</text>
        
        {/* Ops layer */}
        <rect x="50" y="60" width="120" height="50" rx="8" fill="var(--color-surface)" stroke="var(--color-text-muted)" strokeWidth="1.5" />
        <text x="110" y="90" textAnchor="middle" fill="var(--color-text-muted)" fontSize="14">Ops</text>
        
        {/* ROI layer */}
        <rect x="50" y="10" width="120" height="30" rx="8" fill="var(--color-accent)" fillOpacity="0.2" stroke="var(--color-accent)" strokeWidth="1.5" />
        <text x="110" y="30" textAnchor="middle" fill="var(--color-accent)" fontSize="14">ROI</text>
      </g>
      
      {/* Connecting lines */}
      <line x1="110" y1="200" x2="110" y2="180" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="110" y1="130" x2="110" y2="110" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="110" y1="60" x2="110" y2="40" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      
      {/* KPI dots rising */}
      <g className="text-accent">
        {/* Data level */}
        <circle cx="220" cy="225" r="4" fill="currentColor" opacity="0.4" />
        <circle cx="260" cy="225" r="4" fill="currentColor" opacity="0.4" />
        <circle cx="300" cy="225" r="4" fill="currentColor" opacity="0.4" />
        
        {/* Models level */}
        <circle cx="220" cy="155" r="5" fill="currentColor" opacity="0.6" />
        <circle cx="260" cy="155" r="5" fill="currentColor" opacity="0.6" />
        <circle cx="300" cy="155" r="5" fill="currentColor" opacity="0.6" />
        
        {/* Ops level */}
        <circle cx="220" cy="85" r="6" fill="currentColor" opacity="0.8" />
        <circle cx="260" cy="85" r="6" fill="currentColor" opacity="0.8" />
        <circle cx="300" cy="85" r="6" fill="currentColor" opacity="0.8" />
        
        {/* ROI level */}
        <circle cx="220" cy="25" r="7" fill="currentColor">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="260" cy="25" r="7" fill="currentColor">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" begin="0.3s" />
        </circle>
        <circle cx="300" cy="25" r="7" fill="currentColor">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </circle>
      </g>
      
      {/* Rising path lines */}
      <g opacity="0.3" stroke="var(--color-accent)" strokeWidth="1" fill="none" strokeLinecap="round">
        <polyline points="220,225 220,155 220,85 220,25" />
        <polyline points="260,225 260,155 260,85 260,25" />
        <polyline points="300,225 300,155 300,85 300,25" />
      </g>
    </svg>
  );
}
