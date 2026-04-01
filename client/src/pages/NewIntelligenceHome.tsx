import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, ArrowRight } from "lucide-react";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";

/* ── Colour tokens ──────────────────────────────────────────────────
   text-primary   : #ffffff
   text-body      : #e2e8f0   ← all card/section body copy
   text-secondary : #cbd5e1   ← sub-headings, descriptions
   text-muted     : #94a3b8   ← dates, metadata, footer links
   text-dim       : #64748b   ← copyright, lowest-priority text
   accent         : #00d9c8
──────────────────────────────────────────────────────────────────── */

/* ── Animated mesh background ─────────────────────────────────────── */
function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const COLS = 90, ROWS = 38;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.005;
      const sx = canvas.width / (COLS - 1);
      const sy = 16;
      const cy = canvas.height * 0.52;

      type Pt = { x: number; y: number; a: number };
      const pts: Pt[] = new Array(COLS * ROWS);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = c * sx;
          const nc = c / (COLS - 1);
          const nr = (r - ROWS / 2) / (ROWS / 2);
          const w1 = Math.sin(c * 0.13 + t * 1.0 + r * 0.22) * 60;
          const w2 = Math.sin(c * 0.06 - t * 0.65 + r * 0.16) * 38;
          const w3 = Math.sin(c * 0.19 + t * 0.45 + r * 0.08) * 22;
          const w4 = Math.cos(c * 0.04 + t * 0.8) * 14;
          const y = cy + r * sy - (ROWS * sy) / 2 + w1 + w2 + w3 + w4;
          const fadeX = 1 - Math.pow(Math.abs(nc - 0.5) * 2, 1.8);
          const fadeR = 1 - Math.pow(nr, 2) * 0.75;
          const a = fadeX * fadeR * 0.65;
          const sz = fadeX * fadeR * 2.2 + 0.5;
          const hue = 178 + Math.sin(c * 0.06 + t * 0.25) * 22;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.4, sz), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 85%, 60%, ${a})`;
          ctx.fill();
          pts[r * COLS + c] = { x, y, a };
        }
      }

      ctx.lineWidth = 0.5;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const p1 = pts[r * COLS + c]; const p2 = pts[r * COLS + c + 1];
          const la = Math.min(p1.a, p2.a) * 0.5;
          if (la < 0.04) continue;
          ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0,217,200,${la})`; ctx.stroke();
        }
      }
      for (let r = 0; r < ROWS - 1; r++) {
        for (let c = 0; c < COLS; c += 3) {
          const p1 = pts[r * COLS + c]; const p2 = pts[(r + 1) * COLS + c];
          const la = Math.min(p1.a, p2.a) * 0.25;
          if (la < 0.03) continue;
          ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0,153,255,${la})`; ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

/* ── Data ─────────────────────────────────────────────────────────── */
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

/* shared style fragments */
const SECTION_LABEL: React.CSSProperties = {
  fontFamily: "monospace", fontSize: "0.82rem", letterSpacing: "0.14em",
  textTransform: "uppercase", color: "#00d9c8", marginBottom: "0.5rem", display: "block",
};

/* ── Main component ───────────────────────────────────────────────── */
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
      <nav style={{ position: "relative", zIndex: 20, borderBottom: "1px solid rgba(0,217,200,0.18)", backdropFilter: "blur(12px)", background: "rgba(7,13,24,0.75)" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "88px" }}>
          <Link href="/">
            <img src={logoImage} alt="The Aqool Wire"
              style={{ height: "120px", width: "auto", cursor: "pointer", filter: "drop-shadow(0 0 14px rgba(0,217,200,0.45)) brightness(1.1)", position: "relative", zIndex: 1 }} />
          </Link>

          <div className="hidden md:flex" style={{ alignItems: "center", gap: "2.5rem" }}>
            <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "1rem", color: "#cbd5e1", textDecoration: "none" }}
              className="hover:text-white transition-colors">Platform</a>
            <Link href="/about"
              style={{ fontSize: "1rem", color: "#cbd5e1", textDecoration: "none" }}
              className="hover:text-white transition-colors">About</Link>
            <a href="#contact"
              style={{ fontSize: "1rem", fontWeight: 700, color: "#070d18", background: "#00d9c8", textDecoration: "none", padding: "0.6rem 1.5rem", borderRadius: "6px", letterSpacing: "0.01em", boxShadow: "0 0 20px rgba(0,217,200,0.4)" }}>
              Contact
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", cursor: "pointer", color: "#e2e8f0", fontSize: "1.2rem", padding: "0.4rem 0.75rem" }}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ borderTop: "1px solid rgba(0,217,200,0.12)", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem", background: "rgba(7,13,24,0.97)" }}>
            <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "1rem", color: "#e2e8f0", textDecoration: "none" }}>Platform</a>
            <Link href="/about" style={{ fontSize: "1rem", color: "#e2e8f0", textDecoration: "none" }}>About</Link>
            <a href="#contact" style={{ fontSize: "1rem", color: "#00d9c8", textDecoration: "none", fontWeight: 700 }}>Contact</a>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "92vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "6rem 2rem 4rem" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-60%)", width: "700px", height: "400px", background: "radial-gradient(ellipse at center, rgba(0,217,200,0.09) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "860px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "1px solid rgba(0,217,200,0.35)", borderRadius: "100px", padding: "0.4rem 1.1rem 0.4rem 0.7rem", marginBottom: "2.5rem", background: "rgba(0,217,200,0.07)" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00d9c8", display: "inline-block", boxShadow: "0 0 8px #00d9c8", flexShrink: 0 }} />
            <span style={{ fontSize: "0.85rem", color: "#00d9c8", fontFamily: "monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>Live intelligence platform</span>
          </div>

          <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2.4rem, 5.5vw, 4rem)", fontWeight: 400, lineHeight: 1.18, color: "#ffffff", marginBottom: "1.75rem", letterSpacing: "-0.015em" }}>
            Real-time intelligence on Saudi Arabia's AI economy.
          </h1>

          <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", lineHeight: 1.8, color: "#cbd5e1", marginBottom: "3rem", maxWidth: "640px", marginLeft: "auto", marginRight: "auto" }}>
            We track every deal, partnership, and policy shift in the Kingdom's AI ecosystem — so institutional investors, sovereign funds, and foreign operators don't have to.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer" data-testid="button-learn-more"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#00d9c8", color: "#070d18", fontWeight: 700, fontSize: "1.05rem", padding: "0.9rem 2.25rem", borderRadius: "8px", textDecoration: "none", boxShadow: "0 0 40px rgba(0,217,200,0.4), 0 4px 20px rgba(0,0,0,0.4)", letterSpacing: "0.01em" }}>
              Enter the platform
              <ExternalLink style={{ width: "17px", height: "17px" }} />
            </a>
            <span style={{ fontSize: "0.95rem", color: "#94a3b8", fontFamily: "monospace" }}>Free access during beta</span>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.025)", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3.5rem 2rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { value: "184+", label: "Entities tracked", sub: "government, corporate, VC" },
            { value: "300+", label: "Deals monitored", sub: "JVs, rounds, MoUs, acquisitions" },
            { value: "$21B+", label: "Capital flows tracked", sub: "across the AI stack" },
          ].map((s, i) => (
            <div key={s.value} style={{ textAlign: "center", padding: "0 1.5rem", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <div style={{ fontFamily: "monospace", fontSize: "clamp(2.25rem, 4vw, 3rem)", fontWeight: 700, color: "#00d9c8", lineHeight: 1, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ fontSize: "1rem", color: "#ffffff", fontWeight: 600, marginBottom: "0.3rem" }}>{s.label}</div>
              <div style={{ fontSize: "0.9rem", color: "#e2e8f0", fontFamily: "monospace" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLATFORM CARDS ───────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "1080px", margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={SECTION_LABEL}>Platform</span>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#ffffff", fontWeight: 400, margin: 0 }}>What's inside</h2>
          </div>
          <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.95rem", color: "#00d9c8", textDecoration: "none", border: "1px solid rgba(0,217,200,0.35)", padding: "0.55rem 1.2rem", borderRadius: "6px", fontWeight: 500 }}>
            Explore platform <ArrowRight style={{ width: "15px", height: "15px" }} />
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(0,217,200,0.1)", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0,217,200,0.1)" }}>
          {PLATFORM_CARDS.map((c) => (
            <div key={c.title} style={{ background: "#0c1829", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(0,217,200,0.5), transparent)" }} />
              <span style={{ fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#00d9c8", background: "rgba(0,217,200,0.1)", border: "1px solid rgba(0,217,200,0.25)", padding: "0.25rem 0.7rem", borderRadius: "4px", display: "inline-block", marginBottom: "1.25rem" }}>{c.tag}</span>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 400, color: "#ffffff", marginBottom: "0.85rem", lineHeight: 1.3 }}>{c.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "#cbd5e1", lineHeight: 1.75, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LATEST ───────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "0 2rem 6rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={SECTION_LABEL}>Signals</span>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#ffffff", fontWeight: 400, margin: 0 }}>Latest from the wire</h2>
          </div>
          <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.95rem", color: "#00d9c8", textDecoration: "none", border: "1px solid rgba(0,217,200,0.35)", padding: "0.55rem 1.2rem", borderRadius: "6px", fontWeight: 500 }}>
            View all <ArrowRight style={{ width: "15px", height: "15px" }} />
          </a>
        </div>

        <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.09)" }}>
          {LATEST_ITEMS.map((item, i) => (
            <div key={item.headline} style={{ padding: "1.75rem 2rem", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none", background: "#0c1829", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", color: "#e2e8f0", fontWeight: 400, lineHeight: 1.5, flex: 1, minWidth: "200px", margin: 0 }}>{item.headline}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", flexShrink: 0 }}>
                <span style={{ fontSize: "0.88rem", color: "#94a3b8", fontFamily: "monospace", whiteSpace: "nowrap" }}>{item.date}</span>
                <span style={{ fontFamily: "monospace", fontSize: "0.78rem", fontWeight: 600, color: "#00d9c8", border: "1px solid rgba(0,217,200,0.4)", padding: "0.25rem 0.75rem", borderRadius: "4px", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT'S NEXT ──────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "0 2rem 6rem" }}>
        <span style={SECTION_LABEL}>Roadmap</span>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#ffffff", fontWeight: 400, marginBottom: "2rem" }}>What's next</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { tag: "Q2 2026", title: "GCC expansion", desc: "UAE coverage launching next quarter. Qatar and Bahrain to follow by end of year." },
            { tag: "Coming soon", title: "Original research", desc: "Data-driven analysis on AI policy, infrastructure, investment, and talent development across the GCC." },
          ].map((item) => (
            <div key={item.title} style={{ background: "#0c1829", padding: "2.5rem" }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#00d9c8", display: "block", marginBottom: "1rem" }}>{item.tag}</span>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem", color: "#ffffff", fontWeight: 400, marginBottom: "0.65rem" }}>{item.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "#cbd5e1", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PARTNERSHIPS & SPONSORSHIPS ──────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "1080px", margin: "0 auto", padding: "0 2rem 6rem" }}>
        <span style={SECTION_LABEL}>Work with us</span>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#ffffff", fontWeight: 400, marginBottom: "1rem" }}>
          Actively seeking partners and sponsors
        </h2>
        <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.8, maxWidth: "680px", marginBottom: "3rem" }}>
          The Aqool Wire is growing fast. We're looking for organisations that want to reach the decision-makers, investors, and operators shaping Saudi Arabia's AI economy.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(0,217,200,0.1)", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0,217,200,0.1)" }}>
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
            <div key={item.title} style={{ background: "#0c1829", padding: "2.5rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(0,217,200,0.5), transparent)" }} />
              <span style={{ fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#00d9c8", background: "rgba(0,217,200,0.1)", border: "1px solid rgba(0,217,200,0.25)", padding: "0.25rem 0.7rem", borderRadius: "4px", display: "inline-block", marginBottom: "1.25rem", alignSelf: "flex-start" }}>{item.tag}</span>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 400, color: "#ffffff", marginBottom: "1.25rem", lineHeight: 1.3 }}>{item.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                {item.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.95rem", color: "#cbd5e1", lineHeight: 1.65 }}>
                    <span style={{ color: "#00d9c8", marginTop: "0.3rem", flexShrink: 0, fontSize: "0.7rem" }}>&#9654;</span>
                    {b}
                  </li>
                ))}
              </ul>
              <a href={`mailto:${item.mailto}`}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", fontWeight: 600, color: "#070d18", background: "#00d9c8", textDecoration: "none", padding: "0.7rem 1.4rem", borderRadius: "6px", alignSelf: "flex-start", boxShadow: "0 0 20px rgba(0,217,200,0.25)" }}>
                {item.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" style={{ position: "relative", zIndex: 1, background: "rgba(0,217,200,0.03)", borderTop: "1px solid rgba(0,217,200,0.14)", borderBottom: "1px solid rgba(0,217,200,0.14)", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <span style={SECTION_LABEL}>Get in touch</span>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 400, color: "#ffffff", marginBottom: "1rem" }}>
            Interested in partnering or sponsoring?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#cbd5e1", marginBottom: "3rem", lineHeight: 1.8 }}>
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
      <footer style={{ position: "relative", zIndex: 1, padding: "3rem 2rem 2.5rem" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <Link href="/">
              <img src={logoImage} alt="The Aqool Wire" style={{ height: "120px", width: "auto", opacity: 0.9, filter: "drop-shadow(0 0 12px rgba(0,217,200,0.35)) brightness(1.1)" }} />
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", flexWrap: "wrap" }}>
              {[
                { label: "Platform", href: "https://live.theaqoolwire.com/", external: true },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/the-aqool-wire", external: true },
                { label: "About", href: "/about", external: false },
                { label: "Privacy", href: "/privacy", external: false },
              ].map((item) =>
                item.external ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "1rem", color: "#cbd5e1", textDecoration: "none" }}
                    className="hover:text-white transition-colors">{item.label}</a>
                ) : (
                  <Link key={item.label} href={item.href}
                    style={{ fontSize: "1rem", color: "#cbd5e1", textDecoration: "none" }}
                    className="hover:text-white transition-colors">{item.label}</Link>
                )
              )}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", paddingTop: "1.5rem" }}>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", margin: 0 }}>
              &copy; {new Date().getFullYear()} The Aqool Wire. All rights reserved.
            </p>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", fontFamily: "monospace", margin: 0 }}>
              Saudi Arabia &middot; GCC &middot; AI Intelligence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
