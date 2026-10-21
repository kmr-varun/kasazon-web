'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { getBookingById, cancelBooking, rescheduleBooking, isAuthenticated } from '@/src/lib/api';
import type { BookingDetail } from '@/src/lib/types';

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedBookingId, setCopiedBookingId] = useState(false);
  const [issueExpanded, setIssueExpanded] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(`/login?redirect=/bookings/${bookingId}`);
      return;
    }

    async function fetchBooking() {
      try {
        setLoading(true);
        setError(null);
        const data = await getBookingById(bookingId);
        setBooking(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load booking');
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [bookingId, router]);

  const copyBookingId = () => {
    if (booking) {
      navigator.clipboard.writeText(booking.id);
      setCopiedBookingId(true);
      setTimeout(() => setCopiedBookingId(false), 2000);
    }
  };

  const handleReschedule = async () => {
    // In a real implementation, this would open a date/time picker modal
    // For now, we'll show a placeholder
    alert('Reschedule functionality would open a date/time picker here');
  };

  const handleCancelBooking = async () => {
    if (!booking) return;

    try {
      setActionLoading(true);
      await cancelBooking(booking.id, cancelReason);
      setShowCancelModal(false);
      // Refresh booking data
      const updatedBooking = await getBookingById(bookingId);
      setBooking(updatedBooking);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to cancel booking');
    } finally {
      setActionLoading(false);
    }
  };

  const formatScheduleDate = (date: string, time: string) => {
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
      dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }

    return `${dateStr}, ${time}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
      case 'PENDING':
        return 'bg-[#f0f9ff] text-[#02368c]';
      case 'IN_PROGRESS':
        return 'bg-[#fef3cd] text-[#856404]';
      case 'COMPLETED':
        return 'bg-[#d4edda] text-[#155724]';
      case 'CANCELLED':
        return 'bg-[#f8d7da] text-[#721c24]';
      case 'DISPUTED':
        return 'bg-[#fff3cd] text-[#856404]';
      default:
        return 'bg-[#f0f9ff] text-[#02368c]';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Pending';
      case 'CONFIRMED':
        return 'Upcoming';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'COMPLETED':
        return 'Completed';
      case 'CANCELLED':
        return 'Cancelled';
      case 'DISPUTED':
        return 'Disputed';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-24">
          <div className="max-w-[1728px] mx-auto flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02368c]"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !booking) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-24">
          <div className="max-w-[1728px] mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error || 'Booking not found'}</p>
              <button
                onClick={() => router.push('/bookings')}
                className="mt-2 text-red-600 underline hover:text-red-800"
              >
                Back to bookings
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const platformFee = Math.round(booking.totalAmount * 0.08); // Assuming 8% platform fee
  const serviceAmount = booking.totalAmount - platformFee;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-[1728px] mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-roboto-condensed font-medium text-[40px] text-[#0b1c30] leading-[48px] tracking-[-1px]">
              Booking Details
            </h1>
          </div>

          {/* Booking Header Banner */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1 flex flex-col gap-1.5">
              <div className={`inline-flex items-center px-3 py-1 rounded-full w-fit ${getStatusColor(booking.status)}`}>
                <span className="font-inter font-bold text-xs leading-4">{getStatusLabel(booking.status)}</span>
              </div>
              <h2 className="font-inter font-bold text-2xl text-[#0f172a] leading-8 tracking-[-0.6px] pt-1.5">
                {booking.serviceName}
              </h2>
              <div className="flex items-center gap-2">
                <span className="font-inter text-sm text-[#475569] leading-5">
                  Booking ID: {booking.id.slice(0, 15)}...
                </span>
                <button
                  onClick={copyBookingId}
                  className="w-4 h-4 hover:opacity-70 transition-opacity"
                >
                  <Image src="/images/icons/copy-booking-id.svg" alt="Copy" width={16} height={16} />
                </button>
                {copiedBookingId && (
                  <span className="text-xs text-green-600">Copied!</span>
                )}
              </div>
            </div>
            <div className="w-[235px] h-[121px] rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={booking.serviceImageUrl || '/images/booking-service-image.png'}
                alt={booking.serviceName}
                width={235}
                height={121}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Booking Details */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Service Details Card */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2.5 mb-5">
                  <Image src="/images/icons/service-details-icon.svg" alt="" width={20} height={20} />
                  <h3 className="font-poppins font-semibold text-xl text-[#111] leading-normal">
                    Service Details
                  </h3>
                </div>
                <div className="flex items-start justify-between pl-4">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-poppins font-medium text-lg text-[#0f172a] leading-normal">
                      {booking.serviceName}
                    </h4>
                    {booking.notes && (
                      <p className="font-poppins text-sm text-[#777] leading-normal">
                        {booking.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-poppins text-sm text-[#777] leading-normal">Amount</span>
                    <span className="font-poppins font-semibold text-xl text-[#02368c] leading-normal">
                      {booking.currency}{serviceAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Issue Description */}
              {booking.notes && (
                <button
                  onClick={() => setIssueExpanded(!issueExpanded)}
                  className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] text-left hover:border-[#02368c] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-poppins font-medium text-lg text-[#111] leading-[22px]">
                        Notes
                      </h4>
                      <p className="font-poppins text-sm text-[#777] leading-normal">
                        {booking.notes}
                      </p>
                    </div>
                    <Image
                      src="/images/icons/dropdown-arrow.svg"
                      alt=""
                      width={18}
                      height={18}
                      className={`transition-transform ${issueExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>
              )}

              {/* Schedule & Location */}
              <div className="bg-[#f5f5f5] border border-[rgba(0,0,0,0.1)] rounded-lg p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <Image src="/images/icons/calendar-time-icon.svg" alt="" width={18} height={22} />
                  <span className="font-poppins font-medium text-base text-[#111] leading-normal">
                    {formatScheduleDate(booking.scheduledDate, booking.scheduledTimeStart)}
                  </span>
                </div>
                <div className="border-t border-[#f0eded]" />
                <div className="flex items-start gap-3">
                  <Image src="/images/icons/location-marker-icon.svg" alt="" width={16} height={22} />
                  <div className="flex flex-col gap-1">
                    <span className="font-poppins font-medium text-base text-[#111] leading-[26px]">
                      {booking.address.city}
                    </span>
                    <span className="font-poppins text-sm text-[#777] leading-normal">
                      {booking.address.addressLine1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Provider Card */}
              {booking.vendor && (
                <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                        {booking.vendor.avatarUrl ? (
                          <Image
                            src={booking.vendor.avatarUrl}
                            alt={booking.vendor.businessName}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">
                            {booking.vendor.businessName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-poppins font-medium text-base text-[#111] leading-normal">
                          {booking.vendor.businessName}
                        </h4>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-1">
                            <Image src="/images/icons/star-rating-icon.svg" alt="" width={12} height={14} />
                            <span className="font-poppins text-sm text-[rgba(17,17,17,0.7)] leading-normal">
                              {Number(booking.vendor.rating).toFixed(1)}
                            </span>
                          </div>
                          <span className="font-poppins text-sm text-[rgba(17,17,17,0.7)] leading-normal before:content-['·'] before:mx-1">
                            {booking.vendor.reviewCount} reviews
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="border border-[#02368c] flex items-center gap-1 h-[38px] px-4 rounded-lg hover:bg-[#f0f9ff] transition-colors">
                        <Image src="/images/icons/call-icon.svg" alt="" width={13} height={13} />
                        <span className="font-roboto-condensed text-base text-[#02368c] leading-4 tracking-[0.24px]">
                          Call
                        </span>
                      </button>
                      <button className="bg-[#02368c] flex items-center gap-1 h-[38px] px-4 rounded-lg shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#024189] transition-colors">
                        <Image src="/images/icons/chat-message-icon.svg" alt="" width={13} height={13} />
                        <span className="font-roboto-condensed text-base text-white leading-4 tracking-[0.24px]">
                          Chat
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons - Only show for upcoming/pending bookings */}
              {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
                <div className="flex gap-6">
                  <button
                    onClick={handleReschedule}
                    className="bg-[#02368c] h-14 px-6 rounded-xl flex items-center justify-center w-[354px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#024189] transition-colors"
                  >
                    <span className="font-roboto-condensed font-medium text-base text-white leading-6">
                      Reschedule
                    </span>
                  </button>
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="border border-[#ff3b30] h-14 px-5 rounded-lg flex items-center justify-center w-[382px] hover:bg-[rgba(255,59,48,0.05)] transition-colors"
                  >
                    <span className="font-roboto-condensed text-lg text-[#ff3b30] leading-normal">
                      Cancel Booking
                    </span>
                  </button>
                </div>
              )}

              {/* Cancellation Info - Show for cancelled bookings */}
              {booking.status === 'CANCELLED' && booking.cancellationReason && (
                <div className="bg-[#f5f5f5] border border-[rgba(0,0,0,0.1)] rounded-lg p-4 flex flex-col gap-2">
                  <p className="font-poppins font-medium text-xl text-[#111] leading-normal">
                    Cancelled
                  </p>
                  <p className="font-poppins text-lg text-[#777] leading-normal">
                    Reason: {booking.cancellationReason}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Booking Summary Card */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
                <h3 className="font-roboto-condensed font-semibold text-xl text-[#0b1c30] leading-7 tracking-[-0.2px] mb-6 pb-1">
                  Booking Summary
                </h3>

                {/* Service Item */}
                <div className="border-b border-[#f1f5f9] pb-5 mb-6">
                  <h4 className="font-poppins text-lg text-[#0f172a] leading-normal mb-1">
                    {booking.serviceName}
                  </h4>
                  {booking.vendor && (
                    <div className="flex items-center gap-1">
                      <span className="font-poppins text-sm text-[#f59e0b] leading-normal">★</span>
                      <span className="font-poppins text-sm text-[#777] leading-normal">{Number(booking.vendor.rating).toFixed(1)}</span>
                      <span className="font-inter text-[11px] text-[#64748b] leading-[16.5px] mx-1">·</span>
                      <span className="font-poppins text-sm text-[#64748b] leading-normal">{booking.vendor.reviewCount} reviews</span>
                    </div>
                  )}
                </div>

                {/* Cost Breakdown */}
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-poppins text-base text-[#424655] leading-normal">{booking.serviceName}</span>
                    <span className="font-poppins text-base text-[#0b1c30] leading-normal">{booking.currency}{serviceAmount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-poppins text-base text-[#424655] leading-normal">Platform Fee</span>
                    <span className="font-poppins text-base text-[#0b1c30] leading-normal">{booking.currency}{platformFee}</span>
                  </div>
                  <div className="bg-[#d3e4fe] h-px my-1" />
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-poppins font-semibold text-xl text-[#0b1c30] leading-7 tracking-[-0.2px]">
                      Total
                    </span>
                    <span className="font-poppins font-semibold text-xl text-[#02368c] leading-[48px] tracking-[-0.8px]">
                      {booking.currency}{booking.totalAmount}
                    </span>
                  </div>
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
        </div>
      </div>

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="font-poppins font-semibold text-xl text-[#0b1c30] mb-4">
              Cancel Booking
            </h3>
            <p className="font-poppins text-sm text-[#424655] mb-4">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Reason for cancellation (optional)"
              className="w-full border border-[rgba(0,0,0,0.12)] rounded-lg p-3 font-poppins text-sm mb-4 outline-none focus:border-[#02368c]"
              rows={3}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 border border-[rgba(0,0,0,0.1)] rounded-lg font-roboto-condensed text-sm hover:bg-gray-50 transition-colors"
                disabled={actionLoading}
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                className="px-4 py-2 bg-[#ff3b30] text-white rounded-lg font-roboto-condensed text-sm hover:bg-[#e0352b] transition-colors disabled:opacity-50"
                disabled={actionLoading}
              >
                {actionLoading ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
