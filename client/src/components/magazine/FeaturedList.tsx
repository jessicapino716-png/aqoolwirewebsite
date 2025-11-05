import { Link } from "wouter";

interface FeaturedItem {
  id: string;
  title: string;
  href: string;
  category?: string;
}

interface FeaturedListProps {
  title: string;
  items: FeaturedItem[];
}

export default function FeaturedList({ title, items }: FeaturedListProps) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-black text-white mb-4 border-b border-white/10 pb-3">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.href}>
              <div className="group cursor-pointer" data-testid={`link-featured-${item.id}`}>
                {item.category && (
                  <span className="text-xs text-[#00d4aa] font-semibold uppercase tracking-wide">
                    {item.category}
                  </span>
                )}
                <p className="text-sm text-gray-300 group-hover:text-[#00d4aa] transition-colors leading-snug mt-1">
                  {item.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
