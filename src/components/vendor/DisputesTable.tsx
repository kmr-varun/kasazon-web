"use client";

import { useState } from "react";
import Image from "next/image";

export type DisputeStatus = "disputed" | "rework-completed" | "rework-in-progress";
export type ServiceCategory = "contract" | "one-time";

export interface Dispute {
  id: string;
  bookingId: string;
  customerName: string;
  customerAvatar?: string;
  distance: string;
  amount: number;
  serviceCategory: ServiceCategory;
  serviceDescription: string;
  status: DisputeStatus;
  createdDate: string;
  createdTime: string;
}

interface DisputesTableProps {
  disputes?: Dispute[];
  onViewDispute?: (disputeId: string) => void;
}

const GridViewIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="7" height="7" rx="1" stroke={active ? "#02368c" : "#666"} strokeWidth="1.5"/>
    <rect x="11" y="2" width="7" height="7" rx="1" stroke={active ? "#02368c" : "#666"} strokeWidth="1.5"/>
    <rect x="2" y="11" width="7" height="7" rx="1" stroke={active ? "#02368c" : "#666"} strokeWidth="1.5"/>
    <rect x="11" y="11" width="7" height="7" rx="1" stroke={active ? "#02368c" : "#666"} strokeWidth="1.5"/>
  </svg>
);

const TableViewIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="16" height="3" rx="1" fill={active ? "#02368c" : "#666"}/>
    <rect x="2" y="8.5" width="16" height="3" rx="1" fill={active ? "#02368c" : "#666"}/>
    <rect x="2" y="14" width="16" height="3" rx="1" fill={active ? "#02368c" : "#666"}/>
  </svg>
);

const LocationIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5.5C5.69036 5.5 6.25 4.94036 6.25 4.25C6.25 3.55964 5.69036 3 5 3C4.30964 3 3.75 3.55964 3.75 4.25C3.75 4.94036 4.30964 5.5 5 5.5Z" stroke="#777" strokeWidth="0.8"/>
    <path d="M5 9C7 7 8.5 5.5 8.5 4C8.5 2.067 6.933 0.5 5 0.5C3.067 0.5 1.5 2.067 1.5 4C1.5 5.5 3 7 5 9Z" stroke="#777" strokeWidth="0.8"/>
  </svg>
);

const NavigationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 1.5L5.5 6.5M10.5 1.5L7 10.5L5.5 6.5M10.5 1.5L1.5 5L5.5 6.5" stroke="#02368c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 1L1 3.5L4 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 3.5L1 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 2.5H9M3.5 2.5V1.5C3.5 1.22386 3.72386 1 4 1H6C6.27614 1 6.5 1.22386 6.5 1.5V2.5M8 2.5V9.5C8 9.77614 7.77614 10 7.5 10H2.5C2.22386 10 2 9.77614 2 9.5V2.5H8Z" stroke="#3f484c" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const statusStyles: Record<DisputeStatus, { borderColor: string; textColor: string; label: string }> = {
  "disputed": { borderColor: "border-[#ff9500]", textColor: "text-[#ff9500]", label: "Disputed" },
  "rework-completed": { borderColor: "border-[#34c759]", textColor: "text-[#34c759]", label: "Rework Completed" },
  "rework-in-progress": { borderColor: "border-[#ff9500]", textColor: "text-[#ff9500]", label: "Rework in Progress" },
};

const categoryStyles: Record<ServiceCategory, { label: string }> = {
  "contract": { label: "Contract" },
  "one-time": { label: "One time Service" },
};

