"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { api, getAuthToken } from "@/src/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

// ---- Public Types ----

export interface VendorProfileData {
  id: string;
  userId: string;
  title: string | null;
  bio: string | null;
  overallRating: string;
  totalReviews: number;
  verificationStatus: string;
  availableBalance: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    avatarUrl: string | null;
  };
}

export interface VendorStatsData {
  todayJobsCount?: number;
  pendingRequestsCount?: number;
  totalEarnings?: number;
  monthlyEarnings?: number;
  completedJobsCount?: number;
  cancelledJobsCount?: number;
}

export interface VendorBookingItem {
  id: string;
  bookingCode: string;
  status: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number;
  totalAmount: string | number;
  startedAt?: string;
  completedAt?: string;
  customer: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    phoneNumber?: string;
  };
  service: {
    id: string;
    name: string;
    basePrice: number;
  };
  address: {
    id: string;
    label: string;
    streetAddress: string;
    city: string;
    region: string;
  };
  checklist?: Array<{ id: string; name: string; isCompleted: boolean }>;
}

export interface VendorBalanceData {
  available: number;
  pending: number;
  totalEarnings: number;
  totalWithdrawn: number;
}

export interface DashboardStatsDisplay {
  todaysJobs: { value: number; change: string; changeLabel: string };
  newRequests: { value: number; subtitle: string };
  monthlyEarnings: { value: string; change: string; changeLabel: string };
  avgRating: { value: number; subtitle: string };
}

export interface ActiveJobDisplay {
  id: number;
  service: string;
  price: string;
  customer: string;
  startTime: string;
  progress: number;
  currentDay: number;
  totalDays: number;
  bookingId: string;
}

export interface NewRequestDisplay {
  id: string;
  service: string;
  price: string;
  customer: string;
  avatar: string;
  distance: string;
  time: string;
  bookingId: string;
}

export interface DashboardError {
  message: string;
  status?: number;
}

// ---- Bookings response shapes (/bookings endpoint may return different shapes) ----

type BookingsListResponse =
  | VendorBookingItem[]
  | { items: VendorBookingItem[]; total: number }
  | { data: VendorBookingItem[]; pagination: { total: number; limit: number; offset: number } };

function extractBookings(data: BookingsListResponse): { items: VendorBookingItem[]; total: number } {
  if (Array.isArray(data)) {
    return { items: data, total: data.length };
  }
  if ("items" in data) {
    return { items: data.items, total: data.total };
  }
  return { items: data.data, total: data.pagination.total };
}

// ---- Internal fetch helper (uses api singleton for auth token) ----

async function vendorFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // api.getToken() returns in-memory token set via api.setToken();
  // fall back to localStorage via getAuthToken() (same key as api.ts uses internally)
  const token = api.getToken() ?? getAuthToken();

  if (!token) {
    const err: DashboardError = { message: "Not authenticated", status: 401 };
    throw err;
  }

  const extraHeaders = options.headers ? (options.headers as Record<string, string>) : {};

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...extraHeaders,
    },
  });

  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("kasazon_access_token");
      window.location.href = "/login";
    }
    const body = await res.json().catch(() => ({ message: `Request failed with status ${res.status}` }));
    const err: DashboardError = {
      message: (body as { message?: string }).message ?? `Request failed`,
      status: res.status,
    };
    throw err;
  }

  return res.json() as Promise<T>;
}

// ---- Sub-hooks ----

