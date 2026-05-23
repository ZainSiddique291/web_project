import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authApi } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthHeader = (t) => {
    if (t) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    const init = async () => {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');

      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
        setAuthHeader(savedToken);
        try {
          const { data } = await authApi.getMe();
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        } catch {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setUser(null);
          setToken(null);
          setAuthHeader(null);
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const persistSession = (userData, authToken) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    setUser(userData);
    setToken(authToken);
    setAuthHeader(authToken);
  };

  const login = async (email, password) => {
    try {
      const response = await authApi.login({
        email: email.trim().toLowerCase(),
        password,
      });
      const { token, ...userData } = response.data;
      persistSession(userData, token);
      return { success: true, user: userData };
    } catch (error) {
      const status = error.response?.status;
      let message = error.response?.data?.message || 'Login failed. Please try again.';
      if (!error.response) {
        message = 'Cannot reach server. Start the backend on port 5000 and ensure MongoDB is running.';
      } else if (status === 404) {
        message = 'Login service not found. Check that the backend is running.';
      }
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authApi.register({
        ...userData,
        email: userData.email?.trim().toLowerCase(),
      });
      const { token, ...registeredUserData } = response.data;
      persistSession(registeredUserData, token);
      return { success: true, user: registeredUserData };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.',
      };
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setAuthHeader(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
