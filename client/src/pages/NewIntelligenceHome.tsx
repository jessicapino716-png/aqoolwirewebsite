import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink } from "lucide-react";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";

function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.006;

      const cols = 100;
      const rows = 40;
      const spacingX = canvas.width / (cols - 1);
      const spacingY = 14;
      const centerY = canvas.height * 0.5;

      // Store particle positions for line drawing
      const positions: { x: number; y: number; alpha: number }[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacingX;
          const normRow = (row - rows / 2) / (rows / 2);
          const normCol = col / (cols - 1);

          const wave1 = Math.sin(col * 0.12 + time * 1.1 + row * 0.25) * 55;
          const wave2 = Math.sin(col * 0.07 - time * 0.7 + row * 0.18) * 35;
          const wave3 = Math.sin(col * 0.2 + time * 0.5 + row * 0.1) * 20;
          const wave4 = Math.cos(col * 0.05 + time * 0.9) * 15;

          const y = centerY + row * spacingY - (rows * spacingY) / 2 + wave1 + wave2 + wave3 + wave4;

          const edgeFadeX = 1 - Math.pow(Math.abs(normCol - 0.5) * 2, 2);
          const edgeFadeRow = 1 - Math.pow(normRow, 2) * 0.8;
          const alpha = edgeFadeX * edgeFadeRow * 0.55;

          const size = edgeFadeX * edgeFadeRow * 1.8 + 0.4;

          // Color varies slightly — cyan to blue tones
          const hue = 180 + Math.sin(col * 0.05 + time * 0.3) * 20;
          const sat = 80 + Math.sin(row * 0.15 + time * 0.2) * 15;

          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.3, size), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, ${sat}%, 65%, ${alpha})`;
          ctx.fill();

          positions.push({ x, y, alpha });
        }
      }

      // Draw connecting lines between nearby particles in same row
      ctx.lineWidth = 0.4;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 1; col++) {
          const i = row * cols + col;
          const next = row * cols + col + 1;
          const p1 = positions[i];
          const p2 = positions[next];
          if (!p1 || !p2) continue;

          const lineAlpha = Math.min(p1.alpha, p2.alpha) * 0.4;
          if (lineAlpha < 0.03) continue;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 217, 200, ${lineAlpha})`;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

const PLATFORM_CARDS = [
  {
    title: "Entity profiles",
    desc: "Deep intelligence profiles for HUMAIN, PIF, SDAIA, Aramco Digital, and 180+ other organizations. Deals, partnerships, key people, citations.",
  },
  {
    title: "Deal intelligence",
    desc: "Every sovereign JV, VC round, infrastructure deal, MoU, and acquisition tracked in real time with full source attribution.",
  },
  {
    title: "Weekly briefing",
    desc: "AI-synthesized weekly intelligence report covering deals, policy changes, and partnership announcements. Sourced from 60+ publications.",
  },
  {
    title: "VC directory",
    desc: "71 investors active in Saudi tech. Fund sizes, portfolio companies, investment thesis, and sector focus — all in one place.",
  },
];

const LATEST_ITEMS = [
  {
    headline: "Aramco awards $371M supercomputing contract to STC Solutions",
    date: "Mar 24, 2026",
    tag: "Partnership",
  },
  {
    headline: "HUMAIN + Turing: AI Agent Marketplace on HUMAIN ONE",
    date: "Mar 26, 2026",
    tag: "Partnership",
  },
  {
    headline: "SAMA launches open banking licenses under Vision 2030",
    date: "Mar 27, 2026",
    tag: "Policy",
  },
];

