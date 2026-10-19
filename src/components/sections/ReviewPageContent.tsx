'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { BookingState } from '@/src/lib/booking-context';
import type { PaymentMethod } from '@/src/lib/types';

export interface ReviewPageContentProps {
  booking: BookingState;
  paymentMethods: PaymentMethod[];
  selectedPaymentMethod: string | null;
  onPaymentMethodSelect: (methodId: string) => void;
  onPay: () => void;
  isProcessing: boolean;
  className?: string;
}

export function ReviewPageContent({
  booking,
  paymentMethods,
  selectedPaymentMethod,
  onPaymentMethodSelect,
  onPay,
  isProcessing,
  className = '',
}: ReviewPageContentProps) {
  const [showAddPayment, setShowAddPayment] = useState(false);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Booking Details */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Booking Summary Card */}
              <div className="
                bg-white
                border border-[rgba(0,0,0,0.1)]
                rounded-xl p-6
                shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
              ">
                <h2 className="
                  font-roboto-condensed font-semibold text-2xl
                  text-[#0b1c30] mb-6
                ">
                  Booking Summary
                </h2>

                {/* Service */}
                <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    {booking.service?.imageUrl ? (
                      <Image
                        src={booking.service.imageUrl}
                        alt={booking.service.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-roboto-condensed font-semibold text-xl text-[#0b1c30] mb-1">
                      {booking.service?.name}
                    </h3>
                    {booking.selectedPackage && (
                      <p className="font-poppins text-sm text-[#64748b] mb-2">
                        {booking.selectedPackage.label}
                      </p>
                    )}
                    <p className="font-poppins font-semibold text-lg text-[#02368c]">
                      GH₵ {booking.subtotal}
                    </p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                    <Image
                      src="/images/icons/calendar.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-poppins font-medium text-sm text-[#424655] mb-1">
                      Date & Time
                    </p>
                    <p className="font-poppins text-base text-[#0b1c30]">
                      {booking.selectedDate && formatDate(booking.selectedDate)}
                      {booking.selectedTime && ` at ${booking.selectedTime}`}
                    </p>
                  </div>
                </div>

                {/* Address */}
                {booking.selectedAddress && (
                  <div className="flex items-start gap-3 mb-4">
                    <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                      <Image
                        src="/images/icons/location-pin.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-poppins font-medium text-sm text-[#424655] mb-1">
                        Service Location
                      </p>
                      <p className="font-poppins text-base text-[#0b1c30]">
                        {booking.selectedAddress.label}
                      </p>
                      <p className="font-poppins text-sm text-[#64748b]">
                        {booking.selectedAddress.street}, {booking.selectedAddress.city}
                      </p>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {booking.notes && (
                  <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                    <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                      <Image
                        src="/images/icons/note-icon.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-poppins font-medium text-sm text-[#424655] mb-1">
                        Additional Notes
                      </p>
                      <p className="font-poppins text-base text-[#0b1c30]">
                        {booking.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method Selection */}
              <div className="
                bg-white
                border border-[rgba(0,0,0,0.1)]
                rounded-xl p-6
                shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
              ">
                <h2 className="
                  font-roboto-condensed font-semibold text-2xl
                  text-[#0b1c30] mb-4
                ">
                  Payment Method
                </h2>

                {paymentMethods.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="font-poppins text-sm text-[#64748b] mb-4">
                      No payment methods saved. You can add one now or pay later.
                    </p>
                    <button
                      onClick={() => setShowAddPayment(true)}
                      className="
                        bg-[#eff4ff] text-[#02368c]
                        px-6 py-3 rounded-lg
                        font-roboto-condensed font-medium text-sm
                        hover:bg-[#d3e4fe] transition-colors
                      "
                    >
                      Add Payment Method
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => onPaymentMethodSelect(method.id)}
                        className={`
                          border-2 rounded-lg p-4
                          flex items-center justify-between
                          transition-colors
                          ${selectedPaymentMethod === method.id
                            ? 'border-[#02368c] bg-[#eff4ff]'
                            : 'border-gray-200 bg-white hover:border-[#02368c]'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            {method.type === 'CARD' ? '💳' : '📱'}
                          </div>
                          <div className="text-left">
                            <p className="font-poppins font-medium text-base text-[#0b1c30]">
                              {method.type === 'CARD' ? `Card ending in ${method.last4}` : `Mobile Money ${method.last4}`}
                            </p>
                            {method.brand && (
                              <p className="font-poppins text-sm text-[#64748b]">
                                {method.brand}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className={`
                          w-5 h-5 rounded-full border-2
                          flex items-center justify-center
                          ${selectedPaymentMethod === method.id
                            ? 'border-[#02368c]'
                            : 'border-gray-300'
                          }
                        `}>
                          {selectedPaymentMethod === method.id && (
                            <div className="w-3 h-3 bg-[#02368c] rounded-full" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Price Summary & Pay Button */}
            <div className="lg:w-[420px] flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <div className="
                  bg-white
                  border border-[rgba(0,0,0,0.1)]
                  rounded-xl p-6
                  shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                ">
                  <h3 className="
                    font-roboto-condensed font-semibold text-xl
                    text-[#0b1c30] mb-6
                  ">
                    Price Details
                  </h3>

                  {/* Price Breakdown */}
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-poppins text-base text-[#424655]">
                        Service Charge
                      </span>
                      <span className="font-poppins font-semibold text-base text-[#0b1c30]">
                        GH₵ {booking.subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-poppins text-base text-[#424655]">
                        Platform Fee (3%)
                      </span>
                      <span className="font-poppins font-semibold text-base text-[#0b1c30]">
                        GH₵ {booking.platformFee.toFixed(2)}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-roboto-condensed font-semibold text-xl text-[#0b1c30]">
                          Total Amount
                        </span>
                        <span className="font-roboto-condensed font-semibold text-2xl text-[#02368c]">
                          GH₵ {booking.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={onPay}
                    disabled={isProcessing}
                    className={`
                      w-full h-14 rounded-xl
                      font-roboto-condensed font-medium text-lg
                      text-white
                      transition-colors
                      ${isProcessing
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-[#02368c] hover:bg-[#024189]'
                      }
                    `}
                  >
                    {isProcessing ? 'Processing...' : 'Confirm & Pay'}
                  </button>

                  {/* Additional Info */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-start gap-2">
                      <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                        <Image
                          src="/images/icons/shield-check.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-poppins text-sm text-[#424655] leading-relaxed">
                          Your payment is secure and protected. You can cancel within 24 hours for a full refund.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
