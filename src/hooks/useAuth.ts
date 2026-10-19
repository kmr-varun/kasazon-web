'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  User,
  getStoredUser,
  getCurrentUser,
  logout as authLogout,
  isAuthenticated as checkAuth,
  refreshAccessToken,
  getAccessToken,
  clearTokens,
} from '@/src/lib/auth';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  checkAuth: () => boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user && checkAuth();

  // Initialize auth state from localStorage and optionally refresh from API
  const initializeAuth = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // First check localStorage for stored user
      const storedUser = getStoredUser();
      const hasToken = checkAuth();

      if (storedUser && hasToken) {
        setUser(storedUser);
        // Optionally fetch fresh user data in the background
        try {
          const freshUser = await getCurrentUser();
          setUser(freshUser);
        } catch (err) {
          // If fetching fresh user fails (e.g., token expired), try to refresh
          try {
            await refreshAccessToken();
            const freshUser = await getCurrentUser();
            setUser(freshUser);
          } catch {
            // If refresh also fails, clear auth state
            clearTokens();
            setUser(null);
          }
        }
      } else if (hasToken && !storedUser) {
        // Token exists but no stored user, fetch user data
        try {
          const freshUser = await getCurrentUser();
          setUser(freshUser);
        } catch {
          clearTokens();
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize auth');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Listen for storage changes (e.g., login in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'kasazon_access_token' || e.key === 'kasazon_user') {
        initializeAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [initializeAuth]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authLogout();
      setUser(null);
    } catch (err) {
      // Still clear local state even if API call fails
      clearTokens();
      setUser(null);
      setError(err instanceof Error ? err.message : 'Failed to logout');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (!checkAuth()) return;

    try {
      const freshUser = await getCurrentUser();
      setUser(freshUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh user');
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    logout,
    refreshUser,
    checkAuth: () => checkAuth(),
  };
}

// Simple hook to get auth state without initialization
export function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsAuthenticated(checkAuth());
    setUser(getStoredUser());
  }, []);

  return { isAuthenticated, user };
}
