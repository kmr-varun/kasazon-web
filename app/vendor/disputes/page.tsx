"use client";

import { useRouter } from "next/navigation";
import {
  DisputesStats,
  DisputesTable,
} from "@/src/components/vendor";
import { useVendorDisputeList } from "@/src/hooks/useVendorDisputes";

function DisputesSkeleton() {
  return (
    <div className="flex flex-col gap-8 px-8 py-10 animate-pulse">
      <div className="h-10 w-36 bg-gray-200 rounded" />
      <div className="flex gap-2">
        <div className="flex-1 h-32 bg-gray-200 rounded-xl" />
        <div className="flex-1 h-32 bg-gray-200 rounded-xl" />
        <div className="flex-1 h-32 bg-gray-200 rounded-xl" />
      </div>
      <div className="h-96 bg-gray-200 rounded-xl" />
    </div>
  );
}

export default function DisputesPage() {
  const router = useRouter();

  const { disputes, total, stats, loading, error, refetch } =
    useVendorDisputeList();

  const handleViewDispute = (disputeId: string) => {
    router.push(`/vendor/disputes/${disputeId}`);
  };

  if (loading) {
    return <DisputesSkeleton />;
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
    <div className="flex flex-col gap-8 px-8 py-10">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1
          className="text-[30px] font-medium text-[#111827] leading-[1.2]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Disputes
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-2">
        <DisputesStats
          reworkRequested={stats.reworkRequested}
          totalDisputes={stats.totalDisputes}
          reworkCompleted={stats.reworkCompleted}
        />
        <DisputesTable
          disputes={disputes}
          total={total}
          onViewDispute={handleViewDispute}
        />
      </div>
    </div>
  );
}
