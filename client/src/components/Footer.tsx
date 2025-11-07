import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import NewsletterSignup from "@/components/NewsletterSignup";
import { SiLinkedin } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    content: [
      { name: "Policy", href: "/policy" },
      { name: "Regulation", href: "/regulation" },
      { name: "Analysis", href: "/analysis" },
      { name: "New AI Tools", href: "/tools" },
      { name: "Newsletter", href: "/newsletter" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Advertise", href: "/contact" },
      { name: "Editorial Guidelines", href: "/guidelines" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Disclaimers", href: "/disclaimers" },
    ],
  };

  return (
    <footer className="border-t bg-gradient-to-r from-[#40E0D0] via-[#00ff88] to-[#90EE90] pt-[0px] pb-[0px] pl-[0px] pr-[0px] ml-[0px] mr-[0px] mt-[0px] mb-[0px]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-[#080808]" data-testid="text-footer-brand">The Aqool Wire</div>
            <p className="text-sm text-muted-foreground" data-testid="text-footer-description">
              Leading source for AI policy and regulation news in Saudi Arabia and the GCC region. 
              Expert analysis, weekly insights, and authoritative commentary.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/the-aqool-wire"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-[#0077b5] text-white hover:bg-[#005885] transition-colors"
                data-testid="link-footer-linkedin"
                aria-label="Follow us on LinkedIn"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
            </div>
            
            <div className="space-y-4">
              <Link 
                href="/contact" 
                className="inline-block hover:bg-[#14b8a6] px-6 py-3 rounded-md font-medium transition-colors bg-[#f2007d] text-[#f5eded]"
                data-testid="link-footer-contact"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Content Links */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-content-title">Content</h4>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-company-title">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-newsletter-title">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-footer-newsletter-description">
              Get weekly AI policy insights delivered to your inbox.
            </p>
            <NewsletterSignup variant="inline" />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            © {currentYear} The Aqool Wire. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-footer-legal-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}