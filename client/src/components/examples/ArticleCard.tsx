import ArticleCard from '../ArticleCard';
import heroImage from '@assets/generated_images/AI_policy_hero_image_e5e8bfa6.png';
import thumbnailImage from '@assets/generated_images/AI_regulation_news_thumbnail_f02ad3d3.png';

const sampleArticle = {
  id: "1",
  title: "Saudi Arabia Announces New AI Governance Framework for 2025",
  excerpt: "The Kingdom unveils comprehensive regulations addressing artificial intelligence deployment across government sectors, setting new standards for the GCC region.",
  author: "Dr. Ahmed Al-Rashid",
  publishedAt: "2 hours ago",
  readTime: "5 min read",
  category: "AI Policy",
  imageUrl: heroImage,
  slug: "saudi-ai-governance-framework-2025"
};

const compactArticle = {
  id: "2", 
  title: "New AI Ethics Guidelines Released by CITC",
  excerpt: "Communications and Information Technology Commission outlines ethical AI principles.",
  author: "Sarah Al-Mahmoud",
  publishedAt: "4 hours ago", 
  readTime: "3 min read",
  category: "Regulation",
  imageUrl: thumbnailImage,
  slug: "citc-ai-ethics-guidelines"
};

export default function ArticleCardExample() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Featured Article</h3>
        <ArticleCard article={sampleArticle} variant="featured" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Standard Article</h3>
        <div className="max-w-sm">
          <ArticleCard article={sampleArticle} variant="standard" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Compact Article</h3>
        <div className="max-w-md">
          <ArticleCard article={compactArticle} variant="compact" />
        </div>
      </div>
    </div>
  );
}