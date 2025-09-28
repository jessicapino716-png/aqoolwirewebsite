import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, User, Tag, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import type { Content } from "@shared/schema";

export default function ArticlePage() {
  const [match, params] = useRoute("/article/:slug");
  const slug = params?.slug;
  
  // Handle external article redirection state (must be declared at top level)
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['/api/content', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      
      const response = await fetch(`/api/content/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Article not found');
        }
        throw new Error('Failed to fetch article');
      }
      return response.json();
    },
    enabled: !!slug,
  }) as { data: Content; isLoading: boolean; error: any };

  // External article auto-redirect effect (must be at component top level)
  useEffect(() => {
    if (article && article.type === 'external' && article.externalUrl && !isRedirecting) {
      // Auto-redirect after a short delay to give user context
      const timer = setTimeout(() => {
        window.location.href = article.externalUrl!;
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [article, isRedirecting]);

  if (!match || !slug) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-black mb-2">Invalid Article URL</h1>
            <p className="text-gray-600 mb-4">The article URL is malformed.</p>
            <Link href="/">
              <span className="text-[#3b82f6] hover:text-[#2563eb] font-medium">
                Return to Home
              </span>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back button skeleton */}
          <div className="mb-8">
            <Skeleton className="h-6 w-32" />
          </div>
          
          {/* Article header skeleton */}
          <div className="mb-8">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-64 w-full rounded-lg mb-6" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4" />
          </div>

          {/* Article body skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
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
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-black mb-2">Article Not Found</h1>
            <p className="text-gray-600 mb-4">
              {error?.message || 'The requested article could not be found.'}
            </p>
            <Link href="/">
              <span className="text-[#3b82f6] hover:text-[#2563eb] font-medium">
                Return to Home
              </span>
            </Link>
          </Card>
        </div>
      </div>
    );
  }


  // If this is an external article, show redirect UI
  if (article.type === 'external' && article.externalUrl) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-8" data-testid="article-back-button">
            <Link href="/">
              <span className="inline-flex items-center text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </span>
            </Link>
          </div>

          {/* External Article Redirect Card */}
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center space-y-6">
              <ExternalLink className="h-16 w-16 text-[#3b82f6]" />
              
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-black">{article.title}</h1>
                <p className="text-gray-600 max-w-2xl">
                  This article is hosted on <strong>{article.source}</strong>. 
                  You will be redirected automatically in a few seconds, or you can click the button below to continue immediately.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => {
                    setIsRedirecting(true);
                    window.location.href = article.externalUrl!;
                  }}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                  data-testid="button-external-redirect"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read on {article.source}
                </Button>
                
                <Link href="/">
                  <Button variant="outline" data-testid="button-stay-home">
                    Stay on The Aqool Wire
                  </Button>
                </Link>
              </div>

              <div className="text-sm text-gray-500">
                Redirecting automatically in 3 seconds...
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // If this is an op-ed but has no body content, show error
  if (article.type === 'op-ed' && !article.body) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-black mb-2">Article Content Unavailable</h1>
            <p className="text-gray-600 mb-4">
              This article does not have content available for display.
            </p>
            <Link href="/">
              <span className="text-[#3b82f6] hover:text-[#2563eb] font-medium">
                Return to Home
              </span>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatBody = (body: string) => {
    // Split by paragraphs and filter out empty ones
    const paragraphs = body.split('\n').filter(p => p.trim().length > 0);
    
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4 text-lg leading-relaxed text-gray-800">
        {paragraph.trim()}
      </p>
    ));
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8" data-testid="article-back-button">
          <Link href="/">
            <span className="inline-flex items-center text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </span>
          </Link>
        </div>

        {/* Article Header */}
        <article className="mb-8">
          {/* Category Badge */}
          <div className="mb-4">
            <Badge 
              className="bg-[#3b82f6] text-white px-3 py-1 text-sm font-medium" 
              data-testid="article-category"
            >
              {article.category}
            </Badge>
          </div>

          {/* Article Title */}
          <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight" data-testid="article-title">
            {article.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6" data-testid="article-meta">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="font-medium">{article.authorName}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(article.publishedAt.toString())}</span>
            </div>
            {article.commentsCount > 0 && (
              <div className="flex items-center">
                <span>{article.commentsCount} comment{article.commentsCount !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {/* Article Image */}
          {article.imageUrl && (
            <div className="mb-8">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full aspect-[16/9] object-cover rounded-lg"
                data-testid="article-image"
              />
            </div>
          )}

          {/* Article Excerpt */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8 border-l-4 border-[#3b82f6]">
            <p className="text-xl text-gray-700 font-medium leading-relaxed" data-testid="article-excerpt">
              {article.excerpt}
            </p>
          </div>

          {/* Article Body */}
          {article.body && (
            <div className="prose prose-lg max-w-none" data-testid="article-body">
              {formatBody(article.body)}
            </div>
          )}

          {/* Article Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2" data-testid="article-tags">
                {article.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-[#3b82f6] border-[#3b82f6] hover:bg-[#3b82f6] hover:text-white transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* External Source Link */}
          {article.source && article.externalUrl && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Originally published by:</p>
                  <p className="text-blue-900 font-semibold">{article.source}</p>
                </div>
                <a
                  href={article.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#3b82f6] hover:text-[#2563eb] font-medium"
                  data-testid="article-external-link"
                >
                  Read Original
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          )}
        </article>

        {/* Back to Home Link */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link href="/">
            <span className="text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors">
              ← Back to Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}