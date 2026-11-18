"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchWithAuth, type ApiError } from "./useVendorApi";

// ─── Balance ────────────────────────────────────────────────────────────────

export interface VendorFinanceBalance {
  availableBalance: number;
  pendingBalance: number;
  totalEarnings: number;
}

export function useVendorFinanceBalance() {
  const [balance, setBalance] = useState<VendorFinanceBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchBalance = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchWithAuth<VendorFinanceBalance>("/vendor/transactions/balance");
    setBalance(data);
    setError(error);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const withdraw = async (amount: number, payoutMethodId: string) => {
    const result = await fetchWithAuth<{ message: string }>("/vendor/transactions/withdraw", {
      method: "POST",
      body: JSON.stringify({ amount, payoutMethodId }),
    });
    if (!result.error) {
      fetchBalance();
    }
    return result;
  };

  return { balance, loading, error, refetch: fetchBalance, withdraw };
}

// ─── Payout Methods ─────────────────────────────────────────────────────────

export interface PayoutMethod {
  id: string;
  type: string;
  provider?: string | null;
  accountNumber?: string | null;
  accountName?: string | null;
  maskedPhone?: string | null;
  lastFour?: string | null;
  isDefault?: boolean;
  displayName?: string | null;
}

export function usePayoutMethods() {
  const [methods, setMethods] = useState<PayoutMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchMethods = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchWithAuth<PayoutMethod[]>("/vendor/payout-methods");
    setMethods(data || []);
    setError(error);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMethods();
  }, [fetchMethods]);

  const addMethod = async (methodData: Omit<PayoutMethod, "id">) => {
    const result = await fetchWithAuth<PayoutMethod>("/vendor/payout-methods", {
      method: "POST",
      body: JSON.stringify(methodData),
    });
    if (!result.error) {
      fetchMethods();
    }
    return result;
  };

  return { methods, loading, error, refetch: fetchMethods, addMethod };
}

// ─── Transactions ───────────────────────────────────────────────────────────

export interface VendorFinanceTransaction {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  booking?: {
    bookingCode: string;
    customer: { fullName: string; avatarUrl: string | null };
    service: { name: string };
    scheduledDate: string;
    scheduledTime: string;
  };
}

export function useVendorFinanceTransactions(query?: {
  limit?: number;
  offset?: number;
}) {
  const [transactions, setTransactions] = useState<VendorFinanceTransaction[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query?.limit != null) params.append("limit", query.limit.toString());
    if (query?.offset != null) params.append("offset", query.offset.toString());

    const qs = params.toString();
    const { data, error } = await fetchWithAuth<{
      items: VendorFinanceTransaction[];
      total: number;
    }>(`/vendor/transactions${qs ? `?${qs}` : ""}`);

    if (data) {
      setTransactions(data.items || []);
      setTotal(data.total ?? 0);
    }
    setError(error);
    setLoading(false);
  }, [query?.limit, query?.offset]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, total, loading, error, refetch: fetchTransactions };
}
