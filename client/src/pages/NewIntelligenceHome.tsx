import { useState } from "react";
import MeshBackground from "@/components/MeshBackground";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, ArrowRight, Menu, X, ArrowUpRight } from "lucide-react";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";

const SECTION_LABEL: React.CSSProperties = {
  fontFamily: "monospace", fontSize: "0.82rem", letterSpacing: "0.14em",
  textTransform: "uppercase", color: "#00d9c8", marginBottom: "0.5rem", display: "block",
};

const RESEARCH_PROJECTS = [
  {
    methodology: "Live data tracking",
    title: "Live Saudi AI Intelligence Dashboard",
    oneliner: "Continuous-data methodology for tracking Saudi Arabia's AI economy in real time.",
    description: "Tracks Saudi Arabia's AI buildout, infrastructure, capital flows, regulatory developments, and stakeholder map across SDAIA, MCIT, GASTAT, NCC, the giga-projects, and major international partnerships. Designed for research, market entry analysis, FDI decision-making, and stakeholder mapping.",
    methodTags: ["Live data ingestion", "AI-structured layer", "Source-verified provenance"],
    status: "active" as const,
    href: "https://live.theaqoolwire.com/",
    external: true,
    ctaLabel: "View dashboard",
  },
  {
    methodology: "Deep transmission analysis",
    title: "The Hormuz Closure Cascade",
    oneliner: "Tracing a Strait of Hormuz closure through Saudi sovereign finance, the Tadawul, MSCI Emerging Markets index products, and into US public pension portfolios.",
    description: "A six-stage analytical site documenting how a Saudi geopolitical event mechanically propagates to a Texas teacher's retirement statement. Each stage traces the transmission across oil markets, sovereign finance, sovereign wealth, equity markets, EM index mechanics, and US pension portfolios, with primary-source citations throughout.",
    methodTags: ["Retrospective analysis", "Mechanical chain tracing", "Primary-source rigor"],
    status: "active" as const,
    href: "https://hormuz-cascade-ksa.vercel.app/",
    external: true,
    ctaLabel: "View analysis",
  },
  {
    methodology: "Forward simulation",
    title: "Digital Twin Policy Lab",
    oneliner: "Forward-looking simulation environment for testing policy scenarios before implementation.",
    description: "Combines official economic and workforce data with AI-assisted econometric modeling to test policy, investment, and market-entry scenarios. Current modeling capability: tech workforce upskilling investment scenarios across one-to-ten year time horizons, with non-linear growth dynamics, retention effects, and transparent econometric assumptions.",
    methodTags: ["Scenario stress-testing", "Econometric modeling", "Transparent assumptions"],
    status: "development" as const,
    href: null,
    external: false,
    ctaLabel: "In development",
  },
];

const LATEST_ITEMS = [
  { headline: "Aramco awards $371M supercomputing contract to STC Solutions", date: "Mar 24, 2026", tag: "Deal" },
  { headline: "HUMAIN + Turing launch AI Agent Marketplace on HUMAIN ONE", date: "Mar 26, 2026", tag: "Partnership" },
  { headline: "SAMA launches open banking license framework under Vision 2030", date: "Mar 27, 2026", tag: "Policy" },
];

