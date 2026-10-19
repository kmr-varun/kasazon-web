"use client";

import { useState } from "react";
import Image from "next/image";

export type TransactionStatus = "completed" | "on-hold" | "pending" | "withdrawn";

export interface Transaction {
  id: string;
  bookingId: string;
  customerName: string;
  customerAvatar?: string;
  serviceDescription: string;
  status: TransactionStatus;
  serviceDate: string;
  serviceTime: string;
  amount: number;
}

interface TransactionsTableProps {
  transactions?: Transaction[];
}

const statusStyles: Record<TransactionStatus, { borderColor: string; textColor: string; label: string }> = {
  completed: { borderColor: "border-[#34c759]", textColor: "text-[#34c759]", label: "Completed" },
  "on-hold": { borderColor: "border-[#ff9500]", textColor: "text-[#ff9500]", label: "On Hold" },
  pending: { borderColor: "border-[#ff9500]", textColor: "text-[#ff9500]", label: "Pending" },
  withdrawn: { borderColor: "border-[#02368c]", textColor: "text-[#02368c]", label: "Withdrawn" },
};

const defaultTransactions: Transaction[] = [
  { id: "1", bookingId: "LEND-123", customerName: "Akua Mensah", serviceDescription: "Deep Cleaning", status: "completed", serviceDate: "Tue, 24 Sept 2026", serviceTime: "2:30 pm", amount: 250 },
  { id: "2", bookingId: "LEND-124", customerName: "Akua Mensah", serviceDescription: "Deep Cleaning", status: "on-hold", serviceDate: "Tue, 24 Sept 2026", serviceTime: "2:30 pm", amount: 250 },
  { id: "3", bookingId: "LEND-125", customerName: "Akua Mensah", serviceDescription: "Deep Cleaning", status: "completed", serviceDate: "Tue, 24 Sept 2026", serviceTime: "2:30 pm", amount: 250 },
  { id: "4", bookingId: "LEND-126", customerName: "Akua Mensah", serviceDescription: "Deep Cleaning", status: "on-hold", serviceDate: "Tue, 24 Sept 2026", serviceTime: "2:30 pm", amount: 250 },
  { id: "5", bookingId: "LEND-127", customerName: "Akua Mensah", serviceDescription: "Deep Cleaning", status: "on-hold", serviceDate: "Tue, 24 Sept 2026", serviceTime: "2:30 pm", amount: 250 },
  { id: "6", bookingId: "LEND-128", customerName: "Akua Mensah", serviceDescription: "Deep Cleaning", status: "completed", serviceDate: "Tue, 24 Sept 2026", serviceTime: "2:30 pm", amount: 250 },
  { id: "7", bookingId: "LEND-129", customerName: "Akua Mensah", serviceDescription: "Deep Cleaning", status: "completed", serviceDate: "Tue, 24 Sept 2026", serviceTime: "2:30 pm", amount: 250 },
];

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

export function TransactionsTable({ transactions = defaultTransactions }: TransactionsTableProps) {
  const [activeTab, setActiveTab] = useState<"all" | "withdrawn">("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 45;

  const filteredTransactions = activeTab === "withdrawn"
    ? transactions.filter(t => t.status === "withdrawn")
    : transactions;

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTransactions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTransactions.map(t => t.id));
    }
  };

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Header */}
      <div className="border-b border-black/[0.12] px-5 py-[18px]">
        <h2
          className="text-[16px] font-medium text-[#222]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Recent Transactions
        </h2>
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
          onClick={() => setActiveTab("withdrawn")}
          className={`px-2.5 py-2 rounded-md text-[14px] border ${
            activeTab === "withdrawn"
              ? "border-[#02368c] text-[#02368c] bg-[rgba(68,127,255,0.08)]"
              : "border-black/10 text-[#666]"
          }`}
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Withdrawn
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="flex bg-[#fafafa] border-b border-[#7e7f8a]/50">
          <div className="flex-1 px-5 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Booking ID
          </div>
          <div className="w-[250px] px-5 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Customer & Area
          </div>
          <div className="flex-1 px-5 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Service Description
          </div>
          <div className="flex-1 px-5 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Status
          </div>
          <div className="w-[201px] px-5 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Service Date & Time
          </div>
          <div className="flex-1 px-5 py-3 text-[12px] font-medium text-[#666]" style={{ fontFamily: "Roboto, sans-serif" }}>
            Amount
          </div>
        </div>

        {/* Table Rows */}
        {filteredTransactions.map((transaction, index) => {
          const statusStyle = statusStyles[transaction.status];
          const isSelected = selectedIds.includes(transaction.id);
          const rowBg = isSelected ? "bg-[rgba(68,127,255,0.08)]" : "bg-white";

          return (
            <div
              key={transaction.id}
              className={`flex border-b border-[#7e7f8a]/20 ${rowBg}`}
            >
              <div className="flex-1 px-5 py-3 flex items-center">
                <span
                  className="text-[12px] text-[#02368c]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {transaction.bookingId}
                </span>
              </div>
              <div className="w-[250px] px-5 py-3 flex items-center gap-2">
                <div className="w-[30px] h-[30px] rounded-full bg-[#e5eeff] flex items-center justify-center overflow-hidden">
                  {transaction.customerAvatar ? (
                    <Image
                      src={transaction.customerAvatar}
                      alt={transaction.customerName}
                      width={30}
                      height={30}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-[10px] font-medium text-[#002260]">
                      {transaction.customerName.split(" ").map(n => n[0]).join("")}
                    </span>
                  )}
                </div>
                <span
                  className="text-[12px] text-[#0f172a]"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  {transaction.customerName}
                </span>
              </div>
              <div className="flex-1 px-5 py-3 flex items-center">
                <span
                  className="text-[12px] text-[#0f172a] truncate"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  {transaction.serviceDescription}
                </span>
              </div>
              <div className="flex-1 px-5 py-3 flex items-center">
                <span
                  className={`px-1.5 py-0.5 text-[12px] border rounded-full ${statusStyle.borderColor} ${statusStyle.textColor}`}
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {statusStyle.label}
                </span>
              </div>
              <div className="w-[201px] px-5 py-3 flex items-center">
                <span
                  className="text-[12px] text-[#0f172a]"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  {transaction.serviceDate} • {transaction.serviceTime}
                </span>
              </div>
              <div className="flex-1 px-5 py-3 flex items-center">
                <span
                  className="text-[12px] text-[#0fc73d] font-medium"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  GH₵ {transaction.amount}
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
              checked={selectedIds.length === filteredTransactions.length && filteredTransactions.length > 0}
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
