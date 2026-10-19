import type {
  AuthResponse,
  RegisterData,
  TokenPair,
  User,
  ServiceCategory,
  ServiceCategoryDetail,
  Service,
  ServiceDetail,
  Booking,
  BookingDetail,
  CreateBookingData,
  Address,
  CreateAddressData,
  PaymentMethod,
  PaymentMethodListResponse,
  AddPaymentMethodData,
  CheckoutResponse,
  WalletBalance,
  Conversation,
  ConversationDetail,
  Message,
  Review,
  CreateReviewData,
  UserProfile,
  UpdateProfileData,
  WalletInfo,
  Dispute,
  DisputeDetail,
  CreateDisputeData,
  Quotation,
  QuotationDetail,
  BookingFilter,
  BookingStats,
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private accessToken: string | null = null;

  /**
   * Set the access token for authenticated requests
   */
  setToken(token: string | null) {
    this.accessToken = token;
  }

  /**
   * Get the current access token
   */
  getToken(): string | null {
    return this.accessToken;
  }

  /**
   * Core request method with error handling
   */
  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    // Get token from localStorage if not set on client
    const token = this.accessToken || (typeof window !== 'undefined' ? localStorage.getItem('kasazon_access_token') : null);

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    };

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Request failed' }));
      throw new ApiError(
        res.status,
        error.message || 'Request failed',
        error.code,
        error.errors
      );
    }

    // Handle 204 No Content
    if (res.status === 204) {
      return undefined as T;
    }

    return res.json();
  }

  // ==========================================
  // Auth endpoints
  // ==========================================
  auth = {
    /**
     * Send OTP to phone or email
     */
    sendOtp: (data: { contact: string; purpose: 'login' | 'register' }) =>
      this.request<{ message: string }>('/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    /**
     * Verify OTP code
     */
    verifyOtp: (data: { contact: string; code: string; purpose: string }) =>
      this.request<AuthResponse>('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    /**
     * Register new user
     */
    register: (data: RegisterData) =>
      this.request<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    /**
     * Refresh access token
     */
    refresh: (refreshToken: string) =>
      this.request<TokenPair>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      }),

    /**
     * Logout and invalidate refresh token
     */
    logout: (refreshToken: string) =>
      this.request<void>('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      }),

    /**
     * Get current authenticated user
     */
    getMe: () => this.request<User>('/auth/me'),
  };

  // ==========================================
  // Services endpoints
  // ==========================================
  services = {
    /**
     * Get all service categories
     */
    getCategories: () => this.request<ServiceCategory[]>('/services/categories'),

    /**
     * Get category details with services
     */
    getCategory: (slug: string) =>
      this.request<ServiceCategoryDetail>(`/services/categories/${slug}`),

    /**
     * Search services by query
     */
    search: (query: string) =>
      this.request<Service[]>(`/services/search?q=${encodeURIComponent(query)}`),

    /**
     * Get popular services
     */
    getPopular: () => this.request<Service[]>('/services/popular'),

    /**
     * Get service by ID
     */
    getById: (id: string) => this.request<ServiceDetail>(`/services/${id}`),
  };

  // ==========================================
  // Bookings endpoints
  // ==========================================
  bookings = {
    /**
     * Create a new booking
     */
    create: (data: CreateBookingData) =>
      this.request<Booking>('/bookings', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    /**
     * List user's bookings, optionally filtered by status
     */
    list: async (status?: string): Promise<Booking[]> => {
      const response = await this.request<{ items: Booking[]; total: number }>(`/bookings${status ? `?status=${status}` : ''}`);
      return response.items || [];
    },

    /**
     * Get booking details by ID
     */
    getById: (id: string) => this.request<BookingDetail>(`/bookings/${id}`),

    /**
     * Reschedule a booking
     */
    reschedule: (id: string, data: { scheduledDate: string; scheduledTime: string }) =>
      this.request<Booking>(`/bookings/${id}/reschedule`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),

    /**
     * Cancel a booking
     */
    cancel: (id: string, reason: string) =>
      this.request<void>(`/bookings/${id}/cancel`, {
        method: 'POST',
        body: JSON.stringify({ reason }),
      }),
  };

  // ==========================================
  // Addresses endpoints
  // ==========================================
  addresses = {
    /**
     * List user's addresses
     */
    list: () => this.request<{ addresses: Address[] }>('/addresses'),

    /**
     * Create a new address
     */
    create: (data: CreateAddressData) =>
      this.request<Address>('/addresses', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    /**
     * Update an address
     */
    update: (id: string, data: Partial<CreateAddressData>) =>
      this.request<Address>(`/addresses/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),

    /**
     * Delete an address
     */
    delete: (id: string) =>
      this.request<void>(`/addresses/${id}`, { method: 'DELETE' }),

    /**
     * Set an address as default
     */
    setDefault: (id: string) =>
      this.request<Address>(`/addresses/${id}/default`, { method: 'POST' }),
  };

  // ==========================================
  // Payments endpoints
  // ==========================================
  payments = {
    /**
     * Get user's payment methods
     */
    getMethods: () => this.request<PaymentMethodListResponse>('/payments/methods'),

    /**
     * Add a new payment method
     */
    addMethod: (data: AddPaymentMethodData) =>
      this.request<PaymentMethod>('/payments/methods', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    /**
     * Remove a payment method
     */
    removeMethod: (id: string) =>
      this.request<void>(`/payments/methods/${id}`, { method: 'DELETE' }),

    /**
     * Set a payment method as default
     */
    setDefaultMethod: (id: string) =>
      this.request<PaymentMethod>(`/payments/methods/${id}/default`, { method: 'POST' }),

    /**
     * Checkout/pay for a booking
     */
    checkout: (bookingId: string, paymentMethodId: string) =>
      this.request<CheckoutResponse>('/payments/checkout', {
        method: 'POST',
        body: JSON.stringify({ bookingId, paymentMethodId }),
      }),

    /**
     * Get wallet balance
     */
    getWallet: () => this.request<WalletBalance>('/payments/wallet'),

    /**
     * Top up wallet
     */
    topupWallet: (amount: number) =>
      this.request<WalletBalance>('/payments/wallet/topup', {
        method: 'POST',
        body: JSON.stringify({ amount }),
      }),
  };

  // ==========================================
  // Messages endpoints
  // ==========================================
  messages = {
    /**
     * Get all conversations
     */
    getConversations: () => this.request<Conversation[]>('/messages/conversations'),

    /**
     * Get conversation with messages
     */
    getConversation: (id: string) =>
      this.request<ConversationDetail>(`/messages/conversations/${id}`),

    /**
     * Send a message in a conversation
     */
    sendMessage: (conversationId: string, content: string) =>
      this.request<Message>(`/messages/conversations/${conversationId}`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      }),

    /**
     * Mark conversation as read
     */
    markRead: (conversationId: string) =>
      this.request<void>(`/messages/conversations/${conversationId}/read`, {
        method: 'POST',
      }),

    /**
     * Get total unread message count
     */
    getUnreadCount: () => this.request<{ count: number }>('/messages/unread-count'),
  };

  // ==========================================
  // Reviews endpoints
  // ==========================================
  reviews = {
    /**
     * Create a review for a completed booking
     */
    create: (data: CreateReviewData) =>
      this.request<Review>('/reviews', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    /**
     * Get reviews for a service
     */
    getByService: (serviceId: string) =>
      this.request<Review[]>(`/reviews/service/${serviceId}`),

    /**
     * Get reviews for a vendor
     */
    getByVendor: (vendorId: string) =>
      this.request<Review[]>(`/reviews/vendor/${vendorId}`),
  };

  // ==========================================
  // Users endpoints
  // ==========================================
  users = {
    /**
     * Get current user's profile
     */
    getProfile: () => this.request<UserProfile>('/users/me'),

    /**
     * Update current user's profile
     */
    updateProfile: (data: UpdateProfileData) =>
      this.request<UserProfile>('/users/me', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),

    /**
     * Get current user's wallet info with transactions
     */
    getWallet: () => this.request<WalletInfo>('/users/me/wallet'),

    /**
     * Get favorite services
     */
    getFavorites: () => this.request<Service[]>('/users/me/favorites'),

    /**
     * Add service to favorites
     */
    addFavorite: (serviceId: string) =>
      this.request<{ message: string }>(`/users/me/favorites/${serviceId}`, {
        method: 'PATCH',
      }),

    /**
     * Remove service from favorites
     */
    removeFavorite: (serviceId: string) =>
      this.request<void>(`/users/me/favorites/${serviceId}`, {
        method: 'DELETE',
      }),
  };

  // ==========================================
  // Disputes endpoints
  // ==========================================
  disputes = {
    /**
     * Create a dispute for a booking
     */
    create: (data: CreateDisputeData) =>
      this.request<Dispute>('/disputes', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    /**
     * List user's disputes
     */
    list: () => this.request<Dispute[]>('/disputes'),

    /**
     * Get dispute details by ID
     */
    getById: (id: string) => this.request<DisputeDetail>(`/disputes/${id}`),

    /**
     * Add evidence to a dispute
     */
    addEvidence: (id: string, data: { type: string; url: string; description?: string }) =>
      this.request<void>(`/disputes/${id}/evidence`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    /**
     * Send a message in a dispute
     */
    sendMessage: (id: string, content: string) =>
      this.request<void>(`/disputes/${id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      }),
  };

  // ==========================================
  // Quotations endpoints (customer view)
  // ==========================================
  quotations = {
    /**
     * List quotations received by the customer
     */
    list: () => this.request<Quotation[]>('/quotations'),

    /**
     * Get quotation details by ID
     */
    getById: (id: string) => this.request<QuotationDetail>(`/quotations/${id}`),

    /**
     * Accept a quotation
     */
    accept: (id: string) =>
      this.request<Booking>(`/quotations/${id}/accept`, { method: 'POST' }),

    /**
     * Reject a quotation
     */
    reject: (id: string, reason?: string) =>
      this.request<void>(`/quotations/${id}/reject`, {
        method: 'POST',
        body: JSON.stringify({ reason }),
      }),
  };
}

// Singleton instance
export const api = new ApiClient();
export { ApiError };
export type { ApiClient };

// ==========================================
// Backward-compatible function exports
// ==========================================
// These functions provide backward compatibility with existing code
// that uses function-based API calls.

// Re-export types for backward compatibility
export type { BookingFilter, BookingStats } from './types';

/**
 * Helper to get auth token from localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('kasazon_access_token');
}

/**
 * Helper to check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

/**
 * Get list of bookings with optional filter
 * Maps frontend filter values to backend status values
 */
export async function getBookings(filter: BookingFilter = 'all'): Promise<Booking[]> {
  // Map frontend filter to backend status
  const statusMap: Record<string, string | undefined> = {
    all: undefined,
    upcoming: 'CONFIRMED', // Or PENDING, ASSIGNED - bookings scheduled for future
    ongoing: 'IN_PROGRESS',
    completed: 'COMPLETED',
    cancelled: 'CANCELLED',
    disputed: 'DISPUTED',
  };
  const status = statusMap[filter];
  return api.bookings.list(status);
}

/**
 * Get booking details by ID
 */
export async function getBookingById(id: string): Promise<BookingDetail> {
  return api.bookings.getById(id);
}

/**
 * Reschedule a booking
 */
export async function rescheduleBooking(
  id: string,
  scheduledDate: string,
  scheduledTime: string
): Promise<Booking> {
  return api.bookings.reschedule(id, { scheduledDate, scheduledTime });
}

/**
 * Cancel a booking
 */
export async function cancelBooking(id: string, reason?: string): Promise<void> {
  return api.bookings.cancel(id, reason || '');
}

/**
 * Get booking activity stats
 */
export async function getBookingStats(): Promise<BookingStats> {
  try {
    const [upcoming, ongoing, completed] = await Promise.all([
      getBookings('upcoming'),
      getBookings('ongoing'),
      getBookings('completed'),
    ]);
    return {
      upcoming: upcoming.length,
      ongoing: ongoing.length,
      completed: completed.length,
      cancelled: 0,
      disputed: 0,
    };
  } catch {
    return {
      upcoming: 0,
      ongoing: 0,
      completed: 0,
      cancelled: 0,
      disputed: 0,
    };
  }
}