export default function NewIntelligenceHome() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    interest: "",
    message: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please consent to be contacted",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast({
        title: "Message Sent!",
        description: "We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", organisation: "", interest: "", message: "", consent: false });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(13, 30, 51, 0.8)",
    border: "1px solid rgba(0, 217, 200, 0.2)",
    borderRadius: "6px",
    padding: "0.85rem 1.1rem",
    color: "#e2e8f0",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "monospace",
    fontSize: "0.72rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#00d9c8",
    marginBottom: "0.5rem",
  };

  return (
    <div style={{ background: "#080f1a", minHeight: "100vh", color: "#e2e8f0", fontFamily: "'Inter', sans-serif", position: "relative", overflowX: "hidden" }}>
      <Helmet>
        <title>The Aqool Wire — Real-time AI Intelligence for Saudi Arabia</title>
        <meta name="description" content="Real-time intelligence on AI investment, infrastructure, and policy in Saudi Arabia. We track every deal, partnership, and policy shift in the Kingdom's AI ecosystem." />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Helmet>

      <ParticleWave />

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 10, borderBottom: "1px solid rgba(0,217,200,0.15)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <Link href="/">
            <img src={logoImage} alt="The Aqool Wire" style={{ height: "56px", width: "auto", cursor: "pointer" }} />
          </Link>

          <div className="hidden md:flex" style={{ alignItems: "center", gap: "2.5rem" }}>
            {[
              { label: "Platform", href: "https://live.theaqoolwire.com/", external: true },
              { label: "About", href: "/about", external: false },
            ].map((item) =>
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "monospace", fontSize: "0.82rem", letterSpacing: "0.08em", color: "#94a3b8", textDecoration: "none", textTransform: "uppercase" }}
                  className="hover:text-white transition-colors">{item.label}</a>
              ) : (
                <Link key={item.label} href={item.href}
                  style={{ fontFamily: "monospace", fontSize: "0.82rem", letterSpacing: "0.08em", color: "#94a3b8", textDecoration: "none", textTransform: "uppercase" }}
                  className="hover:text-white transition-colors">{item.label}</Link>
              )
            )}
            <a href="#contact"
              style={{ fontFamily: "monospace", fontSize: "0.82rem", letterSpacing: "0.08em", color: "#00d9c8", textDecoration: "none", textTransform: "uppercase", border: "1px solid rgba(0,217,200,0.5)", padding: "0.4rem 1rem", borderRadius: "4px" }}
              className="hover:bg-cyan-500/10 transition-colors">
              Contact
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "1.4rem", padding: "0.5rem" }}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ borderTop: "1px solid rgba(0,217,200,0.12)", padding: "1.25rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem", background: "#080f1a" }}>
            <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#94a3b8", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>Platform</a>
            <Link href="/about" style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#94a3b8", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>About</Link>
            <a href="#contact" style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#00d9c8", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>Contact</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", padding: "8rem 2rem 6rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontWeight: 400, lineHeight: 1.2, color: "#ffffff", marginBottom: "1.75rem", letterSpacing: "-0.01em" }}>
          Real-time intelligence on AI investment, infrastructure, and policy in Saudi Arabia.
        </h1>
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.75, color: "#cbd5e1", marginBottom: "3rem", maxWidth: "640px", marginLeft: "auto", marginRight: "auto" }}>
          We track every deal, every partnership, and every policy shift in the Kingdom's AI ecosystem so institutional investors, sovereign funds, and foreign operators don't have to.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
          <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer" data-testid="button-learn-more"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#00d9c8", color: "#080f1a", fontWeight: 700, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "6px", textDecoration: "none", letterSpacing: "0.02em", boxShadow: "0 0 30px rgba(0,217,200,0.35)" }}>
            Enter the platform
            <ExternalLink style={{ width: "15px", height: "15px" }} />
          </a>
          <span style={{ fontSize: "0.95rem", color: "#cbd5e1", fontFamily: "monospace", letterSpacing: "0.04em" }}>Free access during beta</span>
        </div>
      </section>

      {/* Stats */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "3rem 2rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", textAlign: "center" }}>
          {[
            { value: "184+", label: "entities tracked" },
            { value: "300+", label: "deals monitored" },
            { value: "$21B+", label: "capital flows tracked" },
          ].map((stat) => (
            <div key={stat.value}>
              <div style={{ fontFamily: "monospace", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, color: "#00d9c8", lineHeight: 1, marginBottom: "0.6rem" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#94a3b8", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's on the platform */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", padding: "5rem 2rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#00d9c8", marginBottom: "2.5rem" }}>
          What's on the platform
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(0,217,200,0.12)", border: "1px solid rgba(0,217,200,0.12)", borderRadius: "10px", overflow: "hidden" }}>
          {PLATFORM_CARDS.map((card) => (
            <div key={card.title} style={{ background: "#0d1e33", padding: "2.25rem 2.5rem" }}>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 400, color: "#ffffff", marginBottom: "0.85rem", lineHeight: 1.3 }}>
                {card.title}
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#94a3b8", lineHeight: 1.7 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest from the wire */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", padding: "0 2rem 5rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#00d9c8", marginBottom: "2rem" }}>
          Latest from the wire
        </p>
        <div style={{ border: "1px solid rgba(0,217,200,0.12)", borderRadius: "10px", overflow: "hidden" }}>
          {LATEST_ITEMS.map((item, i) => (
            <div key={item.headline}
              style={{ padding: "1.6rem 2rem", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none", background: "#0d1e33", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#e2e8f0", fontWeight: 400, lineHeight: 1.55, flex: 1, minWidth: "200px" }}>
                {item.headline}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#64748b" }}>{item.date}</span>
                <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#00d9c8", border: "1px solid rgba(0,217,200,0.35)", padding: "0.2rem 0.6rem", borderRadius: "3px", letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#00d9c8", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            View all on platform &rarr;
          </a>
        </div>
      </section>

      {/* What's next */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", padding: "0 2rem 5rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#00d9c8", marginBottom: "2rem" }}>
          What's next
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(0,217,200,0.12)", border: "1px solid rgba(0,217,200,0.12)", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ background: "#0d1e33", padding: "2.25rem 2.5rem" }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", color: "#ffffff", fontWeight: 400, marginBottom: "0.6rem" }}>GCC expansion</h3>
            <p style={{ fontSize: "0.92rem", color: "#94a3b8", lineHeight: 1.65 }}>UAE coverage launching Q2 2026. Qatar and Bahrain to follow.</p>
          </div>
          <div style={{ background: "#0d1e33", padding: "2.25rem 2.5rem" }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", color: "#ffffff", fontWeight: 400, marginBottom: "0.6rem" }}>Original research</h3>
            <p style={{ fontSize: "0.92rem", color: "#94a3b8", lineHeight: 1.65 }}>Data-driven analysis on GCC AI infrastructure economics. Coming soon.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "5rem 2rem 6rem" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={labelStyle}>Get in touch</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: "#ffffff", marginBottom: "0.75rem" }}>
            Interested in early access?
          </h2>
          <p style={{ fontSize: "1rem", color: "#94a3b8", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Reach out to discuss platform access, partnerships, or custom intelligence requests.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { label: "Name", key: "name", type: "text" },
              { label: "Email", key: "email", type: "email" },
              { label: "Organisation", key: "organisation", type: "text" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input type={type} value={(formData as any)[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  required data-testid={`input-${key}`} style={inputStyle} />
              </div>
            ))}

            <div>
              <label style={labelStyle}>Interest</label>
              <select value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                required data-testid="select-interest"
                style={{ ...inputStyle, cursor: "pointer", color: formData.interest ? "#e2e8f0" : "#64748b" }}>
                <option value="">Select your interest</option>
                <option value="Platform Access">Platform Access</option>
                <option value="Request Demo">Request Demo</option>
                <option value="Partnership">Partnership</option>
                <option value="Sponsor">Sponsor</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required data-testid="textarea-message"
                style={{ ...inputStyle, minHeight: "130px", resize: "vertical" }} />
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
              <input type="checkbox" id="consent" checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                required data-testid="checkbox-consent"
                style={{ marginTop: "3px", accentColor: "#00d9c8", width: "16px", height: "16px", flexShrink: 0, cursor: "pointer" }} />
              <label htmlFor="consent" style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6, cursor: "pointer" }}>
                I consent to The Aqool Wire contacting me about relevant intelligence and advisory services.
              </label>
            </div>

            <button type="submit" disabled={submitting} data-testid="button-submit"
              style={{ background: "#00d9c8", color: "#080f1a", border: "none", borderRadius: "6px", padding: "0.9rem 1.5rem", fontSize: "0.95rem", fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1, letterSpacing: "0.02em", boxShadow: "0 0 20px rgba(0,217,200,0.3)", transition: "all 0.2s" }}>
              {submitting ? "Sending..." : "Send Message"}
            </button>

            <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#475569" }}>
              Interested in a formal partnership?{" "}
              <a href="mailto:jessicapino@theaqoolwire.com?subject=Partnership Inquiry" data-testid="button-become-partner"
                style={{ color: "#00d9c8", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Become a Partner
              </a>
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.07)", padding: "2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <Link href="/">
            <img src={logoImage} alt="The Aqool Wire" style={{ height: "36px", width: "auto", opacity: 0.7 }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/company/the-aqool-wire", external: true },
              { label: "About", href: "/about", external: false },
              { label: "Privacy", href: "/privacy", external: false },
            ].map((item) =>
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#475569", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href}
                  style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#475569", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {item.label}
                </Link>
              )
            )}
          </div>
          <p style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#334155" }}>
            &copy; {new Date().getFullYear()} The Aqool Wire
          </p>
        </div>
      </footer>
    </div>
  );
}
