import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Clock, User } from "lucide-react";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  imageUrl?: string;
  slug: string;
}

interface ArticleCardProps {
  article: Article;
  variant?: "featured" | "standard" | "compact";
}

export default function ArticleCard({ article, variant = "standard" }: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <Card className="overflow-hidden hover-elevate group cursor-pointer" data-testid={`card-article-${article.id}`}>
        <Link href={`/article/${article.slug}`}>
          <div className="aspect-[16/9] overflow-hidden">
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                data-testid={`img-article-${article.id}`}
              />
            )}
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" data-testid={`badge-category-${article.id}`}>
                {article.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span data-testid={`text-readtime-${article.id}`}>{article.readTime}</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors" data-testid={`text-title-${article.id}`}>
              {article.title}
            </h2>
            <p className="text-muted-foreground mb-4 line-clamp-2" data-testid={`text-excerpt-${article.id}`}>
              {article.excerpt}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span data-testid={`text-author-${article.id}`}>{article.author}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground" data-testid={`text-date-${article.id}`}>{article.publishedAt}</span>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card className="p-4 hover-elevate group cursor-pointer" data-testid={`card-article-compact-${article.id}`}>
        <Link href={`/article/${article.slug}`}>
          <div className="flex gap-4">
            {article.imageUrl && (
              <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  data-testid={`img-article-compact-${article.id}`}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <Badge variant="secondary" className="mb-2" data-testid={`badge-category-compact-${article.id}`}>
                {article.category}
              </Badge>
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2" data-testid={`text-title-compact-${article.id}`}>
                {article.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <span data-testid={`text-author-compact-${article.id}`}>{article.author}</span>
                <span>•</span>
                <span data-testid={`text-date-compact-${article.id}`}>{article.publishedAt}</span>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover-elevate group cursor-pointer" data-testid={`card-article-standard-${article.id}`}>
      <Link href={`/article/${article.slug}`}>
        {article.imageUrl && (
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              data-testid={`img-article-standard-${article.id}`}
            />
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" data-testid={`badge-category-standard-${article.id}`}>
              {article.category}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span data-testid={`text-readtime-standard-${article.id}`}>{article.readTime}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2" data-testid={`text-title-standard-${article.id}`}>
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-testid={`text-excerpt-standard-${article.id}`}>
            {article.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs">
            <User className="h-3 w-3" />
            <span data-testid={`text-author-standard-${article.id}`}>{article.author}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground" data-testid={`text-date-standard-${article.id}`}>{article.publishedAt}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}