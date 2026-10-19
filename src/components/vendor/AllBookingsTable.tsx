"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LocationPinIcon = () => (
  <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 2.57145C4.09545 2.57145 3.69998 2.69713 3.36361 2.93259C3.02723 3.16806 2.76506 3.50273 2.61025 3.89429C2.45543 4.28585 2.41492 4.71671 2.49385 5.13239C2.57277 5.54807 2.76758 5.92989 3.05365 6.22958C3.33971 6.52926 3.70417 6.73335 4.10095 6.81604C4.49773 6.89872 4.909 6.85628 5.28276 6.69409C5.65652 6.53191 5.97598 6.25725 6.20073 5.90485C6.42549 5.55246 6.54545 5.13815 6.54545 4.71433C6.54545 4.14601 6.32995 3.60096 5.94635 3.19909C5.56276 2.79722 5.04249 2.57145 4.5 2.57145ZM4.5 6.00006C4.25727 6.00006 4.01999 5.92465 3.81816 5.78338C3.61634 5.6421 3.45904 5.4413 3.36615 5.20636C3.27326 4.97142 3.24895 4.71291 3.29631 4.4635C3.34366 4.21409 3.46055 3.985 3.63219 3.80519C3.80382 3.62537 4.0225 3.50292 4.26057 3.45331C4.49864 3.4037 4.7454 3.42916 4.96966 3.52648C5.19391 3.62379 5.38559 3.78858 5.52044 4.00002C5.65529 4.21146 5.72727 4.46004 5.72727 4.71433C5.72727 5.05533 5.59797 5.38236 5.36781 5.62348C5.13765 5.8646 4.82549 6.00006 4.5 6.00006ZM4.5 0C3.30694 0.00141791 2.16313 0.498561 1.31951 1.38236C0.475894 2.26616 0.00135344 3.46445 0 4.71433C0 6.39649 0.741989 8.17937 2.14773 9.87064C2.77937 10.6349 3.49029 11.323 4.26733 11.9224C4.33611 11.9729 4.41806 12 4.50205 12C4.58603 12 4.66798 11.9729 4.73676 11.9224C5.51237 11.3228 6.2219 10.6346 6.85227 9.87064C8.25597 8.17937 9 6.39649 9 4.71433C8.99865 3.46445 8.52411 2.26616 7.68049 1.38236C6.83687 0.498561 5.69306 0.00141791 4.5 0ZM4.5 11.0358C3.65472 10.3394 0.818182 7.78133 0.818182 4.71433C0.818182 3.69134 1.20609 2.71026 1.89656 1.98689C2.58704 1.26353 3.52352 0.857151 4.5 0.857151C5.47648 0.857151 6.41296 1.26353 7.10344 1.98689C7.79391 2.71026 8.18182 3.69134 8.18182 4.71433C8.18182 7.78026 5.34528 10.3394 4.5 11.0358Z" fill="#777777"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="#02368C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#02368C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

export type BookingStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

export interface BookingRow {
  id: string;
  bookingId: string;
  customerName: string;
  customerAvatar?: string;
  location: string;
  serviceCategory: string;
  scheduledDate: string;
  scheduledTime: string;
  status: BookingStatus;
  amount: number;
}

const statusConfig: Record<BookingStatus, { label: string; bgColor: string; textColor: string }> = {
  upcoming: { label: "Upcoming", bgColor: "bg-[#eff6ff]", textColor: "text-[#2563eb]" },
  ongoing: { label: "Ongoing", bgColor: "bg-[rgba(254,173,77,0.2)]", textColor: "text-[#d97706]" },
  completed: { label: "Completed", bgColor: "bg-[rgba(5,150,105,0.12)]", textColor: "text-[#059669]" },
  cancelled: { label: "Cancelled", bgColor: "bg-[#fef2f2]", textColor: "text-[#ef4444]" },
};

interface AllBookingsTableProps {
  bookings?: BookingRow[];
}

