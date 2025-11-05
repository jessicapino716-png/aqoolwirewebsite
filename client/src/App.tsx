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
import AdminExternal from "@/pages/AdminExternal";
import AdminOpEd from "@/pages/AdminOpEd";
import AdminContent from "@/pages/AdminContent";
import CategoryPage from "@/pages/CategoryPage";
import ArticlePage from "@/pages/ArticlePage";
import RegulatoryIntelligence from "@/pages/RegulatoryIntelligence";
import ResearchTechnologyPolicy from "@/pages/ResearchTechnologyPolicy";
import AIAdvisory from "@/pages/AIAdvisory";
import Insights from "@/pages/Insights";
import Reports from "@/pages/Reports";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Cookies from "@/pages/Cookies";
import Disclaimers from "@/pages/Disclaimers";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  
  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* New Magazine Routes */}
      <Route path="/regulatory-intelligence" component={RegulatoryIntelligence} />
      <Route path="/research-technology-policy" component={ResearchTechnologyPolicy} />
      <Route path="/ai-advisory" component={AIAdvisory} />
      <Route path="/insights" component={Insights} />
      <Route path="/reports" component={Reports} />
      <Route path="/about" component={About} />
      
      {/* Legacy Category Routes */}
      <Route path="/policy" component={() => <CategoryPage />} />
      <Route path="/regulation" component={() => <CategoryPage />} />
      <Route path="/analysis" component={() => <CategoryPage />} />
      <Route path="/news" component={() => <CategoryPage />} />
      
      {/* Article Pages */}
      <Route path="/article/:slug" component={ArticlePage} />
      
      {/* Static Pages */}
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/disclaimers" component={Disclaimers} />
      
      {/* Admin Routes */}
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
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <TooltipProvider>
              <div className="min-h-screen flex flex-col">
                <ScrollProgressLine />
                <Header />
                <main className="flex-1">
                  <Router />
                </main>
                <Footer />
              </div>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
