import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import HeroFeature from "@/components/magazine/HeroFeature";
import { TopSpotlightCard } from "@/components/magazine/TopSpotlightCard";
import FeaturedList from "@/components/magazine/FeaturedList";
import SpecialEdition from "@/components/magazine/SpecialEdition";
import NumberedList from "@/components/magazine/NumberedList";
import CardGrid from "@/components/magazine/CardGrid";
import { Content } from "@shared/schema";

export default function Home() {
  const { data: articles, isLoading } = useQuery<Content[]>({
    queryKey: ["/api/content"],
  });

  // Separate op-ed and external articles
  const opEdArticles = articles?.filter((article) => article.type === "op-ed") || [];
  const externalArticles = articles?.filter((article) => article.type === "external") || [];

  // Hero: First op-ed article
  const heroArticle = opEdArticles[0];

  // Featured News List: External articles 1-5
  const featuredNews = externalArticles.slice(0, 5).map((article) => ({
    id: article.id,
    title: article.title,
    href: `/article/${article.id}`,
    category: article.category,
  }));

  // Most Recents: External articles 6-10
  const mostRecents = externalArticles.slice(5, 10).map((article) => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    source: article.source || undefined,
    href: `/article/${article.id}`,
    createdAt: article.publishedAt.toString(),
  }));

  // Special Edition: Second op-ed article
  const specialArticle = opEdArticles[1];

  // Helper function for category matching (case-insensitive, keyword-based)
  const matchesCategory = (article: Content, keywords: string[]) => {
    const category = article.category.toLowerCase();
    return keywords.some(keyword => category.includes(keyword.toLowerCase()));
  };

  // Category-specific grids
  const regulatoryArticles = articles
    ?.filter((article) => matchesCategory(article, ["regulation", "policy", "compliance", "regulatory"]))
    .slice(0, 3)
    .map((article) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      imageUrl: article.imageUrl || undefined,
      source: article.source || undefined,
      href: `/article/${article.id}`,
    })) || [];

  const researchArticles = articles
    ?.filter((article) => matchesCategory(article, ["research", "technology", "tech", "innovation", "development"]))
    .slice(0, 3)
    .map((article) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      imageUrl: article.imageUrl || undefined,
      source: article.source || undefined,
      href: `/article/${article.id}`,
    })) || [];

  const advisoryArticles = articles
    ?.filter((article) => matchesCategory(article, ["strategy", "analysis", "advisory", "consulting", "governance"]))
    .slice(0, 3)
    .map((article) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      imageUrl: article.imageUrl || undefined,
      source: article.source || undefined,
      href: `/article/${article.id}`,
    })) || [];

  const insightsArticles = articles
    ?.filter((article) => matchesCategory(article, ["insights", "opinion", "perspective", "commentary", "thought"]))
    .slice(0, 3)
    .map((article) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      imageUrl: article.imageUrl || undefined,
      href: `/article/${article.id}`,
    })) || [];

  const reportsArticles = articles
    ?.filter((article) => matchesCategory(article, ["report", "data", "market", "intelligence", "brief"]))
    .slice(0, 3)
    .map((article) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      imageUrl: article.imageUrl || undefined,
      href: `/article/${article.id}`,
    })) || [];

  return (
    <>
      <Helmet>
        <title>The Aqool Wire - Saudi Arabia's AI Intelligence Platform</title>
        <meta
          name="description"
          content="The first data-driven intelligence platform shaping the narrative of AI in Saudi Arabia. Track regulatory developments, strategic insights, and market intelligence across the Kingdom and GCC region."
        />
        <meta
          name="keywords"
          content="Saudi Arabia AI, AI policy, AI regulation, SDAIA, Vision 2030, GCC AI, Saudi tech, AI governance, Riyadh AI"
        />
        <meta property="og:title" content="The Aqool Wire - Saudi Arabia's AI Intelligence Platform" />
        <meta
          property="og:description"
          content="The first data-driven intelligence platform shaping the narrative of AI in Saudi Arabia."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://theaqoolwire.com" />
      </Helmet>

      <main className="min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card p-8 animate-pulse">
                  <div className="h-64 bg-white/5 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* ROW 1: Hero Left + Article Spotlight & Featured News Right */}
              <div className="grid lg:grid-cols-[2fr_1fr] gap-6 mb-8">
                {/* Left Column: Hero Feature - Platform Tagline */}
                <div>
                  <HeroFeature
                    kicker="Intelligence Platform"
                    title="Shaping the Narrative of AI in Saudi Arabia"
                    excerpt="Your authoritative source for AI policy, regulation, and strategic intelligence across the Kingdom and GCC region. Delivering data-driven insights that matter."
                    imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop"
                    href="/regulatory-intelligence"
                    ctaText="Explore Coverage"
                  />
                </div>

                {/* Right Column: Article Spotlight + Featured News */}
                <div className="space-y-6">
                  {/* Top Spotlight - Featured Article with Saudi Map Background */}
                  {heroArticle ? (
                    <TopSpotlightCard
                      kicker={heroArticle.category}
                      title={heroArticle.title}
                      href={`/article/${heroArticle.id}`}
                      showMapBackground={true}
                    />
                  ) : (
                    <TopSpotlightCard
                      kicker="Analysis"
                      title="The Future of AI Regulation in Saudi Arabia: A Comprehensive Analysis"
                      href="/regulatory-intelligence"
                      showMapBackground={true}
                    />
                  )}

                  {/* Featured News List */}
                  {featuredNews.length > 0 && (
                    <FeaturedList title="Featured News" items={featuredNews} />
                  )}
                </div>
              </div>

              {/* ROW 2: Most Recents Left + Special Edition Right */}
              <div className="grid lg:grid-cols-[1fr_2fr] gap-6 mb-12">
                {/* Most Recents (left column) - always render */}
                <NumberedList 
                  title="Most Recents" 
                  items={mostRecents.length > 0 ? mostRecents : [
                    {
                      id: "placeholder-1",
                      title: "Latest AI policy updates coming soon",
                      excerpt: "Stay tuned for breaking developments",
                      href: "/regulatory-intelligence",
                      createdAt: new Date().toISOString()
                    }
                  ]} 
                />

                {/* Special Edition (right column) */}
                {specialArticle ? (
                  <SpecialEdition
                    title="Special Edition"
                    subtitle={specialArticle.title}
                    description={specialArticle.excerpt}
                    imageUrl={specialArticle.imageUrl || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"}
                    href={`/article/${specialArticle.id}`}
                    ctaText="Read More"
                  />
                ) : (
                  <SpecialEdition
                    title="Special Edition"
                    subtitle="Vision 2030 and the AI Transformation"
                    description="Deep analysis of Saudi Arabia's AI strategy, government initiatives, and the roadmap toward becoming a global leader in artificial intelligence."
                    imageUrl="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"
                    href="/about"
                    ctaText="Read More"
                  />
                )}
              </div>

              {/* ROW 3: Topic Sections - Asymmetric Magazine Layout */}
              <div className="space-y-8">
                {/* Row 1: Regulatory Intelligence (Large) + Research & Tech (Medium) */}
                <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
                  {/* Regulatory Intelligence - Large */}
                  <section>
                    <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">
                      Regulatory Intelligence
                    </h2>
                    {regulatoryArticles.length > 0 ? (
                      <div className="grid gap-6">
                        {regulatoryArticles.slice(0, 2).map((article) => (
                          <Link key={article.id} href={article.href} data-testid={`link-card-${article.id}`}>
                            <div className="glass-card group overflow-hidden hover:scale-[1.01] transition-all duration-300 cursor-pointer">
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
                                <span className="eyebrow">{article.category}</span>
                                <h3 className="text-xl font-bold text-white group-hover:text-[#00d4aa] transition-colors mt-2 mb-2">
                                  {article.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{article.excerpt}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="glass-card p-12 text-center">
                        <p className="text-gray-400">Regulatory intelligence updates coming soon</p>
                      </div>
                    )}
                  </section>

                  {/* Research & Technology Policy - Medium */}
                  <section>
                    <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">
                      Research & Tech Policy
                    </h2>
                    {researchArticles.length > 0 ? (
                      <div className="space-y-6">
                        {researchArticles.slice(0, 1).map((article) => (
                          <Link key={article.id} href={article.href} data-testid={`link-card-${article.id}`}>
                            <div className="glass-card group overflow-hidden hover:scale-[1.01] transition-all duration-300 cursor-pointer h-full">
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
                                <span className="eyebrow">{article.category}</span>
                                <h3 className="text-lg font-bold text-white group-hover:text-[#00d4aa] transition-colors mt-2 mb-2">
                                  {article.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="glass-card p-12 text-center">
                        <p className="text-gray-400">Research coverage coming soon</p>
                      </div>
                    )}
                  </section>
                </div>

                {/* Row 2: AI Advisory (Medium) + Insights (Small) + Reports (Small) */}
                <div className="grid lg:grid-cols-[1.2fr_0.9fr_0.9fr] gap-6">
                  {/* AI Advisory - Medium */}
                  <section>
                    <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">
                      AI Advisory
                    </h2>
                    {advisoryArticles.length > 0 ? (
                      <div>
                        {advisoryArticles.slice(0, 1).map((article) => (
                          <Link key={article.id} href={article.href} data-testid={`link-card-${article.id}`}>
                            <div className="glass-card group overflow-hidden hover:scale-[1.01] transition-all duration-300 cursor-pointer">
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
                                <span className="eyebrow">{article.category}</span>
                                <h3 className="text-lg font-bold text-white group-hover:text-[#00d4aa] transition-colors mt-2 mb-2">
                                  {article.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{article.excerpt}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="glass-card p-10 text-center">
                        <p className="text-gray-400">Advisory insights coming soon</p>
                      </div>
                    )}
                  </section>

                  {/* Insights - Small */}
                  <section>
                    <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tight">
                      Insights
                    </h2>
                    {insightsArticles.length > 0 ? (
                      <div>
                        {insightsArticles.slice(0, 1).map((article) => (
                          <Link key={article.id} href={article.href} data-testid={`link-card-${article.id}`}>
                            <div className="glass-card group overflow-hidden hover:scale-[1.01] transition-all duration-300 cursor-pointer h-full">
                              <div className="p-6">
                                <span className="eyebrow text-xs">{article.category}</span>
                                <h3 className="text-base font-bold text-white group-hover:text-[#00d4aa] transition-colors mt-2 mb-2 line-clamp-3">
                                  {article.title}
                                </h3>
                                <p className="text-gray-400 text-xs leading-relaxed line-clamp-4">{article.excerpt}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="glass-card p-8 text-center">
                        <p className="text-gray-400 text-sm">Expert insights coming soon</p>
                      </div>
                    )}
                  </section>

                  {/* Reports - Small */}
                  <section>
                    <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tight">
                      Reports
                    </h2>
                    {reportsArticles.length > 0 ? (
                      <div>
                        {reportsArticles.slice(0, 1).map((article) => (
                          <Link key={article.id} href={article.href} data-testid={`link-card-${article.id}`}>
                            <div className="glass-card group overflow-hidden hover:scale-[1.01] transition-all duration-300 cursor-pointer h-full">
                              <div className="p-6">
                                <span className="eyebrow text-xs">{article.category}</span>
                                <h3 className="text-base font-bold text-white group-hover:text-[#00d4aa] transition-colors mt-2 mb-2 line-clamp-3">
                                  {article.title}
                                </h3>
                                <p className="text-gray-400 text-xs leading-relaxed line-clamp-4">{article.excerpt}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="glass-card p-8 text-center">
                        <p className="text-gray-400 text-sm">Intelligence reports coming soon</p>
                      </div>
                    )}
                  </section>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
