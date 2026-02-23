import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../api/auth';
import { userApi } from '../api/user';
import { User } from '../types';
import { STORAGE_KEYS } from '../utils/constants';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      
      if (token) {
        try {
          const response = await userApi.getUser();
          setUser(response.data);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data));
        } catch (e) {
          console.error('Failed to load user', e);
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const updateUserData = async () => {
    try {
      const response = await userApi.getUser();
      setUser(response.data);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    const token = response.data.token;
    
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    
    const userResponse = await userApi.getUser();
    setUser(userResponse.data);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userResponse.data));
  };

  const register = async (email: string, password: string) => {
    const response = await authApi.register(email, password);
    const token = response.data.token;
    
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    
    const userResponse = await userApi.getUser();
    setUser(userResponse.data);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userResponse.data));
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        logout,
        updateUserData,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};