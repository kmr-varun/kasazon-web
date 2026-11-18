"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { JobRequestDetail, JobAcceptedModal } from "@/src/components/vendor";
import {
  useBookingDetail,
  toJobRequestDetailData,
  toJobAcceptedData,
  type VendorBooking,
} from "@/src/hooks/useVendorJobs";

// Loading skeleton
function DetailSkeleton() {
  return (
    <div className="flex flex-col gap-8 px-8 py-10 animate-pulse">
      <div className="h-8 w-96 bg-gray-200 rounded" />
      <div className="flex gap-2">
        <div className="flex-1 h-96 bg-gray-200 rounded-xl" />
        <div className="flex-1 h-96 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

export default function JobRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : null;

  const { booking, loading, error, refetch, acceptJob, declineJob } =
    useBookingDetail(id, "request");

  const [showAcceptedModal, setShowAcceptedModal] = useState(false);
  const [acceptedBooking, setAcceptedBooking] = useState<VendorBooking | null>(null);

  // Transform raw booking to the shape JobRequestDetail expects
  const jobDetailData = useMemo(() => {
    if (!booking) return undefined;
    return toJobRequestDetailData(booking);
  }, [booking]);

  // Transform raw booking to the shape JobAcceptedModal expects
  const acceptedJobData = useMemo(() => {
    if (!acceptedBooking) return undefined;
    return toJobAcceptedData(acceptedBooking);
  }, [acceptedBooking]);

  const handleAccept = async () => {
    const { data, error: err } = await acceptJob();
    if (!err) {
      // Store the booking for the modal (use current booking data as fallback)
      setAcceptedBooking((data as VendorBooking | null) ?? booking);
      setShowAcceptedModal(true);
    }
  };

  const handleDecline = async () => {
    await declineJob();
    router.push("/vendor/jobs");
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
      <JobRequestDetail
        job={jobDetailData}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
      <JobAcceptedModal
        isOpen={showAcceptedModal}
        onClose={() => setShowAcceptedModal(false)}
        job={acceptedJobData}
        bookingId={id ?? undefined}
      />
    </>
  );
}
