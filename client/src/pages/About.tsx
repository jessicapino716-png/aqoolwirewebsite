import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import MeshBackground from "@/components/MeshBackground";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";
import jessicaImage from "@assets/000-eHDrIDseLsY_1769360651903.jpeg";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <div style={{ minHeight: "100vh", background: "#070d18", color: "#ffffff", position: "relative", overflowX: "hidden" }}>
      <Helmet>
        <title>About: The Aqool Wire</title>
        <meta name="description" content="Jessica Pino is a former U.S. Foreign Service Officer applying AI tools to macroeconomic and AI policy research questions at the intersection of Saudi Arabia's political-economic systems." />
      </Helmet>
      <MeshBackground />
      {/* Header */}
      <header style={{ position: "relative", zIndex: 20, width: "100%", borderBottom: "1px solid rgba(0,217,200,0.15)", background: "rgba(7,13,24,0.85)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", minHeight: "72px" }}
          className="flex items-center justify-between px-4 md:px-8">
          <Link href="/">
            <img src={logoImage} alt="The Aqool Wire"
              style={{ height: "80px", width: "auto", cursor: "pointer", opacity: 0.95, filter: "drop-shadow(0 0 14px rgba(0,217,200,0.45)) brightness(1.1)" }} />
          </Link>
          <Link href="/">
            <button style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem", color: "#94a3b8", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", padding: "0.5rem 1rem", cursor: "pointer" }}>
              <ArrowLeft size={14} />
              Back
            </button>
          </Link>
        </div>
      </header>
      {/* Content */}
      <section style={{ position: "relative", zIndex: 1 }} className="px-4 md:px-8 py-14 md:py-20">
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>

          <span style={{ fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#00d9c8", display: "block", marginBottom: "0.75rem" }}>
            About
          </span>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 400, color: "#ffffff", marginBottom: "3rem", lineHeight: 1.25 }}>
            The Aqool Wire
          </h1>

          {/* Bio */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-10">
            <img src={jessicaImage} alt="Jessica Pino"
              style={{ flexShrink: 0, width: "140px", height: "140px", borderRadius: "50%", objectFit: "cover", objectPosition: "center top", border: "2px solid rgba(0,217,200,0.25)" }} />
            <div>
              <p style={{ fontSize: "1.05rem", color: "#e2e8f0", lineHeight: 1.85, marginBottom: "0.5rem" }}>
                <strong style={{ color: "#ffffff", fontWeight: 600 }}>Jessica Pino</strong> is a former U.S. Foreign Service Officer with 18 years in economic and political analysis.
              </p>
              <p style={{ fontSize: "0.95rem", color: "#94a3b8", fontFamily: "monospace", lineHeight: 1.6 }}>
                MPP, LSE, AI and governance &nbsp;&middot;&nbsp; Based in Riyadh
              </p>
            </div>
          </div>

          <div style={{ background: "#0c1829", borderRadius: "12px", padding: "2.5rem", border: "1px solid rgba(255,255,255,0.07)" }}
            className="md:p-12">
            <p style={{ fontSize: "1.05rem", color: "#e2e8f0", lineHeight: 1.9, marginBottom: "1.5rem" }}>
              For 18 years before this, I worked as a U.S. Foreign Service Officer doing political and economic analysis. Long enough to watch policy decisions get made, watch them succeed and fail, and develop an instinct for the gap between how policy is written and how it actually works. I completed an MPP at the London School of Economics, focused on AI and governance. I now live in Riyadh.
            </p>

            <p style={{ fontSize: "1.05rem", color: "#e2e8f0", lineHeight: 1.9, marginBottom: "1.5rem" }}>The Aqool Wire is a fully independent research platform built to ask hard questions about Saudi Arabia's transition: the fiscal arithmetic of diversification when oil revenue funds the public payroll, the labor absorption capacity of Vision 2030 against AI productivity pressure, the durability of Aramco's dividend mechanics, and the structural integration of Saudi capital markets with the global financial system. These questions are difficult to raise rigorously inside institutions with Saudi clients, ministries, or employment relationships. They need rigorous quantitative analysis. </p>

            <p style={{ fontSize: "1.05rem", color: "#e2e8f0", lineHeight: 1.9 }}>
              The work uses AI tools to maintain that analysis at depth and currency that historically required an institutional research operation. Every project on this site is transparent about its methods, sources, and limitations, and updates continuously as conditions change.
            </p>
          </div>

          {/* Research links */}
          <div style={{ marginTop: "3rem" }}>
            <p style={{ fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#00d9c8", marginBottom: "1.25rem" }}>
              Research projects
            </p>
            <div className="flex flex-col gap-3">
              {[
                { title: "Saudi AI Economy Dashboard", href: "https://live.theaqoolwire.com/", external: true },
                { title: "The Hormuz Closure Cascade", href: "https://hormuz-cascade-ksa.vercel.app/", external: true },
                { title: "Digital Twin Policy Lab", href: "https://live.theaqoolwire.com/tech-upskilling", external: true },
              ].map((item) => (
                <div key={item.title}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "1rem 1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px" }}>
                  <span style={{ fontSize: "0.95rem", color: "#e2e8f0" }}>{item.title}</span>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 flex-shrink-0"
                      style={{ fontSize: "0.85rem", color: "#00d9c8", textDecoration: "none" }}>
                      View <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <span style={{ fontSize: "0.8rem", color: "#64748b", fontFamily: "monospace" }}>In development</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
            <Link href="/#contact">
              <button style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#00d9c8", color: "#070d18", border: "none", borderRadius: "8px", padding: "0.9rem 2rem", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 0 24px rgba(0,217,200,0.28)" }}>
                Get in touch
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, padding: "2rem", borderTop: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
          &copy; {new Date().getFullYear()} The Aqool Wire. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
