"use client";

import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

// Types for API responses
export interface VendorProfile {
  id: string;
  userId: string;
  title: string | null;
  bio: string | null;
  dateOfBirth: string;
  gender: string;
  experienceYears: number | null;
  verificationStatus: string;
  overallRating: string;
  totalReviews: number;
  profileStrength: number;
  availableBalance: string;
  guarantorName: string;
  guarantorRelationship: string;
  guarantorPhone: string;
  guarantorOccupation: string;
  guarantorIdNumber: string;
  uniformTrackingNumber: string | null;
  uniformReceived: boolean;
  uniformReceivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    avatarUrl: string | null;
    phoneVerified: boolean;
    emailVerified: boolean;
  };
  ratingBreakdown?: {
    oneStarCount: number;
    twoStarCount: number;
    threeStarCount: number;
    fourStarCount: number;
    fiveStarCount: number;
  } | null;
  services?: VendorService[];
  availability?: VendorAvailability[];
}

export interface VendorService {
  id: string;
  serviceId: string;
  customPrice: number | null;
  isAvailable: boolean;
  service: {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    category: {
      name: string;
    };
  };
}

export interface VendorAvailability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface JobRequest {
  id: string;
  bookingCode: string;
  status: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number;
  totalAmount: number;
  address: {
    id: string;
    label: string;
    streetAddress: string;
    city: string;
    region: string;
  };
  customer: {
    id: string;
    fullName: string;
    avatarUrl: string;
    phoneNumber: string;
  };
  service: {
    id: string;
    name: string;
    basePrice: number;
  };
  createdAt: string;
}

export interface Booking extends JobRequest {
  vendor?: {
    id: string;
    user: {
      fullName: string;
      avatarUrl: string;
    };
  };
  startedAt?: string;
  completedAt?: string;
  checklist?: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  name: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface VendorBalance {
  available: number;
  pending: number;
  totalEarnings: number;
  totalWithdrawn: number;
}

export interface Transaction {
  id: string;
  bookingId: string;
  amount: number;
  status: string;
  createdAt: string;
  booking?: {
    bookingCode: string;
    customer: {
      fullName: string;
      avatarUrl: string;
    };
    service: {
      name: string;
    };
    scheduledDate: string;
    scheduledTime: string;
  };
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customer: {
    fullName: string;
    avatarUrl: string;
  };
  service: {
    name: string;
  };
}

export interface ApiError {
  status: number;
  message: string;
}

// Generic fetch wrapper with authentication
async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: ApiError | null }> {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("kasazon_access_token") : null;

    if (!token) {
      return { data: null, error: { status: 401, message: "Not authenticated" } };
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token might be expired, redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("kasazon_access_token");
          window.location.href = "/login";
        }
        return { data: null, error: { status: 401, message: "Session expired" } };
      }

      const errorData = await response.json().catch(() => ({}));
      return {
        data: null,
        error: {
          status: response.status,
          message: errorData.message || `Request failed with status ${response.status}`,
        },
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: {
        status: 500,
        message: err instanceof Error ? err.message : "Network error",
      },
    };
  }
}

// Hook for fetching vendor profile
export function useVendorProfile() {
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchWithAuth<VendorProfile>("/vendor/profile");
    setProfile(data);
    setError(error);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}

