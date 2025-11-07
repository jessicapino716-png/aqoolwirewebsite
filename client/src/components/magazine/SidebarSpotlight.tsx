import { Link } from "wouter";
import { ExternalLink } from "lucide-react";

interface SidebarSpotlightProps {
  category: string;
  title: string;
  imageUrl?: string;
  href: string;
  source?: string;
}

export default function SidebarSpotlight({
  category,
  title,
  imageUrl,
  href,
  source
}: SidebarSpotlightProps) {
  return (
    <Link href={href} data-testid="link-sidebar-spotlight">
      <div className="glass-card group overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        {imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4">
          <span className="eyebrow mb-2 block">{category}</span>
          <h3 className="text-lg font-bold text-white group-hover:text-[#00d4aa] transition-colors line-clamp-2">
            {title}
          </h3>
          {source && (
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              {source}
              <ExternalLink className="w-3 h-3" />
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
