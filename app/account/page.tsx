'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { useAuth } from '@/src/lib/auth-context';
import { api } from '@/src/lib/api';
import type { PaymentMethod } from '@/src/lib/types';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoadingMethods, setIsLoadingMethods] = useState(true);
  const [expandAddPayment, setExpandAddPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [selectedMethod, setSelectedMethod] = useState<'mobile' | 'card'>('mobile');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/account');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoadingMethods(true);
        const response = await api.payments.getMethods();
        const methods = Array.isArray(response) ? response : response.paymentMethods || [];
        setPaymentMethods(methods);
      } catch (err) {
        console.error('Error fetching payment methods:', err);
      } finally {
        setIsLoadingMethods(false);
      }
    };

    fetchPaymentMethods();
  }, [isAuthenticated]);

  const handleAddPaymentMethod = async () => {
    if (!phoneNumber || !accountName) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // For mobile money, we'll use a token format (in production, this would come from a payment gateway)
      const token = `${selectedMethod}_${phoneNumber}`;

      const newMethod = await api.payments.addMethod({
        type: selectedMethod === 'mobile' ? 'MOBILE_MONEY' : 'CARD',
        token,
        isDefault,
      });

      setPaymentMethods(prev => [...prev, newMethod]);

      // Reset form
      setPhoneNumber('');
      setAccountName('');
      setIsDefault(false);
      setExpandAddPayment(false);
    } catch (err) {
      console.error('Error adding payment method:', err);
      alert(err instanceof Error ? err.message : 'Failed to add payment method');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemovePaymentMethod = async (id: string) => {
    if (!confirm('Are you sure you want to remove this payment method?')) return;

    try {
      await api.payments.removeMethod(id);
      setPaymentMethods(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Error removing payment method:', err);
      alert(err instanceof Error ? err.message : 'Failed to remove payment method');
    }
  };

  const handleSetDefaultMethod = async (id: string) => {
    try {
      await api.payments.setDefaultMethod(id);
      setPaymentMethods(prev => prev.map(m => ({
        ...m,
        isDefault: m.id === id
      })));
    } catch (err) {
      console.error('Error setting default payment method:', err);
      alert(err instanceof Error ? err.message : 'Failed to set default payment method');
    }
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-[1728px] mx-auto">
          <div className="mb-6">
            <h1 className="font-roboto-condensed font-medium text-[40px] text-[#0b1c30] tracking-[-1px] leading-[48px] mb-2">
              My Account
            </h1>
            <p className="font-poppins text-lg text-[#424655] leading-normal">
              Manage your profile, bookings, payments, and account preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 flex flex-col gap-4">
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
                    <Link href="/account/favorites" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image src="/images/icons/favorite-icon.svg" alt="" width={17} height={15} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Favorite Services</span>
                    </Link>
                    <Link href="/account/addresses" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image src="/images/icons/saved-address-icon.svg" alt="" width={13} height={17} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Saved Addresses</span>
                    </Link>
                    <Link href="/account" className="flex items-center gap-2 p-2 rounded-lg bg-[#eff4ff] border-l-4 border-[#02368c]">
                      <Image src="/images/icons/payment-method-icon.svg" alt="" width={17} height={13} />
                      <span className="font-poppins text-base text-[#02368c] font-medium leading-normal">Payment Methods</span>
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

            {/* Right Content - Payment Methods */}
            <div className="lg:col-span-9 flex flex-col gap-8">
              <div>
                <h2 className="font-roboto-condensed font-medium text-2xl text-[#111] leading-normal">
                  Payment Methods
                </h2>
              </div>

              {/* Loading State */}
              {isLoadingMethods ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#02368c] border-t-transparent" />
                </div>
              ) : (
                <>
                  {/* Saved Payment Methods */}
                  {paymentMethods.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="bg-white border border-[#c5c6cf] rounded-lg p-3.5 flex items-center gap-3 shadow-[0px_4px_12px_0px_rgba(26,43,76,0.08)]"
                        >
                          <div className="w-10 h-10 bg-[#f0eded] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Image
                              src={method.type === 'MOBILE_MONEY' ? '/images/icons/mobile-money-icon.svg' : '/images/icons/visa-card-icon.svg'}
                              alt=""
                              width={20}
                              height={20}
                            />
                          </div>
                          <div className="flex-1 flex flex-col gap-0.5">
                            <p className="font-poppins font-medium text-lg text-[#111] leading-[26px]">
                              {method.type === 'MOBILE_MONEY' ? 'Mobile Money' : method.brand || 'Card'}
                            </p>
                            <p className="font-poppins text-base text-[#777] leading-normal">
                              •••• {method.last4}
                            </p>
                          </div>
                          {method.isDefault && (
                            <div className="bg-[rgba(207,157,0,0.09)] px-2 py-0.5 rounded-full">
                              <span className="font-poppins text-xs text-[#cf9d00] leading-normal">Default</span>
                            </div>
                          )}
                          {!method.isDefault && (
                            <button
                              onClick={() => handleSetDefaultMethod(method.id)}
                              className="font-poppins text-sm text-[#02368c] leading-normal hover:underline"
                            >
                              Set Default
                            </button>
                          )}
                          <button
                            onClick={() => handleRemovePaymentMethod(method.id)}
                            className="font-roboto-condensed text-[15px] text-[#ba1a1a] leading-4 tracking-[0.24px] hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="font-poppins text-base text-[#64748b] mb-4">
                        No payment methods saved yet
                      </p>
                      <button
                        onClick={() => setExpandAddPayment(true)}
                        className="bg-[#02368c] text-white px-6 py-3 rounded-lg hover:bg-[#024189] transition-colors"
                      >
                        Add Your First Payment Method
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Add Payment Method Accordion */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
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
                          className={`flex-1 flex flex-col items-center gap-3 py-4 px-10 rounded-lg border-2 transition-all ${
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
                          className={`flex-1 flex flex-col items-center gap-3 py-4 px-8 rounded-lg border-2 transition-all ${
                            selectedMethod === 'card'
                              ? 'border-[#02368c] shadow-[0px_4px_12px_0px_rgba(26,43,76,0.08)]'
                              : 'border-[rgba(0,0,0,0.1)]'
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

                    {/* Phone Number / Card Number */}
                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-sm text-[#111] leading-normal">
                        {selectedMethod === 'mobile' ? 'Phone Number' : 'Card Number'}
                      </label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={selectedMethod === 'mobile' ? 'Enter phone number' : 'Enter card number'}
                        className="border border-[rgba(0,0,0,0.12)] rounded-lg px-5 py-3 h-11 font-poppins text-sm text-[#111] placeholder:text-[#777] outline-none focus:border-[#02368c]"
                      />
                    </div>

                    {/* Account Name */}
                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-sm text-[#111] leading-normal">
                        Account Name
                      </label>
                      <input
                        type="text"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        placeholder="Enter account name"
                        className="border border-[rgba(0,0,0,0.12)] rounded-lg px-5 py-3 h-11 font-poppins text-sm text-[#111] placeholder:text-[#777] outline-none focus:border-[#02368c]"
                      />
                    </div>

                    {/* Set as Default */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsDefault(!isDefault)}
                        className={`w-5 h-5 border rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                          isDefault ? 'bg-[#02368c] border-[#02368c]' : 'bg-white border-[#75777f]'
                        }`}
                      >
                        {isDefault && (
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                            <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <label
                        onClick={() => setIsDefault(!isDefault)}
                        className="font-poppins text-sm text-[#111] leading-normal cursor-pointer"
                      >
                        Set as default payment method
                      </label>
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={handleAddPaymentMethod}
                      disabled={isSubmitting}
                      className={`w-full h-12 px-6 rounded-xl font-roboto-condensed font-medium text-base text-white transition-colors ${
                        isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#02368c] hover:bg-[#024189]'
                      }`}
                    >
                      {isSubmitting ? 'Adding...' : 'Add Payment Method'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
