"use client";

type TabType = "all" | "rework" | "declined";

interface JobRequestsTabsProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export function JobRequestsTabs({
  activeTab = "all",
  onTabChange,
}: JobRequestsTabsProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: "all", label: "All Requests" },
    { id: "rework", label: "Rework Requests" },
    { id: "declined", label: "Declined" },
  ];

  return (
    <div className="bg-white border-b border-black/10 flex items-center gap-2 p-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange?.(tab.id)}
          className={`px-[10px] py-2 rounded-md text-[14px] leading-[1.2] border transition-colors ${
            activeTab === tab.id
              ? "border-[#02368c] bg-[#447fff]/[0.08] text-[#02368c]"
              : "border-black/10 text-[#666] hover:border-[#02368c]/50"
          }`}
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
