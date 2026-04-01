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

    const cols = 80;
    const rows = 30;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      const spacingX = canvas.width / (cols - 1);
      const spacingY = 12;
      const offsetY = canvas.height * 0.45;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacingX;
          const wave1 = Math.sin(col * 0.15 + time * 1.2 + row * 0.3) * 40;
          const wave2 = Math.sin(col * 0.08 - time * 0.8 + row * 0.2) * 25;
          const wave3 = Math.sin(col * 0.22 + time * 0.6) * 15;
          const y = offsetY + row * spacingY + wave1 + wave2 + wave3;

          const distFromCenter = Math.abs(col - cols / 2) / (cols / 2);
          const rowFade = 1 - Math.abs(row - rows / 2) / (rows / 2);
          const alpha = (1 - distFromCenter * 0.6) * rowFade * 0.35;

          const size = (1 - distFromCenter * 0.5) * rowFade * 1.5;

          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.3, size), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 217, 200, ${alpha})`;
          ctx.fill();
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
        opacity: 0.7,
      }}
    />
  );
}

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

      setFormData({
        name: "",
        email: "",
        organisation: "",
        interest: "",
        message: "",
        consent: false,
      });
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

  return (
    <div
      style={{
        background: "#0a1628",
        minHeight: "100vh",
        color: "#e2e8f0",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <Helmet>
        <title>The Aqool Wire — Real-time AI Intelligence for Saudi Arabia</title>
        <meta
          name="description"
          content="Real-time intelligence on AI investment, infrastructure, and policy in Saudi Arabia. We track every deal, partnership, and policy shift in the Kingdom's AI ecosystem."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Helmet>

      <ParticleWave />

      {/* Navigation */}
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          borderBottom: "1px solid rgba(0,217,200,0.12)",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          <Link href="/">
            <img
              src={logoImage}
              alt="The Aqool Wire"
              style={{ height: "48px", width: "auto", cursor: "pointer", opacity: 0.95 }}
            />
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
            className="hidden md:flex"
          >
            <a
              href="https://live.theaqoolwire.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                color: "#94a3b8",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
              className="hover:text-white transition-colors"
            >
              Platform
            </a>
            <Link
              href="/about"
              style={{
                fontFamily: "monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                color: "#94a3b8",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
              className="hover:text-white transition-colors"
            >
              About
            </Link>
            <a
              href="#contact"
              style={{
                fontFamily: "monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                color: "#00d9c8",
                textDecoration: "none",
                textTransform: "uppercase",
                border: "1px solid rgba(0,217,200,0.4)",
                padding: "0.35rem 0.85rem",
                borderRadius: "4px",
              }}
              className="hover:bg-cyan-500/10 transition-colors"
            >
              Contact
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "1.25rem" }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            style={{
              borderTop: "1px solid rgba(0,217,200,0.12)",
              padding: "1rem 0",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <a href="https://live.theaqoolwire.com/" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: "0.08em", color: "#94a3b8", textDecoration: "none", textTransform: "uppercase" }}>
              Platform
            </a>
            <Link href="/about"
              style={{ fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: "0.08em", color: "#94a3b8", textDecoration: "none", textTransform: "uppercase" }}>
              About
            </Link>
            <a href="#contact"
              style={{ fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: "0.08em", color: "#00d9c8", textDecoration: "none", textTransform: "uppercase" }}>
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "860px",
          margin: "0 auto",
          padding: "7rem 2rem 5rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
            fontWeight: 400,
            lineHeight: 1.25,
            color: "#ffffff",
            marginBottom: "1.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          Real-time intelligence on AI investment, infrastructure, and policy in Saudi Arabia.
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: "#94a3b8",
            marginBottom: "2.5rem",
            maxWidth: "680px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          We track every deal, every partnership, and every policy shift in the Kingdom's AI ecosystem so institutional investors, sovereign funds, and foreign operators don't have to.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="https://live.theaqoolwire.com/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-learn-more"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#00d9c8",
              color: "#0a1628",
              fontWeight: 600,
              fontSize: "0.9rem",
              padding: "0.75rem 1.75rem",
              borderRadius: "6px",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            Enter the platform
            <ExternalLink style={{ width: "14px", height: "14px" }} />
          </a>
          <span style={{ fontSize: "0.82rem", color: "#64748b", fontFamily: "monospace" }}>
            Free access during beta
          </span>
        </div>
      </section>

      {/* Stats Row */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "2.5rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {[
            { value: "184+", label: "entities tracked" },
            { value: "300+", label: "deals monitored" },
            { value: "$21B+", label: "capital flows tracked" },
          ].map((stat) => (
            <div key={stat.value}>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  color: "#00d9c8",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's on the platform */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "5rem 2rem",
        }}
      >
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#64748b",
            marginBottom: "2.5rem",
          }}
        >
          What's on the platform
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {[
            {
              title: "Entity profiles",
              desc: "Deep intelligence profiles for HUMAIN, PIF, SDAIA, Aramco Digital, and 180+ other organizations. Deals, partnerships, key people, citations.",
            },
            {
              title: "Deal intelligence",
              desc: "Every sovereign JV, VC round, infrastructure deal, MoU, and acquisition tracked in real time with source attribution.",
            },
            {
              title: "Weekly briefing",
              desc: "AI-synthesized weekly intelligence report covering deals, policy changes, and partnership announcements. Sourced from 60+ publications.",
            },
            {
              title: "VC directory",
              desc: "71 investors active in Saudi tech. Fund sizes, portfolio companies, investment thesis, and sector focus.",
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: "#0d1e33",
                padding: "2rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.05rem",
                  fontWeight: 400,
                  color: "#ffffff",
                  marginBottom: "0.75rem",
                }}
              >
                {card.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.65 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest from the wire */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 2rem 5rem",
        }}
      >
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#64748b",
            marginBottom: "2rem",
          }}
        >
          Latest from the wire
        </p>
        <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", overflow: "hidden" }}>
          {LATEST_ITEMS.map((item, i) => (
            <div
              key={item.headline}
              style={{
                padding: "1.4rem 1.75rem",
                borderTop: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                background: "#0d1e33",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "0.95rem",
                  color: "#e2e8f0",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  flex: 1,
                  minWidth: "200px",
                }}
              >
                {item.headline}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#64748b" }}>{item.date}</span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.68rem",
                    color: "#00d9c8",
                    border: "1px solid rgba(0,217,200,0.3)",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "3px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <a
            href="https://live.theaqoolwire.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              color: "#00d9c8",
              textDecoration: "none",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            View all on platform &rarr;
          </a>
        </div>
      </section>

      {/* What's next */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 2rem 5rem",
        }}
      >
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#64748b",
            marginBottom: "2rem",
          }}
        >
          What's next
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div style={{ background: "#0d1e33", padding: "2rem" }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#ffffff", fontWeight: 400, marginBottom: "0.5rem" }}>
              GCC expansion
            </h3>
            <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.65 }}>
              UAE coverage launching Q2 2026. Qatar and Bahrain to follow.
            </p>
          </div>
          <div style={{ background: "#0d1e33", padding: "2rem" }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#ffffff", fontWeight: 400, marginBottom: "0.5rem" }}>
              Original research
            </h3>
            <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.65 }}>
              Data-driven analysis on GCC AI infrastructure economics. Coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "5rem 2rem",
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#64748b",
              marginBottom: "1rem",
            }}
          >
            Get in touch
          </p>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              color: "#ffffff",
              marginBottom: "0.75rem",
            }}
          >
            Interested in early access?
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "2.5rem", lineHeight: 1.65 }}>
            Reach out to discuss platform access, partnerships, or custom intelligence requests.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { label: "Name", key: "name", type: "text" },
              { label: "Email", key: "email", type: "email" },
              { label: "Organisation", key: "organisation", type: "text" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#64748b",
                    marginBottom: "0.5rem",
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  value={(formData as any)[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  required
                  data-testid={`input-${key}`}
                  style={{
                    width: "100%",
                    background: "#0d1e33",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    padding: "0.7rem 1rem",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#64748b",
                  marginBottom: "0.5rem",
                }}
              >
                Interest
              </label>
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                required
                data-testid="select-interest"
                style={{
                  width: "100%",
                  background: "#0d1e33",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                  padding: "0.7rem 1rem",
                  color: formData.interest ? "#ffffff" : "#64748b",
                  fontSize: "0.9rem",
                  outline: "none",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              >
                <option value="">Select your interest</option>
                <option value="Platform Access">Platform Access</option>
                <option value="Request Demo">Request Demo</option>
                <option value="Partnership">Partnership</option>
                <option value="Sponsor">Sponsor</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#64748b",
                  marginBottom: "0.5rem",
                }}
              >
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                data-testid="textarea-message"
                style={{
                  width: "100%",
                  background: "#0d1e33",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                  padding: "0.7rem 1rem",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  outline: "none",
                  minHeight: "120px",
                  resize: "vertical",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                required
                data-testid="checkbox-consent"
                style={{ marginTop: "3px", accentColor: "#00d9c8", width: "16px", height: "16px", flexShrink: 0 }}
              />
              <label htmlFor="consent" style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.55, cursor: "pointer" }}>
                I consent to The Aqool Wire contacting me about relevant intelligence and advisory services.
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              data-testid="button-submit"
              style={{
                background: "#00d9c8",
                color: "#0a1628",
                border: "none",
                borderRadius: "4px",
                padding: "0.8rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.7 : 1,
                letterSpacing: "0.02em",
              }}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>

            <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#475569" }}>
              Interested in a formal partnership?{" "}
              <a
                href="mailto:jessicapino@theaqoolwire.com?subject=Partnership Inquiry"
                data-testid="button-become-partner"
                style={{ color: "#00d9c8", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Become a Partner
              </a>
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <Link href="/">
            <img src={logoImage} alt="The Aqool Wire" style={{ height: "32px", width: "auto", opacity: 0.6 }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <a
              href="https://www.linkedin.com/company/the-aqool-wire"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#475569", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              LinkedIn
            </a>
            <Link href="/about"
              style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#475569", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              About
            </Link>
            <Link href="/privacy"
              style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#475569", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Privacy
            </Link>
          </div>
          <p style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#334155" }}>
            &copy; {new Date().getFullYear()} The Aqool Wire
          </p>
        </div>
      </footer>
    </div>
  );
}
