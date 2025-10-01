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
      <div className="absolute left-0 top-0 h-[90%] w-0.5 bg-gradient-to-b from-[#40E0D0] via-[#00ff88] to-[#90EE90] mt-[30px] hidden md:block ml-[7.5px] mr-[7.5px] pl-[6px] pr-[6px]"></div>
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
              <div className="w-full bg-[#1a1a1a] p-6 rounded-none">
                {/* Title */}
                <div className="border-l-4 border-[#f2007d] pl-4 mb-6">
                  <h3 className="font-black text-3xl text-white uppercase" data-testid="text-hero-most-popular-title">
                    popular news
                  </h3>
                </div>

                {/* Articles list */}
                <div className="space-y-6">
                  {popularArticles
                    .slice(0, 3)
                    .map((article, index) => (
                      <Link 
                        key={article.id} 
                        href={`/${article.slug}`}
                      >
                        <div 
                          className="group border-b border-gray-700 pb-5 last:border-b-0 hover:border-[#f2007d] transition-colors cursor-pointer"
                          data-testid={`item-hero-most-popular-${index}`}
                        >
                          {/* Category tag */}
                          <div className="mb-3">
                            <span className="bg-[#f2007d] text-white text-xs font-black px-3 py-1 uppercase">
                              {article.category}
                            </span>
                          </div>

                          {/* Article title */}
                          <h4 className="font-bold text-white group-hover:text-[#f2007d] text-xl leading-tight transition-colors">
                            {article.title}
                          </h4>
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