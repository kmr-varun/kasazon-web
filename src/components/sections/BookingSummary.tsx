'use client';

import Image from 'next/image';

interface ServiceItem {
  id: string;
  title: string;
  price: number;
  duration: string;
}

interface ReviewStep {
  icon: string;
  title: string;
  value: string;
  subtext?: string;
}

export interface BookingSummaryProps {
  service: ServiceItem;
  reviewSteps: ReviewStep[];
  platformFee: number;
  onCheckout: () => void;
  onChangeStep: (stepIndex: number) => void;
  isDisabled?: boolean;
  className?: string;
}

export function BookingSummary({
  service,
  reviewSteps,
  platformFee,
  onCheckout,
  onChangeStep,
  isDisabled = false,
  className = '',
}: BookingSummaryProps) {
  const total = service.price + platformFee;

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      {/* Main Booking Card */}
      <div className="
        bg-white
        border border-[rgba(0,0,0,0.1)]
        rounded-xl p-6
        shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]
        flex flex-col gap-6
      ">
        {/* Header */}
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

        {/* Review Steps */}
        <div className="flex flex-col gap-4">
          {reviewSteps.map((step, index) => (
            <div
              key={index}
              className="
                bg-white
                border border-[rgba(0,0,0,0.1)]
                rounded-lg p-3
                flex items-center justify-between
              "
            >
              <div className="flex gap-2">
                <div className="relative w-[15px] h-[17px] flex-shrink-0">
                  <Image
                    src={step.icon}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="
                    font-roboto-condensed font-medium text-sm
                    text-[#0b1c30] leading-normal
                  ">
                    {step.title}
                  </span>
                  <span className="
                    font-poppins text-sm text-[#424655]
                    leading-normal
                  ">
                    {step.value}
                  </span>
                  {step.subtext && (
                    <span className="
                      font-poppins text-sm text-[#565e74]
                      leading-normal
                    ">
                      {step.subtext}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => onChangeStep(index)}
                className="
                  font-inter font-semibold text-xs
                  text-[#0057cd]
                  tracking-[0.3px] leading-[14.4px]
                  hover:underline
                "
              >
                Change
              </button>
            </div>
          ))}
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
              ₹{platformFee}
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
              ₹{total}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          disabled={isDisabled}
          className={`
            ${isDisabled ? 'bg-[#dadada] opacity-50 cursor-not-allowed' : 'bg-[#02368c] hover:bg-[#024189]'}
            w-full
            px-6 py-4
            rounded-xl
            font-roboto-condensed font-medium text-xs uppercase
            text-white text-center
            tracking-[2.816px] leading-[19.2px]
            transition-colors
          `}
        >
          Proceed to checkout
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
  );
}
