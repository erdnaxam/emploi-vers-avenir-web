
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Types pour notre contexte d'authentification
type User = {
  id: string;
  name: string;
  email: string;
  currentStep: number;
  lastVisitedPage: string;
  lastLoginDate: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProgress: (step: number, path: string) => void;
};

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider du contexte
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      
      // Si on est sur la page de login et que l'utilisateur est déjà connecté, on le redirige
      if (location.pathname === '/login') {
        navigate(parsedUser.lastVisitedPage || '/dashboard');
      }
    }
  }, [navigate, location.pathname]);

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    try {
      // Simulation d'une authentification
      // En production, cela devrait appeler une API
      const mockUser: User = {
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email,
        currentStep: 1,
        lastVisitedPage: '/dashboard',
        lastLoginDate: new Date().toISOString()
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  // Fonction d'inscription
  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulation d'une inscription
      const mockUser: User = {
        id: 'user-' + Date.now(),
        name,
        email,
        currentStep: 1,
        lastVisitedPage: '/dashboard',
        lastLoginDate: new Date().toISOString()
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    navigate('/');
  };

  // Mettre à jour la progression de l'utilisateur
  const updateUserProgress = (step: number, path: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        currentStep: Math.max(user.currentStep, step),
        lastVisitedPage: path
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUserProgress }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé avec AuthProvider');
  }
  return context;
};
