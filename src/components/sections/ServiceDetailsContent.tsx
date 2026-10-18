'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BookingCart } from '../common/BookingCart';

interface PackageOption {
  id: string;
  title: string;
  price: number;
  description: string;
  duration: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceDetailsContentProps {
  packages: PackageOption[];
  includes: string[];
  processSteps: ProcessStep[];
  onCheckout: () => void;
  className?: string;
}

export function ServiceDetailsContent({
  packages,
  includes,
  processSteps,
  onCheckout,
  className = '',
}: ServiceDetailsContentProps) {
  const [selectedPackage, setSelectedPackage] = useState(packages[0]?.id || '');
  const [cartItems, setCartItems] = useState<string[]>([]);

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 pb-16 lg:pb-24">
        <div className="max-w-[1700px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left: Content */}
            <div className="flex-1 flex flex-col gap-14">
              {/* AC Selection */}
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="
                    font-roboto-condensed font-medium text-3xl
                    text-[#0b1c30] tracking-[-0.42px] leading-[36.4px]
                    mb-1
                  ">
                    Select Your AC
                  </h2>
                  <p className="
                    font-poppins text-sm text-[#424655]
                    leading-normal
                  ">
                    Choose the number of units you want serviced in this booking.
                  </p>
                </div>

                {/* Package Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages.map((pkg) => {
                    const isSelected = selectedPackage === pkg.id;

                    return (
                      <button
                        key={pkg.id}
                        onClick={() => handlePackageSelect(pkg.id)}
                        className={`
                          border-2 rounded-2xl p-[18px]
                          flex flex-col justify-between
                          shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                          transition-all
                          ${isSelected
                            ? 'bg-[#eff4ff] border-[#02368c]'
                            : 'bg-white border-[#c2c6d8] hover:border-[#02368c]/50'
                          }
                        `}
                      >
                        {/* Header with title, price and radio */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="
                              font-poppins font-semibold text-lg
                              text-[#111] leading-[28.8px] text-left
                            ">
                              {pkg.title}
                            </h3>
                            <p className="
                              font-poppins font-semibold text-xl
                              text-[#0b1c30] tracking-[-0.2px] leading-[28px] text-left mt-1
                            ">
                              ₹{pkg.price}
                            </p>
                            <p className="
                              font-poppins text-sm
                              text-[#424655] leading-normal text-left mt-1
                            ">
                              {pkg.description}
                            </p>
                          </div>

                          {/* Radio button */}
                          <div className={`
                            w-5 h-5 rounded-full
                            border-2 flex items-center justify-center
                            flex-shrink-0
                            ${isSelected ? 'border-[#02368c]' : 'border-[#c2c6d8]'}
                          `}>
                            {isSelected && (
                              <div className="w-[10px] h-[10px] rounded-full bg-[#02368c]" />
                            )}
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="flex items-center gap-1 pt-4 border-t border-gray-100">
                          <div className="relative w-[13px] h-[13px]">
                            <Image
                              src="/images/icons/package-icon.svg"
                              alt=""
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="
                            font-roboto-condensed font-medium text-sm
                            text-[#777]
                          ">
                            {pkg.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* What's Included */}
              <div className="flex flex-col gap-4">
                <h2 className="
                  font-roboto-condensed font-medium text-3xl
                  text-[#0b1c30] tracking-[-0.42px] leading-[36.4px]
                ">
                  What's Included
                </h2>

                <ul className="flex flex-col gap-2">
                  {includes.map((item, index) => (
                    <li
                      key={index}
                      className="
                        font-poppins text-base text-[#777]
                        leading-normal
                        list-disc ml-6
                      "
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* How It Works */}
              <div className="flex flex-col gap-4">
                <h2 className="
                  font-roboto-condensed font-medium text-3xl
                  text-[#0b1c30] tracking-[-0.42px] leading-[36.4px]
                ">
                  How It Works
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {processSteps.map((step, index) => (
                    <div
                      key={index}
                      className="
                        bg-white
                        border border-[rgba(194,198,216,0.4)]
                        rounded-2xl p-[17px]
                        shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                        flex flex-col gap-1.5
                      "
                    >
                      {/* Step number */}
                      <p className="
                        font-extrabold text-[40px]
                        text-[rgba(0,87,205,0.2)]
                        tracking-[-0.8px] leading-[40px]
                      ">
                        {step.number}
                      </p>

                      {/* Title */}
                      <h3 className="
                        font-poppins font-semibold text-lg
                        text-[#0b1c30] leading-normal
                      ">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="
                        font-poppins text-sm text-[#424655]
                        leading-normal
                      ">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Booking Cart - Sticky */}
            <div className="lg:w-[460px] flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <BookingCart
                  itemCount={cartItems.length}
                  onCheckout={onCheckout}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
