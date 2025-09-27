import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Content } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, MessageCircle, Calendar, User } from "lucide-react";

// Fallback image
import thumbnailImage from '@assets/generated_images/AI_regulation_news_thumbnail_f02ad3d3.png';

// Helper function to format published date
const formatPublishedDate = (publishedAt: string) => {
  const date = new Date(publishedAt);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export default function ArticleDetail() {
  const { slug } = useParams();

  const { data: article, isLoading, error } = useQuery<Content>({
    queryKey: ['/api/content', slug],
    queryFn: async () => {
      const response = await fetch(`/api/content/${slug}`);
      if (!response.ok) {
        throw new Error('Article not found');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold text-black mb-2">Article Not Found</h1>
            <p className="text-gray-600 mb-4">The requested article could not be found.</p>
            <Link href="/">
              <span className="text-[#3b82f6] hover:text-[#2563eb] font-medium">
                ← Return to Home
              </span>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors" data-testid="link-back-home">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Article Header */}
        <article className="space-y-8" data-testid="article-detail">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block bg-[#3b82f6] text-white px-3 py-1 rounded text-sm font-medium" data-testid="badge-category">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-black leading-tight mb-6" data-testid="text-article-title">
            {article.title}
          </h1>

          {/* Source (if external article) */}
          {article.source && (
            <p className="text-lg text-gray-600 font-medium mb-4" data-testid="text-article-source">
              Source: {article.source}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 border-b border-gray-200 pb-6" data-testid="meta-info">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span data-testid="text-author">{article.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span data-testid="text-date">{formatPublishedDate(article.publishedAt.toString())}</span>
            </div>
            {article.commentsCount > 0 && (
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span data-testid="text-comments">{article.commentsCount} comments</span>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="mb-8">
              <img
                src={article.imageUrl || thumbnailImage}
                alt={article.title}
                className="w-full aspect-[16/9] object-cover rounded-lg"
                data-testid="img-article-featured"
              />
            </div>
          )}

          {/* Excerpt */}
          <div className="text-xl text-gray-700 leading-relaxed border-l-4 border-[#3b82f6] pl-6 mb-8" data-testid="text-excerpt">
            {article.excerpt}
          </div>

          {/* Body Content */}
          {article.body && (
            <div 
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              data-testid="text-body"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          )}

          {/* External URL Link */}
          {article.externalUrl && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
              <p className="text-gray-700 mb-4">Read the full article at the original source:</p>
              <a
                href={article.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-md font-medium transition-colors"
                data-testid="link-external-source"
              >
                Read Original Article
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}