export default function NewIntelligenceHome() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", organisation: "", interest: "", message: "", consent: false });
  const [submitting, setSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) { toast({ title: "Consent required", description: "Please check the consent box before submitting.", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error();
      toast({ title: "Message sent", description: "I'll be in touch within two business days." });
      setFormData({ name: "", email: "", organisation: "", interest: "", message: "", consent: false });
    } catch { toast({ title: "Something went wrong", description: "Please try again or email directly.", variant: "destructive" }); }
    finally { setSubmitting(false); }
  };

  const inputBase: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "8px", padding: "0.9rem 1.1rem", color: "#ffffff", fontSize: "1rem",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  };

  const formLabel: React.CSSProperties = {
    display: "block", fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: "0.12em",
    textTransform: "uppercase", color: "#00d9c8", marginBottom: "0.6rem",
  };

  const field = (label: string, key: string, type = "text") => (
    <div key={key}>
      <label style={formLabel}>{label}</label>
      <input type={type} value={(formData as any)[key]}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        required data-testid={`input-${key}`} style={inputBase} />
    </div>
  );

  return (
    <div style={{ background: "#070d18", minHeight: "100vh", color: "#e2e8f0", fontFamily: "'Inter', sans-serif", position: "relative", overflowX: "hidden" }}>
      <Helmet>
        <title>The Aqool Wire — Policy Research at the Intersection of AI and Saudi Arabia</title>
        <meta name="description" content="A one-person policy research lab applying AI to political-economic systems analysis, with active projects on Saudi Arabia's AI economy, geopolitical transmission analysis, and policy simulation." />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Helmet>
      <MeshBackground />

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <nav style={{ position: "relative", zIndex: 20, borderBottom: "1px solid rgba(0,217,200,0.18)", backdropFilter: "blur(12px)", background: "rgba(7,13,24,0.85)" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div className="flex items-center justify-between w-full px-4 md:px-8" style={{ minHeight: "72px" }}>
            <Link href="/">
              <img src={logoImage} alt="The Aqool Wire"
                className="cursor-pointer"
                style={{ height: "80px", width: "auto", filter: "drop-shadow(0 0 14px rgba(0,217,200,0.45)) brightness(1.1)" }} />
            </Link>

            <div className="hidden md:flex items-center gap-10">
              <a href="#research"
                style={{ fontSize: "1rem", color: "#cbd5e1", textDecoration: "none" }}
                className="hover:text-white transition-colors">Research</a>
              <Link href="/about"
                style={{ fontSize: "1rem", color: "#cbd5e1", textDecoration: "none" }}
                className="hover:text-white transition-colors">About</Link>
              <a href="#contact"
                style={{ fontSize: "1rem", color: "#cbd5e1", textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)", padding: "0.55rem 1.25rem", borderRadius: "6px" }}
                className="hover:text-white hover:border-white transition-colors">Contact</a>
            </div>

            <button className="md:hidden flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "6px", cursor: "pointer", color: "#e2e8f0", padding: "0.45rem 0.65rem", lineHeight: 1 }}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div style={{ borderTop: "1px solid rgba(0,217,200,0.12)", background: "rgba(7,13,24,0.98)", padding: "1.5rem" }}
            className="flex flex-col gap-5 md:hidden">
            <a href="#research" onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: "1.05rem", color: "#e2e8f0", textDecoration: "none", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              Research
            </a>
            <Link href="/about"
              style={{ fontSize: "1.05rem", color: "#e2e8f0", textDecoration: "none", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              About
            </Link>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem", color: "#e2e8f0", textDecoration: "none", padding: "0.75rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", marginTop: "0.25rem" }}>
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}
        className="px-4 md:px-8 py-20 md:py-28">
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-60%)", width: "600px", height: "350px", background: "radial-gradient(ellipse at center, rgba(0,217,200,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "780px", width: "100%" }}>
          <div className="inline-flex items-center gap-2" style={{ border: "1px solid rgba(0,217,200,0.3)", borderRadius: "100px", padding: "0.4rem 1.1rem 0.4rem 0.7rem", marginBottom: "2rem", background: "rgba(0,217,200,0.06)" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00d9c8", display: "inline-block", boxShadow: "0 0 8px #00d9c8", flexShrink: 0 }} />
            <span style={{ fontSize: "0.78rem", color: "#00d9c8", fontFamily: "monospace", letterSpacing: "0.07em", textTransform: "uppercase" }}>Policy research lab</span>
          </div>

          <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, lineHeight: 1.25, color: "#ffffff", marginBottom: "1.75rem", letterSpacing: "-0.01em" }}
            className="text-3xl sm:text-4xl md:text-5xl">
            A one-person research lab exploring how AI changes the toolkit available to policy researchers.
          </h1>

          <p style={{ lineHeight: 1.85, color: "#cbd5e1", marginBottom: "2.75rem", maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}
            className="text-base md:text-lg">
            Active research projects at the intersection of Saudi political-economic systems and AI-augmented policy analysis. Covering live data tracking, geopolitical transmission analysis, and forward-looking policy simulation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#research"
              className="w-full sm:w-auto flex items-center justify-center gap-2"
              style={{ background: "#00d9c8", color: "#070d18", fontWeight: 700, fontSize: "1rem", padding: "0.9rem 2rem", borderRadius: "8px", textDecoration: "none", boxShadow: "0 0 36px rgba(0,217,200,0.35)", letterSpacing: "0.01em" }}>
              View research
              <ArrowRight size={16} />
            </a>
            <Link href="/about"
              className="w-full sm:w-auto flex items-center justify-center"
              style={{ fontSize: "0.95rem", color: "#94a3b8", textDecoration: "none", padding: "0.9rem 2rem", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px" }}>
              About this work
            </Link>
          </div>
        </div>
      </section>

      {/* ── RESEARCH PROJECTS ────────────────────────────────────── */}
      <section id="research" style={{ position: "relative", zIndex: 1, maxWidth: "1080px", margin: "0 auto" }}
        className="px-4 md:px-8 pb-14 md:pb-24">

        <div style={{ marginBottom: "3rem" }}>
          <span style={SECTION_LABEL}>Research projects</span>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#ffffff", fontWeight: 400, margin: 0 }}>
            Three projects, three methodologies
          </h2>
        </div>

        <div className="flex flex-col gap-px"
          style={{ background: "rgba(0,217,200,0.08)", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0,217,200,0.1)" }}>
          {RESEARCH_PROJECTS.map((project, i) => (
            <div key={project.title}
              style={{ background: "#0c1829", position: "relative", overflow: "hidden" }}
              className="p-6 md:p-10">
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(0,217,200,0.4), transparent)" }} />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
                {/* Left: content */}
                <div style={{ flex: 1 }}>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span style={{ fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#00d9c8", background: "rgba(0,217,200,0.1)", border: "1px solid rgba(0,217,200,0.25)", padding: "0.2rem 0.65rem", borderRadius: "4px" }}>
                      {project.methodology}
                    </span>
                    {project.status === "development" && (
                      <span style={{ fontFamily: "monospace", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#94a3b8", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", padding: "0.2rem 0.65rem", borderRadius: "4px" }}>
                        In development
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.15rem, 2.5vw, 1.45rem)", fontWeight: 400, color: "#ffffff", marginBottom: "0.6rem", lineHeight: 1.3 }}>
                    {project.title}
                  </h3>

                  <p style={{ fontSize: "1rem", color: "#00d9c8", fontStyle: "italic", marginBottom: "1rem", lineHeight: 1.6, opacity: 0.9 }}>
                    {project.oneliner}
                  </p>

                  <p style={{ fontSize: "0.95rem", color: "#cbd5e1", lineHeight: 1.8, marginBottom: "1.25rem", maxWidth: "640px" }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.methodTags.map((tag) => (
                      <span key={tag} style={{ fontSize: "0.8rem", color: "#94a3b8", fontFamily: "monospace", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", padding: "0.2rem 0.6rem", borderRadius: "4px" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="flex-shrink-0 flex md:items-start md:pt-16">
                  {project.href ? (
                    <a href={project.href} target={project.external ? "_blank" : undefined} rel={project.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2"
                      style={{ fontSize: "0.9rem", fontWeight: 600, color: "#00d9c8", textDecoration: "none", border: "1px solid rgba(0,217,200,0.4)", padding: "0.65rem 1.25rem", borderRadius: "6px", whiteSpace: "nowrap" }}>
                      {project.ctaLabel}
                      <ArrowUpRight size={15} />
                    </a>
                  ) : (
                    <span style={{ fontSize: "0.9rem", color: "#64748b", fontFamily: "monospace", border: "1px solid rgba(255,255,255,0.08)", padding: "0.65rem 1.25rem", borderRadius: "6px", whiteSpace: "nowrap" }}>
                      In development
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RECENT SIGNALS ───────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }}
        className="px-4 md:px-8 pb-14 md:pb-24">
        <div className="flex items-end justify-between flex-wrap gap-4" style={{ marginBottom: "2rem" }}>
          <div>
            <span style={SECTION_LABEL}>Live dashboard</span>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#ffffff", fontWeight: 400, margin: 0 }}>Recent signals</h2>
          </div>
          <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
            style={{ fontSize: "0.9rem", color: "#00d9c8", textDecoration: "none", border: "1px solid rgba(0,217,200,0.35)", padding: "0.5rem 1.1rem", borderRadius: "6px" }}>
            Open dashboard <ArrowUpRight size={14} />
          </a>
        </div>

        <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
          {LATEST_ITEMS.map((item, i) => (
            <div key={item.headline}
              style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none", background: "#0c1829" }}
              className="p-5 md:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#e2e8f0", fontWeight: 400, lineHeight: 1.6, margin: 0 }}>{item.headline}</p>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span style={{ fontSize: "0.83rem", color: "#94a3b8", fontFamily: "monospace", whiteSpace: "nowrap" }}>{item.date}</span>
                <span style={{ fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 600, color: "#00d9c8", border: "1px solid rgba(0,217,200,0.35)", padding: "0.18rem 0.6rem", borderRadius: "4px", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT TEASER ─────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        className="px-4 md:px-8 py-14 md:py-20">
        <div style={{ maxWidth: "860px", margin: "0 auto" }} className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          <div style={{ flex: 1 }}>
            <span style={SECTION_LABEL}>About</span>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#ffffff", fontWeight: 400, marginBottom: "1.25rem" }}>
              Why this work
            </h2>
            <p style={{ fontSize: "1rem", color: "#cbd5e1", lineHeight: 1.85, marginBottom: "1rem" }}>
              This is the work of Jessica Pino, a former U.S. Foreign Service Officer with 18 years in economic and political analysis across the Middle East and South Asia. After completing an MPP at LSE focused on AI and governance, and now based in Riyadh, she is applying AI to research questions she encountered repeatedly throughout her career.
            </p>
            <p style={{ fontSize: "1rem", color: "#cbd5e1", lineHeight: 1.85, marginBottom: "1.75rem" }}>
              Each project here represents a different answer to the same underlying question: what does rigorous policy analysis look like when you have access to tools that can ingest, structure, and reason over information at a scale a single researcher could never manage manually?
            </p>
            <Link href="/about"
              className="inline-flex items-center gap-2"
              style={{ fontSize: "0.9rem", color: "#00d9c8", textDecoration: "none", border: "1px solid rgba(0,217,200,0.35)", padding: "0.6rem 1.2rem", borderRadius: "6px" }}>
              Read more <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ flexShrink: 0 }} className="hidden md:block">
            <div style={{ background: "#0c1829", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1.75rem", maxWidth: "260px" }}>
              <div style={{ fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#00d9c8", marginBottom: "1.25rem" }}>Background</div>
              {[
                "18 years, U.S. Foreign Service",
                "Tours: Islamabad, Cairo, Dahuk, Paris, Main State",
                "MPP, LSE — AI and governance",
                "Based in Riyadh",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 mb-3">
                  <span style={{ color: "#00d9c8", fontSize: "0.65rem", marginTop: "0.35rem", flexShrink: 0 }}>&#9654;</span>
                  <span style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" style={{ position: "relative", zIndex: 1 }}
        className="px-4 md:px-8 py-16 md:py-24">
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <span style={SECTION_LABEL}>Get in touch</span>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)", fontWeight: 400, color: "#ffffff", marginBottom: "1rem" }}>
            Research collaboration and feedback
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#cbd5e1", marginBottom: "2.5rem", lineHeight: 1.85 }}>
            Interested in research collaboration, fellowship discussions, or feedback on a project? Get in touch.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {field("Name", "name")}
            {field("Email", "email", "email")}
            {field("Organisation", "organisation")}

            <div>
              <label style={formLabel}>Enquiry type</label>
              <select value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                required data-testid="select-interest"
                style={{ ...inputBase, cursor: "pointer", color: formData.interest ? "#ffffff" : "#94a3b8" }}>
                <option value="">Select one</option>
                <option value="Research collaboration">Research collaboration</option>
                <option value="Fellowship discussion">Fellowship discussion</option>
                <option value="Project feedback">Project feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={formLabel}>Message</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required data-testid="textarea-message"
                style={{ ...inputBase, minHeight: "130px", resize: "vertical" }} />
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", padding: "1.25rem", background: "rgba(255,255,255,0.04)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <input type="checkbox" id="consent" checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                required data-testid="checkbox-consent"
                style={{ marginTop: "3px", accentColor: "#00d9c8", width: "16px", height: "16px", flexShrink: 0, cursor: "pointer" }} />
              <label htmlFor="consent" style={{ fontSize: "0.95rem", color: "#cbd5e1", lineHeight: 1.65, cursor: "pointer" }}>
                I consent to The Aqool Wire storing and using this information to respond to my enquiry.
              </label>
            </div>

            <button type="submit" disabled={submitting} data-testid="button-submit"
              style={{ background: "#00d9c8", color: "#070d18", border: "none", borderRadius: "8px", padding: "1rem 1.5rem", fontSize: "1.05rem", fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1, boxShadow: "0 0 28px rgba(0,217,200,0.3)", letterSpacing: "0.01em", transition: "opacity 0.2s" }}>
              {submitting ? "Sending..." : "Send message"}
            </button>

            <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#64748b" }}>
              I respond to all enquiries within two business days.
            </p>
          </form>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.07)" }}
        className="px-4 md:px-8 pt-10 pb-8">
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <Link href="/">
              <img src={logoImage} alt="The Aqool Wire"
                style={{ height: "72px", width: "auto", opacity: 0.9, filter: "drop-shadow(0 0 10px rgba(0,217,200,0.28)) brightness(1.1)" }} />
            </Link>
            <div className="flex flex-wrap gap-6 sm:gap-8">
              {[
                { label: "Research", href: "#research", external: false, anchor: true },
                { label: "About", href: "/about", external: false, anchor: false },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/the-aqool-wire", external: true, anchor: false },
                { label: "Dashboard", href: "https://live.theaqoolwire.com/", external: true, anchor: false },
              ].map((item) =>
                item.external ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.95rem", color: "#94a3b8", textDecoration: "none" }}
                    className="hover:text-white transition-colors">{item.label}</a>
                ) : item.anchor ? (
                  <a key={item.label} href={item.href}
                    style={{ fontSize: "0.95rem", color: "#94a3b8", textDecoration: "none" }}
                    className="hover:text-white transition-colors">{item.label}</a>
                ) : (
                  <Link key={item.label} href={item.href}
                    style={{ fontSize: "0.95rem", color: "#94a3b8", textDecoration: "none" }}
                    className="hover:text-white transition-colors">{item.label}</Link>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-6">
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
              &copy; {new Date().getFullYear()} The Aqool Wire. All rights reserved.
            </p>
            <p style={{ fontSize: "0.85rem", color: "#64748b", fontFamily: "monospace", margin: 0 }}>
              Saudi Arabia &middot; GCC &middot; Policy research
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
