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
      {/* The Verge-style Hero Section */}
      <div className="verge-hero verge-divider">
        <div className="verge-hero-bg-text">
          The Aqool
        </div>
        <div className="verge-hero-content">
          <h1 className="verge-hero-logo" data-testid="text-hero-logo">
            The Aqool
          </h1>
          <p className="verge-body-text text-xl text-gray-600 max-w-2xl mx-auto" data-testid="text-hero-description">
            The latest news and analysis on artificial intelligence policy and regulation in Saudi Arabia and the GCC region.
          </p>
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

          </div>
        </div>
      </div>
    </div>
  );
}