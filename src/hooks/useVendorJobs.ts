"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchWithAuth } from "./useVendorApi";
import type { ApiError } from "./useVendorApi";

// ─── Backend response types ───────────────────────────────────────────────────

export interface VendorChecklistItem {
  id: string;
  name: string;
  description?: string;
  isCompleted: boolean;
  completedAt?: string | null;
  order?: number;
}

export interface VendorPayment {
  id: string;
  amount: string | number;
  status: string;
  type: string;
}

export interface VendorBooking {
  id: string;
  bookingCode: string;
  status: string; // "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTED"
  scheduledDate: string;
  scheduledTimeStart: string | null;
  scheduledTimeEnd: string | null;
  estimatedDuration: number | null;
  totalAmount: string | number;
  address: {
    id: string;
    label: string;
    addressLine1: string;
    city: string;
    region: string;
    digitalAddress?: string;
  };
  customer: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    phone?: string;
    totalBookings?: number;
    createdAt?: string;
  };
  service: {
    id: string;
    name: string;
    basePrice: string | number;
    category?: { name: string };
    durationMinutes?: number;
    description?: string;
    tags?: string[];
  };
  issueDescription?: string | null;
  photos?: string[];
  checklist?: VendorChecklistItem[];
  payments?: VendorPayment[];
  createdAt: string;
  updatedAt: string;
  startedAt?: string | null;
  completedAt?: string | null;
  cancellationReason?: string | null;
}

export interface VendorJobStats {
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  disputed: number;
}

export interface PaginatedBookings {
  items: VendorBooking[];
  total: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Normalise stat keys which may be UPPER_CASE or camelCase from the backend. */
function normaliseStats(raw: Record<string, number>): VendorJobStats {
  return {
    pending: raw["pending"] ?? raw["PENDING"] ?? 0,
    inProgress: raw["inProgress"] ?? raw["IN_PROGRESS"] ?? 0,
    completed: raw["completed"] ?? raw["COMPLETED"] ?? 0,
    cancelled: raw["cancelled"] ?? raw["CANCELLED"] ?? 0,
    disputed: raw["disputed"] ?? raw["DISPUTED"] ?? 0,
  };
}

/** Build initials from a full name */
export function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

/** Map backend status (uppercase) to the UI status strings the detail components use. */
export function mapStatusToDetail(
  status: string
): "in-progress" | "upcoming" | "completed" | "cancelled" {
  switch (status.toUpperCase()) {
    case "IN_PROGRESS":
      return "in-progress";
    case "COMPLETED":
      return "completed";
    case "CANCELLED":
    case "DISPUTED":
      return "cancelled";
    default:
      return "upcoming";
  }
}

/** Map backend status to the BookingCard status values. */
export function mapStatusToCardStatus(
  status: string
): "in-progress" | "upcoming" | "completed" | "cancelled" {
  return mapStatusToDetail(status);
}

/** Map backend status to the AllBookingsTable row status. */
export function mapStatusToTableStatus(
  status: string
): "upcoming" | "ongoing" | "completed" | "cancelled" {
  switch (status.toUpperCase()) {
    case "IN_PROGRESS":
      return "ongoing";
    case "COMPLETED":
      return "completed";
    case "CANCELLED":
    case "DISPUTED":
      return "cancelled";
    default:
      return "upcoming";
  }
}

/** Format duration in minutes to a human-readable string. */
function formatDuration(minutes: number | null | undefined): string {
  if (!minutes) return "TBD";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}.0 hrs`;
  return `${hours}.${Math.round((mins / 60) * 10)} hrs`;
}

/** Format a time range from two HH:MM strings. */
function formatTimeRange(start: string | null, end: string | null): string {
  if (!start) return "TBD";
  if (!end) return start;
  return `${start} - ${end} GMT`;
}

/** Format a date string to a readable label. */
function formatDateLabel(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    const formatted = d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return isToday ? `Today, ${formatted}` : formatted;
  } catch {
    return dateStr;
  }
}

/** Format a date string to "Mon DD, YYYY" style. */
function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/** Format a date string's time portion. */
function formatTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return "";
  }
}

// ─── Platform fee constant (3%) ───────────────────────────────────────────────

const PLATFORM_FEE_PERCENT = 3;

function calcPayment(totalAmount: string | number) {
  const total =
    typeof totalAmount === "string" ? parseFloat(totalAmount) : totalAmount;
  const fee = Math.round(total * (PLATFORM_FEE_PERCENT / 100) * 100) / 100;
  const service = Math.round((total - fee) * 100) / 100;
  return {
    serviceAmount: service,
    platformFee: fee,
    platformFeePercent: PLATFORM_FEE_PERCENT,
    escrowHeld: total,
    yourEarnings: service,
  };
}

// ─── Data-shape transformers ──────────────────────────────────────────────────

/**
 * Transform a VendorBooking into the shape JobRequestDetail component expects.
 */
export function toJobRequestDetailData(b: VendorBooking) {
  const payment = calcPayment(b.totalAmount);
  const initials = getInitials(b.customer.fullName);
  const memberSince = b.customer.createdAt
    ? new Date(b.customer.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";

  return {
    id: b.id,
    bookingId: `#${b.bookingCode}`,
    serviceTitle: b.service.name,
    location: `${b.address.city}${b.address.region ? ", " + b.address.region : ""}`,
    locationCode: b.address.digitalAddress ?? b.address.id,
    bookedDate: formatDate(b.createdAt),
    bookedTime: formatTime(b.createdAt),
    category: b.service.category?.name ?? b.service.name,
    serviceDetails: b.service.tags?.map((t) => t) ?? [b.service.name],
    estimatedDate: formatDateLabel(b.scheduledDate),
    estimatedTime: formatTimeRange(b.scheduledTimeStart, b.scheduledTimeEnd),
    estimatedDuration: formatDuration(
      b.estimatedDuration ?? b.service.durationMinutes
    ),
    customerIssue: b.issueDescription ?? "",
    evidencePhotos: b.photos ?? [],
    serviceAmount: payment.serviceAmount,
    platformFee: payment.platformFee,
    totalAmount: payment.serviceAmount + payment.platformFee,
    escrowHeld: payment.escrowHeld,
    customerName: b.customer.fullName,
    customerInitials: initials,
    memberSince,
    servicesBooked: b.customer.totalBookings ?? 0,
    address: [
      b.address.addressLine1,
      `${b.address.city}${b.address.region ? ", " + b.address.region : ""}`,
    ],
    ghanaPostCode: b.address.digitalAddress ?? "",
  };
}

