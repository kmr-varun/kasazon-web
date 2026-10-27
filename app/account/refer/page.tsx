'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { useAuth } from '@/src/lib/auth-context';

export default function ReferEarnPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/account/refer');
    }
  }, [isLoading, isAuthenticated, router]);

  // Get referral code from user data
  const referralCode = user?.customerProfile?.referralCode || 'KASAZON-USER';
  const referralLink = `https://kasazon.com/join/${referralCode}`;

  const getUserInitials = () => {
    if (!user?.fullName) return '?';
    const names = user.fullName.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#02368c] border-t-transparent" />
        </div>
        <Footer />
      </>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareWhatsApp = () => {
    const message = `Hey! Join Kasazon using my referral code ${referralCode} and we both get ₵20 credit! ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareSMS = () => {
    const message = `Hey! Join Kasazon using my referral code ${referralCode} and we both get ₵20 credit! ${referralLink}`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
  };

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
                    <span className="font-bold text-2xl text-white leading-8">{getUserInitials()}</span>
                  </div>
                  <h2 className="font-poppins font-medium text-xl text-[#111] leading-7 tracking-[-0.2px] text-center">
                    {user.fullName || 'User'}
                  </h2>
                  <div className="flex flex-col items-center gap-0.5 mt-2">
                    {user.email && (
                      <p className="font-poppins text-sm text-[#424655] leading-normal text-center">
                        {user.email}
                      </p>
                    )}
                    {user.phone && (
                      <div className="flex items-center gap-1.5">
                        <Image
                          src="/images/icons/phone-icon.svg"
                          alt=""
                          width={11}
                          height={11}
                        />
                        <p className="font-poppins text-sm text-[#424655] leading-normal">
                          {user.phone}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit Profile Button */}
                <Link href="/account/edit">
                  <button className="w-full bg-[#02368c] h-10 rounded-md font-roboto-condensed font-medium text-base text-white leading-6 hover:bg-[#024189] transition-colors">
                    Edit Profile
                  </button>
                </Link>
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
                    <button onClick={handleLogout} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <Image src="/images/icons/logout-icon.svg" alt="" width={15} height={15} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Refer & Earn */}
            <div className="lg:col-span-9 flex flex-col gap-8">
              {/* Refer & Earn Heading */}
              <div>
                <h2 className="font-roboto-condensed font-medium text-2xl text-[#111] leading-normal">
                  Refer & Earn
                </h2>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Referral Code Card */}
                  <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-2xl p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Image src="/images/icons/gift-icon.svg" alt="" width={18} height={15} />
                        <h3 className="font-poppins font-semibold text-xl text-[#131b2e] leading-7">
                          Your Referral Code
                        </h3>
                      </div>
                      <div className="bg-[#e0ffec] flex items-center gap-1.5 px-2.5 py-1 rounded-full">
                        <div className="w-2 h-2 bg-[#2e9e5b] rounded-full" />
                        <span className="font-poppins font-medium text-xs text-[#2e9e5b] leading-4 tracking-[0.24px]">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Code Display */}
                    <div className="bg-[#f2f3ff] rounded-xl p-4 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="font-poppins text-sm text-[#424655] leading-4 tracking-[0.24px]">
                          Referral Voucher Code
                        </p>
                        <p className="font-poppins font-semibold text-2xl text-[#02368c] leading-8 tracking-[1.2px]">
                          {referralCode}
                        </p>
                      </div>
                      <button
                        onClick={copyCode}
                        className="bg-[#02368c] h-10 px-4 rounded-lg flex items-center gap-1.5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#024189] transition-colors"
                      >
                        <Image src="/images/icons/copy-icon.svg" alt="" width={13} height={15} />
                        <span className="font-roboto-condensed font-medium text-xs text-white leading-4 tracking-[0.24px]">
                          {copiedCode ? 'Copied!' : 'Copy Code'}
                        </span>
                      </button>
                    </div>

                    {/* Referral Link */}
                    <div className="flex flex-col gap-1 pt-1">
                      <p className="font-poppins font-medium text-base text-[#131b2e] leading-5 tracking-[0.14px]">
                        Your Referral Link
                      </p>
                      <div className="bg-[#eaedff] rounded-lg px-4 py-2.5 flex items-center justify-between overflow-hidden">
                        <p className="font-poppins text-sm text-[#131b2e] leading-5 truncate">
                          {referralLink}
                        </p>
                        <button
                          onClick={copyLink}
                          className="flex items-center gap-1 ml-2 flex-shrink-0"
                        >
                          <Image src="/images/icons/link-icon.svg" alt="" width={13} height={7} />
                          <span className="font-roboto-condensed font-medium text-xs text-[#02368c] leading-4 tracking-[0.24px]">
                            {copiedLink ? 'Copied!' : 'Copy Link'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Share Card */}
                  <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-2xl p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-poppins font-semibold text-lg text-[#131b2e] leading-6">
                        Share Your Referral
                      </h3>
                      <p className="font-poppins text-sm text-[#424655] leading-5">
                        Send your link directly through your favorite platforms
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={shareWhatsApp}
                        className="bg-[rgba(37,211,102,0.1)] border border-[rgba(37,211,102,0.3)] h-[52px] px-4 rounded-xl flex items-center gap-2.5 shadow-[0px_2px_10px_0px_rgba(26,43,76,0.04)] hover:bg-[rgba(37,211,102,0.15)] transition-colors"
                      >
                        <Image src="/images/icons/whatsapp-icon.svg" alt="" width={20} height={20} />
                        <span className="font-roboto-condensed font-medium text-lg text-[#128c7e] leading-normal">
                          Share via WhatsApp
                        </span>
                      </button>
                      <button
                        onClick={shareSMS}
                        className="bg-white border border-[#e2e8f0] h-[51px] px-7 rounded-xl flex items-center gap-1.5 hover:bg-gray-50 transition-colors"
                      >
                        <Image src="/images/icons/sms-icon.svg" alt="" width={14} height={14} />
                        <span className="font-roboto-condensed font-medium text-lg text-[#111] leading-normal">
                          Share via SMS
                        </span>
                      </button>
                      <button
                        onClick={copyLink}
                        className="bg-white border border-[#e2e8f0] h-[52px] px-9 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-roboto-condensed font-medium text-lg text-[#111] leading-normal">
                          {copiedLink ? 'Link Copied!' : 'Copy Link'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Illustration */}
                <div className="lg:col-span-5 flex items-start justify-center">
                  <div className="relative w-full max-w-[524px] h-[350px]">
                    <Image
                      src="/images/referral-illustration.png"
                      alt="Referral"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* How it Works Section */}
              <div className="bg-[#eff8f8] border border-[#ccfbf1] rounded-2xl p-6 flex flex-col gap-6">
                <h3 className="font-poppins font-semibold text-xl text-[#1a2b4c] leading-5">
                  How it works
                </h3>
                <div className="flex flex-col gap-2.5">
                  {[
                    'Share your code with friends',
                    'They sign up and enter your code',
                    'They complete their first booking',
                    'You both get ₵20 credit'
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#3b9c9c] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-[11px] text-white leading-[16.5px]">
                          {index + 1}
                        </span>
                      </div>
                      <p className="font-poppins text-xl text-[#111] leading-normal pt-0.5">
                        {step}
                      </p>
                    </div>
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
