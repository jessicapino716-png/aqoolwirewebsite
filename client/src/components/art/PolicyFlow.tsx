export function PolicyFlow() {
  return (
    <svg width="400" height="200" viewBox="0 0 400 200" className="mx-auto">
      {/* Document outlines */}
      <g opacity="0.4">
        <rect x="40" y="60" width="60" height="80" rx="4" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
        <line x1="50" y1="80" x2="80" y2="80" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="50" y1="90" x2="85" y2="90" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="50" y1="100" x2="75" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        
        <rect x="40" y="40" width="60" height="80" rx="4" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
        <line x1="50" y1="60" x2="80" y2="60" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="50" y1="70" x2="85" y2="70" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
      </g>
      
      {/* Flow lines */}
      <line x1="105" y1="90" x2="145" y2="90" stroke="#2BD4A7" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="145,90 141,87 141,93" fill="#2BD4A7" />
      
      {/* Shield */}
      <path
        d="M 175 60 L 195 60 C 195 60 200 65 200 75 L 200 95 C 200 110 185 120 185 120 C 185 120 170 110 170 95 L 170 75 C 170 65 175 60 175 60 Z"
        fill="#2BD4A7"
        fillOpacity="0.1"
        stroke="#2BD4A7"
        strokeWidth="1.5"
      />
      <path
        d="M 185 75 L 180 85 L 183 88 L 185 95 L 195 80"
        fill="none"
        stroke="#2BD4A7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Output arrows */}
      <line x1="205" y1="85" x2="235" y2="70" stroke="#2BD4A7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="205" y1="90" x2="235" y2="90" stroke="#2BD4A7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="205" y1="95" x2="235" y2="110" stroke="#2BD4A7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      
      {/* Output chips */}
      <rect x="240" y="60" width="120" height="24" rx="12" fill="hsl(var(--background))" stroke="#2BD4A7" strokeWidth="1.5" />
      <text x="300" y="77" textAnchor="middle" fill="#2BD4A7" fontSize="12">Residency</text>
      
      <rect x="240" y="88" width="120" height="24" rx="12" fill="hsl(var(--background))" stroke="#2BD4A7" strokeWidth="1.5" />
      <text x="300" y="105" textAnchor="middle" fill="#2BD4A7" fontSize="12">Licensing</text>
      
      <rect x="240" y="116" width="120" height="24" rx="12" fill="hsl(var(--background))" stroke="#2BD4A7" strokeWidth="1.5" />
      <text x="300" y="133" textAnchor="middle" fill="#2BD4A7" fontSize="12">Localisation</text>
    </svg>
  );
}