/**
 * Transform a VendorBooking into the shape BookingDetail component expects.
 */
export function toBookingDetailData(b: VendorBooking) {
  const payment = calcPayment(b.totalAmount);
  const initials = getInitials(b.customer.fullName);
  const memberSince = b.customer.createdAt
    ? new Date(b.customer.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";

  const checklist = (b.checklist ?? []).map((item) => ({
    id: item.id,
    title: item.name,
    description: item.description ?? "",
    status: item.isCompleted
      ? ("completed" as const)
      : ("pending" as const),
  }));

  const durationMins =
    b.estimatedDuration ?? b.service.durationMinutes ?? 0;
  const type: "contract" | "one-time" = durationMins > 120 ? "contract" : "one-time";

  return {
    id: b.id,
    bookingId: b.bookingCode,
    serviceName: b.service.name,
    type,
    status: mapStatusToDetail(b.status),
    location: `${b.address.city}${b.address.region ? ", " + b.address.region : ""}`,
    locationCode: b.address.digitalAddress ?? b.address.id,
    bookedDate: `${formatDate(b.createdAt)} at ${formatTime(b.createdAt)}`,
    checklist,
    serviceCategory: b.service.category?.name ?? b.service.name,
    serviceDetails: b.service.tags?.map((t) => t) ?? [b.service.name],
    estimatedDate: formatDateLabel(b.scheduledDate),
    estimatedTime: formatTimeRange(b.scheduledTimeStart, b.scheduledTimeEnd),
    estimatedDuration: formatDuration(durationMins),
    customerIssue: b.issueDescription ? `"${b.issueDescription}"` : "",
    evidencePhotos: b.photos ?? [],
    payment,
    customer: {
      name: b.customer.fullName,
      initials,
      memberSince,
      servicesBooked: b.customer.totalBookings ?? 0,
      address: [
        b.address.addressLine1,
        `${b.address.city}${b.address.region ? ", " + b.address.region : ""}`,
      ],
      postalCode: b.address.digitalAddress ?? "",
      isVerified: true,
    },
  };
}

/**
 * Transform a VendorBooking into the shape JobAcceptedModal job prop expects.
 */
export function toJobAcceptedData(b: VendorBooking) {
  const scheduledTime = b.scheduledTimeStart
    ? `${formatDateLabel(b.scheduledDate)} · ${b.scheduledTimeStart}`
    : formatDateLabel(b.scheduledDate);

  return {
    serviceTitle: b.service.name,
    customerName: b.customer.fullName,
    dateTime: scheduledTime,
    location: `${b.address.addressLine1}, ${b.address.city}`,
    price:
      typeof b.totalAmount === "string"
        ? parseFloat(b.totalAmount)
        : b.totalAmount,
  };
}

// ─── useJobRequests ───────────────────────────────────────────────────────────

/**
 * Fetch vendor job requests (PENDING bookings).
 * Endpoint: GET /bookings?role=vendor&status=PENDING
 */
export function useJobRequests(query?: { limit?: number; offset?: number }) {
  const [requests, setRequests] = useState<VendorBooking[]>([]);
  const [pagination, setPagination] = useState({ total: 0, limit: 20, offset: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ role: "vendor", status: "PENDING" });
    if (query?.limit) params.set("limit", query.limit.toString());
    if (query?.offset) params.set("offset", query.offset.toString());

    const { data, error: fetchError } = await fetchWithAuth<PaginatedBookings>(
      `/bookings?${params.toString()}`
    );

    if (data) {
      setRequests(data.items ?? []);
      setPagination((prev) => ({ ...prev, total: data.total ?? 0 }));
    }
    setError(fetchError);
    setLoading(false);
  }, [query?.limit, query?.offset]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const acceptJob = useCallback(async (bookingId: string) => {
    const result = await fetchWithAuth<VendorBooking>(
      `/vendor/jobs/requests/${bookingId}/accept`,
      { method: "POST" }
    );
    if (!result.error) {
      setRequests((prev) => prev.filter((r) => r.id !== bookingId));
    }
    return result;
  }, []);

  const declineJob = useCallback(async (bookingId: string, reason?: string) => {
    const result = await fetchWithAuth(
      `/vendor/jobs/requests/${bookingId}/decline`,
      { method: "POST", body: JSON.stringify({ reason: reason ?? "" }) }
    );
    if (!result.error) {
      setRequests((prev) => prev.filter((r) => r.id !== bookingId));
    }
    return result;
  }, []);

  return {
    requests,
    pagination,
    loading,
    error,
    refetch: fetchRequests,
    acceptJob,
    declineJob,
  };
}

