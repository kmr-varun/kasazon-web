'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const commonTopics = [
    { id: 1, icon: 'calendar-icon.svg', title: 'Booking & Scheduling', link: '/support/booking' },
    { id: 2, icon: 'money-icon.svg', title: 'Payments & Refunds', link: '/support/payments' },
    { id: 3, icon: 'dispute-icon.svg', title: 'Disputes & Rework', link: '/support/disputes' },
    { id: 4, icon: 'account-shield-icon.svg', title: 'Account & Verification', link: '/support/account' },
    { id: 5, icon: 'star-rating-icon.svg', title: 'Ratings & Reviews', link: '/support/ratings' },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-[1728px] mx-auto">
          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
            {/* Left Sidebar - Profile & Navigation */}
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

              {/* Navigation Menu - Same as other account pages */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
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

            {/* Right Content - Help & Support */}
            <div className="lg:col-span-9 flex flex-col gap-8">
              {/* Heading */}
              <div>
                <h2 className="font-roboto-condensed font-medium text-2xl text-[#111] leading-[27px]">
                  Help & Support
                </h2>
              </div>

              {/* Search Bar */}
              <div className="bg-white border border-[#b2b2b2] rounded-[48px] shadow-[0px_7px_11.25px_rgba(0,0,0,0.07)] flex items-center gap-2.5 pl-5 pr-2 py-3 max-w-[630px] h-[70px]">
                <Image src="/images/icons/search-icon.svg" alt="" width={20} height={20} />
                <input
                  type="text"
                  placeholder="Search your service"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 font-poppins text-sm text-[#111] placeholder:text-[#878787] leading-normal outline-none"
                />
                <button className="bg-[#02368c] rounded-full w-[53px] h-[53px] flex items-center justify-center hover:bg-[#024189] transition-colors flex-shrink-0">
                  <Image src="/images/icons/search-button-icon.svg" alt="Search" width={32} height={32} />
                </button>
              </div>

              {/* Support Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Chat Support Card */}
                <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-2xl p-8 shadow-[0px_4px_24px_0px_rgba(26,98,240,0.08)] flex flex-col justify-between">
                  <div className="flex flex-col gap-1">
                    <Image src="/images/icons/chat-icon.svg" alt="" width={45} height={44} />
                    <h3 className="font-poppins font-semibold text-xl text-[#131b2e] leading-7 mt-5">
                      Chat with Support
                    </h3>
                    <p className="font-poppins text-lg text-[#424655] leading-6">
                      Get instant, real-time help from our Accra concierge and domestic escalation team. Available 24 hours a day for active jobs.
                    </p>
                  </div>
                  <button className="flex items-center gap-1 pt-4 mt-6">
                    <span className="font-roboto-condensed text-xl text-[#02368c] leading-4 tracking-[0.24px]">
                      Start Chat
                    </span>
                    <Image src="/images/icons/arrow-right-icon.svg" alt="" width={15} height={11} />
                  </button>
                </div>

                {/* Call Support Card */}
                <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-2xl p-8 shadow-[0px_1px_3px_0px_rgba(15,23,42,0.04)] flex flex-col justify-between">
                  <div className="flex flex-col gap-1">
                    <Image src="/images/icons/phone-call-icon.svg" alt="" width={44} height={44} />
                    <h3 className="font-poppins font-semibold text-xl text-[#131b2e] leading-7 mt-5">
                      Call Support
                    </h3>
                    <p className="font-poppins text-lg text-[#424655] leading-6">
                      Speak directly with a Kasazon domestic operations specialist in Airport Residential for dispatch, plumbing leaks, or urgent escrows.
                    </p>
                  </div>
                  <button className="flex items-center gap-1 pt-4 mt-6">
                    <span className="font-roboto-condensed text-xl text-[#02368c] leading-4 tracking-[0.24px]">
                      Call Now
                    </span>
                    <Image src="/images/icons/arrow-right-icon.svg" alt="" width={15} height={11} />
                  </button>
                </div>
              </div>

              {/* Common Topics */}
              <div className="flex flex-col gap-3">
                <h3 className="font-roboto-condensed font-medium text-xl text-[#111] leading-[27px]">
                  Common Topics
                </h3>
                <div className="bg-white border border-[#c5c6cf] rounded-xl shadow-[0px_4px_12px_0px_rgba(26,43,76,0.04)] overflow-hidden">
                  {commonTopics.map((topic, index) => (
                    <Link
                      key={topic.id}
                      href={topic.link}
                      className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-colors ${
                        index !== 0 ? 'border-t border-[#c5c6cf]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={`/images/icons/${topic.icon}`}
                          alt=""
                          width={20}
                          height={20}
                        />
                        <span className="font-poppins text-lg text-[#111] leading-normal">
                          {topic.title}
                        </span>
                      </div>
                      <Image src="/images/icons/chevron-right.svg" alt="" width={7} height={12} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
