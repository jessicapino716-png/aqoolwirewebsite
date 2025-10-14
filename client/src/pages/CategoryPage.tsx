import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import ArticleCard, { type Article } from "@/components/ArticleCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import type { Content } from "@shared/schema";

interface ToolVideo {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  displayOrder: number;
  createdAt: string;
}

// Fallback thumbnail image for articles without images - using public folder path
const thumbnailImage = '/assets/generated_images/AI_regulation_news_thumbnail_f02ad3d3.png';

// Mapping of URL-friendly category names to database category names
const categoryMapping: Record<string, string> = {
  "policy": "Policy",
  "regulation": "Regulation", 
  "analysis": "Analysis",
  "tools": "Technology", // Maps to Technology category in database
  "newsletter": "Newsletter"
};

// Reverse mapping for display purposes
const displayCategoryMapping: Record<string, string> = {
  "policy": "AI Policy",
  "regulation": "AI Regulation",
  "analysis": "AI Analysis", 
  "tools": "AI Tools",
  "newsletter": "Newsletter"
};

function transformContentToArticle(content: Content): Article {
  return {
    id: content.id,
    title: content.title,
    excerpt: content.excerpt,
    author: content.authorName,
    publishedAt: new Date(content.publishedAt).toLocaleDateString(),
    category: content.category,
    imageUrl: content.imageUrl || thumbnailImage,
    slug: content.slug,
    externalUrl: content.externalUrl || undefined,
    comments: content.commentsCount,
    source: content.source || undefined
  };
}

