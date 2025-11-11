export default function AnimatedBackground() {
  return (
    <>
      {/* Animated Vector Grid Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.04) 1px, transparent 1px),
            linear-gradient(rgba(0, 217, 200, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 180, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          animation: 'grid-move 20s linear infinite'
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 255, 65, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(0, 153, 255, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(0, 217, 200, 0.08) 0%, transparent 50%)
          `
        }}
      />
    </>
  );
}
