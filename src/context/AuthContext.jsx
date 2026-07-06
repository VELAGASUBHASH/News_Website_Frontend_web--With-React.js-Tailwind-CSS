import { createContext, useEffect, useState, useCallback } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  updateCurrentUser,
  changePassword as changePasswordService,
} from "../services/authService";
import { getToken, setToken, removeToken } from "../utils/tokenStorage";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // auto-login check
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const bootstrapAuth = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const data = await getCurrentUser();
      setUser(data.user ?? data);
    } catch (err) {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  const login = async (credentials) => {
    setActionLoading(true);
    setError(null);
    try {
      const data = await loginUser(credentials);
      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  const register = async (payload) => {
    setActionLoading(true);
    setError(null);
    try {
      const data = await registerUser(payload);
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
      }
      return { success: true, user: data.user };
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      // Even if the API call fails, proceed with local logout
    } finally {
      removeToken();
      setUser(null);
    }
  };

  const updateProfile = async (payload) => {
    setActionLoading(true);
    setError(null);
    try {
      const data = await updateCurrentUser(payload);
      setUser(data.user ?? data);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Update failed.";
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  const changeUserPassword = async (payload) => {
    setActionLoading(true);
    setError(null);
    try {
      await changePasswordService(payload);
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Could not change password.";
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  const value = {
    user,
    loading,
    actionLoading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role?.toLowerCase() === "admin",
    login,
    register,
    logout,
    updateProfile,
    changeUserPassword,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};