function extractYoutubeVideoId(url: string): string | null {
  // Handle various YouTube URL formats:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://m.youtube.com/watch?v=VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://www.youtube.com/v/VIDEO_ID
  // - https://www.youtube.com/live/VIDEO_ID
  const patterns = [
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

export default function CategoryPage() {
  const [location] = useLocation();
  // Extract category from URL path (e.g., "/policy" -> "policy")
  const categorySlug = location.replace('/', '') || 'policy';
  
  if (!categorySlug || !categoryMapping[categorySlug]) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-black mb-2">Category Not Found</h1>
            <p className="text-gray-600 mb-4">The requested category does not exist.</p>
            <Link href="/">
              <span className="text-primary hover:text-primary/80 font-medium">
                Return to Home
              </span>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const dbCategory = categoryMapping[categorySlug];
  const displayCategory = displayCategoryMapping[categorySlug];
  
  const { data: content = [], isLoading, error } = useQuery({
    queryKey: ['/api/content', 'category', dbCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('category', dbCategory);
      
      const url = `/api/content?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch content');
      return response.json();
    },
  }) as { data: Content[]; isLoading: boolean; error: any };

  // Fetch tool videos only for the tools category
  const { data: toolVideos = [], isLoading: videosLoading } = useQuery<ToolVideo[]>({
    queryKey: ['/api/tool-videos'],
    enabled: categorySlug === 'tools',
  });

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-6 w-96" />
          </div>
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex gap-4 p-6 border-b border-gray-200">
                <Skeleton className="w-20 h-20 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-black mb-2">Error Loading Articles</h1>
            <p className="text-gray-600 mb-4">
              Unable to load articles for this category. Please try again later.
            </p>
            <Link href="/">
              <span className="text-primary hover:text-primary/80 font-medium">
                Return to Home
              </span>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const articles = content.map(transformContentToArticle);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="verge-headline-hero text-black mb-4" data-testid={`text-category-title-${categorySlug}`}>
            {displayCategory}
          </h1>
        </div>

        {/* Special layout for AI Tools page */}
        {categorySlug === 'tools' ? (
          <div>
            {/* Purpose Description Section */}
            <div className="mb-12">
              <Card className="p-8 text-center bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] border-2 border-[#3b82f6]/20">
                <h2 className="text-2xl font-bold text-black mb-4" data-testid="text-tools-purpose-title">Explore The Most Recently Released AI Tools</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed" data-testid="text-tools-purpose-description">Curious about the latest AI tools everyone’s talking about? Watch Youtube demos, discover new applications, and learn how to use them to power your work.</p>
              </Card>
            </div>

            {/* YouTube Videos Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-black mb-6" data-testid="text-tools-videos-title">
                Featured AI Tool Demonstrations
              </h3>
              {videosLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="p-6">
                      <Skeleton className="h-48 w-full mb-4 rounded-lg" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </Card>
                  ))}
                </div>
              ) : toolVideos.length === 0 ? (
                <Card className="p-6 text-center border-2 border-dashed border-gray-300" data-testid="card-no-videos">
                  <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg mb-4">
                    <p className="text-gray-500">No videos yet</p>
                  </div>
                  <p className="text-sm text-gray-600">AI tool demonstration videos will appear here</p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-youtube-videos">
                  {toolVideos.map((video) => {
                    const videoId = extractYoutubeVideoId(video.youtubeUrl);
                    return (
                      <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-video-${video.id}`}>
                        <div className="aspect-video bg-gray-900">
                          {videoId ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                              data-testid={`iframe-video-${video.id}`}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-white">
                              Invalid video URL
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-black mb-2" data-testid={`text-video-title-${video.id}`}>
                            {video.title}
                          </h4>
                          {video.description && (
                            <p className="text-sm text-gray-600" data-testid={`text-video-description-${video.id}`}>
                              {video.description}
                            </p>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Articles Section for Tools */}
            {articles.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-black mb-6" data-testid="text-tools-articles-title">
                  Latest AI Tool Reviews & Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8" data-testid={`articles-grid-${categorySlug}`}>
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="standard" />
                  ))}
                </div>
              </div>
            )}

            {articles.length === 0 && (
              <Card className="p-8 text-center" data-testid={`card-no-articles-${categorySlug}`}>
                <h3 className="text-xl font-semibold text-black mb-2">No Articles Yet</h3>
                <p className="text-gray-600 mb-4">
                  AI tool reviews and analysis articles will appear here once published.
                </p>
              </Card>
            )}
          </div>
        ) : (
          /* Regular layout for other categories */
          (articles.length === 0 ? (<Card className="p-8 text-center" data-testid={`card-no-articles-${categorySlug}`}>
            <h2 className="text-xl font-semibold text-black mb-2">No Articles Found</h2>
            <p className="text-gray-600 mb-4">
              There are currently no articles in the {displayCategory} category.
            </p>
            <Link href="/">
              <span className="text-primary hover:text-primary/80 font-medium">
                Browse All Articles
              </span>
            </Link>
          </Card>) : (<div className="space-y-0" data-testid={`articles-list-${categorySlug}`}>
            {articles.map((article, index) => (
              <div key={article.id} className={index === 0 ? "" : "verge-divider"}>
                <ArticleCard article={article} variant="list" />
              </div>
            ))}
          </div>))
        )}

        {/* Back to Home Link */}
        <div className="mt-12 text-center">
          <div className="verge-divider mb-8"></div>
          <Link href="/">
            <span className="verge-category-label text-primary hover:text-primary/80 transition-colors" data-testid={`link-back-home-${categorySlug}`}>
              ← Back to Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    "AI Policy": "Latest developments in artificial intelligence policy, governance, and regulatory frameworks affecting Saudi Arabia and the GCC region.",
    "AI Regulation": "Comprehensive coverage of AI regulations, compliance requirements, and legal developments across the Middle East.",
    "AI Analysis": "In-depth analysis and expert commentary on artificial intelligence trends, impacts, and strategic implications.",
    "AI Tools": "Discover the latest artificial intelligence tools, technologies, and innovations transforming industries.",
    "Newsletter": "Stay updated with our curated newsletter content and exclusive insights."
  };
  
  return descriptions[category] || "Explore articles and insights in this category.";
}