'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface ReviewPageContentProps {
  onPay: () => void;
  className?: string;
}

interface ServiceReview {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  issueDescription: string;
  photos: string[];
}

export function ReviewPageContent({
  onPay,
  className = '',
}: ReviewPageContentProps) {
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'mobile'>('card');

  // Mock service reviews
  const serviceReviews: ServiceReview[] = [
    {
      id: '1',
      title: 'AC Servicing',
      dateTime: 'Today, 2:00 PM – 4:00 PM',
      location: '8-A Light Industrial Area, ITI Rd',
      issueDescription: 'AC not cooling properly, making noise',
      photos: [
        '/images/issue-photo-1.png',
        '/images/issue-photo-1.png',
        '/images/issue-photo-1.png',
        '/images/issue-photo-1.png',
      ],
    },
    {
      id: '2',
      title: 'AC Servicing',
      dateTime: 'Today, 2:00 PM – 4:00 PM',
      location: '8-A Light Industrial Area, ITI Rd',
      issueDescription: 'AC not cooling properly, making noise',
      photos: [
        '/images/issue-photo-1.png',
        '/images/issue-photo-1.png',
        '/images/issue-photo-1.png',
        '/images/issue-photo-1.png',
      ],
    },
  ];

  const service = {
    id: 'foam-jet',
    title: 'Foam-Jet AC Service',
    price: 499,
    duration: '60–90 min service',
  };

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Review Content */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Service Review Cards */}
              {serviceReviews.map((review) => (
                <div
                  key={review.id}
                  className="
                    bg-white
                    border border-[rgba(0,0,0,0.1)]
                    rounded-lg p-3
                    flex flex-col gap-3
                  "
                >
                  {/* Header with Edit */}
                  <div className="flex items-center justify-between">
                    <h3 className="
                      font-roboto-condensed font-medium text-xl
                      text-[#02368c]
                      leading-normal
                    ">
                      {review.title}
                    </h3>
                    <button className="flex items-center gap-1">
                      <div className="relative w-[15px] h-[15px]">
                        <Image
                          src="/images/icons/edit-small.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="
                        font-roboto-condensed text-lg
                        text-[#02368c]
                        tracking-[0.24px] leading-[16px]
                      ">
                        Edit
                      </span>
                    </button>
                  </div>

                  {/* Date/Time */}
                  <div className="flex items-center gap-2">
                    <div className="relative w-[14px] h-[15px]">
                      <Image
                        src="/images/icons/calendar.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="
                      font-poppins text-base
                      text-[rgba(17,17,17,0.75)]
                      leading-normal
                    ">
                      {review.dateTime}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <div className="relative w-[12px] h-[15px]">
                      <Image
                        src="/images/icons/location-pin.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="
                      font-poppins text-sm text-[#777]
                      leading-normal
                    ">
                      {review.location}
                    </span>
                  </div>

                  {/* Issue Description + Photos */}
                  <div className="flex flex-col sm:flex-row gap-3 items-start justify-between">
                    <div className="flex-1">
                      <h4 className="
                        font-poppins font-medium text-base
                        text-[#111]
                        leading-normal mb-1
                      ">
                        Issue Description
                      </h4>
                      <p className="
                        font-poppins text-sm text-[#777]
                        leading-normal
                      ">
                        {review.issueDescription}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {review.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="
                            border border-[#e4e2e1]
                            rounded-lg
                            shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]
                            overflow-hidden
                            w-[92px] h-[92px]
                            flex-shrink-0
                            relative
                          "
                        >
                          <Image
                            src={photo}
                            alt={`Issue photo ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Payment Options */}
              <div className="flex flex-col gap-4 mt-9 max-w-[656px]">
                <h3 className="
                  font-poppins font-medium text-xl
                  text-[#111]
                  leading-normal
                ">
                  Select your preferred payment option.
                </h3>

                <div className="flex flex-col gap-3">
                  {/* Credit/Debit Card */}
                  <button
                    onClick={() => setSelectedPayment('card')}
                    className={`
                      bg-white
                      border
                      ${selectedPayment === 'card' ? 'border-[#c5c6cf]' : 'border-[#c5c6cf]'}
                      rounded-lg p-3
                      flex items-center gap-3
                      w-full
                      text-left
                      transition-colors
                    `}
                  >
                    <div className="
                      bg-[#f0eded]
                      w-10 h-10
                      rounded-lg
                      flex items-center justify-center
                      flex-shrink-0
                    ">
                      <div className="relative w-5 h-4">
                        <Image
                          src="/images/icons/card-icon.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h4 className="
                        font-poppins font-medium text-base
                        text-[#111]
                        leading-[26px]
                      ">
                        Credit / Debit Card
                      </h4>
                      <p className="
                        font-poppins text-sm text-[#44474e]
                        leading-normal
                      ">
                        Visa, Mastercard
                      </p>
                    </div>

                    <div className={`
                      w-5 h-5
                      rounded-full
                      border-6
                      flex-shrink-0
                      ${selectedPayment === 'card' ? 'border-[#02368c] bg-white' : 'border-[#c5c6cf] border-2 bg-white'}
                    `} />
                  </button>

                  {/* Mobile Money */}
                  <button
                    onClick={() => setSelectedPayment('mobile')}
                    className={`
                      bg-white
                      border
                      ${selectedPayment === 'mobile' ? 'border-[#c5c6cf]' : 'border-[#c5c6cf]'}
                      rounded-lg p-3
                      flex items-center gap-3
                      w-full
                      text-left
                      transition-colors
                    `}
                  >
                    <div className="
                      bg-[#f0eded]
                      w-10 h-10
                      rounded-lg
                      flex items-center justify-center
                      flex-shrink-0
                    ">
                      <div className="relative w-[18px] h-5">
                        <Image
                          src="/images/icons/wallet-icon.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h4 className="
                        font-poppins font-medium text-base
                        text-[#111]
                        leading-[26px]
                      ">
                        Mobile Money (MTN)
                      </h4>
                      <p className="
                        font-poppins text-sm text-[#777]
                        leading-normal
                      ">
                        •••• 4521
                      </p>
                    </div>

                    <div className={`
                      w-5 h-5
                      rounded-full
                      border-2
                      flex-shrink-0
                      ${selectedPayment === 'mobile' ? 'border-[#02368c] bg-white' : 'border-[#c5c6cf] bg-white'}
                    `} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Summary (Sticky) */}
            <div className="lg:w-[420px] flex-shrink-0">
              <div className="lg:sticky lg:top-24 flex flex-col gap-8">
                {/* Booking Summary with Pay button */}
                <div className="
                  bg-white
                  border border-[rgba(0,0,0,0.1)]
                  rounded-xl p-6
                  shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]
                  flex flex-col gap-6
                ">
                  <div className="pb-1">
                    <h2 className="
                      font-roboto-condensed font-semibold text-xl
                      text-[#0b1c30] tracking-[-0.2px] leading-[28px]
                    ">
                      Your Booking
                    </h2>
                  </div>

                  {/* Service Card */}
                  <div className="
                    bg-[#eff4ff]
                    rounded-xl p-4
                    flex flex-col gap-1
                  ">
                    <div className="flex items-start justify-between">
                      <h3 className="
                        font-poppins font-semibold text-base
                        text-[#0b1c30] leading-[24px]
                      ">
                        {service.title}
                      </h3>
                      <p className="
                        font-poppins font-semibold text-base
                        text-[#02368c] leading-[24px]
                      ">
                        ₹{service.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 pt-1">
                      <div className="relative w-3 h-[14px]">
                        <Image
                          src="/images/icons/clock-small.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="
                        font-poppins text-xs text-[#777]
                        tracking-[0.3px] leading-[14.4px]
                      ">
                        {service.duration}
                      </span>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="
                        font-poppins text-base text-[#424655]
                        leading-normal
                      ">
                        AC Servicing
                      </span>
                      <span className="
                        font-poppins text-base text-[#0b1c30]
                        leading-normal
                      ">
                        ₹{service.price}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="
                        font-poppins text-base text-[#424655]
                        leading-normal
                      ">
                        Platform Fee
                      </span>
                      <span className="
                        font-poppins text-base text-[#0b1c30]
                        leading-normal
                      ">
                        ₹45
                      </span>
                    </div>

                    <div className="w-full h-px bg-[#d3e4fe] my-1" />

                    <div className="flex items-center justify-between pt-1">
                      <span className="
                        font-poppins font-semibold text-xl
                        text-[#0b1c30] tracking-[-0.2px] leading-[28px]
                      ">
                        Total
                      </span>
                      <span className="
                        font-poppins font-semibold text-xl
                        text-[#02368c] tracking-[-0.8px] leading-[48px]
                      ">
                        ₹544
                      </span>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={onPay}
                    className="
                      bg-[#02368c]
                      w-full
                      px-6 py-4
                      rounded-xl
                      font-roboto-condensed font-medium text-xs uppercase
                      text-white text-center
                      tracking-[2.816px] leading-[19.2px]
                      hover:bg-[#024189] transition-colors
                    "
                  >
                    Pay
                  </button>
                </div>

                {/* Need Help Card */}
                <div className="
                  bg-white
                  border border-[rgba(0,0,0,0.1)]
                  rounded-xl p-4
                  shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                  flex items-center justify-between
                ">
                  <div className="flex items-center gap-2">
                    <div className="
                      bg-[#dae2fd]
                      w-9 h-9
                      rounded-full
                      flex items-center justify-center
                    ">
                      <div className="relative w-[17px] h-[15px]">
                        <Image
                          src="/images/icons/help-circle.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="
                        font-roboto-condensed font-medium text-sm
                        text-[#0b1c30] leading-normal
                      ">
                        Location assistance needed?
                      </span>
                      <span className="
                        font-roboto-condensed text-xs text-[#424655]
                        leading-normal
                      ">
                        Kasazon Support 24/7 on call
                      </span>
                    </div>
                  </div>

                  <button className="
                    font-inter font-bold text-xs
                    text-[#02368c]
                    tracking-[0.3px] leading-[14.4px]
                    hover:underline
                  ">
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
