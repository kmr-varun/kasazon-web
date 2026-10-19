// Auth API service for Kasazon
// Backend API: http://localhost:4000/api/v1/auth

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// ============================================
// Types
// ============================================

export type ContactType = 'phone' | 'email';
export type OtpPurpose = 'LOGIN' | 'REGISTRATION' | 'PHONE_VERIFICATION' | 'EMAIL_VERIFICATION' | 'BOOKING_COMPLETION' | 'PASSWORD_RESET';
export type AccountType = 'CUSTOMER' | 'PROFESSIONAL';

export interface User {
  id: string;
  email: string | null;
  phone: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  accountType: AccountType;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface SendOtpRequest {
  contact: string;
  contactType: ContactType;
  purpose: OtpPurpose;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  expiresAt?: string;
}

export interface VerifyOtpRequest {
  contact: string;
  code: string;
  purpose: OtpPurpose;
}

export interface VerifyOtpResponse {
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
  user: User;
  isNewUser: boolean;
}

export interface RegisterRequest {
  fullName: string;
  email?: string;
  phone?: string;
  accountType: AccountType;
  referralCode?: string;
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ApiError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

// ============================================
// Token Storage
// ============================================

const TOKEN_KEYS = {
  ACCESS_TOKEN: 'kasazon_access_token',
  REFRESH_TOKEN: 'kasazon_refresh_token',
  USER: 'kasazon_user',
};

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.USER);
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem(TOKEN_KEYS.USER);
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

export function setStoredUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
}

// ============================================
// API Helper
// ============================================

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    const error: ApiError = data;
    throw new Error(error.message || 'An error occurred');
  }

  return data;
}

async function authenticatedRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = getAccessToken();

  const headers: HeadersInit = {
    ...options.headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  return apiRequest<T>(endpoint, { ...options, headers });
}

// ============================================
// Auth API Functions
// ============================================

/**
 * Send OTP to phone or email
 * POST /auth/send-otp
 */
export async function sendOtp(
  contact: string,
  contactType: ContactType,
  purpose: OtpPurpose = 'LOGIN'
): Promise<SendOtpResponse> {
  // Backend expects { phone, purpose } or { email, purpose }
  const payload = contactType === 'phone'
    ? { phone: contact, purpose }
    : { email: contact, purpose };

  return apiRequest<SendOtpResponse>('/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Verify OTP and get tokens
 * POST /auth/verify-otp
 * Test code: 123456
 */
export async function verifyOtp(
  contact: string,
  code: string,
  purpose: OtpPurpose = 'LOGIN',
  contactType?: ContactType
): Promise<VerifyOtpResponse> {
  // Detect contact type if not provided
  const type = contactType || detectContactType(contact);

  // Backend expects { phone, code, purpose } or { email, code, purpose }
  const payload = type === 'phone'
    ? { phone: contact, code, purpose }
    : { email: contact, code, purpose };

  const response = await apiRequest<VerifyOtpResponse>('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  // Store tokens and user on successful verification
  setTokens(response.tokens.accessToken, response.tokens.refreshToken);
  setStoredUser(response.user);

  return response;
}

/**
 * Complete registration for new users
 * POST /auth/register
 */
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const accessToken = getAccessToken();

  const response = await apiRequest<RegisterResponse>('/auth/register', {
    method: 'POST',
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    body: JSON.stringify(data),
  });

  // Update tokens and user after registration
  setTokens(response.accessToken, response.refreshToken);
  setStoredUser(response.user);

  return response;
}

/**
 * Refresh access token
 * POST /auth/refresh
 */
export async function refreshAccessToken(): Promise<RefreshResponse> {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await apiRequest<RefreshResponse>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });

  // Update tokens
  setTokens(response.accessToken, response.refreshToken);

  return response;
}

/**
 * Logout user
 * POST /auth/logout
 */
export async function logout(): Promise<void> {
  const refreshToken = getRefreshToken();

  try {
    if (refreshToken) {
      await apiRequest('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
    }
  } finally {
    // Always clear local storage even if API call fails
    clearTokens();
  }
}

/**
 * Get current user
 * GET /auth/me
 */
export async function getCurrentUser(): Promise<User> {
  const user = await authenticatedRequest<User>('/auth/me');
  setStoredUser(user);
  return user;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

/**
 * Helper to determine contact type from input
 */
export function detectContactType(contact: string): ContactType {
  return contact.includes('@') ? 'email' : 'phone';
}

/**
 * Format phone number for API (strip country code formatting)
 */
export function formatPhoneForApi(countryCode: string, phoneNumber: string): string {
  // Remove any spaces or dashes
  const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
  const cleanCode = countryCode.replace(/\+/g, '');
  return `+${cleanCode}${cleanPhone}`;
}
