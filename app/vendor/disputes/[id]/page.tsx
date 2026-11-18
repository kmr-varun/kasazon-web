"use client";

import { use } from "react";
import { DisputeDetail } from "@/src/components/vendor";
import { useVendorDisputeDetail } from "@/src/hooks/useVendorDisputes";

interface PageProps {
  params: Promise<{ id: string }>;
}

function DisputeDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8 px-8 py-10 animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded" />
      <div className="h-12 w-96 bg-gray-200 rounded" />
      <div className="flex gap-2">
        <div className="flex-1 h-96 bg-gray-200 rounded-xl" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-48 bg-gray-200 rounded-xl" />
          <div className="h-48 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function DisputeDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const { dispute, loading, error, refetch, sendMessage, addEvidence } =
    useVendorDisputeDetail(id);

  const handleAcceptRework = async () => {
    await sendMessage("I accept the rework request and will address the issues raised.");
  };

  const handleCallCustomer = () => {
    // Phone number would need to come from the dispute details
  };

  const handleMessageCustomer = async () => {
    // Opens messaging UI - for now send a greeting
    await sendMessage("Hello, I wanted to follow up on your dispute.");
  };

  const handleUploadImages = async () => {
    // In a real implementation, this would open a file picker
    // and then call addEvidence with the uploaded URL
  };

  const handleOpenInMaps = () => {
    if (dispute?.location) {
      const query = encodeURIComponent(
        [dispute.location, dispute.customerAddress.postalCode]
          .filter(Boolean)
          .join(", ")
      );
      window.open(`https://maps.google.com?q=${query}`, "_blank");
    }
  };

  if (loading) {
    return <DisputeDetailSkeleton />;
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

  if (!dispute) {
    return (
      <div className="flex flex-col gap-8 px-8 py-10">
        <p className="text-[14px] text-[#777]">Dispute not found.</p>
      </div>
    );
  }

  return (
    <DisputeDetail
      dispute={dispute}
      onAcceptRework={handleAcceptRework}
      onCallCustomer={handleCallCustomer}
      onMessageCustomer={handleMessageCustomer}
      onUploadImages={handleUploadImages}
      onOpenInMaps={handleOpenInMaps}
    />
  );
}
