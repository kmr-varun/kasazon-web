"use client";

import { useState } from "react";

const PlusIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 0V11M0 5.5H11" stroke="#02368C" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 0L0 2.5V6.5C0 10.1 2.35 13.45 5.5 14C8.65 13.45 11 10.1 11 6.5V2.5L5.5 0ZM4.5 10L2 7.5L2.7 6.8L4.5 8.6L8.3 4.8L9 5.5L4.5 10Z" fill="#02368C"/>
  </svg>
);

interface WorkItem {
  id: string;
  name: string;
  price: number;
  quantity: string;
  rate: number;
}

interface Material {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface AdditionalWork {
  id: string;
  name: string;
  price: number;
}

interface PaymentItem {
  id: string;
  name: string;
  price: number;
}

export interface QuotationData {
  serviceName: string;
  serviceDescription: string;
  scopeOfWork: WorkItem[];
  materials: Material[];
  additionalWork: AdditionalWork[];
  duration: string;
  preferredStart: string;
  expectedCompletion: string;
  warrantyPeriod: string;
  quotationValidFor: string;
  notes: string;
  paymentItems: PaymentItem[];
  total: number;
}

interface QuotationProps {
  quotation?: QuotationData;
  onAddWorkItem?: () => void;
  onAddMaterial?: () => void;
  onAddAdditionalWork?: () => void;
  onSendQuotation?: () => void;
  onChange?: (field: string, value: string) => void;
}

const defaultQuotation: QuotationData = {
  serviceName: "Home Painting",
  serviceDescription: "3 BHK Interior Painting",
  scopeOfWork: [
    {
      id: "1",
      name: "Surface Preparation",
      price: 150,
      quantity: "1",
      rate: 150,
    },
    {
      id: "2",
      name: "Interior Painting",
      price: 150,
      quantity: "4 Rooms",
      rate: 150,
    },
  ],
  materials: [
    {
      id: "1",
      name: "Premium Emulsion Paint",
      price: 150,
      description: "5 Gallons (₦12,000/Unit)",
    },
    {
      id: "2",
      name: "Wall Primer",
      price: 150,
      description: "2 Buckets (₦8,000/Unit)",
    },
  ],
  additionalWork: [
    {
      id: "1",
      name: "Minor Ceiling Repair",
      price: 150,
    },
  ],
  duration: "6",
  preferredStart: "02/09/2026",
  expectedCompletion: "07/09/2026",
  warrantyPeriod: "2 Years",
  quotationValidFor: "7 Days",
  notes: "",
  paymentItems: [
    { id: "1", name: "AC Servicing (x2)", price: 120 },
    { id: "2", name: "Anti-bacterial Coating", price: 25 },
    { id: "3", name: "Platform fee", price: 5 },
  ],
  total: 150,
};

export function Quotation({
  quotation = defaultQuotation,
  onAddWorkItem,
  onAddMaterial,
  onAddAdditionalWork,
  onSendQuotation,
  onChange,
}: QuotationProps) {
  const [notes, setNotes] = useState(quotation.notes);

  return (
    <div className="flex flex-col min-h-full">
      {/* Main Content */}
      <div className="flex-1 px-8 pt-8 pb-32 flex flex-col gap-6 max-w-[1280px]">
        {/* Page Title */}
        <h1
          className="text-[24px] font-medium text-[#0f172a]"
          style={{ fontFamily: "Roboto Condensed, sans-serif" }}
        >
          Create Quotation
        </h1>

        {/* Service Summary Card */}
        <div className="bg-white border border-black/10 rounded-lg p-4">
          <h2
            className="text-[20px] font-semibold text-[#111]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {quotation.serviceName}
          </h2>
          <p
            className="text-[16px] text-[#434654]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {quotation.serviceDescription}
          </p>
        </div>

        {/* Scope of Work & Materials */}
        <div className="flex gap-6">
          {/* Scope of Work */}
          <div className="flex-1 flex flex-col gap-3">
            <h3
              className="text-[18px] font-medium text-black"
              style={{ fontFamily: "Roboto Condensed, sans-serif" }}
            >
              Scope of Work
            </h3>
            <div className="border border-[#c3c6d6] rounded-lg backdrop-blur-[5px] bg-white/70 overflow-hidden">
              {quotation.scopeOfWork.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-4 flex flex-col gap-2 ${
                    index > 0 ? "border-t border-[#c3c6d6]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[14px] font-medium text-[#111]"
                      style={{ fontFamily: "Roboto Flex, sans-serif" }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="text-[14px] font-medium text-[#111]"
                      style={{ fontFamily: "Roboto Flex, sans-serif" }}
                    >
                      ₵{item.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[14px] text-[#777]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Qty: {item.quantity}
                    </span>
                    <span
                      className="text-[14px] text-[#777]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Rate: ₵{item.rate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={onAddWorkItem}
              className="flex items-center gap-1 pt-2 self-start"
            >
              <PlusIcon />
              <span
                className="text-[14px] text-[#02368c]"
                style={{ fontFamily: "Roboto Condensed, sans-serif" }}
              >
                Add Work Item
              </span>
            </button>
          </div>

          {/* Materials */}
          <div className="flex-1 flex flex-col gap-3">
            <h3
              className="text-[18px] font-medium text-black"
              style={{ fontFamily: "Roboto Condensed, sans-serif" }}
            >
              Materials
            </h3>
            <div className="border border-[#c3c6d6] rounded-lg backdrop-blur-[5px] bg-white/70 overflow-hidden">
              {quotation.materials.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-4 flex flex-col gap-2 ${
                    index > 0 ? "border-t border-black/10" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="text-[14px] font-medium text-[#041b3c]"
                      style={{ fontFamily: "Roboto Flex, sans-serif" }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="text-[14px] font-medium text-[#111]"
                      style={{ fontFamily: "Roboto Flex, sans-serif" }}
                    >
                      ₵{item.price}
                    </span>
                  </div>
                  <span
                    className="text-[14px] text-[#434654]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={onAddMaterial}
              className="flex items-center gap-1 pt-2 self-start"
            >
              <PlusIcon />
              <span
                className="text-[14px] text-[#02368c]"
                style={{ fontFamily: "Roboto Condensed, sans-serif" }}
              >
                Add Material
              </span>
            </button>
          </div>
        </div>

        {/* Additional Work */}
        <div className="flex flex-col gap-3 w-[548px]">
          <h3
            className="text-[18px] font-medium text-black"
            style={{ fontFamily: "Roboto Condensed, sans-serif" }}
          >
            Additional Work
          </h3>
          <div className="border border-[#c3c6d6] rounded-lg backdrop-blur-[5px] bg-white/70 overflow-hidden">
            {quotation.additionalWork.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 ${index > 0 ? "border-t border-[#c3c6d6]" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="text-[14px] font-medium text-[#111]"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-[14px] font-medium text-[#111]"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    ₵{item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onAddAdditionalWork}
            className="flex items-center gap-1 pt-2 self-start"
          >
            <PlusIcon />
            <span
              className="text-[14px] text-[#02368c]"
              style={{ fontFamily: "Roboto Condensed, sans-serif" }}
            >
              Add Additional Work
            </span>
          </button>
        </div>

        {/* Duration & Warranty */}
        <div className="flex gap-6">
          {/* Estimated Duration */}
          <div className="flex-1 flex flex-col gap-4 px-6">
            <h3
              className="text-[18px] font-medium text-[#111]"
              style={{ fontFamily: "Roboto Condensed, sans-serif" }}
            >
              Estimated Duration
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Duration (Days)
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3 h-11">
                  <input
                    type="text"
                    value={quotation.duration}
                    onChange={(e) => onChange?.("duration", e.target.value)}
                    className="text-[12px] text-[#777] w-full bg-transparent outline-none"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Preferred Start
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3 h-11">
                  <input
                    type="text"
                    value={quotation.preferredStart}
                    onChange={(e) => onChange?.("preferredStart", e.target.value)}
                    className="text-[12px] text-[#777] w-full bg-transparent outline-none"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Expected Completion
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3 h-11">
                  <input
                    type="text"
                    value={quotation.expectedCompletion}
                    onChange={(e) => onChange?.("expectedCompletion", e.target.value)}
                    className="text-[12px] text-[#777] w-full bg-transparent outline-none"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Warranty & Validity */}
          <div className="flex-1 flex flex-col gap-4 px-6">
            <h3
              className="text-[18px] font-medium text-[#111]"
              style={{ fontFamily: "Roboto Condensed, sans-serif" }}
            >
              Warranty & Validity
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Warranty Period
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3 h-11">
                  <input
                    type="text"
                    value={quotation.warrantyPeriod}
                    onChange={(e) => onChange?.("warrantyPeriod", e.target.value)}
                    className="text-[12px] text-[#777] w-full bg-transparent outline-none"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Quotation Valid For
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3 h-11">
                  <input
                    type="text"
                    value={quotation.quotationValidFor}
                    onChange={(e) => onChange?.("quotationValidFor", e.target.value)}
                    className="text-[12px] text-[#777] w-full bg-transparent outline-none"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Notes for Customer
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-2.5 h-[100px]">
                  <textarea
                    value={notes}
                    onChange={(e) => {
                      setNotes(e.target.value);
                      onChange?.("notes", e.target.value);
                    }}
                    placeholder="Add any important information about the quotation..."
                    className="text-[12px] text-[#777] w-full h-full bg-transparent outline-none resize-none"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-[#f2f3ff] rounded-xl p-6 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3
              className="text-[20px] font-semibold text-[#131b2e]"
              style={{ fontFamily: "Roboto Condensed, sans-serif" }}
            >
              Payment Summary
            </h3>
            <div className="flex items-center gap-1">
              <ShieldIcon />
              <span
                className="text-[12px] font-semibold text-[#02368c] tracking-[0.24px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                WallKas Escrow Protected
              </span>
            </div>
          </div>

          {/* Line Items */}
          <div className="flex flex-col gap-2.5">
            {quotation.paymentItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span
                  className="text-[16px] text-[#424655]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {item.name}
                </span>
                <span
                  className="text-[18px] text-[#131b2e]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  ₵{item.price}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-[rgba(195,198,216,0.3)]" />

          {/* Total */}
          <div className="flex items-center justify-between pt-1">
            <span
              className="text-[20px] font-semibold text-[#131b2e]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Total
            </span>
            <span
              className="text-[20px] font-semibold text-[#02368c] tracking-[-0.9px]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              ₵{quotation.total}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-64 right-0 bg-white/95 backdrop-blur-[6px] border-t border-[#e2e8f0] shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.03)] py-4 px-8">
        <div className="max-w-[1280px]">
          <button
            onClick={onSendQuotation}
            className="bg-[#02368c] text-white rounded-lg px-5 py-3 w-[244px] h-[49px]"
          >
            <span
              className="text-[18px]"
              style={{ fontFamily: "Roboto Condensed, sans-serif" }}
            >
              Send Quotation
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
