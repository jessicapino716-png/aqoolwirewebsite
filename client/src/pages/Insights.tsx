import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Content } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";

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

export default function Insights() {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-24">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Error Loading Articles</h2>
          <p className="text-muted-foreground">Failed to load articles. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Get all published articles - includes op-ed, external, and article types
  const allArticles = articles || [];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Insights - AQOOL Wire</title>
        <meta
          name="description"
          content="Explore in-depth analysis and insights on Saudi Arabia's AI transformation, policy developments, and investment opportunities."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Insights</h1>
            <p className="text-xl text-muted-foreground">
              In-depth analysis connecting policy, capital, and operations across Saudi Arabia's AI transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container-custom">
          {allArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allArticles.map((article) => (
                <div key={article.id} data-testid={`article-card-${article.id}`}>
                  {article.type === 'external' && article.externalUrl ? (
                    <a 
                      href={article.externalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                      data-testid={`link-article-external-${article.id}`}
                    >
                      <Card className="h-full flex flex-col cursor-pointer hover-elevate">
                        {article.imageUrl && (
                          <div className="w-full h-48 bg-muted rounded-t-lg overflow-hidden">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <Badge variant="secondary" data-testid={`badge-category-${article.id}`}>
                              {article.category}
                            </Badge>
                            {article.source && (
                              <Badge variant="outline" className="gap-1" data-testid={`badge-source-${article.id}`}>
                                <ExternalLink className="w-3 h-3" />
                                {article.source}
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h3>
                          <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{article.authorName}</span>
                            <span>{formatPublishedDate(article.publishedAt.toString())}</span>
                          </div>
                          <div className="flex items-center text-primary gap-1 mt-4">
                            <span className="text-sm font-medium">Read on {article.source}</span>
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </a>
                  ) : (
                    <Link href={`/article/${article.slug}`} data-testid={`link-article-${article.id}`}>
                      <Card className="h-full flex flex-col cursor-pointer hover-elevate">
                        {article.imageUrl && (
                          <div className="w-full h-48 bg-muted rounded-t-lg overflow-hidden">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <Badge variant="secondary" data-testid={`badge-category-${article.id}`}>
                              {article.category}
                            </Badge>
                            {article.type === 'op-ed' && (
                              <Badge variant="outline" data-testid={`badge-type-${article.id}`}>Op-Ed</Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h3>
                          <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{article.authorName}</span>
                            <span>{formatPublishedDate(article.publishedAt.toString())}</span>
                          </div>
                          <div className="flex items-center text-primary gap-1 mt-4">
                            <span className="text-sm font-medium">Read article</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
