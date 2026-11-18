"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchWithAuth, type ApiError } from "./useVendorApi";
import type { Dispute as ComponentDispute, DisputeStatus as ComponentDisputeStatus } from "@/src/components/vendor/DisputesTable";
import type { DisputeDetailData } from "@/src/components/vendor/DisputeDetail";

// ─── Raw API types ───────────────────────────────────────────────────────────

interface ApiDispute {
  id: string;
  bookingId: string;
  serviceName?: string;
  status: string; // OPEN | UNDER_REVIEW | RESOLVED | CLOSED
  reason?: string;
  description?: string;
  createdAt: string;
  resolvedAt?: string | null;
  // May be populated by backend
  booking?: {
    id: string;
    totalAmount?: number;
    scheduledDate?: string;
    scheduledTimeStart?: string;
    address?: {
      addressLine1?: string;
      addressLine2?: string;
      city?: string;
      postalCode?: string;
    };
    customer?: {
      fullName?: string;
      avatarUrl?: string | null;
      createdAt?: string;
      bookingsCount?: number;
      phone?: string;
      phoneVerified?: boolean;
      emailVerified?: boolean;
    };
    service?: {
      name?: string;
      includes?: string[];
    };
  };
  evidence?: Array<{
    id: string;
    type: string;
    url: string;
    description?: string | null;
    uploadedAt?: string;
  }>;
  messages?: Array<{
    id: string;
    senderId: string;
    senderName: string;
    senderType: string;
    content: string;
    createdAt: string;
  }>;
  resolution?: string | null;
  refundAmount?: number | null;
  reworkDescription?: string | null;
}

// ─── Status mapping ──────────────────────────────────────────────────────────

function mapApiStatusToComponent(apiStatus: string): ComponentDisputeStatus {
  switch (apiStatus?.toUpperCase()) {
    case "OPEN":
      return "disputed";
    case "UNDER_REVIEW":
      return "rework-in-progress";
    case "RESOLVED":
      return "rework-completed";
    case "CLOSED":
      return "rework-completed";
    default:
      return "disputed";
  }
}

function mapApiStatusToDetail(
  apiStatus: string
): DisputeDetailData["status"] {
  switch (apiStatus?.toUpperCase()) {
    case "OPEN":
      return "disputed";
    case "UNDER_REVIEW":
      return "rework-in-progress";
    case "RESOLVED":
      return "rework-completed";
    case "CLOSED":
      return "rework-completed";
    default:
      return "disputed";
  }
}

// ─── Transform helpers ───────────────────────────────────────────────────────

