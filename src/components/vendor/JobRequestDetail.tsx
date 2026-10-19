"use client";

import Image from "next/image";
import Link from "next/link";

const BackArrowIcon = () => (
  <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.48658 0.159112C3.69114 -0.0530373 4.02272 -0.0530373 4.22728 0.159112C4.43184 0.371261 4.43184 0.71514 4.22728 0.927289L1.78829 3.45676H11V4.54324H1.78829L4.22728 7.07271C4.43184 7.28486 4.43184 7.62874 4.22728 7.84089C4.02272 8.05304 3.69114 8.05304 3.48658 7.84089L0.153421 4.38409C-0.0511403 4.17194 -0.0511403 3.82806 0.153421 3.61591L3.48658 0.159112Z" fill="#888888"/>
  </svg>
);

const LocationPinIcon = () => (
  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 3.14C5.00556 3.14 4.52222 3.28 4.11111 3.54C3.7 3.8 3.38 4.17 3.19 4.6C3 5.03 2.95 5.51 3.04 5.97C3.13 6.43 3.36 6.85 3.7 7.18C4.04 7.51 4.47 7.74 4.95 7.83C5.43 7.92 5.92 7.87 6.37 7.69C6.82 7.51 7.2 7.2 7.47 6.8C7.74 6.4 7.89 5.93 7.89 5.45C7.89 4.82 7.64 4.22 7.2 3.78C6.76 3.34 6.14 3.14 5.5 3.14ZM5.5 6.96C5.2 6.96 4.91 6.87 4.66 6.71C4.41 6.55 4.22 6.32 4.1 6.05C3.98 5.78 3.95 5.49 4.01 5.21C4.07 4.93 4.21 4.68 4.42 4.48C4.63 4.28 4.89 4.15 5.18 4.09C5.47 4.03 5.77 4.06 6.05 4.18C6.33 4.3 6.56 4.49 6.72 4.74C6.88 4.99 6.97 5.28 6.97 5.58C6.97 5.97 6.81 6.35 6.53 6.63C6.25 6.91 5.88 6.96 5.5 6.96ZM5.5 0C4.04 0 2.64 0.55 1.61 1.52C0.58 2.49 0 3.81 0 5.19C0 7.04 0.91 8.99 2.62 10.85C3.4 11.69 4.27 12.45 5.22 13.11C5.31 13.17 5.41 13.2 5.51 13.2C5.61 13.2 5.71 13.17 5.8 13.11C6.75 12.45 7.62 11.69 8.4 10.85C10.09 8.99 11 7.04 11 5.19C11 3.81 10.42 2.49 9.39 1.52C8.36 0.55 6.96 0 5.5 0ZM5.5 12.14C4.47 11.38 1 8.56 1 5.19C1 4.06 1.47 2.98 2.31 2.18C3.15 1.38 4.3 0.94 5.5 0.94C6.7 0.94 7.85 1.38 8.69 2.18C9.53 2.98 10 4.06 10 5.19C10 8.56 6.53 11.38 5.5 12.14Z" fill="#434652"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 0C5.21 0 3.96 0.38 2.89 1.1C1.82 1.82 0.99 2.84 0.5 4.02C0.01 5.2 -0.13 6.51 0.12 7.77C0.38 9.03 1 10.19 1.9 11.1C2.81 12.01 3.97 12.62 5.23 12.88C6.49 13.13 7.8 12.99 8.98 12.51C10.16 12.02 11.18 11.19 11.9 10.11C12.62 9.04 13 7.79 13 6.5C13 4.78 12.32 3.13 11.1 1.9C9.87 0.68 8.22 0 6.5 0ZM6.5 12C5.41 12 4.35 11.68 3.44 11.07C2.54 10.47 1.83 9.61 1.42 8.61C1.01 7.6 0.89 6.49 1.1 5.43C1.32 4.36 1.84 3.38 2.61 2.61C3.38 1.84 4.36 1.32 5.43 1.1C6.49 0.89 7.6 1.01 8.61 1.42C9.61 1.83 10.47 2.54 11.07 3.44C11.68 4.35 12 5.41 12 6.5C12 7.96 11.42 9.36 10.39 10.39C9.36 11.42 7.96 12 6.5 12ZM10.5 6.5C10.5 6.63 10.45 6.76 10.36 6.85C10.27 6.95 10.14 7 10 7H6.5C6.36 7 6.23 6.95 6.14 6.85C6.05 6.76 6 6.63 6 6.5V3C6 2.87 6.05 2.74 6.14 2.64C6.23 2.55 6.36 2.5 6.5 2.5C6.64 2.5 6.77 2.55 6.86 2.64C6.95 2.74 7 2.87 7 3V6H10C10.14 6 10.27 6.05 10.36 6.15C10.45 6.24 10.5 6.37 10.5 6.5Z" fill="#434652"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33333 8.66667L6 11.3333L12.6667 4.66667" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" stroke="#059669"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.33333 13.3333C0.966667 13.3333 0.652778 13.2028 0.391667 12.9417C0.130556 12.6806 0 12.3667 0 12V2.66667C0 2.3 0.130556 1.98611 0.391667 1.725C0.652778 1.46389 0.966667 1.33333 1.33333 1.33333H2V0H3.33333V1.33333H8.66667V0H10V1.33333H10.6667C11.0333 1.33333 11.3472 1.46389 11.6083 1.725C11.8694 1.98611 12 2.3 12 2.66667V12C12 12.3667 11.8694 12.6806 11.6083 12.9417C11.3472 13.2028 11.0333 13.3333 10.6667 13.3333H1.33333ZM1.33333 12H10.6667V5.33333H1.33333V12ZM1.33333 4H10.6667V2.66667H1.33333V4Z" fill="#02368C"/>
  </svg>
);

