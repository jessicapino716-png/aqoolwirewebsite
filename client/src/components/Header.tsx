import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = [
    { name: "AI Policy", href: "/policy" },
    { name: "AI Tools", href: "/tools" },
    { name: "Opinion", href: "/opinion" },
    { name: "Newsletter", href: "/newsletter" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b-4 border-primary">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-black text-white">
              THE AQOOL AI
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xs font-bold uppercase tracking-wider transition-colors hover:text-primary ${
                  location === item.href
                    ? "text-primary"
                    : "text-white"
                }`}
                data-testid={`link-nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Subscribe and Sign In */}
          <div className="flex items-center space-x-3">
            {/* Subscribe button */}
            <Button
              size="sm"
              className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-white px-4 py-2 text-xs font-bold uppercase tracking-wide"
              data-testid="button-subscribe"
            >
              Subscribe
            </Button>

            {/* Sign In */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex text-white hover:text-primary hover:bg-white/10 text-xs font-bold uppercase tracking-wide"
              data-testid="button-signin"
            >
              Sign In
            </Button>

            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:text-primary hover:bg-white/10"
              data-testid="button-search"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-8 w-8 text-white hover:text-primary"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-black text-white border-l border-gray-800">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      data-testid="input-search-mobile"
                    />
                  </div>
                  
                  {/* Mobile Navigation */}
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-lg font-bold uppercase tracking-wide transition-colors hover:text-primary ${
                        location === item.href
                          ? "text-primary"
                          : "text-white"
                      }`}
                      data-testid={`link-nav-mobile-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="pt-4 space-y-3">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide"
                      data-testid="button-subscribe-mobile"
                    >
                      Subscribe
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-white hover:text-primary hover:bg-white/10 font-bold uppercase tracking-wide"
                      data-testid="button-signin-mobile"
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}