function transformDisputeListItem(raw: ApiDispute): ComponentDispute {
  const createdAt = new Date(raw.createdAt);
  return {
    id: raw.id,
    bookingId: raw.bookingId,
    customerName: raw.booking?.customer?.fullName || "Customer",
    customerAvatar: raw.booking?.customer?.avatarUrl || undefined,
    distance: "",
    amount: raw.booking?.totalAmount ?? 0,
    serviceCategory: "one-time",
    serviceDescription: raw.serviceName || raw.booking?.service?.name || "Service",
    status: mapApiStatusToComponent(raw.status),
    createdDate: createdAt.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    createdTime: createdAt.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

function transformDisputeDetail(raw: ApiDispute): DisputeDetailData {
  const booking = raw.booking;
  const customer = booking?.customer;
  const address = booking?.address;

  const scheduledDate = booking?.scheduledDate
    ? new Date(booking.scheduledDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const memberSince = customer?.createdAt
    ? new Date(customer.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";

  const customerName = customer?.fullName || "Customer";
  const initials = customerName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const imageEvidence =
    raw.evidence?.filter((e) => e.type === "IMAGE").map((e) => e.url) ?? [];

  const serviceAmount = booking?.totalAmount ?? 0;
  const platformFeePercent = 3;
  const platformFee = Math.round(serviceAmount * platformFeePercent) / 100;

  return {
    id: raw.id,
    bookingId: raw.bookingId,
    serviceName: raw.serviceName || booking?.service?.name || "Service",
    serviceCategory: "one-time",
    status: mapApiStatusToDetail(raw.status),
    location: [address?.addressLine1, address?.city].filter(Boolean).join(", "),
    postalCode: address?.postalCode || "",
    bookedDate: scheduledDate,
    bookedTime: booking?.scheduledTimeStart || "",
    customerComplaint: raw.description || "",
    requestedRework: raw.reworkDescription || raw.resolution || "",
    vendorResponse: "",
    afterImages: imageEvidence,
    categoryType: raw.serviceName || booking?.service?.name || "Service",
    serviceDetails: booking?.service?.includes || [],
    estimatedDate: scheduledDate,
    estimatedTime: booking?.scheduledTimeStart || "",
    estimatedDuration: "",
    customerIssue: raw.description || "",
    evidencePhotos: imageEvidence,
    serviceAmount,
    platformFee,
    platformFeePercent,
    escrowHeld: serviceAmount,
    yourEarnings: serviceAmount - platformFee,
    customerName,
    customerInitials: initials,
    memberSince,
    servicesBooked: customer?.bookingsCount ?? 0,
    customerAddress: {
      line1: address?.addressLine1 || "",
      line2: [address?.addressLine2, address?.city].filter(Boolean).join(", "),
      postalCode: address?.postalCode || "",
    },
    isVerifiedUser: !!(customer?.phoneVerified || customer?.emailVerified),
  };
}

// ─── Dispute stats computed from list ───────────────────────────────────────

export interface DisputeStats {
  reworkRequested: number;
  totalDisputes: number;
  reworkCompleted: number;
}

function computeStats(disputes: ComponentDispute[]): DisputeStats {
  return {
    reworkRequested: disputes.filter(
      (d) => d.status === "disputed" || d.status === "rework-in-progress"
    ).length,
    totalDisputes: disputes.length,
    reworkCompleted: disputes.filter((d) => d.status === "rework-completed").length,
  };
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

export function useVendorDisputeList() {
  const [disputes, setDisputes] = useState<ComponentDispute[]>([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<DisputeStats>({
    reworkRequested: 0,
    totalDisputes: 0,
    reworkCompleted: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchDisputes = useCallback(async () => {
    setLoading(true);
    // Backend may return array or { items, total }
    const { data, error } = await fetchWithAuth<
      ApiDispute[] | { items: ApiDispute[]; total: number }
    >("/disputes");

    // /disputes is CUSTOMER-only; professionals get 403 — treat as empty list
    if (error && error.status === 403) {
      setDisputes([]);
      setTotal(0);
      setStats({ reworkRequested: 0, totalDisputes: 0, reworkCompleted: 0 });
      setError(null);
      setLoading(false);
      return;
    }

    if (data) {
      const rawList: ApiDispute[] = Array.isArray(data)
        ? data
        : (data as { items: ApiDispute[]; total: number }).items ?? [];
      const rawTotal: number = Array.isArray(data)
        ? rawList.length
        : (data as { items: ApiDispute[]; total: number }).total ?? rawList.length;

      const mapped = rawList.map(transformDisputeListItem);
      setDisputes(mapped);
      setTotal(rawTotal);
      setStats(computeStats(mapped));
    }
    setError(error);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDisputes();
  }, [fetchDisputes]);

  return { disputes, total, stats, loading, error, refetch: fetchDisputes };
}

export function useVendorDisputeDetail(id: string) {
  const [dispute, setDispute] = useState<DisputeDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchDispute = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data, error } = await fetchWithAuth<ApiDispute>(`/disputes/${id}`);
    setDispute(data ? transformDisputeDetail(data) : null);
    setError(error);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchDispute();
  }, [fetchDispute]);

  const sendMessage = async (content: string) => {
    return fetchWithAuth<void>(`/disputes/${id}/messages`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  };

  const addEvidence = async (evidenceData: {
    type: string;
    url: string;
    description?: string;
  }) => {
    const result = await fetchWithAuth<void>(`/disputes/${id}/evidence`, {
      method: "POST",
      body: JSON.stringify(evidenceData),
    });
    if (!result.error) {
      fetchDispute();
    }
    return result;
  };

  return {
    dispute,
    loading,
    error,
    refetch: fetchDispute,
    sendMessage,
    addEvidence,
  };
}