const VerifiedBadgeIcon = () => (
  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.43333 12.25L3.325 10.3833L1.225 9.91667L1.42917 7.75833L0 6.125L1.42917 4.49167L1.225 2.33333L3.325 1.86667L4.43333 0L6.41667 0.845833L8.4 0L9.50833 1.86667L11.6083 2.33333L11.4042 4.49167L12.8333 6.125L11.4042 7.75833L11.6083 9.91667L9.50833 10.3833L8.4 12.25L6.41667 11.4042L4.43333 12.25ZM5.80417 8.19583L9.1 4.9L8.28333 4.05417L5.80417 6.53333L4.55 5.30833L3.73333 6.125L5.80417 8.19583Z" fill="#002260"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.166 4.999C5.06114 4.963 7.84481 3.87746 10 1.944C12.155 3.87782 14.9387 4.96373 17.834 5C17.944 5.65 18 6.32 18 7.001C18 12.226 14.66 16.671 10 18.318C5.34 16.67 2 12.225 2 7C2 6.318 2.057 5.65 2.166 4.999ZM13.707 8.707C14.086 8.31462 14.0806 7.69091 13.6948 7.30518C13.3091 6.91945 12.6854 6.91403 12.293 7.293L9 10.586L7.707 9.293C7.31462 8.91403 6.69092 8.91945 6.30518 9.30518C5.91945 9.69091 5.91403 10.3146 6.293 10.707L8.293 12.707C8.6835 13.0974 9.3165 13.0974 9.707 12.707L13.707 8.707Z" fillRule="evenodd" clipRule="evenodd" fill="#0F52D6"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.75 8.75H1.25V1.25H5V0H1.25C0.5625 0 0 0.5625 0 1.25V8.75C0 9.4375 0.5625 10 1.25 10H8.75C9.4375 10 10 9.4375 10 8.75V5H8.75V8.75ZM6.25 0V1.25H8.125L2.6625 6.7125L3.5375 7.5875L9 2.125V4H10.25V0H6.25Z" fill="#02368C"/>
  </svg>
);

