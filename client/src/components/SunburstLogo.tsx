export default function SunburstLogo({ size = 60 }: { size?: number }) {
  const rays = 24;
  const rayHeight = size * 0.4;
  const rayWidth = size * 0.05;
  const centerSize = size * 0.3;
  
  const getRayGradient = (index: number) => {
    const colors = [
      ['#00ff41', '#00d9c8'], // Green to cyan
      ['#00ff41', '#00d9c8'],
      ['#00ff41', '#00d9c8'],
      ['#00f055', '#00d9c8'],
      ['#00e869', '#00d9c8'],
      ['#00df7d', '#00d9c8'],
      ['#00d991', '#00d9c8'],
      ['#00d9a5', '#00d9c8'],
      ['#00d9b9', '#00d9c8'],
      ['#00d9c8', '#00d9c8'], // Cyan
      ['#00d9c8', '#00cce6'],
      ['#00d9c8', '#00b4ff'],
      ['#00d9c8', '#00a0ff'],
      ['#00d9c8', '#0099ff'], // Cyan to blue
      ['#00d9c8', '#0099ff'],
      ['#00d9c8', '#0099ff'],
      ['#00d9c8', '#00a0ff'],
      ['#00d9c8', '#00b4ff'],
      ['#00d9c8', '#00d9c8'], // Back to cyan
      ['#00d9c8', '#00d991'],
      ['#00d9c8', '#00df7d'],
      ['#00d9c8', '#00e869'],
      ['#00d9c8', '#00f055'],
      ['#00d9c8', '#00ff41'], // Back to green
    ];
    
    return colors[index % rays];
  };
  
  return (
    <div className="inline-block relative" style={{ width: size, height: size }}>
      {/* Center Circle */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: centerSize,
          height: centerSize,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, #00ffd9, #00d9c8)',
          boxShadow: '0 0 20px #00d9c8, 0 0 40px rgba(0, 217, 200, 0.5)'
        }}
      />
    </div>
  );
}
