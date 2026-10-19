"use client";

import Link from "next/link";
import Image from "next/image";

const BackArrowIcon = () => (
  <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM11 3.5L1 3.5V4.5L11 4.5V3.5Z" fill="#475569"/>
  </svg>
);

const LocationPinIcon = () => (
  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 3.14286C5.00556 3.14286 4.52222 3.29043 4.11108 3.56651C3.69995 3.84259 3.37952 4.23456 3.19029 4.69162C3.00106 5.14868 2.95157 5.65044 3.04806 6.13507C3.14455 6.6197 3.38261 7.06543 3.73223 7.41505C4.08186 7.76467 4.5276 8.00274 5.01222 8.09922C5.49684 8.19571 5.99861 8.14622 6.45567 7.95699C6.91273 7.76777 7.30469 7.44733 7.58078 7.0362C7.85686 6.62506 8.00442 6.14173 8.00442 5.64729C8.00442 4.98424 7.74099 4.34839 7.26776 3.87516C6.79454 3.40193 6.15868 3.13851 5.49564 3.13851L5.5 3.14286ZM5.5 7.28571C5.17572 7.28571 4.85888 7.18938 4.58943 7.00915C4.31998 6.82892 4.11005 6.57311 3.98628 6.27222C3.86251 5.97133 3.83034 5.63929 3.89385 5.31928C3.95737 4.99927 4.11369 4.70571 4.34327 4.47613C4.57285 4.24655 4.86641 4.09023 5.18642 4.02671C5.50643 3.9632 5.83847 3.99537 6.13936 4.11914C6.44025 4.24291 6.69606 4.45284 6.87629 4.72229C7.05652 4.99174 7.15285 5.30858 7.15285 5.63286C7.15285 6.07107 6.97868 6.49137 6.66672 6.80333C6.35477 7.11529 5.93446 7.28946 5.49625 7.28946L5.5 7.28571ZM5.5 0C4.04293 0.00170858 2.64602 0.580865 1.61343 1.61343C0.580865 2.64602 0.00170858 4.04293 0 5.5C0 7.52857 0.892857 9.68143 2.58643 11.7243C3.34669 12.6478 4.20339 13.4893 5.14286 14.2343C5.22571 14.2953 5.32486 14.3281 5.42679 14.3281C5.52871 14.3281 5.62786 14.2953 5.71071 14.2343C6.64827 13.4888 7.50283 12.6473 8.26071 11.7243C9.95429 9.68143 10.85 7.52857 10.85 5.5C10.8483 4.04293 10.2691 2.64602 9.23657 1.61343C8.20398 0.580865 6.80707 0.00170858 5.35 0H5.5ZM5.5 13.3571C4.48714 12.5157 0.982857 9.42857 0.982857 5.71429C0.982857 4.51671 1.45851 3.36817 2.30548 2.5212C3.15246 1.67422 4.30099 1.19857 5.49857 1.19857C6.69614 1.19857 7.84468 1.67422 8.69166 2.5212C9.53864 3.36817 10.0143 4.51671 10.0143 5.71429C10.0143 9.42714 6.51 12.5157 5.5 13.3571Z" fill="#434652"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 0C5.21442 0 3.95772 0.381218 2.8888 1.09545C1.81988 1.80968 0.986756 2.82484 0.494786 4.01256C0.00281635 5.20028 -0.125909 6.50721 0.124899 7.76809C0.375708 9.02896 0.994767 10.1872 1.90381 11.0962C2.81285 12.0052 3.97104 12.6243 5.23191 12.8751C6.49279 13.1259 7.79972 12.9972 8.98744 12.5052C10.1752 12.0132 11.1903 11.1801 11.9046 10.1112C12.6188 9.04228 13 7.78558 13 6.5C12.9981 4.77685 12.3127 3.12507 11.0938 1.90619C9.87493 0.687305 8.22315 0.00182149 6.5 0ZM6.5 12.0385C5.40555 12.0385 4.33523 11.7134 3.42308 11.1064C2.51094 10.4994 1.79663 9.63809 1.36869 8.63059C0.940748 7.62309 0.818132 6.51416 1.01569 5.44368C1.21325 4.3732 1.72257 3.38593 2.47675 2.60675C3.23094 1.82756 4.19929 1.28629 5.26286 1.05318C6.32643 0.820076 7.43956 0.905213 8.46227 1.29783C9.48499 1.69045 10.3718 2.37323 11.0107 3.26021C11.6497 4.1472 12.0115 5.20152 12.0385 6.2956V6.5C12.0368 7.96818 11.4527 9.37535 10.4141 10.4141C9.37535 11.4527 7.96818 12.0368 6.5 12.0385ZM10.5192 6.5C10.5192 6.63261 10.4666 6.75979 10.3728 6.85355C10.2791 6.94732 10.1519 7 10.0192 7H6.5C6.36739 7 6.24021 6.94732 6.14645 6.85355C6.05268 6.75979 6 6.63261 6 6.5V3C6 2.86739 6.05268 2.74022 6.14645 2.64645C6.24021 2.55268 6.36739 2.5 6.5 2.5C6.63261 2.5 6.75979 2.55268 6.85355 2.64645C6.94732 2.74022 7 2.86739 7 3V6H10.0192C10.1519 6 10.2791 6.05268 10.3728 6.14645C10.4668 6.24022 10.5192 6.36739 10.5192 6.5Z" fill="#434652"/>
  </svg>
);

const CheckmarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66667 10.1147L12.7947 3.98599L13.738 4.92866L6.66667 12L2.42401 7.75733L3.36667 6.81466L6.66667 10.1147Z" fill="#02368C"/>
  </svg>
);

const CheckboxEmptyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="13" height="13" rx="1.5" stroke="#D1D5DB"/>
  </svg>
);

const CheckboxCompletedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="13" height="13" rx="1.17308" fill="#FEAD4D"/>
    <rect x="0.5" y="0.5" width="13" height="13" rx="1.17308" stroke="#FEAD4D"/>
    <path d="M10.7971 4.73163L5.82034 9.70843C5.79146 9.73735 5.75715 9.76029 5.71939 9.77595C5.68163 9.7916 5.64115 9.79966 5.60028 9.79966C5.5594 9.79966 5.51892 9.7916 5.48116 9.77595C5.4434 9.76029 5.4091 9.73735 5.38021 9.70843L3.20286 7.53108C3.14449 7.47272 3.1117 7.39356 3.1117 7.31101C3.1117 7.22847 3.14449 7.14931 3.20286 7.09095C3.26122 7.03258 3.34038 6.99979 3.42293 6.99979C3.50547 6.99979 3.58463 7.03258 3.64299 7.09095L5.60028 9.04862L10.357 4.2915C10.4154 4.23313 10.4945 4.20034 10.5771 4.20034C10.6596 4.20034 10.7388 4.23313 10.7971 4.2915C10.8555 4.34986 10.8883 4.42902 10.8883 4.51156C10.8883 4.59411 10.8555 4.67327 10.7971 4.73163Z" fill="white"/>
  </svg>
);

const CheckboxInProgressIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="13" height="13" rx="1.17308" stroke="#FEAD4D"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.875 8.9375V10.5625C1.875 10.994 2.04725 11.4077 2.35372 11.7142C2.66019 12.0206 3.07409 12.1929 3.50556 12.1929H11.4444C11.8759 12.1929 12.2898 12.0206 12.5963 11.7142C12.9027 11.4077 13.075 10.994 13.075 10.5625V8.9375M10.6319 4.47569L7.475 1.31875M7.475 1.31875L4.31806 4.47569M7.475 1.31875V8.9375" stroke="#02368C" strokeWidth="1.21875" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6667 11.28V13.28C14.6675 13.4657 14.6294 13.6495 14.5551 13.8196C14.4809 13.9897 14.372 14.1424 14.2356 14.2679C14.0993 14.3934 13.9384 14.489 13.7629 14.5485C13.5873 14.608 13.4012 14.6301 13.216 14.6133C11.1619 14.3904 9.19137 13.6894 7.46004 12.5667C5.84926 11.5431 4.48359 10.1774 3.46004 8.56667C2.33336 6.82748 1.6322 4.84737 1.41337 2.784C1.39671 2.59945 1.41862 2.41393 1.47774 2.23887C1.53686 2.06382 1.63197 1.90325 1.75679 1.76696C1.88161 1.63067 2.03348 1.52159 2.20281 1.44678C2.37215 1.37196 2.55525 1.33302 2.74071 1.33333H4.74071C5.06363 1.33016 5.37719 1.44473 5.62174 1.65569C5.8663 1.86665 6.02536 2.15963 6.07004 2.48C6.15304 3.12006 6.30963 3.74847 6.53671 4.35333C6.62974 4.59196 6.64915 4.85126 6.59262 5.10057C6.5361 5.34988 6.40603 5.57874 6.21671 5.76L5.39337 6.58333C6.34241 8.26437 7.73567 9.65763 9.41671 10.6067L10.24 9.78333C10.4213 9.59402 10.6502 9.46395 10.8995 9.40742C11.1488 9.3509 11.4081 9.37031 11.6467 9.46333C12.2516 9.69041 12.88 9.847 13.52 9.93C13.8439 9.97518 14.1396 10.1373 14.3511 10.3862C14.5625 10.6351 14.6748 10.9538 14.6667 11.28Z" stroke="#02368C" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MessageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 7.66669C14.0023 8.5466 13.7967 9.41464 13.4 10.2C12.9296 11.1412 12.2065 11.9328 11.3116 12.4862C10.4168 13.0396 9.38554 13.3329 8.33333 13.3334C7.45342 13.3356 6.58538 13.13 5.8 12.7334L2 14L3.26667 10.2C2.87 9.41464 2.66444 8.5466 2.66667 7.66669C2.66707 6.61448 2.96041 5.58323 3.51381 4.68839C4.0672 3.79355 4.85884 3.07044 5.8 2.60002C6.58538 2.20342 7.45342 1.99786 8.33333 2.00002H8.66667C10.0562 2.07668 11.3687 2.66319 12.3528 3.64726C13.3368 4.63132 13.9233 5.94379 14 7.33335V7.66669Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckmarkActionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 18.3334C10 18.3334 16.6667 15 16.6667 10V4.16669L10 1.66669L3.33334 4.16669V10C3.33334 15 10 18.3334 10 18.3334Z" stroke="#02368C" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 10L9.16667 11.6667L12.5 8.33331" stroke="#02368C" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VerifiedIcon = () => (
  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 0L8.024 1.30267L10.0043 1.01133L10.3227 2.98533L12.0623 4.02267L11.1667 5.8L12.0623 7.57733L10.3227 8.61467L10.0043 10.5887L8.024 10.2973L6.5 11.6L4.976 10.2973L2.99567 10.5887L2.67733 8.61467L0.9377 7.57733L1.83333 5.8L0.9377 4.02267L2.67733 2.98533L2.99567 1.01133L4.976 1.30267L6.5 0Z" fill="#02368C"/>
    <path d="M4.5 5.8L6 7.3L9 4.3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 5.41667V8.33333C7.5 8.55435 7.4122 8.76631 7.25592 8.92259C7.09964 9.07887 6.88768 9.16667 6.66667 9.16667H1.66667C1.44565 9.16667 1.23369 9.07887 1.07741 8.92259C0.921131 8.76631 0.833333 8.55435 0.833333 8.33333V3.33333C0.833333 3.11232 0.921131 2.90036 1.07741 2.74408C1.23369 2.5878 1.44565 2.5 1.66667 2.5H4.58333M6.25 0.833333H9.16667V3.75M4.16667 5.83333L9.16667 0.833333" stroke="#02368C" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 1H9.5V0.5C9.5 0.367392 9.44732 0.240215 9.35355 0.146447C9.25979 0.0526784 9.13261 0 9 0C8.86739 0 8.74021 0.0526784 8.64645 0.146447C8.55268 0.240215 8.5 0.367392 8.5 0.5V1H3.5V0.5C3.5 0.367392 3.44732 0.240215 3.35355 0.146447C3.25979 0.0526784 3.13261 0 3 0C2.86739 0 2.74021 0.0526784 2.64645 0.146447C2.55268 0.240215 2.5 0.367392 2.5 0.5V1H1C0.734784 1 0.48043 1.10536 0.292893 1.29289C0.105357 1.48043 0 1.73478 0 2V12C0 12.2652 0.105357 12.5196 0.292893 12.7071C0.48043 12.8946 0.734784 13 1 13H11C11.2652 13 11.5196 12.8946 11.7071 12.7071C11.8946 12.5196 12 12.2652 12 12V2C12 1.73478 11.8946 1.48043 11.7071 1.29289C11.5196 1.10536 11.2652 1 11 1Z" fill="#02368C"/>
  </svg>
);

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

