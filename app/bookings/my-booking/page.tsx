'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

type BookingFilter = 'all' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled' | 'disputed';

export default function MyBookingPage() {
  const [activeFilter, setActiveFilter] = useState<BookingFilter>('disputed');

  const disputedBookings = [
    {
      id: 1,
      service: 'AC Servicing',
      bookingId: 'BK-8924',
      submittedDate: 'Submitted 2 days ago',
      issue: {
        description: "The wiring issue wasn't fully fixed, and it stopped working again the next day.",
        status: 'Under Review',
      },
      image: '/images/booking-service-image.png',
    },
    {
      id: 2,
      service: 'AC Servicing',
      bookingId: 'BK-8924',
      submittedDate: 'Submitted 2 days ago',
      issue: {
        description: "The wiring issue wasn't fully fixed, and it stopped working again the next day.",
        status: 'Under Review',
      },
      image: '/images/booking-service-image.png',
    },
  ];

  const activityStats = [
    { label: 'Upcoming Service', count: '1 Booking', color: '#006c49' },
    { label: 'Ongoing Renovation', count: '1 Active Project', color: '#f59e0b' },
    { label: 'Past Executions', count: '1 Completed', color: '#565e74' },
  ];

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
            {(['all', 'upcoming', 'ongoing', 'completed', 'cancelled', 'disputed'] as BookingFilter[]).map((filter) => (
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

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Disputed Booking Cards */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {disputedBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg p-4 flex gap-4"
                >
                  {/* Booking Details */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      {/* Service Name */}
                      <h3 className="font-poppins font-medium text-xl text-[#111] leading-7">
                        {booking.service}
                      </h3>

                      {/* Booking ID */}
                      <p className="font-inter text-base text-[#111] leading-[22px]">
                        #{booking.bookingId}
                      </p>

                      {/* Submitted Date */}
                      <p className="font-inter text-sm text-[#777] leading-[22px]">
                        {booking.submittedDate}
                      </p>
                    </div>

                    {/* Disputed Details Box */}
                    <div className="bg-[rgba(207,157,0,0.05)] border border-[#ffcc00] rounded-lg p-3 flex flex-col gap-1 max-w-[550px]">
                      <p className="font-poppins font-medium text-sm text-[#111] leading-4 tracking-[0.24px]">
                        Issue Reported:
                      </p>
                      <p className="font-roboto-flex text-xs text-[#777] leading-normal">
                        {booking.issue.description}
                      </p>
                      <p className="font-roboto-flex text-xs text-[#cf9d00] leading-normal pt-2">
                        Status: {booking.issue.status}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 w-[382px]">
                      <Link
                        href={`/bookings/disputed/${booking.id}`}
                        className="flex-1 border border-[#02368c] flex items-center justify-center py-3 rounded-lg hover:bg-[#f0f9ff] transition-colors"
                      >
                        <span className="font-roboto-condensed text-xs text-[#02368c] leading-4 tracking-[0.24px]">
                          View Details
                        </span>
                      </Link>
                      <button className="flex-1 bg-[#02368c] flex items-center justify-center py-3 rounded-lg shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#024189] transition-colors">
                        <span className="font-roboto-condensed text-xs text-white leading-normal">
                          Contact Support
                        </span>
                      </button>
                    </div>
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
                </div>
              ))}
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
        </div>
      </div>
      <Footer />
    </>
  );
}
