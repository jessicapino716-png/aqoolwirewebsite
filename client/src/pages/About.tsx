import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";
import { ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      <Helmet>
        <title>About Jessica Pino - The Aqool Wire</title>
        <meta name="description" content="Learn about Jessica Pino, founder of The Aqool Wire, with 18 years of US State Department experience and a Masters in Public Policy from LSE." />
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
            About <span className="text-cyan-400">Jessica Pino</span>, Founder
          </h1>
          
          <div className="space-y-6 text-base md:text-lg leading-relaxed" style={{ color: '#E2E8F0' }}>
            <p>
              After eighteen years as a US State Department economic and political analyst working across developing economies in the Middle East and South Asia—including Egypt, Iraq, and Pakistan—Jessica Pino spent her career attempting to answer an impossible question: how do you measure the effectiveness of foreign policy programs? She developed frameworks to quantify development outcomes, tracked infrastructure investments across fragile states, and built analytical models to assess whether billions in US assistance actually achieved their intended goals. The challenge was never the analysis—it was the data. Information arrived late, contradicted itself across sources, and by the time rigorous assessment was possible, policy windows had closed. When Saudi Arabia accelerated its Vision 2030 AI transformation, Ms. Pino recognized the same intelligence gap, but saw an opportunity to solve it differently.
            </p>
            
            <p>
              She built The Aqool Wire to solve a problem she lived with for nearly two decades. Traditional consulting reports cost six figures and arrive quarterly—far too slow for the pace of Saudi Arabia's AI economy, where billions move weekly and infrastructure decisions reshape entire sectors. Her recent Masters in Public Policy from LSE, focused on econometrics and AI labor markets, convinced her that institutional-grade intelligence could be automated using the same AI technologies transforming Saudi Arabia itself. The platform combines her deep knowledge of Saudi policy architecture with modern AI capabilities to deliver what government agencies, sovereign wealth funds, and strategic investors actually need: verified, real-time intelligence on capital flows, infrastructure development, and regulatory evolution.
            </p>
            
            <div className="mt-10 p-6 md:p-8 bg-gray-900/50 border border-cyan-500/20 rounded-xl">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-cyan-400">Digital Twinning Policy Lab</h2>
              <p>
                The Aqool Wire goes beyond traditional market intelligence by incorporating a Digital Twinning Policy Lab—an interactive simulation environment where decision-makers can model workforce scenarios, policy interventions, and investment outcomes before committing capital. This tool emerged from Ms. Pino's academic work on AI labor market dynamics and years of watching governments implement policies without adequate impact forecasting. Users can test variables like Saudization quotas, training program investments, or sector-specific visa policies against real economic data, seeing projected outcomes across timeframes from quarters to decades. It's policy analysis that matches the sophistication of the investments it informs.
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