const defaultDisputes: Dispute[] = [
  { id: "1", bookingId: "LEND-123", customerName: "Akua Mensah", distance: "1.8 Km Away", amount: 250, serviceCategory: "contract", serviceDescription: "Deep Cleaning", status: "disputed", createdDate: "Tue, 24 Sept 2026", createdTime: "2:30 pm" },
  { id: "2", bookingId: "LEND-123", customerName: "Akua Mensah", distance: "1.8 Km Away", amount: 250, serviceCategory: "one-time", serviceDescription: "Deep Cleaning", status: "rework-completed", createdDate: "Tue, 24 Sept 2026", createdTime: "2:30 pm" },
  { id: "3", bookingId: "LEND-123", customerName: "Akua Mensah", distance: "1.8 Km Away", amount: 250, serviceCategory: "contract", serviceDescription: "Deep Cleaning", status: "rework-in-progress", createdDate: "Tue, 24 Sept 2026", createdTime: "2:30 pm" },
  { id: "4", bookingId: "LEND-123", customerName: "Akua Mensah", distance: "1.8 Km Away", amount: 250, serviceCategory: "contract", serviceDescription: "Deep Cleaning", status: "rework-in-progress", createdDate: "Tue, 24 Sept 2026", createdTime: "2:30 pm" },
  { id: "5", bookingId: "LEND-123", customerName: "Akua Mensah", distance: "1.8 Km Away", amount: 250, serviceCategory: "contract", serviceDescription: "Deep Cleaning", status: "rework-in-progress", createdDate: "Tue, 24 Sept 2026", createdTime: "2:30 pm" },
  { id: "6", bookingId: "LEND-123", customerName: "Akua Mensah", distance: "1.8 Km Away", amount: 250, serviceCategory: "contract", serviceDescription: "Deep Cleaning", status: "rework-in-progress", createdDate: "Tue, 24 Sept 2026", createdTime: "2:30 pm" },
  { id: "7", bookingId: "LEND-123", customerName: "Akua Mensah", distance: "1.8 Km Away", amount: 250, serviceCategory: "contract", serviceDescription: "Deep Cleaning", status: "rework-in-progress", createdDate: "Tue, 24 Sept 2026", createdTime: "2:30 pm" },
  { id: "8", bookingId: "LEND-123", customerName: "Akua Mensah", distance: "1.8 Km Away", amount: 250, serviceCategory: "contract", serviceDescription: "Deep Cleaning", status: "rework-in-progress", createdDate: "Tue, 24 Sept 2026", createdTime: "2:30 pm" },
  { id: "9", bookingId: "LEND-123", customerName: "Akua Mensah", distance: "1.8 Km Away", amount: 250, serviceCategory: "contract", serviceDescription: "Deep Cleaning", status: "rework-in-progress", createdDate: "Tue, 24 Sept 2026", createdTime: "2:30 pm" },
];

type TabType = "all" | "rework-requested" | "completed-reworks";