/** Fetches GET /vendor/profile — vendor profile + user info + rating */
export function useVendorDashboardProfile() {
  const [profile, setProfile] = useState<VendorProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<DashboardError | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await vendorFetch<VendorProfileData>("/vendor/profile");
      setProfile(data);
    } catch (err) {
      setError(err as DashboardError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { profile, loading, error, refetch };
}

/** Fetches GET /vendor/stats — performance stats (earnings, job counts) */
export function useVendorStatsFetch() {
  const [stats, setStats] = useState<VendorStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<DashboardError | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await vendorFetch<VendorStatsData>("/vendor/stats");
      setStats(data);
    } catch (err) {
      setError(err as DashboardError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { stats, loading, error, refetch };
}

/** Fetches GET /bookings?role=vendor&status=IN_PROGRESS — active jobs for this vendor */
export function useVendorActiveJobsFetch(limit = 2) {
  const [jobs, setJobs] = useState<VendorBookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<DashboardError | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ role: "vendor", status: "IN_PROGRESS", limit: String(limit) });
      const data = await vendorFetch<BookingsListResponse>(`/bookings?${params.toString()}`);
      const { items } = extractBookings(data);
      setJobs(items);
    } catch (err) {
      setError(err as DashboardError);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { jobs, loading, error, refetch };
}

/** Fetches GET /bookings?role=vendor&status=PENDING — new/pending job requests */
export function useVendorPendingRequestsFetch(limit = 3) {
  const [requests, setRequests] = useState<VendorBookingItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<DashboardError | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ role: "vendor", status: "PENDING", limit: String(limit) });
      const data = await vendorFetch<BookingsListResponse>(`/bookings?${params.toString()}`);
      const { items, total: t } = extractBookings(data);
      setRequests(items);
      setTotal(t);
    } catch (err) {
      setError(err as DashboardError);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const acceptJob = useCallback(
    async (bookingId: string): Promise<{ error: DashboardError | null }> => {
      try {
        await vendorFetch<unknown>(`/vendor/jobs/requests/${bookingId}/accept`, { method: "POST" });
        setRequests((prev) => prev.filter((r) => r.id !== bookingId));
        setTotal((prev) => Math.max(0, prev - 1));
        return { error: null };
      } catch (err) {
        return { error: err as DashboardError };
      }
    },
    []
  );

  const declineJob = useCallback(
    async (bookingId: string, reason?: string): Promise<{ error: DashboardError | null }> => {
      try {
        await vendorFetch<unknown>(`/vendor/jobs/requests/${bookingId}/decline`, {
          method: "POST",
          body: JSON.stringify({ reason }),
        });
        setRequests((prev) => prev.filter((r) => r.id !== bookingId));
        setTotal((prev) => Math.max(0, prev - 1));
        return { error: null };
      } catch (err) {
        return { error: err as DashboardError };
      }
    },
    []
  );

  return { requests, total, loading, error, refetch, acceptJob, declineJob };
}