// Hook for fetching job requests
export function useJobRequests(query?: { status?: string; limit?: number; offset?: number }) {
  const [requests, setRequests] = useState<JobRequest[]>([]);
  const [pagination, setPagination] = useState({ total: 0, limit: 20, offset: 0, hasMore: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query?.status) params.append("status", query.status);
    if (query?.limit) params.append("limit", query.limit.toString());
    if (query?.offset) params.append("offset", query.offset.toString());

    const endpoint = `/vendor/jobs/requests${params.toString() ? `?${params.toString()}` : ""}`;
    const { data, error } = await fetchWithAuth<{ data: JobRequest[]; pagination: typeof pagination }>(endpoint);

    if (data) {
      setRequests(data.data || []);
      setPagination(data.pagination || { total: 0, limit: 20, offset: 0, hasMore: false });
    }
    setError(error);
    setLoading(false);
  }, [query?.status, query?.limit, query?.offset]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const acceptJob = async (bookingId: string) => {
    const { data, error } = await fetchWithAuth<Booking>(`/vendor/jobs/requests/${bookingId}/accept`, {
      method: "POST",
    });
    if (data) {
      // Remove from requests list
      setRequests((prev) => prev.filter((r) => r.id !== bookingId));
    }
    return { data, error };
  };

  const declineJob = async (bookingId: string, reason?: string) => {
    const { data, error } = await fetchWithAuth(`/vendor/jobs/requests/${bookingId}/decline`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
    if (!error) {
      setRequests((prev) => prev.filter((r) => r.id !== bookingId));
    }
    return { data, error };
  };

  return { requests, pagination, loading, error, refetch: fetchRequests, acceptJob, declineJob };
}

// Hook for fetching vendor bookings
export function useVendorBookings(query?: { status?: string; limit?: number; offset?: number }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState({ total: 0, limit: 20, offset: 0, hasMore: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query?.status) params.append("status", query.status);
    if (query?.limit) params.append("limit", query.limit.toString());
    if (query?.offset) params.append("offset", query.offset.toString());

    const endpoint = `/vendor/jobs/bookings${params.toString() ? `?${params.toString()}` : ""}`;
    const { data, error } = await fetchWithAuth<{ data: Booking[]; pagination: typeof pagination }>(endpoint);

    if (data) {
      setBookings(data.data || []);
      setPagination(data.pagination || { total: 0, limit: 20, offset: 0, hasMore: false });
    }
    setError(error);
    setLoading(false);
  }, [query?.status, query?.limit, query?.offset]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, pagination, loading, error, refetch: fetchBookings };
}

// Hook for fetching vendor balance
export function useVendorBalance() {
  const [balance, setBalance] = useState<VendorBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchBalance = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchWithAuth<VendorBalance>("/vendor/transactions/balance");
    setBalance(data);
    setError(error);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const withdraw = async (amount: number, payoutMethodId: string) => {
    const { data, error } = await fetchWithAuth("/vendor/transactions/withdraw", {
      method: "POST",
      body: JSON.stringify({ amount, payoutMethodId }),
    });
    if (!error) {
      fetchBalance(); // Refresh balance after withdrawal
    }
    return { data, error };
  };

  return { balance, loading, error, refetch: fetchBalance, withdraw };
}

// Hook for fetching transactions
export function useVendorTransactions(query?: { status?: string; limit?: number; offset?: number }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState({ total: 0, limit: 20, offset: 0, hasMore: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query?.status) params.append("status", query.status);
    if (query?.limit) params.append("limit", query.limit.toString());
    if (query?.offset) params.append("offset", query.offset.toString());

    const endpoint = `/vendor/transactions${params.toString() ? `?${params.toString()}` : ""}`;
    const { data, error } = await fetchWithAuth<{ data: Transaction[]; pagination: typeof pagination }>(endpoint);

    if (data) {
      setTransactions(data.data || []);
      setPagination(data.pagination || { total: 0, limit: 20, offset: 0, hasMore: false });
    }
    setError(error);
    setLoading(false);
  }, [query?.status, query?.limit, query?.offset]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, pagination, loading, error, refetch: fetchTransactions };
}

// Hook for fetching vendor services
export function useVendorServices() {
  const [services, setServices] = useState<VendorService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchWithAuth<VendorService[]>("/vendor/services");
    setServices(data || []);
    setError(error);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, loading, error, refetch: fetchServices };
}

