import { Link } from "wouter";

export interface PopularArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
}

interface MostPopularProps {
  articles: PopularArticle[];
  className?: string;
}

export default function MostPopular({ articles, className = "" }: MostPopularProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className={`bg-gray-50 p-6 rounded-lg border ${className}`} data-testid="section-most-popular">
      <h2 className="text-2xl font-bold mb-6 text-[#D7FD51]" data-testid="text-most-popular-title">
        Most Popular
      </h2>
      
      {/* Horizontal list for desktop, stacked for mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.slice(0, 3).map((article, index) => (
          <div 
            key={article.id} 
            className="flex items-start space-x-3 hover:bg-white p-3 rounded-lg transition-colors border border-transparent hover:border-gray-200" 
            data-testid={`item-most-popular-${index}`}
          >
            <div className="flex-shrink-0 w-8 h-8 text-white text-sm font-bold rounded-full flex items-center justify-center bg-[#3b82f6]">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <Link 
                href={`/article/${article.slug}`} 
                className="font-medium text-black hover:text-[#3b82f6] line-clamp-2 text-base leading-snug block"
                data-testid={`link-most-popular-${index}`}
              >
                {article.title}
              </Link>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide" data-testid={`text-category-${index}`}>
                {article.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}