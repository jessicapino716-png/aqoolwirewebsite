import { Link } from "wouter";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  externalUrl?: string;
}

interface HeroSectionProps {
  popularArticles?: Article[];
}

export default function HeroSection({ popularArticles }: HeroSectionProps) {
  return (
    <div className="relative min-h-[60vh] md:min-h-screen text-black bg-white">
      {/* Left accent line - hidden on mobile */}
      <div className="absolute left-0 top-0 h-[90%] w-0.5 bg-gradient-to-b from-[#40E0D0] via-[#00ff88] to-[#90EE90] mt-[30px] hidden md:block ml-[7.5px] mr-[7.5px] pl-[13px] pr-[13px]"></div>
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
              <div className="w-full bg-white p-6">
                {/* Title */}
                <h3 className="font-black text-2xl text-[#6366f1] uppercase mb-8 tracking-wide" data-testid="text-hero-most-popular-title">
                  MOST POPULAR
                </h3>

                {/* Articles list */}
                <div className="space-y-0">
                  {popularArticles
                    .slice(0, 5)
                    .map((article, index) => {
                      const linkContent = (
                        <div 
                          className="group border-b border-black py-6 last:border-b-0 hover:opacity-70 transition-opacity cursor-pointer flex gap-4"
                          data-testid={`item-hero-most-popular-${index}`}
                        >
                          {/* Number */}
                          <div className="text-[#6366f1] font-black text-2xl flex-shrink-0">
                            {index + 1}
                          </div>

                          {/* Article title */}
                          <h4 className="font-bold text-black text-lg leading-tight">
                            {article.title}
                          </h4>
                        </div>
                      );

                      if (article.externalUrl) {
                        return (
                          <a 
                            key={article.id}
                            href={article.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {linkContent}
                          </a>
                        );
                      }

                      return (
                        <Link 
                          key={article.id} 
                          href={`/article/${article.slug}`}
                        >
                          {linkContent}
                        </Link>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}