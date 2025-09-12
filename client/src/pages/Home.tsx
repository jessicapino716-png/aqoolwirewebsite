import ArticleCard from "@/components/ArticleCard";
import { Link } from "wouter";

// TODO: Remove mock data - replace with API calls
import heroImage from '@assets/generated_images/AI_policy_hero_image_e5e8bfa6.png';
import thumbnailImage from '@assets/generated_images/AI_regulation_news_thumbnail_f02ad3d3.png';

const featuredArticle = {
  id: "hero-1",
  title: "Saudi Arabia Leads Middle East in AI Governance Innovation",
  excerpt: "The Kingdom's comprehensive artificial intelligence regulatory framework is setting new standards across the GCC region and attracting global attention from policymakers worldwide.",
  author: "Dr. Ahmed Al-Rashid",
  publishedAt: "2 hours ago",
  category: "Featured Analysis",
  imageUrl: heroImage,
  slug: "saudi-ai-governance-innovation",
  comments: 42
};

const featuredArticles = [
  {
    id: "featured-1",
    title: "UAE and Saudi Arabia Sign Historic AI Cooperation Agreement",
    excerpt: "Bilateral agreement establishes joint AI research initiatives and shared regulatory standards.",
    author: "Dr. Ahmed Al-Rashid",
    publishedAt: "4 hours ago",
    category: "Policy",
    imageUrl: thumbnailImage,
    slug: "uae-saudi-ai-cooperation",
    comments: 28
  },
  {
    id: "featured-2", 
    title: "CITC Releases New AI Ethics Guidelines for Financial Sector",
    excerpt: "Communications and Information Technology Commission unveils comprehensive ethical framework.",
    author: "Sarah Al-Mahmoud",
    publishedAt: "6 hours ago",
    category: "Regulation",
    imageUrl: thumbnailImage,
    slug: "citc-ai-ethics-financial",
    comments: 19
  }
];

const latestArticles = [
  {
    id: "latest-1",
    title: "Vision 2030: AI's Role in Smart City Development",
    excerpt: "Analysis of how artificial intelligence initiatives align with Saudi Arabia's ambitious urban development goals.",
    author: "Mohammed Al-Zahrani",
    publishedAt: "8 hours ago", 
    category: "Analysis",
    imageUrl: thumbnailImage,
    slug: "vision-2030-ai-smart-cities",
    comments: 15
  },
  {
    id: "latest-2",
    title: "NEOM's AI-Powered Infrastructure Takes Shape",
    excerpt: "Latest developments in the mega-city's artificial intelligence backbone and smart systems integration.",
    author: "Fatima Al-Zahra",
    publishedAt: "10 hours ago",
    category: "Technology",
    imageUrl: thumbnailImage,
    slug: "neom-ai-infrastructure",
    comments: 23
  },
  {
    id: "latest-3",
    title: "GCC AI Regulatory Framework: A Comparative Study",
    excerpt: "Deep dive into how different Gulf states are approaching artificial intelligence governance and policy development.",
    author: "Dr. Ahmed Al-Rashid",
    publishedAt: "1 day ago",
    category: "Policy",
    imageUrl: thumbnailImage,
    slug: "gcc-ai-regulatory-framework",
    comments: 31
  },
  {
    id: "latest-4",
    title: "AI in Healthcare: Saudi Arabia's Digital Transformation",
    excerpt: "How the Kingdom is leveraging artificial intelligence to revolutionize healthcare delivery and patient outcomes.",
    author: "Dr. Amina Hassan",
    publishedAt: "1 day ago",
    category: "Healthcare",
    imageUrl: thumbnailImage,
    slug: "ai-healthcare-saudi-transformation",
    comments: 18
  },
  {
    id: "latest-5",
    title: "Quantum Computing and AI: The Next Frontier",
    excerpt: "Exploring the intersection of quantum technologies and artificial intelligence in the Middle East research landscape.",
    author: "Prof. Omar Al-Kindi",
    publishedAt: "2 days ago",
    category: "Research",
    imageUrl: thumbnailImage,
    slug: "quantum-computing-ai-frontier",
    comments: 12
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header with Verge styling */}
      <div className="bg-white verge-divider">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-4">
            <h1 className="verge-headline-hero text-black mb-4" data-testid="text-page-title">
              AI Policy
            </h1>
            <p className="verge-body-text text-xl" data-testid="text-page-description">
              The latest news and analysis on artificial intelligence policy and regulation in Saudi Arabia and the GCC region.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Hero Article */}
            <div className="mb-12">
              <ArticleCard article={featuredArticle} variant="hero" />
            </div>

            {/* Verge-style Off-Lede Stories */}
            <div className="mb-12">
              <div className="verge-divider mb-8"></div>
              <div className="space-y-8">
                {featuredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="featured" />
                ))}
              </div>
            </div>

            {/* Latest in AI Policy - Verge River Style */}
            <div>
              <div className="verge-divider mb-8"></div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="verge-headline-medium text-black" data-testid="text-section-latest">
                  Latest in AI Policy
                </h2>
                <Link href="/policy">
                  <span className="verge-category-label text-primary hover:text-primary/80 transition-colors" data-testid="link-view-all">
                    View all
                  </span>
                </Link>
              </div>
              <div className="space-y-0">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="list" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Most Popular - Verge Style */}
            <div>
              <h3 className="verge-headline-medium text-black mb-6 pb-3 verge-divider" data-testid="text-sidebar-popular">
                Most Popular
              </h3>
              <div className="space-y-6">
                {latestArticles.slice(0, 5).map((article, index) => (
                  <div key={article.id} className="group cursor-pointer" data-testid={`item-popular-${index}`}>
                    <Link href={`/article/${article.slug}`}>
                      <div className="flex items-start gap-4">
                        <span className="text-3xl font-black text-gray-300 flex-shrink-0 mt-1 verge-headline-large">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h4 className="verge-headline-small text-black group-hover:text-primary transition-colors leading-tight mb-1">
                            {article.title}
                          </h4>
                          <div className="verge-meta-text">
                            {article.author} • {article.publishedAt}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Tools - Verge Style */}
            <div>
              <h3 className="verge-headline-medium text-black mb-6 pb-3 verge-divider" data-testid="text-sidebar-tools">
                AI Tools
              </h3>
              <div className="space-y-4">
                <div className="group cursor-pointer">
                  <div className="border-2 border-gray-200 rounded p-6 hover:border-primary transition-colors">
                    <h4 className="verge-headline-small text-black group-hover:text-primary transition-colors mb-3">
                      Claude AI Assistant
                    </h4>
                    <p className="verge-body-text mb-3">
                      Advanced AI assistant for policy analysis and regulatory research.
                    </p>
                    <span className="verge-category-label bg-primary text-white px-3 py-1 rounded">
                      Featured
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter - Verge Style */}
            <div>
              <h3 className="verge-headline-medium text-black mb-6 pb-3 verge-divider" data-testid="text-sidebar-newsletter">
                Newsletter
              </h3>
              <div className="border-2 border-gray-200 rounded p-6">
                <h4 className="verge-headline-small text-black mb-3">
                  The Aqool AI Weekly
                </h4>
                <p className="verge-body-text mb-6">
                  Get the latest AI policy updates delivered to your inbox every Friday.
                </p>
                <button className="w-full bg-black text-white px-6 py-3 rounded verge-category-label hover:bg-gray-800 transition-colors" data-testid="button-newsletter-subscribe">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}