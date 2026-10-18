'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function CompletedBookingDetailPage() {
  const params = useParams();
  const bookingId = params.id;

  const [copiedBookingId, setCopiedBookingId] = useState(false);

  const booking = {
    id: bookingId,
    bookingCode: 'KASA-AC-30926',
    status: 'Completed',
    service: 'Foam-Jet AC Service',
    addOns: '+ Anti-bacterial Coating',
    completedDate: 'Completed 12 July, 10:00 AM',
    location: {
      address: 'East Legon, Accra',
      details: 'Near Shell fuel station, blue gate',
    },
    pricing: {
      serviceAmount: 499,
      platformFee: 45,
      total: 544,
    },
    checklist: [
      'Filter cleaning',
      'Coil cleaning (indoor & outdoor)',
      'Vent & Panel cleaning',
      'Function test',
      'Vent & Panel cleaning',
      'Anti-bacterial coating applied',
    ],
    feedback: {
      rating: 5.0,
      comment: '"Great work, very professional!"',
    },
    image: '/images/booking-service-image.png',
  };

  const copyBookingId = () => {
    navigator.clipboard.writeText(booking.bookingCode);
    setCopiedBookingId(true);
    setTimeout(() => setCopiedBookingId(false), 2000);
  };

  const downloadReceipt = () => {
    console.log('Download receipt for booking:', booking.id);
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

          {/* Booking Header Banner */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="bg-[#f0f9ff] inline-flex items-center px-3 py-1 rounded-full w-fit">
                <span className="font-inter font-bold text-xs text-[#02368c] leading-4">{booking.status}</span>
              </div>
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

              {/* Completion Date & Location */}
              <div className="bg-[#f5f5f5] border border-[rgba(0,0,0,0.1)] rounded-lg p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <Image src="/images/icons/calendar-time-icon.svg" alt="" width={18} height={22} />
                  <span className="font-poppins font-medium text-base text-[#111] leading-normal">
                    {booking.completedDate}
                  </span>
                </div>
                <div className="border-t border-[#f0eded]" />
                <div className="flex items-start gap-3">
                  <Image src="/images/icons/location-marker-icon.svg" alt="" width={16} height={22} />
                  <div className="flex flex-col gap-1">
                    <span className="font-poppins font-medium text-base text-[#111] leading-[26px]">
                      {booking.location.address}
                    </span>
                    <span className="font-poppins text-sm text-[#777] leading-normal">
                      {booking.location.details}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checklist Section */}
              <div className="border border-[rgba(0,0,0,0.1)] rounded-lg p-4 flex flex-col gap-3">
                <h3 className="font-poppins font-medium text-xl text-[#111] leading-normal">
                  Checklist
                </h3>
                <div className="flex flex-col gap-2">
                  {booking.checklist.map((task, index) => (
                    <div key={index} className="bg-white flex items-center gap-3 py-0.5 rounded-lg">
                      <div className="w-[17px] h-[17px] bg-[#2e9e5b] border border-[#2e9e5b] rounded flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/images/icons/checklist-check-icon.svg"
                          alt=""
                          width={10}
                          height={7}
                        />
                      </div>
                      <span className="font-poppins text-base text-[#111] leading-normal opacity-70">
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before/After Photos */}
              <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-2">
                  <h4 className="font-poppins font-medium text-base text-[#1a2b4c] leading-normal">
                    Before Photo
                  </h4>
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <Image
                      src="/images/before-after-photo.png"
                      alt="Before"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[rgba(26,43,76,0.2)]" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <h4 className="font-poppins font-medium text-base text-[#1a2b4c] leading-normal">
                    After Photo
                  </h4>
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <Image
                      src="/images/before-after-photo.png"
                      alt="After"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[rgba(26,43,76,0.2)]" />
                  </div>
                </div>
              </div>

              {/* Customer Feedback Card */}
              <div className="bg-[#f5f5f5] rounded-lg p-4 flex flex-col gap-1 w-[397px]">
                <div className="flex items-center gap-2 pb-1">
                  <span className="font-poppins text-sm text-[#111] leading-normal">
                    {booking.feedback.rating}
                  </span>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <Image
                        key={index}
                        src="/images/icons/star-small-icon.svg"
                        alt=""
                        width={13}
                        height={13}
                      />
                    ))}
                  </div>
                </div>
                <p className="font-poppins text-sm text-[#111] leading-normal">
                  {booking.feedback.comment}
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

                  {/* Download Receipt Button */}
                  <button
                    onClick={downloadReceipt}
                    className="border border-[#02368c] flex items-center justify-center gap-2 px-4 py-3 rounded-lg mt-5 w-full hover:bg-[#f0f9ff] transition-colors"
                  >
                    <Image src="/images/icons/download-receipt-icon.svg" alt="" width={16} height={16} />
                    <span className="font-roboto-condensed text-base text-[#02368c] leading-4 tracking-[0.24px]">
                      Download Receipt
                    </span>
                  </button>
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
