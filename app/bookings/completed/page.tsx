'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { getBookings, getBookingStats, isAuthenticated, api } from '@/src/lib/api';
import type { Booking, BookingStats } from '@/src/lib/types';

export default function CompletedBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [submittedRatings, setSubmittedRatings] = useState<Set<string>>(new Set());
  const [submittingRating, setSubmittingRating] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login?redirect=/bookings/completed');
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const [bookingsData, statsData] = await Promise.all([
          getBookings('completed'),
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
  }, [router]);

  const formatCompletedDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleStarClick = async (bookingId: string, starIndex: number) => {
    const rating = starIndex + 1;
    setRatings(prev => ({ ...prev, [bookingId]: rating }));
    if (submittedRatings.has(bookingId) || submittingRating) return;
    setSubmittingRating(bookingId);
    try {
      await api.reviews.create({ bookingId, rating });
      setSubmittedRatings(prev => new Set([...prev, bookingId]));
    } catch (err: any) {
      if (err?.status === 409) {
        setSubmittedRatings(prev => new Set([...prev, bookingId]));
      }
    } finally {
      setSubmittingRating(null);
    }
  };

  const handleReorder = (booking: Booking) => {
    // Navigate to service page or booking flow with pre-filled data
    router.push(`/services/${booking.serviceId}?reorder=true`);
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-[1728px] mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-roboto-condensed font-medium text-[40px] text-[#0b1c30] leading-[48px] tracking-[-1px] mb-2">
              Completed Bookings
            </h1>
            <p className="font-poppins text-lg text-[#424655] leading-normal max-w-[780px]">
              Your past services. Rate your experience and reorder easily.
            </p>
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
                      No completed bookings yet
                    </p>
                    <Link
                      href="/services"
                      className="inline-block bg-[#02368c] px-6 py-3 rounded-lg text-white font-roboto-condensed hover:bg-[#024189] transition-colors"
                    >
                      Browse Services
                    </Link>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <Link
                      key={booking.id}
                      href={`/bookings/completed/${booking.id}`}
                      className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg p-4 flex gap-4 items-center hover:border-[#02368c] transition-colors"
                    >
                      {/* Booking Details */}
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                          {/* Service Name */}
                          <h3 className="font-poppins font-medium text-xl text-[#111] leading-7">
                            {booking.serviceName}
                          </h3>

                          {/* Provider and Completed Date */}
                          <div className="flex items-center gap-1">
                            <Image
                              src="/images/icons/provider-icon.svg"
                              alt=""
                              width={11}
                              height={11}
                            />
                            <span className="font-poppins text-base text-[#44474e] leading-normal">
                              {booking.vendorName}
                            </span>
                            <span className="font-poppins text-sm text-[#44474e] leading-normal before:content-['·'] before:mx-1.5">
                              {formatCompletedDate(booking.updatedAt)}
                            </span>
                          </div>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1.5">
                          {submittedRatings.has(booking.id) ? (
                            <span className="font-poppins text-sm text-green-600 flex items-center gap-1">
                              ✓ Rated {ratings[booking.id] || 0}/5
                            </span>
                          ) : (
                            <>
                              {[0, 1, 2, 3, 4].map((index) => (
                                <button
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleStarClick(booking.id, index);
                                  }}
                                  disabled={submittingRating === booking.id}
                                  className="w-[52.5px] h-[52.5px] transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Image
                                    src="/images/icons/star-filled.svg"
                                    alt=""
                                    width={52.5}
                                    height={52.5}
                                    className={(ratings[booking.id] || 0) > index ? 'opacity-100' : 'opacity-30'}
                                  />
                                </button>
                              ))}
                              {submittingRating === booking.id && (
                                <span className="font-poppins text-xs text-[#424655]">Saving...</span>
                              )}
                            </>
                          )}
                        </div>

                        {/* Reorder Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleReorder(booking);
                          }}
                          className="bg-[#02368c] px-4 py-3 rounded text-white font-roboto-condensed text-base leading-4 tracking-[0.24px] w-[105px] h-6 flex items-center justify-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#024189] transition-colors"
                        >
                          Reorder
                        </button>
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
                    </Link>
                  ))
                )}
              </div>

              {/* Right Column - Activity Stats & Help Card */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                {/* Booking Activity Widget */}
                <div className="bg-white rounded-xl p-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
                  <h3 className="font-poppins font-semibold text-xl text-[#0b1c30] leading-7 tracking-[-0.2px] mb-4">
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
