"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LocationPinIcon = () => (
  <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 2.57145C4.09545 2.57145 3.69998 2.69713 3.36361 2.93259C3.02723 3.16806 2.76506 3.50273 2.61025 3.89429C2.45543 4.28585 2.41492 4.71671 2.49385 5.13239C2.57277 5.54807 2.76758 5.92989 3.05365 6.22958C3.33971 6.52926 3.70417 6.73335 4.10095 6.81604C4.49773 6.89872 4.909 6.85628 5.28276 6.69409C5.65652 6.53191 5.97598 6.25725 6.20073 5.90485C6.42549 5.55246 6.54545 5.13815 6.54545 4.71433C6.54545 4.14601 6.32995 3.60096 5.94635 3.19909C5.56276 2.79722 5.04249 2.57145 4.5 2.57145ZM4.5 6.00006C4.25727 6.00006 4.01999 5.92465 3.81816 5.78338C3.61634 5.6421 3.45904 5.4413 3.36615 5.20636C3.27326 4.97142 3.24895 4.71291 3.29631 4.4635C3.34366 4.21409 3.46055 3.985 3.63219 3.80519C3.80382 3.62537 4.0225 3.50292 4.26057 3.45331C4.49864 3.4037 4.7454 3.42916 4.96966 3.52648C5.19391 3.62379 5.38559 3.78858 5.52044 4.00002C5.65529 4.21146 5.72727 4.46004 5.72727 4.71433C5.72727 5.05533 5.59797 5.38236 5.36781 5.62348C5.13765 5.8646 4.82549 6.00006 4.5 6.00006ZM4.5 0C3.30694 0.00141791 2.16313 0.498561 1.31951 1.38236C0.475894 2.26616 0.00135344 3.46445 0 4.71433C0 6.39649 0.741989 8.17937 2.14773 9.87064C2.77937 10.6349 3.49029 11.323 4.26733 11.9224C4.33611 11.9729 4.41806 12 4.50205 12C4.58603 12 4.66798 11.9729 4.73676 11.9224C5.51237 11.3228 6.2219 10.6346 6.85227 9.87064C8.25597 8.17937 9 6.39649 9 4.71433C8.99865 3.46445 8.52411 2.26616 7.68049 1.38236C6.83687 0.498561 5.69306 0.00141791 4.5 0ZM4.5 11.0358C3.65472 10.3394 0.818182 7.78133 0.818182 4.71433C0.818182 3.69134 1.20609 2.71026 1.89656 1.98689C2.58704 1.26353 3.52352 0.857151 4.5 0.857151C5.47648 0.857151 6.41296 1.26353 7.10344 1.98689C7.79391 2.71026 8.18182 3.69134 8.18182 4.71433C8.18182 7.78026 5.34528 10.3394 4.5 11.0358Z" fill="#777777"/>
  </svg>
);

const DirectionIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.7524 0.250854C11.6446 0.14314 11.51 0.0661066 11.3625 0.0276888C11.215 -0.010729 11.0599 -0.00914251 10.9133 0.0322849H10.9052L0.619945 3.15225C0.452968 3.20035 0.304556 3.29805 0.194376 3.43239C0.0841952 3.56673 0.0174475 3.73136 0.00297801 3.90448C-0.0114914 4.0776 0.0270004 4.25103 0.113353 4.40179C0.199705 4.55254 0.329841 4.67351 0.486516 4.74865L5.03703 6.96434L7.25012 11.5109C7.31896 11.6577 7.4284 11.7818 7.56551 11.8685C7.70262 11.9552 7.86168 12.0008 8.0239 12C8.04855 12 8.0732 11.9989 8.09785 11.9968C8.27088 11.9828 8.43549 11.9162 8.56958 11.806C8.70368 11.6958 8.80085 11.5472 8.84805 11.3802L11.9668 1.09781C11.9668 1.09513 11.9668 1.09245 11.9668 1.08977C12.0087 0.943504 12.011 0.788701 11.9733 0.641266C11.9357 0.493831 11.8594 0.359079 11.7524 0.250854ZM8.02873 11.1348L8.02605 11.1423V11.1386L5.8794 6.7297L8.45152 4.1583C8.52852 4.07728 8.57081 3.96939 8.56938 3.85763C8.56795 3.74588 8.52291 3.63911 8.44386 3.56008C8.36481 3.48105 8.258 3.43602 8.14622 3.43459C8.03443 3.43316 7.92651 3.47544 7.84546 3.55242L5.27334 6.12381L0.861617 3.97777H0.857866H0.865368L11.1458 0.857274L8.02873 11.1348Z" fill="#02368C"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 3L4.5 9L1.5 6" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3L3 9M3 3L9 9" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14M5.33333 4V2.66667C5.33333 2.31305 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31305 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31305 10.6667 2.66667V4M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31305 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4H12.6667Z" stroke="#64748B" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12L6 8L10 4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12L10 8L6 4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface JobRequestRow {
  id: string;
  bookingId: string;
  customerName: string;
  customerAvatar?: string;
  distance: string;
  amount: number;
  serviceCategory: string;
  createdDate: string;
  createdTime: string;
}

