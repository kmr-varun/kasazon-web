'use client';

import Image from 'next/image';

export interface BookingCartProps {
  itemCount: number;
  onCheckout: () => void;
  className?: string;
}

const promises = [
  '100% Verified Professionals',
  'Hassle-Free Doorstep Booking',
  'Transparent Upfront Pricing',
  '30-Day Post-Service Warranty',
];

export function BookingCart({
  itemCount,
  onCheckout,
  className = '',
}: BookingCartProps) {
  const isEmpty = itemCount === 0;

  return (
    <div className={`
      bg-[#f2f3f9]
      border border-[rgba(0,0,0,0.1)]
      rounded-xl p-6
      shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
      flex flex-col gap-4
      ${className}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="
          font-roboto-condensed font-semibold text-xl
          text-[#0b1c30] tracking-[-0.2px] leading-[28px]
        ">
          Your Booking
        </h2>
        <div className="
          bg-[rgba(0,87,205,0.1)]
          px-2 py-0.5
          rounded-full
        ">
          <span className="font-roboto-condensed text-xs text-[#02368c]">
            {itemCount} items
          </span>
        </div>
      </div>

      {/* Empty State */}
      {isEmpty && (
        <div className="flex flex-col items-center gap-2 py-6">
          {/* Icon */}
          <div className="
            bg-[#e5eeff]
            w-14 h-14
            rounded-full
            flex items-center justify-center
          ">
            <div className="relative w-[19px] h-[23px]">
              <Image
                src="/images/icons/cart-empty.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <p className="
            font-poppins font-semibold text-base
            text-[#0b1c30] text-center
          ">
            Your cart is empty
          </p>

          {/* Description */}
          <p className="
            font-poppins text-sm text-[#424655]
            text-center leading-normal
          ">
            Add a service to schedule your<br />appointment.
          </p>
        </div>
      )}

      {/* Checkout Button */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onCheckout}
          disabled={isEmpty}
          className={`
            h-[51px]
            rounded-xl
            font-roboto-condensed font-medium text-xs uppercase tracking-[2.816px]
            text-white
            transition-colors
            ${isEmpty
              ? 'bg-[#dadada] cursor-not-allowed'
              : 'bg-[#02368c] hover:bg-[#024189]'
            }
          `}
        >
          Proceed to checkout
        </button>

        <p className="
          font-poppins text-sm text-[#424655]
          text-center leading-normal
        ">
          Select at least one service to<br />continue
        </p>
      </div>

      {/* WallKas Promise */}
      <div className="flex flex-col gap-2 pt-6 border-t border-[rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="flex items-center gap-1">
          <div className="relative w-[13px] h-[17px]">
            <Image
              src="/images/icons/shield-check.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <h3 className="
            font-roboto-condensed font-medium text-sm
            text-[#0b1c30]
          ">
            WallKas Promise
          </h3>
        </div>

        {/* List */}
        <div className="flex flex-col gap-1">
          {promises.map((promise, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className="relative w-[11px] h-[8px]">
                <Image
                  src="/images/icons/checkmark.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span className="
                font-poppins text-sm text-[#424655]
                leading-normal
              ">
                {promise}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
