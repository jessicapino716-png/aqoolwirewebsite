import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";
import jessicaImage from "@assets/000-eHDrIDseLsY_1769360651903.jpeg";
import { ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      <Helmet>
        <title>About The Aqool Wire - Live Intelligence for Saudi Arabia's AI Economy</title>
        <meta name="description" content="The Aqool Wire applies AI to continuously ingest, structure, and reconcile data as conditions change, delivering live intelligence for Saudi Arabia's Vision 2030 AI transformation." />
      </Helmet>
      <AnimatedBackground />
      {/* Header */}
      <header className="relative z-20 w-full border-b border-cyan-500/20" style={{
        background: 'radial-gradient(145.89% 91.18% at 20% 30%, rgba(100, 255, 180, 0.1) 0%, rgba(100, 255, 180, 0) 40%), radial-gradient(145.89% 91.18% at 80% 70%, rgba(0, 153, 255, 0.1) 0%, rgba(0, 153, 255, 0) 40%)'
      }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-0.5 flex items-center justify-between">
          <Link href="/">
            <img 
              src={logoImage} 
              alt="The Aqool Wire" 
              className="h-20 md:h-32 lg:h-40 w-auto cursor-pointer hover:opacity-80 transition-opacity -my-4 md:-my-6 lg:-my-8"
            />
          </Link>
          <Button 
            size="sm"
            variant="outline"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      {/* About Content */}
      <section className="relative z-10 py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center">
            About <span className="text-cyan-400">The Aqool Wire</span>
          </h1>
          
          <div className="space-y-6 text-base md:text-lg leading-relaxed" style={{ color: '#E2E8F0' }}>
            <p>
              For years, the hardest part of serious economic and policy analysis wasn't interpretation. It was keeping the underlying information current, coherent, and decision-ready. Data arrived late, conflicted across sources, and often surfaced only after policy or investment windows had already closed.
            </p>
            
            <p>That problem became increasingly harder to ignore as Saudi Arabia accelerated its Vision 2030 AI transformation. Infrastructure, capital, and policy decisions began moving at a pace traditional analysis tools were never designed to match. Announcements multiplied, capital deployed faster, and execution outpaced visibility. The question was no longer how to analyze, but how to maintain a live, structured view of a system evolving in real time.</p>

            <p className="text-xl font-semibold text-cyan-400">
              The Aqool Wire was built to answer that question.
            </p>

            {/* Founder Section */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start mt-8">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="relative">
                  <img 
                    src={jessicaImage} 
                    alt="Jessica Pino, Founder of The Aqool Wire" 
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-cyan-500/30 shadow-[0_0_30px_rgba(0,217,200,0.2)]"
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-400/20 animate-pulse"></div>
                </div>
              </div>
              <div>
                <p>Founded by Jessica Pino, a former U.S. State Department economic and political analyst with nearly two decades of experience working across the Middle East and South Asia, the platform reflects a practical insight shaped by years inside government and development institutions: analysis fails when data infrastructure can't keep up with reality. Jessica's work evaluating infrastructure investment, development programs, and policy outcomes repeatedly ran into the same constraint: fragmented data that couldn't keep pace with the speed of change.</p>
              </div>
            </div>

            <p>
              Rather than producing slower, more expensive reports, The Aqool Wire applies AI to the least visible but most critical part of intelligence: continuously ingesting, structuring, and reconciling data as conditions change. The result is a live intelligence layer that allows decision-makers to focus on judgment, not information gathering.
            </p>
            
            <div className="mt-10 p-6 md:p-8 bg-gray-900/50 border border-cyan-500/20 rounded-xl">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-cyan-400">Digital Twin Policy Lab</h2>
              <p className="mb-4">
                The Aqool Wire goes beyond visualization through its Digital Twin Policy Lab, a simulation environment that allows users to test policy, workforce, and investment scenarios against real economic data before decisions are locked in.
              </p>
              <p className="mb-4">The lab enables decision-makers to explore how changes in variables such as workforce localization, training investment, sector-specific visa policy, or capital allocation may shape outcomes over time. This capability emerged from Ms. Pino's academic research into AI-driven labor market dynamics and years of observing governments implement policies without adequate impact forecasting.</p>
              <p className="text-cyan-400 font-medium">
                It's policy and investment analysis designed for systems where scale, capital intensity, and second-order effects matter.
              </p>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="mt-12 text-center">
            <Button 
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold shadow-[0_4px_14px_rgba(0,217,200,0.4)] hover:shadow-[0_6px_20px_rgba(0,217,200,0.5)] transition-all hover:-translate-y-0.5"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 md:px-8 border-t border-cyan-500/20 mt-auto">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-sm" style={{ color: 'hsl(var(--gray-medium))' }}>
            © {new Date().getFullYear()} The Aqool Wire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
