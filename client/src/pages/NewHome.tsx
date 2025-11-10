import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatTile } from "@/components/StatTile";
import { AnimatedSaudiMap } from "@/components/art/AnimatedSaudiMap";
import { SignalScanningVignette, OperationalMappingVignette, ExecutionTimingVignette } from "@/components/art/FeatureVignettes";
import { PolicyFlow } from "@/components/art/PolicyFlow";
import { ArchitectureLayers } from "@/components/art/ArchitectureLayers";
import { OpportunityGraph } from "@/components/art/OpportunityGraph";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import logo from "@assets/LOGO_1762786105067.jpeg";

export default function NewHome() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    interest: '',
    message: '',
    consent: false,
  });
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent required",
        description: "Please agree to the terms before submitting.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });

      setFormData({
        name: '',
        email: '',
        organisation: '',
        interest: '',
        message: '',
        consent: false,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>AQOOL Wire - Saudi Arabia AI Investment Intelligence</title>
        <meta
          name="description"
          content="Making sense of signals in Saudi Arabia's AI economy. We synthesize policy, market, and capital signals to highlight major AI investment opportunities."
        />
      </Helmet>
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#hero" className="flex items-center">
              <img src={logo} alt="AQOOL Wire" className="h-8" />
            </a>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#regulatory-intelligence" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Regulatory Intelligence
              </a>
              <a href="#ai-investment-observatory" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                AI Investment Observatory
              </a>
              <a href="#insights" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Insights
              </a>
              <a href="#reports" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Reports
              </a>
              <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <AnimatedSaudiMap />
        <div className="container-custom relative z-10 text-center py-32">
          <h1 className="mb-6 font-bold text-foreground text-[84px]">AQOOL Wire</h1>
          <p className="text-muted-foreground text-xl mb-8 max-w-3xl mx-auto italic">
            Making sense of signals in Saudi Arabia's AI economy.
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-foreground">
            We synthesize policy, market, and capital signals to highlight major <span className="text-primary">AI investment</span> opportunities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/insights" data-testid="link-insights">
              <Button size="lg" data-testid="button-read-wire">Read the Wire</Button>
            </Link>
            <Button variant="outline" size="lg" asChild data-testid="button-contact">
              <a href="#contact">Contact</a>
            </Button>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="py-24 bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatTile value="$3.3T" label="transformation capex to 2030" />
            <StatTile value="$941.3B" label="PIF AUM (2024)" />
            <StatTile value="80+" label="official, scattered data sources unified" />
          </div>
        </div>
      </section>
      {/* What We Do */}
      <section className="py-24">
        <div className="container-custom">
          <h2 className="text-center mb-16 text-[55px] font-semibold">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="mb-6">
                <SignalScanningVignette />
              </div>
              <h3 className="mb-4 text-xl font-bold">Signal Scanning</h3>
              <p className="text-muted-foreground">
                Structured monitoring of policy, sector, and capital activity.
              </p>
            </Card>

            <Card>
              <div className="mb-6">
                <OperationalMappingVignette />
              </div>
              <h3 className="mb-4 text-xl font-bold">Operational Mapping</h3>
              <p className="text-muted-foreground">
                Translate announcements into clear AI capability needs and business cases.
              </p>
            </Card>

            <Card>
              <div className="mb-6">
                <ExecutionTimingVignette />
              </div>
              <h3 className="mb-4 text-xl font-bold">Execution Timing</h3>
              <p className="text-muted-foreground">
                Identify likely windows along investment and buildout cycles.
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* Regulatory Intelligence */}
      <section id="regulatory-intelligence" className="py-24 bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Regulatory Intelligence</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Navigate complex frameworks with precision intelligence that connects policy announcements to market entry requirements.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-foreground">Compliance pathway mapping from announcement to license</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-foreground">Localisation requirement tracking across sectors</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-foreground">Regulatory timeline forecasting</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <PolicyFlow />
            </div>
          </div>
        </div>
      </section>
      {/* AI Investment Observatory */}
      <section id="ai-investment-observatory" className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <ArchitectureLayers />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-6">AI Investment Observatory</h2>
              <p className="text-muted-foreground text-lg mb-8">Track the full stack from infrastructure to business model, connect capability gaps to deployment windows.</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-foreground">Stack analysis: data into models through operations & ROI</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-foreground">Project lifecycle intelligence</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-foreground">Market entry timing signals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Insights */}
      <section id="insights" className="py-24 bg-muted/30">
        <div className="container-custom">
          <h2 className="text-center mb-16 font-semibold text-[50px]">Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/insights" data-testid="link-insights-card-1">
              <Card className="cursor-pointer hover-elevate">
                <div className="mb-6">
                  <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                    <rect x="30" y="50" width="40" height="30" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    <polygon points="25,50 50,30 75,50" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    <rect x="40" y="60" width="8" height="12" fill="hsl(var(--primary))" opacity="0.3" />
                    <rect x="52" y="60" width="8" height="12" fill="hsl(var(--primary))" opacity="0.3" />
                    <path d="M 20,40 L 15,40 L 15,60 L 20,60" stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none" />
                    <path d="M 80,40 L 85,40 L 85,60 L 80,60" stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <h4 className="mb-3 text-lg font-semibold">Industrial Cities: The AI Enablement Layer</h4>
                <p className="text-muted-foreground mb-4">Infrastructure meets intelligence at scale</p>
                <div className="flex items-center text-primary gap-1 transition-all">
                  <span>Read more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>

            <Link href="/insights" data-testid="link-insights-card-2">
              <Card className="cursor-pointer hover-elevate">
                <div className="mb-6">
                  <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                    <circle cx="50" cy="40" r="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    <path d="M 50,52 L 50,65" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="50" cy="40" r="4" fill="hsl(var(--primary))" />
                    <path d="M 30,70 Q 40,60 50,65 T 70,70" stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
                    <circle cx="30" cy="70" r="2" fill="hsl(var(--accent))" />
                    <circle cx="50" cy="65" r="2" fill="hsl(var(--accent))" />
                    <circle cx="70" cy="70" r="2" fill="hsl(var(--accent))" />
                  </svg>
                </div>
                <h4 className="mb-3 text-lg font-semibold">Tourism at 150M: Personalisation at Scale</h4>
                <p className="text-muted-foreground mb-4">From visitor flows to predictive experiences</p>
                <div className="flex items-center text-primary gap-1 transition-all">
                  <span>Read more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>

            <Link href="/insights" data-testid="link-insights-card-3">
              <Card className="cursor-pointer hover-elevate">
                <div className="mb-6">
                  <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                    <rect x="35" y="45" width="30" height="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    <line x1="40" y1="45" x2="40" y2="65" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    <line x1="45" y1="45" x2="45" y2="65" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    <line x1="55" y1="45" x2="55" y2="65" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    <line x1="60" y1="45" x2="60" y2="65" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    <path d="M 20,35 L 35,45 L 65,45 L 80,55" stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none" />
                    <circle cx="20" cy="35" r="3" fill="hsl(var(--accent))" />
                    <circle cx="50" cy="45" r="3" fill="hsl(var(--accent))" />
                    <circle cx="80" cy="55" r="3" fill="hsl(var(--accent))" />
                  </svg>
                </div>
                <h4 className="mb-3 text-lg font-semibold">Logistics Modernisation: Ports as Algorithms</h4>
                <p className="text-muted-foreground mb-4">Real-time optimization across supply chains</p>
                <div className="flex items-center text-primary gap-1 transition-all">
                  <span>Read more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      {/* Reports */}
      <section id="reports" className="py-24 bg-card">
        <div className="container-custom text-center">
          <h2 className="mb-6 text-[50px] bg-[transparent] font-semibold">Reports</h2>
          <h3 className="text-primary mb-6 text-2xl font-semibold">Deep dives for decision-makers</h3>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Playbooks, timelines, partner maps, and valuation drivers.
          </p>
          <Link href="/insights" data-testid="link-reports">
            <Button size="lg">Explore Reports</Button>
          </Link>
        </div>
      </section>
      {/* About */}
      <section id="about" className="py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="mb-6 text-[50px] font-semibold">The AQOOL Wire</h2>
            <p className="text-muted-foreground text-lg font-bold">We map Saudi Arabia's AI transformation, connecting policy, capital, and operations, into a living opportunity graph.</p>
          </div>
          <div className="flex justify-center">
            <OpportunityGraph />
          </div>
        </div>
      </section>
      {/* Contact */}
      <section id="contact" className="py-24 bg-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-6 text-[40px] font-bold">Contact</h2>
              <p className="text-muted-foreground text-lg">Bring a thesis, leave with an AI Investment pipeline.</p>
            </div>

            {/* Conversation path art */}
            <div className="mb-12 flex justify-center">
              <svg width="300" height="100" viewBox="0 0 300 100">
                <path
                  d="M 50,50 Q 100,30 150,50 T 250,50"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4,4"
                  opacity="0.4"
                />
                <circle cx="50" cy="50" r="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <path d="M 50,58 L 47,63 L 53,60 Z" fill="hsl(var(--primary))" />
                <circle cx="250" cy="50" r="12" fill="hsl(var(--primary))" opacity="0.2" />
                <path d="M 243,50 L 248,55 L 257,42" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-foreground font-medium">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                  data-testid="input-name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-foreground font-medium">Work Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="organisation" className="block text-foreground font-medium">Organisation</label>
                <input
                  id="organisation"
                  type="text"
                  placeholder="Your organisation"
                  value={formData.organisation}
                  onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                  data-testid="input-organisation"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="interest" className="block text-foreground font-medium">Interest</label>
                <select
                  id="interest"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                  data-testid="select-interest"
                >
                  <option value="">Select your interest...</option>
                  <option value="investor">Investor</option>
                  <option value="solution-provider">Solution Provider</option>
                  <option value="fund">Fund</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-foreground font-medium">Message</label>
                <textarea
                  id="message"
                  placeholder="Tell us about your deployment path..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  rows={4}
                  required
                  data-testid="textarea-message"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded bg-background border border-border accent-primary"
                  required
                  data-testid="checkbox-consent"
                />
                <label htmlFor="consent" className="text-muted-foreground text-sm">
                  I consent to AQOOL Wire contacting me about relevant intelligence and advisory services.
                </label>
              </div>

              <Button type="submit" size="lg" disabled={submitting} data-testid="button-submit">
                {submitting ? "Sending..." : "Send"}
              </Button>
            </form>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Company */}
            <div>
              <div className="mb-6">
                <img src={logo} alt="AQOOL Wire" className="h-12 md:h-14" />
              </div>
              <h4 className="mb-4 text-lg font-semibold">Company</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">Services</h4>
              <ul className="space-y-3">
                <li><a href="#regulatory-intelligence" className="text-muted-foreground hover:text-primary transition-colors">Regulatory Intelligence</a></li>
                <li><a href="#ai-investment-observatory" className="text-muted-foreground hover:text-primary transition-colors">AI Investment Observatory</a></li>
              </ul>
            </div>

            {/* Intelligence */}
            <div>
              <h4 className="mb-4 text-lg font-semibold">Intelligence</h4>
              <ul className="space-y-3">
                <li><Link href="/insights" className="text-muted-foreground hover:text-primary transition-colors">Insights</Link></li>
                <li><a href="#reports" className="text-muted-foreground hover:text-primary transition-colors">Reports</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-2">
              <h4 className="mb-4 text-lg font-semibold">Newsletter</h4>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  data-testid="input-newsletter-email"
                />
                <Button type="submit" size="sm" data-testid="button-newsletter-subscribe">Subscribe</Button>
              </form>
            </div>
          </div>

          {/* Legal note */}
          <div className="pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm max-w-3xl">
              AQOOL Wire uses lawful, non-confidential sources. We do not use or solicit non-public, material information.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
