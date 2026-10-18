'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function FavoriteServicesPage() {
  const favoriteServices = [
    {
      id: 1,
      name: 'Foam-jet AC Service',
      rating: 4.5,
      reviews: 890,
      startingPrice: 40,
      image: '/images/service-card-image.png'
    },
    {
      id: 2,
      name: 'Foam-jet AC Service',
      rating: 4.5,
      reviews: 890,
      startingPrice: 40,
      image: '/images/service-card-image.png'
    },
    {
      id: 3,
      name: 'Foam-jet AC Service',
      rating: 4.5,
      reviews: 890,
      startingPrice: 40,
      image: '/images/service-card-image.png'
    },
    {
      id: 4,
      name: 'Foam-jet AC Service',
      rating: 4.5,
      reviews: 890,
      startingPrice: 40,
      image: '/images/service-card-image.png'
    },
    {
      id: 5,
      name: 'Foam-jet AC Service',
      rating: 4.5,
      reviews: 890,
      startingPrice: 40,
      image: '/images/service-card-image.png'
    },
    {
      id: 6,
      name: 'Foam-jet AC Service',
      rating: 4.5,
      reviews: 890,
      startingPrice: 40,
      image: '/images/service-card-image.png'
    },
    {
      id: 7,
      name: 'Foam-jet AC Service',
      rating: 4.5,
      reviews: 890,
      startingPrice: 40,
      image: '/images/service-card-image.png'
    },
    {
      id: 8,
      name: 'Foam-jet AC Service',
      rating: 4.5,
      reviews: 890,
      startingPrice: 40,
      image: '/images/service-card-image.png'
    },
    {
      id: 9,
      name: 'Foam-jet AC Service',
      rating: 4.5,
      reviews: 890,
      startingPrice: 40,
      image: '/images/service-card-image.png'
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

            {/* Right Content - Favorite Services */}
            <div className="lg:col-span-9 flex flex-col gap-6">
              {/* Heading */}
              <div>
                <h2 className="font-roboto-condensed font-medium text-2xl text-[#111] leading-normal">
                  Favorite Services
                </h2>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] p-3 flex flex-col gap-2"
                  >
                    {/* Service Image */}
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />
                      {/* Heart Icon */}
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-[15.5px] flex items-center justify-center">
                        <Image
                          src="/images/icons/heart-favorite.svg"
                          alt="Favorite"
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>

                    {/* Service Details */}
                    <div className="flex items-end justify-between px-1.5">
                      <div className="flex flex-col gap-1.5">
                        {/* Service Name */}
                        <p className="font-poppins font-medium text-sm text-[#111] leading-normal">
                          {service.name}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-1">
                            <Image
                              src="/images/star-filled.png"
                              alt=""
                              width={10}
                              height={10}
                            />
                            <span className="font-poppins text-[10px] text-[#777] leading-normal">
                              {service.rating}
                            </span>
                          </div>
                          <span className="font-poppins text-[10px] text-[#777] leading-normal before:content-['•'] before:mr-1">
                            {service.reviews}+ reviews
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-1">
                          <span className="font-poppins text-[10px] text-[#777] leading-normal">
                            Starts At
                          </span>
                          <span className="font-normal text-xs text-[#111] leading-normal">
                            ₵{service.startingPrice}
                          </span>
                        </div>
                      </div>

                      {/* Add Button */}
                      <button className="bg-[#02368c] h-5 px-6 rounded flex items-center gap-0.5 hover:bg-[#024189] transition-colors">
                        <Image
                          src="/images/icons/add-plus.svg"
                          alt=""
                          width={15}
                          height={15}
                        />
                        <span className="font-roboto-condensed text-[10px] text-white leading-normal">
                          Add
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
