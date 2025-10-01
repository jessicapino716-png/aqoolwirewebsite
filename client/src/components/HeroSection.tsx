import { Link } from "wouter";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
}

interface HeroSectionProps {
  popularArticles?: Article[];
}

export default function HeroSection({ popularArticles }: HeroSectionProps) {
  return (
    <div className="relative min-h-[60vh] md:min-h-screen text-black bg-white">
      {/* Left accent line - hidden on mobile */}
      <div className="absolute left-0 top-0 h-[90%] w-0.5 bg-gradient-to-b from-[#40E0D0] via-[#00ff88] to-[#90EE90] ml-[15px] mt-[30px] hidden md:block"></div>
      {/* Main content */}
      <div className="container mx-auto px-6 py-8 md:py-16 flex items-center min-h-[60vh] md:min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {/* Left side - Main headline */}
          <div className="lg:col-span-2">
            {/* Main headline - stacked vertically */}
            <h1 className="space-y-2 mb-8" data-testid="text-main-headline">
              <div className="text-5xl md:text-7xl lg:text-8xl font-black text-black leading-none tracking-tight">
                AI Policy.
              </div>
              <div className="text-5xl md:text-7xl lg:text-8xl font-black text-black leading-none tracking-tight">
                Regulation.
              </div>
              <div className="text-5xl md:text-7xl lg:text-8xl font-black text-black leading-none tracking-tight">
                Innovation.
              </div>
            </h1>

            {/* Tagline */}
            <div className="text-lg md:text-xl lg:text-2xl space-y-2" data-testid="text-tagline">
              <div className="font-medium text-[#3b82f6]">
                Straight from Riyadh
              </div>
              <div className="text-gray-700 max-w-2xl">The first platform delivering AI news, policy analysis and regulatory insights for the GCC's largest economy</div>
            </div>
          </div>

          {/* Right side - Most Popular */}
          <div className="lg:col-span-1 flex items-center">
            {popularArticles && popularArticles.length > 0 && (
              <div className="relative w-full bg-black rounded-lg border border-[#ff00ff] overflow-hidden shadow-[0_0_20px_rgba(255,0,255,0.4)]">
                {/* Neon accent bar at top */}
                <div className="h-1.5 bg-gradient-to-r from-[#ff00ff] via-[#ff1493] to-[#ff69b4]"></div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="font-black text-2xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] via-[#ff1493] to-[#ff69b4]" data-testid="text-hero-most-popular-title">
                    MOST POPULAR
                  </h3>

                  {/* Articles list */}
                  <div className="space-y-4">
                    {popularArticles
                      .slice(0, 3)
                      .map((article, index) => (
                        <Link 
                          key={article.id} 
                          href={`/${article.slug}`}
                        >
                          <div 
                            className="group flex items-start gap-4 p-3 rounded-md hover:bg-[#ff00ff]/10 transition-all duration-200 cursor-pointer border border-transparent hover:border-[#ff00ff]/50" 
                            data-testid={`item-hero-most-popular-${index}`}
                          >
                            {/* Number with neon glow */}
                            <div className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center bg-gradient-to-br from-[#ff00ff] to-[#ff1493] shadow-[0_0_10px_rgba(255,0,255,0.6)]">
                              <span className="text-sm font-black text-white">
                                {index + 1}
                              </span>
                            </div>

                            {/* Article info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-white group-hover:text-[#ff00ff] line-clamp-2 text-base leading-tight mb-2 transition-colors">
                                {article.title}
                              </h4>
                              <span className="inline-block text-xs font-semibold text-[#ff69b4] uppercase tracking-wider">
                                {article.category}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Neon bottom bar */}
                <div className="h-1.5 bg-gradient-to-r from-[#ff69b4] via-[#ff1493] to-[#ff00ff]"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}