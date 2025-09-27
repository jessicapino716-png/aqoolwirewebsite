export default function HeroSection() {
  return (
    <div className="relative min-h-[70vh] md:min-h-[85vh] text-black bg-white">
      {/* Left accent line - hidden on mobile */}
      <div className="absolute left-0 top-0 h-[90%] w-0.5 bg-gradient-to-b from-[#40E0D0] via-[#00ff88] to-[#90EE90] ml-[15px] mt-[30px] hidden md:block"></div>
      
      {/* Main content - Full width focused layout */}
      <div className="container mx-auto px-6 py-12 md:py-20 flex items-center justify-center min-h-[70vh] md:min-h-[85vh]">
        <div className="max-w-6xl text-center">
          {/* Main headline - stacked vertically */}
          <h1 className="space-y-4 mb-12" data-testid="text-main-headline">
            <div className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-none tracking-tight">
              AI Policy.
            </div>
            <div className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-none tracking-tight">
              Regulation.
            </div>
            <div className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-none tracking-tight">
              Innovation.
            </div>
          </h1>

          {/* Tagline - centered */}
          <div className="text-xl md:text-2xl lg:text-3xl space-y-4 max-w-4xl mx-auto" data-testid="text-tagline">
            <div className="font-medium text-[#3b82f6] text-2xl md:text-3xl lg:text-4xl">
              Straight from Riyadh
            </div>
            <div className="text-gray-700 leading-relaxed">
              The first platform delivering AI news, policy analysis and regulatory insights for the GCC's largest economy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}