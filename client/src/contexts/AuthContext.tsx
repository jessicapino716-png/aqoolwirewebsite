import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  adminToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setAdminToken(storedToken);
    }
  }, []);

  const login = (token: string) => {
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
  };

  const logout = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  const isAuthenticated = adminToken !== null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}