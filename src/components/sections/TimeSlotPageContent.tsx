'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { BookingSummary } from './BookingSummary';
import { useBooking, type ServicePackage } from '@/src/lib/booking-context';
import type { Service } from '@/src/lib/types';

export interface TimeSlotPageContentProps {
  service: Service;
  selectedPackage: ServicePackage | null;
  onContinue: () => void;
  onCheckout: () => void;
  className?: string;
}

interface DateOption {
  date: Date;
  dateNum: number;
  month: string;
  day: string;
  isoDate: string;
}

interface TimeSlot {
  id: string;
  label: string;
  time: string; // HH:mm format
}

interface Daypart {
  id: string;
  icon: string;
  label: string;
  slots: TimeSlot[];
}

export function TimeSlotPageContent({
  service,
  selectedPackage,
  onContinue,
  onCheckout,
  className = '',
}: TimeSlotPageContentProps) {
  const { setTimeSlot, booking } = useBooking();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Generate next 7 days
  const dateOptions: DateOption[] = useMemo(() => {
    const options: DateOption[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      options.push({
        date,
        dateNum: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        isoDate: date.toISOString().split('T')[0], // YYYY-MM-DD
      });
    }

    return options;
  }, []);

  // Generate time slots for each daypart
  const dayparts: Daypart[] = useMemo(() => [
    {
      id: 'morning',
      icon: '/images/icons/sun-morning.svg',
      label: 'Morning (8:00 AM – 12:00 PM)',
      slots: [
        { id: 'morning-1', label: '8:00 AM – 10:00 AM', time: '08:00' },
        { id: 'morning-2', label: '10:00 AM – 12:00 PM', time: '10:00' },
      ],
    },
    {
      id: 'afternoon',
      icon: '/images/icons/sun-afternoon.svg',
      label: 'Afternoon (12:00 PM – 4:00 PM)',
      slots: [
        { id: 'afternoon-1', label: '12:00 PM – 2:00 PM', time: '12:00' },
        { id: 'afternoon-2', label: '2:00 PM – 4:00 PM', time: '14:00' },
      ],
    },
    {
      id: 'evening',
      icon: '/images/icons/sun-evening.svg',
      label: 'Evening (4:00 PM – 8:00 PM)',
      slots: [
        { id: 'evening-1', label: '4:00 PM – 6:00 PM', time: '16:00' },
        { id: 'evening-2', label: '6:00 PM – 8:00 PM', time: '18:00' },
      ],
    },
  ], []);

  const handleDateSelect = (isoDate: string) => {
    setSelectedDate(isoDate);
    // Reset time slot when date changes
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slotId: string, time: string) => {
    setSelectedSlot(slotId);

    if (selectedDate) {
      // Save to booking context
      setTimeSlot(selectedDate, time);
    }
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedSlot) {
      alert('Please select both date and time slot');
      return;
    }
    onContinue();
  };

  const handleChangeStep = (stepIndex: number) => {
    // Navigate to different steps
    // 0: Service selection
    // 1: Time slots
    // 2: Address selection
    console.log('Change step:', stepIndex);
  };

  const selectedDateOption = dateOptions.find(d => d.isoDate === selectedDate);

  const reviewSteps = [
    {
      icon: '/images/icons/checkmark-circle.svg',
      title: 'Selected Service',
      value: service.name,
    },
    {
      icon: '/images/icons/calendar.svg',
      title: 'Scheduled Slot',
      value: selectedDateOption
        ? `${selectedDateOption.day}, ${selectedDateOption.month} ${selectedDateOption.dateNum}`
        : 'Select date and time',
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
                    Professionals follow stringent Kasazon quality & safety protocols.
                  </p>
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
                      PICK A SCHEDULED DATE & TIME
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
                  </div>

                  {/* Date Carousel */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {dateOptions.map((dateOption) => (
                      <button
                        key={dateOption.isoDate}
                        onClick={() => handleDateSelect(dateOption.isoDate)}
                        className={`
                          flex flex-col items-center justify-between
                          min-h-[96px]
                          px-8
                          py-2
                          rounded-xl
                          transition-colors
                          ${
                            selectedDate === dateOption.isoDate
                              ? 'bg-[#eff4ff] border-2 border-[#02368c]'
                              : 'bg-[#f8f9fa] hover:bg-[#eff4ff] border-2 border-transparent'
                          }
                        `}
                      >
                        <span className="
                          font-roboto-condensed text-xs text-[#424655]
                          leading-normal
                        ">
                          {dateOption.month}
                        </span>
                        <div className="flex flex-col gap-0.5 py-1">
                          <span className="
                            font-poppins font-semibold text-[28px]
                            text-[#0b1c30]
                            tracking-[-0.42px] leading-[28px]
                            text-center
                          ">
                            {String(dateOption.dateNum).padStart(2, '0')}
                          </span>
                          <span className="
                            font-inter font-semibold text-xs uppercase
                            text-[#424655]
                            tracking-[0.3px] leading-[14.4px]
                            text-center
                          ">
                            {dateOption.day}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
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
                        <span className="text-[#424655]">Slots available for </span>
                        <span className="text-[#0b1c30]">
                          {selectedDateOption &&
                            `${selectedDateOption.day}, ${selectedDateOption.month} ${selectedDateOption.dateNum}`
                          }
                        </span>
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
                              onClick={() => handleSlotSelect(slot.id, slot.time)}
                              className={`
                                bg-white
                                border
                                rounded-xl
                                px-4 py-4
                                shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                                transition-colors
                                ${
                                  selectedSlot === slot.id
                                    ? 'border-[#02368c] border-2'
                                    : 'border-[rgba(0,0,0,0.1)] hover:border-[#424655]'
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
                )}
              </div>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={!selectedDate || !selectedSlot}
                className={`
                  w-full max-w-[512px]
                  px-6 py-4
                  rounded-xl
                  flex items-center justify-center gap-2
                  font-roboto-condensed font-medium text-base
                  text-white text-center
                  leading-[24px]
                  transition-colors
                  ${selectedDate && selectedSlot
                    ? 'bg-[#02368c] hover:bg-[#024189]'
                    : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                Continue
              </button>
            </div>

            {/* Right Column - Booking Summary (Sticky) */}
            <div className="lg:w-[420px] flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <BookingSummary
                  service={{
                    id: service.id,
                    title: service.name,
                    price: selectedPackage?.price || service.basePrice,
                    duration: selectedPackage?.durationEstimate || `${service.duration} min`,
                  }}
                  reviewSteps={reviewSteps}
                  platformFee={booking.platformFee}
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
