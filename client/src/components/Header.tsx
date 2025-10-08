import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import ThemeControls from "@/components/ThemeControls";
import logoImage from "@assets/generated_images/Minimalist_pink_blue_falcon_logo_647f33ad.png";

export default function Header() {
  const navigation = [
    { name: "Policy", href: "/policy" },
    { name: "Regulation", href: "/regulation" },
    { name: "Analysis", href: "/analysis" },
  ];

  return (
    <header className="px-6 lg:px-20 py-4 bg-white relative">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4" data-testid="link-home">
          <img 
            src={logoImage} 
            alt="The Aqool Wire" 
            className="w-20 h-20 lg:w-28 lg:h-28"
          />
          <div className="flex flex-col leading-none">
            <div className="text-sm lg:text-base font-light text-gray-600 tracking-wider">THE</div>
            <div className="text-2xl lg:text-4xl font-extrabold text-[#f2007d] -mt-0.5">
              Aqool
            </div>
            <div className="text-2xl lg:text-4xl font-extrabold text-[#3b82f6] -mt-1.5 tracking-tight">
              Wire
            </div>
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