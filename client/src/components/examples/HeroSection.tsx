import HeroSection from '../HeroSection';
import heroImage from '@assets/generated_images/AI_policy_hero_image_e5e8bfa6.png';

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

export default function HeroSectionExample() {
  return <HeroSection featuredArticle={featuredArticle} />;
}