import ArticleCard from "@/components/ArticleCard";
import HeroSection from "@/components/HeroSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Content } from "@shared/schema";

// Fallback images for articles without images
import heroImage from '@assets/generated_images/AI_policy_hero_image_e5e8bfa6.png';
import thumbnailImage from '@assets/generated_images/AI_regulation_news_thumbnail_f02ad3d3.png';

// Helper function to format published date
const formatPublishedDate = (publishedAt: string) => {
  const date = new Date(publishedAt);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return "Just now";
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  }
};

// Transform database content to article format expected by ArticleCard
const transformContentToArticle = (content: Content) => ({
  id: content.id,
  title: content.title,
  excerpt: content.excerpt,
  author: content.authorName,
  publishedAt: formatPublishedDate(content.publishedAt.toString()),
  category: content.category,
  imageUrl: content.imageUrl || thumbnailImage,
  slug: content.slug,
  comments: content.commentsCount,
  source: content.source || undefined,
  externalUrl: content.externalUrl || undefined,
});

export default function Home() {
  // Fetch all articles from the API
  const { data: articles, isLoading, error } = useQuery<Content[]>({
    queryKey: ['/api/content'],
    queryFn: async () => {
      const response = await fetch('/api/content');
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      return response.json();
    },
  });

  // Fetch popular articles from the API
  const { data: popularArticles } = useQuery<Content[]>({
    queryKey: ['/api/content', 'popular'],
    queryFn: async () => {
      const response = await fetch('/api/content?popular=true');
      if (!response.ok) {
        throw new Error('Failed to fetch popular articles');
      }
      return response.json();
    },
  });

  // Transform articles for display
  const transformedArticles = articles?.map(transformContentToArticle) || [];
  
  // Get hero article (first article)
  const heroArticle = transformedArticles[0];
  
  // Get featured articles for mosaic tiles (show at least 1, max 2)
  const featuredArticles = transformedArticles.slice(1, Math.min(3, transformedArticles.length));
  
  // Get articles for secondary grid (avoid duplicating featured articles)
  const secondaryArticles = transformedArticles.length > 3 ? 
    transformedArticles.slice(3) : // Use articles after featured ones
    []; // Don't show secondary grid if we don't have enough unique articles
  
  // Get articles for breaking news (ensure we have some)
  const breakingNewsArticles = transformedArticles.length > 0 ? transformedArticles : [];
  
  // Get remaining articles for traditional grid (after secondary grid)
  const latestArticles = transformedArticles.length > 6 ? 
    transformedArticles.slice(6) : 
    [];

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-background">
        <HeroSection />
        <div className="mx-auto max-w-7xl px-4 py-8 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64 mb-8"></div>
                <div className="space-y-4">
                  <div className="bg-gray-200 rounded-lg h-32"></div>
                  <div className="bg-gray-200 rounded-lg h-32"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-200 rounded-lg h-64"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-background">
        <HeroSection />
        <div className="mx-auto max-w-7xl px-4 py-8 bg-white text-center">
          <p className="text-red-600">Failed to load articles. Please try again later.</p>
        </div>
      </div>
    );
  }

  // No articles state
  if (!transformedArticles.length) {
    return (
      <div className="bg-background">
        <HeroSection />
        <div className="mx-auto max-w-7xl px-4 py-8 bg-white">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-black mb-4" data-testid="text-no-articles-title">No Articles Yet</h2>
            <p className="text-gray-600 mb-8" data-testid="text-no-articles-description">
              Articles uploaded through the admin panel will appear here.
            </p>
            <Link 
              href="/admin/login" 
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
              data-testid="link-admin-login"
            >
              Go to Admin Panel
            </Link>
          </div>
          
          {/* Sidebar with newsletter signup */}
          <div className="max-w-md mx-auto mt-16">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-black mb-4" data-testid="text-sidebar-newsletter-title">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-4" data-testid="text-sidebar-newsletter-description">
                Get weekly AI policy insights straight from Riyadh.
              </p>
              <NewsletterSignup variant="sidebar" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <HeroSection />
      {/* Magazine-Style Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 lg:grid-rows-[auto_auto_auto] lg:grid-areas-mosaic">
          
          {/* Hero Mosaic Grid - Desktop: Asymmetric layout, Mobile: Single column */}
          <div className="lg:col-span-3 mb-8 lg:mb-12">
            {/* Hero Story Takes Center Stage */}
            {heroArticle && (
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
                {/* Main Hero Article - Takes 4 columns on desktop */}
                <div className="lg:col-span-4">
                  <ArticleCard article={heroArticle} variant="hero" />
                </div>
                
                {/* Medium Featured Articles - 2 columns on desktop */}
                <div className="lg:col-span-2 space-y-6">
                  {featuredArticles.slice(0, 2).map((article) => (
                    <ArticleCard 
                      key={article.id} 
                      article={article} 
                      variant="tile" 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Secondary Grid - 3 Smaller Articles */}
            {secondaryArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {secondaryArticles.slice(0, 3).map((article) => (
                  <ArticleCard 
                    key={`secondary-${article.id}`} 
                    article={article} 
                    variant="compact" 
                  />
                ))}
              </div>
            )}

            {/* Breaking News Bar - Horizontal Scroll Rail */}
            {breakingNewsArticles.length > 0 && (
              <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <h3 className="text-red-800 font-bold text-sm uppercase mb-3">Breaking News</h3>
                <div className="overflow-x-auto">
                  <div className="flex gap-4 snap-x snap-mandatory">
                    {breakingNewsArticles.slice(0, 6).map((article) => (
                      <div key={`breaking-${article.id}`} className="flex-shrink-0 snap-start min-w-[280px]">
                        <ArticleCard 
                          article={article} 
                          variant="mini" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* More Stories in Traditional Grid */}
            {latestArticles.length > 0 && (
              <div className="mb-12">
                <div className="verge-divider mb-8"></div>
                <h2 className="text-3xl font-bold text-black mb-8" data-testid="text-more-stories-title">
                  More Stories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {latestArticles.map((article) => (
                    <ArticleCard 
                      key={`more-${article.id}`} 
                      article={article} 
                      variant="standard" 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Load More Button */}
            <div className="text-center">
              <Link href="/policy" className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-3 rounded-md font-medium transition-colors inline-block" data-testid="button-load-more">
                Load More Articles
              </Link>
            </div>
          </div>

          {/* Enhanced Sticky Sidebar */}
          <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-8 lg:self-start">
            {/* Most Popular */}
            {popularArticles && popularArticles.length > 0 && (
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-6 text-[#ff007f]" data-testid="text-most-popular-title">
                  Most Popular
                </h3>
                <div className="space-y-4">
                  {popularArticles
                    .slice(0, 3)
                    .map((content, index) => {
                      const article = transformContentToArticle(content);
                      return (
                        <div key={article.id} className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded transition-colors" data-testid={`item-most-popular-${index}`}>
                          <div className="flex-shrink-0 w-6 h-6 text-white text-xs font-bold rounded-full flex items-center justify-center bg-[#030203]">
                            {index + 1}
                          </div>
                          <div>
                            <Link href={`/article/${article.slug}`} className="font-medium text-black hover:text-[#ff007f] line-clamp-2 text-[18px]">
                              {article.title}
                            </Link>
                            <div className="text-xs text-gray-500 mt-1">{article.category}</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Newsletter Signup */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-black mb-4" data-testid="text-sidebar-newsletter-title">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-4" data-testid="text-sidebar-newsletter-description">
                Get weekly AI policy insights straight from Riyadh.
              </p>
              <NewsletterSignup variant="sidebar" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}