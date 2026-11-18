"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  ServicesAndPricing,
  AvailabilitySchedule,
} from "@/src/components/vendor";
import {
  useVendorServicesList,
  useAddVendorService,
  useUpdateVendorService,
  useRemoveVendorService,
  useVendorAvailability,
  useUpdateVendorAvailability,
  type VendorService,
  type VendorAvailability,
} from "@/src/hooks/useVendorProfile";
import { api } from "@/src/lib/api";
import type { Service } from "@/src/components/vendor/ServicesAndPricing";
import type { DaySchedule } from "@/src/components/vendor/AvailabilitySchedule";

// ==================== Helpers ====================

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function toDayIndex(name: string): number {
  return DAY_NAMES.indexOf(name);
}

/** "14:30" → "02:30 PM" */
function fmt24to12(time: string): string {
  if (!time) return "";
  const [hStr, mStr] = time.split(":");
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
}

/** "02:30 PM" → "14:30" */
function fmt12to24(time: string): string {
  if (!time.includes(" ")) return time; // already 24-h
  const [timePart, ampm] = time.trim().split(" ");
  const [hStr, mStr] = timePart.split(":");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function transformServices(apiServices: VendorService[]): Service[] {
  return apiServices.map((vs) => ({
    id: vs.id, // vendor-service record ID (used for edit/delete)
    name: vs.service.name,
    description: vs.service.description,
    duration: "Duration varies",
    price: vs.customPrice !== null ? vs.customPrice : vs.service.basePrice,
  }));
}

function transformAvailability(slots: VendorAvailability[]): DaySchedule[] {
  return DAY_NAMES.map((day, idx) => {
    const active = slots.filter((s) => s.dayOfWeek === idx && s.isActive);
    return {
      day,
      isAvailable: active.length > 0,
      timeSlots: active.map((s) => ({
        id: s.id,
        startTime: fmt24to12(s.startTime),
        endTime: fmt24to12(s.endTime),
      })),
    };
  });
}

interface CatalogService {
  id: string;
  name: string;
  description: string;
}

// ==================== Page ====================

export default function ServicesAndAvailabilityPage() {
  // --- Services ---
  const {
    services: apiServices,
    loading: svcLoading,
    error: svcError,
    refetch: refetchServices,
  } = useVendorServicesList();
  const { addService, adding, addError } = useAddVendorService();
  const { updateService, updating } = useUpdateVendorService();
  const { removeService } = useRemoveVendorService();

  // --- Availability ---
  const {
    availability: apiAvail,
    loading: availLoading,
    refetch: refetchAvail,
  } = useVendorAvailability();
  const {
    update: saveAvailability,
    saving: savingAvail,
    saveError: availSaveError,
    saveSuccess: availSaveSuccess,
  } = useUpdateVendorAvailability();

  // --- Local availability editing state ---
  const [localAvail, setLocalAvail] = useState<VendorAvailability[]>([]);
  const [availDirty, setAvailDirty] = useState(false);

  useEffect(() => {
    setLocalAvail(apiAvail);
    setAvailDirty(false);
  }, [apiAvail]);

  // --- Add service modal ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [catalogServices, setCatalogServices] = useState<CatalogService[]>([]);
  const [selectedCatalogId, setSelectedCatalogId] = useState("");
  const [newCustomPrice, setNewCustomPrice] = useState("");

  // --- Edit service modal ---
  const [showEditModal, setShowEditModal] = useState<Service | null>(null);
  const [editPrice, setEditPrice] = useState("");

  // --- Feedback toast ---
  const [toast, setToast] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const showToast = useCallback((type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // --- Derived data ---
  const services = useMemo(() => transformServices(apiServices), [apiServices]);
  const schedule = useMemo(
    () => transformAvailability(localAvail),
    [localAvail]
  );

  // Set of serviceIds already offered (to filter catalog)
  const alreadyOffered = useMemo(
    () => new Set(apiServices.map((s) => s.serviceId)),
    [apiServices]
  );

  // ==================== Service handlers ====================

  const handleAddService = async () => {
    try {
      const popular = await api.services.getPopular();
      setCatalogServices(
        popular.map((s) => ({
          id: s.id,
          name: s.name,
          description: (s as { description?: string }).description ?? "",
        }))
      );
    } catch {
      setCatalogServices([]);
    }
    setSelectedCatalogId("");
    setNewCustomPrice("");
    setShowAddModal(true);
  };

  const handleConfirmAddService = async () => {
    if (!selectedCatalogId) return;
    const price = newCustomPrice ? parseFloat(newCustomPrice) : undefined;
    const ok = await addService(selectedCatalogId, price);
    if (ok) {
      await refetchServices();
      setShowAddModal(false);
      showToast("success", "Service added successfully");
    } else {
      showToast("error", addError ?? "Failed to add service");
    }
  };

  const handleEditService = (serviceId: string) => {
    const svc = services.find((s) => s.id === serviceId);
    if (!svc) return;
    setShowEditModal(svc);
    setEditPrice(String(svc.price));
  };

  const handleConfirmEditService = async () => {
    if (!showEditModal) return;
    const price = editPrice ? parseFloat(editPrice) : undefined;
    const ok = await updateService(showEditModal.id, { customPrice: price });
    if (ok) {
      await refetchServices();
      setShowEditModal(null);
      showToast("success", "Service updated");
    } else {
      showToast("error", "Failed to update service");
    }
  };

  // ==================== Availability handlers ====================

  const handleToggleDay = (day: string) => {
    const idx = toDayIndex(day);
    setLocalAvail((prev) => {
      const daySlots = prev.filter((a) => a.dayOfWeek === idx);
      const rest = prev.filter((a) => a.dayOfWeek !== idx);
      if (daySlots.length === 0) {
        // Day had no slots → enable with a default 9–5 slot
        return [
          ...rest,
          {
            id: `local-${Date.now()}`,
            dayOfWeek: idx,
            startTime: "09:00",
            endTime: "17:00",
            isActive: true,
          },
        ];
      }
      const anyActive = daySlots.some((s) => s.isActive);
      return [
        ...rest,
        ...daySlots.map((s) => ({ ...s, isActive: !anyActive })),
      ];
    });
    setAvailDirty(true);
  };

  const handleAddTimeSlot = (day: string) => {
    const idx = toDayIndex(day);
    setLocalAvail((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        dayOfWeek: idx,
        startTime: "09:00",
        endTime: "17:00",
        isActive: true,
      },
    ]);
    setAvailDirty(true);
  };

  const handleDeleteTimeSlot = (day: string, slotId: string) => {
    setLocalAvail((prev) => prev.filter((a) => a.id !== slotId));
    setAvailDirty(true);
  };

  const handleUpdateTimeSlot = (
    day: string,
    slotId: string,
    field: "startTime" | "endTime",
    value: string
  ) => {
    const time24 = value.includes(" ") ? fmt12to24(value) : value;
    setLocalAvail((prev) =>
      prev.map((a) => (a.id === slotId ? { ...a, [field]: time24 } : a))
    );
    setAvailDirty(true);
  };

  const handleSaveSchedule = async () => {
    const payload = localAvail.map(
      ({ dayOfWeek, startTime, endTime, isActive }) => ({
        dayOfWeek,
        startTime,
        endTime,
        isActive,
      })
    );
    const ok = await saveAvailability(payload);
    if (ok) {
      await refetchAvail();
      setAvailDirty(false);
      showToast("success", "Schedule saved successfully");
    } else {
      showToast("error", availSaveError ?? "Failed to save schedule");
    }
  };

  // ==================== Render ====================

  return (
    <div className="flex flex-col gap-8 px-8 py-10">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <span
          className="text-[12px] text-[#111]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Services & Availability
        </span>
        <h1
          className="text-[30px] font-medium text-[#111827] leading-[1.2]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Services & Availability
        </h1>
      </div>

      {/* Toast Feedback */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg text-white text-sm shadow-lg transition-all ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          {toast.msg}
        </div>
      )}

      {/* Services load error */}
      {svcError && (
        <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-4 text-sm text-[#dc2626]">
          Failed to load services: {svcError}
          <button
            onClick={refetchServices}
            className="ml-3 underline font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col gap-2">
        {svcLoading ? (
          <div className="bg-white border border-[#e2e8f0] rounded-xl h-32 animate-pulse" />
        ) : (
          <ServicesAndPricing
            services={services}
            onAddService={handleAddService}
            onEditService={handleEditService}
          />
        )}

        {availLoading ? (
          <div className="bg-white border border-[#e2e8f0] rounded-xl h-48 animate-pulse" />
        ) : (
          <>
            <AvailabilitySchedule
              schedule={schedule}
              onToggleDay={handleToggleDay}
              onAddTimeSlot={handleAddTimeSlot}
              onDeleteTimeSlot={handleDeleteTimeSlot}
              onUpdateTimeSlot={handleUpdateTimeSlot}
            />

            {/* Save schedule button — only shown when there are unsaved changes */}
            {availDirty && (
              <div className="flex items-center justify-end gap-3 pt-1">
                <span
                  className="text-[13px] text-[#777]"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  You have unsaved schedule changes
                </span>
                <button
                  onClick={handleSaveSchedule}
                  disabled={savingAvail}
                  className="bg-[#02368c] text-white px-5 py-2.5 rounded-lg text-[14px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] disabled:opacity-60 hover:bg-[#024189] transition-colors"
                  style={{ fontFamily: "Roboto Condensed, sans-serif" }}
                >
                  {savingAvail ? "Saving..." : "Save Schedule"}
                </button>
              </div>
            )}

            {availSaveSuccess && !availDirty && (
              <p
                className="text-sm text-green-600 text-right"
                style={{ fontFamily: "Roboto Flex, sans-serif" }}
              >
                Schedule saved
              </p>
            )}
          </>
        )}
      </div>

      {/* ==================== Add Service Modal ==================== */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-gray-200 px-6 py-4">
              <h2
                className="text-xl font-semibold text-[#0f172a]"
                style={{ fontFamily: "Roboto Condensed, sans-serif" }}
              >
                Add Service
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Choose a service from the catalog
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#64748b] mb-2">
                  Service
                </label>
                <select
                  value={selectedCatalogId}
                  onChange={(e) => setSelectedCatalogId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] outline-none"
                >
                  <option value="">Select a service…</option>
                  {catalogServices
                    .filter((cs) => !alreadyOffered.has(cs.id))
                    .map((cs) => (
                      <option key={cs.id} value={cs.id}>
                        {cs.name}
                      </option>
                    ))}
                </select>
                {catalogServices.length === 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    No additional catalog services available
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#64748b] mb-2">
                  Custom Price (₵) — leave blank to use base price
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newCustomPrice}
                  onChange={(e) => setNewCustomPrice(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] outline-none"
                />
              </div>

              {addError && <p className="text-sm text-red-600">{addError}</p>}
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAddService}
                disabled={!selectedCatalogId || adding}
                className="flex-1 px-4 py-3 bg-[#02368c] text-white rounded-lg hover:bg-[#024189] transition-colors font-medium disabled:opacity-60"
              >
                {adding ? "Adding…" : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== Edit Service Modal ==================== */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowEditModal(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-gray-200 px-6 py-4">
              <h2
                className="text-xl font-semibold text-[#0f172a]"
                style={{ fontFamily: "Roboto Condensed, sans-serif" }}
              >
                Edit Service
              </h2>
              <p className="text-sm text-gray-500 mt-1">{showEditModal.name}</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#64748b] mb-2">
                  Custom Price (₵)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] outline-none"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowEditModal(null)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmEditService}
                disabled={updating}
                className="flex-1 px-4 py-3 bg-[#02368c] text-white rounded-lg hover:bg-[#024189] transition-colors font-medium disabled:opacity-60"
              >
                {updating ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
