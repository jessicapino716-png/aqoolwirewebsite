import { useState } from "react";
import MeshBackground from "@/components/MeshBackground";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, ArrowRight, Menu, X } from "lucide-react";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";

/* ── Colour tokens ──────────────────────────────────────────────────
   text-primary   : #ffffff
   text-body      : #e2e8f0
   text-secondary : #cbd5e1
   text-muted     : #94a3b8
   accent         : #00d9c8
──────────────────────────────────────────────────────────────────── */

const PLATFORM_CARDS = [
  { tag: "Coverage", title: "Entity profiles", desc: "Deep intelligence profiles for HUMAIN, PIF, SDAIA, Aramco Digital, and 180+ organizations — deals, partnerships, key people, and citations." },
  { tag: "Deals", title: "Deal intelligence", desc: "Every sovereign JV, VC round, infrastructure deal, MoU, and acquisition tracked in real time with full source attribution." },
  { tag: "Briefings", title: "Weekly intelligence report", desc: "AI-synthesized weekly briefing covering deals, policy changes, and announcements. Sourced from 60+ publications each week." },
  { tag: "Capital", title: "VC directory", desc: "71 active investors in Saudi tech. Fund sizes, portfolio companies, investment thesis, and sector focus — all in one place." },
];

const LATEST_ITEMS = [
  { headline: "Aramco awards $371M supercomputing contract to STC Solutions", date: "Mar 24, 2026", tag: "Deal" },
  { headline: "HUMAIN + Turing launch AI Agent Marketplace on HUMAIN ONE", date: "Mar 26, 2026", tag: "Partnership" },
  { headline: "SAMA launches open banking license framework under Vision 2030", date: "Mar 27, 2026", tag: "Policy" },
];

const SECTION_LABEL: React.CSSProperties = {
  fontFamily: "monospace", fontSize: "0.82rem", letterSpacing: "0.14em",
  textTransform: "uppercase", color: "#00d9c8", marginBottom: "0.5rem", display: "block",
};

