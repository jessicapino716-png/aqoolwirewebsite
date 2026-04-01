export default function MeshBackground() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      backgroundImage: "radial-gradient(circle, rgba(0,217,200,0.18) 1px, transparent 1px)",
      backgroundSize: "30px 30px",
    }} />
  );
}
