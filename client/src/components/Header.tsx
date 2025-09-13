import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";

export default function Header() {
  const navigation = [
    { name: "Policy", href: "#policy" },
    { name: "Regulation", href: "#regulation" },
    { name: "Analysis", href: "#analysis" },
  ];

  return (
    <div className="hero-section px-20 py-15 pt-[20px] pb-[20px] mt-[0px] mb-[0px] ml-[0px] mr-[0px] bg-black min-h-screen">
      {/* Navigation Header */}
      <header className="flex justify-between items-center mb-15">
        <Link href="/" className="font-extrabold text-white text-[64px]" data-testid="link-home">
          The Aqool
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 text-[20px]">
          <div className="flex items-center space-x-2">
            {navigation.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <Link
                  href={item.href}
                  className="text-white font-medium hover:text-gray-300 transition-colors"
                  data-testid={`link-nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
                {index < navigation.length - 1 && <span className="text-white mx-3">/</span>}
              </div>
            ))}
          </div>
          <Link 
            href="#tools" 
            className="text-white font-medium hover:text-gray-300 transition-colors ml-8"
            data-testid="link-nav-new-ai-tools"
          >
            New AI Tools
          </Link>
          <Link 
            href="#account" 
            className="flex items-center space-x-2 text-white font-medium hover:text-gray-300 transition-colors ml-8"
            data-testid="link-account"
          >
            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
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
          <SheetContent side="right" className="w-80 bg-black text-white border-l border-gray-700">
            <div className="flex flex-col space-y-6 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-gray-300 text-white"
                  data-testid={`link-nav-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <Link href="#account" className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors">
                  <User className="h-4 w-4 text-purple-500" />
                  <span className="text-lg font-medium">Account</span>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>
      {/* Tagline Section */}
      <section className="max-w-4xl relative">
        {/* Vertical teal line */}
        <div className="absolute left-0 top-0 w-1 h-full bg-teal-400"></div>
        
        <div className="pl-12">
          <h1 className="font-extrabold mb-8 text-white text-[80px] leading-tight" data-testid="text-headline">
            AI Policy.<br/>
            Regulation.<br/>
            Innovation.
          </h1>
          <div className="text-white text-[24px] leading-relaxed space-y-2" data-testid="text-subheadline">
            <div>Sharp Insights.</div>
            <div>Weekly Analysis for Stakeholders.</div>
            <div className="text-teal-400 mt-4">Straight from Riyadh.</div>
          </div>
        </div>
      </section>
    </div>
  );
}