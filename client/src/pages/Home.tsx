import ArticleCard from "@/components/ArticleCard";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Content } from "@shared/schema";

export default function Home() {
  // Fetch latest weekly analysis for hero section
  const { data: weeklyAnalysis, isLoading: isLoadingWeekly } = useQuery<Content>({
    queryKey: ['/api/content/weekly-analysis/latest'],
  });

  // Fetch external articles for curation section
  const { data: externalArticles, isLoading: isLoadingExternal } = useQuery<Content[]>({
    queryKey: ['/api/content', { type: 'external', limit: 8 }],
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="verge-nav border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="verge-logo-container">
                <Link href="/">
                  <h1 className="verge-logo" data-testid="link-home">The Aqool AI</h1>
                </Link>
              </div>
              <div className="verge-tagline">
                AI Policy & Regulation in the Kingdom
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/policy">
                  <span className="verge-nav-link" data-testid="link-nav-policy">Policy</span>
                </Link>
                <Link href="/regulation">
                  <span className="verge-nav-link" data-testid="link-nav-regulation">Regulation</span>
                </Link>
                <Link href="/analysis">
                  <span className="verge-nav-link" data-testid="link-nav-analysis">Analysis</span>
                </Link>
                <Link href="/newsletter">
                  <span className="verge-nav-link" data-testid="link-nav-newsletter">Newsletter</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2">
            {/* Weekly Analysis Hero */}
            {isLoadingWeekly ? (
              <div className="mb-12">
                <div className="mb-4">
                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" data-testid="loading-weekly-label"></div>
                </div>
                <div className="h-96 bg-gray-100 animate-pulse rounded-md" data-testid="loading-weekly-analysis"></div>
              </div>
            ) : weeklyAnalysis ? (
              <div className="mb-12">
                <div className="mb-4">
                  <span className="verge-category-label text-primary" data-testid="label-weekly-analysis">
                    WEEKLY ANALYSIS
                  </span>
                </div>
                <ArticleCard article={weeklyAnalysis} variant="hero" />
              </div>
            ) : (
              <div className="mb-12 p-8 bg-gray-50 rounded-md text-center" data-testid="no-weekly-analysis">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Weekly Analysis Available</h3>
                <p className="text-gray-600">Check back soon for our latest analysis piece.</p>
              </div>
            )}

            {/* Curated External Articles */}
            <div className="mb-12">
              <div className="verge-divider mb-8"></div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="verge-headline-medium text-black" data-testid="text-section-curated">
                  Curated Coverage
                </h2>
                <Link href="/external">
                  <span className="verge-category-label text-primary hover:text-primary/80 transition-colors" data-testid="link-view-all-external">
                    View all
                  </span>
                </Link>
              </div>
              {isLoadingExternal ? (
                <div className="space-y-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-md" data-testid={`loading-external-${i}`}></div>
                  ))}
                </div>
              ) : externalArticles && externalArticles.length > 0 ? (
                <div className="space-y-8">
                  {externalArticles.slice(0, 4).map((article) => (
                    <ArticleCard key={article.id} article={article} variant="featured" />
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-gray-50 rounded-md text-center" data-testid="no-external-articles">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No External Articles</h3>
                  <p className="text-gray-600">We're working on curating the latest coverage for you.</p>
                </div>
              )}
            </div>

            {/* More Coverage - Additional Articles */}
            {externalArticles && externalArticles.length > 4 && (
              <div>
                <div className="verge-divider mb-8"></div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="verge-headline-medium text-black" data-testid="text-section-latest">
                    More Coverage
                  </h2>
                  <Link href="/all">
                    <span className="verge-category-label text-primary hover:text-primary/80 transition-colors" data-testid="link-view-all">
                      View all
                    </span>
                  </Link>
                </div>
                <div className="space-y-0">
                  {externalArticles.slice(4).map((article) => (
                    <ArticleCard key={article.id} article={article} variant="list" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Newsletter Signup */}
            <div className="verge-sidebar-section">
              <h3 className="verge-sidebar-title" data-testid="text-newsletter-title">
                AI Policy Newsletter
              </h3>
              <p className="verge-sidebar-description" data-testid="text-newsletter-description">
                Get weekly insights on AI regulation and policy developments in the GCC region.
              </p>
              <form className="mt-4" data-testid="form-newsletter">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="verge-email-input"
                    data-testid="input-newsletter-email"
                  />
                  <button
                    type="submit"
                    className="verge-email-button"
                    data-testid="button-newsletter-submit"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            {/* Categories */}
            <div className="verge-sidebar-section">
              <h3 className="verge-sidebar-title" data-testid="text-categories-title">
                Categories
              </h3>
              <div className="space-y-2">
                <Link href="/policy">
                  <span className="verge-sidebar-link" data-testid="link-category-policy">AI Policy</span>
                </Link>
                <Link href="/regulation">
                  <span className="verge-sidebar-link" data-testid="link-category-regulation">Regulation</span>
                </Link>
                <Link href="/business">
                  <span className="verge-sidebar-link" data-testid="link-category-business">Business</span>
                </Link>
                <Link href="/research">
                  <span className="verge-sidebar-link" data-testid="link-category-research">Research</span>
                </Link>
                <Link href="/healthcare">
                  <span className="verge-sidebar-link" data-testid="link-category-healthcare">Healthcare</span>
                </Link>
              </div>
            </div>

            {/* About */}
            <div className="verge-sidebar-section">
              <h3 className="verge-sidebar-title" data-testid="text-about-title">
                About The Aqool AI
              </h3>
              <p className="verge-sidebar-description" data-testid="text-about-description">
                Your trusted source for AI policy and regulation news in Saudi Arabia and the GCC region.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p data-testid="text-footer-copyright">&copy; 2025 The Aqool AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}