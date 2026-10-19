"use client";

import { useRouter } from "next/navigation";
import {
  DisputesStats,
  DisputesTable,
} from "@/src/components/vendor";

export default function DisputesPage() {
  const router = useRouter();

  const handleViewDispute = (disputeId: string) => {
    router.push(`/vendor/disputes/${disputeId}`);
  };

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
          reworkRequested={3}
          totalDisputes={5}
          reworkCompleted={12}
        />
        <DisputesTable onViewDispute={handleViewDispute} />
      </div>
    </div>
  );
}
