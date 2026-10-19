'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { useAuth } from '@/src/lib/auth-context';
import { api } from '@/src/lib/api';
import type { Service } from '@/src/lib/types';

export default function FavoriteServicesPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [favoriteServices, setFavoriteServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/account/favorites');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        const favorites = await api.users.getFavorites();
        setFavoriteServices(favorites);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  const handleRemoveFavorite = async (serviceId: string) => {
    try {
      await api.users.removeFavorite(serviceId);
      setFavoriteServices(prev => prev.filter(s => s.id !== serviceId));
    } catch (err) {
      console.error('Error removing favorite:', err);
      alert(err instanceof Error ? err.message : 'Failed to remove favorite');
    }
  };

  const handleBookService = (service: Service) => {
    router.push(`/services/${service.categoryName.toLowerCase().replace(/\s+/g, '-')}/${service.id}`);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getUserInitials = () => {
    if (!user?.fullName) return '?';
    const names = user.fullName.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  if (authLoading || isLoading) {
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
                        <Image src="/images/icons/phone-icon.svg" alt="" width={11} height={11} />
                        <p className="font-poppins text-sm text-[#424655] leading-normal">
                          {user.phone}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <Link href="/account/edit">
                  <button className="w-full bg-[#02368c] h-10 rounded-md font-roboto-condensed font-medium text-base text-white leading-6 hover:bg-[#024189] transition-colors">
                    Edit Profile
                  </button>
                </Link>
              </div>

              {/* Navigation Menu */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <div className="px-2"><span className="font-medium text-sm text-[#777] leading-normal">ACCOUNT</span></div>
                  <div className="flex flex-col gap-0.5">
                    <Link href="/account/favorites" className="flex items-center gap-2 p-2 rounded-lg bg-[#eff4ff] border-l-4 border-[#02368c]">
                      <Image src="/images/icons/favorite-icon.svg" alt="" width={17} height={15} />
                      <span className="font-poppins text-base text-[#02368c] font-medium leading-normal">Favorite Services</span>
                    </Link>
                    <Link href="/account/addresses" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image src="/images/icons/saved-address-icon.svg" alt="" width={13} height={17} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Saved Addresses</span>
                    </Link>
                    <Link href="/account" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
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
                  <div className="px-2"><span className="font-medium text-sm text-[#727787] leading-normal">SUPPORT</span></div>
                  <div className="flex flex-col gap-0.5">
                    <Link href="/support" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image src="/images/icons/help-support-icon.svg" alt="" width={17} height={15} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Help & Support</span>
                    </Link>
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
                    <button onClick={handleLogout} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
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

              {/* Empty State */}
              {favoriteServices.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 mb-4 opacity-20">
                    <Image
                      src="/images/icons/heart-favorite.svg"
                      alt="No favorites"
                      width={80}
                      height={80}
                    />
                  </div>
                  <h3 className="font-poppins font-medium text-xl text-[#111] mb-2">
                    No Favorite Services Yet
                  </h3>
                  <p className="font-poppins text-sm text-[#64748b] mb-6 max-w-md">
                    Start adding services to your favorites for quick access later
                  </p>
                  <Link href="/services">
                    <button className="bg-[#02368c] hover:bg-[#024189] text-white px-6 py-3 rounded-lg font-roboto-condensed font-medium text-base transition-colors">
                      Browse Services
                    </button>
                  </Link>
                </div>
              ) : (
                /* Service Cards Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] p-3 flex flex-col gap-2"
                    >
                      {/* Service Image */}
                      <div className="relative h-32 rounded-lg overflow-hidden bg-gray-100">
                        {service.imageUrl ? (
                          <Image
                            src={service.imageUrl}
                            alt={service.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#777] text-sm">
                            No image
                          </div>
                        )}
                        {/* Heart Icon - Remove from favorites */}
                        <button
                          onClick={() => handleRemoveFavorite(service.id)}
                          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-[15.5px] flex items-center justify-center hover:bg-gray-100 transition-colors"
                          title="Remove from favorites"
                        >
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
                                {service.rating.toFixed(1)}
                              </span>
                            </div>
                            <span className="font-poppins text-[10px] text-[#777] leading-normal before:content-['•'] before:mr-1">
                              {service.reviewCount}+ reviews
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-1">
                            <span className="font-poppins text-[10px] text-[#777] leading-normal">
                              Starts At
                            </span>
                            <span className="font-normal text-xs text-[#111] leading-normal">
                              ₵{service.basePrice}
                            </span>
                          </div>
                        </div>

                        {/* Book Button */}
                        <button
                          onClick={() => handleBookService(service)}
                          className="bg-[#02368c] h-5 px-6 rounded flex items-center gap-0.5 hover:bg-[#024189] transition-colors"
                        >
                          <Image
                            src="/images/icons/add-plus.svg"
                            alt=""
                            width={15}
                            height={15}
                          />
                          <span className="font-roboto-condensed text-[10px] text-white leading-normal">
                            Book
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
