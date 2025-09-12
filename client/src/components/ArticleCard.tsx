import { Link } from "wouter";
import { MessageCircle } from "lucide-react";

export interface Article {
  id: string;
  title: string;
  source?: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: string;
  imageUrl?: string;
  slug: string;
  comments?: number;
}

interface ArticleCardProps {
  article: Article;
  variant?: "hero" | "featured" | "standard" | "list";
}

export default function ArticleCard({ article, variant = "standard" }: ArticleCardProps) {
  if (variant === "hero") {
    return (
      <div className="group cursor-pointer" data-testid={`card-article-hero-${article.id}`}>
        <Link href={`/article/${article.slug}`}>
          <div className="mb-3">
            <span className="verge-category-label bg-primary text-white px-2 py-1 rounded" data-testid={`badge-category-hero-${article.id}`}>
              {article.category}
            </span>
          </div>
          <h1 className="verge-headline-hero text-black article-title-hover transition-colors mb-2 !text-black" data-testid={`text-title-hero-${article.id}`}>
            {article.title}
          </h1>
          {article.source && (
            <p className="verge-meta-text text-gray-600 mb-4 font-medium" data-testid={`text-source-hero-${article.id}`}>
              {article.source}
            </p>
          )}
          <p className="verge-body-text text-xl mb-4" data-testid={`text-excerpt-hero-${article.id}`}>
            {article.excerpt}
          </p>
          <div className="verge-meta-text flex items-center">
            <span data-testid={`text-author-hero-${article.id}`}>{article.author}</span>
            <span className="mx-2">•</span>
            <span data-testid={`text-date-hero-${article.id}`}>{article.publishedAt}</span>
            {article.comments && (
              <>
                <span className="mx-2">•</span>
                <MessageCircle className="h-3 w-3 mr-1" />
                <span data-testid={`text-comments-hero-${article.id}`}>{article.comments} comments</span>
              </>
            )}
          </div>
        </Link>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="group cursor-pointer" data-testid={`card-article-featured-${article.id}`}>
        <Link href={`/article/${article.slug}`}>
          <div className="flex gap-4">
            {article.imageUrl && (
              <div className="flex-shrink-0">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-24 h-24 object-cover rounded"
                  data-testid={`img-article-featured-${article.id}`}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <span className="verge-category-label bg-primary text-white px-2 py-1 rounded" data-testid={`badge-category-featured-${article.id}`}>
                  {article.category}
                </span>
              </div>
              <h2 className="verge-headline-medium text-black article-title-hover transition-colors mb-2 leading-tight !text-black" data-testid={`text-title-featured-${article.id}`}>
                {article.title}
              </h2>
              {article.source && (
                <p className="verge-meta-text text-gray-600 mb-2 font-medium" data-testid={`text-source-featured-${article.id}`}>
                  {article.source}
                </p>
              )}
              <p className="verge-body-text mb-3 line-clamp-2" data-testid={`text-excerpt-featured-${article.id}`}>
                {article.excerpt}
              </p>
              <div className="verge-meta-text flex items-center">
                <span data-testid={`text-author-featured-${article.id}`}>{article.author}</span>
                <span className="mx-1">•</span>
                <span data-testid={`text-date-featured-${article.id}`}>{article.publishedAt}</span>
                {article.comments && (
                  <>
                    <span className="mx-1">•</span>
                    <MessageCircle className="h-3 w-3 mr-1" />
                    <span data-testid={`text-comments-featured-${article.id}`}>{article.comments}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="group cursor-pointer py-5 verge-divider last:border-b-0" data-testid={`card-article-list-${article.id}`}>
        <Link href={`/article/${article.slug}`}>
          <div className="flex gap-4">
            {article.imageUrl && (
              <div className="flex-shrink-0">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-20 h-20 object-cover rounded"
                  data-testid={`img-article-list-${article.id}`}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <span className="verge-category-label bg-primary text-white px-2 py-1 rounded" data-testid={`badge-category-list-${article.id}`}>
                  {article.category}
                </span>
              </div>
              <h3 className="verge-headline-small text-black article-title-hover transition-colors mb-1 !text-black" data-testid={`text-title-list-${article.id}`}>
                {article.title}
              </h3>
              {article.source && (
                <p className="verge-meta-text text-gray-600 mb-2 font-medium text-sm" data-testid={`text-source-list-${article.id}`}>
                  {article.source}
                </p>
              )}
              <p className="verge-body-text mb-2 line-clamp-2" data-testid={`text-excerpt-list-${article.id}`}>
                {article.excerpt}
              </p>
              <div className="verge-meta-text flex items-center">
                <span data-testid={`text-author-list-${article.id}`}>{article.author}</span>
                <span className="mx-1">•</span>
                <span data-testid={`text-date-list-${article.id}`}>{article.publishedAt}</span>
                {article.comments && (
                  <>
                    <span className="mx-1">•</span>
                    <MessageCircle className="h-3 w-3 mr-1" />
                    <span data-testid={`text-comments-list-${article.id}`}>{article.comments}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer" data-testid={`card-article-standard-${article.id}`}>
      <Link href={`/article/${article.slug}`}>
        {article.imageUrl && (
          <div className="mb-4">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full aspect-[4/3] object-cover rounded"
              data-testid={`img-article-standard-${article.id}`}
            />
          </div>
        )}
        <div className="mb-3">
          <span className="verge-category-label bg-primary text-white px-2 py-1 rounded" data-testid={`badge-category-standard-${article.id}`}>
            {article.category}
          </span>
        </div>
        <h3 className="verge-headline-small text-black article-title-hover transition-colors mb-2 !text-black" data-testid={`text-title-standard-${article.id}`}>
          {article.title}
        </h3>
        {article.source && (
          <p className="verge-meta-text text-gray-600 mb-2 font-medium" data-testid={`text-source-standard-${article.id}`}>
            {article.source}
          </p>
        )}
        <p className="verge-body-text mb-3 line-clamp-2" data-testid={`text-excerpt-standard-${article.id}`}>
          {article.excerpt}
        </p>
        <div className="verge-meta-text flex items-center">
          <span data-testid={`text-author-standard-${article.id}`}>{article.author}</span>
          <span className="mx-1">•</span>
          <span data-testid={`text-date-standard-${article.id}`}>{article.publishedAt}</span>
          {article.comments && (
            <>
              <span className="mx-1">•</span>
              <MessageCircle className="h-3 w-3 mr-1" />
              <span data-testid={`text-comments-standard-${article.id}`}>{article.comments}</span>
            </>
          )}
        </div>
      </Link>
    </div>
  );
}