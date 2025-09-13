import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Plus, FileText, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/admin/login');
  };

  const navigationCards = [
    {
      title: "External Articles",
      description: "Add links to external articles with source attribution",
      icon: <Plus className="h-6 w-6" />,
      action: () => setLocation('/admin/external'),
      testId: "card-external-articles"
    },
    {
      title: "Op-Ed Articles",
      description: "Write and publish original commentary and analysis",
      icon: <FileText className="h-6 w-6" />,
      action: () => setLocation('/admin/op-ed'),
      testId: "card-op-ed-articles"
    },
    {
      title: "Content Management",
      description: "View, edit, and manage all published content",
      icon: <Settings className="h-6 w-6" />,
      action: () => setLocation('/admin/content'),
      testId: "card-content-management"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" data-testid="text-admin-dashboard-title">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1" data-testid="text-admin-dashboard-subtitle">
                The Aqool AI Content Management System
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              data-testid="button-admin-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationCards.map((card) => (
            <Card 
              key={card.title} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={card.action}
              data-testid={card.testId}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    {card.icon}
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {card.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Overview of your content management activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600" data-testid="text-stats-total">--</div>
                  <div className="text-sm text-gray-600">Total Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600" data-testid="text-stats-external">--</div>
                  <div className="text-sm text-gray-600">External Links</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600" data-testid="text-stats-opeds">--</div>
                  <div className="text-sm text-gray-600">Op-Ed Articles</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}