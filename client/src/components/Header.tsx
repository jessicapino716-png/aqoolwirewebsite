import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const navigation = [
    { name: "Tech", href: "/" },
    { name: "Reviews", href: "/" },
    { name: "Science", href: "/" },
    { name: "Entertainment", href: "/" },
    { name: "AI", href: "/" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* Top bar with Account and Menu */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-10 items-center justify-end space-x-4">
          {/* Account Link */}
          <Link href="/" className="flex items-center space-x-2 text-black hover:text-purple-600 transition-colors" data-testid="link-account">
            <User className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium">Account</span>
          </Link>
          
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-black hover:text-gray-600"
                data-testid="button-mobile-menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white text-black border-l border-gray-200">
              <div className="flex flex-col space-y-6 mt-8">
                {/* Mobile Navigation */}
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-medium transition-colors hover:text-gray-600 ${
                      location === item.href
                        ? "text-purple-600 font-semibold"
                        : "text-black"
                    }`}
                    data-testid={`link-nav-mobile-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-gray-200">
                  <Link href="/" className="flex items-center space-x-2 text-black hover:text-purple-600 transition-colors">
                    <User className="h-4 w-4 text-purple-600" />
                    <span className="text-lg font-medium">Account</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Header with Logo */}
      <div className="modern-header-logo">
        <div className="modern-header-bg-text">
          The Aqool
        </div>
        <Link href="/" className="modern-header-logo-overlay" data-testid="link-home">
          <div className="modern-header-logo-text">
            The Aqool
          </div>
        </Link>
      </div>

      {/* Navigation Bar */}
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-center justify-center py-3">
          <div className="flex items-center space-x-1 text-black">
            {navigation.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-1">
                <Link
                  href={item.href}
                  className={`font-medium transition-colors hover:text-gray-600 ${
                    location === item.href
                      ? "text-purple-600 font-semibold"
                      : "text-black"
                  }`}
                  data-testid={`link-nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
                {index < navigation.length - 1 && (
                  <span className="text-gray-400 mx-2">/</span>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}