export function DisputesTable({ disputes = defaultDisputes, onViewDispute }: DisputesTableProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 45;

  const filteredDisputes = activeTab === "rework-requested"
    ? disputes.filter(d => d.status === "rework-in-progress" || d.status === "disputed")
    : activeTab === "completed-reworks"
    ? disputes.filter(d => d.status === "rework-completed")
    : disputes;

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredDisputes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredDisputes.map(d => d.id));
    }
  };

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Header */}
      <div className="border-b border-black/[0.12] px-5 py-[18px] flex items-center justify-between">
        <h2
          className="text-[16px] font-medium text-[#222]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Disputes
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1 rounded ${viewMode === "grid" ? "bg-[#e5eeff]" : ""}`}
          >
            <GridViewIcon active={viewMode === "grid"} />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-1 rounded ${viewMode === "table" ? "bg-[#e5eeff]" : ""}`}
          >
            <TableViewIcon active={viewMode === "table"} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-black/10 p-3 flex gap-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-2.5 py-2 rounded-md text-[14px] border ${
            activeTab === "all"
              ? "border-[#02368c] text-[#02368c] bg-[rgba(68,127,255,0.08)]"
              : "border-black/10 text-[#666]"
          }`}
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("rework-requested")}
          className={`px-2.5 py-2 rounded-md text-[14px] border ${
            activeTab === "rework-requested"
              ? "border-[#02368c] text-[#02368c] bg-[rgba(68,127,255,0.08)]"
              : "border-black/10 text-[#666]"
          }`}
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Rework Requested
        </button>
        <button
          onClick={() => setActiveTab("completed-reworks")}
          className={`px-2.5 py-2 rounded-md text-[14px] border ${
            activeTab === "completed-reworks"
              ? "border-[#02368c] text-[#02368c] bg-[rgba(68,127,255,0.08)]"
              : "border-black/10 text-[#666]"
          }`}
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Completed Reworks
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="flex bg-[#fafafa] border-b border-[#7e7f8a]/50">
          <div className="w-[100px] px-4 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Booking ID
          </div>
          <div className="w-[180px] px-4 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Customer & Area
          </div>
          <div className="w-[100px] px-4 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Amount
          </div>
          <div className="w-[130px] px-4 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Service Category
          </div>
          <div className="w-[130px] px-4 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Service Descrip...
          </div>
          <div className="w-[140px] px-4 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Status
          </div>
          <div className="flex-1 px-4 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Created Slot
          </div>
        </div>

        {/* Table Rows */}
        {filteredDisputes.map((dispute) => {
          const statusStyle = statusStyles[dispute.status];
          const isSelected = selectedIds.includes(dispute.id);
          const rowBg = isSelected ? "bg-[rgba(68,127,255,0.08)]" : "bg-white";

          return (
            <div
              key={dispute.id}
              className={`flex border-b border-[#7e7f8a]/20 ${rowBg} hover:bg-gray-50 cursor-pointer`}
              onClick={() => onViewDispute?.(dispute.id)}
            >
              <div className="w-[100px] px-4 py-3 flex items-center">
                <span
                  className="text-[12px] text-[#02368c]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {dispute.bookingId}
                </span>
              </div>
              <div className="w-[180px] px-4 py-3 flex items-center gap-2">
                <div className="w-[30px] h-[30px] rounded-full bg-[#e5eeff] flex items-center justify-center overflow-hidden shrink-0">
                  {dispute.customerAvatar ? (
                    <Image
                      src={dispute.customerAvatar}
                      alt={dispute.customerName}
                      width={30}
                      height={30}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-[10px] font-medium text-[#002260]">
                      {dispute.customerName.split(" ").map(n => n[0]).join("")}
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className="text-[12px] text-[#0f172a] truncate"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    {dispute.customerName}
                  </span>
                  <div className="flex items-center gap-1">
                    <LocationIcon />
                    <span className="text-[10px] text-[#777]">{dispute.distance}</span>
                    <NavigationIcon />
                  </div>
                </div>
              </div>
              <div className="w-[100px] px-4 py-3 flex items-center">
                <span
                  className="text-[12px] text-[#0f172a] font-medium"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  GH₵ {dispute.amount}
                </span>
              </div>
              <div className="w-[130px] px-4 py-3 flex items-center">
                <span
                  className="px-2 py-0.5 text-[11px] border border-[#02368c] text-[#02368c] rounded-full"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {categoryStyles[dispute.serviceCategory].label}
                </span>
              </div>
              <div className="w-[130px] px-4 py-3 flex items-center">
                <span
                  className="text-[12px] text-[#0f172a] truncate"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  {dispute.serviceDescription}
                </span>
              </div>
              <div className="w-[140px] px-4 py-3 flex items-center">
                <span
                  className={`px-2 py-0.5 text-[11px] border rounded-full ${statusStyle.borderColor} ${statusStyle.textColor}`}
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {statusStyle.label}
                </span>
              </div>
              <div className="flex-1 px-4 py-3 flex items-center">
                <span
                  className="text-[12px] text-[#0f172a]"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  {dispute.createdDate} • {dispute.createdTime}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-3 bg-white">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedIds.length === filteredDisputes.length && filteredDisputes.length > 0}
              onChange={toggleSelectAll}
              className="w-3 h-3 rounded border-[#53392d]/50"
            />
            <span className="text-[10px] text-[#3f484c]" style={{ fontFamily: "Roboto, sans-serif" }}>
              Select All
            </span>
          </label>
          <div className="w-px h-4 bg-[#bec8cd]" />
          <span className="text-[10px] text-[#3f484c]" style={{ fontFamily: "Roboto, sans-serif" }}>
            {selectedIds.length} selected
          </span>
          {selectedIds.length > 0 && (
            <button className="p-1 rounded hover:bg-gray-100">
              <TrashIcon />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#3f484c]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </span>
          <div className="flex gap-1 pl-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-[#222] rounded text-[#222] disabled:opacity-50"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage * itemsPerPage >= totalItems}
              className="p-1.5 border border-[#222] rounded text-[#222] disabled:opacity-50"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
