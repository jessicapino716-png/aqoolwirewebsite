import { useState, useEffect } from 'react';
import logo from 'figma:asset/8c95d8e715394a5b6ec0f9e82664a62ac343dc6b.png';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    'Regulatory Intelligence',
    'AI Investment Observatory',
    'Insights',
    'Reports',
    'About',
    'Contact'
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="container-custom py-6">
        <div className="flex items-center justify-between">
          <a href="#hero" className="hover:opacity-80 transition-opacity">
            <img src={logo} alt="AQOOL Wire" className="h-12 md:h-14" />
          </a>
          
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-muted hover:text-text transition-colors relative group"
                >
                  {link}
                  <span className="absolute bottom-0 left-1/2 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </a>
              </li>
            ))}
          </ul>

          <button className="lg:hidden text-muted hover:text-text">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}