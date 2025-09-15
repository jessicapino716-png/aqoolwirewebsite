import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mail, Zap, Globe, Code2 } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  
  const navigation = [
    { name: "Policy", href: "/policy" },
    { name: "Regulation", href: "/regulation" },
    { name: "Analysis", href: "/analysis" },
    { name: "AI Tools", href: "/tools" },
  ];

  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 px-6 lg:px-20 py-4">
      {/* Tech Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="relative flex justify-between items-center">
        <Link href="/" className="group flex items-center space-x-3" data-testid="link-home">
          <div className="relative">
            <Code2 className="w-8 h-8 text-sky-400 group-hover:text-sky-300 transition-colors duration-300" />
            <div className="absolute -inset-1 bg-sky-400/20 rounded-full blur group-hover:bg-sky-300/30 transition-all duration-300"></div>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-white text-2xl lg:text-3xl tracking-tight">
              The Aqool
            </span>
            <span className="relative ml-2">
              <span className="neon-flicker text-[#00d4ff] font-bold text-xl lg:text-2xl">(ai)</span>
              <div className="absolute -inset-1 bg-[#00d4ff]/20 rounded blur animate-pulse"></div>
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg border border-transparent ${
                location === item.href 
                  ? "text-[#00d4ff] bg-slate-800/50 border-slate-600/50 shadow-lg shadow-[#00d4ff]/10" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800/30 hover:border-slate-600/30"
              }`}
              data-testid={`link-nav-${item.name.toLowerCase().replace(' ', '-')}`}
            >
              <span className="relative z-10">{item.name}</span>
              {location === item.href && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/10 to-sky-500/10 rounded-lg"></div>
              )}
            </Link>
          ))}
          
          <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-slate-600/50">
            <Link 
              href="/newsletter" 
              className="group flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-800/30"
              data-testid="link-nav-newsletter"
            >
              <Globe className="w-4 h-4 group-hover:text-[#00d4ff] transition-colors duration-300" />
              <span>Newsletter</span>
            </Link>
            
            <Button 
              asChild
              variant="outline" 
              size="sm"
              className="relative border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:border-[#00d4ff] transition-all duration-300 bg-slate-900/50 backdrop-blur-sm"
            >
              <Link href="/contact" data-testid="link-contact" className="group flex items-center">
                <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Contact
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800/30 rounded-lg transition-all duration-300" aria-label="Open menu" data-testid="button-mobile-menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-gradient-to-b from-slate-900 to-slate-800 border-l border-slate-700/50">
            {/* Tech Grid Background for Mobile */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:15px_15px]"></div>
            
            <div className="relative flex flex-col space-y-8 mt-12">
              <div className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative block px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg border border-transparent ${
                      location === item.href 
                        ? "text-[#00d4ff] bg-slate-800/50 border-slate-600/50 shadow-lg shadow-[#00d4ff]/10" 
                        : "text-slate-300 hover:text-white hover:bg-slate-800/30 hover:border-slate-600/30"
                    }`}
                    data-testid={`link-nav-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {location === item.href && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/10 to-sky-500/10 rounded-lg"></div>
                    )}
                  </Link>
                ))}
              </div>
              
              <div className="pt-6 border-t border-slate-600/50 space-y-4">
                <Link
                  href="/newsletter"
                  className="group flex items-center space-x-3 px-4 py-3 text-lg font-medium text-slate-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-800/30"
                  data-testid="link-nav-mobile-newsletter"
                >
                  <Globe className="w-5 h-5 group-hover:text-[#00d4ff] transition-colors duration-300" />
                  <span>Newsletter</span>
                </Link>
                
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:border-[#00d4ff] transition-all duration-300 bg-slate-900/50 backdrop-blur-sm"
                >
                  <Link href="/contact" data-testid="link-nav-mobile-contact" className="group flex items-center justify-center">
                    <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
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