export function HeroGraph() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-40" />
      
      <svg className="w-full h-full" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Saudi Arabia Map Outline - More accurate shape */}
        <g className="text-muted" opacity="0.15" strokeWidth="2.5">
          <path
            d="M 350,250 
               L 380,235 L 410,228 L 445,225 L 480,225 L 515,228 L 550,235 
               L 590,245 L 630,260 L 670,280 L 705,305 
               L 735,335 L 755,370 L 765,405 L 768,440 L 765,475 
               L 755,510 L 735,540 L 705,565 L 670,585 
               L 630,598 L 590,605 L 550,608 L 510,608 L 470,605 
               L 430,598 L 390,585 L 360,565 L 340,540 
               L 325,510 L 318,475 L 315,440 L 318,405 
               L 325,370 L 335,335 L 345,305 L 350,280 
               Q 345,265 350,250 Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Network nodes - Major cities positioned more accurately */}
        <g className="text-muted">
          {/* Riyadh (center-east) */}
          <circle cx="580" cy="420" r="6" fill="currentColor" opacity="0.8" />
          
          {/* Jeddah (west coast, middle) */}
          <circle cx="380" cy="450" r="5" fill="currentColor" opacity="0.7" />
          
          {/* Dammam (east coast) */}
          <circle cx="720" cy="380" r="5" fill="currentColor" opacity="0.7" />
          
          {/* NEOM (northwest coast) */}
          <circle cx="360" cy="320" r="5" fill="currentColor" opacity="0.7" />
          
          {/* Mecca (west, south of Jeddah) */}
          <circle cx="395" cy="480" r="4" fill="currentColor" opacity="0.6" />
          
          {/* Medina (west, north of Jeddah) */}
          <circle cx="400" cy="400" r="4" fill="currentColor" opacity="0.6" />
          
          {/* Tabuk (north) */}
          <circle cx="420" cy="300" r="4" fill="currentColor" opacity="0.6" />
          
          {/* Abha (southwest) */}
          <circle cx="410" cy="550" r="4" fill="currentColor" opacity="0.6" />
          
          {/* Jubail (east coast, industrial) */}
          <circle cx="700" cy="360" r="4" fill="currentColor" opacity="0.6" />
          
          {/* Khobar (east coast) */}
          <circle cx="730" cy="390" r="4" fill="currentColor" opacity="0.6" />
          
          {/* Yanbu (west coast) */}
          <circle cx="375" cy="380" r="3.5" fill="currentColor" opacity="0.5" />
          
          {/* Al-Ula (northwest interior) */}
          <circle cx="430" cy="350" r="3.5" fill="currentColor" opacity="0.5" />
          
          {/* Buraidah (north-central) */}
          <circle cx="520" cy="360" r="3.5" fill="currentColor" opacity="0.5" />
          
          {/* Hail (north-central) */}
          <circle cx="490" cy="330" r="3.5" fill="currentColor" opacity="0.5" />
          
          {/* Najran (south) */}
          <circle cx="460" cy="580" r="3.5" fill="currentColor" opacity="0.5" />
          
          {/* Jizan (southwest coast) */}
          <circle cx="420" cy="570" r="3.5" fill="currentColor" opacity="0.5" />
        </g>

        {/* Connecting lines - Network infrastructure */}
        <g className="text-muted" opacity="0.2" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round">
          {/* Riyadh as central hub */}
          <line x1="580" y1="420" x2="380" y2="450" /> {/* Riyadh-Jeddah */}
          <line x1="580" y1="420" x2="720" y2="380" /> {/* Riyadh-Dammam */}
          <line x1="580" y1="420" x2="360" y2="320" /> {/* Riyadh-NEOM */}
          <line x1="580" y1="420" x2="400" y2="400" /> {/* Riyadh-Medina */}
          <line x1="580" y1="420" x2="520" y2="360" /> {/* Riyadh-Buraidah */}
          <line x1="580" y1="420" x2="410" y2="550" /> {/* Riyadh-Abha */}
          
          {/* Western cities network */}
          <line x1="380" y1="450" x2="395" y2="480" /> {/* Jeddah-Mecca */}
          <line x1="380" y1="450" x2="400" y2="400" /> {/* Jeddah-Medina */}
          <line x1="380" y1="450" x2="375" y2="380" /> {/* Jeddah-Yanbu */}
          <line x1="400" y1="400" x2="375" y2="380" /> {/* Medina-Yanbu */}
          <line x1="360" y1="320" x2="420" y2="300" /> {/* NEOM-Tabuk */}
          
          {/* Eastern cities network */}
          <line x1="720" y1="380" x2="700" y2="360" /> {/* Dammam-Jubail */}
          <line x1="720" y1="380" x2="730" y2="390" /> {/* Dammam-Khobar */}
          
          {/* Northern connections */}
          <line x1="420" y1="300" x2="430" y2="350" /> {/* Tabuk-Al-Ula */}
          <line x1="430" y1="350" x2="490" y2="330" /> {/* Al-Ula-Hail */}
          <line x1="490" y1="330" x2="520" y2="360" /> {/* Hail-Buraidah */}
          
          {/* Southern connections */}
          <line x1="410" y1="550" x2="460" y2="580" /> {/* Abha-Najran */}
          <line x1="410" y1="550" x2="420" y2="570" /> {/* Abha-Jizan */}
        </g>

        {/* Accent pulse nodes - Key investment hubs */}
        <g className="text-accent">
          {/* Riyadh - Capital & Financial Hub */}
          <circle cx="580" cy="420" r="16" fill="url(#glow)" className="animate-pulse" style={{ animationDuration: '3s' }} />
          <circle cx="580" cy="420" r="6" fill="currentColor" />
          
          {/* NEOM - Future Megacity */}
          <circle cx="360" cy="320" r="14" fill="url(#glow)" className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.6s' }} />
          <circle cx="360" cy="320" r="5" fill="currentColor" />
          
          {/* Dammam - Eastern Province Industrial Hub */}
          <circle cx="720" cy="380" r="14" fill="url(#glow)" className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.2s' }} />
          <circle cx="720" cy="380" r="5" fill="currentColor" />
          
          {/* Jeddah - Red Sea Gateway */}
          <circle cx="380" cy="450" r="14" fill="url(#glow)" className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.8s' }} />
          <circle cx="380" cy="450" r="5" fill="currentColor" />
        </g>
        
        {/* Data flow animation paths */}
        <g opacity="0.15">
          <circle cx="580" cy="420" r="30" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="30;50;30" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}