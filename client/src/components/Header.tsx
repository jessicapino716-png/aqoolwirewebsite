import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  const navigation = [
    { name: "Regulatory Intelligence", href: "/regulatory-intelligence" },
    { name: "Research & Policy", href: "/research-technology-policy" },
    { name: "AI Advisory", href: "/ai-advisory" },
    { name: "Insights", href: "/insights" },
    { name: "Reports", href: "/reports" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-card-strong border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group focus-cyan" 
            data-testid="link-home"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#00e5ff] to-[#00a888] cyan-glow group-hover:scale-105 transition-transform">
              <span className="text-[#0a0f1b] font-black text-lg">AW</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xl font-black tracking-tight text-white">
                The Aqool <span className="text-[#00e5ff]">Wire</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                Intelligence Platform
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = location === item.href || 
                (item.href !== '/' && location.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-semibold transition-all focus-cyan rounded-md ${
                    isActive 
                      ? 'text-[#00e5ff] bg-[#00e5ff]/10' 
                      : 'text-gray-300 hover:text-[#00e5ff] hover:bg-white/5'
                  }`}
                  data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right side - Search + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-white/5 rounded-md transition-colors text-gray-300 hover:text-[#00e5ff] focus-cyan"
              aria-label="Search"
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button 
                  className="lg:hidden p-2 hover:bg-white/5 rounded-md transition-colors text-gray-300 hover:text-[#00e5ff] focus-cyan" 
                  aria-label="Open menu" 
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 glass-card-strong border-l border-white/10">
                <div className="flex flex-col space-y-1 mt-8">
                  {navigation.map((item) => {
                    const isActive = location === item.href || 
                      (item.href !== '/' && location.startsWith(item.href));
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`px-4 py-3 text-base font-semibold transition-all rounded-md focus-cyan ${
                          isActive
                            ? 'text-[#00e5ff] bg-[#00e5ff]/10'
                            : 'text-gray-300 hover:text-[#00e5ff] hover:bg-white/5'
                        }`}
                        data-testid={`link-nav-mobile-${item.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Search Bar (when open) */}
      {searchOpen && (
        <div className="border-t border-white/10 px-4 py-3 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <input
              type="search"
              placeholder="Search articles, reports, insights..."
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00e5ff]/50"
              autoFocus
              data-testid="input-search"
            />
          </div>
        </div>
      )}
    </header>
  );
}
