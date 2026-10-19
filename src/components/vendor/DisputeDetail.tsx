"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BackArrowIcon = () => (
  <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.48658 0.159112C3.69114 -0.0530373 4.02272 -0.0530373 4.22728 0.159112C4.43184 0.371261 4.43184 0.71514 4.22728 0.927289L1.78829 3.45676H11V4.54324H1.78829L4.22728 7.07271C4.43184 7.28486 4.43184 7.62874 4.22728 7.84089C4.02272 8.05304 3.69114 8.05304 3.48658 7.84089L0.153421 4.38409C-0.0511403 4.17194 -0.0511403 3.82806 0.153421 3.61591L3.48658 0.159112Z" fill="#888888"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 7C6.19036 7 6.75 6.44036 6.75 5.75C6.75 5.05964 6.19036 4.5 5.5 4.5C4.80964 4.5 4.25 5.05964 4.25 5.75C4.25 6.44036 4.80964 7 5.5 7Z" stroke="#434652" strokeWidth="0.8"/>
    <path d="M5.5 13C8 10 9.5 7.5 9.5 5.5C9.5 2.73858 7.26142 0.5 5.5 0.5C3.73858 0.5 1.5 2.73858 1.5 5.5C1.5 7.5 3 10 5.5 13Z" stroke="#434652" strokeWidth="0.8"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="6" stroke="#434652" strokeWidth="1"/>
    <path d="M7 4V7L9 9" stroke="#434652" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="1.5" width="11" height="11" rx="1.5" stroke="#02368c"/>
    <path d="M3 0.5V2.5M9 0.5V2.5M0.5 5H11.5" stroke="#02368c" strokeLinecap="round"/>
  </svg>
);

const CameraIcon = () => (
  <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 3.5C1.5 2.94772 1.94772 2.5 2.5 2.5H4L5 1H10L11 2.5H12.5C13.0523 2.5 13.5 2.94772 13.5 3.5V11.5C13.5 12.0523 13.0523 12.5 12.5 12.5H2.5C1.94772 12.5 1.5 12.0523 1.5 11.5V3.5Z" stroke="#02368c" strokeWidth="1.2"/>
    <circle cx="7.5" cy="7" r="2.5" stroke="#02368c" strokeWidth="1.2"/>
  </svg>
);

const CheckmarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33333 8.66667L6 11.3333L12.6667 4.66667" stroke="#059669" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7L6 10L11 4" stroke="#02368c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.166 4.999C5.06114 4.963 7.84481 3.87746 10 1.944C12.155 3.87782 14.9387 4.96373 17.834 5C17.944 5.65 18 6.32 18 7.001C18 12.226 14.66 16.671 10 18.318C5.34 16.67 2 12.225 2 7C2 6.318 2.057 5.65 2.166 4.999V4.999M13.707 8.707C14.086 8.31462 14.0806 7.69092 13.6948 7.30518C13.3091 6.91945 12.6854 6.91403 12.293 7.293L9 10.586L7.707 9.293C7.31462 8.91403 6.69092 8.91945 6.30518 9.30518C5.91945 9.69092 5.91403 10.3146 6.293 10.707L8.293 12.707C8.6835 13.0974 9.3165 13.0974 9.707 12.707L13.707 8.707V8.707" fill="#0F52D6"/>
  </svg>
);

const VerifiedIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C10.09 13 13 10.09 13 6.5C13 2.91 10.09 0 6.5 0ZM5.2 9.75L2.6 7.15L3.51 6.24L5.2 7.93L9.49 3.64L10.4 4.55L5.2 9.75Z" fill="#002260"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 11.32V13.32C14.5 13.7682 14.1418 14.1445 13.6936 14.1669C13.4694 14.1783 13.2392 14.1846 13 14.1846C6.37 14.1846 1 8.81462 1 2.18462C1 1.94535 1.00635 1.71525 1.01769 1.49105C1.04011 1.04285 1.41643 0.684616 1.86462 0.684616H3.86462C4.09062 0.684616 4.27662 0.870616 4.27662 1.09662C4.27662 1.57262 4.32862 2.03662 4.42862 2.48062C4.46662 2.65062 4.41062 2.83462 4.27862 2.96662L3.10062 4.14462C3.87262 5.71462 5.46862 7.31062 7.03862 8.08262L8.21662 6.90462C8.34862 6.77262 8.53262 6.71662 8.70262 6.75462C9.14662 6.85462 9.61062 6.90662 10.0866 6.90662C10.3126 6.90662 10.4986 7.09262 10.4986 7.31862V9.31862C10.4986 10.4232 11.3946 11.32 12.5 11.32H14.5Z" stroke="#02368c" strokeWidth="1.2"/>
  </svg>
);

const MessageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 1H2C1.44772 1 1 1.44772 1 2V11C1 11.5523 1.44772 12 2 12H4V15L8 12H14C14.5523 12 15 11.5523 15 11V2C15 1.44772 14.5523 1 14 1Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NavigationIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1L4.5 5.5M9 1L6 9L4.5 5.5M9 1L1 4L4.5 5.5" stroke="#02368c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface DisputeDetailData {
  id: string;
  bookingId: string;
  serviceName: string;
  serviceCategory: "contract" | "one-time";
  status: "disputed" | "rework-requested" | "rework-in-progress" | "rework-completed";
  location: string;
  postalCode: string;
  bookedDate: string;
  bookedTime: string;
  customerComplaint: string;
  requestedRework: string;
  vendorResponse?: string;
  afterImages: string[];
  categoryType: string;
  serviceDetails: string[];
  estimatedDate: string;
  estimatedTime: string;
  estimatedDuration: string;
  customerIssue: string;
  evidencePhotos: string[];
  serviceAmount: number;
  platformFee: number;
  platformFeePercent: number;
  escrowHeld: number;
  yourEarnings: number;
  customerName: string;
  customerInitials: string;
  memberSince: string;
  servicesBooked: number;
  customerAddress: {
    line1: string;
    line2: string;
    postalCode: string;
  };
  isVerifiedUser: boolean;
}

interface DisputeDetailProps {
  dispute: DisputeDetailData;
  onAcceptRework?: () => void;
  onCallCustomer?: () => void;
  onMessageCustomer?: () => void;
  onUploadImages?: () => void;
  onOpenInMaps?: () => void;
}

const statusBadges = {
  "disputed": { borderColor: "border-[#ff3b30]", textColor: "text-[#ff3b30]", label: "Dispute" },
  "rework-requested": { borderColor: "border-[#ff9500]", textColor: "text-[#ff9500]", label: "Rework Requested" },
  "rework-in-progress": { borderColor: "border-[#ff9500]", textColor: "text-[#ff9500]", label: "Rework in Progress" },
  "rework-completed": { borderColor: "border-[#34c759]", textColor: "text-[#34c759]", label: "Rework Completed" },
};

const categoryBadges = {
  "contract": { label: "Contract" },
  "one-time": { label: "One time Service" },
};