interface JobRequestsTableProps {
  jobs?: JobRequestRow[];
  onApprove?: (jobId: string) => void;
  onReject?: (jobId: string) => void;
}

const defaultJobs: JobRequestRow[] = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  bookingId: "LEND-123",
  customerName: "Akua Mensah",
  distance: "1.8 Km Away",
  amount: 250,
  serviceCategory: "Deep Cleaning",
  createdDate: "Tue, 24 Sept 2026",
  createdTime: "2:30 pm",
}));

export function JobRequestsTable({
  jobs = defaultJobs,
  onApprove,
  onReject,
}: JobRequestsTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 45;
  const itemsPerPage = 10;

  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    if (selectedRows.size === jobs.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(jobs.map((j) => j.id)));
    }
  };

  const isAllSelected = selectedRows.size === jobs.length && jobs.length > 0;

  return (
    <div className="flex flex-col">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e2e8f0]">
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-gray-300"
                />
              </th>
              <th
                className="px-4 py-3 text-left text-[12px] font-medium text-[#64748b]"
                style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
              >
                Booking ID
              </th>
              <th
                className="px-4 py-3 text-left text-[12px] font-medium text-[#64748b]"
                style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
              >
                Customer & Area
              </th>
              <th
                className="px-4 py-3 text-left text-[12px] font-medium text-[#64748b]"
                style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
              >
                Amount
              </th>
              <th
                className="px-4 py-3 text-left text-[12px] font-medium text-[#64748b]"
                style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
              >
                Service Category
              </th>
              <th
                className="px-4 py-3 text-left text-[12px] font-medium text-[#64748b]"
                style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
              >
                Created Slot
              </th>
              <th
                className="px-4 py-3 text-left text-[12px] font-medium text-[#64748b]"
                style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={job.id}
                className={`border-b border-[#e2e8f0] ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
                } ${selectedRows.has(job.id) ? "bg-[#eff6ff]" : ""}`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(job.id)}
                    onChange={() => toggleRow(job.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/vendor/jobs/${job.id}`}
                    className="text-[14px] text-[#02368c] font-medium hover:underline"
                    style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                  >
                    {job.bookingId}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/vendor/customer-avatar.png"
                      alt={job.customerName}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <div className="flex flex-col gap-1">
                      <span
                        className="text-[14px] text-[#222] font-medium"
                        style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                      >
                        {job.customerName}
                      </span>
                      <div className="flex items-center gap-1">
                        <LocationPinIcon />
                        <span
                          className="text-[12px] text-[#777]"
                          style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                        >
                          {job.distance}
                        </span>
                        <DirectionIcon />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-[14px] text-[#222] font-semibold"
                    style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                  >
                    GH₵ {job.amount}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-[14px] text-[#222]"
                    style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                  >
                    {job.serviceCategory}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-[14px] text-[#222]"
                    style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                  >
                    {job.createdDate} • {job.createdTime}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onApprove?.(job.id)}
                      className="flex items-center gap-1 text-[13px] text-[#059669] hover:underline"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      <CheckIcon />
                      Approve
                    </button>
                    <button
                      onClick={() => onReject?.(job.id)}
                      className="flex items-center gap-1 text-[13px] text-[#ef4444] hover:underline"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      <XIcon />
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#e2e8f0]">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-[13px] text-[#64748b]">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleAll}
              className="w-4 h-4 rounded border-gray-300"
            />
            Select All
          </label>
          <span className="text-[13px] text-[#64748b]">
            {selectedRows.size} selected
          </span>
          {selectedRows.size > 0 && (
            <button className="p-1 hover:bg-gray-100 rounded">
              <TrashIcon />
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-[13px] text-[#64748b]"
            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
          >
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-[#e2e8f0] hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage * itemsPerPage >= totalItems}
              className="p-1 rounded border border-[#e2e8f0] hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
