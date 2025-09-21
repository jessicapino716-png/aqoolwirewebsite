export default function HeroSection() {
  return (
    <div className="relative min-h-screen text-black bg-white">
      {/* Left accent line - hidden on mobile */}
      <div className="absolute left-0 top-0 h-[90%] w-0.5 bg-gradient-to-b from-[#40E0D0] via-[#00ff88] to-[#90EE90] ml-[15px] mt-[30px] hidden md:block"></div>
      {/* Main content */}
      <div className="container mx-auto px-6 py-16 flex items-center min-h-screen">
        <div className="max-w-4xl">
          {/* Main headline - stacked vertically */}
          <h1 className="space-y-2 mb-8" data-testid="text-main-headline">
            <div className="text-6xl md:text-8xl font-black text-black leading-none tracking-tight">
              AI Policy.
            </div>
            <div className="text-6xl md:text-8xl font-black text-black leading-none tracking-tight">
              Regulation.
            </div>
            <div className="text-6xl md:text-8xl font-black text-black leading-none tracking-tight">
              Innovation.
            </div>
          </h1>

          {/* Tagline */}
          <div className="text-xl md:text-2xl space-y-2" data-testid="text-tagline">
            <div className="font-medium text-[#3b82f6]">
              Straight from Riyadh
            </div>
            <div className="text-gray-700 max-w-2xl">The first platform delivering AI news, policy analysis and regulatory insights for the GCC's largest economy</div>
          </div>
        </div>
      </div>
    </div>
  );
}