'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string, additionalDetails?: string) => void;
  serviceName: string;
  amountPaid: number;
  cancellationFee: number;
  paymentMethod: string;
}

export function CancelBookingModal({
  isOpen,
  onClose,
  onConfirm,
  serviceName,
  amountPaid,
  cancellationFee,
  paymentMethod,
}: CancelBookingModalProps) {
  const [selectedReason, setSelectedReason] = useState('My plans have changed');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const refundAmount = amountPaid - cancellationFee;

  const reasons = [
    'My plans have changed',
    'I selected the wrong date/time',
    'I found another service provider',
    'Service is no longer required',
    'Other reason',
  ];

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(selectedReason, additionalDetails);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white border border-[rgba(241,245,249,0.9)] rounded-[20px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-full max-w-[550px] max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col gap-5 items-center p-7">
          {/* Header */}
          <div className="flex items-start justify-between w-full">
            <h2 className="font-poppins font-semibold text-xl text-[#0f172a] leading-normal">
              Are you sure you want to cancel?
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Image src="/images/icons/close-modal-icon.svg" alt="Close" width={20} height={20} />
            </button>
          </div>

          {/* Description */}
          <div className="w-full">
            <p className="font-poppins text-sm text-[#475569] leading-normal">
              You're about to cancel your upcoming{' '}
              <span className="text-[#1e293b]">{serviceName}</span> booking. Please review your
              cancellation details below.
            </p>
          </div>

          {/* Cancellation Reason Section */}
          <div className="flex flex-col gap-2.5 w-full pt-0.5">
            <div className="flex flex-col">
              <label className="font-poppins font-medium text-base text-[#0f172a] leading-normal">
                Why are you cancelling?
              </label>
              <p className="font-roboto-flex text-xs text-[#64748b] leading-normal">
                Please select a reason for cancelling your booking.
              </p>
            </div>

            {/* Radio Options */}
            <div className="flex flex-col gap-0 max-h-[192px] overflow-auto">
              {reasons.map((reason, index) => (
                <button
                  key={reason}
                  onClick={() => setSelectedReason(reason)}
                  className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors ${
                    selectedReason === reason
                      ? 'bg-[rgba(239,246,255,0.4)] border-[#02368c]'
                      : 'bg-white border-[#e2e8f0] hover:bg-gray-50'
                  } ${index > 0 ? 'mt-0.5' : ''}`}
                >
                  <div
                    className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center ${
                      selectedReason === reason
                        ? 'bg-[#02368c] border-transparent'
                        : 'bg-white border-[#cbd5e1]'
                    }`}
                  >
                    {selectedReason === reason && (
                      <Image
                        src="/images/icons/radio-check-icon.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                    )}
                  </div>
                  <span className={`font-poppins text-sm leading-normal ${
                    selectedReason === reason ? 'text-[#1e293b]' : 'text-[#334155]'
                  }`}>
                    {reason}
                  </span>
                </button>
              ))}
            </div>

            {/* Optional Details Textarea */}
            <textarea
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="Tell us more (optional)..."
              className="bg-white border border-[#e2e8f0] rounded-lg p-3 h-14 font-roboto-flex text-xs text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c] resize-none"
            />
          </div>

          {/* Payment Summary Card */}
          <div className="bg-[#f5f5f5] rounded-sm p-6 pb-4 flex flex-col gap-2 w-full">
            <h3 className="font-roboto-condensed font-medium text-lg text-black leading-normal mb-0">
              Payment Summary
            </h3>
            <div className="flex items-center justify-between">
              <span className="font-poppins text-sm text-[#1b1c1c] leading-[22px]">
                Amount paid:
              </span>
              <span className="font-poppins text-sm text-[#1b1c1c] leading-[22px]">
                ₵{amountPaid}
              </span>
            </div>
            <div className="flex items-center justify-between pb-1">
              <span className="font-poppins text-sm text-[#ba1a1a] leading-[22px]">
                Cancellation fee:
              </span>
              <span className="font-poppins text-sm text-[#ba1a1a] leading-[22px]">
                -₵{cancellationFee}
              </span>
            </div>
            <div className="bg-[rgba(197,198,207,0.4)] h-px w-full" />
            <div className="flex items-center justify-between pt-1">
              <span className="font-poppins font-semibold text-base text-[#1a2b4c] leading-[26px]">
                Refund amount:
              </span>
              <span className="font-poppins font-semibold text-base text-[#1a2b4c] leading-[26px]">
                ₵{refundAmount}
              </span>
            </div>
            <p className="font-poppins text-sm text-[#777] leading-normal pt-1">
              Refund will be credited to {paymentMethod} within 3-5 business days
            </p>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleConfirm}
            className="bg-[#02368c] h-14 px-6 rounded-xl w-full font-roboto-condensed font-medium text-base text-white leading-6 hover:bg-[#024189] transition-colors"
          >
            Confirm Cancellation
          </button>
          <button
            onClick={onClose}
            className="h-12 px-5 w-full font-roboto-condensed text-lg text-[#02368c] leading-normal hover:bg-gray-50 transition-colors"
          >
            Keep Booking
          </button>
        </div>
      </div>
    </div>
  );
}
