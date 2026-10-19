"use client";

import { useState } from "react";

type BookingTab = "all" | "upcoming" | "ongoing" | "completed" | "cancelled";

interface AllBookingsTabsProps {
  activeTab?: BookingTab;
  onTabChange?: (tab: BookingTab) => void;
}

const tabs: { id: BookingTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "ongoing", label: "Ongoing" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export function AllBookingsTabs({
  activeTab: controlledTab,
  onTabChange,
}: AllBookingsTabsProps) {
  const [internalTab, setInternalTab] = useState<BookingTab>("all");
  const activeTab = controlledTab ?? internalTab;

  const handleTabClick = (tab: BookingTab) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="bg-white border-b border-black/10 px-3 py-3">
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-[10px] py-2 text-[14px] rounded-md border transition-colors ${
              activeTab === tab.id
                ? "border-[#02368c] text-[#02368c] bg-[rgba(68,127,255,0.08)]"
                : "border-black/10 text-[#666] hover:border-black/20"
            }`}
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
