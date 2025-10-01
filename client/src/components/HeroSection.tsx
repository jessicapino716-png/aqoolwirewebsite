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
              <div className="w-full space-y-3">
                {/* Title bar */}
                <div className="bg-[#FF4500] px-6 py-4 rounded-lg">
                  <h3 className="font-black text-2xl text-white uppercase tracking-tight" data-testid="text-hero-most-popular-title">
                    Trending Now
                  </h3>
                </div>

                {/* Articles list */}
                <div className="space-y-3">
                  {popularArticles
                    .slice(0, 3)
                    .map((article, index) => (
                      <Link 
                        key={article.id} 
                        href={`/${article.slug}`}
                      >
                        <div 
                          className="group bg-white hover:bg-gray-50 p-5 rounded-lg transition-colors cursor-pointer"
                          data-testid={`item-hero-most-popular-${index}`}
                        >
                          <div className="flex items-start gap-4">
                            {/* Large number */}
                            <div className="flex-shrink-0">
                              <span className="text-5xl font-black text-[#FF4500] leading-none">
                                {index + 1}
                              </span>
                            </div>

                            {/* Article info */}
                            <div className="flex-1 min-w-0 pt-1">
                              <h4 className="font-bold text-black group-hover:text-[#FF4500] line-clamp-2 text-lg leading-tight mb-2 transition-colors">
                                {article.title}
                              </h4>
                              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold uppercase rounded-full">
                                {article.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}