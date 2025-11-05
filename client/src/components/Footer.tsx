import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import { SiLinkedin } from "react-icons/si";
import NewsletterForm from "@/components/magazine/NewsletterForm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    content: [
      { name: "Regulatory Intelligence", href: "/regulatory-intelligence" },
      { name: "Research & Policy", href: "/research-technology-policy" },
      { name: "AI Advisory", href: "/ai-advisory" },
      { name: "Insights", href: "/insights" },
      { name: "Reports", href: "/reports" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Editorial Guidelines", href: "/guidelines" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Disclaimers", href: "/disclaimers" },
    ],
  };

  return (
    <footer className="relative z-10 border-t border-white/10 glass-card-strong mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand Blurb + Newsletter */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <Link href="/" className="inline-block mb-4" data-testid="link-footer-home">
                <div className="text-2xl font-black text-white">
                  The Aqool <span className="text-[#00e5ff]">Wire</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1">
                  Intelligence Platform
                </div>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed" data-testid="text-footer-description">
                The first data-driven intelligence platform shaping the narrative of AI in Saudi Arabia and the GCC region.
              </p>
            </div>
            
            {/* Newsletter Form */}
            <NewsletterForm />
          </div>

          {/* Content Links */}
          <div>
            <h4 className="text-lg font-black text-white mb-4 border-b border-white/10 pb-2" data-testid="text-footer-content-title">
              Content
            </h4>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#00e5ff] transition-colors focus-cyan"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-black text-white mb-4 border-b border-white/10 pb-2" data-testid="text-footer-company-title">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#00e5ff] transition-colors focus-cyan"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Media */}
            <div className="mt-6">
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-2 font-semibold">
                Connect
              </div>
              <a
                href="https://www.linkedin.com/company/the-aqool-wire"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors focus-cyan"
                data-testid="link-footer-linkedin"
                aria-label="Follow us on LinkedIn"
              >
                <SiLinkedin className="h-4 w-4 text-[#0077b5]" />
                <span className="text-sm text-gray-300">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500" data-testid="text-footer-copyright">
            © {currentYear} The Aqool Wire. All rights reserved.
          </div>
          <div className="text-xs text-gray-600">
            Intelligence platform for Saudi Arabia's AI ecosystem
          </div>
        </div>
      </div>
    </footer>
  );
}
