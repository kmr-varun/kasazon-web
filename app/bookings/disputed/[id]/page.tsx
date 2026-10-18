'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function DisputedBookingDetailPage() {
  const params = useParams();
  const bookingId = params.id;

  const [copiedBookingId, setCopiedBookingId] = useState(false);
  const [response, setResponse] = useState('');

  const booking = {
    id: bookingId,
    bookingCode: 'KASA-AC-30926',
    service: 'Foam-Jet AC Service',
    customer: {
      name: 'Ama Owusu',
      avatar: '/images/customer-avatar.png',
      disputeSubmitted: '2 days ago',
    },
    complaint: {
      reason: 'Incomplete work',
      description: "The wiring issue wasn't fully fixed, and it stopped working again the next day.",
      evidenceImage: '/images/evidence-thumbnail.png',
    },
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

  const handleSubmitResponse = () => {
    console.log('Submit response:', response);
    // Submit response logic here
  };

  const handleContactSupport = () => {
    console.log('Contact support');
    // Contact support logic here
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

          {/* Booking Header Banner - No status badge */}
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
            {/* Left Column - Dispute Details */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Customer's Complaint Card */}
              <div className="bg-[#f5f5f5] border border-[#ebebeb] rounded-lg p-3 flex flex-col gap-3">
                <h3 className="font-poppins text-base text-[#111] leading-normal">
                  Customer's Complaint
                </h3>
                <p className="font-poppins font-medium text-lg text-[#111] leading-normal">
                  Reason: {booking.complaint.reason}
                </p>
                <div className="flex gap-4">
                  <div className="flex-1 bg-white rounded-lg p-3 pb-3">
                    <p className="font-poppins text-base text-[#777] leading-normal">
                      {booking.complaint.description}
                    </p>
                  </div>
                  <div className="w-20 h-[86px] border border-[#e4e2e1] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={booking.complaint.evidenceImage}
                      alt="Evidence"
                      width={80}
                      height={86}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Your Submitted Evidence Section */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg p-4 flex flex-col gap-4">
                <h3 className="font-roboto-condensed font-medium text-lg text-black leading-normal">
                  Your Submitted Evidence
                </h3>
                <div className="flex gap-3 w-[351px]">
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
              </div>

              {/* Customer Info Card */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg p-3 flex items-center justify-center">
                <div className="flex gap-3 items-center w-full">
                  <div className="w-[62px] h-[62px] rounded-full overflow-hidden flex-shrink-0 shadow-sm">
                    <Image
                      src={booking.customer.avatar}
                      alt={booking.customer.name}
                      width={62}
                      height={62}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-poppins font-medium text-base text-[#111] leading-normal">
                      {booking.customer.name}
                    </h4>
                    <p className="font-poppins text-sm text-[#44474e] leading-normal">
                      Dispute Submitted {booking.customer.disputeSubmitted}
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Textarea Section */}
              <div className="flex flex-col gap-2">
                <label className="font-poppins text-lg text-[#111] leading-normal">
                  Share your side of the story
                </label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Explain what happened from your perspective..."
                  className="border border-[rgba(0,0,0,0.12)] rounded-lg p-5 h-[138px] font-poppins text-sm text-[#777] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c] resize-none"
                />
              </div>

              {/* Trust Strip */}
              <div className="bg-[rgba(59,156,156,0.15)] border border-[rgba(59,156,156,0.2)] rounded-lg p-3 flex items-center gap-3">
                <Image
                  src="/images/icons/info-icon.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="flex-shrink-0"
                />
                <p className="font-poppins text-sm text-[#111] leading-normal">
                  Our team is reviewing evidence from both sides. Resolution typically takes 24–48 hours. Your payment for this job remains held until resolved.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-6">
                <button
                  onClick={handleSubmitResponse}
                  className="bg-[#02368c] px-6 py-4 rounded-xl w-[354px] hover:bg-[#024189] transition-colors"
                >
                  <span className="font-roboto-condensed text-lg text-white leading-normal">
                    Submit Your Response
                  </span>
                </button>
                <button
                  onClick={handleContactSupport}
                  className="border border-[#02368c] h-14 px-5 rounded-lg w-[382px] hover:bg-[#f0f9ff] transition-colors"
                >
                  <span className="font-roboto-condensed text-lg text-[#02368c] leading-normal">
                    Contact Support
                  </span>
                </button>
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
