"use client";

import Image from "next/image";
import { useState } from "react";

interface VendorBannerProps {
  vendorName?: string;
  vendorAvatar?: string;
  isAvailable?: boolean;
  statusMessage?: string;
}

export function VendorBanner({
  vendorName = "Cooper Curtis",
  vendorAvatar = "/images/vendor/banner-avatar.png",
  isAvailable = true,
  statusMessage = "Customers can currently find and book your services.",
}: VendorBannerProps) {
  const [available, setAvailable] = useState(isAvailable);

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-[17px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-between">
      {/* Left Section - Avatar and Info */}
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full border border-[#dbeafe] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden shrink-0">
          <Image
            src={vendorAvatar}
            alt={vendorName}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Status */}
        <div className="flex flex-col gap-1">
          <h2
            className="text-[18px] font-medium text-[#0f172a]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {vendorName}
          </h2>
          <p
            className="text-[12px] text-[#475569]"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            {statusMessage}
          </p>
        </div>
      </div>

      {/* Right Section - Toggle and Button */}
      <div className="flex items-center gap-[14px]">
        {/* Toggle Section */}
        <div className="flex items-center gap-2 px-[14px] py-2">
          <span
            className="text-[12px] text-[#059669]"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            Available for Jobs
          </span>
          {/* Toggle Switch */}
          <button
            onClick={() => setAvailable(!available)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              available ? "bg-[#2e9e5b]" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-[2px] w-5 h-5 bg-white rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-transform ${
                available ? "right-[2px]" : "left-[2px]"
              }`}
            />
          </button>
        </div>

        {/* Manage Availability Button */}
        <button
          className="bg-[#02368c] text-white text-[12px] px-5 py-2 rounded-lg shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]"
          style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
        >
          Manage Availability
        </button>
      </div>
    </div>
  );
}
