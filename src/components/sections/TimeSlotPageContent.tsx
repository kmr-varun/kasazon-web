'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BookingSummary } from './BookingSummary';

export interface TimeSlotPageContentProps {
  onContinue: () => void;
  onCheckout: () => void;
  className?: string;
}

interface DateOption {
  date: number;
  month: string;
  day: string;
}

interface TimeSlot {
  id: string;
  label: string;
}

interface Daypart {
  id: string;
  icon: string;
  label: string;
  slots: TimeSlot[];
}

export function TimeSlotPageContent({
  onContinue,
  onCheckout,
  className = '',
}: TimeSlotPageContentProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(1);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleChangeStep = (stepIndex: number) => {
    console.log('Change step:', stepIndex);
    // TODO: Navigate to respective step
  };

  // Mock date options
  const dateOptions: DateOption[] = [
    { date: 1, month: 'Nov', day: 'FRI' },
    { date: 2, month: 'Nov', day: 'SAT' },
    { date: 3, month: 'Nov', day: 'SUN' },
    { date: 4, month: 'Nov', day: 'MON' },
    { date: 5, month: 'Nov', day: 'TUE' },
  ];

  // Mock dayparts with time slots
  const dayparts: Daypart[] = [
    {
      id: 'morning',
      icon: '/images/icons/sun-morning.svg',
      label: 'Morning',
      slots: [
        { id: 'morning-1', label: '8:00 AM – 10:00 AM' },
        { id: 'morning-2', label: '10:00 AM – 12:00 PM' },
      ],
    },
    {
      id: 'afternoon',
      icon: '/images/icons/sun-afternoon.svg',
      label: 'Afternoon (12:00 PM – 4:00 PM)',
      slots: [
        { id: 'afternoon-1', label: '8:00 AM – 10:00 AM' },
        { id: 'afternoon-2', label: '10:00 AM – 12:00 PM' },
      ],
    },
    {
      id: 'evening',
      icon: '/images/icons/sun-evening.svg',
      label: 'Evening (4:00 PM – 8:00 PM)',
      slots: [
        { id: 'evening-1', label: '8:00 AM – 10:00 AM' },
        { id: 'evening-2', label: '10:00 AM – 12:00 PM' },
      ],
    },
  ];

  const service = {
    id: 'foam-jet',
    title: 'Foam-Jet AC Service',
    price: 499,
    duration: '60–90 min service',
  };

  const reviewSteps = [
    {
      icon: '/images/icons/checkmark-circle.svg',
      title: 'Reported Issue',
      value: 'No cooling, water leaking',
    },
    {
      icon: '/images/icons/location-pin.svg',
      title: 'Service Location',
      value: '8-A Light Industrial Area, ITI Rd',
      subtext: 'Jodhpur, RJ · 342003',
    },
    {
      icon: '/images/icons/calendar.svg',
      title: 'Scheduled Slot',
      value: 'Select at Review step',
    },
  ];

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Scheduling Card */}
            <div className="flex-1 flex flex-col gap-10">
              <div className="
                bg-white
                border border-[rgba(0,0,0,0.1)]
                rounded-xl p-8 lg:p-10
                shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                flex flex-col gap-10
              ">
                {/* Header */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h2 className="
                      font-poppins font-semibold text-xl
                      text-[#0b1c30] tracking-[-0.2px] leading-[28px]
                    ">
                      When would you like this done?
                    </h2>
                  </div>
                  <p className="
                    font-poppins text-sm text-[#424655]
                    leading-normal
                  ">
                    Technicians follow stringent Kasazon sanitization & diagnostic protocols.
                  </p>
                </div>

                {/* Express Match Banner */}
                <div className="
                  bg-[#eff4ff]
                  rounded-xl
                  p-4
                  shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                  flex items-center justify-between gap-4
                  flex-col sm:flex-row
                ">
                  <div className="flex gap-4 flex-1">
                    <div className="
                      bg-[rgba(0,87,205,0.1)]
                      rounded-xl
                      w-12 h-12
                      flex items-center justify-center
                      flex-shrink-0
                    ">
                      <div className="relative w-[19px] h-[23px]">
                        <Image
                          src="/images/icons/lightning-bolt.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="
                          font-roboto-condensed font-medium text-sm
                          text-[#0b1c30]
                          leading-normal
                        ">
                          As soon as possible (Express Match)
                        </span>
                        <div className="
                          bg-[rgba(0,108,73,0.15)]
                          px-2 h-5
                          rounded-full
                          flex items-center justify-center
                        ">
                          <span className="
                            font-poppins font-medium text-xs
                            text-[#006c49]
                            tracking-[0.3px] leading-[14.4px]
                          ">
                            ~60-90 mins
                          </span>
                        </div>
                      </div>
                      <p className="
                        font-poppins text-sm text-[#424655]
                        leading-normal
                      ">
                        Automatically allocate the top-rated specialist currently available in Koramangala.
                      </p>
                    </div>
                  </div>
                  <button className="
                    bg-[#02368c]
                    px-6 py-3
                    rounded-xl
                    font-roboto-condensed font-medium text-xs uppercase
                    text-white text-center
                    tracking-[2.816px] leading-[19.2px]
                    hover:bg-[#024189] transition-colors
                    w-full sm:w-auto
                    min-w-[222px]
                  ">
                    Select
                  </button>
                </div>

                {/* Divider with Text */}
                <div className="relative flex items-center justify-center pt-px">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-px bg-[#d3e4fe]" />
                  </div>
                  <div className="relative bg-white px-8">
                    <span className="
                      font-roboto-condensed text-xs text-[#424655]
                      leading-normal
                    ">
                      OR PICK A SCHEDULED DATE & TIME
                    </span>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="flex flex-col gap-4 pt-px">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="
                        font-jakarta font-semibold text-lg
                        text-[#0b1c30]
                        leading-[28.8px]
                      ">
                        Select Date
                      </h3>
                      <p className="
                        font-poppins text-sm text-[#424655]
                        leading-normal
                      ">
                        Available appointments for the next 7 days
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="
                        font-inter font-semibold text-sm
                        text-[#0b1c30]
                        tracking-[0.14px] leading-[17.5px]
                        pr-1
                      ">
                        October / November 2026
                      </span>
                      <button className="
                        bg-[#e5eeff]
                        w-8 h-8
                        rounded-lg
                        flex items-center justify-center
                        hover:bg-[#d3e4fe] transition-colors
                      ">
                        <div className="relative w-[6px] h-[9px]">
                          <Image
                            src="/images/icons/chevron-left.svg"
                            alt="Previous week"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </button>
                      <button className="
                        bg-[#e5eeff]
                        w-8 h-8
                        rounded-lg
                        flex items-center justify-center
                        hover:bg-[#d3e4fe] transition-colors
                      ">
                        <div className="relative w-[6px] h-[9px]">
                          <Image
                            src="/images/icons/chevron-right.svg"
                            alt="Next week"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Date Carousel */}
                  <div className="flex gap-2 overflow-x-auto">
                    {dateOptions.map((date) => (
                      <button
                        key={date.date}
                        onClick={() => setSelectedDate(date.date)}
                        className={`
                          flex flex-col items-center justify-between
                          min-h-[96px]
                          px-8
                          py-2
                          rounded-xl
                          transition-colors
                          ${
                            selectedDate === date.date
                              ? 'bg-[#eff4ff]'
                              : 'bg-[#f8f9fa] hover:bg-[#eff4ff]'
                          }
                        `}
                      >
                        <span className="
                          font-roboto-condensed text-xs text-[#424655]
                          leading-normal
                        ">
                          {date.month}
                        </span>
                        <div className="flex flex-col gap-0.5 py-1">
                          <span className="
                            font-poppins font-semibold text-[28px]
                            text-[#0b1c30]
                            tracking-[-0.42px] leading-[28px]
                            text-center
                          ">
                            {String(date.date).padStart(2, '0')}
                          </span>
                          <span className="
                            font-inter font-semibold text-xs uppercase
                            text-[#424655]
                            tracking-[0.3px] leading-[14.4px]
                            text-center
                          ">
                            {date.day}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="
                      font-poppins font-semibold text-lg
                      text-[#0b1c30]
                      leading-[28.8px]
                    ">
                      Select Time Window
                    </h3>
                    <p className="
                      font-poppins text-sm
                      leading-normal
                    ">
                      <span className="text-[#424655]">Slots calibrated for </span>
                      <span className="text-[#0b1c30]">Thursday, 01 Nov</span>
                    </p>
                  </div>

                  {/* Dayparts */}
                  {dayparts.map((daypart) => (
                    <div key={daypart.id} className="flex flex-col gap-3">
                      <div className="flex items-center gap-1">
                        <div className="relative w-[18px] h-[18px]">
                          <Image
                            src={daypart.icon}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="
                          font-roboto-condensed font-medium text-sm
                          text-[#0b1c30]
                          leading-normal
                        ">
                          {daypart.label}
                        </span>
                      </div>

                      <div className="flex gap-4 flex-wrap">
                        {daypart.slots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot.id)}
                            className={`
                              bg-white
                              border border-[rgba(0,0,0,0.1)]
                              rounded-xl
                              px-4 py-4
                              shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                              transition-colors
                              ${
                                selectedSlot === slot.id
                                  ? 'border-[#02368c] border-2'
                                  : 'hover:border-[#424655]'
                              }
                            `}
                          >
                            <span className="
                              font-poppins font-medium text-base
                              text-[#0b1c30]
                              leading-[24px]
                              whitespace-nowrap
                            ">
                              {slot.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={onContinue}
                className="
                  bg-[#02368c]
                  w-full max-w-[512px]
                  px-6 py-4
                  rounded-xl
                  flex items-center justify-center gap-2
                  font-roboto-condensed font-medium text-base
                  text-white text-center
                  leading-[24px]
                  hover:bg-[#024189] transition-colors
                "
              >
                Continue
              </button>
            </div>

            {/* Right Column - Booking Summary (Sticky) */}
            <div className="lg:w-[420px] flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <BookingSummary
                  service={service}
                  reviewSteps={reviewSteps}
                  platformFee={45}
                  onCheckout={onCheckout}
                  onChangeStep={handleChangeStep}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
