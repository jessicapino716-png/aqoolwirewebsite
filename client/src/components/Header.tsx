import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";

export default function Header() {
  const navigation = [
    { name: "Policy", href: "/" },
    { name: "Regulation", href: "/" },
    { name: "Compliance", href: "/" },
    { name: "New Ai Tools", href: "/" },
    { name: "Newsletter", href: "/" },
  ];

  return (
    <header className="site-header sticky top-0 z-50" data-bg="The Aqool">
      <div className="topbar">
        <Link href="/" className="logo" data-testid="link-home">The Aqool (ai)</Link>
        <div className="actions">
          <Link href="/" className="account" data-testid="link-account">
            <span className="dot"></span> Account
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <button className="hamburger" aria-label="Open menu" data-testid="button-mobile-menu">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white text-black border-l border-gray-200">
              <div className="flex flex-col space-y-6 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-gray-600 text-black"
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
      <nav className="main-nav" aria-label="Primary">
        {navigation.map((item, index) => (
          <span key={item.name}>
            <Link 
              href={item.href} 
              data-testid={`link-nav-${item.name.toLowerCase()}`}
            >
              {item.name}
            </Link>
            {index < navigation.length - 1 && <span className="slash">/</span>}
          </span>
        ))}
      </nav>
    </header>
  );
}