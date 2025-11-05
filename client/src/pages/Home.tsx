import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import HeroFeature from "@/components/magazine/HeroFeature";
import SidebarSpotlight from "@/components/magazine/SidebarSpotlight";
import FeaturedList from "@/components/magazine/FeaturedList";
import SpecialEdition from "@/components/magazine/SpecialEdition";
import NumberedList from "@/components/magazine/NumberedList";
import CardGrid from "@/components/magazine/CardGrid";
import NewsletterForm from "@/components/magazine/NewsletterForm";
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

  // Sidebar Spotlight: Second op-ed article
  const spotlightArticle = opEdArticles[1];

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

  // Special Edition: Third op-ed article
  const specialArticle = opEdArticles[2];

  // Insights Grid: Remaining op-eds
  const insightsCards = opEdArticles.slice(3, 9).map((article) => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    imageUrl: article.imageUrl || undefined,
    source: article.source || undefined,
    href: `/article/${article.id}`,
  }));

  // Reports Grid: Policy/regulation articles
  const reportsCards = articles
    ?.filter((article) => article.category === "policy" || article.category === "regulation")
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
              {/* Main Grid Layout */}
              <div className="grid lg:grid-cols-[2.2fr_1fr] gap-6 mb-12">
                {/* Left Column: Hero Feature */}
                <div>
                  {heroArticle ? (
                    <HeroFeature
                      kicker="Regulatory Intelligence"
                      title={heroArticle.title}
                      excerpt={heroArticle.excerpt}
                      imageUrl={heroArticle.imageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop"}
                      href={`/article/${heroArticle.id}`}
                      ctaText="Explore Updates"
                    />
                  ) : (
                    <HeroFeature
                      kicker="Regulatory Intelligence"
                      title="Saudi Arabia Leads MENA in AI Adoption with $25B Investment"
                      excerpt="Comprehensive tracking of AI policy developments, regulatory frameworks, and compliance requirements across the Kingdom and GCC region."
                      imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop"
                      href="/regulatory-intelligence"
                      ctaText="Explore Updates"
                    />
                  )}
                </div>

                {/* Right Column: Sidebar */}
                <div className="space-y-6">
                  {/* Spotlight Card */}
                  {spotlightArticle && (
                    <SidebarSpotlight
                      category={spotlightArticle.category}
                      title={spotlightArticle.title}
                      imageUrl={spotlightArticle.imageUrl || undefined}
                      href={`/article/${spotlightArticle.id}`}
                      source={spotlightArticle.source || undefined}
                    />
                  )}

                  {/* Featured News List */}
                  {featuredNews.length > 0 && (
                    <FeaturedList title="Featured News" items={featuredNews} />
                  )}

                  {/* Quick Links */}
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-black text-white mb-4 border-b border-white/10 pb-3">
                      Quick Links
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/regulatory-intelligence"
                          className="text-sm text-[#00d4aa] hover:text-[#00a888] transition-colors font-semibold"
                          data-testid="link-quick-regulatory"
                        >
                          Regulatory Intelligence →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/reports"
                          className="text-sm text-[#00d4aa] hover:text-[#00a888] transition-colors font-semibold"
                          data-testid="link-quick-reports"
                        >
                          Latest Reports →
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact"
                          className="text-sm text-[#ff00ff] hover:text-[#cc00cc] transition-colors font-semibold"
                          data-testid="link-quick-newsletter"
                        >
                          Get In Touch →
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Below Hero: Most Recents + Special Edition */}
              <div className="grid lg:grid-cols-[1fr_2fr] gap-6 mb-12">
                {/* Most Recents (left column) */}
                {mostRecents.length > 0 && (
                  <NumberedList title="Most Recents" items={mostRecents} />
                )}

                {/* Special Edition (right column) */}
                {specialArticle && (
                  <SpecialEdition
                    title="Research & Technology Policy Spotlight"
                    subtitle={specialArticle.title}
                    description={specialArticle.excerpt}
                    imageUrl={specialArticle.imageUrl || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"}
                    href={`/article/${specialArticle.id}`}
                    ctaText="Read Analysis"
                  />
                )}
              </div>

              {/* Category Grids */}
              <div className="space-y-16">
                {/* Insights Grid */}
                {insightsCards.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-black text-white">
                        AI Advisory & Insights
                      </h2>
                      <Link
                        href="/insights"
                        className="text-sm text-[#00d4aa] hover:text-[#00a888] font-semibold"
                        data-testid="link-view-all-insights"
                      >
                        View All →
                      </Link>
                    </div>
                    <CardGrid title="" cards={insightsCards} columns={3} />
                  </section>
                )}

                {/* Reports Grid */}
                {reportsCards.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-black text-white">
                        Reports & Policy Briefs
                      </h2>
                      <Link
                        href="/reports"
                        className="text-sm text-[#00d4aa] hover:text-[#00a888] font-semibold"
                        data-testid="link-view-all-reports"
                      >
                        View All →
                      </Link>
                    </div>
                    <CardGrid title="" cards={reportsCards} columns={3} />
                  </section>
                )}

                {/* Newsletter CTA */}
                <section className="grid lg:grid-cols-2 gap-6 items-center">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                      Stay Ahead of the AI Curve
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                      Get weekly insights on AI policy, regulation, and strategic developments shaping Saudi Arabia's digital future.
                    </p>
                  </div>
                  <div>
                    <NewsletterForm />
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
