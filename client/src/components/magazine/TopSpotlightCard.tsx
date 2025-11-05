import { Link } from "wouter";
import saudiMapBg from "@assets/stock_images/saudi_arabia_kingdom_4d3db69a.jpg";

interface TopSpotlightCardProps {
  kicker: string;
  title: string;
  href: string;
  showMapBackground?: boolean;
}

export function TopSpotlightCard({ kicker, title, href, showMapBackground = false }: TopSpotlightCardProps) {
  return (
    <Link href={href} data-testid={`link-spotlight-${kicker.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="group relative h-[280px] overflow-hidden rounded-md glass-card hover-elevate cursor-pointer">
        {/* Background: Saudi Arabia Map or Dark Gradient */}
        {showMapBackground ? (
          <>
            <img 
              src={saudiMapBg} 
              alt="Saudi Arabia map background"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1b]/80 via-[#0a0f1b]/70 to-[#050a12]/95" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1b] to-[#050a12]" />
        )}

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6">
          {/* Kicker */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-[#00e5ff]/20 border border-[#00e5ff]/40 rounded text-[#00e5ff] text-xs font-semibold uppercase tracking-wider">
              {kicker}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-[#00e5ff] transition-colors leading-tight">
            {title}
          </h3>
        </div>

        {/* Cyan glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none cyan-glow" />
      </div>
    </Link>
  );
}
