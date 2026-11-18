"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchWithAuth,
  type VendorProfile,
  type VendorService,
  type VendorAvailability,
} from "./useVendorApi";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

// ==============================
// Shared types
// ==============================

export interface UpdateProfileData {
  title?: string;
  bio?: string;
  dateOfBirth?: string;
  gender?: string;
  experienceYears?: number;
  guarantorName?: string;
  guarantorRelationship?: string;
  guarantorPhone?: string;
  guarantorOccupation?: string;
  guarantorIdNumber?: string;
}

export interface UpdateServiceData {
  customPrice?: number;
  isAvailable?: boolean;
}

export interface AvailabilitySlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

// Re-export upstream types so callers only need one import
export type { VendorProfile, VendorService, VendorAvailability };

// ==============================
// Profile
// ==============================

/** Fetch vendor profile — wraps GET /vendor/profile */
export function useProfile() {
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchWithAuth<VendorProfile>("/vendor/profile");
    setProfile(data);
    setError(error?.message ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { profile, loading, error, refetch };
}

/** PATCH /vendor/profile */
export function useUpdateProfile() {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const update = useCallback(async (data: UpdateProfileData): Promise<boolean> => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    // Strip undefined / empty-string values
    const payload: Record<string, unknown> = {};
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== "") payload[k] = v;
    });

    const { error } = await fetchWithAuth<VendorProfile>("/vendor/profile", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (error) {
      setSaveError(error.message);
      return false;
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    return true;
  }, []);

  return { update, saving, saveError, saveSuccess };
}

/** POST /vendor/avatar — multipart form upload */
export function useUploadAvatar() {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const upload = useCallback(async (file: File): Promise<boolean> => {
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("kasazon_access_token")
        : null;

    if (!token) {
      setUploadError("Not authenticated");
      setUploading(false);
      return false;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE_URL}/vendor/avatar`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || "Failed to upload avatar");
      }

      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
      setUploading(false);
      return true;
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
      setUploading(false);
      return false;
    }
  }, []);

  return { upload, uploading, uploadError, uploadSuccess };
}

// ==============================
// Services
// ==============================

/** GET /vendor/services */
export function useVendorServicesList() {
  const [services, setServices] = useState<VendorService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchWithAuth<VendorService[]>("/vendor/services");
    setServices(data ?? []);
    setError(error?.message ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { services, loading, error, refetch };
}

/** POST /vendor/services */
export function useAddVendorService() {
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const addService = useCallback(
    async (serviceId: string, customPrice?: number): Promise<boolean> => {
      setAdding(true);
      setAddError(null);
      const body: Record<string, unknown> = { serviceId };
      if (customPrice !== undefined) body.customPrice = customPrice;
      const { error } = await fetchWithAuth<VendorService>("/vendor/services", {
        method: "POST",
        body: JSON.stringify(body),
      });
      setAdding(false);
      if (error) {
        setAddError(error.message);
        return false;
      }
      return true;
    },
    []
  );

  return { addService, adding, addError };
}

/** PATCH /vendor/services/:id */
export function useUpdateVendorService() {
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateService = useCallback(
    async (id: string, data: UpdateServiceData): Promise<boolean> => {
      setUpdating(true);
      setUpdateError(null);
      const { error } = await fetchWithAuth<VendorService>(
        `/vendor/services/${id}`,
        { method: "PATCH", body: JSON.stringify(data) }
      );
      setUpdating(false);
      if (error) {
        setUpdateError(error.message);
        return false;
      }
      return true;
    },
    []
  );

  return { updateService, updating, updateError };
}

/** DELETE /vendor/services/:id */
export function useRemoveVendorService() {
  const [removing, setRemoving] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);

  const removeService = useCallback(async (id: string): Promise<boolean> => {
    setRemoving(true);
    setRemoveError(null);
    const { error } = await fetchWithAuth<void>(`/vendor/services/${id}`, {
      method: "DELETE",
    });
    setRemoving(false);
    if (error) {
      setRemoveError(error.message);
      return false;
    }
    return true;
  }, []);

  return { removeService, removing, removeError };
}

// ==============================
// Availability
// ==============================

/** GET /vendor/availability */
export function useVendorAvailability() {
  const [availability, setAvailability] = useState<VendorAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchWithAuth<VendorAvailability[]>(
      "/vendor/availability"
    );
    setAvailability(data ?? []);
    setError(error?.message ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { availability, loading, error, refetch };
}

/** PUT /vendor/availability — replaces full schedule */
export function useUpdateVendorAvailability() {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const update = useCallback(async (slots: AvailabilitySlot[]): Promise<boolean> => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    const { error } = await fetchWithAuth<VendorAvailability[]>(
      "/vendor/availability",
      { method: "PUT", body: JSON.stringify({ availability: slots }) }
    );
    setSaving(false);
    if (error) {
      setSaveError(error.message);
      return false;
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    return true;
  }, []);

  return { update, saving, saveError, saveSuccess };
}
