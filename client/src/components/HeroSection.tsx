export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Left accent line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-teal-400"></div>
      {/* Main content */}
      <div className="container mx-auto px-6 py-16 flex items-center min-h-screen">
        <div className="max-w-4xl">
          {/* Main headline - stacked vertically */}
          <h1 className="space-y-2 mb-8" data-testid="text-main-headline">
            <div className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight">
              AI Policy.
            </div>
            <div className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight">
              Regulation.
            </div>
            <div className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight">
              Innovation.
            </div>
          </h1>

          {/* Tagline */}
          <div className="text-xl md:text-2xl space-y-2" data-testid="text-tagline">
            <div className="text-teal-400 font-medium">
              Straight from Riyadh
            </div>
            <div className="text-gray-300 max-w-2xl">Policy analysis and regulatory insights from the heart of Saudi Arabia and the GCC region</div>
          </div>
        </div>
      </div>
    </div>
  );
}