import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface HeroFeatureProps {
  kicker: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  href: string;
  ctaText?: string;
}

export default function HeroFeature({
  kicker,
  title,
  excerpt,
  imageUrl,
  href,
  ctaText = "Read More"
}: HeroFeatureProps) {
  return (
    <Link href={href} data-testid="link-hero-feature">
      <div className="relative aspect-video lg:aspect-[16/10] rounded-xl overflow-hidden group cursor-pointer">
        {/* Image */}
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
          <span className="kicker mb-3">{kicker}</span>
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 leading-tight group-hover:text-[#00e5ff] transition-colors">
            {title}
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 mb-6 max-w-3xl leading-relaxed">
            {excerpt}
          </p>
          <div className="flex items-center gap-2 text-[#00e5ff] font-semibold group-hover:gap-4 transition-all">
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