export default function NewIntelligenceHome() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", organisation: "", interest: "", message: "", consent: false });
  const [submitting, setSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) { toast({ title: "Consent Required", description: "Please consent to be contacted", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error();
      toast({ title: "Message Sent!", description: "We'll get back to you soon." });
      setFormData({ name: "", email: "", organisation: "", interest: "", message: "", consent: false });
    } catch { toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" }); }
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
        <title>The Aqool Wire — Real-time AI Intelligence for Saudi Arabia</title>
        <meta name="description" content="Real-time intelligence on AI investment, infrastructure, and policy in Saudi Arabia." />
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

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "1rem", color: "#cbd5e1", textDecoration: "none" }}
                className="hover:text-white transition-colors">Platform</a>
              <Link href="/about"
                style={{ fontSize: "1rem", color: "#cbd5e1", textDecoration: "none" }}
                className="hover:text-white transition-colors">About</Link>
              <a href="#contact"
                style={{ fontSize: "1rem", fontWeight: 700, color: "#070d18", background: "#00d9c8", textDecoration: "none", padding: "0.6rem 1.5rem", borderRadius: "6px", boxShadow: "0 0 20px rgba(0,217,200,0.4)" }}>
                Contact
              </a>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "6px", cursor: "pointer", color: "#e2e8f0", padding: "0.45rem 0.65rem", lineHeight: 1 }}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={{ borderTop: "1px solid rgba(0,217,200,0.12)", background: "rgba(7,13,24,0.98)", padding: "1.5rem" }}
            className="flex flex-col gap-5 md:hidden">
            <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "1.05rem", color: "#e2e8f0", textDecoration: "none", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              Platform
            </a>
            <Link href="/about"
              style={{ fontSize: "1.05rem", color: "#e2e8f0", textDecoration: "none", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              About
            </Link>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem", fontWeight: 700, color: "#070d18", background: "#00d9c8", textDecoration: "none", padding: "0.85rem", borderRadius: "8px", marginTop: "0.25rem", boxShadow: "0 0 20px rgba(0,217,200,0.3)" }}>
              Contact us
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "88vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}
        className="px-4 md:px-8 py-20 md:py-28">
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-60%)", width: "600px", height: "350px", background: "radial-gradient(ellipse at center, rgba(0,217,200,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", width: "100%" }}>
          <div className="inline-flex items-center gap-2" style={{ border: "1px solid rgba(0,217,200,0.35)", borderRadius: "100px", padding: "0.4rem 1.1rem 0.4rem 0.7rem", marginBottom: "2rem", background: "rgba(0,217,200,0.07)" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00d9c8", display: "inline-block", boxShadow: "0 0 8px #00d9c8", flexShrink: 0 }} />
            <span style={{ fontSize: "0.8rem", color: "#00d9c8", fontFamily: "monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>Live intelligence platform</span>
          </div>

          <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, lineHeight: 1.2, color: "#ffffff", marginBottom: "1.5rem", letterSpacing: "-0.015em" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Real-time intelligence on Saudi Arabia's AI economy.
          </h1>

          <p style={{ lineHeight: 1.8, color: "#cbd5e1", marginBottom: "2.5rem", maxWidth: "580px", marginLeft: "auto", marginRight: "auto" }}
            className="text-base md:text-lg">
            We track every deal, partnership, and policy shift in the Kingdom's AI ecosystem — so institutional investors, sovereign funds, and foreign operators don't have to.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer" data-testid="button-learn-more"
              className="w-full sm:w-auto flex items-center justify-center gap-2"
              style={{ background: "#00d9c8", color: "#070d18", fontWeight: 700, fontSize: "1.05rem", padding: "0.95rem 2.25rem", borderRadius: "8px", textDecoration: "none", boxShadow: "0 0 40px rgba(0,217,200,0.4)", letterSpacing: "0.01em" }}>
              Enter the platform
              <ExternalLink size={17} />
            </a>
            <span style={{ fontSize: "0.9rem", color: "#94a3b8", fontFamily: "monospace" }}>Free access during beta</span>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.025)", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }} className="grid grid-cols-1 sm:grid-cols-3 px-4 md:px-8 py-10 md:py-14">
          {[
            { value: "184+", label: "Entities tracked", sub: "government, corporate, VC" },
            { value: "300+", label: "Deals monitored", sub: "JVs, rounds, MoUs, acquisitions" },
            { value: "$21B+", label: "Capital flows tracked", sub: "across the AI stack" },
          ].map((s, i) => (
            <div key={s.value} className="text-center py-6 sm:py-0"
              style={{
                padding: "1.5rem",
                borderTop: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
              // On sm+ override to vertical border
            >
              <div style={{ fontFamily: "monospace", fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, color: "#00d9c8", lineHeight: 1, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ fontSize: "1rem", color: "#ffffff", fontWeight: 600, marginBottom: "0.25rem" }}>{s.label}</div>
              <div style={{ fontSize: "0.88rem", color: "#e2e8f0", fontFamily: "monospace" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLATFORM CARDS ───────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "1080px", margin: "0 auto" }} className="px-4 md:px-8 py-14 md:py-24">
        <div className="flex items-end justify-between flex-wrap gap-4" style={{ marginBottom: "2.5rem" }}>
          <div>
            <span style={SECTION_LABEL}>Platform</span>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "#ffffff", fontWeight: 400, margin: 0 }}>What's inside</h2>
          </div>
          <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
            style={{ fontSize: "0.95rem", color: "#00d9c8", textDecoration: "none", border: "1px solid rgba(0,217,200,0.35)", padding: "0.55rem 1.2rem", borderRadius: "6px", fontWeight: 500 }}>
            Explore platform <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: "rgba(0,217,200,0.1)", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0,217,200,0.1)" }}>
          {PLATFORM_CARDS.map((c) => (
            <div key={c.title} style={{ background: "#0c1829", position: "relative", overflow: "hidden" }} className="p-6 md:p-10">
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(0,217,200,0.5), transparent)" }} />
              <span style={{ fontFamily: "monospace", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#00d9c8", background: "rgba(0,217,200,0.1)", border: "1px solid rgba(0,217,200,0.25)", padding: "0.25rem 0.7rem", borderRadius: "4px", display: "inline-block", marginBottom: "1rem" }}>{c.tag}</span>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 400, color: "#ffffff", marginBottom: "0.75rem", lineHeight: 1.3 }}>{c.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "#cbd5e1", lineHeight: 1.75, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LATEST ───────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }} className="px-4 md:px-8 pb-14 md:pb-24">
        <div className="flex items-end justify-between flex-wrap gap-4" style={{ marginBottom: "2rem" }}>
          <div>
            <span style={SECTION_LABEL}>Signals</span>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "#ffffff", fontWeight: 400, margin: 0 }}>Latest from the wire</h2>
          </div>
          <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
            style={{ fontSize: "0.95rem", color: "#00d9c8", textDecoration: "none", border: "1px solid rgba(0,217,200,0.35)", padding: "0.55rem 1.2rem", borderRadius: "6px", fontWeight: 500 }}>
            View all <ArrowRight size={15} />
          </a>
        </div>

        <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.09)" }}>
          {LATEST_ITEMS.map((item, i) => (
            <div key={item.headline}
              style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none", background: "#0c1829" }}
              className="p-5 md:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", color: "#e2e8f0", fontWeight: 400, lineHeight: 1.55, margin: 0 }}>{item.headline}</p>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontFamily: "monospace", whiteSpace: "nowrap" }}>{item.date}</span>
                <span style={{ fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 600, color: "#00d9c8", border: "1px solid rgba(0,217,200,0.4)", padding: "0.2rem 0.65rem", borderRadius: "4px", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT'S NEXT ──────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }} className="px-4 md:px-8 pb-14 md:pb-24">
        <span style={SECTION_LABEL}>Roadmap</span>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "#ffffff", fontWeight: 400, marginBottom: "2rem" }}>What's next</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: "rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { tag: "Q2 2026", title: "GCC expansion", desc: "UAE coverage launching next quarter. Qatar and Bahrain to follow by end of year." },
            { tag: "Coming soon", title: "Original research", desc: "Data-driven analysis on AI policy, infrastructure, investment, and talent development across the GCC." },
          ].map((item) => (
            <div key={item.title} style={{ background: "#0c1829" }} className="p-6 md:p-10">
              <span style={{ fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#00d9c8", display: "block", marginBottom: "0.85rem" }}>{item.tag}</span>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: "#ffffff", fontWeight: 400, marginBottom: "0.65rem" }}>{item.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "#cbd5e1", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PARTNERSHIPS & SPONSORSHIPS ──────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "1080px", margin: "0 auto" }} className="px-4 md:px-8 pb-14 md:pb-24">
        <span style={SECTION_LABEL}>Work with us</span>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "#ffffff", fontWeight: 400, marginBottom: "1rem" }}>
          Actively seeking partners and sponsors
        </h2>
        <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.8, maxWidth: "680px", marginBottom: "2.5rem" }}>
          The Aqool Wire is growing fast. We're looking for organisations that want to reach the decision-makers, investors, and operators shaping the GCC's AI economy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: "rgba(0,217,200,0.1)", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0,217,200,0.1)" }}>
          {[
            {
              tag: "Partnership",
              title: "Strategic partnerships",
              bullets: [
                "Co-branded intelligence reports and research",
                "Joint coverage of events, summits, and deal flow",
                "Data-sharing arrangements for mutual intelligence",
                "Distribution to our network of investors and operators",
              ],
              cta: "Discuss a partnership",
              mailto: "jessicapino@theaqoolwire.com?subject=Strategic Partnership Inquiry",
            },
            {
              tag: "Sponsorship",
              title: "Platform sponsorships",
              bullets: [
                "Sponsored sections inside the live intelligence platform",
                "Newsletter and weekly briefing sponsorships",
                "Branded intelligence reports distributed to our audience",
                "Visibility with institutional investors and sovereign funds",
              ],
              cta: "Discuss sponsorship",
              mailto: "jessicapino@theaqoolwire.com?subject=Sponsorship Inquiry",
            },
          ].map((item) => (
            <div key={item.title} style={{ background: "#0c1829", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }} className="p-6 md:p-10">
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(0,217,200,0.5), transparent)" }} />
              <span style={{ fontFamily: "monospace", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#00d9c8", background: "rgba(0,217,200,0.1)", border: "1px solid rgba(0,217,200,0.25)", padding: "0.25rem 0.7rem", borderRadius: "4px", display: "inline-block", marginBottom: "1.1rem", alignSelf: "flex-start" }}>{item.tag}</span>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 400, color: "#ffffff", marginBottom: "1.1rem", lineHeight: 1.3 }}>{item.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.7rem", flex: 1 }}>
                {item.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", fontSize: "0.95rem", color: "#cbd5e1", lineHeight: 1.65 }}>
                    <span style={{ color: "#00d9c8", marginTop: "0.3rem", flexShrink: 0, fontSize: "0.65rem" }}>&#9654;</span>
                    {b}
                  </li>
                ))}
              </ul>
              <a href={`mailto:${item.mailto}`}
                className="inline-flex items-center gap-2"
                style={{ fontSize: "0.95rem", fontWeight: 600, color: "#070d18", background: "#00d9c8", textDecoration: "none", padding: "0.7rem 1.4rem", borderRadius: "6px", alignSelf: "flex-start", boxShadow: "0 0 20px rgba(0,217,200,0.25)" }}>
                {item.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" style={{ position: "relative", zIndex: 1, background: "rgba(0,217,200,0.03)", borderTop: "1px solid rgba(0,217,200,0.14)", borderBottom: "1px solid rgba(0,217,200,0.14)" }}
        className="px-4 md:px-8 py-16 md:py-24">
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <span style={SECTION_LABEL}>Get in touch</span>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 400, color: "#ffffff", marginBottom: "1rem" }}>
            Interested in partnering or sponsoring?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#cbd5e1", marginBottom: "2.5rem", lineHeight: 1.8 }}>
            Tell us about your organisation and what you're looking for. We'll follow up within two business days.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {field("Name", "name")}
            {field("Work Email", "email", "email")}
            {field("Organisation", "organisation")}

            <div>
              <label style={formLabel}>Interest</label>
              <select value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                required data-testid="select-interest"
                style={{ ...inputBase, cursor: "pointer", color: formData.interest ? "#ffffff" : "#94a3b8" }}>
                <option value="">Select your interest</option>
                <option value="Platform Access">Platform Access</option>
                <option value="Request Demo">Request Demo</option>
                <option value="Partnership">Partnership</option>
                <option value="Sponsor">Sponsor</option>
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
                I consent to The Aqool Wire contacting me about relevant intelligence and advisory services.
              </label>
            </div>

            <button type="submit" disabled={submitting} data-testid="button-submit"
              style={{ background: "#00d9c8", color: "#070d18", border: "none", borderRadius: "8px", padding: "1rem 1.5rem", fontSize: "1.05rem", fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1, boxShadow: "0 0 30px rgba(0,217,200,0.35)", letterSpacing: "0.01em", transition: "all 0.2s" }}>
              {submitting ? "Sending..." : "Send Message"}
            </button>

            <p style={{ textAlign: "center", fontSize: "0.95rem", color: "#94a3b8" }}>
              We respond to all enquiries within two business days.
            </p>
          </form>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{ position: "relative", zIndex: 1 }} className="px-4 md:px-8 pt-10 pb-8">
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <Link href="/">
              <img src={logoImage} alt="The Aqool Wire"
                style={{ height: "80px", width: "auto", opacity: 0.9, filter: "drop-shadow(0 0 10px rgba(0,217,200,0.3)) brightness(1.1)" }} />
            </Link>
            <div className="flex flex-wrap gap-6 sm:gap-8">
              {[
                { label: "Platform", href: "https://live.theaqoolwire.com/", external: true },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/the-aqool-wire", external: true },
                { label: "About", href: "/about", external: false },
                { label: "Privacy", href: "/privacy", external: false },
              ].map((item) =>
                item.external ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.95rem", color: "#cbd5e1", textDecoration: "none" }}
                    className="hover:text-white transition-colors">{item.label}</a>
                ) : (
                  <Link key={item.label} href={item.href}
                    style={{ fontSize: "0.95rem", color: "#cbd5e1", textDecoration: "none" }}
                    className="hover:text-white transition-colors">{item.label}</Link>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-6">
            <p style={{ fontSize: "0.88rem", color: "#94a3b8", margin: 0 }}>
              &copy; {new Date().getFullYear()} The Aqool Wire. All rights reserved.
            </p>
            <p style={{ fontSize: "0.88rem", color: "#94a3b8", fontFamily: "monospace", margin: 0 }}>
              Saudi Arabia &middot; GCC &middot; AI Intelligence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
