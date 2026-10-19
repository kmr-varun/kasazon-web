"use client";

import Image from "next/image";

interface DisputesStatsProps {
  reworkRequested: number;
  totalDisputes: number;
  reworkCompleted: number;
}

export function DisputesStats({
  reworkRequested = 3,
  totalDisputes = 5,
  reworkCompleted = 12,
}: DisputesStatsProps) {
  return (
    <div className="flex gap-2 w-full">
      {/* Rework Requested */}
      <div className="flex-1 bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] p-5 flex flex-col justify-between min-h-[134px]">
        <div className="flex items-start justify-between">
          <span
            className="text-[14px] text-[#777]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Rework Requested
          </span>
          <Image
            src="/images/icons/disputes/rework-icon.png"
            alt="Rework"
            width={28}
            height={28}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span
            className="text-[28px] font-semibold text-[#111]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            {reworkRequested}
          </span>
          <span
            className="text-[12px] text-[#ff9500]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Pending Confirmation
          </span>
        </div>
      </div>

      {/* Total Disputes */}
      <div className="flex-1 bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] p-5 flex flex-col justify-between min-h-[134px]">
        <div className="flex items-start justify-between">
          <span
            className="text-[14px] text-[#777]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Total Disputes
          </span>
          <Image
            src="/images/icons/disputes/disputes-icon.png"
            alt="Disputes"
            width={28}
            height={28}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span
            className="text-[28px] font-semibold text-[#111]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            {totalDisputes}
          </span>
          <span
            className="text-[12px] text-[#02368c]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Disputes
          </span>
        </div>
      </div>

      {/* Total Rework Completed */}
      <div className="flex-1 bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] p-5 flex flex-col justify-between min-h-[134px]">
        <div className="flex items-start justify-between">
          <span
            className="text-[14px] text-[#777]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Total Rework Completed
          </span>
          <Image
            src="/images/icons/disputes/completed-icon.png"
            alt="Completed"
            width={28}
            height={28}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span
            className="text-[28px] font-semibold text-[#111]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            {reworkCompleted}
          </span>
          <span
            className="text-[12px] text-[#777]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Total Disputes Resolved
          </span>
        </div>
      </div>
    </div>
  );
}
