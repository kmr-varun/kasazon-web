"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchWithAuth, type ApiError } from "./useVendorApi";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface VendorQuotationListItem {
  id: string;
  status: string;
  amount: number;
  currency?: string;
  validUntil?: string;
  createdAt: string;
  serviceName?: string;
  customerName?: string;
}

export interface QuotationLineItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreateQuotationPayload {
  serviceId?: string;
  customerId?: string;
  bookingId?: string;
  items: QuotationLineItem[];
  notes?: string;
  validUntil?: string;
  // Extended vendor-specific fields
  scopeOfWork?: Array<{ name: string; price: number; quantity: string; rate: number }>;
  materials?: Array<{ name: string; price: number; description: string }>;
  additionalWork?: Array<{ name: string; price: number }>;
  duration?: string;
  preferredStart?: string;
  expectedCompletion?: string;
  warrantyPeriod?: string;
  quotationValidFor?: string;
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

export function useVendorQuotationsList() {
  const [quotations, setQuotations] = useState<VendorQuotationListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchQuotations = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchWithAuth<
      VendorQuotationListItem[] | { items: VendorQuotationListItem[]; total: number }
    >("/vendor/quotations");

    if (data) {
      const list: VendorQuotationListItem[] = Array.isArray(data)
        ? data
        : (data as { items: VendorQuotationListItem[] }).items ?? [];
      const rawTotal: number = Array.isArray(data)
        ? list.length
        : (data as { total: number }).total ?? list.length;
      setQuotations(list);
      setTotal(rawTotal);
    }
    setError(error);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  return { quotations, total, loading, error, refetch: fetchQuotations };
}

export function useVendorQuotationActions() {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessages = () => {
    setSubmitError(null);
    setSuccessMessage(null);
  };

  const createQuotation = async (
    payload: CreateQuotationPayload
  ): Promise<{ id: string } | null> => {
    setSubmitting(true);
    clearMessages();
    const { data, error } = await fetchWithAuth<{ id: string }>(
      "/vendor/quotations",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    setSubmitting(false);
    if (error) {
      setSubmitError(error.message);
      return null;
    }
    return data;
  };

  const updateQuotation = async (
    id: string,
    payload: Partial<CreateQuotationPayload>
  ) => {
    setSubmitting(true);
    clearMessages();
    const result = await fetchWithAuth<{ id: string }>(
      `/vendor/quotations/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      }
    );
    setSubmitting(false);
    if (result.error) {
      setSubmitError(result.error.message);
    }
    return result;
  };

  const sendQuotation = async (id: string) => {
    setSubmitting(true);
    clearMessages();
    const result = await fetchWithAuth<void>(
      `/vendor/quotations/${id}/send`,
      { method: "POST" }
    );
    setSubmitting(false);
    if (result.error) {
      setSubmitError(result.error.message);
    } else {
      setSuccessMessage("Quotation sent successfully.");
    }
    return result;
  };

  const deleteQuotation = async (id: string) => {
    setSubmitting(true);
    clearMessages();
    const result = await fetchWithAuth<void>(
      `/vendor/quotations/${id}`,
      { method: "DELETE" }
    );
    setSubmitting(false);
    if (result.error) {
      setSubmitError(result.error.message);
    }
    return result;
  };

  /**
   * Convenience: create then send in one call.
   * Returns true on full success.
   */
  const createAndSend = async (
    payload: CreateQuotationPayload
  ): Promise<boolean> => {
    const created = await createQuotation(payload);
    if (!created) return false;
    const { error } = await sendQuotation(created.id);
    return !error;
  };

  return {
    submitting,
    submitError,
    successMessage,
    clearMessages,
    createQuotation,
    updateQuotation,
    sendQuotation,
    deleteQuotation,
    createAndSend,
  };
}
