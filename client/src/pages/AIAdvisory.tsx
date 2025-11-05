import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight, Building2, FileText, Users } from "lucide-react";

export default function AIAdvisory() {
  const services = [
    {
      icon: Building2,
      title: "Strategic AI Consulting",
      description: "Develop comprehensive AI strategies aligned with Vision 2030 and Saudi regulatory frameworks.",
      features: ["AI Readiness Assessment", "Strategy Development", "Implementation Roadmap"]
    },
    {
      icon: FileText,
      title: "Regulatory Compliance",
      description: "Navigate complex AI regulations and ensure compliance across GCC jurisdictions.",
      features: ["Compliance Audits", "Policy Development", "Risk Assessment"]
    },
    {
      icon: Users,
      title: "Capacity Building",
      description: "Train your teams on AI governance, ethics, and regulatory best practices.",
      features: ["Executive Workshops", "Technical Training", "Advisory Support"]
    }
  ];

  const caseStudies = [
    {
      title: "Government AI Transformation",
      client: "Major GCC Government Entity",
      result: "30% efficiency improvement through AI-powered services",
      category: "Public Sector"
    },
    {
      title: "Financial Services AI Compliance",
      client: "Leading Saudi Bank",
      result: "Full regulatory compliance achieved in 6 months",
      category: "Financial Services"
    },
    {
      title: "Healthcare AI Implementation",
      client: "Multi-Hospital Network",
      result: "AI diagnostic tools deployed across 12 facilities",
      category: "Healthcare"
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI Advisory Services - The Aqool Wire</title>
        <meta
          name="description"
          content="Expert AI consulting and advisory services for organizations navigating Saudi Arabia's AI landscape. Strategic planning, compliance, and implementation support."
        />
      </Helmet>

      <main className="min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <span className="kicker mb-4">AI Advisory Services</span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mt-6 mb-6 leading-tight">
              Navigate AI with Confidence
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Expert guidance for organizations implementing AI in Saudi Arabia. From strategy to compliance, we help you succeed in the evolving AI landscape.
            </p>
            <Link href="/contact" className="inline-block" data-testid="link-contact-advisory">
              <button className="px-8 py-4 bg-gradient-to-r from-[#00e5ff] to-[#00a888] text-[#0a0f1b] font-bold rounded-lg hover:scale-105 transition-transform cyan-glow">
                Schedule Consultation
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Services */}
          <div className="mb-20">
            <h2 className="text-3xl font-black text-white mb-8">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="glass-card p-8 border-l-4 border-[#00e5ff]">
                    <div className="w-12 h-12 bg-[#00e5ff]/20 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#00e5ff]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Case Studies */}
          <div>
            <h2 className="text-3xl font-black text-white mb-8">Featured Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudies.map((study, index) => (
                <div key={index} className="glass-card p-6 hover:scale-[1.02] transition-all">
                  <span className="eyebrow mb-3 block">{study.category}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{study.client}</p>
                  <p className="text-[#00e5ff] font-semibold">{study.result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
