'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function WalletPage() {
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');

  const recommendedAmounts = [100, 250, 500, 1000];

  const transactions = [
    {
      id: 1,
      type: 'Refund Received',
      service: 'Full Home Painting',
      date: '12 July, 3:47 PM',
      amount: 57,
      isPositive: true,
      icon: 'transaction-in-icon.svg',
      bgColor: 'rgba(46,158,91,0.1)'
    },
    {
      id: 2,
      type: 'Wallet Used',
      service: 'Full Home Painting',
      date: '12 July, 3:47 PM',
      amount: -140,
      isPositive: false,
      icon: 'transaction-in-icon.svg',
      bgColor: 'rgba(46,158,91,0.1)'
    },
    {
      id: 3,
      type: 'Cashback Earned',
      service: 'Full Home Painting',
      date: '12 July, 3:47 PM',
      amount: -500,
      isPositive: false,
      icon: 'transaction-out-icon.svg',
      bgColor: 'rgba(228,104,93,0.1)'
    },
    {
      id: 4,
      type: 'Wallet Used',
      service: 'Full Home Painting',
      date: '12 July, 3:47 PM',
      amount: -140,
      isPositive: false,
      icon: 'transaction-in-icon.svg',
      bgColor: 'rgba(46,158,91,0.1)'
    },
    {
      id: 5,
      type: 'Wallet Used',
      service: 'Full Home Painting',
      date: '12 July, 3:47 PM',
      amount: -140,
      isPositive: false,
      icon: 'transaction-in-icon.svg',
      bgColor: 'rgba(46,158,91,0.1)'
    },
    {
      id: 6,
      type: 'Wallet Used',
      service: 'Full Home Painting',
      date: '12 July, 3:47 PM',
      amount: -140,
      isPositive: false,
      icon: 'transaction-in-icon.svg',
      bgColor: 'rgba(46,158,91,0.1)'
    }
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

            {/* Right Content - Wallet */}
            <div className="lg:col-span-9 flex flex-col gap-8">
              {/* Wallet Heading */}
              <div>
                <h2 className="font-roboto-condensed font-medium text-2xl text-[#111] leading-normal">
                  Wallet
                </h2>
              </div>

              {/* Balance Card */}
              <div className="bg-[#02368c] rounded-lg shadow-[0px_4px_12px_0px_rgba(26,43,76,0.08)] p-6 relative overflow-hidden h-[209px]">
                <div className="flex flex-col gap-7 w-[185px]">
                  <div className="flex flex-col gap-3">
                    <p className="font-poppins text-xl text-white leading-6">
                      Available Balance
                    </p>
                    <p className="font-poppins font-bold text-[40px] text-white leading-10 tracking-[-0.64px]">
                      ₵1,297
                    </p>
                  </div>
                  <button className="bg-white h-8 rounded-lg flex items-center justify-center px-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-colors w-[168px]">
                    <span className="font-roboto-condensed text-base text-black leading-4 tracking-[0.24px]">
                      Add Money
                    </span>
                  </button>
                </div>

                {/* Wallet Illustration */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[352px] h-[281px]">
                  <Image
                    src="/images/wallet-illustration.png"
                    alt="Wallet"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="flex flex-col gap-3">
                <h3 className="font-roboto-condensed font-medium text-xl text-black leading-normal">
                  Recent Transactions
                </h3>
                <div className="bg-white rounded-xl shadow-[0px_4px_6px_rgba(26,43,76,0.08)]">
                  {transactions.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className={`flex items-center justify-between p-4 ${
                        index !== 0 ? 'border-t border-[rgba(197,198,207,0.3)]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-[50px] h-[50px] rounded-full flex items-center justify-center"
                          style={{ backgroundColor: transaction.bgColor }}
                        >
                          <Image
                            src={`/images/${transaction.icon}`}
                            alt=""
                            width={29}
                            height={30}
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="font-poppins font-medium text-lg text-[#1b1c1c] leading-normal">
                            {transaction.type}
                          </p>
                          <div className="flex items-center text-base leading-normal">
                            <span className="font-poppins text-[#1b1c1c]">{transaction.service}</span>
                            <span className="font-poppins text-[#44474e] before:content-['•'] before:mx-2">
                              {transaction.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p
                        className={`font-poppins font-medium text-2xl leading-[26px] ${
                          transaction.amount > 0 ? 'text-[#2e9e5b]' : transaction.type === 'Cashback Earned' ? 'text-[#e4685d]' : 'text-[#2e9e5b]'
                        }`}
                      >
                        {transaction.amount > 0 ? '+' : ''}₵{Math.abs(transaction.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Money Section */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-poppins font-medium text-xl text-[#0b1c30] leading-7 tracking-[-0.2px]">
                    Add Money
                  </h3>
                  <p className="font-poppins text-sm text-[#424655] leading-normal">
                    Add funds to your Kasazon wallet for quick and easy payments.
                  </p>
                </div>

                {/* Amount Input */}
                <div className="flex flex-col gap-2">
                  <label className="font-poppins text-base text-[#111] leading-normal">
                    Amount to Add
                  </label>
                  <div className="border border-[rgba(0,0,0,0.12)] rounded-lg px-5 h-11 flex items-center">
                    <input
                      type="number"
                      placeholder="Enter Amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full font-poppins text-sm text-[#111] leading-normal placeholder:text-[#777] outline-none"
                    />
                  </div>
                </div>

                {/* Recommended Amounts */}
                <div className="flex flex-col gap-2">
                  <p className="font-poppins font-medium text-base text-[#777] leading-normal">
                    RECOMMENDED AMOUNTS
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {recommendedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount(amount.toString());
                        }}
                        className={`px-11 py-5 rounded-xl font-poppins font-medium text-xl leading-[26px] transition-all ${
                          selectedAmount === amount
                            ? 'bg-[#02368c] text-white border border-[#02368c] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]'
                            : 'bg-white text-[#111] border border-[#e2e8f0]'
                        }`}
                      >
                        +₵{amount}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add Money Button */}
              <div className="w-full max-w-[512px]">
                <button className="w-full bg-[#02368c] h-[49px] rounded-xl font-roboto-condensed font-medium text-base text-white leading-6 hover:bg-[#024189] transition-colors">
                  Add Money
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
