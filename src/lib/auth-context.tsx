'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { api, ApiError } from './api';
import type { User, TokenPair } from './types';

// ============================================
// Types
// ============================================

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
  refreshAuth: () => Promise<boolean>;
}

// ============================================
// Constants
// ============================================

const TOKEN_KEYS = {
  ACCESS_TOKEN: 'kasazon_access_token',
  REFRESH_TOKEN: 'kasazon_refresh_token',
} as const;

// ============================================
// Context
// ============================================

const AuthContext = createContext<AuthContextType | null>(null);

// ============================================
// Helper Functions
// ============================================

function getStoredAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
}

function getStoredRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
}

function storeTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
}

function clearStoredTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
}

// ============================================
// Provider Component
// ============================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Attempt to refresh the access token using the stored refresh token
   */
  const refreshAuth = useCallback(async (): Promise<boolean> => {
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) {
      return false;
    }

    try {
      const tokens = await api.auth.refresh(refreshToken);
      storeTokens(tokens.accessToken, tokens.refreshToken);
      api.setToken(tokens.accessToken);
      return true;
    } catch (error) {
      // Refresh failed, clear everything
      clearStoredTokens();
      api.setToken(null);
      setUser(null);
      return false;
    }
  }, []);

  /**
   * Initialize auth state from stored tokens
   */
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = getStoredAccessToken();
      const refreshToken = getStoredRefreshToken();

      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      // Set the token for API requests
      api.setToken(accessToken);

      try {
        // Try to get current user
        const currentUser = await api.auth.getMe();
        setUser(currentUser);
      } catch (error) {
        // Token might be expired, try to refresh
        if (error instanceof ApiError && error.status === 401 && refreshToken) {
          const refreshed = await refreshAuth();
          if (refreshed) {
            try {
              const currentUser = await api.auth.getMe();
              setUser(currentUser);
            } catch {
              // Even after refresh, failed to get user
              clearStoredTokens();
              api.setToken(null);
            }
          }
        } else {
          // Non-auth error or no refresh token
          clearStoredTokens();
          api.setToken(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [refreshAuth]);

  /**
   * Login with tokens and user data
   */
  const login = useCallback((accessToken: string, refreshToken: string, userData: User) => {
    storeTokens(accessToken, refreshToken);
    api.setToken(accessToken);
    setUser(userData);
  }, []);

  /**
   * Logout and clear all auth state
   */
  const logout = useCallback(async () => {
    const refreshToken = getStoredRefreshToken();

    // Clear local state immediately for better UX
    clearStoredTokens();
    api.setToken(null);
    setUser(null);

    // Then try to invalidate the refresh token on the server
    if (refreshToken) {
      try {
        await api.auth.logout(refreshToken);
      } catch {
        // Ignore errors - we've already cleared local state
      }
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// ============================================
// Utility Hooks
// ============================================

/**
 * Hook that returns only when authenticated
 * Throws if used outside of authenticated context
 */
export function useAuthenticatedUser(): User {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    throw new Error('Auth is still loading');
  }

  if (!user) {
    throw new Error('User is not authenticated');
  }

  return user;
}

/**
 * Hook for checking if user has specific account type
 */
export function useIsAccountType(type: 'CUSTOMER' | 'PROFESSIONAL'): boolean {
  const { user } = useAuth();
  return user?.accountType === type;
}
