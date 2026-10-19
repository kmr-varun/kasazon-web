"use client";

import { useMemo } from "react";
import {
  VendorBanner,
  StatsCards,
  ScheduleEarningsRow,
  ActiveJobs,
  NewRequests,
} from "@/src/components/vendor";
import {
  useVendorProfile,
  useVendorDashboardStats,
  useJobRequests,
  useVendorBookings,
} from "@/src/hooks/useVendorApi";

// Loading skeleton component
function DashboardSkeleton() {
  return (
    <div className="max-w-[1128px] space-y-8 animate-pulse">
      <div className="h-9 w-48 bg-gray-200 rounded" />
      <div className="h-24 bg-gray-200 rounded-xl" />
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl" />
        ))}
      </div>
      <div className="h-64 bg-gray-200 rounded-xl" />
      <div className="h-48 bg-gray-200 rounded-xl" />
    </div>
  );
}

// Error display component
function ErrorDisplay({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="max-w-[1128px]">
      <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-6 text-center">
        <p className="text-[#dc2626] text-[14px] mb-4" style={{ fontFamily: "Roboto Flex, sans-serif" }}>
          {message}
        </p>
        <button
          onClick={onRetry}
          className="bg-[#02368c] text-white px-4 py-2 rounded-lg text-[12px]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default function VendorDashboard() {
  const { profile, loading: profileLoading, error: profileError, refetch: refetchProfile } = useVendorProfile();
  const { stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useVendorDashboardStats();
  const { requests, loading: requestsLoading, acceptJob, declineJob, refetch: refetchRequests } = useJobRequests({ limit: 3 });
  const { bookings, loading: bookingsLoading, refetch: refetchBookings } = useVendorBookings({ status: "in_progress", limit: 2 });

  // Transform job requests to match NewRequests component format
  const transformedRequests = useMemo(() => {
    return requests.map((req) => ({
      id: `#${req.bookingCode}`,
      service: req.service?.name || "Service",
      price: `GH₵ ${(req.totalAmount || 0).toFixed(2)}`,
      customer: req.customer?.fullName || "Customer",
      avatar: req.customer?.avatarUrl || "/images/vendor/customer-avatar.png",
      distance: req.address?.city ? `${req.address.city}` : "Location",
      time: req.scheduledTime || "TBD",
      bookingId: req.id,
    }));
  }, [requests]);

  // Transform bookings to match ActiveJobs component format
  const transformedBookings = useMemo(() => {
    return bookings.map((booking, index) => {
      // Calculate progress based on checklist if available
      const checklistItems = booking.checklist || [];
      const completedItems = checklistItems.filter((item) => item.isCompleted).length;
      const progress = checklistItems.length > 0
        ? Math.round((completedItems / checklistItems.length) * 100)
        : 0;

      // Calculate days if it's a multi-day job
      const scheduledDate = new Date(booking.scheduledDate);
      const today = new Date();
      const daysDiff = Math.max(1, Math.ceil((today.getTime() - scheduledDate.getTime()) / (1000 * 60 * 60 * 24)));

      return {
        id: index + 1,
        service: booking.service?.name || "Service",
        price: `GH₵ ${(booking.totalAmount || 0).toFixed(2)}`,
        customer: booking.customer?.fullName || "Customer",
        startTime: booking.startedAt
          ? new Date(booking.startedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
          : booking.scheduledTime || "TBD",
        progress,
        currentDay: daysDiff,
        totalDays: booking.estimatedDuration || 1,
        bookingId: booking.id,
      };
    });
  }, [bookings]);

  // Handle accept job
  const handleAcceptJob = async (bookingId: string) => {
    const { error } = await acceptJob(bookingId);
    if (!error) {
      refetchBookings();
      refetchStats();
    }
  };

  // Handle decline job
  const handleDeclineJob = async (bookingId: string) => {
    const { error } = await declineJob(bookingId);
    if (!error) {
      refetchStats();
    }
  };

  // Combined loading state
  const isLoading = profileLoading || statsLoading || requestsLoading || bookingsLoading;

  // Combined error
  const error = profileError || statsError;

  if (isLoading && !profile) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message={error.message || "Failed to load dashboard data"}
        onRetry={() => {
          refetchProfile();
          refetchStats();
          refetchRequests();
          refetchBookings();
        }}
      />
    );
  }

  return (
    <div className="max-w-[1128px] space-y-8">
      {/* Page Title */}
      <h1 className="text-[30px] font-medium text-[#111827] leading-[1.2] font-['Roboto_Flex']">
        My Dashboard
      </h1>

      {/* Profile Banner */}
      <VendorBanner
        vendorName={profile?.user?.fullName || "Vendor"}
        vendorAvatar={profile?.user?.avatarUrl || "/images/vendor/banner-avatar.png"}
        isAvailable={profile?.isAvailable ?? true}
        statusMessage={
          profile?.isAvailable
            ? "Customers can currently find and book your services."
            : "You are currently not accepting new bookings."
        }
      />

      {/* Stats Cards */}
      <StatsCards
        todaysJobs={stats.todaysJobs}
        newRequests={stats.newRequests}
        monthlyEarnings={stats.monthlyEarnings}
        avgRating={stats.avgRating}
      />

      {/* Schedule & Earnings Row */}
      <ScheduleEarningsRow />

      {/* Active Jobs */}
      <ActiveJobs
        jobs={transformedBookings.length > 0 ? transformedBookings : undefined}
      />

      {/* New Requests */}
      <NewRequests
        requests={transformedRequests.length > 0 ? transformedRequests : undefined}
        onAccept={handleAcceptJob}
        onDecline={handleDeclineJob}
      />
    </div>
  );
}
