import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

export function useAuth() {
  const location = useLocation();
  const [authState, setAuthState] = useState({
    isAuthenticated: authService.isAuthenticated(),
    userRole: authService.getRole(),
  });

  useEffect(() => {
    setAuthState({
      isAuthenticated: authService.isAuthenticated(),
      userRole: authService.getRole(),
    });
  }, [location.pathname]);

  return authState;
}