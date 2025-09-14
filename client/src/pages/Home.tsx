import ArticleCard from "@/components/ArticleCard";
import HeroSection from "@/components/HeroSection";
import { Link } from "wouter";

// TODO: Remove mock data - replace with API calls
import heroImage from '@assets/generated_images/AI_policy_hero_image_e5e8bfa6.png';
import thumbnailImage from '@assets/generated_images/AI_regulation_news_thumbnail_f02ad3d3.png';

const featuredArticle = {
  id: "hero-1",
  title: "OpenAI's Funding Challenges Loom Over Oracle, Broadcom Deal Spree",
  source: "Wall Street Journal",
  excerpt: "World's largest startup needs more paying users, but it isn't clear whether they will materialize soon. OpenAI has committed to spend around $60 billion a year for computing from Oracle, shell out $18 billion on a data-center venture, and purchase $10 billion of customized chips.",
  author: "Eliot Brown and Bradley Olson",
  publishedAt: "September 11, 2025",
  category: "AI Business",
  imageUrl: heroImage,
  slug: "openai-funding-challenges-oracle-broadcom",
  externalUrl: "https://www.wsj.com/tech/ai/openais-funding-challenges-loom-over-oracle-broadcom-deal-spree-be353399?mod=tech_lead_story",
  comments: 89
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
    <div className="bg-background">
      <HeroSection />
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 pl-[16px] pr-[16px] pt-[70px] pb-[70px] bg-[#242424]">
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
                <h2 className="verge-headline-medium text-white" data-testid="text-section-latest">
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
          <div className="space-y-8" data-testid="sidebar-container">
            {/* Most Popular - Verge Style */}
            <div>
              <h3 className="verge-headline-medium mb-6 pb-3 verge-divider text-[#2dd4bf]" data-testid="text-sidebar-popular">
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
                          <h4 className="verge-headline-small text-white group-hover:text-primary transition-colors leading-tight mb-1">
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

            {/* Newsletter Section */}
            <div>
              <div className="w-full h-1 mb-6 bg-[#a855f7]"></div>
              <h3 className="verge-headline-medium text-white mb-6" data-testid="text-sidebar-newsletter">
                Newsletter
              </h3>
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                  Get weekly AI policy insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
                    data-testid="input-newsletter-email"
                  />
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium transition-colors"
                    data-testid="button-newsletter-subscribe"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* News Section */}
            <div>
              <div className="w-full h-1 bg-blue-500 mb-6"></div>
              <h3 className="verge-headline-medium text-white mb-6" data-testid="text-sidebar-news">
                News
              </h3>
              <div className="space-y-4">
                {latestArticles.slice(0, 3).map((article, index) => (
                  <div key={article.id} className="group cursor-pointer" data-testid={`item-news-${index}`}>
                    <Link href={`/article/${article.slug}`}>
                      <div>
                        <h4 className="verge-headline-small text-white group-hover:text-blue-500 transition-colors leading-tight mb-1">
                          {article.title}
                        </h4>
                        <div className="verge-meta-text text-gray-400 text-sm">
                          {article.publishedAt}
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