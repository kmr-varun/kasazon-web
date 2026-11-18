'use client';

import Image from 'next/image';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-[18px] p-7 w-full max-w-[484px]">
        {/* Close Button */}
        <div className="flex items-center justify-end mb-5">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Image src="/images/icons/close-modal-icon.svg" alt="Close" width={20} height={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5 items-center pt-4">
          {/* Icon and Text */}
          <div className="flex flex-col gap-5 items-center max-w-[282px]">
            {/* Logout Icon */}
            <div className="w-[94px] h-[94px] bg-[rgba(255,59,48,0.09)] rounded-full flex items-center justify-center">
              <Image
                src="/images/icons/logout-modal-icon.svg"
                alt="Logout"
                width={76}
                height={76}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-3 text-center">
              <h2 className="font-roboto-condensed font-medium text-xl text-[#111] leading-normal">
                Log out of WallKas?
              </h2>
              <p className="font-poppins text-base text-[#777] leading-normal">
                You'll need to verify your phone number again to log back in.
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onConfirm}
            className="bg-[#02368c] h-14 px-6 rounded-xl w-full font-roboto-condensed font-medium text-base text-white leading-6 hover:bg-[#024189] transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="h-12 px-5 w-full font-roboto-condensed text-lg text-[#02368c] leading-normal hover:bg-gray-50 transition-colors mt-0"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
