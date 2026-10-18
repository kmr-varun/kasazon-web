'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<'customer' | 'professional'>('customer');

  const handleContinue = () => {
    console.log('Continue as:', accountType);
    // Store account type in URL query parameter
    window.location.href = `/register/details?type=${accountType}`;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex flex-col items-center py-8 sm:py-12 lg:py-24 px-4 sm:px-6">
      <div className="w-full max-w-[680px]">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-14">
          {/* Title */}
          <h1 className="
            font-roboto-condensed font-semibold text-3xl sm:text-4xl lg:text-[40px]
            text-[#0f172a]
            tracking-[-0.65px] leading-tight sm:leading-[35.75px]
            text-center
            px-2
          ">
            Welcome to Kasazon
          </h1>

          {/* Progress Indicator */}
          <div className="flex gap-1 w-full max-w-[437px]">
            <div className="flex-1 h-[10px] bg-[#02368c] rounded-full" />
            <div className="flex-1 h-[10px] bg-[#f2f2f2] rounded-full" />
            <div className="flex-1 h-[10px] bg-[#f2f2f2] rounded-full" />
          </div>

          {/* Description */}
          <p className="
            font-poppins text-sm text-[#64748b]
            leading-normal
            text-center
            max-w-[384px]
            px-4
          ">
            Choose how you'd like to continue. We'll personalize your experience based on your specific needs.
          </p>
        </div>

        {/* Main Card */}
        <div className="
          bg-white
          border border-[#dcdcdc]
          rounded-xl sm:rounded-2xl
          px-4 sm:px-8 lg:px-12
          pt-8 sm:pt-12
          pb-6 sm:pb-10
          flex flex-col gap-8 sm:gap-12
        ">
          {/* Account Type Selection */}
          <div className="flex flex-col gap-4">
            {/* Customer Option */}
            <button
              onClick={() => setAccountType('customer')}
              className={`
                w-full
                p-[22px]
                rounded-2xl
                border-2
                text-left
                transition-all
                ${accountType === 'customer'
                  ? 'border-[#02368c] bg-[rgba(239,246,255,0.4)]'
                  : 'border-[#d6d6d6] bg-white'
                }
              `}
            >
              <div className="flex gap-3.5">
                {/* Icon */}
                <div className={`
                  w-11 h-11
                  rounded-xl
                  flex items-center justify-center
                  flex-shrink-0
                  shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]
                  ${accountType === 'customer'
                    ? 'bg-[rgba(219,234,254,0.9)]'
                    : 'bg-[#deecfe] border border-[#deecfe]'
                  }
                `}>
                  <div className="relative w-6 h-6">
                    <Image
                      src="/images/icons/customer-icon.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1">
                  <h3 className="
                    font-roboto-condensed font-semibold text-xl
                    text-[#0f172a]
                    leading-[22px]
                  ">
                    I'm a Customer
                  </h3>
                  <p className="
                    font-roboto-condensed text-xs text-[#64748b]
                    leading-normal
                  ">
                    Book verified local artisans for painting, repairs, cleaning, electrical, and 50+ home services.
                  </p>
                </div>
              </div>
            </button>

            {/* Professional Option */}
            <button
              onClick={() => setAccountType('professional')}
              className={`
                w-full
                p-[21px]
                rounded-2xl
                border
                text-left
                transition-all
                ${accountType === 'professional'
                  ? 'border-[#02368c] border-2 bg-[rgba(239,246,255,0.4)]'
                  : 'border-[#d6d6d6] bg-white'
                }
              `}
            >
              <div className="flex gap-3.5">
                {/* Icon */}
                <div className="
                  w-11 h-11
                  rounded-xl
                  flex items-center justify-center
                  flex-shrink-0
                  bg-[#deecfe]
                  border border-[#deecfe]
                  shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                ">
                  <div className="relative w-6 h-6">
                    <Image
                      src="/images/icons/professional-icon.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1">
                  <h3 className="
                    font-roboto-condensed font-semibold text-xl
                    text-[#0f172a]
                    leading-[22px]
                  ">
                    I'm a Professional
                  </h3>
                  <p className="
                    font-roboto-condensed text-xs text-[#64748b]
                    leading-normal
                  ">
                    Join Ghana's verified network of tradesmen. Receive high-paying jobs and withdraw directly to Mobile Money.
                  </p>
                </div>
              </div>
            </button>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="
                bg-[#02368c]
                h-[49px]
                rounded-lg
                font-roboto-condensed text-lg text-white
                hover:bg-[#024189] transition-colors
                mt-4
              "
            >
              Continue as {accountType === 'customer' ? 'Customer' : 'Professional'}
            </button>

            {/* Login Link */}
            <div className="text-center pt-1">
              <p className="
                font-roboto-condensed font-medium text-sm text-[#64748b]
                leading-normal
              ">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-[#02368c] hover:underline"
                >
                  Log in here
                </Link>
              </p>
            </div>
          </div>

          {/* Footer - Legal Text */}
          <div className="
            border-t border-[#f1f5f9]
            pt-3
          ">
            <p className="
              font-roboto-condensed text-xs text-[#777]
              leading-normal
              text-center
            ">
              By continuing, you agree to Kasazon's Terms & Conditions and Privacy Policy. All artisan credentials are encrypted and verified under Ghanaian regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
