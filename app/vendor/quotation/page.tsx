"use client";

import { useState, useCallback } from "react";
import { Quotation, type QuotationData } from "@/src/components/vendor";
import { useVendorQuotationActions } from "@/src/hooks/useVendorQuotations";

// Blank slate for a new quotation
const emptyQuotation: QuotationData = {
  serviceName: "",
  serviceDescription: "",
  scopeOfWork: [],
  materials: [],
  additionalWork: [],
  duration: "",
  preferredStart: "",
  expectedCompletion: "",
  warrantyPeriod: "",
  quotationValidFor: "7 Days",
  notes: "",
  paymentItems: [],
  total: 0,
};

function computeTotal(q: QuotationData): number {
  const workTotal = q.scopeOfWork.reduce((s, i) => s + (i.price ?? 0), 0);
  const matTotal = q.materials.reduce((s, i) => s + (i.price ?? 0), 0);
  const extraTotal = q.additionalWork.reduce((s, i) => s + (i.price ?? 0), 0);
  return workTotal + matTotal + extraTotal;
}

export default function QuotationPage() {
  const [quotationState, setQuotationState] =
    useState<QuotationData>(emptyQuotation);

  const { submitting, submitError, successMessage, createAndSend, clearMessages } =
    useVendorQuotationActions();

  const handleChange = useCallback((field: string, value: string) => {
    setQuotationState((prev) => {
      const updated = { ...prev, [field]: value };
      return { ...updated, total: computeTotal(updated) };
    });
  }, []);

  const handleAddWorkItem = useCallback(() => {
    setQuotationState((prev) => {
      const updated = {
        ...prev,
        scopeOfWork: [
          ...prev.scopeOfWork,
          {
            id: `work-${Date.now()}`,
            name: "New Work Item",
            price: 0,
            quantity: "1",
            rate: 0,
          },
        ],
      };
      return { ...updated, total: computeTotal(updated) };
    });
  }, []);

  const handleAddMaterial = useCallback(() => {
    setQuotationState((prev) => {
      const updated = {
        ...prev,
        materials: [
          ...prev.materials,
          {
            id: `mat-${Date.now()}`,
            name: "New Material",
            price: 0,
            description: "",
          },
        ],
      };
      return { ...updated, total: computeTotal(updated) };
    });
  }, []);

  const handleAddAdditionalWork = useCallback(() => {
    setQuotationState((prev) => {
      const updated = {
        ...prev,
        additionalWork: [
          ...prev.additionalWork,
          {
            id: `extra-${Date.now()}`,
            name: "Additional Work",
            price: 0,
          },
        ],
      };
      return { ...updated, total: computeTotal(updated) };
    });
  }, []);

  const handleSendQuotation = async () => {
    clearMessages();

    // Build payload for backend
    const allItems = [
      ...quotationState.scopeOfWork.map((i) => ({
        description: i.name,
        quantity: parseInt(i.quantity) || 1,
        unitPrice: i.rate || i.price,
        totalPrice: i.price,
      })),
      ...quotationState.materials.map((i) => ({
        description: i.name,
        quantity: 1,
        unitPrice: i.price,
        totalPrice: i.price,
      })),
      ...quotationState.additionalWork.map((i) => ({
        description: i.name,
        quantity: 1,
        unitPrice: i.price,
        totalPrice: i.price,
      })),
    ];

    const success = await createAndSend({
      items: allItems,
      notes: quotationState.notes || undefined,
      scopeOfWork: quotationState.scopeOfWork,
      materials: quotationState.materials,
      additionalWork: quotationState.additionalWork,
      duration: quotationState.duration || undefined,
      preferredStart: quotationState.preferredStart || undefined,
      expectedCompletion: quotationState.expectedCompletion || undefined,
      warrantyPeriod: quotationState.warrantyPeriod || undefined,
      quotationValidFor: quotationState.quotationValidFor || undefined,
    });

    if (success) {
      // Reset to blank after successful send
      setQuotationState(emptyQuotation);
    }
  };

  return (
    <div className="flex flex-col">
      {submitError && (
        <div className="mx-8 mt-6 bg-[#fef2f2] border border-[#fecaca] rounded-lg px-4 py-3">
          <p className="text-[#dc2626] text-[13px]">{submitError}</p>
        </div>
      )}
      {successMessage && (
        <div className="mx-8 mt-6 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg px-4 py-3">
          <p className="text-[#16a34a] text-[13px]">{successMessage}</p>
        </div>
      )}
      <Quotation
        quotation={quotationState}
        onAddWorkItem={handleAddWorkItem}
        onAddMaterial={handleAddMaterial}
        onAddAdditionalWork={handleAddAdditionalWork}
        onSendQuotation={handleSendQuotation}
        onChange={handleChange}
        isSubmitting={submitting}
      />
    </div>
  );
}
