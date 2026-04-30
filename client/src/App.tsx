import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgressLine from "@/components/ScrollProgressLine";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminNewsletter from "@/pages/AdminNewsletter";
import AdminExternal from "@/pages/AdminExternal";
import AdminOpEd from "@/pages/AdminOpEd";
import AdminContent from "@/pages/AdminContent";
import AdminToolVideos from "@/pages/AdminToolVideos";
import CategoryPage from "@/pages/CategoryPage";
import ArticlePage from "@/pages/ArticlePage";
import Newsletter from "@/pages/Newsletter";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Cookies from "@/pages/Cookies";
import Disclaimers from "@/pages/Disclaimers";
import NotFound from "@/pages/not-found";
import NewHome from "@/pages/NewHome";
import NewIntelligenceHome from "@/pages/NewIntelligenceHome";
import Insights from "@/pages/Insights";
import AIInvestmentObservatory from "@/pages/AIInvestmentObservatory";
import About from "@/pages/About";
import Research from "@/pages/Research";

function Router() {
  const [location] = useLocation();
  
  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={NewIntelligenceHome} />
      <Route path="/research" component={Research} />
      <Route path="/about" component={About} />
      <Route path="/insights" component={Insights} />
      <Route path="/aiinvestmentobservatory" component={AIInvestmentObservatory} />
      <Route path="/policy" component={() => <CategoryPage />} />
      <Route path="/regulation" component={() => <CategoryPage />} />
      <Route path="/analysis" component={() => <CategoryPage />} />
      <Route path="/tools" component={() => <CategoryPage />} />
      <Route path="/article/:slug" component={ArticlePage} />
      <Route path="/newsletter" component={Newsletter} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/disclaimers" component={Disclaimers} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin">
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/dashboard">
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/newsletter">
        <ProtectedRoute>
          <AdminNewsletter />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/external">
        <ProtectedRoute>
          <AdminExternal />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/op-ed">
        <ProtectedRoute>
          <AdminOpEd />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/content">
        <ProtectedRoute>
          <AdminContent />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/tool-videos">
        <ProtectedRoute>
          <AdminToolVideos />
        </ProtectedRoute>
      </Route>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function Layout() {
  const [location] = useLocation();
  
  // Marketing pages have their own navigation/footer built-in
  const isMarketingPage = location === '/' || location === '/research' || location === '/about' || location === '/insights' || location === '/aiinvestmentobservatory';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!isMarketingPage && <ScrollProgressLine />}
      {!isMarketingPage && <Header />}
      <main className={isMarketingPage ? "" : "flex-1"}>
        <Router />
      </main>
      {!isMarketingPage && <Footer />}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Layout />
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
