"use client";

import {
  VendorBanner,
  StatsCards,
  ScheduleEarningsRow,
  ActiveJobs,
  NewRequests,
} from "@/src/components/vendor";
import { useVendorDashboard } from "@/src/hooks/useVendorDashboard";

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
  const {
    profile,
    stats,
    activeJobs,
    newRequests,
    loading,
    error,
    refetchAll,
    acceptJob,
    declineJob,
    refetchJobs,
    refetchStats,
  } = useVendorDashboard();

  const handleAcceptJob = async (bookingId: string) => {
    const { error: acceptError } = await acceptJob(bookingId);
    if (!acceptError) {
      refetchJobs();
      refetchStats();
    }
  };

  const handleDeclineJob = async (bookingId: string) => {
    const { error: declineError } = await declineJob(bookingId);
    if (!declineError) {
      refetchStats();
    }
  };

  if (loading && !profile) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message={error.message || "Failed to load dashboard data"}
        onRetry={refetchAll}
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
        isAvailable={true}
        statusMessage="Customers can currently find and book your services."
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
      <ActiveJobs jobs={activeJobs} />

      {/* New Requests */}
      <NewRequests
        requests={newRequests}
        onAccept={handleAcceptJob}
        onDecline={handleDeclineJob}
      />
    </div>
  );
}