const defaultBookings: BookingRow[] = [
  { id: "1", bookingId: "BK-001", customerName: "Akua Mensah", location: "East Legon", serviceCategory: "Deep Cleaning", scheduledDate: "Tue, 24 Sept 2026", scheduledTime: "2:30 pm", status: "upcoming", amount: 250 },
  { id: "2", bookingId: "BK-002", customerName: "Kofi Asante", location: "Osu", serviceCategory: "Regular Cleaning", scheduledDate: "Wed, 25 Sept 2026", scheduledTime: "10:00 am", status: "ongoing", amount: 180 },
  { id: "3", bookingId: "BK-003", customerName: "Ama Darko", location: "Cantonments", serviceCategory: "Deep Cleaning", scheduledDate: "Mon, 23 Sept 2026", scheduledTime: "9:00 am", status: "completed", amount: 350 },
  { id: "4", bookingId: "BK-004", customerName: "Kwame Boateng", location: "Airport Residential", serviceCategory: "Move Out Cleaning", scheduledDate: "Fri, 20 Sept 2026", scheduledTime: "11:00 am", status: "completed", amount: 500 },
  { id: "5", bookingId: "BK-005", customerName: "Efua Mensah", location: "Labone", serviceCategory: "Regular Cleaning", scheduledDate: "Thu, 26 Sept 2026", scheduledTime: "3:00 pm", status: "upcoming", amount: 150 },
  { id: "6", bookingId: "BK-006", customerName: "Yaw Adu", location: "Spintex", serviceCategory: "Office Cleaning", scheduledDate: "Sat, 21 Sept 2026", scheduledTime: "8:00 am", status: "cancelled", amount: 400 },
  { id: "7", bookingId: "BK-007", customerName: "Adjoa Owusu", location: "Tema", serviceCategory: "Deep Cleaning", scheduledDate: "Sun, 22 Sept 2026", scheduledTime: "1:00 pm", status: "completed", amount: 280 },
  { id: "8", bookingId: "BK-008", customerName: "Nana Appiah", location: "Achimota", serviceCategory: "Regular Cleaning", scheduledDate: "Tue, 24 Sept 2026", scheduledTime: "4:00 pm", status: "ongoing", amount: 200 },
  { id: "9", bookingId: "BK-009", customerName: "Esi Armah", location: "Dzorwulu", serviceCategory: "Post Construction", scheduledDate: "Wed, 25 Sept 2026", scheduledTime: "9:30 am", status: "upcoming", amount: 600 },
  { id: "10", bookingId: "BK-010", customerName: "Kojo Asiedu", location: "Roman Ridge", serviceCategory: "Deep Cleaning", scheduledDate: "Thu, 19 Sept 2026", scheduledTime: "2:00 pm", status: "completed", amount: 320 },
];

export function AllBookingsTable({ bookings = defaultBookings }: AllBookingsTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 26;
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
    if (selectedRows.size === bookings.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(bookings.map((b) => b.id)));
    }
  };

  const isAllSelected = selectedRows.size === bookings.length && bookings.length > 0;

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
                Customer
              </th>
              <th
                className="px-4 py-3 text-left text-[12px] font-medium text-[#64748b]"
                style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
              >
                Service
              </th>
              <th
                className="px-4 py-3 text-left text-[12px] font-medium text-[#64748b]"
                style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
              >
                Scheduled Date
              </th>
              <th
                className="px-4 py-3 text-left text-[12px] font-medium text-[#64748b]"
                style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
              >
                Status
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => {
              const status = statusConfig[booking.status];
              return (
                <tr
                  key={booking.id}
                  className={`border-b border-[#e2e8f0] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
                  } ${selectedRows.has(booking.id) ? "bg-[#eff6ff]" : ""}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(booking.id)}
                      onChange={() => toggleRow(booking.id)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/vendor/jobs/bookings/${booking.id}`}
                      className="text-[14px] text-[#02368c] font-medium hover:underline"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      {booking.bookingId}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/vendor/customer-avatar.png"
                        alt={booking.customerName}
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                      <div className="flex flex-col gap-1">
                        <span
                          className="text-[14px] text-[#222] font-medium"
                          style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                        >
                          {booking.customerName}
                        </span>
                        <div className="flex items-center gap-1">
                          <LocationPinIcon />
                          <span
                            className="text-[12px] text-[#777]"
                            style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                          >
                            {booking.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[14px] text-[#222]"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      {booking.serviceCategory}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[14px] text-[#222]"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      {booking.scheduledDate} • {booking.scheduledTime}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[12px] font-medium ${status.bgColor} ${status.textColor}`}
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[14px] text-[#222] font-semibold"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      GH₵ {booking.amount}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/vendor/jobs/bookings/${booking.id}`}
                      className="flex items-center gap-1.5 text-[13px] text-[#02368c] hover:underline"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      <EyeIcon />
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer with Pagination */}
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
