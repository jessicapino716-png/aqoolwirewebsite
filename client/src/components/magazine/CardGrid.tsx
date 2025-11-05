import { Link } from "wouter";
import { ExternalLink } from "lucide-react";

interface GridCard {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  source?: string;
  href: string;
}

interface CardGridProps {
  title: string;
  cards: GridCard[];
  columns?: 2 | 3;
}

export default function CardGrid({ title, cards, columns = 3 }: CardGridProps) {
  const gridCols = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  
  return (
    <div>
      {title && <h2 className="text-3xl font-black text-white mb-6">{title}</h2>}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-6`}>
        {cards.map((card) => (
          <Link key={card.id} href={card.href} data-testid={`link-card-${card.id}`}>
            <div className="glass-card group overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full">
              {card.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="eyebrow">{card.category}</span>
                  {card.source && (
                    <>
                      <span className="text-gray-600">•</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        {card.source}
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00d4aa] transition-colors mb-2 line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-gray-400 line-clamp-3 leading-relaxed text-sm">
                  {card.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
