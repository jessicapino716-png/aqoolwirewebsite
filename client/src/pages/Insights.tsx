import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Content } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Calendar, User } from "lucide-react";
import { useState } from "react";

// Helper function to format published date
const formatPublishedDate = (publishedAt: string | Date) => {
  const date = publishedAt instanceof Date ? publishedAt : new Date(publishedAt);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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
            <div className="h-12 bg-card rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-card rounded-md"></div>
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

  // Get all published articles
  const allArticles = articles || [];
  
  // Get unique categories
  const categories = ["all", ...Array.from(new Set(allArticles.map(a => a.category)))];
  
  // Filter articles by category
  const filteredArticles = selectedCategory === "all" 
    ? allArticles 
    : allArticles.filter(a => a.category === selectedCategory);
  
  // Separate featured/popular articles
  const featuredArticles = allArticles.filter(a => a.isPopular).slice(0, 3);
  const regularArticles = selectedCategory === "all" 
    ? allArticles.filter(a => !a.isPopular)
    : filteredArticles.filter(a => !a.isPopular);

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
      <section className="pt-24 pb-12 border-b border-border">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Insights</h1>
            <p className="text-xl text-muted-foreground">
              In-depth analysis and expert perspectives on AI policy, regulation, and investment opportunities across Saudi Arabia and the GCC region.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border bg-card">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                data-testid={`button-category-${cat}`}
                className={selectedCategory === cat ? "bg-[#2bd4a7] hover:bg-[#25c29a] text-white" : ""}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {selectedCategory === "all" && featuredArticles.length > 0 && (
        <section className="py-16 bg-card border-b border-border">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured</h2>
              <Badge variant="secondary" className="bg-[#2bd4a7] text-white">Popular</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16">
        <div className="container-custom">
          {selectedCategory !== "all" && (
            <h2 className="text-3xl font-bold mb-8">
              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </h2>
          )}
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedCategory === "all" ? regularArticles : filteredArticles).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Article Card Component
function ArticleCard({ article, featured = false }: { article: Content; featured?: boolean }) {
  const cardContent = (
    <Card className="h-full overflow-hidden hover-elevate border-border">
      <div className="relative h-52 overflow-hidden">
        {article.imageUrl ? (
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2bd4a7]/20 to-[#2bd4a7]/5"></div>
        )}
        {featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-[#2bd4a7] text-white border-none">Featured</Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {article.category}
          </Badge>
          {article.type === 'op-ed' && (
            <Badge variant="outline" className="text-xs">Opinion</Badge>
          )}
          {article.type === 'external' && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              External
            </Badge>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatPublishedDate(article.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{article.authorName}</span>
          </div>
        </div>
        
        {article.source && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs font-semibold" style={{ color: '#f2007d' }}>
              Source: {article.source}
            </p>
          </div>
        )}
        
        <div className="mt-4">
          <div className="text-[#2bd4a7] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Read more
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (article.type === 'external' && article.externalUrl) {
    return (
      <a 
        href={article.externalUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block group h-full"
        data-testid={`link-article-external-${article.id}`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link 
      href={`/article/${article.slug}`} 
      className="block group h-full"
      data-testid={`link-article-${article.id}`}
    >
      {cardContent}
    </Link>
  );
}
