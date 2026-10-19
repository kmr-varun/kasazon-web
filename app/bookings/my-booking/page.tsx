'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { getBookings, getBookingStats, isAuthenticated, type BookingFilter } from '@/src/lib/api';
import type { Booking, BookingStats } from '@/src/lib/types';

export default function MyBookingPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<BookingFilter>('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login?redirect=/bookings/my-booking');
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const [bookingsData, statsData] = await Promise.all([
          getBookings(activeFilter),
          getBookingStats(),
        ]);
        setBookings(bookingsData);
        setStats(statsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router, activeFilter]);

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dateStr: string;
    if (dateObj.toDateString() === today.toDateString()) {
      dateStr = 'Today';
    } else if (dateObj.toDateString() === tomorrow.toDateString()) {
      dateStr = 'Tomorrow';
    } else {
      dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }

    return `${dateStr}, ${time}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
      case 'CONFIRMED':
        return { bg: 'bg-[#f0f9ff]', text: 'text-[#02368c]', label: 'Upcoming' };
      case 'IN_PROGRESS':
        return { bg: 'bg-[rgba(207,157,0,0.11)]', text: 'text-[#cf9d00]', label: 'In Progress' };
      case 'COMPLETED':
        return { bg: 'bg-[#d4edda]', text: 'text-[#155724]', label: 'Completed' };
      case 'CANCELLED':
        return { bg: 'bg-[#f8d7da]', text: 'text-[#721c24]', label: 'Cancelled' };
      case 'DISPUTED':
        return { bg: 'bg-[#fff3cd]', text: 'text-[#856404]', label: 'Disputed' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
    }
  };

  const getBookingLink = (booking: Booking) => {
    switch (booking.status) {
      case 'IN_PROGRESS':
        return `/bookings/ongoing/${booking.id}`;
      case 'COMPLETED':
        return `/bookings/completed/${booking.id}`;
      case 'CANCELLED':
        return `/bookings/canceled/${booking.id}`;
      case 'DISPUTED':
        return `/bookings/disputed/${booking.id}`;
      default:
        return `/bookings/${booking.id}`;
    }
  };

  const activityStats = stats
    ? [
        { label: 'Upcoming Service', count: `${stats.upcoming} Booking${stats.upcoming !== 1 ? 's' : ''}`, color: '#006c49' },
        { label: 'Ongoing Renovation', count: `${stats.ongoing} Active Project${stats.ongoing !== 1 ? 's' : ''}`, color: '#f59e0b' },
        { label: 'Past Executions', count: `${stats.completed} Completed`, color: '#565e74' },
      ]
    : [
        { label: 'Upcoming Service', count: '0 Bookings', color: '#006c49' },
        { label: 'Ongoing Renovation', count: '0 Active Projects', color: '#f59e0b' },
        { label: 'Past Executions', count: '0 Completed', color: '#565e74' },
      ];

  const filters: BookingFilter[] = ['all', 'upcoming', 'ongoing', 'completed', 'cancelled', 'disputed'];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-[1728px] mx-auto">
          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-2">
            <h1 className="font-roboto-condensed font-medium text-[40px] text-[#0b1c30] leading-[48px] tracking-[-1px]">
              My Booking
            </h1>
            <p className="font-poppins text-lg text-[#424655] leading-normal max-w-[780px]">
              Check your service details before proceeding to payment.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-7 flex gap-3 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full min-w-[128px] font-poppins text-base leading-normal transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#02368c] text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]'
                    : 'bg-white text-[#424655] border border-[rgba(0,0,0,0.1)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:border-[#02368c]'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02368c]"></div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-red-600 underline hover:text-red-800"
              >
                Try again
              </button>
            </div>
          )}

          {/* Two-Column Layout */}
          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column - Booking Cards */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {bookings.length === 0 ? (
                  <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg p-8 text-center">
                    <p className="font-poppins text-lg text-[#424655] mb-4">
                      No {activeFilter === 'all' ? '' : activeFilter} bookings found
                    </p>
                    <Link
                      href="/services"
                      className="inline-block bg-[#02368c] px-6 py-3 rounded-lg text-white font-roboto-condensed hover:bg-[#024189] transition-colors"
                    >
                      Browse Services
                    </Link>
                  </div>
                ) : (
                  bookings.map((booking) => {
                    const statusBadge = getStatusBadge(booking.status);

                    return (
                      <div
                        key={booking.id}
                        className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg p-4 flex gap-4"
                      >
                        {/* Booking Details */}
                        <div className="flex-1 flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            {/* Status Badge */}
                            <div className={`inline-flex items-center ${statusBadge.bg} rounded-full px-3 py-1 w-fit`}>
                              <span className={`font-poppins text-xs ${statusBadge.text} leading-4`}>
                                {statusBadge.label}
                              </span>
                            </div>

                            {/* Service Name */}
                            <h3 className="font-poppins font-medium text-xl text-[#111] leading-7">
                              {booking.serviceName}
                            </h3>

                            {/* Booking ID */}
                            <p className="font-inter text-base text-[#111] leading-[22px]">
                              #{booking.id.slice(0, 8)}
                            </p>

                            {/* Date/Time */}
                            <p className="font-inter text-sm text-[#777] leading-[22px]">
                              {formatDateTime(booking.scheduledDate, booking.scheduledTime)}
                            </p>
                          </div>

                          {/* Disputed Details Box (only for disputed bookings) */}
                          {booking.status === 'DISPUTED' && (
                            <div className="bg-[rgba(207,157,0,0.05)] border border-[#ffcc00] rounded-lg p-3 flex flex-col gap-1 max-w-[550px]">
                              <p className="font-poppins font-medium text-sm text-[#111] leading-4 tracking-[0.24px]">
                                Issue Reported
                              </p>
                              <p className="font-roboto-flex text-xs text-[#cf9d00] leading-normal pt-2">
                                Status: Under Review
                              </p>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Link
                              href={getBookingLink(booking)}
                              className="flex-1 max-w-[180px] border border-[#02368c] flex items-center justify-center py-3 rounded-lg hover:bg-[#f0f9ff] transition-colors"
                            >
                              <span className="font-roboto-condensed text-xs text-[#02368c] leading-4 tracking-[0.24px]">
                                View Details
                              </span>
                            </Link>
                            {booking.status === 'DISPUTED' && (
                              <button className="flex-1 max-w-[180px] bg-[#02368c] flex items-center justify-center py-3 rounded-lg shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#024189] transition-colors">
                                <span className="font-roboto-condensed text-xs text-white leading-normal">
                                  Contact Support
                                </span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Service Image */}
                        <div className="w-[154px] h-[116px] rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={booking.serviceImageUrl || '/images/booking-service-image.png'}
                            alt={booking.serviceName}
                            width={154}
                            height={116}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Right Column - Activity Stats & Help Card */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                {/* Booking Activity Widget */}
                <div className="bg-white rounded-xl p-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex flex-col gap-4">
                  <h3 className="font-poppins font-semibold text-xl text-[#0b1c30] leading-7 tracking-[-0.2px]">
                    Booking Activity
                  </h3>
                  <div className="flex flex-col gap-2">
                    {activityStats.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-[#eff4ff] rounded-lg p-2 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: stat.color }}
                          />
                          <span className="font-poppins text-sm text-[#0b1c30] leading-normal">
                            {stat.label}
                          </span>
                        </div>
                        <span className="font-medium text-sm text-[#0b1c30] leading-normal">
                          {stat.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Need Help Card */}
                <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-4 flex items-center justify-between shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-[#dae2fd] rounded-full flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/images/icons/help-support-booking-icon.svg"
                        alt=""
                        width={17}
                        height={15}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-[#0b1c30] leading-normal">
                        Location assistance needed?
                      </span>
                      <span className="font-normal text-xs text-[#424655] leading-normal">
                        Kasazon Support 24/7 on call
                      </span>
                    </div>
                  </div>
                  <button className="font-inter font-bold text-xs text-[#02368c] leading-[14.4px] tracking-[0.3px] hover:text-[#024189] transition-colors">
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
