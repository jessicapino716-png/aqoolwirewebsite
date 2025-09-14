export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-black">
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

          {/* Hero Newsletter Section */}
          <div className="mb-12 mt-12">
            <div className="w-full h-1 bg-blue-500 mb-6"></div>
            <h3 className="text-2xl font-bold text-white mb-4" data-testid="text-hero-newsletter">
              Newsletter
            </h3>
            <div className="max-w-md">
              <p className="text-gray-400 text-sm mb-4">
                Get weekly AI policy insights delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-blue-500 focus:outline-none"
                  data-testid="input-hero-newsletter-email"
                />
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded font-medium transition-colors"
                  data-testid="button-hero-newsletter-subscribe"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Hero News Section */}
          <div className="mb-8">
            <div className="w-full h-1 bg-blue-500 mb-6"></div>
            <h3 className="text-2xl font-bold text-white mb-4" data-testid="text-hero-news">
              News
            </h3>
            <div className="space-y-4 max-w-2xl">
              <div className="group cursor-pointer" data-testid="item-hero-news-0">
                <h4 className="text-white group-hover:text-blue-500 transition-colors leading-tight mb-1 text-lg font-medium">
                  UAE and Saudi Arabia Sign Historic AI Cooperation Agreement
                </h4>
                <div className="text-gray-400 text-sm">
                  4 hours ago
                </div>
              </div>
              <div className="group cursor-pointer" data-testid="item-hero-news-1">
                <h4 className="text-white group-hover:text-blue-500 transition-colors leading-tight mb-1 text-lg font-medium">
                  CITC Releases New AI Ethics Guidelines for Financial Sector
                </h4>
                <div className="text-gray-400 text-sm">
                  6 hours ago
                </div>
              </div>
              <div className="group cursor-pointer" data-testid="item-hero-news-2">
                <h4 className="text-white group-hover:text-blue-500 transition-colors leading-tight mb-1 text-lg font-medium">
                  Vision 2030: AI's Role in Smart City Development
                </h4>
                <div className="text-gray-400 text-sm">
                  8 hours ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}