import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const navigation = [
    { name: "Policy", href: "/policy" },
    { name: "Regulation", href: "/regulation" },
    { name: "Analysis", href: "/analysis" },
    { name: "New AI Tools", href: "/tools" },
    { name: "Newsletter", href: "/newsletter" },
  ];

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" data-testid="link-home">
            <div className="text-2xl lg:text-3xl font-black">
              The Aqool <span className="text-[#00edc5]">Wire</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <span className="px-2 text-lg text-[#3b82f6]">/</span>
                <Link
                  href={item.href}
                  className="px-3 py-2 font-semibold text-gray-900 hover:text-[#f2007d] transition-colors text-[16px]"
                  data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right side - Menu */}
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors" 
                  aria-label="Open menu" 
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-6 w-6 text-gray-900" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <div className="flex flex-col space-y-1 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="px-4 py-3 text-base font-semibold transition-colors hover:bg-gray-100 text-gray-900 rounded-md"
                      data-testid={`link-nav-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}