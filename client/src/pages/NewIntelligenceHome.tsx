import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";

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
      </Helmet>
      <AnimatedBackground />
      
      {/* Header + Hero Container with Gradient */}
      <div className="relative" style={{
        background: 'radial-gradient(91.18% 145.89% at 20% 30%, rgba(0, 255, 65, 0.1) 0%, rgba(0, 255, 65, 0) 40%), radial-gradient(91.18% 145.89% at 80% 70%, rgba(0, 153, 255, 0.1) 0%, rgba(0, 153, 255, 0) 40%), radial-gradient(58.96% 94.34% at 50% 50%, rgba(0, 217, 200, 0.08) 0%, rgba(0, 217, 200, 0) 50%)'
      }}>
        {/* Header */}
        <header className="relative z-20 w-full border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
            <Link href="/" data-testid="link-logo">
              <img 
                src={logoImage} 
                alt="The Aqool Wire" 
                className="h-14 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">About</a>
              <a href="#copilot" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Co-Pilot</a>
              <a href="#vision" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Vision</a>
              <Button 
                size="sm"
                className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold"
                asChild
              >
                <a href="#contact">Contact</a>
              </Button>
            </nav>
          </div>
        </header>
        
        {/* Hero Section */}
        <section id="hero" className="relative z-10 min-h-[85vh] flex flex-col justify-center px-4 md:px-8 py-24 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm font-semibold mb-10 max-w-max" style={{ color: 'hsl(var(--cyan-bright))' }}>
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_hsl(var(--cyan-bright))] animate-[pulse-dot_2s_ease-in-out_infinite]" />
          Accelerating Vision 2030's AI Momentum
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          The Bloomberg Terminal for<br />
          Saudi Arabia's <span className="text-cyan-400">AI Ecosystem</span>
        </h1>

        <p className="text-xl md:text-2xl mb-6 max-w-4xl" style={{ color: 'hsl(var(--gray-light))' }}>
          Track the full stack from infrastructure to business model, connect capability gaps to deployment windows.
        </p>

        <p className="text-lg md:text-xl mb-12 max-w-3xl" style={{ color: 'hsl(var(--gray-medium))' }}>
          We synthesize policy, market, and capital signals to identify AI investment opportunities in Saudi Arabia and the GCC.
        </p>

        <div className="flex flex-wrap gap-5">
          <Button 
            size="lg" 
            className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold shadow-[0_4px_14px_rgba(0,217,200,0.4)] hover:shadow-[0_6px_20px_rgba(0,217,200,0.5)] transition-all hover:-translate-y-0.5"
            asChild
            data-testid="button-get-started"
          >
            <a href="#contact">Get Started</a>
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-all hover:-translate-y-0.5"
            asChild
            data-testid="button-learn-more"
          >
            <a href="#about">Learn More</a>
          </Button>
        </div>
      </section>
      </div>
      
      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-4 md:px-8 max-w-6xl mx-auto" style={{ background: 'linear-gradient(135deg, hsl(var(--bg-base)) 0%, hsl(var(--bg-light)) 100%)' }}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16">What We Do</h2>
        
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-lg mb-6" style={{ color: 'hsl(var(--gray-light))' }}>
              The Aqool Wire is the only intelligence platform built specifically for tracking AI investment opportunities across Saudi Arabia's Vision 2030 ecosystem.
            </p>
            <p className="text-lg mb-6" style={{ color: 'hsl(var(--gray-light))' }}>
              We connect the dots between policy announcements, funding flows, infrastructure buildouts, and market opportunities.
            </p>
            <p className="text-lg" style={{ color: 'hsl(var(--gray-light))' }}>
              Our subscribers include investors, solution providers, and funds operating in the GCC AI space.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              'Real-time policy & regulation tracking',
              'Investment flow analysis',
              'Infrastructure capability mapping',
              'Market timing intelligence',
              'Opportunity identification'
            ].map((feature, index) => (
              <div
                key={index}
                className="px-6 py-5 bg-cyan-500/5 border-l-[3px] border-cyan-500 rounded hover:bg-cyan-500/10 hover:border-green-400 transition-all hover:translate-x-2"
              >
                <span className="text-lg font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Co-Pilot Section */}
      <section id="copilot" className="relative z-10 py-32 px-4 md:px-8 max-w-6xl mx-auto" style={{ background: 'linear-gradient(135deg, hsl(var(--bg-dark)) 0%, hsl(var(--bg-base)) 50%, rgba(0, 153, 255, 0.05) 100%)' }}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
          Your <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">AI Investment Co-Pilot</span>
        </h2>
        
        <p className="text-xl text-center mb-16 max-w-3xl mx-auto" style={{ color: 'hsl(var(--gray-light))' }}>
          Ask questions, get intelligence. Our platform connects signals across policy, markets, and capital to surface actionable insights.
        </p>

        <div className="max-w-3xl mx-auto bg-gray-900/50 border border-cyan-500/20 rounded-xl p-9 backdrop-blur">
          {[
            'What AI infrastructure is being built in NEOM?',
            'Which Saudi funds are actively investing in AI?',
            'Where are the capability gaps in the current stack?',
            'What are the upcoming policy changes in AI regulation?'
          ].map((query, index) => (
            <div
              key={index}
              className="px-6 py-5 bg-gray-900/60 border border-cyan-500/20 rounded-lg mb-4 text-lg hover:border-cyan-500 hover:bg-cyan-500/8 transition-all hover:translate-x-1 relative"
              style={{ color: 'hsl(var(--gray-light))' }}
            >
              <span className="text-cyan-400 font-bold text-xl mr-1">"</span>
              {query}
              <span className="text-cyan-400 font-bold text-xl ml-1">"</span>
            </div>
          ))}
          
          <div className="mt-8 text-center text-sm font-semibold tracking-wide text-green-400">
            POWERED BY REAL-TIME SIGNAL SYNTHESIS
          </div>
        </div>
      </section>
      {/* Vision Section */}
      <section id="vision" className="relative z-10 py-32 px-4 md:px-8 max-w-6xl mx-auto" style={{ background: 'linear-gradient(135deg, rgba(0, 255, 65, 0.03) 0%, hsl(var(--bg-base)) 50%, rgba(0, 153, 255, 0.05) 100%)' }}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">Our Vision</h2>
        
        <p className="text-xl text-center mb-20" style={{ color: 'hsl(var(--gray-light))' }}>
          Building the definitive intelligence layer for AI investment in the GCC
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            { title: 'Complete Coverage', description: 'Track every policy, project, and investment across the Saudi AI ecosystem' },
            { title: 'Real-Time Intelligence', description: 'Get updates as they happen, not after the opportunity has passed' },
            { title: 'Actionable Insights', description: 'Move from data to decisions with clear investment signals' },
            { title: 'Network Effects', description: 'Connect with other investors, providers, and stakeholders' },
            { title: 'Stack Visibility', description: 'See the full picture from chips to applications' },
            { title: 'Timing Intelligence', description: 'Identify the right moment to enter markets and deploy capital' }
          ].map((item, index) => (
            <div
              key={index}
              className="px-8 py-10 bg-gray-900/40 border border-cyan-500/20 rounded-xl relative overflow-hidden group hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_16px_40px_rgba(0,217,200,0.3)] transition-all before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-green-400 before:via-cyan-400 before:to-blue-500 before:scale-x-0 before:origin-left before:transition-transform hover:before:scale-x-100"
            >
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">{item.title}</h3>
              <p className="text-lg" style={{ color: 'hsl(var(--gray-light))' }}>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center text-xl font-semibold text-green-400">
          Launching Q2 2025
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-32 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">Get In Touch</h2>
        
        <p className="text-xl text-center mb-16" style={{ color: 'hsl(var(--gray-light))' }}>
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
              <option value="Investor">Investor</option>
              <option value="Solution Provider">Solution Provider</option>
              <option value="Fund">Fund</option>
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
      <footer id="footer" className="relative z-10 py-20 px-4 md:px-8 border-t border-cyan-500/20 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 flex justify-center">
            <img 
              src={logoImage} 
              alt="The Aqool Wire" 
              className="h-12 w-auto"
            />
          </div>

          <h3 className="text-xl font-semibold mb-6 text-cyan-400">Follow Us</h3>

          <div className="flex gap-5 justify-center mb-10">
            <a
              href="https://www.linkedin.com/company/the-aqool-wire"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-cyan-500 rounded-full flex items-center justify-center text-cyan-400 text-lg font-semibold hover:bg-cyan-500 hover:text-gray-900 transition-all hover:-translate-y-1"
              data-testid="link-linkedin"
            >
              in
            </a>
          </div>

          <p className="text-sm" style={{ color: 'hsl(var(--gray-medium))' }}>
            © {new Date().getFullYear()} The Aqool Wire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
