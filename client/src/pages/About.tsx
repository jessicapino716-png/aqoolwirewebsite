import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Target, Eye, Zap } from "lucide-react";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - The Aqool Wire</title>
        <meta
          name="description"
          content="The Aqool Wire is the first data-driven intelligence platform shaping the narrative of AI in Saudi Arabia and the GCC region."
        />
      </Helmet>

      <main className="min-h-screen relative z-10">
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <span className="kicker mb-4">About The Aqool Wire</span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mt-6 mb-6 leading-tight">
              Shaping the AI Narrative in Saudi Arabia
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              The first data-driven intelligence platform dedicated to tracking, analyzing, and shaping the conversation around artificial intelligence in the Kingdom of Saudi Arabia and the GCC region.
            </p>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-[#00d4aa]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#00d4aa]" />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                To provide authoritative, data-driven intelligence that empowers decision-makers navigating Saudi Arabia's AI transformation.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-[#ff00ff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-[#ff00ff]" />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed">
                To be the definitive source of AI intelligence for the Middle East, bridging policy, technology, and business.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-[#00d4aa]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-[#00d4aa]" />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">Our Approach</h2>
              <p className="text-gray-400 leading-relaxed">
                Rigorous research, local expertise, and real-time tracking of regulatory, strategic, and market developments.
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div className="glass-card p-10 mb-16">
            <h2 className="text-3xl font-black text-white mb-6">What We Do</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                The Aqool Wire was founded to address a critical gap in the Middle Eastern AI ecosystem: the lack of specialized, authoritative intelligence on how artificial intelligence is being deployed, regulated, and developed across the Kingdom of Saudi Arabia and the broader GCC region.
              </p>
              <p>
                We track policy developments from entities like SDAIA (Saudi Data & AI Authority), monitor Vision 2030 AI initiatives, analyze investment trends, and provide strategic insights for organizations navigating this rapidly evolving landscape.
              </p>
              <p>
                Our platform serves government officials, corporate executives, investors, researchers, and anyone who needs to stay informed about AI developments in the region. Through our Regulatory Intelligence, Research & Policy analysis, and Advisory services, we deliver actionable intelligence that drives better decisions.
              </p>
            </div>
          </div>

          {/* Coverage Areas */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-white mb-6">Coverage Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "National AI Strategy & Vision 2030",
                "SDAIA Regulatory Frameworks",
                "AI Investment & Funding Trends",
                "Smart City Initiatives (NEOM, etc.)",
                "Data Governance & Privacy",
                "AI Ethics & Responsible AI",
                "Sector-Specific AI Applications",
                "Regional Comparative Analysis"
              ].map((area, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 bg-[#00d4aa] rounded-full"></span>
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass-card p-12 text-center border border-[#00d4aa]/30">
            <h2 className="text-3xl font-black text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Interested in partnership, custom research, or advisory services? We'd love to hear from you.
            </p>
            <Link href="/contact" data-testid="link-contact-about">
              <button className="px-8 py-4 bg-gradient-to-r from-[#00d4aa] to-[#00a888] text-[#0a0f1b] font-bold rounded-lg hover:scale-105 transition-transform cyan-glow">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
