'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BookingSummary } from './BookingSummary';

export interface AddressPageContentProps {
  onSave: () => void;
  onCheckout: () => void;
  className?: string;
}

interface SavedAddress {
  id: string;
  type: 'home' | 'work' | 'other';
  icon: string;
  label: string;
  address: string;
  landmark: string;
  isSelected: boolean;
}

export function AddressPageContent({
  onSave,
  onCheckout,
  className = '',
}: AddressPageContentProps) {
  const [selectedAddress, setSelectedAddress] = useState<string>('home');
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [addressType, setAddressType] = useState<'home' | 'work' | 'other'>('home');
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const handleChangeStep = (stepIndex: number) => {
    console.log('Change step:', stepIndex);
  };

  const savedAddresses: SavedAddress[] = [
    {
      id: 'home',
      type: 'home',
      icon: '/images/icons/home-icon.svg',
      label: 'Home',
      address: 'East Legon, Accra',
      landmark: 'Near Shell fuel station, blue gate',
      isSelected: true,
    },
    {
      id: 'work',
      type: 'work',
      icon: '/images/icons/work-icon.svg',
      label: 'Work',
      address: 'Airport Residential Area',
      landmark: '3rd floor, Standard Chartered Building',
      isSelected: false,
    },
  ];

  const service = {
    id: 'foam-jet',
    title: 'Foam-Jet AC Service',
    price: 499,
    duration: '60–90 min service',
  };

  const reviewSteps = [
    {
      icon: '/images/icons/checkmark-circle.svg',
      title: 'Reported Issue',
      value: 'No cooling, water leaking',
    },
    {
      icon: '/images/icons/location-pin.svg',
      title: 'Service Location',
      value: '8-A Light Industrial Area, ITI Rd',
      subtext: 'Jodhpur, RJ · 342003',
    },
    {
      icon: '/images/icons/calendar.svg',
      title: 'Scheduled Slot',
      value: 'Select at Review step',
    },
  ];

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-8">
              {/* Saved Addresses */}
              <div className="flex flex-col gap-3 w-full">
                {savedAddresses.map((address) => (
                  <button
                    key={address.id}
                    onClick={() => setSelectedAddress(address.id)}
                    className={`
                      bg-white
                      border
                      ${selectedAddress === address.id ? 'border-[#02368c]' : 'border-[rgba(0,0,0,0.1)]'}
                      rounded-lg p-3
                      shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                      flex gap-3 items-start
                      w-full
                      transition-colors
                      hover:border-[#02368c]
                      text-left
                    `}
                  >
                    <div className={`
                      ${selectedAddress === address.id ? 'bg-[rgba(212,228,255,0.53)]' : 'bg-[#f0eded]'}
                      w-10 h-10
                      rounded-full
                      flex items-center justify-center
                      flex-shrink-0
                    `}>
                      <div className="relative w-5 h-5">
                        <Image
                          src={address.icon}
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="
                        font-poppins font-medium text-xl
                        text-[#111]
                        leading-normal
                      ">
                        {address.label}
                      </h3>
                      <div className="flex flex-col gap-0.5 mt-1.5">
                        <p className="
                          font-poppins text-lg text-[#111]
                          leading-normal
                        ">
                          {address.address}
                        </p>
                        <p className="
                          font-poppins text-sm text-[#777]
                          leading-normal
                        ">
                          {address.landmark}
                        </p>
                      </div>
                    </div>

                    <div className="relative w-5 h-[18px] flex-shrink-0">
                      <Image
                        src="/images/icons/edit-icon.svg"
                        alt="Edit"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Add New Address Accordion */}
              <div className="
                bg-white
                border border-[rgba(0,0,0,0.1)]
                rounded-2xl
                shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]
                overflow-hidden
                w-full
              ">
                {/* Accordion Header */}
                <button
                  onClick={() => setIsFormExpanded(!isFormExpanded)}
                  className="
                    w-full
                    p-6
                    flex items-center justify-between
                    hover:bg-gray-50 transition-colors
                  "
                >
                  <div className="flex gap-4 items-center">
                    <div className="
                      bg-[#dae2fd]
                      w-10 h-10
                      rounded-xl
                      flex items-center justify-center
                    ">
                      <div className="relative w-[19px] h-[22px]">
                        <Image
                          src="/images/icons/plus-icon.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="
                        font-poppins font-medium text-xl
                        text-[#0b1c30]
                        tracking-[-0.2px] leading-[28px]
                        text-left
                      ">
                        Add New Address
                      </h3>
                      <p className="
                        font-poppins text-sm text-[#424655]
                        leading-normal
                        text-left
                      ">
                        Enter apartment, building details and pinpoint on map
                      </p>
                    </div>
                  </div>

                  <div className="
                    bg-[#e5eeff]
                    w-8 h-8
                    rounded-full
                    flex items-center justify-center
                    flex-shrink-0
                  ">
                    <div className={`relative w-[10px] h-[6px] transition-transform ${isFormExpanded ? 'rotate-180' : ''}`}>
                      <Image
                        src="/images/icons/chevron-down-small.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </button>

                {/* Expandable Form */}
                {isFormExpanded && (
                  <div className="px-6 pb-6 pt-1">
                    <div className="flex flex-col gap-6">
                      {/* Map + Current Location */}
                      <div className="flex flex-col gap-4">
                        <div className="
                          bg-[#dda5a5]
                          h-[183px]
                          rounded-lg
                          overflow-hidden
                          relative
                          w-full
                        ">
                          <Image
                            src="/images/map-placeholder.png"
                            alt="Map"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button className="flex items-center gap-2 self-start">
                          <div className="relative w-[21px] h-[21px]">
                            <Image
                              src="/images/icons/location-current.svg"
                              alt=""
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="
                            font-poppins text-base text-[#02368c]
                            leading-normal
                          ">
                            Use My Current Location
                          </span>
                        </button>
                      </div>

                      {/* Address Line 1 */}
                      <div className="flex flex-col gap-2">
                        <label className="
                          font-poppins text-sm text-[#111]
                          leading-normal
                        ">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          placeholder="House number, street name"
                          className="
                            border border-[rgba(0,0,0,0.12)]
                            rounded-lg
                            px-5 py-3 h-11
                            w-full
                            font-roboto-condensed text-xs text-[#777]
                            placeholder:text-[#777]
                            leading-normal
                            focus:outline-none focus:border-[#02368c]
                          "
                        />
                      </div>

                      {/* Address Line 2 */}
                      <div className="flex flex-col gap-2">
                        <label className="
                          font-poppins text-sm text-[#111]
                          leading-normal
                        ">
                          Address Line 2 (optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Apartment, suite, unit"
                          className="
                            border border-[rgba(0,0,0,0.12)]
                            rounded-lg
                            px-5 py-3 h-11
                            w-full
                            font-roboto-condensed text-xs text-[#777]
                            placeholder:text-[#777]
                            leading-normal
                            focus:outline-none focus:border-[#02368c]
                          "
                        />
                      </div>

                      {/* Country and State */}
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-2">
                          <label className="
                            font-poppins text-sm text-[#111]
                            leading-normal
                          ">
                            Country
                          </label>
                          <div className="relative">
                            <select className="
                              w-full
                              border border-[rgba(0,0,0,0.12)]
                              rounded-lg
                              px-5 py-3 h-11
                              font-roboto-condensed text-xs text-[#777]
                              leading-normal
                              appearance-none
                              bg-white
                              focus:outline-none focus:border-[#02368c]
                              pr-10
                            ">
                              <option>Accra</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                              <div className="relative w-[21px] h-[21px]">
                                <Image
                                  src="/images/icons/chevron-down-small.svg"
                                  alt=""
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                          <label className="
                            font-poppins text-sm text-[#111]
                            leading-normal
                          ">
                            state
                          </label>
                          <div className="relative">
                            <select className="
                              w-full
                              border border-[rgba(0,0,0,0.12)]
                              rounded-lg
                              px-5 py-3 h-11
                              font-roboto-condensed text-xs text-[#777]
                              leading-normal
                              appearance-none
                              bg-white
                              focus:outline-none focus:border-[#02368c]
                              pr-10
                            ">
                              <option>Greater Accra</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                              <div className="relative w-[21px] h-[21px]">
                                <Image
                                  src="/images/icons/chevron-down-small.svg"
                                  alt=""
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* City and Zip Code */}
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-2">
                          <label className="
                            font-poppins text-sm text-[#111]
                            leading-normal
                          ">
                            City
                          </label>
                          <div className="relative">
                            <select className="
                              w-full
                              border border-[rgba(0,0,0,0.12)]
                              rounded-lg
                              px-5 py-3 h-11
                              font-roboto-condensed text-xs text-[#777]
                              leading-normal
                              appearance-none
                              bg-white
                              focus:outline-none focus:border-[#02368c]
                              pr-10
                            ">
                              <option>Ghana</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                              <div className="relative w-[21px] h-[21px]">
                                <Image
                                  src="/images/icons/chevron-down-small.svg"
                                  alt=""
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                          <label className="
                            font-poppins text-sm text-[#111]
                            leading-normal
                          ">
                            Zip Code
                          </label>
                          <input
                            type="text"
                            placeholder="Enter house number"
                            className="
                              border border-[rgba(0,0,0,0.12)]
                              rounded-lg
                              px-5 py-3 h-11
                              w-full
                              font-roboto-condensed text-xs text-[#777]
                              placeholder:text-[#777]
                              leading-normal
                              focus:outline-none focus:border-[#02368c]
                            "
                          />
                        </div>
                      </div>

                      {/* Landmark */}
                      <div className="flex flex-col gap-2">
                        <label className="
                          font-poppins text-sm text-[#111]
                          leading-normal
                        ">
                          Landmark
                        </label>
                        <input
                          type="text"
                          placeholder="Enter landmark (e.g. Near Shell Station)"
                          className="
                            border border-[rgba(0,0,0,0.12)]
                            rounded-lg
                            px-5 py-3 h-11
                            w-full
                            font-roboto-condensed text-xs text-[#777]
                            placeholder:text-[#777]
                            leading-normal
                            focus:outline-none focus:border-[#02368c]
                          "
                        />
                      </div>

                      {/* Address Type Tags */}
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => setAddressType('home')}
                          className={`
                            px-4 py-[3px] h-[39px]
                            rounded
                            border border-[rgba(0,0,0,0.1)]
                            font-poppins text-sm
                            leading-normal
                            transition-colors
                            ${addressType === 'home' ? 'bg-[#02368c] text-white' : 'bg-white text-[#111]'}
                          `}
                        >
                          Home
                        </button>
                        <button
                          onClick={() => setAddressType('work')}
                          className={`
                            px-4 py-[3px] h-[39px]
                            rounded
                            border border-[rgba(0,0,0,0.1)]
                            font-poppins text-sm
                            leading-normal
                            transition-colors
                            ${addressType === 'work' ? 'bg-[#02368c] text-white' : 'bg-white text-[#111]'}
                          `}
                        >
                          Work
                        </button>
                        <button
                          onClick={() => setAddressType('other')}
                          className={`
                            px-4 py-[3px] h-[39px]
                            rounded
                            border border-[rgba(0,0,0,0.1)]
                            font-poppins text-sm
                            leading-normal
                            transition-colors
                            ${addressType === 'other' ? 'bg-[#02368c] text-white' : 'bg-white text-[#111]'}
                          `}
                        >
                          Other
                        </button>
                      </div>

                      {/* Default Address Checkbox */}
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="default-address"
                          checked={isDefaultAddress}
                          onChange={(e) => setIsDefaultAddress(e.target.checked)}
                          className="
                            w-5 h-5
                            border border-[#75777f]
                            rounded
                            focus:outline-none focus:ring-2 focus:ring-[#02368c]
                          "
                        />
                        <label
                          htmlFor="default-address"
                          className="
                            font-poppins text-sm text-[#111]
                            leading-normal
                            cursor-pointer
                          "
                        >
                          Save as my default address
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Save Button */}
              <button
                onClick={onSave}
                className="
                  bg-[#02368c]
                  w-full max-w-[512px]
                  px-6 py-4
                  rounded-xl
                  flex items-center justify-center gap-2
                  font-roboto-condensed font-medium text-base
                  text-white text-center
                  leading-[24px]
                  hover:bg-[#024189] transition-colors
                "
              >
                Save
              </button>
            </div>

            {/* Right Column - Booking Summary (Sticky) */}
            <div className="lg:w-[420px] flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <BookingSummary
                  service={service}
                  reviewSteps={reviewSteps}
                  platformFee={45}
                  onCheckout={onCheckout}
                  onChangeStep={handleChangeStep}
                  isDisabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
