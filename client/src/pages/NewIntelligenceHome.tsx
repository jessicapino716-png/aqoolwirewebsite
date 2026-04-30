import { useState } from "react";
import MeshBackground from "@/components/MeshBackground";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Menu, X, ArrowUpRight } from "lucide-react";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";
import { RESEARCH_PROJECTS } from "@/data/projects";

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
        <title>The Aqool Wire: Macroeconomic and AI Policy Research on Saudi Arabia</title>
        <meta name="description" content="Research on Saudi Arabia's sovereign economic transition: declining hydrocarbon revenue, public-payroll dependence, and AI-driven labor market pressure. Three active projects tracking transmission mechanisms, fiscal arithmetic, and policy options." />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Helmet>
      <MeshBackground />
      {/* ── NAV ──────────────────────────────────────────────────── */}
      <nav style={{ position: "relative", zIndex: 20, borderBottom: "1px solid rgba(0,217,200,0.18)", backdropFilter: "blur(12px)", background: "rgba(7,13,24,0.85)", overflow: "visible" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div className="flex items-center justify-between w-full px-4 md:px-8" style={{ height: "72px", overflow: "visible" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", overflow: "visible" }}>
              <img src={logoImage} alt="The Aqool Wire"
                className="cursor-pointer"
                style={{ height: "140px", width: "auto", filter: "drop-shadow(0 0 14px rgba(0,217,200,0.45)) brightness(1.1)", position: "relative", zIndex: 21 }} />
            </Link>

            <div className="hidden md:flex items-center gap-10">
              <Link href="/research"
                style={{ fontSize: "1rem", color: "#cbd5e1", textDecoration: "none" }}
                className="hover:text-white transition-colors">Research</Link>
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
            <Link href="/research" onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: "1.05rem", color: "#e2e8f0", textDecoration: "none", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              Research
            </Link>
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
      <section style={{ position: "relative", zIndex: 1, minHeight: "85vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}
        className="px-4 py-20 md:py-32">
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-60%)", width: "700px", height: "400px", background: "radial-gradient(ellipse at center, rgba(0,217,200,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "920px", width: "100%" }}>
          <div className="inline-flex items-center gap-2" style={{ border: "1px solid rgba(0,217,200,0.3)", borderRadius: "100px", padding: "0.4rem 1.1rem 0.4rem 0.7rem", marginBottom: "2.5rem", background: "rgba(0,217,200,0.06)" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00d9c8", display: "inline-block", boxShadow: "0 0 8px #00d9c8", flexShrink: 0 }} />
            <span style={{ fontSize: "0.78rem", color: "#00d9c8", fontFamily: "monospace", letterSpacing: "0.07em", textTransform: "uppercase" }}>Saudi Arabia &middot; Macroeconomics &middot; AI policy</span>
          </div>

          <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, lineHeight: 1.18, color: "#ffffff", marginBottom: "90px", letterSpacing: "-0.02em" }}
            className="text-4xl sm:text-5xl md:text-6xl">
            Saudi Arabia is attempting one of the largest sovereign economic transitions on record.
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ maxWidth: "1080px", marginLeft: "auto", marginRight: "auto" }}>
            {[
              { label: "Fiscal pressure", body: "Declining hydrocarbon revenue and a sovereign balance sheet built around oil." },
              { label: "Workforce dependency", body: "A public payroll that employs two-thirds of working Saudis, funded by that same revenue." },
              { label: "AI compression", body: "AI productivity gains compressing the timeline for private-sector job creation." },
            ].map((item, i) => (
              <div key={i} style={{ background: "#0c1829", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", padding: "2rem 2rem", textAlign: "left" }}>
                <div style={{ fontFamily: "monospace", fontSize: "2rem", color: "rgba(0,217,200,0.6)", letterSpacing: "0.04em", marginBottom: "1rem", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: "#ffffff", fontWeight: 400, marginBottom: "0.75rem" }}>{item.label}</div>
                <div style={{ fontSize: "1rem", color: "#94a3b8", lineHeight: 1.7 }}>{item.body}</div>
              </div>
            ))}
          </div>

          <p
            style={{ lineHeight: 1.8, color: "#00d9c8", margin: "1.75rem auto 2.5rem", maxWidth: "640px", fontSize: "1.25rem", fontWeight: 600 }}>
            Three compounding pressures. Three active projects tracking the transmission mechanisms, the fiscal arithmetic, and the labor market policy options.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/research"
              className="w-full sm:w-auto flex items-center justify-center gap-2"
              style={{ background: "#00d9c8", color: "#070d18", fontWeight: 700, fontSize: "1rem", padding: "0.95rem 2.25rem", borderRadius: "8px", textDecoration: "none", boxShadow: "0 0 40px rgba(0,217,200,0.35)", letterSpacing: "0.01em" }}>
              View the research
              <ArrowRight size={16} />
            </Link>
            <Link href="/about"
              className="w-full sm:w-auto flex items-center justify-center"
              style={{ fontSize: "0.95rem", color: "#e2e8f0", textDecoration: "none", padding: "0.95rem 2.25rem", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "8px" }}>
              About
            </Link>
          </div>
        </div>
      </section>
      {/* ── PLATFORM EXPLAINER ───────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(12,24,41,0.5)" }}
        className="px-4 md:px-8 py-14 md:py-20">
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span style={SECTION_LABEL}>About this research</span>
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.9, margin: 0, flex: 1 }}>
              The Aqool Wire is a macroeconomic policy research lab focused on Saudi Arabia and the Gulf, written from Riyadh. The work examines how sovereign-economic decisions transmit through global capital markets, how oil-funded public sectors adapt to declining hydrocarbon revenue, and how labor markets manage the compound pressure of diversification and AI productivity gains.
            </p>
            <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.9, margin: 0, flex: 1 }}>
              Three active research projects approach these questions through live data tracking, transmission analysis, and forward-looking policy simulation. The platform uses AI tools to maintain analysis at depth and currency that historically required an institutional research operation.
            </p>
          </div>
        </div>
      </section>
      {/* ── RESEARCH PROJECTS ────────────────────────────────────── */}
      <section id="research" style={{ position: "relative", zIndex: 1, maxWidth: "1080px", margin: "0 auto" }}
        className="px-4 md:px-8 pb-14 md:pb-24">

        <div style={{ marginBottom: "3rem" }}>
          <span style={SECTION_LABEL}>Research</span>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#ffffff", fontWeight: 400, margin: 0 }}>
            Current projects
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
      {/* ── THESIS ESSAY ─────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: "1080px", margin: "0 auto", background: "rgba(12,24,41,0.72)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)" }}
        className="px-4 md:px-8 py-16 md:py-24">

        <div style={{ marginBottom: "2.5rem" }}>
          <div className="inline-flex items-center"
            style={{ border: "1px solid rgba(0,217,200,0.3)", borderRadius: "100px", padding: "0.4rem 1.25rem", background: "rgba(0,217,200,0.06)" }}>
            <span style={{ fontSize: "0.78rem", color: "#00d9c8", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>The Compound Transition</span>
          </div>
        </div>

        <p style={{ fontSize: "1.15rem", color: "#cbd5e1", lineHeight: 1.72, margin: "0 0 1.75rem 0" }}>
          Vision 2030 was designed in 2016 with an implicit assumption: growing target sectors (financial services, tourism, technology, logistics, manufacturing) would create roughly proportional employment. Double the size of the financial services sector and you roughly double the number of finance jobs. That assumption was consistent with how knowledge-work sectors had behaved for the previous several decades, and it underlies every Vision 2030 employment target.
        </p>

        <p style={{ fontSize: "1.15rem", color: "#cbd5e1", lineHeight: 1.72, margin: "0 0 1.75rem 0" }}>
          AI productivity gains break that assumption in the exact sectors Vision 2030 targets. Software development, financial analysis, customer service, legal work, marketing, content creation, translation, and parts of medical diagnostics are all seeing measured productivity gains in the 25 to 50 percent range in Western economies as AI tools get adopted. The mechanism is straightforward: AI is reducing the labor required to deliver a unit of output. Same revenue, fewer workers.
        </p>

        <p style={{ fontSize: "1.15rem", color: "#cbd5e1", lineHeight: 1.72, margin: "0 0 1.75rem 0" }}>
          Apply that to Saudi Arabia's two parallel timelines. The first is how long it takes target sectors to mature into substantial revenue producers, the headline Vision 2030 metric. The second is the timeline on which the Saudi workforce grows. Saudi adds roughly 200 to 300 thousand new Saudi nationals to working age every year. Vision 2030 has to employ them.
        </p>

        <p style={{ fontSize: "1.15rem", color: "#cbd5e1", lineHeight: 1.72, margin: "0 0 1.75rem 0" }}>
          Pre-AI, the assumption was that growing the target sectors at Vision 2030's projected pace would create enough jobs to absorb that demographic flow inside a 10 to 15 year window. With AI changing the labor intensity of those sectors, the same revenue growth produces fewer jobs. The sector-revenue timeline stretches. The demographic timeline does not. The two timelines that were supposed to converge now diverge.
        </p>

        <p style={{ fontSize: "1.15rem", color: "#cbd5e1", lineHeight: 1.72, margin: "0 0 1.75rem 0" }}>Vision 2030's labor-intensive bets (tourism gigaprojects like Red Sea Global, Diriyah, AlUla, and Qiddiya) do generate jobs per dollar, but historically those jobs have been filled by expatriate workers under the kafala system, not Saudi nationals. Second, the capital-intensive bets (HUMAIN, AI infrastructure, hyperscale data centers) generate modest permanent employment relative to the capital invested, and the specialized roles they do create (AI infrastructure engineers, ML operations, network architects) require skills the Saudi workforce hasn't yet built at scale, so those positions go to expat hires. Third, the high-skill jobs Saudization policies have been pushing nationals into (finance, professional services, administration) are exactly the jobs AI is automating fastest. Low-skill jobs flow to expats. AI infrastructure jobs flow to expat specialists. And the high-skill knowledge-work track Saudis are being trained for gets automated before they fully fill it.</p>

        <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "#e2e8f0", lineHeight: 1.65, margin: 0 }}>
          That tension is the subject of this research.
        </p>

      </section>
      {/* ── RESEARCH QUESTIONS ───────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.06)" }}
        className="px-4 py-16 md:py-24">
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.25rem)", color: "#cbd5e1", lineHeight: 1.85, fontStyle: "italic", borderLeft: "2px solid rgba(0,217,200,0.4)", paddingLeft: "1.5rem", marginBottom: "4rem", maxWidth: "700px" }}>
            Three interconnected pressures, studied through three active projects. Each question is difficult on its own. Together, they define the problem.
          </p>

          {/* Q1 */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div className="flex items-baseline gap-5 mb-4">
              <span style={{ fontFamily: "monospace", fontSize: "2rem", color: "rgba(0,217,200,0.25)", fontWeight: 400, flexShrink: 0, lineHeight: 1 }}>01</span>
              <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)", color: "#ffffff", fontWeight: 400, lineHeight: 1.45, margin: 0 }}>
                How do sovereign-wealth decisions in Riyadh move capital in New York, Oslo, and Austin?
              </h2>
            </div>
            <div style={{ paddingLeft: "calc(2rem + 1.25rem)" }}>
              <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.9, margin: 0 }}>
                The mechanism is structural, not circumstantial. Since MSCI added Saudi Arabia to its Emerging Markets index in 2019, Aramco's dividend policy and PIF deployment decisions have moved the portfolios of teachers, nurses, and firefighters in US public pension funds. The Hormuz Closure Cascade traces this chain in full across six stages, with primary-source citations and no gaps in the transmission logic.
              </p>
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "3.5rem" }} />

          {/* Q2 */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div className="flex items-baseline gap-5 mb-4">
              <span style={{ fontFamily: "monospace", fontSize: "2rem", color: "rgba(0,217,200,0.25)", fontWeight: 400, flexShrink: 0, lineHeight: 1 }}>02</span>
              <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)", color: "#ffffff", fontWeight: 400, lineHeight: 1.45, margin: 0 }}>
                Can a state that employs two-thirds of its workforce afford to diversify?
              </h2>
            </div>
            <div style={{ paddingLeft: "calc(2rem + 1.25rem)" }}>
              <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.9, margin: 0 }}>
                Saudi Arabia's government oil revenue does not just fund infrastructure. It funds the payroll. Roughly two-thirds of working Saudi nationals hold public-sector jobs financed directly or indirectly by hydrocarbon revenue. Vision 2030 requires building private employment fast enough to absorb a young, growing workforce as that revenue declines. The Live Saudi AI Dashboard tracks whether the capital flows and infrastructure bets currently being made suggest that transition is on track.
              </p>
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "3.5rem" }} />

          {/* Q3 */}
          <div style={{ marginBottom: "4rem" }}>
            <div className="flex items-baseline gap-5 mb-4">
              <span style={{ fontFamily: "monospace", fontSize: "2rem", color: "rgba(0,217,200,0.25)", fontWeight: 400, flexShrink: 0, lineHeight: 1 }}>03</span>
              <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)", color: "#ffffff", fontWeight: 400, lineHeight: 1.45, margin: 0 }}>
                What happens when AI compresses the timeline?
              </h2>
            </div>
            <div style={{ paddingLeft: "calc(2rem + 1.25rem)" }}>
              <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.9, margin: 0 }}>
                The fiscal problem is hard enough on its own. AI productivity gains in Western economies add a second pressure: the private-sector jobs Vision 2030 is counting on may automate before Saudi workers can grow into them. The Digital Twin Policy Lab models the compound scenario with adjustable assumptions about oil price trajectories, AI adoption rates, and the full range of available policy levers.
              </p>
            </div>
          </div>

          {/* Methodology callout */}
          <div style={{ background: "rgba(0,217,200,0.04)", border: "1px solid rgba(0,217,200,0.15)", borderRadius: "10px", padding: "2rem 2.5rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#00d9c8", display: "block", marginBottom: "0.85rem" }}>Methodology</span>
            <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.9, margin: 0 }}>
              Most policy research is obsolete by publication. These projects are built to stay current: the Dashboard ingests new data continuously, the Cascade refreshes its source chain as conditions evolve, and the Lab updates its scenarios as new economic and workforce data become available.
            </p>
          </div>
        </div>
      </section>
      {/* ── ABOUT TEASER ─────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        className="px-4 md:px-8 py-14 md:py-20">
        <div style={{ maxWidth: "860px", margin: "0 auto" }} className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          <div style={{ flex: 1 }}>
            <span style={SECTION_LABEL}>About</span>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#ffffff", fontWeight: 400, marginBottom: "1.25rem" }}>
              Jessica Pino
            </h2>
            <p style={{ fontSize: "1rem", color: "#cbd5e1", lineHeight: 1.85, marginBottom: "1rem" }}>Former U.S. Foreign Service Officer, 18 years in economic and political analysis. Tours in Islamabad, Cairo, Irbil, Paris, and Main State. MPP from LSE, focused on AI and governance. Based in Riyadh.</p>
            <p style={{ fontSize: "1rem", color: "#cbd5e1", lineHeight: 1.85, marginBottom: "1.75rem" }}>
              The research here focuses on macroeconomic and AI policy questions for Saudi Arabia and the Gulf, using AI to extend what a single researcher can analyze across multiple data domains. The projects grew out of questions that came up repeatedly during fieldwork: capital flows, infrastructure investment, and how policy decisions in Riyadh transmit outward into global markets.
            </p>
            <Link href="/about"
              className="inline-flex items-center gap-2"
              style={{ fontSize: "0.9rem", color: "#00d9c8", textDecoration: "none", border: "1px solid rgba(0,217,200,0.35)", padding: "0.6rem 1.2rem", borderRadius: "6px" }}>
              Full bio <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ flexShrink: 0 }} className="hidden md:block">
            <div style={{ background: "#0c1829", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1.75rem", maxWidth: "260px" }}>
              <div style={{ fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#00d9c8", marginBottom: "1.25rem" }}>Background</div>
              {[
                "18 years, U.S. Foreign Service",
                "MPP, LSE, AI and governance",
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
