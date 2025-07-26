import { useState, useEffect } from 'react';
import authService from '../services/authService';

// Helper function to decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
          // Token is valid, set user from token
          setUser({
            user_id: decodedToken.user_id,
            email: decodedToken.email,
            role: decodedToken.role
          });
        } else {
          // Token is expired, clear it
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
        }
      } catch (err) {
        console.error('Error parsing token:', err);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await authService.login(email, password);
      
      // Extract user info from token
      const decodedToken = decodeToken(data.token);
      if (decodedToken) {
        const userInfo = {
          user_id: decodedToken.user_id,
          email: decodedToken.email,
          role: decodedToken.role
        };
        
        setUser(userInfo);
        setError(null); // Clear any previous errors
        return { success: true, user: userInfo };
      } else {
        throw new Error('Invalid token received');
      }
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setError(null);
    }
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    
    try {
      const decodedToken = decodeToken(token);
      return decodedToken && decodedToken.exp * 1000 > Date.now();
    } catch (err) {
      console.error('Error checking authentication:', err);
      return false;
    }
  };

  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  const isCourier = () => {
    return user?.role === 'COURIER';
  };

  const isDispatcher = () => {
    return user?.role === 'DISPATCHER';
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isCourier,
    isDispatcher,
  };
};

export default useAuth; 