// Hook for fetching vendor reviews
export function useVendorReviews(vendorId: string | undefined, page = 1, limit = 10) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState({ averageRating: 0, totalReviews: 0, ratingBreakdown: {} });
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchReviews = useCallback(async () => {
    if (!vendorId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    // Reviews endpoint is public, no auth needed
    try {
      const response = await fetch(
        `${API_BASE_URL}/reviews/vendor/${vendorId}?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        setError({ status: response.status, message: "Failed to fetch reviews" });
      } else {
        const data = await response.json();
        setReviews(data.reviews || []);
        setSummary(data.summary || { averageRating: 0, totalReviews: 0, ratingBreakdown: {} });
        setPagination(data.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 });
      }
    } catch (err) {
      setError({ status: 500, message: "Network error" });
    }
    setLoading(false);
  }, [vendorId, page, limit]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { reviews, summary, pagination, loading, error, refetch: fetchReviews };
}

// Hook for dashboard stats (combines multiple API calls)
export function useVendorDashboardStats() {
  const [stats, setStats] = useState({
    todaysJobs: { value: 0, change: "+0%", changeLabel: "vs yesterday" },
    newRequests: { value: 0, subtitle: "0 jobs awaiting signoff" },
    monthlyEarnings: { value: "GH₵ 0", change: "+0%", changeLabel: "vs yesterday" },
    avgRating: { value: 0, subtitle: "Based on 0 reviews" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);

    // Fetch all data in parallel
    const [profileRes, requestsRes, bookingsRes, balanceRes] = await Promise.all([
      fetchWithAuth<VendorProfile>("/vendor/profile"),
      fetchWithAuth<{ data: JobRequest[]; pagination: { total: number } }>("/vendor/jobs/requests"),
      fetchWithAuth<{ data: Booking[]; pagination: { total: number } }>("/vendor/jobs/bookings?status=IN_PROGRESS"),
      fetchWithAuth<VendorBalance>("/vendor/transactions/balance"),
    ]);

    if (profileRes.error || requestsRes.error || bookingsRes.error || balanceRes.error) {
      setError(profileRes.error || requestsRes.error || bookingsRes.error || balanceRes.error);
    }

    const profile = profileRes.data;
    const requestsData = requestsRes.data;
    const bookingsData = bookingsRes.data;
    const balanceData = balanceRes.data;

    // Calculate today's jobs (in progress + completed today)
    const todaysJobsCount = bookingsData?.data?.length || 0;

    // New requests count
    const newRequestsCount = requestsData?.pagination?.total || 0;

    // Monthly earnings from balance
    const totalEarnings = balanceData?.totalEarnings || 0;

    // Rating from profile
    const avgRating = Number(profile?.overallRating) || 0;
    const totalReviews = profile?.totalReviews || 0;

    setStats({
      todaysJobs: {
        value: todaysJobsCount,
        change: "+12.4%",
        changeLabel: "vs yesterday",
      },
      newRequests: {
        value: newRequestsCount,
        subtitle: `${bookingsData?.pagination?.total || 0} active bookings`,
      },
      monthlyEarnings: {
        value: `GH₵ ${totalEarnings.toLocaleString()}`,
        change: "+12.4%",
        changeLabel: "vs last month",
      },
      avgRating: {
        value: avgRating,
        subtitle: `Based on ${totalReviews} reviews`,
      },
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}

// Utility function to check if user is authenticated as vendor
export function checkVendorAuth(): { isAuthenticated: boolean; error?: string } {
  if (typeof window === "undefined") {
    return { isAuthenticated: false };
  }

  const token = localStorage.getItem("kasazon_access_token");
  if (!token) {
    return { isAuthenticated: false, error: "Not authenticated" };
  }

  // Optionally check account type from stored user data
  const userData = localStorage.getItem("kasazon_user");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      if (user.accountType !== "PROFESSIONAL") {
        return { isAuthenticated: false, error: "Not a professional account" };
      }
    } catch {
      // Ignore parse errors
    }
  }

  return { isAuthenticated: true };
}

// Export the base fetch function for custom use
export { fetchWithAuth };
