'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function CompletedBookingsPage() {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
  });

  const bookings = [
    {
      id: 1,
      service: 'AC Servicing',
      provider: 'Yaw Boateng',
      completedDate: '12 July, 3:47PM',
      image: '/images/booking-service-image.png',
    },
    {
      id: 2,
      service: 'AC Servicing',
      provider: 'Yaw Boateng',
      completedDate: '12 July, 3:47PM',
      image: '/images/booking-service-image.png',
    },
    {
      id: 3,
      service: 'AC Servicing',
      provider: 'Yaw Boateng',
      completedDate: '12 July, 3:47PM',
      image: '/images/booking-service-image.png',
    },
  ];

  const activityStats = [
    { label: 'Upcoming Service', count: '1 Booking', color: '#006c49' },
    { label: 'Ongoing Renovation', count: '1 Active Project', color: '#f59e0b' },
    { label: 'Past Executions', count: '1 Completed', color: '#565e74' },
  ];

  const handleStarClick = (bookingId: number, starIndex: number) => {
    setRatings(prev => ({
      ...prev,
      [bookingId]: starIndex + 1
    }));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-[1728px] mx-auto">
          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Booking Cards */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {bookings.map((booking) => (
                <Link
                  key={booking.id}
                  href={`/bookings/${booking.id}`}
                  className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg p-4 flex gap-4 items-center hover:border-[#02368c] transition-colors"
                >
                  {/* Booking Details */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      {/* Service Name */}
                      <h3 className="font-poppins font-medium text-xl text-[#111] leading-7">
                        {booking.service}
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
                          {booking.provider}
                        </span>
                        <span className="font-poppins text-sm text-[#44474e] leading-normal before:content-['•'] before:mx-1.5">
                          {booking.completedDate}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            handleStarClick(booking.id, index);
                          }}
                          className="w-[52.5px] h-[52.5px] transition-transform hover:scale-110"
                        >
                          <Image
                            src="/images/icons/star-filled.svg"
                            alt=""
                            width={52.5}
                            height={52.5}
                            className={ratings[booking.id] > index ? 'opacity-100' : 'opacity-30'}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Reorder Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Reorder booking:', booking.id);
                      }}
                      className="bg-[#02368c] px-4 py-3 rounded text-white font-roboto-condensed text-base leading-4 tracking-[0.24px] w-[105px] h-6 flex items-center justify-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#024189] transition-colors"
                    >
                      Reorder
                    </button>
                  </div>

                  {/* Service Image */}
                  <div className="w-[154px] h-[116px] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={booking.image}
                      alt={booking.service}
                      width={154}
                      height={116}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              ))}
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
        </div>
      </div>
      <Footer />
    </>
  );
}
