"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  AllBookingsStats,
  AllBookingsHeader,
  AllBookingsTabs,
  AllBookingsFilters,
  AllBookingsTable,
  BookingsGrid,
} from "@/src/components/vendor";
import { useVendorBookings } from "@/src/hooks/useVendorApi";

// Loading skeleton
function BookingsSkeleton() {
  return (
    <div className="max-w-[1128px] space-y-8 animate-pulse">
      <div className="h-12 w-48 bg-gray-200 rounded" />
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-gray-200 rounded-xl" />
        ))}
      </div>
      <div className="h-96 bg-gray-200 rounded-xl" />
    </div>
  );
}

type BookingTab = "all" | "upcoming" | "ongoing" | "completed" | "cancelled";

export default function AllBookingsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [activeTab, setActiveTab] = useState<BookingTab>("all");

  // Map tab to API status filter
  const statusFilter = useMemo(() => {
    switch (activeTab) {
      case "upcoming": return "confirmed";
      case "ongoing": return "in_progress";
      case "completed": return "completed";
      case "cancelled": return "cancelled";
      default: return undefined;
    }
  }, [activeTab]);

  const {
    bookings,
    pagination,
    loading,
    error,
    refetch,
  } = useVendorBookings({
    status: statusFilter,
    limit: 20,
  });

  // Transform bookings for table component (matches BookingRow interface)
  const tableBookings = useMemo(() => {
    return bookings.map((booking) => ({
      id: booking.id,
      bookingId: booking.bookingCode,
      customerName: booking.customer?.fullName || "Customer",
      customerAvatar: booking.customer?.avatarUrl,
      location: booking.address?.city || "Location",
      amount: booking.totalAmount || 0,
      serviceCategory: booking.service?.name || "Service",
      scheduledDate: new Date(booking.scheduledDate).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      scheduledTime: booking.scheduledTime || "TBD",
      status: mapApiStatusToTableStatus(booking.status),
    }));
  }, [bookings]);

  // Transform bookings for grid component (matches BookingCardData interface)
  const gridBookings = useMemo(() => {
    return bookings.map((booking) => {
      // Calculate progress based on checklist if available
      const checklistItems = booking.checklist || [];
      const completedItems = checklistItems.filter((item) => item.isCompleted).length;
      const progressPercentage = checklistItems.length > 0
        ? Math.round((completedItems / checklistItems.length) * 100)
        : 0;

      // Calculate days for multi-day jobs
      const scheduledDate = new Date(booking.scheduledDate);
      const today = new Date();
      const daysDiff = Math.max(1, Math.ceil((today.getTime() - scheduledDate.getTime()) / (1000 * 60 * 60 * 24)));

      return {
        id: booking.id,
        bookingId: booking.bookingCode,
        type: (booking.estimatedDuration || 1) > 1 ? "contract" as const : "one-time" as const,
        status: mapApiStatusToCardStatus(booking.status),
        serviceName: booking.service?.name || "Service",
        amount: booking.totalAmount || 0,
        customerName: booking.customer?.fullName || "Customer",
        customerAvatar: booking.customer?.avatarUrl,
        distance: booking.address?.city || "Location",
        scheduledDate: new Date(booking.scheduledDate).toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        scheduledTime: booking.scheduledTime || "TBD",
        progress: booking.status === "in_progress" ? {
          currentDay: daysDiff,
          totalDays: booking.estimatedDuration || 1,
          percentage: progressPercentage,
        } : undefined,
      };
    });
  }, [bookings]);

  // Calculate stats from bookings data
  const stats = useMemo(() => {
    const ongoingCount = bookings.filter(b => ["in_progress", "en_route"].includes(b.status)).length;
    const scheduledCount = bookings.filter(b => b.status === "confirmed").length;
    const completedCount = bookings.filter(b => b.status === "completed").length;

    // Filter for today's jobs
    const today = new Date().toDateString();
    const todayCount = bookings.filter(b => new Date(b.scheduledDate).toDateString() === today).length;

    return {
      ongoing: { value: ongoingCount, subtitle: "Services in Progress" },
      today: { value: todayCount, subtitle: "Jobs Scheduled Today" },
      upcoming: { value: scheduledCount, subtitle: "Booking Scheduled" },
      completed: { value: completedCount, subtitle: "Successfully Completed" },
    };
  }, [bookings]);

  if (loading && bookings.length === 0) {
    return <BookingsSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-[1128px]">
        <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-6 text-center">
          <p className="text-[#dc2626] text-[14px] mb-4">{error.message}</p>
          <button
            onClick={refetch}
            className="bg-[#02368c] text-white px-4 py-2 rounded-lg text-[12px]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1128px] space-y-8">
      {/* Page Heading */}
      <div className="flex flex-col gap-1">
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-1 text-[12px]"
          style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
        >
          <Link href="/vendor/jobs" className="text-[#475569] hover:underline">Jobs</Link>
          <span className="text-[#475569]">/</span>
          <span className="text-[#111]">All Bookings</span>
        </div>

        {/* Title */}
        <h1
          className="text-[30px] font-medium text-[#111827] leading-[1.2]"
          style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
        >
          All Bookings
        </h1>
      </div>

      {/* Stats Cards */}
      <AllBookingsStats
        ongoing={stats.ongoing}
        today={stats.today}
        upcoming={stats.upcoming}
        completed={stats.completed}
      />

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        {/* Section Header with View Toggle */}
        <AllBookingsHeader viewMode={viewMode} onViewModeChange={setViewMode} />

        {/* Tabs */}
        <AllBookingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Filters */}
        <AllBookingsFilters />

        {/* Content - Grid or Table based on viewMode */}
        {viewMode === "grid" ? (
          <BookingsGrid bookings={gridBookings} />
        ) : (
          <AllBookingsTable bookings={tableBookings} />
        )}
      </div>
    </div>
  );
}

// Helper function to map API status to table component status
function mapApiStatus(apiStatus: string): "scheduled" | "in-progress" | "completed" | "cancelled" {
  switch (apiStatus) {
    case "confirmed":
    case "pending":
      return "scheduled";
    case "in_progress":
    case "en_route":
      return "in-progress";
    case "completed":
      return "completed";
    case "cancelled":
      return "cancelled";
    default:
      return "scheduled";
  }
}

// Helper function to map API status to BookingCard status
function mapApiStatusToCardStatus(apiStatus: string): "in-progress" | "upcoming" | "completed" | "cancelled" {
  switch (apiStatus) {
    case "confirmed":
    case "pending":
      return "upcoming";
    case "in_progress":
    case "en_route":
      return "in-progress";
    case "completed":
      return "completed";
    case "cancelled":
      return "cancelled";
    default:
      return "upcoming";
  }
}

// Helper function to map API status to AllBookingsTable status
function mapApiStatusToTableStatus(apiStatus: string): "upcoming" | "ongoing" | "completed" | "cancelled" {
  switch (apiStatus) {
    case "confirmed":
    case "pending":
      return "upcoming";
    case "in_progress":
    case "en_route":
      return "ongoing";
    case "completed":
      return "completed";
    case "cancelled":
      return "cancelled";
    default:
      return "upcoming";
  }
}
