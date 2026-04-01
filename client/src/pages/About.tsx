import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import MeshBackground from "@/components/MeshBackground";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/The Aqool Wire - Edited_1762849890953.png";
import jessicaImage from "@assets/000-eHDrIDseLsY_1769360651903.jpeg";
import { ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <div style={{ minHeight: "100vh", background: "#070d18", color: "#ffffff", position: "relative", overflowX: "hidden" }}>
      <Helmet>
        <title>About The Aqool Wire - Live Intelligence for Saudi Arabia's AI Economy</title>
        <meta name="description" content="The Aqool Wire applies AI to continuously ingest, structure, and reconcile data as conditions change, delivering live intelligence for Saudi Arabia's Vision 2030 AI transformation." />
      </Helmet>

      <MeshBackground />

      {/* Header */}
      <header style={{ position: "relative", zIndex: 20, width: "100%", borderBottom: "1px solid rgba(0,217,200,0.15)", background: "rgba(7,13,24,0.85)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "88px" }}>
          <Link href="/">
            <img
              src={logoImage}
              alt="The Aqool Wire"
              style={{ height: "120px", width: "auto", cursor: "pointer", opacity: 0.95, filter: "drop-shadow(0 0 14px rgba(0,217,200,0.45)) brightness(1.1)" }}
            />
          </Link>
          <Link href="/">
            <button style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#00d9c8", background: "transparent", border: "1px solid rgba(0,217,200,0.35)", borderRadius: "6px", padding: "0.5rem 1rem", cursor: "pointer" }}>
              <ArrowLeft size={15} />
              Back to Home
            </button>
          </Link>
        </div>
      </header>

      {/* About Content */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 2rem 6rem" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#ffffff", textAlign: "center", marginBottom: "3rem", lineHeight: 1.25 }}>
            About <span style={{ color: "#00d9c8" }}>The Aqool Wire</span>
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "1.05rem", lineHeight: 1.85, color: "#e2e8f0", background: "#0c1829", borderRadius: "14px", padding: "2.5rem 3rem", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p>
              For years, the hardest part of serious economic and policy analysis wasn't interpretation. It was keeping the underlying information current, coherent, and decision-ready. Data arrived late, conflicted across sources, and often surfaced only after policy or investment windows had already closed.
            </p>

            <p>
              That problem became increasingly harder to ignore as Saudi Arabia accelerated its Vision 2030 AI transformation. Infrastructure, capital, and policy decisions began moving at a pace traditional analysis tools were never designed to match. Announcements multiplied, capital deployed faster, and execution outpaced visibility. The question was no longer how to analyze, but how to maintain a live, structured view of a system evolving in real time.
            </p>

            <p style={{ fontSize: "1.15rem", fontWeight: 600, color: "#00d9c8", fontFamily: "Georgia, serif" }}>
              The Aqool Wire was built to answer that question.
            </p>

            {/* Founder Section */}
            <div style={{ display: "flex", flexDirection: "row", gap: "2.5rem", alignItems: "flex-start", marginTop: "1rem", flexWrap: "wrap" }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ position: "relative" }}>
                  <img
                    src={jessicaImage}
                    alt="Jessica Pino, Founder of The Aqool Wire"
                    style={{ width: "160px", height: "160px", borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(0,217,200,0.3)", boxShadow: "0 0 30px rgba(0,217,200,0.2)" }}
                  />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: "280px" }}>
                <p>
                  Founded by Jessica Pino, a former U.S. State Department economic and political analyst with nearly two decades of experience working across the Middle East and South Asia, the platform reflects a practical insight shaped by years inside government and development institutions: analysis fails when data infrastructure can't keep up with reality. Jessica's work evaluating infrastructure investment, development programs, and policy outcomes repeatedly ran into the same constraint: fragmented data that couldn't keep pace with the speed of change.
                </p>
              </div>
            </div>

            <p>
              Rather than producing slower, more expensive reports, The Aqool Wire applies AI to the least visible but most critical part of intelligence: continuously ingesting, structuring, and reconciling data as conditions change. The result is a live intelligence layer that allows decision-makers to focus on judgment, not information gathering.
            </p>
          </div>

          {/* Back to Home */}
          <div style={{ marginTop: "3.5rem", textAlign: "center" }}>
            <Link href="/">
              <button style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#00d9c8", color: "#070d18", border: "none", borderRadius: "8px", padding: "0.9rem 2rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 0 24px rgba(0,217,200,0.35)" }}>
                <ArrowLeft size={16} />
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, padding: "2rem", borderTop: "1px solid rgba(0,217,200,0.12)", textAlign: "center" }}>
        <p style={{ fontSize: "0.9rem", color: "#94a3b8", margin: 0 }}>
          &copy; {new Date().getFullYear()} The Aqool Wire. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