export interface BookingDetailData {
  id: string;
  bookingId: string;
  serviceName: string;
  type: "contract" | "one-time";
  status: "in-progress" | "upcoming" | "completed" | "cancelled";
  location: string;
  locationCode: string;
  bookedDate: string;
  checklist: ChecklistItem[];
  serviceCategory: string;
  serviceDetails: string[];
  estimatedDate: string;
  estimatedTime: string;
  estimatedDuration: string;
  customerIssue: string;
  evidencePhotos: string[];
  afterImages?: string[];
  confirmationNote?: string;
  payment: {
    serviceAmount: number;
    platformFee: number;
    platformFeePercent: number;
    escrowHeld: number;
    yourEarnings: number;
  };
  customer: {
    name: string;
    initials: string;
    memberSince: string;
    servicesBooked: number;
    address: string[];
    postalCode: string;
    isVerified: boolean;
  };
}

interface BookingDetailProps {
  booking?: BookingDetailData;
  onStartJob?: () => void;
  onDeclineJob?: () => void;
  onMarkComplete?: () => void;
}

const defaultBooking: BookingDetailData = {
  id: "1",
  bookingId: "KB-12345",
  serviceName: "AC Servicing",
  type: "contract",
  status: "in-progress",
  location: "East Legon, Greater Accra",
  locationCode: "GA-382-0192",
  bookedDate: "Oct 24, 2024 at 08:30 GMT",
  checklist: [
    { id: "1", title: "Comprehensive AC Servicing × 1", description: "Visual inspection of exterior casing, mount bracket tightness, and initial fan spin vibration.", status: "completed" },
    { id: "2", title: "Clean and sanitize filters", description: "Dismount dual poly-mesh filters, apply high-pressure water rinse, and treat with anti-bacterial agent.", status: "completed" },
    { id: "3", title: "Perform Foam-Jet deep cleaning", description: "High-density chemical foam spray across evaporator cooling fins and rotary blower wheel.", status: "completed" },
    { id: "4", title: "Flush condensate drainage & pan", description: "Vacuum drain line, eliminate algae blocks, and verify zero overflow or wall stains.", status: "in-progress" },
    { id: "5", title: "Final performance & noise verification", description: "Run 10-minute cold test at 18°C. Confirm quiet fan balance and minimum 8°C temperature differential.", status: "pending" },
  ],
  serviceCategory: "AC Servicing",
  serviceDetails: ["AC Servicing × 1", "Foam-Jet Cleaning", "Filter Cleaning", "Basic Performance Check"],
  estimatedDate: "Today, Oct 24, 2024",
  estimatedTime: "09:00 - 13:00 GMT",
  estimatedDuration: "4.0 hrs",
  customerIssue: "\"My AC is not cooling properly and is making a strange noise.\"",
  evidencePhotos: ["/images/vendor/evidence/photo1.jpeg", "/images/vendor/evidence/photo2.jpeg", "/images/vendor/evidence/photo3.jpeg"],
  payment: { serviceAmount: 150, platformFee: 5, platformFeePercent: 3, escrowHeld: 150, yourEarnings: 155 },
  customer: {
    name: "Akua Mensah",
    initials: "AM",
    memberSince: "Feb 2023",
    servicesBooked: 14,
    address: ["Plot 14, Boundary Road", "East Legon, Accra"],
    postalCode: "GA-382-0192",
    isVerified: true,
  },
};