export interface JobRequestDetailData {
  id: string;
  bookingId: string;
  serviceTitle: string;
  location: string;
  locationCode: string;
  bookedDate: string;
  bookedTime: string;
  category: string;
  serviceDetails: string[];
  estimatedDate: string;
  estimatedTime: string;
  estimatedDuration: string;
  customerIssue: string;
  evidencePhotos: string[];
  serviceAmount: number;
  platformFee: number;
  totalAmount: number;
  escrowHeld: number;
  customerName: string;
  customerInitials: string;
  memberSince: string;
  servicesBooked: number;
  address: string[];
  ghanaPostCode: string;
}

interface JobRequestDetailProps {
  job?: JobRequestDetailData;
  onAccept?: () => void;
  onDecline?: () => void;
}

const defaultJob: JobRequestDetailData = {
  id: "1",
  bookingId: "#KB-12345",
  serviceTitle: "AC Servicing",
  location: "East Legon, Greater Accra",
  locationCode: "GA-382-0192",
  bookedDate: "Oct 24, 2024",
  bookedTime: "08:30 GMT",
  category: "AC Servicing",
  serviceDetails: [
    "AC Servicing × 1",
    "Foam-Jet Cleaning",
    "Filter Cleaning",
    "Basic Performance Check",
  ],
  estimatedDate: "Today, Oct 24, 2024",
  estimatedTime: "09:00 - 13:00 GMT",
  estimatedDuration: "4.0 hrs",
  customerIssue: "My AC is not cooling properly and is making a strange noise.",
  evidencePhotos: [
    "/images/vendor/ac-photo-1.png",
    "/images/vendor/ac-photo-2.png",
    "/images/vendor/ac-photo-3.png",
  ],
  serviceAmount: 150,
  platformFee: 5,
  totalAmount: 155,
  escrowHeld: 150,
  customerName: "Akua Mensah",
  customerInitials: "AM",
  memberSince: "Feb 2023",
  servicesBooked: 14,
  address: ["Plot 14, Boundary Road", "East Legon, Accra"],
  ghanaPostCode: "GA-382-0192",
};

