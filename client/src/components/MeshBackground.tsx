import { useRef, useEffect } from "react";

export default function MeshBackground() {
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
