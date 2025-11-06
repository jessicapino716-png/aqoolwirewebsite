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
          content="Saudi Arabia's home for clear, credible intelligence on artificial intelligence. Focused on AI deployment, regulation, and scaling across Vision 2030 initiatives."
        />
      </Helmet>

      <main className="min-h-screen relative z-10">
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
          {/* Hero Section */}
          <div className="mb-16">
            <span className="kicker mb-4">About The Aqool Wire</span>
            <h1 className="text-4xl lg:text-5xl font-black text-white mt-6 mb-8 leading-tight">
              What We Do
            </h1>
          </div>

          {/* Main Content */}
          <div className="glass-card p-10 mb-12">
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
            </div>
          </div>

          {/* Service Lines */}
          <div className="grid grid-cols-1 gap-6 mb-12">
            <div className="glass-card p-8 border-l-4 border-[#00e5ff]">
              <h3 className="text-2xl font-black text-white mb-3">Regulatory Intelligence</h3>
              <p className="text-gray-300 leading-relaxed">
                Continuous monitoring and briefings on laws, standards, compliance guidance, and implementation timelines within the Kingdom.
              </p>
            </div>

            <div className="glass-card p-8 border-l-4 border-[#ff00ff]">
              <h3 className="text-2xl font-black text-white mb-3">Research & Policy Analysis</h3>
              <p className="text-gray-300 leading-relaxed">
                Deep dives on priority sectors—energy, health, finance, industry, public services—with clear implications and options for action.
              </p>
            </div>

            <div className="glass-card p-8 border-l-4 border-[#00e5ff]">
              <h3 className="text-2xl font-black text-white mb-3">Advisory</h3>
              <p className="text-gray-300 leading-relaxed">
                Tailored memos, stakeholder mapping, and go-to-market support to align strategies with national priorities and delivery cycles.
              </p>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="glass-card p-10 mb-16 border border-[#00e5ff]/30">
            <p className="text-xl text-gray-300 leading-relaxed text-center">
              We offer timely, actionable intelligence that helps decision-makers move with confidence and pace.
            </p>
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
