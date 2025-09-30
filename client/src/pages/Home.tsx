import ArticleCard from "@/components/ArticleCard";
import HeroSection from "@/components/HeroSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Content } from "@shared/schema";

// Fallback images for articles without images - using public folder paths
const heroImage = '/assets/generated_images/AI_policy_hero_image_e5e8bfa6.png';
const thumbnailImage = '/assets/generated_images/AI_regulation_news_thumbnail_f02ad3d3.png';

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
  
  // Separate op-ed and external articles
  const opEdArticles = transformedArticles.filter(article => 
    articles?.find(content => content.id === article.id)?.type === 'op-ed'
  );
  const externalArticles = transformedArticles.filter(article => 
    articles?.find(content => content.id === article.id)?.type === 'external'
  );
  
  // Get hero article (first op-ed article only)
  const heroArticle = opEdArticles[0];
  
  // Get featured articles (next 2 op-ed articles only)
  const featuredArticles = opEdArticles.slice(1, 3);
  
  // Get latest articles (remaining op-ed articles + all external articles)
  const latestArticles = [...opEdArticles.slice(3), ...externalArticles];

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

  // Transform popular articles for hero section
  const transformedPopularArticles = popularArticles?.map(content => ({
    id: content.id,
    title: content.title,
    slug: content.slug,
    category: content.category,
  })) || [];

  return (
    <div className="bg-background">
      <HeroSection popularArticles={transformedPopularArticles} />
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-2 py-8 bg-white">
        {/* Analysis Section - Op-Ed Articles in Equal Grid */}
        {opEdArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-8" data-testid="text-analysis-title">
              Analysis & Commentary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {opEdArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  variant="standard" 
                />
              ))}
            </div>
          </div>
        )}

        {/* Latest News Grid */}
        {latestArticles.length > 0 && (
          <div className="mb-12">
            <div className="verge-divider mb-8"></div>
            <h2 className="text-3xl font-bold text-black mb-8" data-testid="text-latest-news-title">
              Latest News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
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
        
        {/* Newsletter Signup - Bottom of page */}
        <div className="max-w-2xl mx-auto mt-16 mb-8">
          <div className="p-6 rounded-lg bg-[#dedede]">
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