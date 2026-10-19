"use client";

const ListIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 8.5H7C6.80109 8.5 6.61032 8.57902 6.46967 8.71967C6.32902 8.86032 6.25 9.05109 6.25 9.25V22C6.25 22.3978 6.40804 22.7794 6.68934 23.0607C6.97064 23.342 7.35218 23.5 7.75 23.5H24.25C24.6478 23.5 25.0294 23.342 25.3107 23.0607C25.592 22.7794 25.75 22.3978 25.75 22V9.25C25.75 9.05109 25.671 8.86032 25.5303 8.71967C25.3897 8.57902 25.1989 8.5 25 8.5ZM7.75 14.5H11.5V17.5H7.75V14.5ZM13 14.5H24.25V17.5H13V14.5ZM24.25 10V13H7.75V10H24.25ZM7.75 19H11.5V22H7.75V19ZM24.25 22H13V19H24.25V22Z" fill="#02368C"/>
  </svg>
);

const GridIcon = ({ active }: { active?: boolean }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {active && <rect width="32" height="32" rx="4" fill="#02368C"/>}
    <path d="M23.5 16.75H8.5C8.10218 16.75 7.72064 16.908 7.43934 17.1893C7.15804 17.4706 7 17.8522 7 18.25V22C7 22.3978 7.15804 22.7794 7.43934 23.0607C7.72064 23.342 8.10218 23.5 8.5 23.5H23.5C23.8978 23.5 24.2794 23.342 24.5607 23.0607C24.842 22.7794 25 22.3978 25 22V18.25C25 17.8522 24.842 17.4706 24.5607 17.1893C24.2794 16.908 23.8978 16.75 23.5 16.75ZM23.5 22H8.5V18.25H23.5V22ZM23.5 8.5H8.5C8.10218 8.5 7.72064 8.65804 7.43934 8.93934C7.15804 9.22064 7 9.60218 7 10V13.75C7 14.1478 7.15804 14.5294 7.43934 14.8107C7.72064 15.092 8.10218 15.25 8.5 15.25H23.5C23.8978 15.25 24.2794 15.092 24.5607 14.8107C24.842 14.5294 25 14.1478 25 13.75V10C25 9.60218 24.842 9.22064 24.5607 8.93934C24.2794 8.65804 23.8978 8.5 23.5 8.5ZM23.5 13.75H8.5V10H23.5V13.75Z" fill={active ? "white" : "#02368C"}/>
  </svg>
);

type ViewMode = "list" | "grid";

interface JobRequestsHeaderProps {
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

export function JobRequestsHeader({
  viewMode = "grid",
  onViewModeChange,
}: JobRequestsHeaderProps) {
  return (
    <div className="bg-white border-b border-black/[0.12] flex items-center justify-between px-5 py-[18px]">
      <p
        className="text-[16px] font-medium text-[#222]"
        style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
      >
        Job Requests
      </p>
      <div className="bg-[#f3f5f8] flex items-center p-[2px] rounded">
        <button
          onClick={() => onViewModeChange?.("list")}
          className={`w-8 h-8 flex items-center justify-center rounded ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
        >
          <ListIcon />
        </button>
        <button
          onClick={() => onViewModeChange?.("grid")}
          className="w-8 h-8 flex items-center justify-center"
        >
          <GridIcon active={viewMode === "grid"} />
        </button>
      </div>
    </div>
  );
}
