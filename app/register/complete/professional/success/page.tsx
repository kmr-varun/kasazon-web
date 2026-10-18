'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function ProfessionalSuccessPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4 sm:px-6">
        <div className="w-full max-w-[620px] flex flex-col items-center gap-3">
          {/* Success Icon */}
          <div className="relative w-[169px] h-[169px] mb-2">
            <Image
              src="/images/success-icon.png"
              alt="Success"
              fill
              className="object-contain"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-7 w-full">
            {/* Header */}
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-col gap-8 items-center w-full">
                {/* Title */}
                <h1 className="
                  font-roboto-condensed font-semibold text-4xl
                  text-[#0f172a]
                  tracking-[-0.65px] leading-[35.75px]
                  text-center
                ">
                  Application Submitted!
                </h1>

                {/* Description */}
                <div className="px-6">
                  <p className="
                    font-poppins text-sm text-[#64748b]
                    leading-normal text-center
                  ">
                    We're reviewing your documents. This typically takes 24-48 hours. We'll notify you once you're approved to start receiving jobs.
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="
                bg-[rgba(207,157,0,0.1)]
                border border-[rgba(207,157,0,0.3)]
                rounded-full
                px-[17px] py-[7px]
                flex items-center gap-2
              ">
                <div className="relative w-[12px] h-[12px]">
                  <Image
                    src="/images/checkmark-icon.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="
                  font-poppins text-xs text-[#cf9d00]
                  leading-normal
                ">
                  Under Review
                </span>
              </div>
            </div>

            {/* Verification Card */}
            <div className="px-6">
              <div className="
                bg-[rgba(59,156,156,0.1)]
                rounded-lg
                p-4
                flex flex-col gap-3
                shadow-[0px_1px_2px_0px_rgba(26,43,76,0.05)]
              ">
                {/* Heading */}
                <h2 className="
                  font-poppins font-medium text-lg text-[#111]
                  leading-normal
                ">
                  Our team will verify:
                </h2>

                {/* List */}
                <div className="flex flex-col gap-3">
                  {/* Item 1 */}
                  <div className="flex items-start gap-3">
                    <div className="relative w-[21px] h-[23px] flex-shrink-0 mt-0.5">
                      <Image
                        src="/images/checkmark-green.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="font-poppins text-sm text-[#111] leading-normal">
                      Your identity and documents
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-3">
                    <div className="relative w-[21px] h-[23px] flex-shrink-0 mt-0.5">
                      <Image
                        src="/images/checkmark-green.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="font-poppins text-sm text-[#111] leading-normal">
                      Your background check
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-3">
                    <div className="relative w-[21px] h-[23px] flex-shrink-0 mt-0.5">
                      <Image
                        src="/images/checkmark-green.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="font-poppins text-sm text-[#111] leading-normal">
                      Your guarantor details
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[rgba(0,0,0,0.1)] pt-4">
                  <div className="flex items-center gap-2">
                    <div className="relative w-[12px] h-[12px] flex-shrink-0">
                      <Image
                        src="/images/info-circle.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="font-poppins text-xs text-[#777] leading-normal">
                      You'll get a notification the moment you're approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full px-6 mt-4">
            <Link
              href="/"
              className="
                flex-1
                bg-[#02368c]
                h-[49px]
                rounded-lg
                font-roboto-condensed font-medium text-lg text-white
                hover:bg-[#024189] transition-colors
                flex items-center justify-center
              "
            >
              Back to Home
            </Link>
            <Link
              href="/dashboard"
              className="
                flex-1
                border-2 border-[#02368c]
                h-[49px]
                rounded-lg
                font-roboto-condensed font-medium text-lg text-[#02368c]
                hover:bg-[#02368c] hover:text-white transition-colors
                flex items-center justify-center
              "
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
