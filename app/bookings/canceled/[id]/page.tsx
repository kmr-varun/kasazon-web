'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function CanceledBookingDetailPage() {
  const params = useParams();
  const bookingId = params.id;

  const [copiedBookingId, setCopiedBookingId] = useState(false);

  const booking = {
    id: bookingId,
    bookingCode: 'KASA-AC-30926',
    service: 'Foam-Jet AC Service',
    addOns: '+ Anti-bacterial Coating',
    canceledBy: 'You',
    cancelReason: 'Schedule conflict',
    pricing: {
      serviceAmount: 499,
      platformFee: 45,
      total: 544,
    },
    image: '/images/booking-service-image.png',
  };

  const copyBookingId = () => {
    navigator.clipboard.writeText(booking.bookingCode);
    setCopiedBookingId(true);
    setTimeout(() => setCopiedBookingId(false), 2000);
  };

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

          {/* Booking Header Banner - No status badge for canceled */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1 flex flex-col gap-1.5">
              <h2 className="font-inter font-bold text-2xl text-[#0f172a] leading-8 tracking-[-0.6px] pt-1.5">
                {booking.service}
              </h2>
              <div className="flex items-center gap-2">
                <span className="font-inter text-sm text-[#475569] leading-5">
                  Booking ID: {booking.bookingCode}
                </span>
                <button
                  onClick={copyBookingId}
                  className="w-4 h-4 hover:opacity-70 transition-opacity"
                >
                  <Image src="/images/icons/copy-booking-id.svg" alt="Copy" width={16} height={16} />
                </button>
              </div>
            </div>
            <div className="w-[235px] h-[121px] rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={booking.image}
                alt={booking.service}
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
                      {booking.service}
                    </h4>
                    <p className="font-poppins text-sm text-[#777] leading-normal">
                      {booking.addOns}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-poppins text-sm text-[#777] leading-normal">Amount Paid</span>
                    <span className="font-poppins font-semibold text-xl text-[#02368c] leading-normal">
                      ₵{booking.pricing.serviceAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cancellation Details Card */}
              <div className="bg-[#f5f5f5] border border-[rgba(0,0,0,0.1)] rounded-lg p-4 flex flex-col gap-2">
                <p className="font-poppins font-medium text-xl text-[#111] leading-normal">
                  Cancelled by: {booking.canceledBy}
                </p>
                <p className="font-poppins text-lg text-[#777] leading-normal">
                  Reason: {booking.cancelReason}
                </p>
              </div>

              {/* Warning Banner */}
              <div className="bg-[#ffdad6] flex items-start gap-3 p-3 rounded-lg">
                <Image
                  src="/images/icons/warning-icon.svg"
                  alt=""
                  width={22}
                  height={23}
                  className="flex-shrink-0"
                />
                <p className="font-roboto-flex text-xs text-[#93000a] leading-normal">
                  Cancelling jobs after acceptance may affect your reliability score. Try to avoid cancelling once a job is confirmed.
                </p>
              </div>
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
                    {booking.service}
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="font-poppins text-sm text-[#f59e0b] leading-normal">★</span>
                    <span className="font-poppins text-sm text-[#777] leading-normal">4.5</span>
                    <span className="font-inter text-[11px] text-[#64748b] leading-[16.5px] mx-1">•</span>
                    <span className="font-poppins text-sm text-[#64748b] leading-normal">420 reviews</span>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-poppins text-base text-[#424655] leading-normal">AC Servicing</span>
                    <span className="font-poppins text-base text-[#0b1c30] leading-normal">₵{booking.pricing.serviceAmount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-poppins text-base text-[#424655] leading-normal">Platform Fee</span>
                    <span className="font-poppins text-base text-[#0b1c30] leading-normal">₵{booking.pricing.platformFee}</span>
                  </div>
                  <div className="bg-[#d3e4fe] h-px my-1" />
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-poppins font-semibold text-xl text-[#0b1c30] leading-7 tracking-[-0.2px]">
                      Total
                    </span>
                    <span className="font-poppins font-semibold text-xl text-[#02368c] leading-[48px] tracking-[-0.8px]">
                      ₵{booking.pricing.total}
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
      <Footer />
    </>
  );
}
