import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface HeroArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
}

interface HeroSectionProps {
  featuredArticle: HeroArticle;
}

export default function HeroSection({ featuredArticle }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Background with Gradient Overlay */}
      <div className="relative h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={featuredArticle.imageUrl}
            alt={featuredArticle.title}
            className="w-full h-full object-cover"
            data-testid="img-hero-background"
          />
          {/* Dark gradient wash for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl">
            {/* Category Badge */}
            <Badge 
              variant="outline" 
              className="mb-4 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20"
              data-testid="badge-hero-category"
            >
              {featuredArticle.category}
            </Badge>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
              {featuredArticle.title}
            </h1>
            
            {/* Excerpt */}
            <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed" data-testid="text-hero-excerpt">
              {featuredArticle.excerpt}
            </p>
            
            {/* Author and Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-white/80">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span data-testid="text-hero-author">{featuredArticle.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span data-testid="text-hero-readtime">{featuredArticle.readTime}</span>
              </div>
              <span data-testid="text-hero-date">{featuredArticle.publishedAt}</span>
            </div>
            
            {/* CTA Button */}
            <Link href={`/article/${featuredArticle.slug}`}>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20"
                data-testid="button-hero-read"
              >
                Read Full Article
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}