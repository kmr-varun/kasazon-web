'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { useAuth } from '@/src/lib/auth-context';
import { api } from '@/src/lib/api';
import type { Address } from '@/src/lib/types';

export default function SavedAddressesPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandAddAddress, setExpandAddAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Ghana',
    additionalInfo: '',
    isDefault: false,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        const { addresses: fetchedAddresses } = await api.addresses.list();
        setAddresses(fetchedAddresses);
      } catch (err) {
        console.error('Error fetching addresses:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [isAuthenticated]);

  const handleFormChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      label: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Ghana',
      additionalInfo: '',
      isDefault: false,
    });
    setEditingId(null);
  };

  const handleAddAddress = async () => {
    if (!formData.label || !formData.street || !formData.city || !formData.state || !formData.postalCode) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const newAddress = await api.addresses.create(formData);
      setAddresses(prev => [...prev, newAddress]);
      resetForm();
      setExpandAddAddress(false);
    } catch (err) {
      console.error('Error adding address:', err);
      alert(err instanceof Error ? err.message : 'Failed to add address');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditAddress = (address: Address) => {
    setFormData({
      label: address.label,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      additionalInfo: address.additionalInfo || '',
      isDefault: address.isDefault,
    });
    setEditingId(address.id);
    setExpandAddAddress(true);
  };

  const handleUpdateAddress = async () => {
    if (!editingId) return;

    if (!formData.label || !formData.street || !formData.city || !formData.state || !formData.postalCode) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const updated = await api.addresses.update(editingId, formData);
      setAddresses(prev => prev.map(a => a.id === editingId ? updated : a));
      resetForm();
      setExpandAddAddress(false);
    } catch (err) {
      console.error('Error updating address:', err);
      alert(err instanceof Error ? err.message : 'Failed to update address');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    try {
      await api.addresses.delete(id);
      setAddresses(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Error deleting address:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete address');
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await api.addresses.setDefault(id);
      // Update local state
      setAddresses(prev => prev.map(a => ({
        ...a,
        isDefault: a.id === id
      })));
    } catch (err) {
      console.error('Error setting default address:', err);
      alert(err instanceof Error ? err.message : 'Failed to set default address');
    }
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
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#02368c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-poppins text-lg text-[#64748b]">Loading addresses...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-[1728px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {/* User Profile Card */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col items-center pb-4">
                  <div className="w-20 h-20 rounded-full bg-[#02368c] flex items-center justify-center mb-2 shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]">
                    <span className="font-bold text-2xl text-white leading-8">
                      {user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                    </span>
                  </div>
                  <h2 className="font-poppins font-medium text-xl text-[#111] leading-7 tracking-[-0.2px] text-center">
                    {user?.fullName || 'User'}
                  </h2>
                  <div className="flex flex-col items-center gap-0.5 mt-2">
                    {user?.email && (
                      <p className="font-poppins text-sm text-[#424655] leading-normal text-center">
                        {user.email}
                      </p>
                    )}
                    {user?.phone && (
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
                    <Link href="/account/addresses" className="flex items-center gap-2 p-2 rounded-lg bg-[#eff4ff] border-l-4 border-[#02368c]">
                      <Image src="/images/icons/saved-address-icon.svg" alt="" width={13} height={17} />
                      <span className="font-poppins text-base text-[#02368c] font-medium leading-normal">Saved Addresses</span>
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

            {/* Right Content - Saved Addresses */}
            <div className="lg:col-span-9 flex flex-col gap-6">
              <div>
                <h2 className="font-roboto-condensed font-medium text-2xl text-[#111] leading-normal">
                  Saved Addresses
                </h2>
              </div>

              {/* Saved Address Cards */}
              {addresses.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`bg-white border rounded-lg p-3 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-3 items-start max-w-[674px] ${
                        address.isDefault ? 'border-[#02368c]' : 'border-[rgba(0,0,0,0.1)]'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        address.isDefault ? 'bg-[rgba(212,228,255,0.53)]' : 'bg-[#f0eded]'
                      }`}>
                        <Image src="/images/icons/home-location-icon.svg" alt="" width={19} height={19} />
                      </div>

                      <div className="flex-1 flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-poppins font-medium text-xl text-[#111] leading-normal">
                            {address.label}
                          </h3>
                          {address.isDefault && (
                            <span className="bg-[#e5eeff] px-2 py-0.5 rounded-full text-xs text-[#02368c] font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <p className="font-poppins text-lg text-[#111] leading-normal">
                            {address.street}
                          </p>
                          <p className="font-poppins text-sm text-[#777] leading-normal">
                            {address.city}, {address.state} {address.postalCode}
                          </p>
                          {address.additionalInfo && (
                            <p className="font-poppins text-sm text-[#777] leading-normal">
                              {address.additionalInfo}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex-shrink-0 flex flex-col gap-2">
                        <button
                          onClick={() => handleEditAddress(address)}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Edit"
                        >
                          <Image src="/images/icons/edit-address-icon.svg" alt="Edit" width={20} height={18} />
                        </button>
                        {!address.isDefault && (
                          <>
                            <button
                              onClick={() => handleSetDefault(address.id)}
                              className="p-1 hover:bg-gray-100 rounded text-xs text-[#02368c]"
                              title="Set as default"
                            >
                              ⭐
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="p-1 hover:bg-red-50 rounded text-red-600"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="font-poppins text-base text-[#64748b] mb-4">
                    No saved addresses yet
                  </p>
                  <button
                    onClick={() => setExpandAddAddress(true)}
                    className="bg-[#02368c] text-white px-6 py-3 rounded-lg hover:bg-[#024189] transition-colors"
                  >
                    Add Your First Address
                  </button>
                </div>
              )}

              {/* Add New Address Accordion */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                <button
                  onClick={() => {
                    if (expandAddAddress && editingId) {
                      resetForm();
                    }
                    setExpandAddAddress(!expandAddAddress);
                  }}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#dae2fd] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Image src="/images/icons/add-location-icon.svg" alt="" width={19} height={22} />
                    </div>
                    <div className="flex flex-col gap-0.5 text-left">
                      <h3 className="font-poppins font-medium text-xl text-[#0b1c30] leading-7 tracking-[-0.2px]">
                        {editingId ? 'Edit Address' : 'Add New Address'}
                      </h3>
                      <p className="font-poppins text-sm text-[#424655] leading-normal">
                        {editingId ? 'Update address details' : 'Enter complete address information'}
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

                {expandAddAddress && (
                  <div className="px-6 pb-6 pt-1">
                    <div className="flex flex-col gap-6">
                      {/* Address Label */}
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-sm text-[#111] leading-normal">
                          Address Label (Home, Work, etc.)
                        </label>
                        <input
                          type="text"
                          value={formData.label}
                          onChange={(e) => handleFormChange('label', e.target.value)}
                          placeholder="e.g. Home, Work, Apartment"
                          className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-roboto-flex text-xs text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c]"
                        />
                      </div>

                      {/* Street Address */}
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-sm text-[#111] leading-normal">
                          Street Address
                        </label>
                        <input
                          type="text"
                          value={formData.street}
                          onChange={(e) => handleFormChange('street', e.target.value)}
                          placeholder="House number, street name"
                          className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-roboto-flex text-xs text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c]"
                        />
                      </div>

                      {/* City and State */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="font-poppins text-sm text-[#111] leading-normal">City</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleFormChange('city', e.target.value)}
                            placeholder="City"
                            className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-roboto-flex text-xs text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c]"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="font-poppins text-sm text-[#111] leading-normal">State</label>
                          <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => handleFormChange('state', e.target.value)}
                            placeholder="State/Region"
                            className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-roboto-flex text-xs text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c]"
                          />
                        </div>
                      </div>

                      {/* Postal Code and Country */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="font-poppins text-sm text-[#111] leading-normal">Postal Code</label>
                          <input
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) => handleFormChange('postalCode', e.target.value)}
                            placeholder="Postal/ZIP code"
                            className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-roboto-flex text-xs text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c]"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="font-poppins text-sm text-[#111] leading-normal">Country</label>
                          <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => handleFormChange('country', e.target.value)}
                            placeholder="Country"
                            className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-roboto-flex text-xs text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c]"
                          />
                        </div>
                      </div>

                      {/* Landmark */}
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-sm text-[#111] leading-normal">
                          Landmark / Additional Info (optional)
                        </label>
                        <input
                          type="text"
                          value={formData.additionalInfo}
                          onChange={(e) => handleFormChange('additionalInfo', e.target.value)}
                          placeholder="e.g. Near Shell Station, blue gate"
                          className="border border-[rgba(0,0,0,0.12)] rounded-lg h-11 px-5 font-roboto-flex text-xs text-[#111] placeholder:text-[#777] leading-normal outline-none focus:border-[#02368c]"
                        />
                      </div>

                      {/* Default Address Checkbox */}
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleFormChange('isDefault', !formData.isDefault)}
                          className={`w-5 h-5 border rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                            formData.isDefault ? 'bg-[#02368c] border-[#02368c]' : 'bg-white border-[#75777f]'
                          }`}
                        >
                          {formData.isDefault && (
                            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                              <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                        <label
                          onClick={() => handleFormChange('isDefault', !formData.isDefault)}
                          className="font-poppins text-sm text-[#111] leading-normal cursor-pointer"
                        >
                          Save as my default address
                        </label>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={editingId ? handleUpdateAddress : handleAddAddress}
                          disabled={isSubmitting}
                          className={`flex-1 h-12 px-6 rounded-xl font-roboto-condensed font-medium text-base text-white transition-colors ${
                            isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#02368c] hover:bg-[#024189]'
                          }`}
                        >
                          {isSubmitting ? 'Saving...' : editingId ? 'Update Address' : 'Save Address'}
                        </button>
                        {editingId && (
                          <button
                            onClick={() => {
                              resetForm();
                              setExpandAddAddress(false);
                            }}
                            className="px-6 h-12 rounded-xl border border-gray-300 font-roboto-condensed font-medium text-base text-[#424655] hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
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