/** Fetches GET /vendor/balance — available balance */
export function useVendorBalanceFetch() {
  const [balance, setBalance] = useState<VendorBalanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<DashboardError | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await vendorFetch<VendorBalanceData>("/vendor/balance");
      setBalance(data);
    } catch (err) {
      setError(err as DashboardError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { balance, loading, error, refetch };
}

// ---- Combined dashboard hook ----

/**
 * useVendorDashboard — single hook for the vendor dashboard page.
 *
 * Fetches all required data in parallel and returns pre-transformed display
 * objects so the page only needs to wire props to components.
 *
 * Data sources:
 *   - GET /vendor/profile     → profile, name, avatar, rating
 *   - GET /vendor/stats       → today's job count, earnings
 *   - GET /vendor/balance     → total/monthly earnings
 *   - GET /bookings?role=vendor&status=IN_PROGRESS  → active jobs
 *   - GET /bookings?role=vendor&status=PENDING      → new requests
 */
export function useVendorDashboard() {
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useVendorDashboardProfile();

  const {
    stats: rawStats,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useVendorStatsFetch();

  const {
    jobs,
    loading: jobsLoading,
    error: jobsError,
    refetch: refetchJobs,
  } = useVendorActiveJobsFetch(2);

  const {
    requests,
    total: pendingTotal,
    loading: requestsLoading,
    error: requestsError,
    refetch: refetchRequests,
    acceptJob,
    declineJob,
  } = useVendorPendingRequestsFetch(3);

  const {
    balance,
    loading: balanceLoading,
    error: balanceError,
    refetch: refetchBalance,
  } = useVendorBalanceFetch();

  // Transform active jobs to ActiveJobs component format
  const activeJobs = useMemo<ActiveJobDisplay[]>(() => {
    return jobs.map((booking, index) => {
      const checklistItems = booking.checklist ?? [];
      const completedItems = checklistItems.filter((item) => item.isCompleted).length;
      const progress =
        checklistItems.length > 0
          ? Math.round((completedItems / checklistItems.length) * 100)
          : 0;

      const scheduledDate = new Date(booking.scheduledDate);
      const today = new Date();
      const daysDiff = Math.max(
        1,
        Math.ceil((today.getTime() - scheduledDate.getTime()) / (1000 * 60 * 60 * 24))
      );

      return {
        id: index + 1,
        service: booking.service?.name ?? "Service",
        price: `GH₵ ${Number(booking.totalAmount ?? 0).toFixed(2)}`,
        customer: booking.customer?.fullName ?? "Customer",
        startTime: booking.startedAt
          ? new Date(booking.startedAt).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          : booking.scheduledTime ?? "TBD",
        progress,
        currentDay: daysDiff,
        totalDays: booking.estimatedDuration ?? 1,
        bookingId: booking.id,
      };
    });
  }, [jobs]);

  // Transform pending requests to NewRequests component format
  const newRequests = useMemo<NewRequestDisplay[]>(() => {
    return requests.map((req) => ({
      id: `#${req.bookingCode}`,
      service: req.service?.name ?? "Service",
      price: `GH₵ ${Number(req.totalAmount ?? 0).toFixed(2)}`,
      customer: req.customer?.fullName ?? "Customer",
      avatar: req.customer?.avatarUrl ?? "/images/vendor/customer-avatar.png",
      distance: req.address?.city ?? "Location",
      time: req.scheduledTime ?? "TBD",
      bookingId: req.id,
    }));
  }, [requests]);

  // Build StatsCards display object
  const stats = useMemo<DashboardStatsDisplay>(() => {
    const totalEarnings = balance?.totalEarnings ?? rawStats?.totalEarnings ?? 0;
    const monthlyEarnings = rawStats?.monthlyEarnings ?? totalEarnings;
    const avgRating = Number(profile?.overallRating ?? 0);
    const totalReviews = profile?.totalReviews ?? 0;
    const todaysJobsCount = rawStats?.todayJobsCount ?? jobs.length;
    const pendingCount = rawStats?.pendingRequestsCount ?? pendingTotal;

    return {
      todaysJobs: {
        value: todaysJobsCount,
        change: "+0%",
        changeLabel: "vs yesterday",
      },
      newRequests: {
        value: pendingCount,
        subtitle: `${jobs.length} active bookings`,
      },
      monthlyEarnings: {
        value: `GH₵ ${monthlyEarnings.toLocaleString()}`,
        change: "+0%",
        changeLabel: "vs last month",
      },
      avgRating: {
        value: avgRating,
        subtitle: `Based on ${totalReviews} reviews`,
      },
    };
  }, [balance, rawStats, profile, jobs, pendingTotal]);

  const loading =
    profileLoading || statsLoading || jobsLoading || requestsLoading || balanceLoading;

  const error: DashboardError | null =
    profileError ?? statsError ?? jobsError ?? requestsError ?? balanceError ?? null;

  const refetchAll = useCallback(() => {
    refetchProfile();
    refetchStats();
    refetchJobs();
    refetchRequests();
    refetchBalance();
  }, [refetchProfile, refetchStats, refetchJobs, refetchRequests, refetchBalance]);

  return {
    // Raw profile (for VendorBanner / VendorHeader)
    profile,
    // Pre-transformed display data
    stats,
    activeJobs,
    newRequests,
    balance,
    // State
    loading,
    error,
    // Actions
    refetchAll,
    acceptJob,
    declineJob,
    refetchJobs,
    refetchStats,
  };
}
