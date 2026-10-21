"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  JobRequestsStats,
  JobRequestsHeader,
  JobRequestsTabs,
  JobRequestsFilters,
  JobRequestsGrid,
  JobRequestsTable,
} from "@/src/components/vendor";
import { useJobRequests } from "@/src/hooks/useVendorApi";

// Loading skeleton
function JobRequestsSkeleton() {
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

type TabType = "all" | "rework" | "declined";

export default function JobRequestsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const {
    requests,
    pagination,
    loading,
    error,
    refetch,
    acceptJob,
    declineJob,
  } = useJobRequests({
    limit,
    offset: (currentPage - 1) * limit,
  });

  // Transform requests for grid component (matches JobRequest interface)
  const gridRequests = useMemo(() => {
    return requests.map((req) => ({
      id: req.id,
      jobId: `#${req.bookingCode}`,
      title: req.service?.name || "Service",
      price: req.totalAmount || 0,
      customerName: req.customer?.fullName || "Customer",
      customerAvatar: req.customer?.avatarUrl,
      distance: req.address?.city || "Location",
      time: req.scheduledTime || "TBD",
    }));
  }, [requests]);

  // Transform requests for table component (matches JobRequestRow interface)
  const tableJobs = useMemo(() => {
    return requests.map((req) => ({
      id: req.id,
      bookingId: req.bookingCode,
      customerName: req.customer?.fullName || "Customer",
      customerAvatar: req.customer?.avatarUrl,
      distance: req.address?.city || "Location",
      amount: req.totalAmount || 0,
      serviceCategory: req.service?.name || "Service",
      createdDate: new Date(req.scheduledDate).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      createdTime: req.scheduledTime || "TBD",
    }));
  }, [requests]);

  // Calculate stats from API data
  const stats = useMemo(() => {
    const pendingCount = pagination.total;
    const avgPrice = requests.length > 0
      ? requests.reduce((sum, r) => sum + (r.totalAmount || 0), 0) / requests.length
      : 0;

    return {
      pending: pendingCount,
      avgPrice: `GH₵ ${Number(avgPrice).toFixed(2)}`,
      responseRate: "98%", // Would need separate API for this
      todayRequests: requests.filter(r => {
        const today = new Date().toDateString();
        return new Date(r.createdAt).toDateString() === today;
      }).length,
    };
  }, [requests, pagination.total]);

  const handleAccept = useCallback(async (bookingId: string) => {
    await acceptJob(bookingId);
  }, [acceptJob]);

  const handleDecline = useCallback(async (bookingId: string) => {
    await declineJob(bookingId);
  }, [declineJob]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  if (loading && requests.length === 0) {
    return <JobRequestsSkeleton />;
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
          <span className="text-[#111]">Job Requests</span>
        </div>

        {/* Title */}
        <h1
          className="text-[30px] font-medium text-[#111827] leading-[1.2]"
          style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
        >
          Job Requests
        </h1>
      </div>

      {/* Stats Cards */}
      <JobRequestsStats
        newRequests={{ value: stats.pending, subtitle: "Jobs waiting for your response" }}
        accepted={{ value: stats.todayRequests, subtitle: "Jobs accepted today" }}
        declined={{ value: 0, subtitle: "Jobs you declined" }}
      />

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        {/* Section Header with View Toggle */}
        <JobRequestsHeader viewMode={viewMode} onViewModeChange={setViewMode} />

        {/* Tabs */}
        <JobRequestsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Filters */}
        <JobRequestsFilters />

        {/* Content - Grid or Table based on viewMode */}
        {viewMode === "grid" ? (
          <JobRequestsGrid
            jobs={gridRequests}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        ) : (
          <JobRequestsTable
            jobs={tableJobs}
            onApprove={handleAccept}
            onReject={handleDecline}
          />
        )}
      </div>
    </div>
  );
}
