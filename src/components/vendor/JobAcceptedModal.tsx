"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" stroke="#94A3B8"/>
    <path d="M4 4L12 12" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" stroke="#94A3B8"/>
  </svg>
);

const CheckmarkIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="50" rx="25" fill="#34C759"/>
    <path d="M34.3333 18.5833L21.5 31.4167L15.6667 25.5833" strokeWidth="2.91667" strokeLinecap="round" strokeLinejoin="round" stroke="white"/>
  </svg>
);

const CalendarSmallIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 1V2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#02368C"/>
    <path d="M8 1V2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#02368C"/>
    <path d="M2.5 1.5H9.5C10.0519 1.5 10.5 1.94808 10.5 2.5V9.5C10.5 10.0519 10.0519 10.5 9.5 10.5H2.5C1.94808 10.5 1.5 10.0519 1.5 9.5V2.5C1.5 1.94808 1.94808 1.5 2.5 1.5V1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#02368C"/>
    <path d="M1.5 4.5H10.5" strokeLinecap="round" strokeLinejoin="round" stroke="#02368C"/>
  </svg>
);

const LocationSmallIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 5C10 7.4965 7.2305 10.0965 6.3005 10.8995C6.12252 11.0333 5.87748 11.0333 5.6995 10.8995C4.7695 10.0965 2 7.4965 2 5C2 2.79234 3.79234 1 6 1C8.20766 1 10 2.79234 10 5" strokeLinecap="round" strokeLinejoin="round" stroke="#02368C"/>
    <path d="M4.5 5C4.5 5.82787 5.17213 6.5 6 6.5C6.82787 6.5 7.5 5.82787 7.5 5C7.5 4.17213 6.82787 3.5 6 3.5C5.17213 3.5 4.5 4.17213 4.5 5V5" strokeLinecap="round" strokeLinejoin="round" stroke="#02368C"/>
  </svg>
);

export interface JobAcceptedData {
  serviceTitle: string;
  customerName: string;
  dateTime: string;
  location: string;
  price: number;
  imageUrl?: string;
}

interface JobAcceptedModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: JobAcceptedData;
  bookingId?: string;
}

const defaultJob: JobAcceptedData = {
  serviceTitle: "AC Servicing",
  customerName: "Ama Owusu",
  dateTime: "Today · 3:00 PM",
  location: "12 Airport Road, Accra",
  price: 150,
  imageUrl: "/images/vendor/ac-unit.png",
};

export function JobAcceptedModal({
  isOpen,
  onClose,
  job = defaultJob,
  bookingId,
}: JobAcceptedModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleBackToDashboard = () => {
    onClose();
    router.push("/vendor/dashboard");
  };

  const handleViewBooking = () => {
    onClose();
    if (bookingId) {
      router.push(`/vendor/jobs/active/${bookingId}`);
    } else {
      router.push("/vendor/jobs/active");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white border border-[#f1f5f9] rounded-2xl shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-[460px] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <CloseIcon />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center gap-6 p-6">
          {/* Success Icon */}
          <div className="bg-[#34c759]/10 rounded-full p-1">
            <div className="bg-[#34c759]/20 rounded-full p-[6px]">
              <CheckmarkIcon />
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col items-center gap-3">
            <h2
              className="text-[24px] font-semibold text-[#0f172a] tracking-[-0.5px]"
              style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
            >
              Job Accepted! 🎉
            </h2>
            <p
              className="text-[12px] text-[#777] text-center"
              style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
            >
              Your {job.serviceTitle} job with {job.customerName} has been added
              <br />
              to your bookings.
            </p>
          </div>

          {/* Job Summary Card */}
          <div className="w-full bg-[#f8fafc]/90 border border-[#f1f5f9] rounded-xl p-[15px] flex items-start">
            {/* Image */}
            <div className="w-[110px] h-[93px] border border-[#e2e8f0] rounded-lg overflow-hidden shrink-0">
              <Image
                src={job.imageUrl || "/images/vendor/ac-unit.png"}
                alt={job.serviceTitle}
                width={110}
                height={93}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 pl-[14px] flex flex-col gap-1">
              <h3
                className="text-[16px] font-semibold text-[#0f172a]"
                style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
              >
                {job.serviceTitle}
              </h3>
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <CalendarSmallIcon />
                  <span
                    className="ml-[6px] text-[12px] text-[#777]"
                    style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                  >
                    {job.dateTime}
                  </span>
                </div>
                <div className="flex items-center">
                  <LocationSmallIcon />
                  <span
                    className="ml-[6px] text-[12px] text-[#777]"
                    style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                  >
                    {job.location}
                  </span>
                </div>
                <span
                  className="text-[14px] font-medium text-[#0f172a]"
                  style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                >
                  ₵{job.price}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex gap-[6px]">
            <button
              onClick={handleBackToDashboard}
              className="flex-1 bg-white border border-[#02368c] rounded-lg px-7 py-[14px] text-[16px] text-[#02368c] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#02368c]/5 transition-colors"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleViewBooking}
              className="flex-1 bg-[#02368c] border border-[#02368c] rounded-lg px-7 py-[14px] text-[16px] text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#02368c]/90 transition-colors"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              View Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
