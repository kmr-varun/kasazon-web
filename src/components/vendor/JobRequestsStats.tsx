"use client";

const LightningIcon = () => (
  <svg width="11" height="13" viewBox="0 0 11.2 12.8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.4 12.8L4.8 8L0 7.2L7.6 0H8.8L6.4 4.8L11.2 5.6L3.6 12.8H2.4V12.8M5.43333 9.4L8.61667 6.4L4.6 5.71667L5.76667 3.4L2.58333 6.41667L6.6 7.08333L5.43333 9.4V9.4M5.6 6.4V6.4V6.4V6.4V6.4V6.4V6.4V6.4" fill="#2563EB"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="10" viewBox="0 0 16.5 12.5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.25 7.25L5.25 11.25L15.25 1.25" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#059669"/>
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14.5 14.5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.25 13.25L13.25 1.25M1.25 1.25L13.25 13.25" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#F43F5E"/>
  </svg>
);

interface JobRequestsStatsProps {
  newRequests?: { value: number; subtitle: string };
  accepted?: { value: number; subtitle: string };
  declined?: { value: number; subtitle: string };
}

export function JobRequestsStats({
  newRequests = { value: 142, subtitle: "Jobs waiting for your response" },
  accepted = { value: 5, subtitle: "Jobs you accepted" },
  declined = { value: 3, subtitle: "Jobs you declined" },
}: JobRequestsStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {/* New Requests */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-[17px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between min-h-[120px]">
        <div className="flex items-center justify-between">
          <span
            className="text-[12px] font-medium text-[#64748b]"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            New Requests
          </span>
          <div className="w-7 h-7 bg-[#eff6ff] rounded-lg flex items-center justify-center">
            <LightningIcon />
          </div>
        </div>
        <div className="pt-3">
          <p
            className="text-[20px] font-medium text-[#0f172a]"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            {newRequests.value}
          </p>
          <p
            className="text-[12px] text-[#94a3b8] h-[22px] flex items-center mt-1"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            {newRequests.subtitle}
          </p>
        </div>
      </div>

      {/* Accepted */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-[17px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between min-h-[120px]">
        <div className="flex items-center justify-between">
          <span
            className="text-[12px] font-medium text-[#64748b]"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            Accepted
          </span>
          <div className="w-7 h-7 bg-[rgba(5,150,105,0.12)] rounded-lg flex items-center justify-center">
            <CheckIcon />
          </div>
        </div>
        <div className="pt-3">
          <p
            className="text-[20px] font-medium text-[#0f172a]"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            {accepted.value}
          </p>
          <p
            className="text-[12px] text-[#64748b] h-[22px] flex items-center mt-1"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            {accepted.subtitle}
          </p>
        </div>
      </div>

      {/* Declined */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-[17px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between min-h-[120px]">
        <div className="flex items-center justify-between">
          <span
            className="text-[12px] font-medium text-[#64748b]"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            Declined
          </span>
          <div className="w-7 h-7 bg-[#fff1f2] rounded-lg flex items-center justify-center">
            <XIcon />
          </div>
        </div>
        <div className="pt-3">
          <p
            className="text-[20px] font-medium text-[#0f172a]"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            {declined.value}
          </p>
          <p
            className="text-[12px] text-[#94a3b8] h-[22px] flex items-center mt-1"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            {declined.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
