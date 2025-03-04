import React, { createContext } from 'react';

// Define the AuthContext type
interface AuthContextType {
    isAuthenticated: boolean;
    login: (auth: boolean) => void;
    logout: () => void;
    refreshLogin: () => void;
    showLoginModal: boolean;
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
    loginModalMessage: string;
    onShowLoginModal: (message: string) => void;
}
  
  // Create the context with a dummy default value or throw an error
export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {
      throw new Error('login function must be used within AuthProvider');
    },
    logout: () => {
      throw new Error('logout function must be used within AuthProvider');
    },
    refreshLogin: () => {
      throw new Error('refreshLogin function must be used within AuthProvider');
    },
    showLoginModal: false,
    setShowLoginModal: () => {
      throw new Error('setShowLoginModal must be used within AuthProvider');
    },
    loginModalMessage: '',
    onShowLoginModal: () => {
      throw new Error('onShowLoginModal must be used within AuthProvider');
    },
});
  
  