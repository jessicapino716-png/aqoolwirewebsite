import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import ThemeControls from "@/components/ThemeControls";

export default function Header() {
  const navigation = [
    { name: "Policy", href: "/policy" },
    { name: "Regulation", href: "/regulation" },
    { name: "Analysis", href: "/analysis" },
  ];

  return (
    <header className="px-6 lg:px-20 py-4 bg-white relative">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center font-extrabold text-3xl lg:text-4xl" data-testid="link-home">
          <div className="logo-container">
            <div className="logo-base text-[40px]">
              The Aqool <span className="wire-text">Wire</span>
            </div>
            <div className="electrical-line"></div>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex items-center gap-4 text-lg">
            {navigation.map((item, index) => (
              <div key={item.name} className="flex items-center gap-4">
                <span className="text-[#3b82f6] font-black text-2xl scale-x-150 inline-block">/</span>
                <Link
                  href={item.href}
                  className="text-black font-bold hover:text-[#3b82f6] transition-colors"
                  data-testid={`link-nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            <div className="flex items-center gap-4">
              <span className="text-[#3b82f6] font-black text-2xl scale-x-150 inline-block">/</span>
              <Link 
                href="/tools" 
                className="text-black font-bold hover:text-[#3b82f6] transition-colors"
                data-testid="link-nav-new-ai-tools"
              >
                New AI Tools
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#3b82f6] font-black text-2xl scale-x-150 inline-block">/</span>
              <Link 
                href="/newsletter" 
                className="text-black font-bold hover:text-[#3b82f6] transition-colors"
                data-testid="link-nav-newsletter"
              >
                Newsletter
              </Link>
            </div>
          </nav>
          
          <ThemeControls />
        </div>

        {/* Mobile Menu and Theme Controls */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeControls />
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-black" aria-label="Open menu" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white text-black border-l border-gray-200">
            <div className="flex flex-col space-y-6 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-[#3b82f6] text-black"
                  data-testid={`link-nav-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/tools"
                className="text-lg font-medium transition-colors hover:text-[#3b82f6] text-black"
                data-testid="link-nav-mobile-new-ai-tools"
              >
                New AI Tools
              </Link>
              <Link
                href="/newsletter"
                className="text-lg font-medium transition-colors hover:text-[#3b82f6] text-black"
                data-testid="link-nav-mobile-newsletter"
              >
                Newsletter
              </Link>
            </div>
          </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Gradient bottom border line covering 90% of the width */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] h-0.5 bg-black"></div>
    </header>
  );
}