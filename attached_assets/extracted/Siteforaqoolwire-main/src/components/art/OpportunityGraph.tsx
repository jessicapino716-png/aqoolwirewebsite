export function OpportunityGraph() {
  return (
    <svg width="600" height="300" viewBox="0 0 600 300" className="mx-auto">
      {/* Three columns */}
      <g opacity="0.4">
        {/* Policy column */}
        <rect x="40" y="60" width="120" height="180" rx="12" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeDasharray="4,4" />
        <text x="100" y="45" textAnchor="middle" fill="var(--color-text-muted)" fontSize="14">Policy</text>
        
        {/* Capital column */}
        <rect x="240" y="60" width="120" height="180" rx="12" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeDasharray="4,4" />
        <text x="300" y="45" textAnchor="middle" fill="var(--color-text-muted)" fontSize="14">Capital</text>
        
        {/* Operations column */}
        <rect x="440" y="60" width="120" height="180" rx="12" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeDasharray="4,4" />
        <text x="500" y="45" textAnchor="middle" fill="var(--color-text-muted)" fontSize="14">Operations</text>
      </g>
      
      {/* Nodes */}
      <g className="text-muted">
        {/* Policy nodes */}
        <circle cx="100" cy="100" r="6" fill="currentColor" />
        <circle cx="100" cy="150" r="6" fill="currentColor" />
        <circle cx="100" cy="200" r="6" fill="currentColor" />
        
        {/* Capital nodes */}
        <circle cx="300" cy="110" r="6" fill="currentColor" />
        <circle cx="300" cy="160" r="6" fill="currentColor" />
        <circle cx="300" cy="210" r="6" fill="currentColor" />
        
        {/* Operations nodes */}
        <circle cx="500" cy="120" r="6" fill="currentColor" />
        <circle cx="500" cy="170" r="6" fill="currentColor" />
        <circle cx="500" cy="220" r="6" fill="currentColor" />
      </g>
      
      {/* Connecting lines */}
      <g opacity="0.3" stroke="var(--color-text-muted)" strokeWidth="1.5" fill="none">
        <line x1="106" y1="100" x2="294" y2="110" />
        <line x1="106" y1="150" x2="294" y2="160" />
        <line x1="106" y1="200" x2="294" y2="210" />
        
        <line x1="306" y1="110" x2="494" y2="120" />
        <line x1="306" y1="160" x2="494" y2="170" />
        <line x1="306" y1="210" x2="494" y2="220" />
        
        <line x1="106" y1="150" x2="294" y2="110" />
        <line x1="306" y1="160" x2="494" y2="120" />
      </g>
      
      {/* Highlighted nodes */}
      <g className="text-accent">
        <circle cx="100" cy="150" r="10" fill="currentColor" fillOpacity="0.2">
          <animate attributeName="r" values="10;14;10" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="150" r="6" fill="currentColor" />
        
        <circle cx="300" cy="160" r="10" fill="currentColor" fillOpacity="0.2">
          <animate attributeName="r" values="10;14;10" dur="3s" repeatCount="indefinite" begin="0.5s" />
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        <circle cx="300" cy="160" r="6" fill="currentColor" />
        
        <circle cx="500" cy="170" r="10" fill="currentColor" fillOpacity="0.2">
          <animate attributeName="r" values="10;14;10" dur="3s" repeatCount="indefinite" begin="1s" />
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle cx="500" cy="170" r="6" fill="currentColor" />
      </g>
    </svg>
  );
}
