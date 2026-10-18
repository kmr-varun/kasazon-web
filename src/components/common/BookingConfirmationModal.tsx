'use client';

import Image from 'next/image';

interface Provider {
  name: string;
  avatar: string;
  rating: number;
  specialty: string;
  distance: string;
}

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  provider: Provider;
  dateTime: string;
  location: string;
  onCall: () => void;
  onChat: () => void;
  onTrackBooking: () => void;
  onBackToHome: () => void;
  onViewBooking: () => void;
}

export function BookingConfirmationModal({
  isOpen,
  onClose,
  serviceTitle,
  provider,
  dateTime,
  location,
  onCall,
  onChat,
  onTrackBooking,
  onBackToHome,
  onViewBooking,
}: BookingConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        z-50
        bg-white
        border border-[#f1f5f9]
        rounded-3xl
        shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]
        p-8
        max-w-[920px] w-[90vw]
        max-h-[90vh] overflow-y-auto
      ">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-5 right-5
            bg-[#f1f5f9]
            w-9 h-9
            rounded-full
            flex items-center justify-center
            hover:bg-[#e2e8f0] transition-colors
          "
        >
          <div className="relative w-[12px] h-[12px]">
            <Image
              src="/images/icons/close-icon.svg"
              alt="Close"
              fill
              className="object-contain"
            />
          </div>
        </button>

        {/* Hero Section */}
        <div className="flex flex-col items-center mb-4">
          {/* Success Icon */}
          <div className="
            bg-[#22c55e]
            w-[116px] h-[116px]
            rounded-full
            shadow-[0px_14px_22px_-4px_rgba(34,197,94,0.3),0px_6px_9px_-6px_rgba(34,197,94,0.3)]
            flex items-center justify-center
            mb-6
          ">
            <div className="relative w-[47px] h-[35px]">
              <Image
                src="/images/icons/success-checkmark.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Heading */}
          <h2 className="
            font-roboto-condensed font-semibold text-[22px]
            text-[#031636]
            leading-[28px]
            text-center
            mb-2
          ">
            Your Booking is Confirmed! 🎉
          </h2>

          <p className="
            font-poppins text-sm text-[#777]
            leading-normal
            text-center
            max-w-[320px]
          ">
            Your provider has been notified and will arrive as scheduled.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="
          bg-white
          border border-[rgba(0,0,0,0.1)]
          rounded-lg
          shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
          p-3
          mb-4
        ">
          {/* Service Title */}
          <h3 className="
            font-roboto-condensed font-medium text-xl
            text-[#02368c]
            leading-[28px]
            mb-3
          ">
            {serviceTitle}
          </h3>

          {/* Provider Info & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
            <div className="flex gap-3 items-center flex-1">
              {/* Avatar */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={provider.avatar}
                  alt={provider.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Provider Details */}
              <div className="flex flex-col gap-1">
                <h4 className="
                  font-poppins font-medium text-lg
                  text-[#111]
                  leading-normal
                ">
                  {provider.name}
                </h4>

                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <div className="relative w-[12px] h-[14px]">
                      <Image
                        src="/images/icons/star-filled.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="
                      font-poppins text-base
                      text-[rgba(17,17,17,0.7)]
                      leading-normal
                    ">
                      {provider.rating}
                    </span>
                    <span className="
                      font-poppins text-base
                      text-[rgba(17,17,17,0.7)]
                      leading-normal
                    ">
                      • {provider.specialty}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="relative w-[9px] h-[12px]">
                      <Image
                        src="/images/icons/distance-icon.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="
                      font-poppins text-base
                      text-[rgba(17,17,17,0.7)]
                      leading-normal
                    ">
                      {provider.distance}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call & Chat Buttons */}
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={onCall}
                className="
                  flex-1 sm:flex-none
                  border border-[#02368c]
                  h-8
                  px-4
                  rounded-lg
                  flex items-center justify-center gap-1
                  hover:bg-[#02368c]/5 transition-colors
                "
              >
                <div className="relative w-[13px] h-[13px]">
                  <Image
                    src="/images/icons/call-icon.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="
                  font-roboto-condensed text-sm
                  text-[#02368c]
                  tracking-[0.24px] leading-[16px]
                ">
                  Call
                </span>
              </button>

              <button
                onClick={onChat}
                className="
                  flex-1 sm:flex-none
                  bg-[#02368c]
                  h-8
                  px-4
                  rounded-lg
                  shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                  flex items-center justify-center gap-1
                  hover:bg-[#024189] transition-colors
                "
              >
                <div className="relative w-[13px] h-[13px]">
                  <Image
                    src="/images/icons/message-icon.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="
                  font-roboto-condensed text-sm
                  text-white
                  tracking-[0.24px] leading-[16px]
                ">
                  Chat
                </span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[rgba(0,0,0,0.1)] mb-4" />

          {/* Schedule & Location */}
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex items-center gap-3">
              <div className="relative w-[15px] h-[19px]">
                <Image
                  src="/images/icons/calendar.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span className="
                font-poppins text-base text-[#111]
                leading-normal
              ">
                {dateTime}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-[13px] h-[19px]">
                <Image
                  src="/images/icons/location-pin.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span className="
                font-poppins text-base text-[#111]
                leading-normal
              ">
                {location}
              </span>
            </div>
          </div>

          {/* Track Booking Button */}
          <div className="flex justify-end">
            <button
              onClick={onTrackBooking}
              className="
                bg-[#02368c]
                h-[43px]
                px-8
                rounded
                font-roboto-condensed text-sm text-white
                hover:bg-[#024189] transition-colors
              "
            >
              Track Your Booking
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-8">
          <button
            onClick={onBackToHome}
            className="
              border border-[#02368c]
              h-[49px]
              px-5
              rounded-lg
              font-roboto-condensed font-medium text-lg
              text-[#02368c]
              hover:bg-[#02368c]/5 transition-colors
              min-w-[239px]
            "
          >
            Back To Home
          </button>

          <button
            onClick={onViewBooking}
            className="
              bg-[#02368c]
              h-[49px]
              px-5
              rounded-lg
              font-roboto-condensed font-medium text-lg
              text-white
              hover:bg-[#024189] transition-colors
              min-w-[239px]
            "
          >
            View Booking
          </button>
        </div>
      </div>
    </>
  );
}
