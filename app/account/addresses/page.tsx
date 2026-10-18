'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function SavedAddressesPage() {
  const [expandAddAddress, setExpandAddAddress] = useState(false);
  const [selectedAddressType, setSelectedAddressType] = useState<'home' | 'work' | 'other'>('home');
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const savedAddresses = [
    {
      id: 1,
      type: 'home',
      label: 'Home',
      location: 'East Legon, Accra',
      details: 'Near Shell fuel station, blue gate',
      icon: '/images/icons/home-location-icon.svg',
      isSelected: true,
    },
    {
      id: 2,
      type: 'work',
      label: 'Work',
      location: 'Airport Residential Area',
      details: '3rd floor, Standard Chartered Building',
      icon: '/images/icons/work-location-icon.svg',
      isSelected: false,
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-[1728px] mx-auto">
          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {/* User Profile Card */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col items-center pb-4">
                  <div className="w-20 h-20 rounded-full bg-[#02368c] flex items-center justify-center mb-2 shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]">
                    <span className="font-bold text-2xl text-white leading-8">LB</span>
                  </div>
                  <h2 className="font-poppins font-medium text-xl text-[#111] leading-7 tracking-[-0.2px] text-center">
                    Leo Boateng
                  </h2>
                  <div className="flex flex-col items-center gap-0.5 mt-2">
                    <p className="font-poppins text-sm text-[#424655] leading-normal text-center">
                      leo.boateng@.com
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Image src="/images/icons/phone-icon.svg" alt="" width={11} height={11} />
                      <p className="font-poppins text-sm text-[#424655] leading-normal">
                        +233 8986547436
                      </p>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-[#02368c] h-10 rounded-md font-roboto-condensed font-medium text-base text-white leading-6 hover:bg-[#024189] transition-colors">
                  Edit Profile
                </button>
              </div>

              {/* Navigation Menu */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <div className="px-2"><span className="font-medium text-sm text-[#777] leading-normal">ACCOUNT</span></div>
                  <div className="flex flex-col gap-0.5">
                    <Link href="/account/favorites" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image src="/images/icons/favorite-icon.svg" alt="" width={17} height={15} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Favorite Services</span>
                    </Link>
                    <Link href="/account/addresses" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image src="/images/icons/saved-address-icon.svg" alt="" width={13} height={17} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Saved Addresses</span>
                    </Link>
                    <Link href="/account/payment-methods" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image src="/images/icons/payment-method-icon.svg" alt="" width={17} height={13} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Payment Methods</span>
                    </Link>
                    <Link href="/account/wallet" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image src="/images/icons/wallet-icon.svg" alt="" width={16} height={15} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Wallet</span>
                    </Link>
                    <Link href="/account/refer" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image src="/images/icons/refer-earn-icon.svg" alt="" width={17} height={18} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Refer & Earn</span>
                    </Link>
                  </div>
                </div>
                <div className="px-1"><div className="h-px bg-[#dce9ff]" /></div>
                <div className="flex flex-col gap-3">
                  <div className="px-2"><span className="font-medium text-sm text-[#727787] leading-normal">PREFERENCES</span></div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Image src="/images/icons/language-icon.svg" alt="" width={18} height={17} />
                        <span className="font-poppins text-base text-[#424655] leading-normal">Language</span>
                      </div>
                      <div className="bg-[#e5eeff] px-2 py-0.5 rounded-full">
                        <span className="font-normal text-xs text-[#02368c] leading-normal">English</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Image src="/images/icons/notification-icon.svg" alt="" width={13} height={17} />
                        <span className="font-poppins text-base text-[#424655] leading-normal">Notifications</span>
                      </div>
                      <div className="w-2 h-2 bg-[#02368c] rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="px-1"><div className="h-px bg-[#dce9ff]" /></div>
                <div className="flex flex-col gap-3">
                  <div className="px-2"><span className="font-medium text-sm text-[#727787] leading-normal">SUPPORT</span></div>
                  <div className="flex flex-col gap-0.5">
                    <Link href="/support" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image src="/images/icons/help-support-icon.svg" alt="" width={17} height={15} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Help & Support</span>
                    </Link>
                    <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <Image src="/images/icons/rate-app-icon.svg" alt="" width={17} height={17} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Rate the App</span>
                    </button>
                    <Link href="/privacy" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image src="/images/icons/privacy-icon.svg" alt="" width={13} height={17} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Privacy Policy</span>
                    </Link>
                  </div>
                </div>
                <div className="px-1"><div className="h-px bg-[#dce9ff]" /></div>
                <div className="flex flex-col gap-3">
                  <div className="px-2"><span className="font-medium text-sm text-[#727787] leading-normal">SYSTEM</span></div>
                  <div className="flex flex-col gap-0.5">
                    <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <Image src="/images/icons/delete-account-icon.svg" alt="" width={13} height={15} />
                      <span className="font-poppins text-base text-[#ba1a1a] leading-normal">Delete Account</span>
                    </button>
                    <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <Image src="/images/icons/logout-icon.svg" alt="" width={15} height={15} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Saved Addresses */}
            <div className="lg:col-span-9 flex flex-col gap-6">
              {/* Heading */}
              <div>
                <h2 className="font-roboto-condensed font-medium text-2xl text-[#111] leading-normal">
                  Saved Addresses
                </h2>
              </div>

              {/* Saved Address Cards */}
              <div className="flex flex-col gap-3">
                {savedAddresses.map((address) => (
                  <div
                    key={address.id}
                    className={`bg-white border rounded-lg p-3 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-3 items-start max-w-[674px] ${
                      address.isSelected ? 'border-[#02368c]' : 'border-[rgba(0,0,0,0.1)]'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      address.isSelected ? 'bg-[rgba(212,228,255,0.53)]' : 'bg-[#f0eded]'
                    }`}>
                      <Image
                        src={address.icon}
                        alt=""
                        width={address.type === 'home' ? 19 : 24}
                        height={address.type === 'home' ? 19 : 24}
                      />
                    </div>

                    {/* Address Details */}
                    <div className="flex-1 flex flex-col gap-1.5">
                      <h3 className="font-poppins font-medium text-xl text-[#111] leading-normal">
                        {address.label}
                      </h3>
                      <div className="flex flex-col gap-0.5">
                        <p className="font-poppins text-lg text-[#111] leading-normal">
                          {address.location}
                        </p>
                        <p className="font-poppins text-sm text-[#777] leading-normal">
                          {address.details}
                        </p>
                      </div>
                    </div>

                    {/* Action Icon */}
                    <div className="flex-shrink-0">
                      <Image
                        src={address.isSelected ? '/images/icons/edit-address-icon.svg' : '/images/icons/more-options-icon.svg'}
                        alt=""
                        width={20}
                        height={address.isSelected ? 18 : 26}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Address Accordion */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandAddAddress(!expandAddAddress)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#dae2fd] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Image src="/images/icons/add-location-icon.svg" alt="" width={19} height={22} />
                    </div>
                    <div className="flex flex-col gap-0.5 text-left">
                      <h3 className="font-poppins font-medium text-xl text-[#0b1c30] leading-7 tracking-[-0.2px]">
                        Add New Address
                      </h3>
                      <p className="font-poppins text-sm text-[#424655] leading-normal">
                        Enter apartment, building details and pinpoint on map
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-[#e5eeff] rounded-full flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/images/icons/chevron-down-accordion.svg"
                      alt=""
                      width={10}
                      height={6}
                      className={`transition-transform ${expandAddAddress ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {/* Accordion Content */}
                {expandAddAddress && (
                  <div className="px-6 pb-6 pt-1">
                    <div className="flex flex-col gap-6">
                      {/* Map Preview */}
                      <div className="flex flex-col gap-4">
                        <div className="relative h-[183px] rounded-lg overflow-hidden">
                          <Image
                            src="/images/map-preview.png"
                            alt="Map"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button className="flex items-center gap-2">
                          <Image src="/images/icons/current-location-icon.svg" alt="" width={21} height={21} />
                          <span className="font-poppins text-base text-[#02368c] leading-normal">
                            Use My Current Location
                          </span>
                        </button>
                      </div>

                      {/* Address Line 1 */}
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-sm text-[#111] leading-normal">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          placeholder="House number, street name"
                          className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-roboto-flex text-xs text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c]"
                        />
                      </div>

                      {/* Address Line 2 */}
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-sm text-[#111] leading-normal">
                          Address Line 2 (optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Apartment, suite, unit"
                          className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-roboto-flex text-xs text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c]"
                        />
                      </div>

                      {/* Country and State */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="font-poppins text-sm text-[#111] leading-normal">
                            Country
                          </label>
                          <div className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 flex items-center justify-between cursor-pointer">
                            <span className="font-roboto-flex text-xs text-[#777] leading-normal">
                              Accra
                            </span>
                            <Image src="/images/icons/dropdown-chevron.svg" alt="" width={9} height={4} />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="font-poppins text-sm text-[#111] leading-normal">
                            state
                          </label>
                          <div className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 flex items-center justify-between cursor-pointer">
                            <span className="font-roboto-flex text-xs text-[#777] leading-normal">
                              Greater Accra
                            </span>
                            <Image src="/images/icons/dropdown-chevron.svg" alt="" width={9} height={4} />
                          </div>
                        </div>
                      </div>

                      {/* City and Zip Code */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="font-poppins text-sm text-[#111] leading-normal">
                            City
                          </label>
                          <div className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 flex items-center justify-between cursor-pointer">
                            <span className="font-roboto-flex text-xs text-[#777] leading-normal">
                              Ghana
                            </span>
                            <Image src="/images/icons/dropdown-chevron.svg" alt="" width={9} height={4} />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="font-poppins text-sm text-[#111] leading-normal">
                            Zip Code
                          </label>
                          <input
                            type="text"
                            placeholder="Enter house number"
                            className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-roboto-flex text-xs text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c]"
                          />
                        </div>
                      </div>

                      {/* Landmark */}
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-sm text-[#111] leading-normal">
                          Landmark
                        </label>
                        <input
                          type="text"
                          placeholder="Enter landmark (e.g. Near Shell Station)"
                          className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-roboto-flex text-xs text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c]"
                        />
                      </div>

                      {/* Address Type Buttons */}
                      <div className="flex gap-2 flex-wrap">
                        {(['home', 'work', 'other'] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setSelectedAddressType(type)}
                            className={`h-10 px-4 rounded border flex items-center justify-center transition-colors ${
                              selectedAddressType === type
                                ? 'bg-[#02368c] border-[rgba(0,0,0,0.1)] text-white'
                                : 'bg-white border-[rgba(0,0,0,0.1)] text-[#111] hover:bg-gray-50'
                            }`}
                          >
                            <span className="font-poppins text-sm leading-normal capitalize">
                              {type}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Default Address Checkbox */}
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => setIsDefaultAddress(!isDefaultAddress)}
                          className={`w-5 h-5 border rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                            isDefaultAddress
                              ? 'bg-[#02368c] border-[#02368c]'
                              : 'bg-white border-[#75777f]'
                          }`}
                        >
                          {isDefaultAddress && (
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
                        <label className="font-poppins text-sm text-[#111] leading-normal cursor-pointer">
                          Save as my default address
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Save Button */}
              {expandAddAddress && (
                <button className="bg-[#02368c] h-16 px-6 rounded-xl flex items-center justify-center max-w-[512px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#024189] transition-colors">
                  <span className="font-roboto-condensed font-medium text-base text-white leading-6">
                    Save
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
