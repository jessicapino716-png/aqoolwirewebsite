import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";

export default function Header() {
  const navigation = [
    { name: "Policy", href: "/policy" },
    { name: "Regulation", href: "/regulation" },
    { name: "Analysis", href: "/analysis" },
  ];

  return (
    <header className="px-6 lg:px-20 py-4 bg-white relative">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-extrabold text-black text-3xl lg:text-4xl" data-testid="link-home">
          The Aqool <span className="neon-flicker text-[#3b82f6]">(ai)</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 text-lg">
          <div className="flex items-center space-x-2">
            {navigation.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <span className="text-blue-500 mx-2">/</span>
                <Link
                  href={item.href}
                  className="text-black font-medium hover:text-blue-400 transition-colors"
                  data-testid={`link-nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <span className="text-blue-500 mx-2">/</span>
            <Link 
              href="/tools" 
              className="text-black font-medium hover:text-blue-400 transition-colors"
              data-testid="link-nav-new-ai-tools"
            >
              New AI Tools
            </Link>
          </div>
          <div className="flex items-center">
            <span className="text-blue-500 mx-2">/</span>
            <Link 
              href="/newsletter" 
              className="text-black font-medium hover:text-blue-400 transition-colors"
              data-testid="link-nav-newsletter"
            >
              Newsletter
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2 text-black" aria-label="Open menu" data-testid="button-mobile-menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white text-black border-l border-gray-200">
            <div className="flex flex-col space-y-6 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-blue-400 text-black"
                  data-testid={`link-nav-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/tools"
                className="text-lg font-medium transition-colors hover:text-blue-400 text-black"
                data-testid="link-nav-mobile-new-ai-tools"
              >
                New AI Tools
              </Link>
              <Link
                href="/newsletter"
                className="text-lg font-medium transition-colors hover:text-blue-400 text-black"
                data-testid="link-nav-mobile-newsletter"
              >
                Newsletter
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* Turquoise bottom border line covering 80% of the width */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-0.5 bg-teal-400"></div>
    </header>
  );
}