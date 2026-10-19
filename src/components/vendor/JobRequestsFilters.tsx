"use client";

const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.40039 7.19995L9.00039 10.8L12.6004 7.19995" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" stroke="#6B7280"/>
  </svg>
);

const ClearFiltersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.66699 2.66655V5.99989H3.05499M13.2923 7.33322C12.9891 4.92397 11.0969 3.02359 8.68897 2.70998C6.28106 2.39637 3.96521 3.74868 3.05499 5.99989M3.05499 5.99989H6.00033M13.3337 13.3332V9.99989H12.9463M12.9463 9.99989C12.0348 12.2497 9.71951 13.6006 7.31239 13.2871C4.90528 12.9736 3.01319 11.0748 2.70833 8.66655M12.9463 9.99989H10.0003" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" stroke="#02368C"/>
  </svg>
);

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options?: FilterOption[];
  onChange?: (value: string) => void;
}

function FilterDropdown({ label, value }: FilterDropdownProps) {
  return (
    <div className="flex-1 min-w-[140px]">
      <label
        className="block text-[12px] text-[#777] mb-1"
        style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
      >
        {label}
      </label>
      <div className="relative">
        <select
          className="w-full bg-white border border-[#e2e8f0]/80 rounded-xl px-[15px] py-[9px] pr-[33px] text-[12px] text-[#334155] appearance-none shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] cursor-pointer"
          style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          defaultValue={value}
        >
          <option value="">{value}</option>
        </select>
        <div className="absolute right-[9px] top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronIcon />
        </div>
      </div>
    </div>
  );
}

interface JobRequestsFiltersProps {
  onClearFilters?: () => void;
}

export function JobRequestsFilters({ onClearFilters }: JobRequestsFiltersProps) {
  const filters = [
    { label: "Service Type", value: "All Services" },
    { label: "Distance", value: "Any Distance" },
    { label: "Date", value: "Any Date" },
    { label: "Price Range", value: "Any Price" },
    { label: "Location", value: "Any Location" },
  ];

  return (
    <div className="flex items-center gap-2 p-4">
      {filters.map((filter) => (
        <FilterDropdown key={filter.label} label={filter.label} value={filter.value} />
      ))}
      <div className="flex items-end h-[54.5px] pb-[2px]">
        <button
          onClick={onClearFilters}
          className="flex items-center gap-[6px] px-3 py-2 rounded-xl text-[14px] font-medium text-[#02368c] uppercase hover:bg-[#02368c]/5 transition-colors"
          style={{ fontFamily: "Roboto Condensed, Roboto, sans-serif" }}
        >
          <ClearFiltersIcon />
          Clear Filters
        </button>
      </div>
    </div>
  );
}
