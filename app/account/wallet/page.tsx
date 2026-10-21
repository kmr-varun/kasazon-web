'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { useAuth } from '@/src/lib/auth-context';
import { api } from '@/src/lib/api';
import type { WalletInfo } from '@/src/lib/types';

export default function WalletPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isLoadingWallet, setIsLoadingWallet] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [isToppingUp, setIsToppingUp] = useState(false);

  const recommendedAmounts = [100, 250, 500, 1000];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/account/wallet');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchWallet = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoadingWallet(true);
        const wallet = await api.users.getWallet();
        setWalletInfo(wallet);
      } catch (err) {
        console.error('Error fetching wallet:', err);
      } finally {
        setIsLoadingWallet(false);
      }
    };

    fetchWallet();
  }, [isAuthenticated]);

  const handleTopUp = async () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;

    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsToppingUp(true);
    try {
      await api.payments.topupWallet(amount);

      // Refresh wallet info
      const wallet = await api.users.getWallet();
      setWalletInfo(wallet);

      alert(`Successfully added GH₵${amount} to your wallet!`);
      setCustomAmount('');
    } catch (err) {
      console.error('Error topping up wallet:', err);
      alert(err instanceof Error ? err.message : 'Failed to top up wallet');
    } finally {
      setIsToppingUp(false);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
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
                    <Link href="/account" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Image src="/images/icons/payment-method-icon.svg" alt="" width={17} height={13} />
                      <span className="font-poppins text-base text-[#424655] leading-normal">Payment Methods</span>
                    </Link>
                    <Link href="/account/wallet" className="flex items-center gap-2 p-2 rounded-lg bg-[#eff4ff] border-l-4 border-[#02368c]">
                      <Image src="/images/icons/wallet-icon.svg" alt="" width={16} height={15} />
                      <span className="font-poppins text-base text-[#02368c] font-medium leading-normal">Wallet</span>
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

            {/* Right Content - Wallet */}
            <div className="lg:col-span-9 flex flex-col gap-8">
              {/* Wallet Balance Card */}
              <div className="bg-gradient-to-br from-[#02368c] to-[#024189] rounded-2xl p-6 sm:p-8 text-white">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="font-poppins text-sm text-white/70 mb-2">Available Balance</p>
                    {isLoadingWallet ? (
                      <div className="h-12 w-32 bg-white/20 rounded animate-pulse" />
                    ) : (
                      <h2 className="font-roboto-condensed font-bold text-5xl text-white">
                        GH₵ {walletInfo?.balance != null ? Number(walletInfo.balance).toFixed(2) : '0.00'}
                      </h2>
                    )}
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Image src="/images/icons/wallet-icon.svg" alt="" width={24} height={24} />
                  </div>
                </div>
                {walletInfo && walletInfo.pendingBalance > 0 && (
                  <p className="font-poppins text-sm text-white/80">
                    Pending: GH₵ {Number(walletInfo.pendingBalance).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Top Up Card */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-2xl p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                <h3 className="font-roboto-condensed font-medium text-2xl text-[#111] leading-normal mb-6">
                  Top Up Wallet
                </h3>

                {/* Recommended Amounts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {recommendedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`h-16 rounded-lg border-2 transition-all ${
                        selectedAmount === amount && !customAmount
                          ? 'border-[#02368c] bg-[#eff4ff]'
                          : 'border-gray-200 bg-white hover:border-[#02368c]'
                      }`}
                    >
                      <span className="font-roboto-condensed font-semibold text-xl text-[#111]">
                        GH₵{amount}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="flex flex-col gap-2 mb-6">
                  <label className="font-poppins text-sm text-[#111] leading-normal">
                    Or enter custom amount
                  </label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    placeholder="Enter amount"
                    className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-poppins text-sm text-[#111] placeholder:text-[#777] outline-none focus:border-[#02368c]"
                  />
                </div>

                {/* Top Up Button */}
                <button
                  onClick={handleTopUp}
                  disabled={isToppingUp || (!customAmount && !selectedAmount)}
                  className={`w-full h-12 rounded-xl font-roboto-condensed font-medium text-base text-white transition-colors ${
                    isToppingUp || (!customAmount && !selectedAmount)
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#02368c] hover:bg-[#024189]'
                  }`}
                >
                  {isToppingUp ? 'Processing...' : 'Top Up Wallet'}
                </button>
              </div>

              {/* Transaction History */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-2xl p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                <h3 className="font-roboto-condensed font-medium text-2xl text-[#111] leading-normal mb-6">
                  Transaction History
                </h3>

                {isLoadingWallet ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#02368c] border-t-transparent" />
                  </div>
                ) : walletInfo && walletInfo.transactions.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {walletInfo.transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            transaction.type === 'CREDIT'
                              ? 'bg-[rgba(46,158,91,0.1)]'
                              : 'bg-[rgba(228,104,93,0.1)]'
                          }`}
                        >
                          {transaction.type === 'CREDIT' ? '↓' : '↑'}
                        </div>
                        <div className="flex-1">
                          <p className="font-poppins font-medium text-base text-[#111] leading-normal">
                            {transaction.description}
                          </p>
                          <p className="font-poppins text-sm text-[#777] leading-normal">
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                        <span
                          className={`font-roboto-condensed font-semibold text-lg ${
                            transaction.type === 'CREDIT' ? 'text-[#2e9e5b]' : 'text-[#e4685d]'
                          }`}
                        >
                          {transaction.type === 'CREDIT' ? '+' : '-'}GH₵{Math.abs(Number(transaction.amount)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="font-poppins text-base text-[#64748b]">
                      No transactions yet
                    </p>
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
