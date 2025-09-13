import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";

export default function Header() {
  const navigation = [
    { name: "Policy", href: "#policy" },
    { name: "Regulation", href: "#regulation" },
    { name: "Analysis", href: "#analysis" },
    { name: "New AI Tools", href: "#tools" },
    { name: "Newsletter", href: "#newsletter" },
  ];

  return (
    <div className="hero-section">
      {/* Navigation Header - Verge Style */}
      <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-extrabold text-white text-2xl tracking-wide" data-testid="link-home">
            The Aqool <span className="font-semibold text-[#bff47b]">(ai)</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-white/90 font-medium hover:text-white transition-colors group text-sm tracking-wide"
                data-testid={`link-nav-${item.name.toLowerCase().replace(' ', '-')}`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link 
              href="#account" 
              className="flex items-center space-x-2 text-white/90 font-medium hover:text-white transition-colors text-sm tracking-wide uppercase"
              data-testid="link-account"
            >
              <User className="h-4 w-4" />
              <span>Account</span>
            </Link>
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2 text-white" aria-label="Open menu" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white text-black border-l border-gray-200">
              <div className="flex flex-col space-y-6 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-gray-600 text-black"
                    data-testid={`link-nav-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-gray-200">
                  <Link href="#account" className="flex items-center space-x-2 text-black hover:text-indigo-500 transition-colors">
                    <User className="h-4 w-4 text-indigo-500" />
                    <span className="text-lg font-medium">Account</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      {/* Tagline Section */}
      <div className="bg-gray-50 px-20 py-15">
        <section className="max-w-3xl">
          <h1 className="font-extrabold mb-5 text-[25px] pt-[5px] pb-[5px] pl-[0px] pr-[0px] text-[#0a0a0a]" data-testid="text-headline">
            AI policy. Regulation. Innovation.
          </h1>
          <p className="text-xl leading-relaxed text-gray-600" data-testid="text-subheadline">
            Straight from the Gulf.<br />
            Sharp Insights.<br />
            Weekly Analysis.<br />
            Data-Backed Foresight
          </p>
        </section>
      </div>
    </div>
  );
}