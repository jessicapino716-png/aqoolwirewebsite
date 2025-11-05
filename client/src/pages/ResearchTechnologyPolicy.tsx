import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ExternalLink } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  source?: string;
  sourceLogo?: string;
  imageUrl?: string;
  createdAt: string;
}

export default function ResearchTechnologyPolicy() {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/content"],
  });

  const categoryArticles = articles?.filter(
    (article) => article.category === "analysis"
  ) || [];

  return (
    <>
      <Helmet>
        <title>Research & Technology Policy - The Aqool Wire</title>
        <meta
          name="description"
          content="In-depth research and analysis on technology policy, AI strategy, and digital transformation across the Kingdom of Saudi Arabia and MENA region."
        />
      </Helmet>

      <main className="min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          {/* Hero Section */}
          <div className="mb-12">
            <span className="kicker mb-4">Research & Technology Policy</span>
            <h1 className="text-4xl lg:text-5xl font-black text-white mt-4 mb-4 leading-tight">
              Deep Insights on AI Strategy & Digital Transformation
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              Academic research, policy analysis, and strategic recommendations shaping Saudi Arabia's technology future and Vision 2030 objectives.
            </p>
          </div>

          {/* Articles Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card p-6 animate-pulse">
                  <div className="h-48 bg-white/5 rounded-lg mb-4"></div>
                  <div className="h-4 bg-white/5 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-white/5 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : categoryArticles.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-gray-400 text-lg">No research articles available yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.id}`}
                  className="glass-card group hover:scale-[1.02] transition-all duration-300 overflow-hidden focus-cyan"
                  data-testid={`link-article-${article.id}`}
                >
                  {article.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="eyebrow">{article.category}</span>
                      {article.source && (
                        <>
                          <span className="text-gray-600">•</span>
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            {article.sourceLogo && (
                              <img
                                src={article.sourceLogo}
                                alt={article.source}
                                className="h-4 w-4 object-contain"
                              />
                            )}
                            {article.source}
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00e5ff] transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
