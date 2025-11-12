import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";
import mapImage from "@assets/map_1762856003294.png";

export default function NewIntelligenceHome() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    interest: '',
    message: '',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please consent to be contacted",
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

      if (!response.ok) throw new Error('Failed to send message');

      toast({
        title: "Message Sent!",
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
    <div className="min-h-screen text-white relative">
      <Helmet>
        <title>The Aqool Wire - Intelligence Platform</title>
        <meta name="description" content="The Bloomberg Terminal for Saudi Arabia's AI Ecosystem. Track the full stack from infrastructure to business model." />
        
        {/* Favicon - Multiple sizes for optimal display */}
        <link rel="icon" type="image/png" sizes="16x16" href="/attached_assets/Screenshot 2025-11-11 at 3.42.56 PM_1762864978978.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/attached_assets/Screenshot 2025-11-11 at 3.42.56 PM_1762864978978.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/attached_assets/Screenshot 2025-11-11 at 3.42.56 PM_1762864978978.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/attached_assets/Screenshot 2025-11-11 at 3.42.56 PM_1762864978978.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/attached_assets/Screenshot 2025-11-11 at 3.42.56 PM_1762864978978.png" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/attached_assets/Screenshot 2025-11-11 at 3.42.56 PM_1762864978978.png" />
        
        {/* Android Chrome */}
        <link rel="icon" type="image/png" sizes="192x192" href="/attached_assets/Screenshot 2025-11-11 at 3.42.56 PM_1762864978978.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/attached_assets/Screenshot 2025-11-11 at 3.42.56 PM_1762864978978.png" />
      </Helmet>
      <AnimatedBackground />
      {/* Header + Hero Container with Gradient */}
      <div className="relative" style={{
        background: 'radial-gradient(145.89% 91.18% at 20% 30%, rgba(100, 255, 180, 0.1) 0%, rgba(100, 255, 180, 0) 40%), radial-gradient(145.89% 91.18% at 80% 70%, rgba(0, 153, 255, 0.1) 0%, rgba(0, 153, 255, 0) 40%), radial-gradient(94.34% 58.96% at 50% 50%, rgba(0, 217, 200, 0.08) 0%, rgba(0, 217, 200, 0) 50%)'
      }}>
        {/* Header */}
        <header className="relative z-20 w-full border-b border-cyan-500/20">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-0.5 flex items-center justify-between">
            <Link href="/" data-testid="link-logo">
              <img 
                src={logoImage} 
                alt="The Aqool Wire" 
                className="h-20 md:h-32 lg:h-40 w-auto cursor-pointer hover:opacity-80 transition-opacity -my-4 md:-my-6 lg:-my-8"
              />
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Our Vision</a>
              <a href="#copilot" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Co-Pilot</a>
              <Button 
                size="sm"
                className="bg-[#16e0ab] hover:bg-cyan-400 text-gray-900 font-semibold shadow-[0_4px_14px_rgba(0,217,200,0.4)] hover:shadow-[0_6px_20px_rgba(0,217,200,0.5)] transition-all hover:-translate-y-0.5"
                asChild
              >
                <a href="#contact">Contact</a>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              data-testid="button-mobile-menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-cyan-500/20 bg-[#0f1e2e]">
              <nav className="flex flex-col px-4 py-4 space-y-3">
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-cyan-400 transition-colors font-medium py-2"
                >
                  Our Vision
                </a>
                <a 
                  href="#copilot" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-cyan-400 transition-colors font-medium py-2"
                >
                  Co-Pilot
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-gray-900 rounded-lg shadow-[0_4px_14px_rgba(0,217,200,0.4)] transition-all"
                >
                  Contact
                </a>
              </nav>
            </div>
          )}
        </header>
        
        {/* Hero Section */}
        <section id="hero" className="relative z-10 min-h-[85vh] flex items-center px-4 md:px-8 py-24 max-w-[1400px] mx-auto pt-[20px] pb-[20px]">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            {/* Left Column - Text Content */}
            <div>
              {/* Badge with shadow dot */}
              <div className="inline-flex items-center gap-2 md:gap-2.5 px-4 md:px-6 py-2 md:py-3 mb-6 md:mb-10 max-w-max" style={{
                border: '1px solid rgba(0, 217, 200, 0.3)',
                background: 'rgba(0, 217, 200, 0.1)',
                borderRadius: '50px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: '#07ebd0',
                  borderRadius: '4px',
                  boxShadow: '0 0 10px #07ebd0'
                }} />
                <span className="text-xs md:text-sm font-semibold tracking-wide" style={{
                  color: '#07ebd0'
                }}>Supercharging Vision 2030's AI Momentum</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-[54px] md:text-[60px] lg:text-[72px] font-bold mb-6 md:mb-8 leading-tight" style={{
                color: '#FFFFFF',
                letterSpacing: '-0.02em'
              }}>
                The Data Platform<br />
                Accelerating<br />
                Saudi Arabia's<br />
                <span style={{ color: '#07ebd0' }}>AI Transformation</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-5 leading-relaxed" style={{
                color: '#E2E8F0'
              }}>
                Unifying fragmented data into actionable intelligence
              </p>

              {/* Description */}
              <p className="text-base md:text-lg mb-8 md:mb-12 leading-relaxed" style={{
                color: '#94A3B8'
              }}>The first platform mapping capital flows, infrastructure, and partnerships across the Kingdom's $100B AI transformation</p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 md:gap-5">
                <a 
                  href="#contact"
                  className="inline-flex items-center px-6 md:px-9 py-3 md:py-4 text-sm md:text-base font-semibold"
                  style={{
                    background: '#00D9C8',
                    borderRadius: '8px',
                    color: '#0A1628',
                    boxShadow: '0 4px 14px rgba(0, 217, 200, 0.4)',
                    textDecoration: 'none'
                  }}
                  data-testid="button-become-partner"
                >
                  Become a Partner
                </a>
                <a 
                  href="#about"
                  className="inline-flex items-center px-6 md:px-9 py-3 md:py-4 text-sm md:text-base font-semibold"
                  style={{
                    border: '2px solid #00D9C8',
                    borderRadius: '8px',
                    color: '#00FFD9',
                    textDecoration: 'none',
                    background: 'transparent'
                  }}
                  data-testid="button-learn-more"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Column - Map Image */}
            <div className="hidden md:flex justify-center items-start -mt-[80px]">
              <img 
                src={mapImage} 
                alt="Saudi Arabia AI Network Map" 
                className="w-full max-w-[800px] h-auto animate-pulse-glow"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(7, 235, 208, 0.3))'
                }}
              />
            </div>
          </div>
        </section>
      </div>
      {/* About Section */}
      <section id="about" className="relative z-10 py-16 md:py-32 px-4 md:px-8 max-w-6xl mx-auto" style={{ background: 'linear-gradient(135deg, hsl(var(--bg-base)) 0%, hsl(var(--bg-light)) 100%)' }}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-16">What We Do</h2>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <p className="text-base md:text-lg mb-5 md:mb-6 leading-relaxed" style={{ color: 'hsl(var(--gray-light))' }}>
              The Aqool Wire is building the first intelligence platform designed to help the private sector identify and act on opportunities within Saudi Arabia's AI transformation — from investment flows and policy developments to compute, cloud, and data-infrastructure capacity.
            </p>
            <p className="text-base md:text-lg mb-5 md:mb-6 leading-relaxed" style={{ color: 'hsl(var(--gray-light))' }}>
              Our goal is to make the Kingdom's AI ecosystem visible, measurable, and connected — linking the dots between funding, infrastructure build-outs, and strategic partnerships driving Vision 2030's digital economy. By translating complex public data into actionable insight, we enable companies, investors, and innovators to see where growth is emerging and where collaboration can deliver the most impact.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'hsl(var(--gray-light))' }}>
              The platform is currently in development, with early partners helping us shape the tools that will power the next generation of AI foresight and market intelligence — accelerating how the private sector engages with the Kingdom's AI-driven future.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { 
                title: 'Insight Co-Pilot & Predictive Modeling', 
                description: 'Real-time AI assistant that surfaces trends, forecasts, and "what-if" scenarios across Saudi Arabia\'s AI economy.' 
              },
              { 
                title: 'Investment Flow Analysis', 
                description: 'Mapping capital movements, partnerships, and funding activity across Vision 2030 programs.' 
              },
              { 
                title: 'Compute & Cloud Capacity Intelligence', 
                description: 'Visibility into data-center growth, GPU availability, and emerging infrastructure projects.' 
              },
              { 
                title: 'Market Timing & Opportunity Identification', 
                description: 'Detecting emerging sectors, regional demand shifts, and partnership openings.' 
              },
              { 
                title: 'Real-time Policy & Regulation Tracking', 
                description: 'Live bilingual tracker of national AI laws, standards, and strategic initiatives.' 
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="px-4 md:px-6 py-4 md:py-5 bg-cyan-500/5 border-l-[3px] border-cyan-500 rounded hover:bg-cyan-500/10 hover:border-green-400 transition-all hover:translate-x-2"
              >
                <h3 className="text-base md:text-lg font-semibold mb-2 text-cyan-400">{feature.title}</h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'hsl(var(--gray-light))' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Co-Pilot Section */}
      <section id="copilot" className="relative z-10 py-16 md:py-32 px-4 md:px-8 max-w-6xl mx-auto" style={{ background: 'linear-gradient(135deg, hsl(var(--bg-dark)) 0%, hsl(var(--bg-base)) 50%, rgba(0, 153, 255, 0.05) 100%)' }}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center">
          Your <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">AI Insight Co-Pilot</span>
        </h2>
        
        <p className="text-base md:text-lg lg:text-xl text-center mb-10 md:mb-16 max-w-3xl mx-auto leading-relaxed" style={{ color: 'hsl(var(--gray-light))' }}>
          Ask questions, get intelligence. Our platform connects signals across policy, markets, and capital to surface actionable insights.
        </p>

        <div className="max-w-3xl mx-auto bg-gray-900/50 border border-cyan-500/20 rounded-xl p-5 md:p-9 backdrop-blur">
          {[
            'What if AI infrastructure investment doubles — how will compute capacity respond?',
            'Which Saudi funds are actively investing in AI?',
            'Where are the capability gaps in the current stack?',
            'What if PIF increases funding for AI-focused startups — will domestic compute capacity be able to keep pace?'
          ].map((query, index) => (
            <div
              key={index}
              className="px-4 md:px-6 py-4 md:py-5 bg-gray-900/60 border border-cyan-500/20 rounded-lg mb-3 md:mb-4 text-sm md:text-base lg:text-lg hover:border-cyan-500 hover:bg-cyan-500/8 transition-all hover:translate-x-1 relative leading-relaxed"
              style={{ color: 'hsl(var(--gray-light))' }}
            >
              <span className="text-cyan-400 font-bold text-lg md:text-xl mr-1">"</span>
              {query}
              <span className="text-cyan-400 font-bold text-lg md:text-xl ml-1">"</span>
            </div>
          ))}
          
          <div className="mt-6 md:mt-8 text-center text-xs md:text-sm font-semibold tracking-wide text-green-400">POWERED BY REAL-TIME DATA INTEGRATION</div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-16 md:py-32 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center">Get In Touch</h2>
        
        <p className="text-base md:text-lg lg:text-xl text-center mb-10 md:mb-16 leading-relaxed" style={{ color: 'hsl(var(--gray-light))' }}>
          Interested in early access? Let's talk.
        </p>

        <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
          <div className="mb-7">
            <label className="block mb-2 text-sm font-semibold tracking-wide text-cyan-400">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/40 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:bg-gray-900/60 transition-all"
              required
              data-testid="input-name"
            />
          </div>

          <div className="mb-7">
            <label className="block mb-2 text-sm font-semibold tracking-wide text-cyan-400">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/40 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:bg-gray-900/60 transition-all"
              required
              data-testid="input-email"
            />
          </div>

          <div className="mb-7">
            <label className="block mb-2 text-sm font-semibold tracking-wide text-cyan-400">Organisation</label>
            <input
              type="text"
              value={formData.organisation}
              onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/40 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:bg-gray-900/60 transition-all"
              required
              data-testid="input-organisation"
            />
          </div>

          <div className="mb-7">
            <label className="block mb-2 text-sm font-semibold tracking-wide text-cyan-400">Interest</label>
            <select
              value={formData.interest}
              onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/40 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:bg-gray-900/60 transition-all"
              required
              data-testid="select-interest"
            >
              <option value="">Select your interest</option>
              <option value="Sponsor">Sponsor</option>
              <option value="Future Customer">Future Customer</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-7">
            <label className="block mb-2 text-sm font-semibold tracking-wide text-cyan-400">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/40 border border-cyan-500/30 rounded-lg text-white min-h-[140px] resize-y focus:outline-none focus:border-cyan-500 focus:bg-gray-900/60 transition-all"
              required
              data-testid="textarea-message"
            />
          </div>

          <div className="flex items-start gap-3 mb-7">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 w-5 h-5 rounded bg-gray-900/40 border border-cyan-500/30 accent-cyan-500"
              required
              data-testid="checkbox-consent"
            />
            <label htmlFor="consent" className="text-sm" style={{ color: 'hsl(var(--gray-medium))' }}>
              I consent to AQOOL Wire contacting me about relevant intelligence and advisory services.
            </label>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold shadow-[0_4px_14px_rgba(0,217,200,0.4)] hover:shadow-[0_6px_20px_rgba(0,217,200,0.5)] transition-all hover:-translate-y-0.5"
            disabled={submitting}
            data-testid="button-submit"
          >
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </section>
      {/* Footer */}
      <footer id="footer" className="relative z-10 pt-[10px] pb-[10px] px-4 md:px-8 border-t border-cyan-500/20">
        <div className="max-w-[1400px] mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-0">
            <img 
              src={logoImage} 
              alt="The Aqool Wire" 
              className="h-48 md:h-64 lg:h-80 w-auto"
            />
          </div>

          {/* Launch Badge */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-400/10 border border-green-400/30 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm md:text-base font-semibold text-green-400">Launching 2026</span>
            </div>
          </div>

          {/* Social Section */}
          <div className="mb-8 md:mb-10">
            <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-300 uppercase tracking-wider">Connect With Us</h3>
            <div className="flex justify-center">
              <a
                href="https://www.linkedin.com/company/the-aqool-wire"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-2.5 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all group"
                data-testid="link-linkedin"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span className="font-medium">Follow us on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-cyan-500/10">
            <p className="text-sm" style={{ color: 'hsl(var(--gray-medium))' }}>
              © {new Date().getFullYear()} The Aqool Wire. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
