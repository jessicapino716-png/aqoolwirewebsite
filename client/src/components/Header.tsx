import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mail, Newspaper } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  
  const navigation = [
    { name: "Policy", href: "/policy" },
    { name: "Regulation", href: "/regulation" },
    { name: "Analysis", href: "/analysis" },
    { name: "AI Tools", href: "/tools" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 lg:px-20 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="group flex items-center space-x-3" data-testid="link-home">
          <Newspaper className="w-7 h-7 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-200" />
          <div className="flex items-center">
            <span className="font-bold text-gray-900 text-2xl lg:text-3xl tracking-tight">
              The Aqool
            </span>
            <span className="ml-2 font-semibold text-indigo-600 text-xl lg:text-2xl">
              (ai)
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                location === item.href 
                  ? "text-indigo-600" 
                  : "text-gray-700 hover:text-gray-900"
              }`}
              data-testid={`link-nav-${item.name.toLowerCase().replace(' ', '-')}`}
            >
              {item.name}
              {location === item.href && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
              )}
            </Link>
          ))}
          
          <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
            <Link 
              href="/newsletter" 
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
              data-testid="link-nav-newsletter"
            >
              Newsletter
            </Link>
            
            <Button 
              asChild
              variant="outline" 
              size="sm"
              className="border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white"
            >
              <Link href="/contact" data-testid="link-contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200" aria-label="Open menu" data-testid="button-mobile-menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white border-l border-gray-200">
            <div className="flex flex-col space-y-8 mt-12">
              <div className="space-y-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-medium transition-colors duration-200 block ${
                      location === item.href 
                        ? "text-indigo-600" 
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    data-testid={`link-nav-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="pt-6 border-t border-gray-200 space-y-6">
                <Link
                  href="/newsletter"
                  className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 block"
                  data-testid="link-nav-mobile-newsletter"
                >
                  Newsletter
                </Link>
                
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white"
                >
                  <Link href="/contact" data-testid="link-nav-mobile-contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}