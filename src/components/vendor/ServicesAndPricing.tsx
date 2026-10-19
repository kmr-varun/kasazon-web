"use client";

import { useState } from "react";

const ClockIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.0833 12.25L12.25 11.0833L9.16667 8V4.16667H7.5V8.66667L11.0833 12.25V12.25M8.33333 16.6667C7.18056 16.6667 6.09722 16.4479 5.08333 16.0104C4.06944 15.5729 3.1875 14.9792 2.4375 14.2292C1.6875 13.4792 1.09375 12.5972 0.65625 11.5833C0.21875 10.5694 0 9.48611 0 8.33333C0 7.18056 0.21875 6.09722 0.65625 5.08333C1.09375 4.06944 1.6875 3.1875 2.4375 2.4375C3.1875 1.6875 4.06944 1.09375 5.08333 0.65625C6.09722 0.21875 7.18056 0 8.33333 0C9.48611 0 10.5694 0.21875 11.5833 0.65625C12.5972 1.09375 13.4792 1.6875 14.2292 2.4375C14.9792 3.1875 15.5729 4.06944 16.0104 5.08333C16.4479 6.09722 16.6667 7.18056 16.6667 8.33333C16.6667 9.48611 16.4479 10.5694 16.0104 11.5833C15.5729 12.5972 14.9792 13.4792 14.2292 14.2292C13.4792 14.9792 12.5972 15.5729 11.5833 16.0104C10.5694 16.4479 9.48611 16.6667 8.33333 16.6667V16.6667M8.33333 15C10.1806 15 11.7535 14.3507 13.0521 13.0521C14.3507 11.7535 15 10.1806 15 8.33333C15 6.48611 14.3507 4.91319 13.0521 3.61458C11.7535 2.31597 10.1806 1.66667 8.33333 1.66667C6.48611 1.66667 4.91319 2.31597 3.61458 3.61458C2.31597 4.91319 1.66667 6.48611 1.66667 8.33333C1.66667 10.1806 2.31597 11.7535 3.61458 13.0521C4.91319 14.3507 6.48611 15 8.33333 15V15" fill="#111111"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
}

interface ServicesAndPricingProps {
  services?: Service[];
  onAddService?: () => void;
  onEditService?: (serviceId: string) => void;
}

const defaultServices: Service[] = [
  {
    id: "1",
    name: "Switchbox Installation",
    description: "Standard replacement or new fix",
    duration: "45 mins – 1 hr",
    price: 40,
  },
  {
    id: "2",
    name: "Wi-Fi Switch Installation",
    description: "Smart switch & pairing check",
    duration: "45 mins – 1 hr",
    price: 40,
  },
  {
    id: "3",
    name: "Fan Installation",
    description: "Ceiling or wall-mounted fan",
    duration: "45 mins – 1 hr",
    price: 50,
  },
];

export function ServicesAndPricing({
  services = defaultServices,
  onAddService,
  onEditService,
}: ServicesAndPricingProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-black/[0.12] h-[75px] px-5 py-[18px] flex items-center justify-between">
        <p
          className="text-[16px] font-medium text-[#222]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Offered Services & Pricing
        </p>
        <button
          onClick={onAddService}
          className="flex items-center gap-2 px-3 py-2 border border-[#02368c] rounded-md text-[#02368c] hover:bg-[#02368c]/5 shadow-[0px_1px_1px_0px_rgba(16,24,40,0.05)]"
        >
          <PlusIcon />
          <span
            className="text-[12px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Add Service
          </span>
        </button>
      </div>

      {/* Services List */}
      <div className="p-4 flex flex-col gap-2.5">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-black/10 rounded-lg p-[13px] flex items-center justify-between"
          >
            {/* Left: Service Info */}
            <div className="flex flex-col gap-1">
              <p
                className="text-[14px] font-medium text-[#111]"
                style={{ fontFamily: "Roboto Flex, sans-serif" }}
              >
                {service.name}
              </p>
              <p
                className="text-[12px] text-[#777]"
                style={{ fontFamily: "Roboto Flex, sans-serif" }}
              >
                {service.description}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <ClockIcon />
                <span
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {service.duration}
                </span>
              </div>
            </div>

            {/* Right: Price & Edit */}
            <div className="flex items-center gap-3">
              <span
                className="text-[15px] font-semibold text-[#111]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                ₵{service.price}
              </span>
              <button
                onClick={() => onEditService?.(service.id)}
                className="px-2.5 py-1 text-[12px] font-semibold text-[#02368c] hover:bg-[#02368c]/5 rounded-lg"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
