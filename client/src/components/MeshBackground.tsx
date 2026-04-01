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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLS = 88;
    const ROWS = 22;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.004;

      const w = canvas.width;
      const h = canvas.height;

      // Wave occupies the bottom 42% of the viewport
      const waveTop = h * 0.58;
      const waveBottom = h * 0.98;
      const waveHeight = waveBottom - waveTop;

      const colSpacing = w / (COLS - 1);
      const rowSpacing = waveHeight / (ROWS - 1);

      for (let r = 0; r < ROWS; r++) {
        const nr = r / (ROWS - 1); // 0 = top of wave, 1 = bottom

        for (let c = 0; c < COLS; c++) {
          const nc = c / (COLS - 1); // 0 = left, 1 = right

          const x = c * colSpacing;

          // Wave displacement — multiple frequencies
          const wave =
            Math.sin(c * 0.14 + t * 1.1 + r * 0.3) * 28 * (1 - nr * 0.5) +
            Math.sin(c * 0.07 - t * 0.7 + r * 0.18) * 18 * (1 - nr * 0.4) +
            Math.sin(c * 0.22 + t * 0.5) * 10;

          const y = waveTop + r * rowSpacing + wave;

          // Fade: edges of wave fade out horizontally and toward very top rows
          const fadeX = Math.sin(nc * Math.PI); // 0 at edges, 1 in center
          const fadeR = 0.25 + 0.75 * Math.sin(nr * Math.PI * 0.85 + 0.1);

          // Dots are denser/brighter near the crest (middle rows)
          const crestBoost = 1 - Math.abs(nr - 0.45) * 1.2;
          const alpha = Math.max(0, Math.min(0.55, fadeX * fadeR * (0.3 + crestBoost * 0.35)));

          // Size: slightly larger near the wave crest
          const radius = Math.max(0.4, 0.6 + crestBoost * 0.9 * fadeX);

          // Colour: light blue-white (matching reference screenshot)
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 200, 240, ${alpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
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
