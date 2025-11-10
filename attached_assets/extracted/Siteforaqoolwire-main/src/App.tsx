import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { StatTile } from './components/StatTile';
import { ContactForm } from './components/ContactForm';
import { HeroGraph } from './components/art/HeroGraph';
import { AnimatedSaudiMap } from './components/art/AnimatedSaudiMap';
import { SignalScanningVignette, OperationalMappingVignette, ExecutionTimingVignette } from './components/art/FeatureVignettes';
import { PolicyFlow } from './components/art/PolicyFlow';
import { ArchitectureLayers } from './components/art/ArchitectureLayers';
import { OpportunityGraph } from './components/art/OpportunityGraph';
import { ArrowRight } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Header />

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <AnimatedSaudiMap />
        <div className="container-custom relative z-10 text-center py-32">
          <h1 className="mb-6 font-bold">AQOOL Wire</h1>
          <p className="text-muted text-xl mb-8 max-w-3xl mx-auto italic">
            Making sense of signals in Saudi Arabia's AI economy.
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto">
            We synthesize policy, market, and capital signals to highlight major <span className="text-accent">AI investment</span> opportunities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg">Read the Wire</Button>
            <Button variant="outline" size="lg">Contact</Button>
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
          <h2 className="text-center mb-16">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="mb-6">
                <SignalScanningVignette />
              </div>
              <h3 className="mb-4">Signal Scanning</h3>
              <p className="text-muted">
                Structured monitoring of policy, sector, and capital activity.
              </p>
            </Card>

            <Card>
              <div className="mb-6">
                <OperationalMappingVignette />
              </div>
              <h3 className="mb-4">Operational Mapping</h3>
              <p className="text-muted">
                Translate announcements into clear AI capability needs and business cases.
              </p>
            </Card>

            <Card>
              <div className="mb-6">
                <ExecutionTimingVignette />
              </div>
              <h3 className="mb-4">Execution Timing</h3>
              <p className="text-muted">
                Identify likely windows along investment and buildout cycles.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Advisory */}
      <section id="ai-advisory" className="py-24 bg-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="mb-6">AI Investment Observatory</h2>
            <p className="text-muted text-lg">
              AI investment visualisation, co-pilot and scenario mapping.
            </p>
          </div>
          <div className="flex justify-center">
            <ArchitectureLayers />
          </div>
        </div>
      </section>

      {/* Insights */}
      <section id="insights" className="py-24">
        <div className="container-custom">
          <h2 className="text-center mb-16">Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group cursor-pointer">
              <div className="mb-6">
                <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                  {/* Factory with CV brackets */}
                  <rect x="30" y="50" width="40" height="30" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
                  <polygon points="25,50 50,30 75,50" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
                  <rect x="40" y="60" width="8" height="12" fill="var(--color-accent)" opacity="0.3" />
                  <rect x="52" y="60" width="8" height="12" fill="var(--color-accent)" opacity="0.3" />
                  {/* CV brackets */}
                  <path d="M 20,40 L 15,40 L 15,60 L 20,60" stroke="var(--color-accent-2)" strokeWidth="1.5" fill="none" />
                  <path d="M 80,40 L 85,40 L 85,60 L 80,60" stroke="var(--color-accent-2)" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <h4 className="mb-3">Industrial Cities: The AI Enablement Layer</h4>
              <p className="text-muted mb-4">Infrastructure meets intelligence at scale</p>
              <div className="flex items-center text-accent group-hover:gap-2 transition-all">
                <span>Read more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="group cursor-pointer">
              <div className="mb-6">
                <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                  {/* Pin with path */}
                  <circle cx="50" cy="40" r="12" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
                  <path d="M 50,52 L 50,65" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="50" cy="40" r="4" fill="var(--color-accent)" />
                  {/* Star path */}
                  <path d="M 30,70 Q 40,60 50,65 T 70,70" stroke="var(--color-accent-2)" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
                  <circle cx="30" cy="70" r="2" fill="var(--color-accent-2)" />
                  <circle cx="50" cy="65" r="2" fill="var(--color-accent-2)" />
                  <circle cx="70" cy="70" r="2" fill="var(--color-accent-2)" />
                </svg>
              </div>
              <h4 className="mb-3">Tourism at 150M: Personalisation at Scale</h4>
              <p className="text-muted mb-4">From visitor flows to predictive experiences</p>
              <div className="flex items-center text-accent group-hover:gap-2 transition-all">
                <span>Read more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="group cursor-pointer">
              <div className="mb-6">
                <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                  {/* Container */}
                  <rect x="35" y="45" width="30" height="20" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
                  <line x1="40" y1="45" x2="40" y2="65" stroke="var(--color-accent)" strokeWidth="1.5" />
                  <line x1="45" y1="45" x2="45" y2="65" stroke="var(--color-accent)" strokeWidth="1.5" />
                  <line x1="55" y1="45" x2="55" y2="65" stroke="var(--color-accent)" strokeWidth="1.5" />
                  <line x1="60" y1="45" x2="60" y2="65" stroke="var(--color-accent)" strokeWidth="1.5" />
                  {/* Route with waypoints */}
                  <path d="M 20,35 L 35,45 L 65,45 L 80,55" stroke="var(--color-accent-2)" strokeWidth="1.5" fill="none" />
                  <circle cx="20" cy="35" r="3" fill="var(--color-accent-2)" />
                  <circle cx="50" cy="45" r="3" fill="var(--color-accent-2)" />
                  <circle cx="80" cy="55" r="3" fill="var(--color-accent-2)" />
                </svg>
              </div>
              <h4 className="mb-3">Logistics Modernisation: Ports as Algorithms</h4>
              <p className="text-muted mb-4">Real-time optimization across supply chains</p>
              <div className="flex items-center text-accent group-hover:gap-2 transition-all">
                <span>Read more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Reports */}
      <section id="reports" className="py-24 bg-muted/30">
        <div className="container-custom text-center">
          <h2 className="mb-6">Reports</h2>
          <h3 className="text-accent mb-6">Deep dives for decision-makers</h3>
          <p className="text-muted text-lg mb-12 max-w-2xl mx-auto">
            Playbooks, timelines, partner maps, and valuation drivers.
          </p>
          <Button size="lg">Explore Reports</Button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="mb-6">The AQOOL Wire</h2>
            <p className="text-muted text-lg">
              We map Saudi Arabia's AI transformation—connecting policy, capital, and operations—into a living opportunity graph.
            </p>
          </div>
          <div className="flex justify-center">
            <OpportunityGraph />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-6">Contact</h2>
              <p className="text-muted text-lg">Bring a thesis, leave with an AI Investment pipeline.</p>
            </div>

            {/* Conversation path art */}
            <div className="mb-12 flex justify-center">
              <svg width="300" height="100" viewBox="0 0 300 100">
                {/* Dotted path */}
                <path
                  d="M 50,50 Q 100,30 150,50 T 250,50"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4,4"
                  opacity="0.4"
                />
                {/* Message bubble */}
                <circle cx="50" cy="50" r="8" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1.5" />
                <path d="M 50,58 L 47,63 L 53,60 Z" fill="var(--color-accent)" />
                {/* Target checkmark */}
                <circle cx="250" cy="50" r="12" fill="var(--color-accent)" opacity="0.2" />
                <path d="M 243,50 L 248,55 L 257,42" stroke="var(--color-accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}