export function JobRequestDetail({
  job = defaultJob,
  onAccept,
  onDecline,
}: JobRequestDetailProps) {
  return (
    <div className="flex flex-col gap-8 px-8 py-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <Link href="/vendor/jobs" className="flex items-center">
            <BackArrowIcon />
          </Link>
          <div
            className="flex items-center gap-1 text-[12px]"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            <Link href="/vendor/jobs" className="text-[#475569] hover:underline">Jobs</Link>
            <span className="text-[#475569]">/</span>
            <Link href="/vendor/jobs" className="text-[#475569] hover:underline">Job Requests</Link>
            <span className="text-[#475569]">/</span>
            <span className="text-[#111]">{job.bookingId}: {job.serviceTitle}</span>
          </div>
        </div>

        {/* Title Row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1
              className="text-[30px] font-medium text-[#111827] leading-[1.2]"
              style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
            >
              {job.bookingId} — {job.serviceTitle}
            </h1>
            <div className="flex items-center gap-4 text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
              <div className="flex items-center gap-1">
                <LocationPinIcon />
                <span>{job.location} ({job.locationCode})</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <ClockIcon />
                <span>Booked {job.bookedDate} at {job.bookedTime}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[6px]">
            <button
              onClick={onDecline}
              className="bg-white border border-[#ff3b30] rounded-lg px-7 py-[14px] text-[16px] text-[#ff3b30] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-red-50 transition-colors"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              className="bg-[#02368c] border border-[#02368c] rounded-lg px-7 py-[14px] text-[16px] text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#02368c]/90 transition-colors"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-3">
        <div className="flex gap-2">
          {/* Left Column - Service Specifications */}
          <div className="flex-1 bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="border-b border-black/[0.12] px-5 py-[18px]">
              <h2 className="text-[16px] font-medium text-[#222]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                Service Specifications
              </h2>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {/* Category & Type */}
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                  Category & Type
                </label>
                <div className="bg-[#eef4ff]/70 rounded p-3">
                  <span className="text-[14px] font-semibold text-[#121c28]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                    {job.category}
                  </span>
                </div>
              </div>

              {/* Service Details */}
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                  Service Details
                </label>
                <div className="bg-[#eef4ff]/70 rounded p-3 flex flex-col gap-2">
                  {job.serviceDetails.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckIcon />
                      <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimated Duration */}
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                  Estimated Duration
                </label>
                <div className="bg-[#eef4ff]/70 rounded p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <CalendarIcon />
                    <span className="text-[13px] font-medium text-[#121c28]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                      {job.estimatedDate}
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#002260]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                    {job.estimatedTime} ({job.estimatedDuration})
                  </span>
                </div>
              </div>

              {/* Customer Issue */}
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                  Customer Issue
                </label>
                <div className="bg-[#eef4ff]/70 rounded p-3">
                  <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                    "{job.customerIssue}"
                  </span>
                </div>
              </div>

              {/* Evidence Photos */}
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                  Evidence Photos
                </label>
                <div className="flex gap-2">
                  {job.evidencePhotos.map((photo, index) => (
                    <div key={index} className="w-[143px] h-[143px] bg-[#f1f5f9] rounded-lg overflow-hidden">
                      <Image
                        src={photo}
                        alt={`Evidence photo ${index + 1}`}
                        width={143}
                        height={143}
                        className="w-full h-full object-cover"
                      />
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
                <h2 className="text-[16px] font-medium text-[#222]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                  Payment Details
                </h2>
              </div>
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between px-[10px]">
                  <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                    Service Amount
                  </span>
                  <span className="text-[12px] font-bold text-[#121c28]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                    ₵{job.serviceAmount}
                  </span>
                </div>
                <div className="flex items-center justify-between px-[10px]">
                  <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                    Platform Fee (3%)
                  </span>
                  <span className="text-[12px] font-bold text-[#121c28]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                    ₵{job.platformFee}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-[#eef4ff] rounded p-[10px]">
                  <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                    Service Amount
                  </span>
                  <span className="text-[12px] font-bold text-[#121c28]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                    ₵{job.totalAmount}
                  </span>
                </div>
                <div className="flex items-center justify-between px-[10px]">
                  <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                    Escrow Held
                  </span>
                  <span className="text-[12px] font-bold text-[#34c759]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                    ₵{job.escrowHeld}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="border-b border-black/[0.12] px-5 py-[18px] flex items-center justify-between">
                <h2 className="text-[16px] font-medium text-[#222]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                  Customer Details
                </h2>
                <div className="bg-[#e5eeff] rounded-xl px-[10px] py-[3px] flex items-center gap-1">
                  <VerifiedBadgeIcon />
                  <span className="text-[11px] font-semibold text-[#002260] tracking-[0.33px]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                    VERIFIED USER
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-4">
                {/* Customer Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#e5eeff] rounded-full flex items-center justify-center">
                    <span className="text-[18px] font-medium text-[#002260] tracking-[-0.18px]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                      {job.customerInitials}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-[#121c28] tracking-[-0.075px]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                      {job.customerName}
                    </span>
                    <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                      Member since {job.memberSince} • {job.servicesBooked} Services Booked
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-[#eef4ff] rounded p-[10px] flex items-start justify-between">
                  <div className="flex items-start gap-2 pt-[2px]">
                    <LocationPinIcon />
                    <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                      Address
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex flex-col items-end text-[12px] text-[#555]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                      {job.address.map((line, index) => (
                        <span key={index}>{line}</span>
                      ))}
                      <span>GhanaPost: {job.ghanaPostCode}</span>
                    </div>
                    <a href="#" className="flex items-center gap-1 text-[12px] text-[#02368c] underline" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                      Open in Maps
                      <ExternalLinkIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Card */}
            <div className="bg-[#eef5ff]/60 border border-[#d9e8ff] rounded-2xl p-[21px] flex gap-[14px]">
              <div className="pt-[2px]">
                <ShieldCheckIcon />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-medium text-[#0f172a]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                  Your Safety Matters
                </span>
                <span className="text-[12px] text-[#475569]" style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}>
                  All payments are secured and released only after job completion.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
