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
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-black text-black">
              The Aqool AI
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-black ${
                  location === item.href
                    ? "text-black font-semibold"
                    : "text-gray-600"
                }`}
                data-testid={`link-nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Subscribe and Sign In */}
          <div className="flex items-center space-x-4">
            {/* Subscribe button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex border-gray-300 text-black hover:bg-gray-50 rounded-md px-4 py-2 text-sm font-medium"
              data-testid="button-subscribe"
            >
              Subscribe
            </Button>

            {/* Sign In */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex text-black hover:bg-gray-50 text-sm font-medium"
              data-testid="button-signin"
            >
              Sign In
            </Button>

            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-600 hover:bg-gray-50"
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
                  className="md:hidden h-8 w-8 text-gray-600"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-10 border-gray-300"
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
                      className={`text-lg font-medium transition-colors hover:text-black ${
                        location === item.href
                          ? "text-black font-semibold"
                          : "text-gray-600"
                      }`}
                      data-testid={`link-nav-mobile-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="pt-4 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-black hover:bg-gray-50"
                      data-testid="button-subscribe-mobile"
                    >
                      Subscribe
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-black hover:bg-gray-50"
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