'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function AccountPage() {
  const [expandAddPayment, setExpandAddPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'mobile' | 'card'>('mobile');
  const [selectedProvider, setSelectedProvider] = useState<'mtn' | 'telecel' | 'airteltigo'>('mtn');

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-[1728px] mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="font-roboto-condensed font-medium text-[40px] text-[#0b1c30] tracking-[-1px] leading-[48px] mb-2">
              My Account
            </h1>
            <p className="font-poppins text-lg text-[#424655] leading-normal">
              Manage your profile, bookings, payments, and account preferences.
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
            {/* Left Sidebar - Profile & Navigation */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {/* User Profile Card */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                {/* Avatar */}
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
                      <Image
                        src="/images/icons/phone-icon.svg"
                        alt=""
                        width={11}
                        height={11}
                      />
                      <p className="font-poppins text-sm text-[#424655] leading-normal">
                        +233 8986547436
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <button className="w-full bg-[#02368c] h-10 rounded-md font-roboto-condensed font-medium text-base text-white leading-6 hover:bg-[#024189] transition-colors">
                  Edit Profile
                </button>
              </div>

              {/* Navigation Menu */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                {/* ACCOUNT Section */}
                <div className="flex flex-col gap-3">
                  <div className="px-2">
                    <span className="font-medium text-sm text-[#777] leading-normal">ACCOUNT</span>
                  </div>
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

                {/* Divider */}
                <div className="px-1">
                  <div className="h-px bg-[#dce9ff]" />
                </div>

                {/* PREFERENCES Section */}
                <div className="flex flex-col gap-3">
                  <div className="px-2">
                    <span className="font-medium text-sm text-[#727787] leading-normal">PREFERENCES</span>
                  </div>
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

                {/* Divider */}
                <div className="px-1">
                  <div className="h-px bg-[#dce9ff]" />
                </div>

                {/* SUPPORT Section */}
                <div className="flex flex-col gap-3">
                  <div className="px-2">
                    <span className="font-medium text-sm text-[#727787] leading-normal">SUPPORT</span>
                  </div>
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

                {/* Divider */}
                <div className="px-1">
                  <div className="h-px bg-[#dce9ff]" />
                </div>

                {/* SYSTEM Section */}
                <div className="flex flex-col gap-3">
                  <div className="px-2">
                    <span className="font-medium text-sm text-[#727787] leading-normal">SYSTEM</span>
                  </div>
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

            {/* Right Content - Payment Methods */}
            <div className="lg:col-span-9 flex flex-col gap-8">
              {/* Payment Method Heading */}
              <div>
                <h2 className="font-roboto-condensed font-medium text-2xl text-[#111] leading-normal">
                  Payment Method
                </h2>
              </div>

              {/* Saved Payment Methods */}
              <div className="flex flex-col gap-3">
                {/* Mobile Money (MTN) - Default */}
                <div className="bg-white border border-[#c5c6cf] rounded-lg p-3.5 flex items-center gap-3 shadow-[0px_4px_12px_0px_rgba(26,43,76,0.08)] relative">
                  <div className="w-10 h-10 bg-[#f0eded] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image src="/images/icons/mobile-money-icon.svg" alt="" width={20} height={20} />
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <p className="font-poppins font-medium text-lg text-[#111] leading-[26px]">
                      Mobile Money (MTN)
                    </p>
                    <p className="font-poppins text-base text-[#777] leading-normal">
                      •••• 4521
                    </p>
                  </div>
                  <div className="bg-[rgba(207,157,0,0.09)] px-2 py-0.5 rounded-full">
                    <span className="font-poppins text-xs text-[#cf9d00] leading-normal">Default</span>
                  </div>
                  <button className="font-roboto-condensed text-[15px] text-[#ba1a1a] leading-4 tracking-[0.24px]">
                    Remove
                  </button>
                </div>

                {/* Visa Card */}
                <div className="bg-white border border-[#c5c6cf] rounded-lg p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f0eded] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image src="/images/icons/visa-card-icon.svg" alt="" width={20} height={16} />
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <p className="font-poppins font-medium text-lg text-[#111] leading-[26px]">
                      Visa Card
                    </p>
                    <p className="font-poppins text-base text-[#777] leading-normal">
                      •••• 7890
                    </p>
                  </div>
                  <button className="font-poppins text-sm text-[#ba1a1a] leading-normal">
                    Remove
                  </button>
                </div>
              </div>

              {/* Add Payment Method Accordion */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandAddPayment(!expandAddPayment)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#dae2fd] rounded-xl flex items-center justify-center">
                      <Image src="/images/icons/add-payment-icon.svg" alt="" width={27} height={21} />
                    </div>
                    <h3 className="font-poppins font-medium text-xl text-[#0b1c30] leading-7 tracking-[-0.2px]">
                      Add Payment Method
                    </h3>
                  </div>
                  <div className="w-8 h-8 bg-[#e5eeff] rounded-full flex items-center justify-center">
                    <Image
                      src="/images/icons/chevron-down-icon.svg"
                      alt=""
                      width={10}
                      height={6}
                      className={`transition-transform ${expandAddPayment ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {/* Accordion Content */}
                {expandAddPayment && (
                  <div className="px-6 pb-6 pt-1 flex flex-col gap-6">
                    {/* Select Method */}
                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-sm text-[#111] leading-normal">
                        Select Method
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedMethod('mobile')}
                          className={`flex-1 flex flex-col items-center gap-3 py-4.5 px-10 rounded-lg border-2 transition-all ${
                            selectedMethod === 'mobile'
                              ? 'border-[#02368c] shadow-[0px_4px_12px_0px_rgba(26,43,76,0.08)]'
                              : 'border-[rgba(0,0,0,0.1)]'
                          }`}
                        >
                          <Image src="/images/icons/mobile-money-large-icon.svg" alt="" width={25} height={25} />
                          <span className={`font-poppins font-medium text-base leading-normal ${
                            selectedMethod === 'mobile' ? 'text-[#02368c]' : 'text-[#777]'
                          }`}>
                            Mobile Money
                          </span>
                        </button>
                        <button
                          onClick={() => setSelectedMethod('card')}
                          className={`flex-1 flex flex-col items-center gap-3 py-4.5 px-8 rounded-lg border transition-all ${
                            selectedMethod === 'card'
                              ? 'border-2 border-[#02368c] shadow-[0px_4px_12px_0px_rgba(26,43,76,0.08)]'
                              : 'border border-[rgba(0,0,0,0.1)]'
                          }`}
                        >
                          <Image src="/images/icons/card-icon.svg" alt="" width={25} height={20} />
                          <span className={`font-poppins font-medium text-base leading-normal ${
                            selectedMethod === 'card' ? 'text-[#02368c]' : 'text-[#777]'
                          }`}>
                            Debit/Credit Card
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Network Provider */}
                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-sm text-[#111] leading-normal">
                        Network Provider
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedProvider('mtn')}
                          className={`flex-1 h-11 rounded-lg border transition-colors ${
                            selectedProvider === 'mtn'
                              ? 'bg-[#02368c] border-[#02368c] text-white'
                              : 'bg-[#fcf9f8] border-[rgba(0,0,0,0.1)] text-[#111]'
                          }`}
                        >
                          <span className="font-poppins text-base leading-normal">MTN</span>
                        </button>
                        <button
                          onClick={() => setSelectedProvider('telecel')}
                          className={`flex-1 h-11 rounded-lg border transition-colors ${
                            selectedProvider === 'telecel'
                              ? 'bg-[#02368c] border-[#02368c] text-white'
                              : 'bg-[#fcf9f8] border-[rgba(0,0,0,0.1)] text-[#111]'
                          }`}
                        >
                          <span className="font-poppins text-base leading-normal">Telecel</span>
                        </button>
                        <button
                          onClick={() => setSelectedProvider('airteltigo')}
                          className={`flex-1 h-11 rounded-lg border transition-colors ${
                            selectedProvider === 'airteltigo'
                              ? 'bg-[#02368c] border-[#02368c] text-white'
                              : 'bg-[#fcf9f8] border-[#c5c6cf] text-[#111]'
                          }`}
                        >
                          <span className="font-poppins text-base leading-normal">AirtelTigo</span>
                        </button>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-sm text-[#111] leading-normal">
                        Phone Number
                      </label>
                      <div className="border border-[rgba(0,0,0,0.12)] rounded-lg px-5 py-3 flex items-center gap-5">
                        <span className="font-poppins text-sm text-[#111] leading-normal">+233</span>
                        <div className="w-px h-[35px] rotate-90">
                          <Image src="/images/icons/divider-vertical.svg" alt="" width={35} height={1} />
                        </div>
                        <input
                          type="tel"
                          placeholder="Enter your phone number"
                          className="flex-1 font-poppins text-sm text-[#111] leading-normal placeholder:text-[#777] outline-none"
                        />
                      </div>
                    </div>

                    {/* Account Name */}
                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-sm text-[#111] leading-normal">
                        Account Name
                      </label>
                      <div className="border border-[rgba(0,0,0,0.12)] rounded-lg px-5 py-3">
                        <input
                          type="text"
                          placeholder="As registered with your mobile money"
                          className="w-full font-poppins text-sm text-[#111] leading-normal placeholder:text-[#777] outline-none"
                        />
                      </div>
                    </div>

                    {/* Trust Strip */}
                    <div className="bg-[rgba(59,156,156,0.1)] border border-[rgba(59,156,156,0.2)] rounded-lg p-3.5 flex items-center gap-3">
                      <Image src="/images/icons/lock-icon.svg" alt="" width={16} height={21} />
                      <p className="font-poppins text-base text-[#111] leading-normal">
                        Your payment details are encrypted and securely stored.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Add Payment Method Button */}
              <div className="w-full max-w-[512px]">
                <button className="w-full bg-[#02368c] h-[49px] rounded-xl font-roboto-condensed font-medium text-base text-white leading-6 hover:bg-[#024189] transition-colors">
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
