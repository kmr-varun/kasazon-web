"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookingDetail, BookingDetailData, WorkCompletionOTPModal } from "@/src/components/vendor";

const ongoingBooking: BookingDetailData = {
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

const completedBooking: BookingDetailData = {
  ...ongoingBooking,
  status: "completed",
  checklist: ongoingBooking.checklist.map(item => ({ ...item, status: "completed" as const })),
  afterImages: ["/images/vendor/evidence/photo1.jpeg", "/images/vendor/evidence/photo2.jpeg", "/images/vendor/evidence/photo3.jpeg"],
  confirmationNote: "AC was thoroughly foam-jet cleaned and tested successfully. High dust build-up removed from primary evaporator coils and blower wheel lubricated. Operating temperature stabilized at 17.5°C with quiet fan balance. Recommended next filter wash in 90 days.",
};

const upcomingBooking: BookingDetailData = {
  ...ongoingBooking,
  status: "upcoming",
  checklist: ongoingBooking.checklist.map(item => ({ ...item, status: "pending" as const })),
};

export default function BookingDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "ongoing";
  const [showOTPModal, setShowOTPModal] = useState(false);

  const booking = status === "completed" ? completedBooking : status === "upcoming" ? upcomingBooking : ongoingBooking;

  const handleStartJob = () => {
    console.log("Starting job...");
  };

  const handleDeclineJob = () => {
    console.log("Declining job...");
    router.push("/vendor/jobs/bookings");
  };

  const handleMarkComplete = () => {
    setShowOTPModal(true);
  };

  const handleOTPConfirm = (otp: string) => {
    console.log("OTP confirmed:", otp);
    setShowOTPModal(false);
    router.push("/vendor/jobs/bookings/1?status=completed");
  };

  const handleResendOTP = () => {
    console.log("Resending OTP...");
  };

  const handleContactSupport = () => {
    console.log("Contacting support...");
  };

  return (
    <>
      <BookingDetail
        booking={booking}
        onStartJob={handleStartJob}
        onDeclineJob={handleDeclineJob}
        onMarkComplete={handleMarkComplete}
      />
      <WorkCompletionOTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onConfirm={handleOTPConfirm}
        customerName={booking.customer.name}
        onResendOTP={handleResendOTP}
        onContactSupport={handleContactSupport}
      />
    </>
  );
}
