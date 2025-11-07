import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface SpecialEditionProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  href: string;
  ctaText?: string;
}

export default function SpecialEdition({
  title,
  subtitle,
  description,
  imageUrl,
  href,
  ctaText = "Explore"
}: SpecialEditionProps) {
  return (
    <Link href={href} data-testid="link-special-edition">
      <div className="glass-card group overflow-hidden hover:scale-[1.01] transition-all duration-300 cursor-pointer">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Text Content */}
          <div className="p-8 flex flex-col justify-center order-2 lg:order-1">
            <span className="eyebrow mb-3 block">{title}</span>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 group-hover:text-[#00d4aa] transition-colors leading-tight">
              {subtitle}
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-2 text-[#00d4aa] font-semibold group-hover:gap-4 transition-all">
              <span>{ctaText}</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
          
          {/* Image */}
          <div className="aspect-video lg:aspect-auto order-1 lg:order-2 overflow-hidden">
            <img
              src={imageUrl}
              alt={subtitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
