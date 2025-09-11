import HeroSection from "@/components/HeroSection";
import ArticleCard from "@/components/ArticleCard";
import ToolHighlight from "@/components/ToolHighlight";
import AuthorProfile from "@/components/AuthorProfile";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Newspaper, Gavel, PenTool } from "lucide-react";
import { Link } from "wouter";

// TODO: Remove mock data - replace with API calls
import heroImage from '@assets/generated_images/AI_policy_hero_image_e5e8bfa6.png';
import thumbnailImage from '@assets/generated_images/AI_regulation_news_thumbnail_f02ad3d3.png';
import toolImage from '@assets/generated_images/AI_tools_showcase_image_6a7339f5.png';
import authorImage from '@assets/generated_images/Author_profile_picture_464b5283.png';

const featuredArticle = {
  id: "hero-1",
  title: "Saudi Arabia Leads Middle East in AI Governance Innovation",
  excerpt: "Comprehensive analysis of the Kingdom's groundbreaking artificial intelligence regulatory framework that's setting new standards across the GCC region and attracting global attention from policymakers.",
  author: "Dr. Ahmed Al-Rashid",
  publishedAt: "2 hours ago",
  readTime: "8 min read",
  category: "Featured Analysis",
  imageUrl: heroImage,
  slug: "saudi-ai-governance-innovation"
};

const recentArticles = [
  {
    id: "article-1",
    title: "UAE and Saudi Arabia Sign AI Cooperation Agreement",
    excerpt: "Historic bilateral agreement establishes joint AI research initiatives and shared regulatory standards across the Emirates and Kingdom.",
    author: "Dr. Ahmed Al-Rashid",
    publishedAt: "4 hours ago",
    readTime: "5 min read",
    category: "Policy",
    imageUrl: thumbnailImage,
    slug: "uae-saudi-ai-cooperation"
  },
  {
    id: "article-2", 
    title: "CITC Releases New AI Ethics Guidelines for Financial Sector",
    excerpt: "Communications and Information Technology Commission unveils comprehensive ethical framework for AI deployment in banking and fintech.",
    author: "Sarah Al-Mahmoud",
    publishedAt: "6 hours ago",
    readTime: "4 min read",
    category: "Regulation",
    imageUrl: thumbnailImage,
    slug: "citc-ai-ethics-financial"
  },
  {
    id: "article-3",
    title: "Vision 2030: AI's Role in Smart City Development",
    excerpt: "Analysis of how artificial intelligence initiatives align with Saudi Arabia's ambitious urban development goals.",
    author: "Mohammed Al-Zahrani",
    publishedAt: "8 hours ago", 
    readTime: "6 min read",
    category: "Analysis",
    imageUrl: thumbnailImage,
    slug: "vision-2030-ai-smart-cities"
  }
];

const featuredTool = {
  id: "tool-1",
  name: "Claude AI Assistant",
  description: "Advanced AI assistant for policy analysis, document review, and regulatory research. Specifically trained on Saudi AI governance frameworks and GCC policy documents.",
  category: "AI Assistant",
  rating: 4,
  features: ["Policy Analysis", "Document Review", "Multi-language Support", "Regulatory Research"],
  pros: ["Excellent understanding of Saudi AI policy context", "Multi-language support (Arabic/English)"],
  cons: ["Requires subscription for advanced features", "Limited customization options"],
  pricing: "Freemium",
  website: "https://claude.ai",
  imageUrl: toolImage
};

const author = {
  id: "author-1",
  name: "Dr. Ahmed Al-Rashid",
  title: "AI Policy Expert & Senior Analyst",
  bio: "Dr. Al-Rashid is a leading expert on artificial intelligence policy and regulation in the Middle East, with over 15 years of experience in technology governance.",
  location: "Riyadh, Saudi Arabia",
  expertise: ["AI Policy", "Technology Regulation", "Digital Governance"],
  imageUrl: authorImage,
  social: {
    twitter: "@ahmed_alrashid",
    linkedin: "ahmed-alrashid-phd",
    email: "ahmed@theaqoolai.com"
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection featuredArticle={featuredArticle} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Latest News Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Newspaper className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold" data-testid="text-section-latest-news">
                    Latest in AI Policy
                  </h2>
                </div>
                <Link href="/policy">
                  <Button variant="outline" size="sm" data-testid="button-view-all-news">
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="standard" />
                ))}
              </div>
            </section>

            {/* AI Tools Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Gavel className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold" data-testid="text-section-ai-tools">
                    AI Gavel of the Week
                  </h2>
                </div>
                <Link href="/tools">
                  <Button variant="outline" size="sm" data-testid="button-view-all-tools">
                    All Tools
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="max-w-md">
                <ToolHighlight tool={featuredTool} variant="featured" />
              </div>
            </section>

            {/* Weekly Op-Ed Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <PenTool className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold" data-testid="text-section-weekly-oped">
                  Weekly Op-Ed
                </h2>
              </div>
              <Card className="overflow-hidden hover-elevate group cursor-pointer" data-testid="card-weekly-oped">
                <div className="aspect-[16/9] overflow-hidden bg-gradient-to-r from-primary/20 to-primary/10">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <Badge className="mb-4" data-testid="badge-oped-category">Opinion</Badge>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors" data-testid="text-oped-title">
                        The Future of AI Regulation: Lessons from Saudi Arabia's Approach
                      </h3>
                      <p className="text-muted-foreground" data-testid="text-oped-excerpt">
                        An in-depth analysis of how the Kingdom's balanced approach to AI governance could serve as a model for emerging economies worldwide.
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span data-testid="text-oped-author">Dr. Ahmed Al-Rashid</span>
                      <span>•</span>
                      <span data-testid="text-oped-date">Monday, September 11</span>
                      <span>•</span>
                      <span data-testid="text-oped-readtime">12 min read</span>
                    </div>
                    <Link href="/opinion/future-ai-regulation-saudi-approach">
                      <Button variant="ghost" size="sm" data-testid="button-read-oped">
                        Read Article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Newsletter Signup */}
            <NewsletterSignup variant="sidebar" />

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" data-testid="text-trending-title">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Saudi AI Strategy 2030",
                  "GCC AI Governance Framework", 
                  "ChatGPT Regulation Updates",
                  "Digital ID and AI Privacy",
                  "AI in Financial Services"
                ].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-sm group-hover:text-primary transition-colors" data-testid={`text-trending-topic-${index}`}>
                      {topic}
                    </span>
                    <Badge variant="secondary" className="text-xs" data-testid={`badge-trending-count-${index}`}>
                      {Math.floor(Math.random() * 50) + 10}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Author Profile */}
            <div>
              <h3 className="text-lg font-semibold mb-4" data-testid="text-about-author">
                About the Author
              </h3>
              <AuthorProfile author={author} variant="compact" />
            </div>

            {/* Recent Articles Compact */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-recent-title">Recent Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentArticles.slice(0, 3).map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}