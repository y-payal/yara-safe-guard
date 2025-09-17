import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockOfficers, Officer } from '@/data/mockData';

interface AuthContextType {
  user: Officer | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, deptId: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Officer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading and auto-login for demo
  useEffect(() => {
    const savedUser = localStorage.getItem('yaraUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Auto-login with first mock officer for demo
      const defaultOfficer = mockOfficers[0];
      setUser(defaultOfficer);
      localStorage.setItem('yaraUser', JSON.stringify(defaultOfficer));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find officer by email (password validation simulated)
    const officer = mockOfficers.find(o => o.email === email);
    
    if (officer && password === 'password123') { // Mock password validation
      setUser(officer);
      localStorage.setItem('yaraUser', JSON.stringify(officer));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, deptId: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (mockOfficers.some(o => o.email === email)) {
      setIsLoading(false);
      return false;
    }
    
    // Create new officer
    const newOfficer: Officer = {
      id: `OFF${Date.now()}`,
      name,
      email,
      deptId,
      role: 'Tourism Safety Officer'
    };
    
    // Add to mock data (in real app, this would be API call)
    mockOfficers.push(newOfficer);
    
    setUser(newOfficer);
    localStorage.setItem('yaraUser', JSON.stringify(newOfficer));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yaraUser');
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};