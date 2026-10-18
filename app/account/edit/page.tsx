'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    fullName: 'Leo Boateng',
    phoneNumber: '+233 5678905643',
    email: 'leo@hmail.com',
    dateOfBirth: '04/01/1998',
    gender: 'Female',
    country: '',
    city: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
    // Add save logic here
  };

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

            {/* Right Content - Edit Profile */}
            <div className="lg:col-span-9 flex flex-col gap-8">
              {/* Heading */}
              <div>
                <h2 className="font-roboto-condensed font-medium text-2xl text-[#111] leading-normal">
                  Edit Profile
                </h2>
              </div>

              {/* Profile Form */}
              <div className="flex flex-col items-center gap-10 max-w-[592px]">
                {/* Profile Photo with Edit Button */}
                <div className="relative">
                  <div className="w-[118px] h-[118px] rounded-full overflow-hidden">
                    <Image
                      src="/images/profile-photo.png"
                      alt="Profile"
                      width={118}
                      height={118}
                      className="object-cover"
                    />
                  </div>
                  {/* Edit Photo Button */}
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#02368c] border-2 border-white rounded-full flex items-center justify-center shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] hover:bg-[#024189] transition-colors">
                    <Image src="/images/icons/edit-photo-icon.svg" alt="Edit" width={18} height={18} />
                  </button>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-4 w-full">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-base text-[#111] leading-normal">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-poppins text-sm text-[#111] leading-normal outline-none focus:border-[#02368c]"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-base text-[#111] leading-normal">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-poppins text-sm text-[#111] leading-normal outline-none focus:border-[#02368c]"
                    />
                  </div>

                  {/* Email with Verify */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-base text-[#111] leading-normal">
                      Email
                    </label>
                    <div className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 flex items-center gap-2.5">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-1 font-poppins text-sm text-[#111] leading-normal outline-none"
                      />
                      <button className="font-poppins text-sm text-[#02368c] leading-normal hover:text-[#024189] transition-colors">
                        Verify
                      </button>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-base text-[#111] leading-normal">
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-poppins text-sm text-[#111] leading-normal outline-none focus:border-[#02368c]"
                    />
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-base text-[#111] leading-normal">
                      Gender
                    </label>
                    <input
                      type="text"
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-poppins text-sm text-[#111] leading-normal outline-none focus:border-[#02368c]"
                    />
                  </div>

                  {/* Country Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-base text-[#111] leading-normal">
                      Country
                    </label>
                    <div className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 flex items-center justify-between cursor-pointer hover:border-[#02368c] transition-colors">
                      <span className="font-poppins text-sm text-[#777] leading-normal">
                        Choose your country
                      </span>
                      <Image src="/images/icons/dropdown-chevron.svg" alt="" width={9} height={4} />
                    </div>
                  </div>

                  {/* City Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-base text-[#111] leading-normal">
                      City
                    </label>
                    <div className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 flex items-center justify-between cursor-pointer hover:border-[#02368c] transition-colors">
                      <span className="font-poppins text-sm text-[#777] leading-normal">
                        Choose your city
                      </span>
                      <Image src="/images/icons/dropdown-chevron.svg" alt="" width={9} height={4} />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="bg-[#02368c] h-16 px-6 rounded-xl w-full max-w-[512px] flex items-center justify-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#024189] transition-colors"
                >
                  <span className="font-roboto-condensed font-medium text-base text-white leading-6">
                    Save
                  </span>
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
