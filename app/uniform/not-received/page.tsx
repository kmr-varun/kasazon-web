'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function UniformNotReceivedPage() {
  const handleContactSupport = () => {
    window.location.href = 'mailto:support@kasazon.com?subject=Uniform Not Received - Order KZ-782';
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
                Uniform Not Received
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

          {/* Issue Details Card */}
          <div className="
            w-full
            bg-white
            border border-[rgba(0,0,0,0.1)]
            rounded-lg
            px-6 py-4
            shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
            flex flex-col gap-3.5
          ">
            {/* Header with Order Number */}
            <div className="flex items-center justify-between pb-1">
              <h2 className="font-roboto-condensed font-medium text-base text-[#0b1c30] leading-normal">
                Report Summary
              </h2>
              <div className="bg-[#e5eeff] px-2 py-0.5 rounded-sm">
                <span className="font-poppins text-xs text-[#434655] leading-normal">
                  Order #KZ-782
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-3 pt-1">
              {/* Reported Reason */}
              <div className="flex items-start justify-between">
                <span className="font-poppins font-medium text-sm text-[#434655] leading-normal">
                  Reported Reason
                </span>
                <span className="font-poppins font-medium text-sm text-[#0b1c30] leading-normal text-right">
                  Not delivered yet
                </span>
              </div>

              {/* Reported Date */}
              <div className="flex items-start justify-between">
                <span className="font-poppins font-medium text-sm text-[#434655] leading-normal">
                  Reported Date
                </span>
                <span className="font-poppins font-medium text-sm text-[#0b1c30] leading-normal text-right">
                  10 Oct 2026, 14:48 GMT
                </span>
              </div>

              {/* Your Note */}
              <div className="flex flex-col gap-1.5 pt-2.5">
                <span className="font-poppins font-medium text-sm text-[#434655] leading-normal">
                  Your Note
                </span>
                <div className="bg-[#eff4ff] p-3 rounded">
                  <p className="font-poppins text-sm text-[#0b1c30] leading-normal">
                    "I have not received the uniform yet."
                  </p>
                </div>
              </div>

              {/* Dispatch Destination */}
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="font-poppins font-medium text-sm text-[#434655] leading-normal">
                  Dispatch Destination
                </span>
                <div className="bg-[#eff4ff] p-2.5 rounded flex items-start gap-2">
                  <div className="relative w-[10.5px] h-[17px] flex-shrink-0 mt-0.5">
                    <Image
                      src="/images/icons/location-pin.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-poppins text-xs text-[#0b1c30] leading-normal">
                      Plot 14, Ring Road Central
                    </p>
                    <p className="font-poppins text-xs text-[#434655] leading-normal">
                      Accra, Greater Accra Region
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Tracking Timeline */}
          <div className="
            w-full
            bg-[#f2f2f2]
            rounded-lg
            p-4
            shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
            flex flex-col gap-4
          ">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="font-roboto-condensed font-medium text-base text-[#0b1c30] leading-normal">
                Audit Tracking
              </h2>
              <span className="font-poppins text-xs text-[#565e74] leading-normal">
                Estimated 24h
              </span>
            </div>

            {/* Timeline Steps */}
            <div className="flex flex-col px-1">
              {/* Step 1: Completed */}
              <div className="flex gap-3 pb-6 relative">
                <div className="
                  w-7 h-7
                  bg-[#dce1ff]
                  rounded-xl
                  flex items-center justify-center
                  flex-shrink-0
                  shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                ">
                  <div className="relative w-[13px] h-[13px]">
                    <Image
                      src="/images/icons/check-circle-blue.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Connecting Line */}
                <div className="absolute left-[13.5px] top-7 bottom-0 w-0.5 bg-[rgba(0,55,176,0.3)]" />

                {/* Content */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-poppins font-medium text-sm text-[#0b1c30] leading-normal">
                      Issue Submitted
                    </span>
                    <span className="font-poppins text-xs text-[#434655] leading-normal">
                      14:48 GMT
                    </span>
                  </div>
                  <p className="font-poppins text-xs text-[#434655] leading-normal">
                    Logged via Provider Portal • 10 Oct 2026
                  </p>
                </div>
              </div>

              {/* Step 2: In Progress */}
              <div className="flex gap-3 pb-6 relative">
                <div className="
                  w-7 h-7
                  bg-[#e5eeff]
                  rounded-xl
                  flex items-center justify-center
                  flex-shrink-0
                ">
                  <div className="relative w-[13px] h-[13px]">
                    <Image
                      src="/images/icons/circle-outline.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Connecting Line */}
                <div className="absolute left-[13.5px] top-7 bottom-0 w-0.5 bg-[#d3e4fe]" />

                {/* Content */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-poppins font-medium text-sm text-black leading-normal">
                      Under Review
                    </span>
                    <div className="bg-[#faedde] px-1.5 py-0.5 rounded-sm">
                      <span className="font-inter font-semibold text-[10px] text-[#ff9500] leading-[18px]">
                        In Progress
                      </span>
                    </div>
                  </div>
                  <p className="font-poppins text-xs text-[#434655] leading-normal">
                    Kasazon team is checking your delivery records with logistics dispatch.
                  </p>
                </div>
              </div>

              {/* Step 3: Upcoming */}
              <div className="flex gap-3">
                <div className="
                  w-7 h-7
                  bg-[#e5eeff]
                  rounded-xl
                  flex items-center justify-center
                  flex-shrink-0
                ">
                  <div className="relative w-[13px] h-[13px]">
                    <Image
                      src="/images/icons/circle-outline.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-1">
                  <span className="font-poppins font-medium text-sm text-[#565e74] leading-normal">
                    Resolution
                  </span>
                  <p className="font-poppins text-xs text-[#434655] leading-normal">
                    Replacement dispatch or delivery verification pending.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support Button */}
          <div className="w-full max-w-[350px] mt-2">
            <button
              onClick={handleContactSupport}
              className="
                w-full
                bg-[#02368c]
                h-[49px]
                rounded-lg
                font-roboto-condensed text-lg text-white
                hover:bg-[#024189] transition-colors
              "
            >
              Contact Support
            </button>
          </div>

          {/* Back Link */}
          <div className="mt-2">
            <Link
              href="/uniform"
              className="font-poppins text-sm text-[#02368c] hover:underline"
            >
              ← Back to Uniform Status
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
