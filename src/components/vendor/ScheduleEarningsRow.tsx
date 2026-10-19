"use client";

const ACIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.66667 3.33333H13.3333C14.0692 3.33333 14.6667 3.93078 14.6667 4.66667V8.66667C14.6667 9.40255 14.0692 10 13.3333 10H2.66667C1.93078 10 1.33333 9.40255 1.33333 8.66667V4.66667C1.33333 3.93078 1.93078 3.33333 2.66667 3.33333V3.33333" strokeWidth="1.33333" stroke="#475569"/>
  </svg>
);

const PlumbingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.8 4.2C9.54591 4.45923 9.54591 4.8741 9.8 5.13333L10.8667 6.2C11.1259 6.4541 11.5408 6.4541 11.8 6.2L14.3133 3.68667C14.9997 5.20351 14.6748 6.98691 13.4975 8.16419C12.3202 9.34146 10.5368 9.6664 9.02 8.98L4.41333 13.5867C3.86105 14.139 2.96562 14.139 2.41333 13.5867C1.86105 13.0344 1.86105 12.139 2.41333 11.5867L7.02 6.98C6.3336 5.46316 6.65854 3.67976 7.83581 2.50248C9.01309 1.32521 10.7965 1.00027 12.3133 1.68667L9.80667 4.19333L9.8 4.2" strokeWidth="1.33333" stroke="#475569"/>
  </svg>
);

const CleaningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6667 7.33333C12.6667 9.90894 10.5756 12 8 12M8 12C5.4244 12 3.33333 9.90894 3.33333 7.33333M8 12V14.6667M8 14.6667H5.33333M8 14.6667H10.6667M8 9.33333C9.10383 9.33333 10 8.43716 10 7.33333C10 6.2295 9.10383 5.33333 8 5.33333C6.89617 5.33333 6 6.2295 6 7.33333C6 8.43716 6.89617 9.33333 8 9.33333L12.6667 7.33333" strokeWidth="1.33333" stroke="#475569"/>
  </svg>
);

interface ScheduleItem {
  time: string;
  service: string;
  customer: string;
  distance: string;
  icon: "ac" | "plumbing" | "cleaning";
}

interface EarningsData {
  day: string;
  value: number;
}

interface ScheduleEarningsRowProps {
  scheduleData?: ScheduleItem[];
  earningsData?: EarningsData[];
  monthlyEarnings?: string;
  earningsChange?: string;
}

const defaultScheduleData: ScheduleItem[] = [
  { time: "09:00 AM", service: "AC Servicing", customer: "Ama Owusu", distance: "2.3 km", icon: "ac" },
  { time: "11:30 AM", service: "Plumbing Repair", customer: "Kwame Mensah", distance: "4.1 km", icon: "plumbing" },
  { time: "03:00 PM", service: "Home Cleaning", customer: "Sarah Adams", distance: "3.6 km", icon: "cleaning" },
];

const defaultEarningsData: EarningsData[] = [
  { day: "Mon", value: 600 },
  { day: "Tue", value: 650 },
  { day: "Wed", value: 550 },
  { day: "Thu", value: 750 },
  { day: "Fri", value: 1000 },
  { day: "Sat", value: 875 },
  { day: "Sun", value: 800 },
];

const getServiceIcon = (icon: string) => {
  switch (icon) {
    case "ac":
      return <ACIcon />;
    case "plumbing":
      return <PlumbingIcon />;
    case "cleaning":
      return <CleaningIcon />;
    default:
      return <ACIcon />;
  }
};

export function ScheduleEarningsRow({
  scheduleData = defaultScheduleData,
  earningsData = defaultEarningsData,
  monthlyEarnings = "₵4,850",
  earningsChange = "↑ 12.5% compared to last month",
}: ScheduleEarningsRowProps) {
  const maxEarning = Math.max(...earningsData.map((d) => d.value));
  const chartHeight = 108;

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Today's Schedule */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-[18px] border-b border-[rgba(0,0,0,0.12)]">
          <h3
            className="text-[16px] font-medium text-[#222]"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            Today&apos;s Schedule
          </h3>
          <button
            className="text-[12px] text-[#02368c] border border-[#02368c] px-3 py-2 rounded-md shadow-[0px_1px_1px_0px_rgba(16,24,40,0.05)]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            View Calendar
          </button>
        </div>

        {/* Schedule List */}
        <div className="p-4 pl-10">
          <div className="relative pl-6">
            {/* Timeline line */}
            <div className="absolute left-[5px] top-[8px] bottom-[16px] w-0.5 bg-[#e2e8f0]" />

            <div className="space-y-6">
              {scheduleData.map((item, index) => (
                <div key={index} className="flex items-center gap-3 relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-6 w-3 h-3 bg-white border-[3px] border-[#10b981] rounded-full" />

                  {/* Time */}
                  <div
                    className="w-[113px] text-[12px] text-[#475569]"
                    style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                  >
                    {item.time}
                  </div>

                  {/* Icon */}
                  <div className="w-8 h-8 bg-[#f1f5f9] rounded-lg flex items-center justify-center">
                    {getServiceIcon(item.icon)}
                  </div>

                  {/* Service Info */}
                  <div>
                    <p
                      className="text-[14px] font-medium text-[#0f172a]"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      {item.service}
                    </p>
                    <p
                      className="text-[12px] text-[#777]"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      {item.customer} · {item.distance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-[18px] border-b border-[rgba(0,0,0,0.12)]">
          <h3
            className="text-[16px] font-medium text-[#222]"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            Earnings Overview
          </h3>
          <button
            className="text-[12px] text-[#02368c] border border-[#02368c] px-3 py-2 rounded-md shadow-[0px_1px_1px_0px_rgba(16,24,40,0.05)]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            View Earnings
          </button>
        </div>

        {/* Chart and Summary */}
        <div className="p-4 flex gap-14">
          {/* Bar Chart */}
          <div className="flex-1 pt-6">
            <div className="h-[144px] flex items-end border-b border-[#e2e8f0] pb-2 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between pr-2">
                <span className="text-[9px] text-[#777]" style={{ fontFamily: "Inter, sans-serif" }}>1,500</span>
                <span className="text-[9px] text-[#777]" style={{ fontFamily: "Inter, sans-serif" }}>1,000</span>
                <span className="text-[9px] text-[#777]" style={{ fontFamily: "Inter, sans-serif" }}>500</span>
                <span className="text-[9px] text-[#777]" style={{ fontFamily: "Inter, sans-serif" }}>0</span>
              </div>

              {/* Grid lines */}
              <div className="absolute left-8 right-0 top-0 bottom-8 flex flex-col justify-between opacity-40">
                <div className="border-b border-dashed border-[#e2e8f0]" />
                <div className="border-b border-dashed border-[#e2e8f0]" />
                <div className="border-b border-dashed border-[#e2e8f0]" />
                <div className="border-b border-dashed border-[#e2e8f0]" />
              </div>

              {/* Bars */}
              <div className="flex-1 flex items-end justify-around ml-8">
                {earningsData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className="w-5 bg-[#02368c] rounded-t-md"
                      style={{ height: `${(item.value / 1500) * chartHeight}px` }}
                    />
                    <span
                      className="text-[10px] font-medium text-[#777]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="w-[140px] bg-[#fafafa] rounded-xl px-4 flex flex-col justify-center">
            <p
              className="text-[32px] font-semibold text-[#0f172a]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {monthlyEarnings}
            </p>
            <p
              className="text-[12px] text-[#64748b]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              This Month
            </p>
            <p
              className="text-[11px] font-semibold text-[#059669] mt-9"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {earningsChange}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
