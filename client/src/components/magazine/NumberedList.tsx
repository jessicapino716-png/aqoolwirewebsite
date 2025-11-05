import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";

interface NumberedItem {
  id: string;
  title: string;
  excerpt: string;
  source?: string;
  href: string;
  createdAt: string;
}

interface NumberedListProps {
  title: string;
  items: NumberedItem[];
}

export default function NumberedList({ title, items }: NumberedListProps) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-black text-white mb-6 border-b border-white/10 pb-3">
        {title}
      </h3>
      <div className="space-y-5">
        {items.slice(0, 5).map((item, index) => (
          <Link key={item.id} href={item.href}>
            <div className="group cursor-pointer flex gap-4" data-testid={`link-numbered-${item.id}`}>
              {/* Number */}
              <div className="flex-shrink-0">
                <span className="text-3xl font-black text-[#00e5ff] opacity-50 group-hover:opacity-100 transition-opacity">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white group-hover:text-[#00e5ff] transition-colors mb-1 line-clamp-2">
                  {item.title}
                </h4>
                {item.source && (
                  <p className="text-xs text-gray-500 mb-1">{item.source}</p>
                )}
                <p className="text-xs text-gray-400 line-clamp-1">{item.excerpt}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
