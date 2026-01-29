import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Link2, Search, BarChart3, TrendingUp, Clock, Users, Activity, FileText } from "lucide-react";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";
import mapImage from "@assets/map_1762856003294.png";
import infrastructureScreenshot from "@assets/Screenshot_2026-01-26_at_11.14.32_AM_1769415278423.png";
import infrastructureMapScreenshot from "@assets/Screenshot_2026-01-26_at_11.17.14_AM_1769415442425.png";
import insightSeriesVideo from "@assets/insight_series_demo.mp4";
import policyLabScreenshot from "@assets/Screenshot_2026-01-26_at_1.11.20_PM_1769422288323.png";

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
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#solution" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">Solution</a>
              <a href="#products" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">Products</a>
              <a href="#copilot" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">Co-Pilot</a>
              <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">About</Link>
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
              <nav className="flex flex-col px-4 py-4 space-y-1">
                <a 
                  href="#solution" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors font-medium py-3 px-3 rounded-lg"
                >
                  Solution
                </a>
                <a 
                  href="#products" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors font-medium py-3 px-3 rounded-lg"
                >
                  Products
                </a>
                <a 
                  href="#copilot" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors font-medium py-3 px-3 rounded-lg"
                >
                  Co-Pilot
                </a>
                <Link 
                  href="/about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors font-medium py-3 px-3 rounded-lg"
                >
                  About
                </Link>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3 mt-2 text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-gray-900 rounded-lg shadow-[0_4px_14px_rgba(0,217,200,0.4)] transition-all"
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
                }}>Saudi Arabia's AI Buildout in Focus</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-[40px] md:text-[55px] font-bold mb-6 md:mb-8 leading-tight" style={{
                color: '#FFFFFF',
                letterSpacing: '-0.02em'
              }}>
                A Live Intelligence View of<br />
                Saudi Arabia's<br />
                <span style={{ color: '#07ebd0', whiteSpace: 'nowrap' }}>AI Economy</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 leading-relaxed" style={{
                color: '#E2E8F0'
              }}> A data-driven platform that visualizes AI buildouts, capital deployment, and policy dynamics across the Kingdom — reducing information asymmetry and improving market-entry decisions.</p>

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
                  href="#contact"
                  className="inline-flex items-center px-6 md:px-9 py-3 md:py-4 text-sm md:text-base font-semibold"
                  style={{
                    border: '2px solid #00D9C8',
                    borderRadius: '8px',
                    color: '#00FFD9',
                    textDecoration: 'none',
                    background: 'transparent'
                  }}
                  data-testid="button-learn-more"
                >Request Demo</a>
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
              <span className="text-white font-semibold">Saudi Arabia is executing one of the most ambitious AI and digital infrastructure buildouts in the world.</span> But the pace of execution has created a new challenge: investors and operators lack a clear, real-time view of where infrastructure is ready, where capital is flowing, and when to enter the market.
            </p>
            
            <div>
              <p className="mb-4 text-cyan-400">Key signals are spread across:</p>
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
                  <span>International datasets, benchmarks, and external analyses that lack local integration</span>
                </li>
              </ul>
            </div>
            
            <p>
              Decision-makers are left stitching together partial views, often relying on static reports or consultants that are outdated the moment they're published.
            </p>
            
            <p className="text-white font-semibold border-l-4 border-cyan-400 pl-6">THE RESULT: missed opportunities, coordination gaps, and slower decisions in a system that's moving at real-time speed.</p>
          </div>
          
          {/* Horizontal scrolling data source boxes */}
          <div className="mt-12 md:mt-16 overflow-hidden">
            <div className="flex gap-4 animate-scroll-x">
              {/* First set of boxes */}
              <div className="flex-shrink-0 w-64 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Government Portals</h4>
                <p className="text-gray-400 text-sm">SDAIA, MCIT, GASTAT, NCC announcements scattered across websites</p>
              </div>
              <div className="flex-shrink-0 w-64 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Giga-Projects</h4>
                <p className="text-gray-400 text-sm">NEOM, Red Sea, Qiddiya, Diriyah tech initiatives in separate ecosystems</p>
              </div>
              <div className="flex-shrink-0 w-64 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Private Sector</h4>
                <p className="text-gray-400 text-sm">AWS, Google, Oracle, Microsoft partnerships announced in isolation</p>
              </div>
              <div className="flex-shrink-0 w-64 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Regulatory Bodies</h4>
                <p className="text-gray-400 text-sm">Policy changes, licensing updates, compliance requirements in PDFs</p>
              </div>
              <div className="flex-shrink-0 w-64 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Investment Flows</h4>
                <p className="text-gray-400 text-sm">PIF allocations, VC rounds, sovereign investments across platforms</p>
              </div>
              <div className="flex-shrink-0 w-64 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Global Benchmarks</h4>
                <p className="text-gray-400 text-sm">OECD, WEF, academic reports requiring local context integration</p>
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex-shrink-0 w-64 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Government Portals</h4>
                <p className="text-gray-400 text-sm">SDAIA, MCIT, GASTAT, NCC announcements scattered across websites</p>
              </div>
              <div className="flex-shrink-0 w-64 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Giga-Projects</h4>
                <p className="text-gray-400 text-sm">NEOM, Red Sea, Qiddiya, Diriyah tech initiatives in separate ecosystems</p>
              </div>
              <div className="flex-shrink-0 w-64 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Private Sector</h4>
                <p className="text-gray-400 text-sm">AWS, Google, Oracle, Microsoft partnerships announced in isolation</p>
              </div>
              <div className="flex-shrink-0 w-64 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Regulatory Bodies</h4>
                <p className="text-gray-400 text-sm">Policy changes, licensing updates, compliance requirements in PDFs</p>
              </div>
              <div className="flex-shrink-0 w-64 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Investment Flows</h4>
                <p className="text-gray-400 text-sm">PIF allocations, VC rounds, sovereign investments across platforms</p>
              </div>
              <div className="flex-shrink-0 w-64 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h4 className="text-blue-400 font-semibold mb-2">Global Benchmarks</h4>
                <p className="text-gray-400 text-sm">OECD, WEF, academic reports requiring local context integration</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Solution Section */}
      <section id="solution" className="relative z-10 py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pt-[50px] pb-[50px]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-400 text-sm font-semibold tracking-wider uppercase">The Aqool Engine</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">Our Solution</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-8 text-lg md:text-xl leading-relaxed" style={{ color: '#E2E8F0' }}>
            <p>
              The Aqool Wire converts fragmented signals into live, decision-grade intelligence using the <span className="text-cyan-400 font-semibold">Aqool Engine</span> — a proprietary data infrastructure that continuously ingests, structures, and connects policy, capital, and infrastructure data shaping Saudi Arabia's AI economy.
            </p>
            <p>
              The platform is updated automatically, keeping the intelligence layer current as new announcements, releases, and datasets emerge.
            </p>
            <div>
              <p className="mb-4">Every data point is anchored to a built-in provenance layer:</p>
              <ul className="space-y-2 pl-1">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Each insight is traceable back to its original source</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Source links are transparent, clickable, and easy to verify</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Users can validate the underlying evidence without hunting through PDFs or scattered websites</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Products Section */}
      <section id="products" className="relative z-10 py-8 md:py-16 px-4 md:px-8 pt-[10px] pb-[10px]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Intelligence Products</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">What We Deliver</span>
            </h2>
            <p className="max-w-3xl mx-auto md:text-lg text-[20px]" style={{ color: '#E2E8F0' }}>
              Two operational intelligence products — plus three advanced capabilities in development — built on the Aqool Engine's continuously updated, source-verified intelligence layer.
            </p>
          </div>
        </div>
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
                <p className="text-gray-300 mb-6">Tracks Saudi Arabia's data center, cloud, and AI infrastructure build-out—providing real-time visibility into where compute capacity is being built and when it comes online.</p>
                
                <h4 className="font-semibold text-white mb-3">What It Tracks:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> All major data center projects (AWS, STC, HUMAIN, DataVolt, etc.) by capacity, ownership, and region</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Total compute growth across regions, including GW capacity, storage, and network reach</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Saudi progress benchmarked against regional and global infrastructure leaders</li>
                </ul>
                
                <div className="mt-6">
                  <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl">
                    <img 
                      src={infrastructureMapScreenshot} 
                      alt="Infrastructure Map - Geographic visualization of Saudi Arabia's AI infrastructure" 
                      className="w-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-4">
                      <p className="text-cyan-400 font-semibold text-sm">Geographic Infrastructure View</p>
                      <p className="text-gray-300 text-xs">Real-time mapping of data centers, cloud regions, AI hubs, and compute facilities across the Kingdom.</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">15 Live · 7 Building · 6 Planned · $750B+ Invested</p>
                </div>
              </div>
              <div>
                <div className="mb-6">
                  <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl">
                    <img 
                      src={infrastructureScreenshot} 
                      alt="Live Infrastructure Intelligence - Saudi Data Center Market capacity visualization" 
                      className="w-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-4">
                      <p className="text-cyan-400 font-semibold text-sm">Live Infrastructure Intelligence</p>
                      <p className="text-gray-300 text-xs">Visual mapping of Saudi Arabia's AI compute, cloud regions, and data-center capacity by operator and geography.</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">Live data · Updated continuously</p>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold text-white mb-3">Use It For:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Infrastructure readiness</span>
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Market entry timing</span>
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Capacity planning</span>
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Competitive positioning</span>
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Opportunity tracking</span>
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">Strategic alignment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-400/10 border border-green-400/30 rounded-full text-xs font-semibold text-green-400">Operational</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">The Insight Series</h3>
            <p className="text-cyan-400 text-lg mb-6">Living intelligence reports that stay current as policy, capital, and infrastructure evolve.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-3">What It Does:</h4>
                <p className="text-gray-300 mb-6">The Insight Series delivers continuously updated intelligence reports generated by the Aqool Engine. Each report is built once — and then kept current automatically as new policy signals, investments, and infrastructure developments emerge across Saudi Arabia's AI economy.</p>
                
                <h4 className="font-semibold text-white mb-3">What Makes These Reports Different:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Reports are continuously refreshed, not periodically rewritten</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> New data automatically updates findings, charts, and conclusions</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Source attribution is preserved as the report evolves</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Decision-makers always see the current state, not a snapshot in time</li>
                </ul>
                
                <div className="mt-6 rounded-lg overflow-hidden border border-cyan-500/20">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-auto"
                  >
                    <source src={insightSeriesVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">What You Get:</h4>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  <div className="p-4 bg-gray-900/60 border border-cyan-500/20 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">Weekly Sector Intelligence</h5>
                    <p className="text-gray-300 text-sm">Ongoing analysis of priority sectors (e.g. AI infrastructure, healthcare, energy, logistics, govtech), automatically updated as new signals emerge</p>
                  </div>
                  <div className="p-4 bg-gray-900/60 border border-cyan-500/20 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">Monthly AI Landscape Reports</h5>
                    <p className="text-gray-300 text-sm">Always-current views of Saudi Arabia's AI ecosystem — spanning policy direction, capital flows, and infrastructure build-out</p>
                  </div>
                  <div className="p-4 bg-gray-900/60 border border-cyan-500/20 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">Sector Deep Dives</h5>
                    <p className="text-gray-300 text-sm">Living reports that combine policy, capital, and execution intelligence within specific industries or strategic domains</p>
                  </div>
                  <div className="p-4 bg-gray-900/60 border border-cyan-500/20 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">Custom Intelligence Reports</h5>
                    <p className="text-gray-300 text-sm">Reports generated on demand around specific questions, sectors, regions, or investment themes — maintained in real time as conditions change</p>
                  </div>
                </div>
                
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
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-xs font-semibold text-yellow-400">Experimental Lab</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Digital Twin Policy Lab</h3>
            <p className="text-cyan-400 text-lg mb-6">An experimental modeling environment combining AI and econometric methods to test policy, investment, and market-entry decisions before they are implemented.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-3">What It Does:</h4>
                <p className="text-gray-300 mb-6">The Digital Twinning Policy Lab is a continuously evolving simulation environment that integrates official economic and workforce data with AI-assisted econometric modeling. It enables policymakers, investors, and enterprises to test scenarios, compare outcomes, and stress-test decisions as new data becomes available.</p>
                
                <h4 className="font-semibold text-white mb-1">Current Modeling Capabilities</h4>
                <p className="text-yellow-400 text-sm mb-5">Tech Workforce Upskilling</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="pl-4 border-l-2 border-yellow-500/50 py-2 bg-yellow-500/5 rounded-r-lg pr-3">
                    <p className="text-white font-medium mb-1 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      Investment-based scenario testing
                    </p>
                    <p className="text-gray-400 text-sm">Models how varying levels of public and private investment in tech education affect workforce and economic outcomes</p>
                  </div>
                  <div className="pl-4 border-l-2 border-yellow-500/50 py-2 bg-yellow-500/5 rounded-r-lg pr-3">
                    <p className="text-white font-medium mb-1 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      Time-horizon sensitivity analysis
                    </p>
                    <p className="text-gray-400 text-sm">Allows exploration of short-, medium-, and longer-term impacts (1–10 years), accounting for pipeline and compounding effects</p>
                  </div>
                  <div className="pl-4 border-l-2 border-yellow-500/50 py-2 bg-yellow-500/5 rounded-r-lg pr-3">
                    <p className="text-white font-medium mb-1 flex items-center gap-2">
                      <Users className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      Human capital outcome projections
                    </p>
                    <p className="text-gray-400 text-sm">Estimates changes in total tech workforce size, AI/ML talent concentration, wage premiums, and aggregate economic contribution</p>
                  </div>
                  <div className="pl-4 border-l-2 border-yellow-500/50 py-2 bg-yellow-500/5 rounded-r-lg pr-3">
                    <p className="text-white font-medium mb-1 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      Non-linear growth dynamics
                    </p>
                    <p className="text-gray-400 text-sm">Incorporates diminishing returns, retention effects, and training efficiency assumptions rather than simple linear extrapolation</p>
                  </div>
                  <div className="pl-4 border-l-2 border-yellow-500/50 py-2 bg-yellow-500/5 rounded-r-lg pr-3 md:col-span-2">
                    <p className="text-white font-medium mb-1 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      Transparent assumptions and limitations
                    </p>
                    <p className="text-gray-400 text-sm">Model structure, calibration sources, and caveats are explicitly documented for responsible use</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Why It Matters:</h4>
                <p className="text-gray-300 mb-6">Most policy and investment decisions are still made using static assumptions and historical snapshots. The Digital Twinning Policy Lab explores a different approach: adaptive models that update as real-world conditions change, allowing decision-makers to evaluate trade-offs, risks, and long-term impacts with greater confidence.</p>
                
                <h4 className="font-semibold text-white mb-3">Use It For:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-sm text-yellow-400">Market entry planning</span>
                  <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-sm text-yellow-400">Scenario development</span>
                  <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-sm text-yellow-400">Policy risk assessment</span>
                  <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-sm text-yellow-400">Compliance testing</span>
                </div>
                
                <p className="mt-6 text-sm text-yellow-400 italic">Limited access available for pilot partners</p>
                
                <div className="mt-6 rounded-xl overflow-hidden border border-yellow-500/20 shadow-lg">
                  <img 
                    src={policyLabScreenshot} 
                    alt="Tech Workforce Upskilling Simulator interface" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product 5 - AI Investment Observatory */}
          <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-400/10 border border-blue-400/30 rounded-full text-xs font-semibold text-blue-400">Coming in February</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">AI Investment Observatory</h3>
            <p className="text-cyan-400 text-lg mb-6">Real-time intelligence revealing where AI policy, capital, and opportunity converge — before signals become consensus.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-3">What It Does:</h4>
                <p className="text-gray-300 mb-6">Aggregates and analyzes AI-related capital flows, policy signals, and partnership activity across Saudi Arabia's Vision 2030 ecosystem — identifying where funding is accelerating, where gaps remain, and where private solutions can align with national priorities.</p>
                
                <h4 className="font-semibold text-white mb-4">Planned Capabilities:</h4>
                <div className="grid gap-4">
                  <div className="p-4 bg-gray-900/60 border border-cyan-500/20 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">Opportunity Radar</h5>
                    <p className="text-gray-300 text-sm">Predictive intelligence highlighting emerging investment and partnership zones before capital concentration peaks</p>
                  </div>
                  <div className="p-4 bg-gray-900/60 border border-cyan-500/20 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">Investment Intelligence Engine</h5>
                    <p className="text-gray-300 text-sm">Real-time visualization of AI capital flows by sector, region, investor, and strategic theme</p>
                  </div>
                  <div className="p-4 bg-gray-900/60 border border-cyan-500/20 rounded-lg">
                    <h5 className="text-white font-semibold mb-2">Regulatory & Policy Intelligence</h5>
                    <p className="text-gray-300 text-sm">Continuous tracking of AI policy developments translated into actionable investment and market-entry guidance</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">What You Get:</h4>
                <ul className="space-y-2 text-gray-300 mb-6">
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Interactive capital flow mapping (Capital Anemone visualization)</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Verified transaction ledger with deal amounts, participants, and sectors</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Early signals of where private solutions align with Saudi AI priorities</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Policy and partnership analysis surfacing actionable opportunities</li>
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
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
              <p className="text-base font-bold text-blue-400">Designed for investors, enterprises, and public-sector stakeholders navigating Saudi Arabia's AI economy.</p>
            </div>
          </div>

        </div>
      </section>
      {/* Decision Co-Pilot Section - Coming Q3 2026 */}
      <section id="copilot" className="relative z-10 py-16 md:py-32 px-4 md:px-8 max-w-6xl mx-auto" style={{ background: 'linear-gradient(135deg, hsl(var(--bg-dark)) 0%, hsl(var(--bg-base)) 50%, rgba(0, 153, 255, 0.05) 100%)' }}>
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-400/10 border border-blue-400/30 rounded-full text-sm font-semibold text-blue-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            Coming Q3 2026
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center">
          <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Decision Co-Pilot</span>
        </h2>
        <p className="text-blue-400 text-sm md:text-base text-center mb-4 md:mb-6">Planned interface layer across Aqool's intelligence products</p>
        
        <div className="text-center mb-10 md:mb-12 max-w-3xl mx-auto">
          <p className="text-base md:text-lg lg:text-xl leading-relaxed mb-4" style={{ color: 'hsl(var(--gray-light))' }}>
            A natural-language query interface for interrogating Aqool's validated intelligence dataset—designed to answer specific, structured questions with full source attribution.
          </p>
          <p className="text-sm md:text-base text-gray-400">
            Users can ask questions in plain English and receive evidence-backed answers, not generated opinions.
          </p>
        </div>

        {/* How It Works & Planned Capabilities - Compact Two-Column Layout */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-12 grid md:grid-cols-2 gap-6">
          {/* How It Works */}
          <div className="bg-gray-900/30 border border-blue-500/20 rounded-lg p-5">
            <h4 className="text-base font-semibold text-white mb-3">How It Works</h4>
            <p className="text-gray-400 text-sm mb-3">The Decision Co-Pilot sits on top of the Aqool Engine and:</p>
            <ul className="text-sm text-gray-300 space-y-1.5 mb-3">
              <li className="flex items-start gap-2"><span className="text-blue-400">•</span>Queries structured datasets across investments, policy, infrastructure, workforce</li>
              <li className="flex items-start gap-2"><span className="text-blue-400">•</span>Cross-references results across all products</li>
              <li className="flex items-start gap-2"><span className="text-blue-400">•</span>Returns organized answers grounded in verified sources only</li>
            </ul>
            <p className="text-xs text-white font-medium">No hallucinations. No unsourced claims. No black-box reasoning.</p>
          </div>

          {/* Planned Capabilities */}
          <div className="bg-gray-900/30 border border-blue-500/20 rounded-lg p-5">
            <h4 className="text-base font-semibold text-white mb-3">Planned Capabilities (Q3 2026)</h4>
            <ul className="text-sm text-gray-300 space-y-1.5">
              <li className="flex items-start gap-2"><span className="text-blue-400">•</span>Natural-language querying over Aqool's intelligence graph</li>
              <li className="flex items-start gap-2"><span className="text-blue-400">•</span>Cross-product data synthesis with source provenance</li>
              <li className="flex items-start gap-2"><span className="text-blue-400">•</span>Advanced filtering by timeframe, sector, deal stage, entity</li>
              <li className="flex items-start gap-2"><span className="text-blue-400">•</span>Exportable tables and summaries for reporting</li>
            </ul>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-900/50 border border-cyan-500/20 rounded-xl p-5 md:p-9 backdrop-blur">
          <h3 className="text-lg font-semibold text-white mb-6">Examples of supported queries include:</h3>
          <div className="space-y-3 mb-8">
            <div className="pl-4 border-l-2 border-blue-500/50 py-2 bg-blue-500/5 rounded-r-lg pr-3">
              <p className="text-gray-300 text-sm md:text-base italic">Which venture capital firms invested in pre-seed tech companies in Saudi Arabia in Q3 2025?</p>
            </div>
            <div className="pl-4 border-l-2 border-blue-500/50 py-2 bg-blue-500/5 rounded-r-lg pr-3">
              <p className="text-gray-300 text-sm md:text-base italic">What AI infrastructure projects were announced after LEAP 2025, and by which entities?</p>
            </div>
            <div className="pl-4 border-l-2 border-blue-500/50 py-2 bg-blue-500/5 rounded-r-lg pr-3">
              <p className="text-gray-300 text-sm md:text-base italic">Which sectors are receiving the fastest increase in early-stage capital?</p>
            </div>
            <div className="pl-4 border-l-2 border-blue-500/50 py-2 bg-blue-500/5 rounded-r-lg pr-3">
              <p className="text-gray-300 text-sm md:text-base italic">How have investment patterns shifted following recent policy announcements?</p>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-4">Each response is returned with:</h3>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400">Source citations</span>
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400">Timestamps</span>
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400">Links to original announcements, filings, or reports</span>
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
      <section id="contact" className="relative z-10 py-16 md:py-32 px-4 md:px-8 max-w-6xl mx-auto pt-[50px] pb-[50px]">
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
              <option value="Request Demo">Request Demo</option>
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