const typeStyles = {
  contract: { borderColor: "border-[#02368c]", textColor: "text-[#02368c]", label: "Contract" },
  "one-time": { borderColor: "border-[#64748b]", textColor: "text-[#64748b]", label: "One-time" },
};

const statusStyles = {
  "in-progress": { borderColor: "border-[#ff9500]", textColor: "text-[#ff9500]", label: "In Progress" },
  upcoming: { borderColor: "border-[#2563eb]", textColor: "text-[#2563eb]", label: "Upcoming" },
  completed: { borderColor: "border-[#059669]", textColor: "text-[#059669]", label: "Completed" },
  cancelled: { borderColor: "border-[#ef4444]", textColor: "text-[#ef4444]", label: "Cancelled" },
};

const checklistItemStatusStyles = {
  completed: { borderColor: "border-[#34c759]", textColor: "text-[#34c759]", label: "Completed" },
  "in-progress": { borderColor: "border-[#ff9500]", textColor: "text-[#ff9500]", label: "In Progress" },
  pending: { borderColor: "border-gray-400/55", textColor: "text-gray-400/55", label: "Pending" },
};

export function BookingDetail({ booking = defaultBooking, onStartJob, onDeclineJob, onMarkComplete }: BookingDetailProps) {
  const typeStyle = typeStyles[booking.type];
  const statusStyle = statusStyles[booking.status];
  const completedTasks = booking.checklist.filter(t => t.status === "completed").length;
  const progress = Math.round((completedTasks / booking.checklist.length) * 100);
  const isOngoing = booking.status === "in-progress";
  const isCompleted = booking.status === "completed";

  return (
    <div className="flex flex-col gap-8 px-8 py-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <Link href="/vendor/jobs/bookings" className="flex items-center">
            <BackArrowIcon />
          </Link>
          <div className="flex items-center gap-1 text-[12px]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
            <Link href="/vendor/jobs" className="text-[#475569] hover:underline">Jobs</Link>
            <span className="text-[#475569]">/</span>
            <Link href="/vendor/jobs/bookings" className="text-[#475569] hover:underline">Job Bookings</Link>
            <span className="text-[#475569]">/</span>
            <span className="text-[#111]">#{booking.bookingId}: {booking.serviceName}</span>
          </div>
        </div>

        {/* Title Row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <h1 className="text-[30px] font-medium text-[#111827] leading-[1.2]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                #{booking.bookingId} — {booking.serviceName}
              </h1>
              <div className="flex items-center gap-1">
                <span className={`px-1.5 py-0.5 text-[12px] border rounded-full ${typeStyle.borderColor} ${typeStyle.textColor}`} style={{ fontFamily: "Lato, sans-serif" }}>
                  {typeStyle.label}
                </span>
                <span className={`px-1.5 py-0.5 text-[12px] border rounded-full ${statusStyle.borderColor} ${statusStyle.textColor}`} style={{ fontFamily: "Lato, sans-serif" }}>
                  {statusStyle.label}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
              <div className="flex items-center gap-1">
                <LocationPinIcon />
                <span>{booking.location} ({booking.locationCode})</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <ClockIcon />
                <span>Booked {booking.bookedDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {isCompleted ? (
              <button
                className="flex items-center gap-2 px-7 py-3.5 border border-[#34c759] rounded-lg text-[16px] text-white bg-[#34c759] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] cursor-default"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <CheckmarkActionIcon />
                Job Completed
              </button>
            ) : (
              <>
                <button
                  onClick={onDeclineJob}
                  className="px-7 py-3.5 border border-[#ff3b30] rounded-lg text-[16px] text-[#ff3b30] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Decline Job
                </button>
                {isOngoing ? (
                  <button
                    onClick={onMarkComplete}
                    className="flex items-center gap-2 px-7 py-3.5 border border-[#02368c] rounded-lg text-[16px] text-white bg-[#02368c] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    <CheckmarkActionIcon />
                    Mark Job as Complete
                  </button>
                ) : (
                  <button
                    onClick={onStartJob}
                    className="px-7 py-3.5 border border-[#02368c] rounded-lg text-[16px] text-white bg-[#02368c] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Start Job
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl p-3 flex flex-col gap-2">
        {/* On-site Task Verification Checklist */}
        <div className="border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="border-b border-black/[0.12] px-5 py-[18px]">
            <h2 className="text-[16px] font-medium text-[#222]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
              On-site task Verification Checklist
            </h2>
          </div>
          <div className="px-4 pt-3 pb-4 flex flex-col gap-3">
            {/* Progress */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[12px]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                <span className="text-[#222]">Task {completedTasks} of {booking.checklist.length} Done</span>
                <span className="font-bold text-[#222]">{progress}%</span>
              </div>
              <div className="h-2 bg-[#e5eeff] rounded-xl overflow-hidden">
                <div className="h-full bg-[#02368c] rounded-xl" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="flex flex-col pt-1">
              {booking.checklist.map((item) => {
                const itemStatusStyle = checklistItemStatusStyles[item.status];
                return (
                  <div key={item.id} className="flex items-center justify-between p-2.5 rounded">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="pt-0.5">
                        {item.status === "completed" ? (
                          <CheckboxCompletedIcon />
                        ) : item.status === "in-progress" ? (
                          <CheckboxInProgressIcon />
                        ) : (
                          <CheckboxEmptyIcon />
                        )}
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-[12px] font-semibold text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                          {item.title}
                        </span>
                        <span className="text-[12px] text-[#424655]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                          {item.description}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-1.5 py-0.5 text-[12px] border rounded-full ${itemStatusStyle.borderColor} ${itemStatusStyle.textColor}`}
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      {itemStatusStyle.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* After Images */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>After Images</span>
              <div className="flex gap-2 items-center">
                {booking.afterImages?.map((photo, i) => (
                  <div key={i} className="w-36 h-36 rounded-lg overflow-hidden">
                    <Image src={photo} alt={`After ${i + 1}`} width={144} height={144} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-36 h-36 border border-dashed border-[#02368c]/60 rounded-md flex flex-col items-center justify-center gap-2">
                  <UploadIcon />
                  <span className="text-[12px] text-[#02368c]" style={{ fontFamily: "Roboto, sans-serif" }}>Upload Images</span>
                </div>
              </div>
            </div>

            {/* Confirmation Note */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Write a confirmation note</span>
              <div className="bg-[rgba(238,244,255,0.7)] rounded p-3 min-h-[56px]">
                {booking.confirmationNote ? (
                  <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                    {booking.confirmationNote}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Two-column section */}
        <div className="flex gap-2">
          {/* Left: Service Specifications */}
          <div className="flex-1 border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="border-b border-black/[0.12] px-5 py-[18px]">
              <h2 className="text-[16px] font-medium text-[#222]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                Service Specifications
              </h2>
            </div>
            <div className="px-4 py-4 flex flex-col gap-3">
              {/* Category & Type */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Category & Type</span>
                <div className="bg-[rgba(238,244,255,0.7)] rounded p-3">
                  <span className="text-[14px] font-semibold text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                    {booking.serviceCategory}
                  </span>
                </div>
              </div>

              {/* Service Details */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Service Details</span>
                <div className="bg-[rgba(238,244,255,0.7)] rounded p-3 flex flex-col gap-2">
                  {booking.serviceDetails.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckmarkIcon />
                      <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimated Duration */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Estimated Duration</span>
                <div className="bg-[rgba(238,244,255,0.7)] rounded p-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon />
                    <span className="text-[13px] font-medium text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                      {booking.estimatedDate}
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#002260]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                    {booking.estimatedTime} ({booking.estimatedDuration})
                  </span>
                </div>
              </div>

              {/* Customer Issue */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Customer Issue</span>
                <div className="bg-[rgba(238,244,255,0.7)] rounded p-3">
                  <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                    {booking.customerIssue}
                  </span>
                </div>
              </div>

              {/* Evidence Photos */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Evidence Photos</span>
                <div className="flex gap-2">
                  {booking.evidencePhotos.map((photo, i) => (
                    <div key={i} className="w-36 h-36 bg-[#f1f5f9] rounded-lg overflow-hidden">
                      <Image src={photo} alt={`Evidence ${i + 1}`} width={144} height={144} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment & Customer Details */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Payment Details */}
            <div className="border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="border-b border-black/[0.12] px-5 py-[18px]">
                <h2 className="text-[16px] font-medium text-[#222]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                  Payment Details
                </h2>
              </div>
              <div className="px-5 py-4 flex flex-col gap-2">
                <div className="flex items-center justify-between px-2.5">
                  <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Service Amount</span>
                  <span className="text-[12px] font-bold text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>₵{booking.payment.serviceAmount}</span>
                </div>
                <div className="flex items-center justify-between px-2.5">
                  <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Platform Fee ({booking.payment.platformFeePercent}%)</span>
                  <span className="text-[12px] font-bold text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>₵{booking.payment.platformFee}</span>
                </div>
                <div className="flex items-center justify-between px-2.5">
                  <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Escrow Held</span>
                  <span className="text-[12px] font-bold text-[#34c759]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>₵{booking.payment.escrowHeld}</span>
                </div>
                <div className="flex items-center justify-between px-2.5 bg-[#eef4ff] rounded p-2.5">
                  <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Your Earnings</span>
                  <span className="text-[12px] font-bold text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>₵{booking.payment.yourEarnings}</span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="border-b border-black/[0.12] px-5 py-[18px] flex items-center justify-between">
                <h2 className="text-[16px] font-medium text-[#222]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                  Customer Details
                </h2>
                {booking.customer.isVerified && (
                  <div className="flex items-center gap-1 bg-[#e5eeff] px-2.5 py-0.5 rounded-xl">
                    <VerifiedIcon />
                    <span className="text-[11px] font-semibold text-[#002260] tracking-wide" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                      VERIFIED USER
                    </span>
                  </div>
                )}
              </div>
              <div className="px-5 py-4 flex flex-col gap-4">
                {/* Customer Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#e5eeff] rounded-full flex items-center justify-center">
                    <span className="text-[18px] font-medium text-[#002260]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                      {booking.customer.initials}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-[#121c28]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                      {booking.customer.name}
                    </span>
                    <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                      Member since {booking.customer.memberSince} • {booking.customer.servicesBooked} Services Booked
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-[#eef4ff] rounded p-2.5 flex items-start justify-between">
                  <div className="flex items-start gap-2 pt-0.5">
                    <LocationPinIcon />
                    <span className="text-[12px] text-[#434652]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>Address</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-right text-[12px] text-[#555]" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                      {booking.customer.address.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                      <p>GhanaPost: {booking.customer.postalCode}</p>
                    </div>
                    <a href="#" className="flex items-center gap-1 text-[12px] text-[#02368c] underline" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
                      Open in Maps
                      <ExternalLinkIcon />
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2">
                  <button className="flex items-center gap-2 px-4 py-3 border border-[#02368c] rounded-md text-[12px] text-[#02368c]" style={{ fontFamily: "Roboto, sans-serif" }}>
                    <PhoneIcon />
                    Call Customer
                  </button>
                  <button className="flex items-center gap-2 px-4 py-3 bg-[#02368c] border border-[#02368c] rounded-md text-[12px] text-white" style={{ fontFamily: "Roboto, sans-serif" }}>
                    <MessageIcon />
                    Message Customer
                  </button>
                </div>
              </div>
            </div>

            {/* Safety Notice */}
            <div className="bg-[rgba(238,245,255,0.6)] border border-[#d9e8ff] rounded-2xl p-5 flex gap-3.5">
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
  );
}
