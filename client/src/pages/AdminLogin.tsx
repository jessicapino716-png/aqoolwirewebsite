import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLogin() {
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token.trim()) {
      toast({
        title: "Token Required",
        description: "Please enter your admin token.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Test the token by making a request to a protected admin endpoint
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // Empty body to trigger validation error, but auth should be checked first
      });

      if (response.status === 400) {
        // 400 means auth passed but validation failed - this means token is valid
        login(token);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard.",
        });
        setLocation('/admin');
      } else if (response.status === 401 || response.status === 403) {
        // 401/403 means authentication failed - invalid token
        toast({
          title: "Invalid Token",
          description: "The provided admin token is invalid.",
          variant: "destructive",
        });
      } else {
        // Other errors (500, etc.)
        toast({
          title: "Server Error",
          description: "Unable to verify the admin token. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Unable to verify the admin token. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-indigo-500" />
          </div>
          <CardTitle className="text-2xl text-center" data-testid="text-admin-login-title">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center" data-testid="text-admin-login-description">
            Enter your admin token to access the content management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Admin Token</Label>
              <div className="relative">
                <Input
                  id="token"
                  type={showToken ? "text" : "password"}
                  placeholder="Enter your admin token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  disabled={isLoading}
                  data-testid="input-admin-token"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowToken(!showToken)}
                  disabled={isLoading}
                  data-testid="button-toggle-token-visibility"
                >
                  {showToken ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              data-testid="button-admin-login"
            >
              {isLoading ? "Verifying..." : "Login"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-[#3b82f6]/5 rounded-lg">
            <p className="text-sm text-[#3b82f6]">
              <strong>Note:</strong> You need a valid admin token to access the content management system. 
              Contact your system administrator if you don't have one.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}