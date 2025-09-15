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
    <header className="border-b border-gray-200 px-6 lg:px-20 py-4 bg-white">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-extrabold text-black text-3xl lg:text-4xl" data-testid="link-home">
          The Aqool <span className="neon-flicker text-[#2dd4bf]">(ai)</span>
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
          <Link 
            href="/contact" 
            className="text-black font-medium hover:text-blue-400 transition-colors ml-8 bg-[#2dd4bf] hover:bg-[#14b8a6] px-4 py-2 rounded-md text-white hover:text-white"
            data-testid="link-contact"
          >
            Get In Touch
          </Link>
          <Link 
            href="#account" 
            className="flex items-center space-x-2 text-black font-medium hover:text-blue-400 transition-colors ml-4"
            data-testid="link-account"
          >
            <span className="w-3 h-3 rounded-full bg-[#5200FF]"></span>
            <span>Account</span>
          </Link>
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
              <Link
                href="/contact"
                className="text-lg font-medium bg-[#2dd4bf] hover:bg-[#14b8a6] px-4 py-2 rounded-md text-white text-center"
                data-testid="link-nav-mobile-contact"
              >
                Get In Touch
              </Link>
              
              <div className="pt-4 border-t border-gray-200">
                <Link href="#account" className="flex items-center space-x-2 text-black hover:text-blue-400 transition-colors">
                  <User className="h-4 w-4 text-purple-500" />
                  <span className="text-lg font-medium">Account</span>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}