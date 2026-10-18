'use client';

import { useState } from 'react';
import Image from 'next/image';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
}

export function DeleteAccountModal({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) {
  const [reason, setReason] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleDelete = () => {
    if (isConfirmed) {
      onConfirm(reason);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-[18px] p-7 w-full max-w-[484px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-poppins font-semibold text-xl text-[#0f172a] leading-normal">
            Delete Account
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Image src="/images/icons/close-modal-icon.svg" alt="Close" width={20} height={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          {/* Intro Text */}
          <div>
            <h3 className="font-poppins font-medium text-lg text-[#111] leading-normal mb-1">
              We're sorry to see you go
            </h3>
            <p className="font-poppins text-sm text-[#777] leading-normal">
              Deleting your account is permanent and cannot be undone.
            </p>
          </div>

          {/* Warning Card */}
          <div className="bg-[rgba(255,218,214,0.54)] rounded-lg p-3 flex flex-col gap-4">
            <h4 className="font-poppins font-medium text-base text-[#93000a] leading-normal">
              What happens when you delete<br />your account
            </h4>
            <ul className="flex flex-col gap-3 list-disc pl-5">
              <li className="font-poppins text-sm text-[#93000a] leading-normal">
                Your profile and personal information will be permanently removed
              </li>
              <li className="font-poppins text-sm text-[#93000a] leading-normal">
                Your booking history will no longer be accessible
              </li>
              <li className="font-poppins text-sm text-[#93000a] leading-normal">
                Saved addresses and payment methods will be deleted
              </li>
              <li className="font-poppins text-sm text-[#93000a] leading-normal">
                You'll lose access to any active rewards or discounts
              </li>
            </ul>
          </div>

          {/* Reason Textarea */}
          <div className="flex flex-col gap-2">
            <label className="font-poppins text-lg text-[#111] leading-normal">
              Why are you leaving? (optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tell us how we can improve..."
              className="border border-[rgba(0,0,0,0.12)] rounded-lg p-3 h-[138px] font-poppins text-sm text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c] resize-none"
            />
          </div>

          {/* Confirmation Checkbox */}
          <div className="flex items-start gap-3 pb-5">
            <button
              onClick={() => setIsConfirmed(!isConfirmed)}
              className={`w-5 h-5 border rounded flex items-center justify-center flex-shrink-0 transition-colors mt-1 ${
                isConfirmed
                  ? 'bg-[#02368c] border-[#02368c]'
                  : 'bg-white border-[#75777f]'
              }`}
            >
              {isConfirmed && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M1 5L4.5 8.5L11 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <label className="font-poppins text-base text-[#111] leading-normal cursor-pointer">
              I understand that my account data will be permanently deleted and cannot be recovered.
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-0">
          <button
            onClick={handleDelete}
            disabled={!isConfirmed}
            className={`h-14 px-6 rounded-xl font-roboto-condensed font-medium text-base text-white leading-6 transition-colors ${
              isConfirmed
                ? 'bg-[#02368c] hover:bg-[#024189]'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Delete Account
          </button>
          <button
            onClick={onClose}
            className="h-12 px-5 font-roboto-condensed text-lg text-[#02368c] leading-normal hover:bg-gray-50 transition-colors"
          >
            Keep My Account
          </button>
        </div>
      </div>
    </div>
  );
}
