'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function UniformPage() {
  const [received, setReceived] = useState<'yes' | 'no' | null>('yes');

  const handleSubmit = () => {
    if (!received) {
      alert('Please select an option');
      return;
    }

    console.log('Uniform receipt status:', received);

    if (received === 'yes') {
      alert('Thank you for confirming! You can now start accepting jobs.');
      window.location.href = '/dashboard';
    } else {
      // Navigate to tracking page
      window.location.href = '/uniform/not-received';
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4 sm:px-6">
        <div className="w-full max-w-[620px] flex flex-col items-center gap-7">
          {/* Header */}
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col gap-8 items-center w-full">
              {/* Title */}
              <h1 className="
                font-roboto-condensed font-semibold text-4xl
                text-[#0f172a]
                tracking-[-0.65px] leading-[35.75px]
                text-center
              ">
                Uniform & Workwear
              </h1>

              {/* Description */}
              <div className="px-6">
                <p className="
                  font-poppins text-sm text-[#777]
                  leading-normal text-center
                ">
                  Manage your Kasazon uniform and delivery status.
                </p>
              </div>
            </div>
          </div>

          {/* Uniform Package Preview */}
          <div className="w-full max-w-[506px] pb-4">
            <div className="
              bg-[#eff4ff]
              rounded-xl
              p-3
              flex items-center gap-3
              shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
            ">
              {/* Uniform Image */}
              <div className="relative w-[108px] h-[80px] rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src="/images/uniform-package.png"
                  alt="Kasazon Uniform"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col gap-1">
                <h3 className="font-poppins text-lg text-[#0b1c30] leading-normal">
                  Kasazon Professional Uniform
                </h3>
                <p className="font-poppins text-base text-[#434654] leading-normal">
                  Size: L
                </p>
                <p className="font-poppins text-base text-[#434654] leading-normal">
                  Tracking #KZ-8842-US
                </p>
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="w-full max-w-[506px] flex flex-col gap-3">
            {/* Question */}
            <h2 className="font-poppins font-medium text-xl text-[#111] leading-[26px]">
              Did you receive your uniform?
            </h2>

            {/* Radio Options */}
            <div className="flex flex-col">
              {/* Option 1: Yes */}
              <button
                onClick={() => setReceived('yes')}
                className="
                  flex items-center gap-3
                  px-1 py-3
                  rounded-lg
                  hover:bg-gray-50
                  transition-colors
                "
              >
                {/* Radio Button */}
                <div className={`
                  w-[22px] h-[22px]
                  rounded-full
                  border
                  flex items-center justify-center
                  flex-shrink-0
                  ${received === 'yes'
                    ? 'bg-[#02368c] border-transparent'
                    : 'bg-white border-[#c5c6cf]'
                  }
                `}>
                  {received === 'yes' && (
                    <div className="relative w-5 h-5">
                      <Image
                        src="/images/radio-check.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Label */}
                <span className="font-inter text-base text-[#777] leading-[22px]">
                  Yes, I Received It
                </span>
              </button>

              {/* Option 2: No */}
              <button
                onClick={() => setReceived('no')}
                className="
                  flex items-center gap-3
                  px-1 py-3
                  rounded-lg
                  hover:bg-gray-50
                  transition-colors
                "
              >
                {/* Radio Button */}
                <div className={`
                  w-[22px] h-[22px]
                  rounded-full
                  border
                  flex items-center justify-center
                  flex-shrink-0
                  ${received === 'no'
                    ? 'bg-[#02368c] border-transparent'
                    : 'bg-white border-[#c5c6cf]'
                  }
                `}>
                  {received === 'no' && (
                    <div className="relative w-5 h-5">
                      <Image
                        src="/images/radio-check.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Label */}
                <span className="font-inter text-base text-[#777] leading-[22px]">
                  No, I Haven't Received It
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full max-w-[506px] mt-4">
            <button
              onClick={handleSubmit}
              className="
                w-full
                bg-[#02368c]
                h-[49px]
                rounded-lg
                font-roboto-condensed font-medium text-lg text-white
                hover:bg-[#024189] transition-colors
              "
            >
              Confirm
            </button>
          </div>

          {/* Help Text */}
          <div className="w-full max-w-[506px]">
            <p className="font-poppins text-xs text-[#777] text-center leading-normal">
              Having issues with your uniform delivery? Contact support at{' '}
              <a href="mailto:support@kasazon.com" className="text-[#02368c] underline">
                support@kasazon.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
