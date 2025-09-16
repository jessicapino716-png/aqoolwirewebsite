import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminNewsletter from "@/pages/AdminNewsletter";
import AdminExternal from "@/pages/AdminExternal";
import AdminOpEd from "@/pages/AdminOpEd";
import AdminContent from "@/pages/AdminContent";
import CategoryPage from "@/pages/CategoryPage";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/policy" component={() => <CategoryPage />} />
      <Route path="/regulation" component={() => <CategoryPage />} />
      <Route path="/analysis" component={() => <CategoryPage />} />
      <Route path="/tools" component={() => <CategoryPage />} />
      <Route path="/newsletter" component={() => <CategoryPage />} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin">
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
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-r from-teal-400 to-cyan-300">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
