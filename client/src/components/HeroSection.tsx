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
              <div className="relative w-full bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                {/* Accent gradient bar at top */}
                <div className="h-1 bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#93c5fd]"></div>
                
                {/* Content */}
                <div className="p-8">
                  {/* Title with icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-2xl text-gray-900" data-testid="text-hero-most-popular-title">
                      Most Popular
                    </h3>
                  </div>

                  {/* Articles list */}
                  <div className="space-y-5">
                    {popularArticles
                      .slice(0, 3)
                      .map((article, index) => (
                        <Link 
                          key={article.id} 
                          href={`/${article.slug}`}
                        >
                          <div 
                            className="group flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200" 
                            data-testid={`item-hero-most-popular-${index}`}
                          >
                            {/* Number badge */}
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-[#3b82f6] group-hover:to-[#2563eb] transition-all duration-200">
                              <span className="text-sm font-bold text-gray-700 group-hover:text-white transition-colors">
                                {index + 1}
                              </span>
                            </div>

                            {/* Article info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 group-hover:text-[#3b82f6] line-clamp-2 text-sm leading-snug mb-1 transition-colors">
                                {article.title}
                              </h4>
                              <span className="inline-block text-xs font-medium text-gray-500 uppercase tracking-wide">
                                {article.category}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Bottom decorative element */}
                <div className="h-1 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}