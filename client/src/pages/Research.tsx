import { useState } from "react";
import MeshBackground from "@/components/MeshBackground";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";
import { RESEARCH_PROJECTS } from "@/data/projects";

const MONO_LABEL: React.CSSProperties = {
  fontFamily: "monospace", fontSize: "0.78rem", letterSpacing: "0.14em",
  textTransform: "uppercase", color: "#00d9c8", display: "block", marginBottom: "0.5rem",
};

export default function Research() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ background: "#070d18", minHeight: "100vh", color: "#e2e8f0", fontFamily: "'Inter', sans-serif", position: "relative", overflowX: "hidden" }}>
      <Helmet>
        <title>Research: The Aqool Wire</title>
        <meta name="description" content="Macroeconomic and AI policy research on oil-dependent economies in transition. Three connected questions on sovereign-economic transmission, fiscal arithmetic of diversification, and compound labor market pressure." />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Helmet>

      <MeshBackground />

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 20, width: "100%", borderBottom: "1px solid rgba(0,217,200,0.12)", background: "rgba(7,13,24,0.85)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", minHeight: "72px" }}
          className="flex items-center justify-between px-4 md:px-8">
          <Link href="/">
            <img src={logoImage} alt="The Aqool Wire"
              className="cursor-pointer"
              style={{ height: "80px", width: "auto", filter: "drop-shadow(0 0 14px rgba(0,217,200,0.45)) brightness(1.1)" }} />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link href="/research"
              style={{ fontSize: "1rem", color: "#ffffff", textDecoration: "none", borderBottom: "1px solid rgba(0,217,200,0.5)", paddingBottom: "2px" }}>Research</Link>
            <Link href="/about"
              style={{ fontSize: "1rem", color: "#cbd5e1", textDecoration: "none" }}
              className="hover:text-white transition-colors">About</Link>
            <a href="/#contact"
              style={{ fontSize: "1rem", color: "#cbd5e1", textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)", padding: "0.55rem 1.25rem", borderRadius: "6px" }}
              className="hover:text-white hover:border-white transition-colors">Contact</a>
          </div>

          <button className="md:hidden flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "6px", cursor: "pointer", color: "#e2e8f0", padding: "0.45rem 0.65rem", lineHeight: 1 }}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ borderTop: "1px solid rgba(0,217,200,0.12)", background: "rgba(7,13,24,0.98)", padding: "1.5rem" }}
            className="flex flex-col gap-5 md:hidden">
            <Link href="/research" onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: "1.05rem", color: "#ffffff", textDecoration: "none", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              Research
            </Link>
            <Link href="/about"
              style={{ fontSize: "1.05rem", color: "#e2e8f0", textDecoration: "none", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              About
            </Link>
            <a href="/#contact" onClick={() => setMobileMenuOpen(false)}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem", color: "#e2e8f0", textDecoration: "none", padding: "0.75rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", marginTop: "0.25rem" }}>
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* Page header */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto" }}
        className="px-4 md:px-8 pt-16 md:pt-24 pb-10 md:pb-14">
        <span style={MONO_LABEL}>Research</span>
        <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, lineHeight: 1.22, color: "#ffffff", marginBottom: "2rem", letterSpacing: "-0.01em" }}
          className="text-3xl sm:text-4xl md:text-5xl">
          Three connected questions.
        </h1>

        {/* Lead paragraph */}
        <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.2rem)", color: "#e2e8f0", lineHeight: 1.85, fontStyle: "italic", borderLeft: "2px solid rgba(0,217,200,0.4)", paddingLeft: "1.25rem", marginBottom: "0", maxWidth: "720px" }}>
          The research focuses on macroeconomic and AI policy in hydrocarbon-dependent economies in transition, with Saudi Arabia and the Gulf as the primary case. The work addresses three connected questions.
        </p>
      </section>

      {/* Three questions */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto" }}
        className="px-4 md:px-8 pb-14 md:pb-20">
        <div className="flex flex-col gap-10 md:gap-14">

          {/* Q1 */}
          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <span style={{ fontFamily: "monospace", fontSize: "1.5rem", color: "rgba(0,217,200,0.35)", fontWeight: 400, flexShrink: 0 }}>01</span>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)", color: "#ffffff", fontWeight: 400, lineHeight: 1.4, margin: 0 }}>
                How do sovereign-economic decisions in oil-dependent economies transmit through global capital markets, and what does that integration mean for domestic policy autonomy?
              </h2>
            </div>
            <div style={{ paddingLeft: "calc(1.5rem + 1rem)" }}>
              <p style={{ fontSize: "1rem", color: "#cbd5e1", lineHeight: 1.9 }}>
                The Hormuz Closure Cascade traces one such transmission, from a Saudi geopolitical event through Aramco dividend policy, PIF deployment, Tadawul, and MSCI Emerging Markets index products into US public pension portfolios. The deeper finding is that the chain has been structural since MSCI added Saudi to its EM index in 2019. Saudi macroeconomic decisions now move global retail capital in real time.
              </p>
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

          {/* Q2 */}
          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <span style={{ fontFamily: "monospace", fontSize: "1.5rem", color: "rgba(0,217,200,0.35)", fontWeight: 400, flexShrink: 0 }}>02</span>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)", color: "#ffffff", fontWeight: 400, lineHeight: 1.4, margin: 0 }}>
                How do oil-dependent economies manage the fiscal arithmetic of diversification when hydrocarbon revenue funds the majority of public-sector employment?
              </h2>
            </div>
            <div style={{ paddingLeft: "calc(1.5rem + 1rem)" }}>
              <p style={{ fontSize: "1rem", color: "#cbd5e1", lineHeight: 1.9 }}>
                In Saudi Arabia, government oil revenue sustains a public sector that employs roughly two-thirds of working Saudi nationals. Vision 2030 requires shrinking that public payroll as oil revenue declines and growing private-sector employment to absorb a young, expanding workforce. AI productivity gains in Western economies suggest the private-sector jobs Vision 2030 is betting on may automate faster than they grow. The Live Saudi AI Intelligence Dashboard tracks the infrastructure, capital flows, and policy moves shaping that bet in real time.
              </p>
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

          {/* Q3 */}
          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <span style={{ fontFamily: "monospace", fontSize: "1.5rem", color: "rgba(0,217,200,0.35)", fontWeight: 400, flexShrink: 0 }}>03</span>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)", color: "#ffffff", fontWeight: 400, lineHeight: 1.4, margin: 0 }}>
                What labor market and fiscal policies manage the compound pressure of all three forces at once: declining hydrocarbon revenue constraining the public payroll, AI productivity gains automating the private-sector jobs meant to absorb new entrants, and a young Saudi demographic that requires employment growth, not contraction?
              </h2>
            </div>
            <div style={{ paddingLeft: "calc(1.5rem + 1rem)" }}>
              <p style={{ fontSize: "1rem", color: "#cbd5e1", lineHeight: 1.9 }}>
                The Digital Twin Policy Lab models workforce upskilling, sectoral investment, and fiscal scenarios under different assumptions about AI labor displacement and oil revenue trajectories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology callout */}
      <section style={{ position: "relative", zIndex: 1, background: "rgba(0,217,200,0.04)", borderTop: "1px solid rgba(0,217,200,0.1)", borderBottom: "1px solid rgba(0,217,200,0.1)" }}
        className="px-4 md:px-8 py-10 md:py-14">
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <span style={MONO_LABEL}>Methodology</span>
          <p style={{ fontSize: "1.05rem", color: "#e2e8f0", lineHeight: 1.9, maxWidth: "740px" }}>
            The methodology is built to stay current. Each project updates continuously: the Live Saudi AI Intelligence Dashboard ingests new infrastructure announcements, capital flows, and regulatory developments as they emerge; the Hormuz Closure Cascade refreshes its source data, transmission math, and citations as conditions evolve; the Digital Twin Policy Lab updates its scenarios as new economic and workforce data become available. Most policy research goes stale the moment it is published. The site is designed so that analysis remains current as the underlying conditions change.
          </p>
        </div>
      </section>

      {/* Project cards */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "1080px", margin: "0 auto" }}
        className="px-4 md:px-8 py-14 md:py-20">
        <div style={{ marginBottom: "2.5rem" }}>
          <span style={MONO_LABEL}>Projects</span>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#ffffff", fontWeight: 400, margin: 0 }}>
            Current projects
          </h2>
        </div>

        <div className="flex flex-col gap-px"
          style={{ background: "rgba(0,217,200,0.08)", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0,217,200,0.1)" }}>
          {RESEARCH_PROJECTS.map((project) => (
            <div key={project.title}
              style={{ background: "#0c1829", position: "relative", overflow: "hidden" }}
              className="p-6 md:p-10">
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(0,217,200,0.4), transparent)" }} />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
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

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.methodTags.map((tag) => (
                      <span key={tag} style={{ fontSize: "0.8rem", color: "#94a3b8", fontFamily: "monospace", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", padding: "0.2rem 0.6rem", borderRadius: "4px" }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.lastUpdated ? (
                    <p style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#94a3b8", opacity: 0.6, letterSpacing: "0.04em", margin: 0 }}>
                      Last updated: {project.lastUpdated}
                    </p>
                  ) : project.plannedLaunch ? (
                    <p style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#94a3b8", opacity: 0.6, letterSpacing: "0.04em", margin: 0 }}>
                      In development, planned launch {project.plannedLaunch}
                    </p>
                  ) : null}
                </div>

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

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.07)" }}
        className="px-4 py-8 md:py-10">
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/">
            <img src={logoImage} alt="The Aqool Wire"
              style={{ height: "48px", width: "auto", opacity: 0.7, filter: "brightness(0.9)" }} />
          </Link>
          <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
            &copy; {new Date().getFullYear()} The Aqool Wire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
