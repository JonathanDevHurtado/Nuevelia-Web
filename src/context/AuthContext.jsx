import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api/client.js';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('nuvelia_token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await apiFetch('/api/auth/me');
        setUser(data.perfil);
      } catch (err) {
        console.error('Autenticación inválida:', err);
        localStorage.removeItem('nuvelia_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem('nuvelia_token', response.token);
      setToken(response.token);
      setUser(response.perfil);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (data) => {
    try {
      const response = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      localStorage.setItem('nuvelia_token', response.token);
      setToken(response.token);
      setUser(response.perfil);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('nuvelia_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
