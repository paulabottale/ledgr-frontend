import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/auth';
import type { User, LoginCredentials, RegisterData } from '../types/auth';
 
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}
 
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
const TOKEN_KEY = 'ledgr_token';
 
interface AuthProviderProps {
  children: ReactNode;
}
 
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
 
      if (!storedToken) {
        setIsLoading(false);
        return;
      }
 
      try {
        const currentUser = await authService.getCurrentUser(storedToken);
        setUser(currentUser);
        setToken(storedToken);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    };
 
    initAuth();
  }, []);
 
  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem(TOKEN_KEY, response.token);
  };
 
  const register = async (data: RegisterData) => {
    const response = await authService.register(data);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem(TOKEN_KEY, response.token);
  };
 
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };
 
  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    register,
    logout,
  };
 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
