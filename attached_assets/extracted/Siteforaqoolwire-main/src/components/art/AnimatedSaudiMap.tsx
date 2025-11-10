export function AnimatedSaudiMap() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Subtle radial gradient mesh background */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(circle at 30% 40%, rgba(43, 212, 167, 0.02) 0%, transparent 50%),
          radial-gradient(circle at 70% 50%, rgba(141, 211, 255, 0.02) 0%, transparent 50%)
        `
      }} />
      
      <svg
        width="1200"
        height="900"
        viewBox="0 0 1200 900"
        className="w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Gradient for connections */}
          <linearGradient id="connectionGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8DD3FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2BD4A7" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="connectionGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2BD4A7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8DD3FF" stopOpacity="0.5" />
          </linearGradient>

          {/* Refined animations */}
          <style>
            {`
              @keyframes pulse {
                0%, 100% { opacity: 0.4; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.05); }
              }
              
              @keyframes flow {
                0% { stroke-dashoffset: 100; opacity: 0; }
                25% { opacity: 0.4; }
                75% { opacity: 0.4; }
                100% { stroke-dashoffset: 0; opacity: 0; }
              }

              @keyframes particleFloat {
                0%, 100% { transform: translate(0, 0); opacity: 0.15; }
                50% { transform: translate(2px, -2px); opacity: 0.35; }
              }

              .node {
                animation: pulse 5s ease-in-out infinite;
                transform-origin: center;
              }
              
              .node:nth-child(1) { animation-delay: 0s; }
              .node:nth-child(2) { animation-delay: 0.7s; }
              .node:nth-child(3) { animation-delay: 1.4s; }
              .node:nth-child(4) { animation-delay: 2.1s; }
              .node:nth-child(5) { animation-delay: 2.8s; }
              .node:nth-child(6) { animation-delay: 3.5s; }
              .node:nth-child(7) { animation-delay: 4.2s; }
              .node:nth-child(8) { animation-delay: 0.5s; }
              .node:nth-child(9) { animation-delay: 1.2s; }
              .node:nth-child(10) { animation-delay: 1.9s; }
              .node:nth-child(11) { animation-delay: 2.6s; }
              .node:nth-child(12) { animation-delay: 3.3s; }
              
              .connection {
                stroke-dasharray: 100;
                stroke-dashoffset: 100;
                animation: flow 6s ease-in-out infinite;
              }
              
              .connection:nth-child(1) { animation-delay: 0s; }
              .connection:nth-child(2) { animation-delay: 0.8s; }
              .connection:nth-child(3) { animation-delay: 1.6s; }
              .connection:nth-child(4) { animation-delay: 2.4s; }
              .connection:nth-child(5) { animation-delay: 3.2s; }
              .connection:nth-child(6) { animation-delay: 4s; }
              .connection:nth-child(7) { animation-delay: 4.8s; }
              .connection:nth-child(8) { animation-delay: 0.4s; }
              .connection:nth-child(9) { animation-delay: 1.2s; }
              .connection:nth-child(10) { animation-delay: 2s; }
              .connection:nth-child(11) { animation-delay: 2.8s; }
              .connection:nth-child(12) { animation-delay: 3.6s; }
              .connection:nth-child(13) { animation-delay: 4.4s; }
              .connection:nth-child(14) { animation-delay: 5.2s; }
              .connection:nth-child(15) { animation-delay: 1s; }
              .connection:nth-child(16) { animation-delay: 1.8s; }
              .connection:nth-child(17) { animation-delay: 2.6s; }
              .connection:nth-child(18) { animation-delay: 3.4s; }

              .particle {
                animation: particleFloat 5s ease-in-out infinite;
              }
            `}
          </style>
        </defs>

        {/* Strategic Network Connections - Purposeful, balanced coverage */}
        <g className="connections">
          {/* Primary horizontal connections - spanning left to right */}
          <line className="connection" x1="150" y1="300" x2="600" y2="400" stroke="url(#connectionGradient1)" strokeWidth="1.5" />
          <line className="connection" x1="600" y1="400" x2="1050" y2="450" stroke="url(#connectionGradient2)" strokeWidth="1.5" />
          <line className="connection" x1="200" y1="600" x2="650" y2="650" stroke="url(#connectionGradient1)" strokeWidth="1.5" />
          <line className="connection" x1="650" y1="650" x2="1000" y2="600" stroke="url(#connectionGradient2)" strokeWidth="1.5" />
          
          {/* Vertical connections - spanning top to bottom */}
          <line className="connection" x1="300" y1="150" x2="350" y2="450" stroke="url(#connectionGradient1)" strokeWidth="1.5" />
          <line className="connection" x1="350" y1="450" x2="300" y2="750" stroke="url(#connectionGradient2)" strokeWidth="1.5" />
          <line className="connection" x1="900" y1="200" x2="850" y2="500" stroke="url(#connectionGradient1)" strokeWidth="1.5" />
          <line className="connection" x1="850" y1="500" x2="900" y2="750" stroke="url(#connectionGradient2)" strokeWidth="1.5" />
          
          {/* Diagonal connections - creating depth */}
          <line className="connection" x1="150" y1="300" x2="350" y2="450" stroke="url(#connectionGradient1)" strokeWidth="1.5" />
          <line className="connection" x1="300" y1="150" x2="600" y2="400" stroke="url(#connectionGradient2)" strokeWidth="1.5" />
          <line className="connection" x1="600" y1="400" x2="900" y2="200" stroke="url(#connectionGradient1)" strokeWidth="1.5" />
          <line className="connection" x1="300" y1="750" x2="650" y2="650" stroke="url(#connectionGradient2)" strokeWidth="1.5" />
          <line className="connection" x1="650" y1="650" x2="900" y2="750" stroke="url(#connectionGradient1)" strokeWidth="1.5" />
          <line className="connection" x1="1050" y1="450" x2="850" y2="500" stroke="url(#connectionGradient2)" strokeWidth="1.5" />
          
          {/* Central hub connections - creating focal point */}
          <line className="connection" x1="350" y1="450" x2="600" y2="400" stroke="url(#connectionGradient1)" strokeWidth="1.5" />
          <line className="connection" x1="600" y1="400" x2="850" y2="500" stroke="url(#connectionGradient2)" strokeWidth="1.5" />
          <line className="connection" x1="600" y1="400" x2="650" y2="650" stroke="url(#connectionGradient1)" strokeWidth="1.5" />
          <line className="connection" x1="1000" y1="600" x2="850" y2="500" stroke="url(#connectionGradient2)" strokeWidth="1.5" />
        </g>

        {/* Strategic Network Nodes - Rule of thirds placement */}
        <g className="nodes" filter="url(#glow)">
          {/* Primary nodes - creating visual anchors */}
          <circle className="node" cx="600" cy="400" r="9" fill="#2BD4A7" />
          
          {/* Corner region nodes */}
          <circle className="node" cx="150" cy="300" r="7" fill="#8DD3FF" />
          <circle className="node" cx="300" cy="150" r="7" fill="#2BD4A7" />
          <circle className="node" cx="900" cy="200" r="7" fill="#8DD3FF" />
          <circle className="node" cx="1050" cy="450" r="7" fill="#2BD4A7" />
          <circle className="node" cx="1000" cy="600" r="7" fill="#8DD3FF" />
          <circle className="node" cx="900" cy="750" r="7" fill="#2BD4A7" />
          <circle className="node" cx="300" cy="750" r="7" fill="#8DD3FF" />
          <circle className="node" cx="200" cy="600" r="7" fill="#2BD4A7" />
          
          {/* Secondary nodes - supporting structure */}
          <circle className="node" cx="350" cy="450" r="6" fill="#8DD3FF" />
          <circle className="node" cx="650" cy="650" r="6" fill="#2BD4A7" />
          <circle className="node" cx="850" cy="500" r="6" fill="#8DD3FF" />
        </g>

        {/* Minimal particles - accent only */}
        <g className="particles">
          <circle className="particle" cx="475" cy="320" r="2.5" fill="#2BD4A7">
            <animate attributeName="opacity" values="0.15;0.3;0.15" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle className="particle" cx="720" cy="480" r="2.5" fill="#8DD3FF">
            <animate attributeName="opacity" values="0.15;0.3;0.15" dur="3.5s" repeatCount="indefinite" begin="0.7s" />
          </circle>
          <circle className="particle" cx="530" cy="570" r="2.5" fill="#2BD4A7">
            <animate attributeName="opacity" values="0.15;0.3;0.15" dur="4s" repeatCount="indefinite" begin="1.2s" />
          </circle>
          <circle className="particle" cx="280" cy="380" r="2.5" fill="#8DD3FF">
            <animate attributeName="opacity" values="0.15;0.3;0.15" dur="3.8s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle className="particle" cx="820" cy="340" r="2.5" fill="#2BD4A7">
            <animate attributeName="opacity" values="0.15;0.3;0.15" dur="4.2s" repeatCount="indefinite" begin="1.5s" />
          </circle>
          <circle className="particle" cx="420" cy="680" r="2.5" fill="#8DD3FF">
            <animate attributeName="opacity" values="0.15;0.3;0.15" dur="3.3s" repeatCount="indefinite" begin="0.9s" />
          </circle>
        </g>
      </svg>
    </div>
  );
}