export function DisputeDetail({
  dispute,
  onAcceptRework,
  onCallCustomer,
  onMessageCustomer,
  onUploadImages,
  onOpenInMaps,
}: DisputeDetailProps) {
  const [vendorResponse, setVendorResponse] = useState(dispute.vendorResponse || "");
  const statusBadge = statusBadges[dispute.status];
  const categoryBadge = categoryBadges[dispute.serviceCategory];

  return (
    <div className="flex flex-col gap-8 px-8 py-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        {/* Breadcrumb */}
        <Link href="/vendor/disputes" className="flex items-center gap-2 text-[12px]">
          <BackArrowIcon />
          <span className="text-[#475569]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Disputes</span>
          <span className="text-[#475569]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>/</span>
          <span className="text-[#111]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>#{dispute.bookingId}: {dispute.serviceName}</span>
        </Link>

        {/* Title Row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <h1
                className="text-[30px] font-medium text-[#111827]"
                style={{ fontFamily: "Roboto Flex, sans-serif" }}
              >
                #{dispute.bookingId} — {dispute.serviceName}
              </h1>
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 border border-[#02368c] text-[#02368c] text-[12px] rounded-full" style={{ fontFamily: "Lato, sans-serif" }}>
                  {categoryBadge.label}
                </span>
                <span className={`px-1.5 py-0.5 border ${statusBadge.borderColor} ${statusBadge.textColor} text-[12px] rounded-full`} style={{ fontFamily: "Lato, sans-serif" }}>
                  {statusBadge.label}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
              <div className="flex items-center gap-1">
                <LocationIcon />
                <span>{dispute.location} ({dispute.postalCode})</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <ClockIcon />
                <span>Booked {dispute.bookedDate} at {dispute.bookedTime}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onAcceptRework}
            className="flex items-center gap-2 px-6 py-3.5 bg-white border border-black/10 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] text-[#02368c]"
          >
            <CheckIcon />
            <span className="text-[16px]" style={{ fontFamily: "Roboto, sans-serif" }}>Accept Rework</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl p-3">
        <div className="flex flex-col gap-2">
          {/* Evidence Photos and Rework Reasons Card */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="border-b border-black/[0.12] px-5 py-[18px]">
              <h2 className="text-[16px] font-medium text-[#222]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                Evidence Photos and Rework Reasons
              </h2>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {/* After Images */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>After Images</span>
                <div className="flex gap-2 items-center">
                  {dispute.afterImages.map((img, idx) => (
                    <div key={idx} className="w-36 h-36 rounded-lg overflow-hidden bg-[#f1f5f9]">
                      <Image src={img} alt={`After image ${idx + 1}`} width={144} height={144} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <button
                    onClick={onUploadImages}
                    className="w-36 h-36 rounded-md border border-dashed border-[#02368c]/60 flex flex-col items-center justify-center gap-2"
                  >
                    <CameraIcon />
                    <span className="text-[12px] text-[#02368c]" style={{ fontFamily: "Roboto, sans-serif" }}>Upload Images</span>
                  </button>
                </div>
              </div>

              {/* Customer Complaint */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Customer complaint & rework request</span>
                <div className="bg-[#eef4ff]/70 rounded p-3">
                  <p className="text-[12px] text-[#434652] leading-[16px]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                    Customer complaint: "{dispute.customerComplaint}"
                  </p>
                  <p className="text-[12px] text-[#434652] leading-[16px] mt-2" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                    Requested rework: {dispute.requestedRework}
                  </p>
                </div>
              </div>

              {/* Vendor Response */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Give your part of the story</span>
                <textarea
                  value={vendorResponse}
                  onChange={(e) => setVendorResponse(e.target.value)}
                  className="bg-[#eef4ff]/70 rounded p-3 min-h-[80px] text-[12px] text-[#434652] resize-none outline-none"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  placeholder="Enter your response..."
                />
              </div>
            </div>
          </div>

          {/* Two Column Section */}
          <div className="flex gap-2">
            {/* Left Column - Service Specifications */}
            <div className="flex-1 bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="border-b border-black/[0.12] px-5 py-[18px]">
                <h2 className="text-[16px] font-medium text-[#222]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                  Service Specifications
                </h2>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {/* Category & Type */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Category & Type</span>
                  <div className="bg-[#eef4ff]/70 rounded p-3">
                    <span className="text-[14px] font-semibold text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                      {dispute.categoryType}
                    </span>
                  </div>
                </div>

                {/* Service Details */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Service Details</span>
                  <div className="bg-[#eef4ff]/70 rounded p-3 flex flex-col gap-2">
                    {dispute.serviceDetails.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckmarkIcon />
                        <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estimated Duration */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Estimated Duration</span>
                  <div className="bg-[#eef4ff]/70 rounded p-3 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <CalendarIcon />
                      <span className="text-[13px] font-medium text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                        {dispute.estimatedDate}
                      </span>
                    </div>
                    <span className="text-[12px] font-semibold text-[#002260]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                      {dispute.estimatedTime} ({dispute.estimatedDuration})
                    </span>
                  </div>
                </div>

                {/* Customer Issue */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Customer Issue</span>
                  <div className="bg-[#eef4ff]/70 rounded p-3">
                    <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                      "{dispute.customerIssue}"
                    </span>
                  </div>
                </div>

                {/* Evidence Photos */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Evidence Photos</span>
                  <div className="flex gap-2">
                    {dispute.evidencePhotos.map((img, idx) => (
                      <div key={idx} className="w-36 h-36 rounded-lg overflow-hidden bg-[#f1f5f9]">
                        <Image src={img} alt={`Evidence ${idx + 1}`} width={144} height={144} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-2">
              {/* Payment Details */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="border-b border-black/[0.12] px-5 py-[18px]">
                  <h2 className="text-[16px] font-medium text-[#222]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                    Payment Details
                  </h2>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <div className="flex justify-between px-2.5">
                    <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Service Amount</span>
                    <span className="text-[12px] font-bold text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>₵{dispute.serviceAmount}</span>
                  </div>
                  <div className="flex justify-between px-2.5">
                    <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Platform Fee ({dispute.platformFeePercent}%)</span>
                    <span className="text-[12px] font-bold text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>₵{dispute.platformFee}</span>
                  </div>
                  <div className="flex justify-between px-2.5">
                    <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Escrow Held</span>
                    <span className="text-[12px] font-bold text-[#34c759]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>₵{dispute.escrowHeld}</span>
                  </div>
                  <div className="flex justify-between bg-[#eef4ff] rounded p-2.5">
                    <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Your Earnings</span>
                    <span className="text-[12px] font-bold text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>₵{dispute.yourEarnings}</span>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="border-b border-black/[0.12] px-5 py-[18px] flex items-center justify-between">
                  <h2 className="text-[16px] font-medium text-[#222]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                    Customer Details
                  </h2>
                  {dispute.isVerifiedUser && (
                    <div className="flex items-center gap-1 bg-[#e5eeff] px-2.5 py-0.5 rounded-xl">
                      <VerifiedIcon />
                      <span className="text-[11px] font-semibold text-[#002260] tracking-[0.33px]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                        VERIFIED USER
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col gap-4">
                  {/* Customer Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#e5eeff] flex items-center justify-center">
                      <span className="text-[18px] font-medium text-[#002260]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                        {dispute.customerInitials}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-semibold text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                        {dispute.customerName}
                      </span>
                      <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                        Member since {dispute.memberSince} • {dispute.servicesBooked} Services Booked
                      </span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="bg-[#eef4ff] rounded p-2.5 flex justify-between">
                    <div className="flex items-start gap-2">
                      <LocationIcon />
                      <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Address</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[12px] text-[#555]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                        {dispute.customerAddress.line1}
                      </span>
                      <span className="text-[12px] text-[#555]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                        {dispute.customerAddress.line2}
                      </span>
                      <span className="text-[12px] text-[#555]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                        GhanaPost: {dispute.customerAddress.postalCode}
                      </span>
                      <button onClick={onOpenInMaps} className="flex items-center gap-1 text-[12px] text-[#02368c] underline" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                        Open in Maps
                        <NavigationIcon />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={onCallCustomer}
                      className="flex items-center gap-2 px-4 py-3 border border-[#02368c] rounded-md text-[#02368c]"
                    >
                      <PhoneIcon />
                      <span className="text-[12px]" style={{ fontFamily: "Roboto, sans-serif" }}>Call Customer</span>
                    </button>
                    <button
                      onClick={onMessageCustomer}
                      className="flex items-center gap-2 px-4 py-3 bg-[#02368c] rounded-md text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                    >
                      <MessageIcon />
                      <span className="text-[12px]" style={{ fontFamily: "Roboto, sans-serif" }}>Message Customer</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Safety Notice */}
              <div className="bg-[#eef5ff]/60 border border-[#d9e8ff] rounded-2xl p-5 flex gap-3.5">
                <div className="pt-0.5">
                  <ShieldIcon />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-medium text-[#0f172a]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                    Your Safety Matters
                  </span>
                  <span className="text-[12px] text-[#475569]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                    All payments are secured and released only after job completion.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