// ─── useAllBookings ───────────────────────────────────────────────────────────

/**
 * Fetch all vendor bookings, optionally filtered by status.
 * Endpoint: GET /bookings?role=vendor[&status=X]
 */
export function useAllBookings(query?: {
  status?: string;
  limit?: number;
  offset?: number;
}) {
  const [bookings, setBookings] = useState<VendorBooking[]>([]);
  const [pagination, setPagination] = useState({ total: 0, limit: 20, offset: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ role: "vendor" });
    if (query?.status) params.set("status", query.status);
    if (query?.limit) params.set("limit", query.limit.toString());
    if (query?.offset) params.set("offset", query.offset.toString());

    const { data, error: fetchError } = await fetchWithAuth<PaginatedBookings>(
      `/bookings?${params.toString()}`
    );

    if (data) {
      setBookings(data.items ?? []);
      setPagination((prev) => ({ ...prev, total: data.total ?? 0 }));
    }
    setError(fetchError);
    setLoading(false);
  }, [query?.status, query?.limit, query?.offset]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, pagination, loading, error, refetch: fetchBookings };
}

// ─── useBookingDetail ─────────────────────────────────────────────────────────

/**
 * Fetch a single booking by ID.
 * Endpoint: GET /bookings/:id
 */
export function useBookingDetail(id: string | null) {
  const [booking, setBooking] = useState<VendorBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchBooking = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: fetchError } = await fetchWithAuth<VendorBooking>(
      `/bookings/${id}`
    );
    setBooking(data);
    setError(fetchError);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  /**
   * Mark job as complete and confirm with the customer's OTP.
   * Endpoint: POST /bookings/:id/release-payment
   */
  const releasePayment = useCallback(
    async (otp?: string) => {
      if (!id) return { data: null, error: { status: 400, message: "No booking ID" } };
      return fetchWithAuth(`/bookings/${id}/release-payment`, {
        method: "POST",
        body: JSON.stringify(otp ? { otp } : {}),
      });
    },
    [id]
  );

  /**
   * Cancel this booking.
   * Endpoint: POST /bookings/:id/cancel
   */
  const cancelBooking = useCallback(
    async (reason: string) => {
      if (!id) return { data: null, error: { status: 400, message: "No booking ID" } };
      return fetchWithAuth(`/bookings/${id}/cancel`, {
        method: "POST",
        body: JSON.stringify({ reason }),
      });
    },
    [id]
  );

  /**
   * Accept a job request.
   * Endpoint: POST /vendor/jobs/requests/:id/accept
   */
  const acceptJob = useCallback(async () => {
    if (!id) return { data: null, error: { status: 400, message: "No booking ID" } };
    const result = await fetchWithAuth<VendorBooking>(
      `/vendor/jobs/requests/${id}/accept`,
      { method: "POST" }
    );
    if (result.data) setBooking(result.data);
    return result;
  }, [id]);

  /**
   * Decline a job request.
   * Endpoint: POST /vendor/jobs/requests/:id/decline
   */
  const declineJob = useCallback(
    async (reason?: string) => {
      if (!id) return { data: null, error: { status: 400, message: "No booking ID" } };
      return fetchWithAuth(`/vendor/jobs/requests/${id}/decline`, {
        method: "POST",
        body: JSON.stringify({ reason: reason ?? "" }),
      });
    },
    [id]
  );

  return {
    booking,
    loading,
    error,
    refetch: fetchBooking,
    releasePayment,
    cancelBooking,
    acceptJob,
    declineJob,
  };
}

// ─── useVendorStats ───────────────────────────────────────────────────────────

/**
 * Fetch vendor job statistics.
 * Endpoint: GET /vendor/performance/stats
 */
export function useVendorStats() {
  const [stats, setStats] = useState<VendorJobStats>({
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
    disputed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await fetchWithAuth<
      Record<string, number>
    >("/vendor/performance/stats");
    if (data) {
      setStats(normaliseStats(data));
    }
    setError(fetchError);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
