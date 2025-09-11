import { Link } from "wouter";
import { MessageCircle } from "lucide-react";

export interface Article {
  id: string;
  title: string;
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
          <div className="relative overflow-hidden rounded-lg">
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full aspect-[16/9] object-cover"
                data-testid={`img-article-hero-${article.id}`}
              />
            )}
          </div>
          <div className="mt-4">
            <h1 className="text-4xl font-bold leading-tight text-black group-hover:text-purple-600 transition-colors mb-3" data-testid={`text-title-hero-${article.id}`}>
              {article.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-4" data-testid={`text-excerpt-hero-${article.id}`}>
              {article.excerpt}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span data-testid={`text-author-hero-${article.id}`}>{article.author}</span>
              <span className="mx-2">•</span>
              <span data-testid={`text-date-hero-${article.id}`}>{article.publishedAt}</span>
            </div>
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
                  className="w-20 h-20 object-cover rounded"
                  data-testid={`img-article-featured-${article.id}`}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="mb-1">
                <span className="inline-block px-2 py-1 text-xs font-bold uppercase bg-orange-500 text-white rounded" data-testid={`badge-category-featured-${article.id}`}>
                  {article.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-black group-hover:text-purple-600 transition-colors mb-2 leading-tight" data-testid={`text-title-featured-${article.id}`}>
                {article.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2" data-testid={`text-excerpt-featured-${article.id}`}>
                {article.excerpt}
              </p>
              <div className="flex items-center text-sm text-gray-500">
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
      <div className="group cursor-pointer py-4 border-b border-gray-200 last:border-b-0" data-testid={`card-article-list-${article.id}`}>
        <Link href={`/article/${article.slug}`}>
          <div className="flex gap-4">
            {article.imageUrl && (
              <div className="flex-shrink-0">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-16 h-16 object-cover rounded"
                  data-testid={`img-article-list-${article.id}`}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="mb-1">
                <span className="inline-block px-2 py-1 text-xs font-bold uppercase bg-teal-500 text-white rounded" data-testid={`badge-category-list-${article.id}`}>
                  {article.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-black group-hover:text-purple-600 transition-colors mb-1 leading-tight" data-testid={`text-title-list-${article.id}`}>
                {article.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500">
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
          <div className="mb-3">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full aspect-[4/3] object-cover rounded"
              data-testid={`img-article-standard-${article.id}`}
            />
          </div>
        )}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-bold uppercase bg-blue-500 text-white rounded" data-testid={`badge-category-standard-${article.id}`}>
            {article.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-black group-hover:text-purple-600 transition-colors mb-2 leading-tight" data-testid={`text-title-standard-${article.id}`}>
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2" data-testid={`text-excerpt-standard-${article.id}`}>
          {article.excerpt}
        </p>
        <div className="flex items-center text-sm text-gray-500">
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