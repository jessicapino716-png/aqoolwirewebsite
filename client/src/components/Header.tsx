import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";

export default function Header() {
  const navigation = [
    { name: "/ Policy", href: "#policy" },
    { name: "/ Regulation", href: "#regulation" },
    { name: "/ Analysis", href: "#analysis" },
    { name: "/ New AI Tools", href: "#tools" },
    { name: "/ Newsletter", href: "#newsletter" },
  ];

  return (
    <div className="hero-section px-20 py-15 pt-[20px] pb-[20px] mt-[0px] mb-[0px] ml-[0px] mr-[0px] bg-[#f5f5f0]">
      {/* Navigation Header */}
      <header className="flex justify-between items-center mb-15">
        <Link href="/" className="font-extrabold text-black text-[70px]" data-testid="link-home">
          The Aqool <span className="font-semibold text-[#3cd698]">(ai)</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-[18px]">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-gray-700 font-medium hover:text-gray-900 transition-colors group"
              data-testid={`link-nav-${item.name.toLowerCase().replace(' ', '-')}`}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Link 
            href="#account" 
            className="flex items-center space-x-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
            data-testid="link-account"
          >
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            <span>Account</span>
          </Link>
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2" aria-label="Open menu" data-testid="button-mobile-menu">
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
      </header>
      {/* Separator line */}
      <div className="border-t border-gray-300 mb-8 text-[#5e43e0]"></div>
      {/* Tagline Section */}
      <section className="max-w-3xl">
        <h1 className="font-extrabold mb-5 text-[25px] pt-[5px] pb-[5px] pl-[0px] pr-[0px] text-[#0a0a0a]" data-testid="text-headline">
          AI Policy.    Regulation.    Innovation.
        </h1>
        <p className="text-xl leading-relaxed text-gray-600" data-testid="text-subheadline">
          Straight from the Gulf.<br />
          Sharp Insights.<br />
          Weekly Analysis.
        </p>
      </section>
    </div>
  );
}