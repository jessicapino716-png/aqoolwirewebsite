import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Link2, Search, BarChart3 } from "lucide-react";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";
import mapImage from "@assets/map_1762856003294.png";
import problemSectionImage from "@assets/problem-section-page2-02.png";

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
    <div className="min-h-screen text-white relative overflow-x-hidden">
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
      <div className="relative w-full overflow-x-hidden" style={{
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
              <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">About</Link>
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
                <Link 
                  href="/about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-cyan-400 transition-colors font-medium py-2"
                >
                  About
                </Link>
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
              <h1 className="text-[40px] md:text-[55px] font-bold mb-6 md:mb-8 leading-tight" style={{
                color: '#FFFFFF',
                letterSpacing: '-0.02em'
              }}>
                The Data Intelligence Layer for<br />
                Saudi Arabia's<br />
                <span style={{ color: '#07ebd0', whiteSpace: 'nowrap' }}>AI Economy</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-5 leading-relaxed" style={{
                color: '#E2E8F0'
              }}>
                A live, structured view of Saudi Arabia's AI, cloud, data, and digital transformation — built for decision-makers, not PDFs.
              </p>

              {/* Description */}
              <p className="text-base md:text-lg mb-8 md:mb-12 leading-relaxed" style={{
                color: '#94A3B8'
              }}>The Aqool Wire turns fragmented public announcements, private-sector investments, and policy signals into a continuously updated intelligence platform for government, investors, and enterprises.</p>

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
                  href="#the-problem"
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
      {/* The Problem Section */}
      <section id="the-problem" className="relative z-10 py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Siloed data</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">The Problem</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-8 text-lg md:text-xl leading-relaxed" style={{ color: '#E2E8F0' }}>
            <p>
              <span className="text-white font-semibold">Saudi Arabia is executing one of the most ambitious AI and digital transformation agendas in the world.</span> But the speed of execution has created a new challenge: critical intelligence is fragmented across dozens of institutions, initiatives, and announcements.
            </p>
            
            <div>
              <p className="mb-4">Key signals are spread across:</p>
              <ul className="space-y-2 pl-1">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Ministries, giga-projects, and sovereign entities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Press releases, speeches, PDFs, and closed briefings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Parallel AI, cloud, and data-center initiatives moving simultaneously</span>
                </li>
              </ul>
            </div>
            
            <p>
              Decision-makers are left stitching together partial views, often relying on static reports or consultants that are outdated the moment they're published.
            </p>
            
            <p className="text-white font-semibold border-l-4 border-cyan-400 pl-6">
              The result: missed opportunities, coordination gaps, and slower decisions in a system that's moving at real-time speed.
            </p>
          </div>
          
          {/* Visual showing the data fragmentation problem */}
          <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
            <img 
              src={problemSectionImage} 
              alt="Data fragmentation across Saudi Arabia's AI ecosystem - showing how investors miss opportunities when data is scattered" 
              className="w-full rounded-xl border border-cyan-500/20 shadow-2xl"
            />
          </div>
        </div>
      </section>
      {/* Our Solution Section */}
      <section id="solution" className="relative z-10 py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-400 text-sm font-semibold tracking-wider uppercase">The Aqool Engine</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">Our Solution</h2>
            <p className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed" style={{ color: '#E2E8F0' }}>
              The Aqool Wire transforms fragmented data into unified intelligence through the <span className="text-cyan-400 font-semibold">Aqool Engine</span>—our proprietary data infrastructure that continuously monitors, organizes, and synthesizes information on Saudi Arabia's AI economy.
            </p>
          </div>
          <p className="text-center text-lg md:text-xl font-semibold text-cyan-400 mb-12">
            Three operational products plus one in development:
          </p>
        </div>
      </section>
      {/* Products Section */}
      <section id="products" className="relative z-10 py-8 md:py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Product 1 */}
          <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-400/10 border border-green-400/30 rounded-full text-xs font-semibold text-green-400">Operational</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Infrastructure & Data Sovereignty Map</h3>
            <p className="text-cyan-400 text-lg mb-6">Mapping the digital backbone powering Saudi Arabia's AI transformation.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-3">What It Does:</h4>
                <p className="text-gray-300 mb-6">Comprehensive dashboard tracking Saudi Arabia's data center projects, compute capacity, cloud infrastructure, and regional distribution—providing visibility into where AI capacity is being built and when it comes online.</p>
                
                <h4 className="font-semibold text-white mb-3">What It Tracks:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> All major data center projects (AWS, STC, HUMAIN, DataVolt, etc.) by capacity, ownership, and region</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Total compute growth across regions, including GW capacity, storage, and network reach</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Saudi progress benchmarked against regional and global infrastructure leaders</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">What You Get:</h4>
                <ul className="space-y-2 text-gray-300 mb-6">
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Visual infrastructure mapping by region and operator</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Capacity timelines and deployment schedules</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Compute availability analysis for market entry planning</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Sovereignty and ownership structure mapping</li>
                </ul>
                
                <h4 className="font-semibold text-white mb-3">Use It For:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Infrastructure readiness</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Market entry timing</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Capacity planning</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Competitive positioning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-400/10 border border-blue-400/30 rounded-full text-xs font-semibold text-blue-400">Coming in February</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">AI Investment Observatory</h3>
            <p className="text-cyan-400 text-lg mb-6">Real-time intelligence revealing where AI policy, capital, and opportunity converge.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-3">What It Does:</h4>
                <p className="text-gray-300 mb-6">Tracks and visualizes capital flows, investment patterns, and partnership activity across Vision 2030's AI ecosystem—showing where funding is accelerating, where gaps remain, and where policy momentum meets private investment potential.</p>
                
                <h4 className="font-semibold text-white mb-3">Core Features:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> <strong className="text-white">Opportunity Radar:</strong> Predictive AI engine spotting emerging opportunity zones</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> <strong className="text-white">Investment Intelligence Engine:</strong> Real-time visualization of AI capital flows by sector, region, and investor</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> <strong className="text-white">Regulatory Intelligence:</strong> AI policy tracker turning complex regulations into actionable guidance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">What You Get:</h4>
                <ul className="space-y-2 text-gray-300 mb-6">
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Interactive capital flow mapping (Capital Anemone visualization)</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Verified transaction ledger with deal amounts, participants, and sectors</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Early signals of where private solutions can align with Saudi's AI priorities</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Policy and partnership analysis uncovering opportunities</li>
                </ul>
                
                <h4 className="font-semibold text-white mb-3">Use It For:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Investment opportunities</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Competitive intelligence</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Market entry strategy</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Partnership spotting</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-400/10 border border-green-400/30 rounded-full text-xs font-semibold text-green-400">Operational</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">The Insight Series</h3>
            <p className="text-cyan-400 text-lg mb-6">AI-driven intelligence briefs transforming data into actionable foresight.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-3">What It Does:</h4>
                <p className="text-gray-300 mb-6">Automated intelligence generation powered by the Aqool Engine, synthesizing thousands of data points into structured briefs revealing trends, risks, and early signals shaping Saudi Arabia's AI economy.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">What You Get:</h4>
                <ul className="space-y-2 text-gray-300 mb-6">
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> <strong className="text-white">Daily Intelligence Briefs:</strong> Synthesis of the previous 24 hours with source attribution</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> <strong className="text-white">Weekly Sector Analysis:</strong> Trend identification across healthcare, logistics, education, energy</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> <strong className="text-white">Monthly Landscape Reports:</strong> Comprehensive updates on policy, capital, and infrastructure</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> <strong className="text-white">Custom Alerts:</strong> Notifications for specific topics, sectors, or developments</li>
                </ul>
                
                <h4 className="font-semibold text-white mb-3">Use It For:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Market monitoring</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Morning briefings</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Research continuity</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Early opportunity ID</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 4 - Prototype */}
          <div className="bg-gray-900/50 border border-yellow-500/30 rounded-xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-xs font-semibold text-yellow-400">Prototype</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Digital Twinning Policy Lab</h3>
            <p className="text-cyan-400 text-lg mb-6">Interactive scenario modeling for complex policy environments.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-3">What It Does:</h4>
                <p className="text-gray-300 mb-6">Simulation environment using actual GASTAT economic and workforce data to model policy outcomes, workforce scenarios, and compliance requirements before making investment or market entry decisions.</p>
                
                <h4 className="font-semibold text-white mb-3">What You Can Model:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-yellow-400">•</span> Workforce composition under different Saudization requirements (40%, 60%, 80%)</li>
                  <li className="flex items-start gap-2"><span className="text-yellow-400">•</span> Training program investment ROI using actual salary data</li>
                  <li className="flex items-start gap-2"><span className="text-yellow-400">•</span> Regional workforce availability and hiring timelines</li>
                  <li className="flex items-start gap-2"><span className="text-yellow-400">•</span> Compliance cost projections for different business models</li>
                  <li className="flex items-start gap-2"><span className="text-yellow-400">•</span> Multi-year scenarios (1, 3, 5, 10-year projections)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">What You Get:</h4>
                <ul className="space-y-2 text-gray-300 mb-6">
                  <li className="flex items-start gap-2"><span className="text-yellow-400">•</span> Interactive policy scenario testing</li>
                  <li className="flex items-start gap-2"><span className="text-yellow-400">•</span> Compliance cost modeling based on GASTAT data</li>
                  <li className="flex items-start gap-2"><span className="text-yellow-400">•</span> Regional comparison analysis</li>
                  <li className="flex items-start gap-2"><span className="text-yellow-400">•</span> Export-ready projections for presentations</li>
                </ul>
                
                <h4 className="font-semibold text-white mb-3">Use It For:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-sm text-yellow-400">Market entry planning</span>
                  <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-sm text-yellow-400">Scenario development</span>
                  <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-sm text-yellow-400">Policy risk assessment</span>
                  <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-sm text-yellow-400">Compliance testing</span>
                </div>
                
                <p className="mt-6 text-sm text-yellow-400 italic">Limited access available for pilot partners</p>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* Decision Co-Pilot Section - Coming Q1 2026 */}
      <section id="copilot" className="relative z-10 py-16 md:py-32 px-4 md:px-8 max-w-6xl mx-auto" style={{ background: 'linear-gradient(135deg, hsl(var(--bg-dark)) 0%, hsl(var(--bg-base)) 50%, rgba(0, 153, 255, 0.05) 100%)' }}>
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-400/10 border border-blue-400/30 rounded-full text-sm font-semibold text-blue-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            Coming Q1 2026
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center">
          <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Decision Co-Pilot</span>
        </h2>
        
        <p className="text-base md:text-lg lg:text-xl text-center mb-10 md:mb-16 max-w-3xl mx-auto leading-relaxed" style={{ color: 'hsl(var(--gray-light))' }}>
          Natural language query interface for instant access to the entire Aqool data lake. Ask questions in plain English, get organized results with source attribution.
        </p>

        <div className="max-w-3xl mx-auto bg-gray-900/50 border border-cyan-500/20 rounded-xl p-5 md:p-9 backdrop-blur">
          <h3 className="text-lg font-semibold text-white mb-6 text-center">Planned Capabilities:</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-gray-900/60 border border-cyan-500/20 rounded-lg">
              <MessageSquare className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">Ask questions in plain English, get organized results with source attribution</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-900/60 border border-cyan-500/20 rounded-lg">
              <Link2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">Cross-reference data across all products and datasets</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-900/60 border border-cyan-500/20 rounded-lg">
              <Search className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">Custom search and filtering</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-900/60 border border-cyan-500/20 rounded-lg">
              <BarChart3 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">Export capability for reports</p>
            </div>
          </div>
          
          <div className="mt-6 md:mt-8 text-center text-xs md:text-sm font-semibold tracking-wide text-blue-400">LAUNCHING Q1 2026</div>
        </div>
      </section>
      {/* The Aqool Engine Section */}
      <section id="engine" className="relative z-10 py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-transparent via-green-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-400 text-sm font-semibold tracking-wider uppercase">Powering All Products</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">The Aqool Engine</h2>
            <p className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed" style={{ color: '#E2E8F0' }}>
              The unified intelligence infrastructure powering all products. Every product on The Aqool Wire is powered by the Aqool Engine—our proprietary data infrastructure that makes real-time intelligence possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Tier 1 */}
            <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 flex items-center justify-center bg-cyan-500/20 rounded-full text-cyan-400 font-bold text-sm">1</span>
                <h3 className="text-lg font-semibold text-white">Data Collection</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><strong className="text-cyan-400">Open-Source Government:</strong> Saudi Digital Government Authority, GASTAT, SDAIA, MCIT</li>
                <li><strong className="text-cyan-400">Private Sector:</strong> Verified company announcements, industry consortium data</li>
                <li><strong className="text-cyan-400">Global Datasets:</strong> OECD.AI, MAGNiTT, WEF, Stanford Digital Economy Lab</li>
              </ul>
            </div>

            {/* Tier 2 */}
            <div className="bg-gray-900/50 border border-green-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 flex items-center justify-center bg-green-500/20 rounded-full text-green-400 font-bold text-sm">2</span>
                <h3 className="text-lg font-semibold text-white">Unified Intelligence Engine</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><strong className="text-green-400">Data Integration Layer:</strong> Continuous ingestion from 50+ authoritative sources with standardization</li>
                <li><strong className="text-green-400">Analytics Engine:</strong> Trend detection, anomaly identification, predictive modeling via Vertex AI</li>
                <li><strong className="text-green-400">Decision Co-Pilot:</strong> Natural language interface (Q1 2026)</li>
              </ul>
            </div>

            {/* Tier 3 */}
            <div className="bg-gray-900/50 border border-blue-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 flex items-center justify-center bg-blue-500/20 rounded-full text-blue-400 font-bold text-sm">3</span>
                <h3 className="text-lg font-semibold text-white">Product Outputs</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><strong className="text-blue-400">Infrastructure Map:</strong> Visual sovereignty and capacity mapping</li>
                <li><strong className="text-blue-400">Investment Observatory:</strong> Capital flow dashboards</li>
                <li><strong className="text-blue-400">Insight Series:</strong> Automated intelligence briefs</li>
                <li><strong className="text-blue-400">Policy Lab:</strong> Simulation models</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/50 border border-cyan-500/20 rounded-full">
              <span className="text-cyan-400 font-semibold">Trust & Compliance:</span>
              <span className="text-gray-300 text-sm">Built on open data standards (PDDL, ISO, Open Data Institute)</span>
            </div>
          </div>
        </div>
      </section>
      {/* GCC Expansion Teaser */}
      <section className="relative z-10 py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500/10 via-green-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl backdrop-blur">
            <div className="text-left">
              <p className="text-lg md:text-xl font-semibold text-white mb-1">Saudi Arabia Now. Soon the Entire GCC.</p>
              <p className="text-sm md:text-base text-gray-400">The same intelligence infrastructure. Expanded across the Gulf Cooperation Council.</p>
            </div>
          </div>
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
