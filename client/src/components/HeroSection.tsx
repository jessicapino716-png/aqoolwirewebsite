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
              <div className="bg-white p-6 rounded-lg border shadow-lg w-full">
                <h3 className="text-xl font-bold mb-6 text-[#ff007f]" data-testid="text-hero-most-popular-title">
                  Most Popular
                </h3>
                <div className="space-y-4">
                  {popularArticles
                    .slice(0, 3)
                    .map((article, index) => (
                      <div key={article.id} className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded transition-colors" data-testid={`item-hero-most-popular-${index}`}>
                        <div className="flex-shrink-0 w-6 h-6 text-white text-xs font-bold rounded-full flex items-center justify-center bg-[#030203]">
                          {index + 1}
                        </div>
                        <div>
                          <Link href={`/${article.slug}`} className="font-medium text-black hover:text-[#ff007f] line-clamp-2 text-[16px] leading-tight">
                            {article.title}
                          </Link>
                          <div className="text-xs text-gray-500 mt-1">{article.category}</div>
                        </div>
                      </div>
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