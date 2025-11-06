import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

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

          {/* What We Do */}
          <div className="glass-card p-10 mb-16">
            <h2 className="text-3xl font-black text-white mb-6">What We Do</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
              <p>
                The Aqool Wire is Saudi Arabia's home for clear, credible intelligence on artificial intelligence. We focus exclusively on the Kingdom, how AI is being deployed, regulated, funded, and scaled across ministries, national programmes, and leading enterprises under Vision 2030.
              </p>
              <p>
                We distill signals that matter: policy moves from SDAIA and key regulators; national AI programmes and sector pilots; investment flows from the PIF ecosystem and corporate venture arms; and the partnerships shaping Saudi Arabia's AI stack, from data infrastructure to frontier model adoption.
              </p>
              <p>
                Our work equips government leaders, corporate executives, investors, and researchers with decision-ready insight across three service lines:
              </p>
              <div className="space-y-4">
                <p>
                  <span className="font-bold text-white">Regulatory Intelligence:</span> Continuous monitoring and briefings on laws, standards, compliance guidance, and implementation timelines within the Kingdom.
                </p>
                <p>
                  <span className="font-bold text-white">Research & Policy Analysis:</span> Deep dives on priority sectors, energy, health, finance, industry, public services, with clear implications and options for action.
                </p>
                <p>
                  <span className="font-bold text-white">Advisory:</span> Tailored memos, stakeholder mapping, and go-to-market support to align strategies with national priorities and delivery cycles.
                </p>
              </div>
              <p>
                We offer timely, actionable intelligence that helps decision-makers move with confidence and pace.
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
                  <span className="w-2 h-2 bg-[#00e5ff] rounded-full"></span>
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass-card p-12 text-center border border-[#00e5ff]/30">
            <h2 className="text-3xl font-black text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Interested in partnership, custom research, or advisory services? We'd love to hear from you.
            </p>
            <Link href="/contact" data-testid="link-contact-about">
              <button className="px-8 py-4 bg-gradient-to-r from-[#00e5ff] to-[#00a888] text-[#0a0f1b] font-bold rounded-lg hover:scale-105 transition-transform cyan-glow">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
