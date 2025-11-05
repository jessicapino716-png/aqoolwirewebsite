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

  // Top Spotlight: Second op-ed article (with Saudi map background)
  const topSpotlightArticle = opEdArticles[1];

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

  // Top Stories Grid: Mix of op-eds and external articles
  const topStoriesCards = [
    ...opEdArticles.slice(3, 5),
    ...externalArticles.slice(10, 12)
  ].map((article) => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    imageUrl: article.imageUrl || undefined,
    source: article.source || undefined,
    href: `/article/${article.id}`,
  }));

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
              {/* ROW 1: Hero Left + Top Spotlight & Featured News Right */}
              <div className="grid lg:grid-cols-[2fr_1fr] gap-6 mb-8">
                {/* Left Column: Hero Feature */}
                <div>
                  {heroArticle ? (
                    <HeroFeature
                      kicker="Leading Intelligence"
                      title={heroArticle.title}
                      excerpt={heroArticle.excerpt}
                      imageUrl={heroArticle.imageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop"}
                      href={`/article/${heroArticle.id}`}
                      ctaText="Read Analysis"
                    />
                  ) : (
                    <HeroFeature
                      kicker="Leading Intelligence"
                      title="Saudi Arabia Leads MENA in AI Adoption with $25B Investment"
                      excerpt="Comprehensive tracking of AI policy developments, regulatory frameworks, and compliance requirements across the Kingdom and GCC region."
                      imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop"
                      href="/regulatory-intelligence"
                      ctaText="Read Analysis"
                    />
                  )}
                </div>

                {/* Right Column: Top Spotlight + Featured News */}
                <div className="space-y-6">
                  {/* Top Spotlight Card with Saudi Map Background */}
                  {topSpotlightArticle ? (
                    <TopSpotlightCard
                      kicker={topSpotlightArticle.category}
                      title={topSpotlightArticle.title}
                      href={`/article/${topSpotlightArticle.id}`}
                      showMapBackground={true}
                    />
                  ) : (
                    <TopSpotlightCard
                      kicker="Regulatory Intelligence"
                      title="SDAIA Announces New AI Governance Framework for 2025"
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
                {/* Most Recents (left column) */}
                {mostRecents.length > 0 && (
                  <NumberedList title="Most Recents" items={mostRecents} />
                )}

                {/* Special Edition (right column) */}
                {specialArticle ? (
                  <SpecialEdition
                    title="Research & Technology Policy"
                    subtitle={specialArticle.title}
                    description={specialArticle.excerpt}
                    imageUrl={specialArticle.imageUrl || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"}
                    href={`/article/${specialArticle.id}`}
                    ctaText="Read More"
                  />
                ) : (
                  <SpecialEdition
                    title="Research & Technology Policy"
                    subtitle="AI Research Priorities Align with Vision 2030 Goals"
                    description="Deep analysis of Saudi Arabia's AI research landscape, government funding initiatives, and academic partnerships shaping the future of innovation."
                    imageUrl="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"
                    href="/research-technology-policy"
                    ctaText="Read More"
                  />
                )}
              </div>

              {/* ROW 3: Top Stories Grid */}
              {topStoriesCards.length > 0 && (
                <section className="mb-12">
                  <div className="mb-6">
                    <h2 className="text-3xl font-black text-white">
                      Top Stories
                    </h2>
                  </div>
                  <CardGrid title="" cards={topStoriesCards} columns={2} />
                </section>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
