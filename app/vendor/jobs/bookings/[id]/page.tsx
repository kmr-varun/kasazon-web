"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { BookingDetail, WorkCompletionOTPModal } from "@/src/components/vendor";
import {
  useBookingDetail,
  toBookingDetailData,
} from "@/src/hooks/useVendorJobs";

// Loading skeleton
function DetailSkeleton() {
  return (
    <div className="flex flex-col gap-8 px-8 py-10 animate-pulse">
      <div className="h-8 w-96 bg-gray-200 rounded" />
      <div className="h-6 w-64 bg-gray-200 rounded" />
      <div className="flex flex-col gap-2">
        <div className="h-48 bg-gray-200 rounded-xl" />
        <div className="flex gap-2">
          <div className="flex-1 h-96 bg-gray-200 rounded-xl" />
          <div className="flex-1 h-96 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : null;

  const { booking, loading, error, refetch, releasePayment, cancelBooking } =
    useBookingDetail(id);

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Transform raw booking to the shape BookingDetail component expects
  const bookingDetailData = useMemo(() => {
    if (!booking) return undefined;
    return toBookingDetailData(booking);
  }, [booking]);

  const handleStartJob = () => {
    // Start job is handled on the backend by status transitions
    // For now, navigate to in-progress view by refetching
    refetch();
  };

  const handleDeclineJob = async () => {
    setActionLoading(true);
    setActionError(null);
    const { error: err } = await cancelBooking("vendor_declined");
    setActionLoading(false);
    if (err) {
      setActionError(err.message);
    } else {
      router.push("/vendor/jobs/bookings");
    }
  };

  const handleMarkComplete = () => {
    // Open the OTP modal — the actual release-payment call happens on OTP confirmation
    setShowOTPModal(true);
  };

  const handleOTPConfirm = async (otp: string) => {
    setActionLoading(true);
    setActionError(null);
    const { error: err } = await releasePayment(otp);
    setActionLoading(false);
    if (err) {
      setActionError(err.message);
      // Keep modal open so the vendor can try again
    } else {
      setShowOTPModal(false);
      // Refresh to show completed state
      refetch();
    }
  };

  const handleResendOTP = async () => {
    // Calling release-payment without an OTP re-triggers the OTP flow
    await releasePayment();
  };

  const handleContactSupport = () => {
    router.push("/vendor/support");
  };

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col gap-8 px-8 py-10">
        <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-6 text-center">
          <p className="text-[#dc2626] text-[14px] mb-4">{error.message}</p>
          <button
            onClick={refetch}
            className="bg-[#02368c] text-white px-4 py-2 rounded-lg text-[12px]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {actionError && (
        <div className="mx-8 mt-4 bg-[#fef2f2] border border-[#fecaca] rounded-xl p-3 text-center">
          <p className="text-[#dc2626] text-[13px]">{actionError}</p>
        </div>
      )}
      <BookingDetail
        booking={bookingDetailData}
        onStartJob={handleStartJob}
        onDeclineJob={handleDeclineJob}
        onMarkComplete={handleMarkComplete}
      />
      <WorkCompletionOTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onConfirm={handleOTPConfirm}
        customerName={bookingDetailData?.customer.name ?? "Customer"}
        onResendOTP={handleResendOTP}
        onContactSupport={handleContactSupport}
      />
    </>
  );
}
