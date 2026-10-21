'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BookingSummary } from './BookingSummary';
import type { Address, Service } from '@/src/lib/types';
import type { BookingState, ServicePackage } from '@/src/lib/booking-context';

export interface AddressPageContentProps {
  addresses: Address[];
  selectedAddress: Address | null;
  service: Service | null;
  selectedPackage: ServicePackage | null;
  booking: BookingState;
  onAddressSelect: (address: Address) => void;
  onAddAddress: (address: Omit<Address, 'id'>) => void;
  onCheckout: () => void;
  className?: string;
}

export function AddressPageContent({
  addresses,
  selectedAddress,
  service,
  selectedPackage,
  booking,
  onAddressSelect,
  onAddAddress,
  onCheckout,
  className = '',
}: AddressPageContentProps) {
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    type: 'HOME' as 'HOME' | 'WORK' | 'OTHER',
    label: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Ghana',
    landmark: '',
    isDefault: false,
  });

  const handleFormChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitNewAddress = async () => {
    // Validation
    if (!formData.addressLine1 || !formData.city || !formData.state) {
      alert('Please fill in all required fields (Address, City, State)');
      return;
    }

    if (formData.addressLine1.length < 5) {
      alert('Address must be at least 5 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddAddress({
        type: formData.type,
        label: formData.label || undefined,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2 || undefined,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode || undefined,
        country: formData.country || 'Ghana',
        landmark: formData.landmark || undefined,
        isDefault: formData.isDefault,
      });

      // Reset form
      setFormData({
        type: 'HOME',
        label: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Ghana',
        landmark: '',
        isDefault: false,
      });
      setIsFormExpanded(false);
    } catch (err) {
      console.error('Error adding address:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeStep = (stepIndex: number) => {
    console.log('Change step:', stepIndex);
  };

  const getAddressIcon = (label: string | undefined, type: string): string => {
    if (type === 'HOME' || (label && label.toLowerCase().includes('home'))) {
      return '/images/icons/home-icon.svg';
    }
    if (type === 'WORK' || (label && label.toLowerCase().includes('work'))) {
      return '/images/icons/work-icon.svg';
    }
    return '/images/icons/location-pin.svg';
  };

  const reviewSteps = [
    {
      icon: '/images/icons/checkmark-circle.svg',
      title: 'Selected Service',
      value: service?.name || 'N/A',
    },
    {
      icon: '/images/icons/calendar.svg',
      title: 'Scheduled Slot',
      value: booking.selectedDate && booking.selectedTime
        ? `${new Date(booking.selectedDate).toLocaleDateString()} at ${booking.selectedTime}`
        : 'Not selected',
    },
    {
      icon: '/images/icons/location-pin.svg',
      title: 'Service Location',
      value: selectedAddress ? (selectedAddress.label || selectedAddress.addressLine1) : 'Select address',
    },
  ];

  return (
    <section className={`bg-white ${className}`}>
      <div className="w-full px-6 sm:px-12 lg:px-24 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-8">
              {/* Saved Addresses */}
              {addresses.length > 0 && (
                <div className="flex flex-col gap-3 w-full">
                  <h3 className="font-poppins font-semibold text-lg text-[#0b1c30]">
                    Saved Addresses
                  </h3>
                  {addresses.map((address) => (
                    <button
                      key={address.id}
                      onClick={() => onAddressSelect(address)}
                      className={`
                        bg-white
                        border
                        ${selectedAddress?.id === address.id ? 'border-[#02368c] border-2' : 'border-[rgba(0,0,0,0.1)]'}
                        rounded-lg p-3
                        shadow-[0px_1px_1px_rgba(0,0,0,0.05)]
                        flex gap-3 items-start
                        w-full
                        transition-colors
                        hover:border-[#02368c]
                        text-left
                      `}
                    >
                      <div className={`
                        ${selectedAddress?.id === address.id ? 'bg-[rgba(212,228,255,0.53)]' : 'bg-[#f0eded]'}
                        w-10 h-10
                        rounded-full
                        flex items-center justify-center
                        flex-shrink-0
                      `}>
                        <div className="relative w-5 h-5">
                          <Image
                            src={getAddressIcon(address.label, address.type)}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="
                          font-poppins font-medium text-xl
                          text-[#111]
                          leading-normal
                        ">
                          {address.label || address.type}
                        </h3>
                        <div className="flex flex-col gap-0.5 mt-1.5">
                          <p className="
                            font-poppins text-lg text-[#111]
                            leading-normal
                          ">
                            {address.addressLine1}
                          </p>
                          {address.addressLine2 && (
                            <p className="
                              font-poppins text-lg text-[#111]
                              leading-normal
                            ">
                              {address.addressLine2}
                            </p>
                          )}
                          <p className="
                            font-poppins text-sm text-[#777]
                            leading-normal
                          ">
                            {address.city}, {address.state} {address.postalCode || ''}
                          </p>
                          {address.landmark && (
                            <p className="
                              font-poppins text-sm text-[#777]
                              leading-normal
                            ">
                              {address.landmark}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Add New Address Accordion */}
              <div className="
                bg-white
                border border-[rgba(0,0,0,0.1)]
                rounded-2xl
                shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]
                overflow-hidden
                w-full
              ">
                {/* Accordion Header */}
                <button
                  onClick={() => setIsFormExpanded(!isFormExpanded)}
                  className="
                    w-full
                    p-6
                    flex items-center justify-between
                    hover:bg-gray-50 transition-colors
                  "
                >
                  <div className="flex gap-4 items-center">
                    <div className="
                      bg-[#dae2fd]
                      w-10 h-10
                      rounded-xl
                      flex items-center justify-center
                    ">
                      <div className="relative w-[19px] h-[22px]">
                        <Image
                          src="/images/icons/plus-icon.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="
                        font-poppins font-medium text-xl
                        text-[#0b1c30]
                        tracking-[-0.2px] leading-[28px]
                        text-left
                      ">
                        Add New Address
                      </h3>
                      <p className="
                        font-poppins text-sm text-[#424655]
                        leading-normal
                        text-left
                      ">
                        Enter complete address details
                      </p>
                    </div>
                  </div>

                  <div className="
                    bg-[#e5eeff]
                    w-8 h-8
                    rounded-full
                    flex items-center justify-center
                    flex-shrink-0
                  ">
                    <div className={`relative w-[10px] h-[6px] transition-transform ${isFormExpanded ? 'rotate-180' : ''}`}>
                      <Image
                        src="/images/icons/chevron-down-small.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </button>

                {/* Expandable Form */}
                {isFormExpanded && (
                  <div className="px-6 pb-6 pt-1">
                    <div className="flex flex-col gap-6">
                      {/* Address Type */}
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-sm text-[#111] leading-normal">
                          Address Type *
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => handleFormChange('type', e.target.value)}
                          className="
                            border border-[rgba(0,0,0,0.12)]
                            rounded-lg px-5 py-3 h-11 w-full
                            font-roboto-condensed text-xs
                            focus:outline-none focus:border-[#02368c]
                            bg-white
                          "
                        >
                          <option value="HOME">Home</option>
                          <option value="WORK">Work</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>

                      {/* Address Label */}
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-sm text-[#111] leading-normal">
                          Address Label (optional)
                        </label>
                        <input
                          type="text"
                          value={formData.label}
                          onChange={(e) => handleFormChange('label', e.target.value)}
                          placeholder="e.g. My Home, Main Office"
                          className="
                            border border-[rgba(0,0,0,0.12)]
                            rounded-lg px-5 py-3 h-11 w-full
                            font-roboto-condensed text-xs
                            focus:outline-none focus:border-[#02368c]
                          "
                        />
                      </div>

                      {/* Street Address Line 1 */}
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-sm text-[#111] leading-normal">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          value={formData.addressLine1}
                          onChange={(e) => handleFormChange('addressLine1', e.target.value)}
                          placeholder="House number, street name (min 5 characters)"
                          className="
                            border border-[rgba(0,0,0,0.12)]
                            rounded-lg px-5 py-3 h-11 w-full
                            font-roboto-condensed text-xs
                            focus:outline-none focus:border-[#02368c]
                          "
                        />
                      </div>

                      {/* Street Address Line 2 */}
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-sm text-[#111] leading-normal">
                          Apartment, Suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          value={formData.addressLine2}
                          onChange={(e) => handleFormChange('addressLine2', e.target.value)}
                          placeholder="Apt 4B, Floor 2, etc."
                          className="
                            border border-[rgba(0,0,0,0.12)]
                            rounded-lg px-5 py-3 h-11 w-full
                            font-roboto-condensed text-xs
                            focus:outline-none focus:border-[#02368c]
                          "
                        />
                      </div>

                      {/* City and State */}
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-2">
                          <label className="font-poppins text-sm text-[#111] leading-normal">
                            City
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleFormChange('city', e.target.value)}
                            placeholder="City"
                            className="
                              border border-[rgba(0,0,0,0.12)]
                              rounded-lg px-5 py-3 h-11 w-full
                              font-roboto-condensed text-xs
                              focus:outline-none focus:border-[#02368c]
                            "
                          />
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                          <label className="font-poppins text-sm text-[#111] leading-normal">
                            State
                          </label>
                          <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => handleFormChange('state', e.target.value)}
                            placeholder="State/Region"
                            className="
                              border border-[rgba(0,0,0,0.12)]
                              rounded-lg px-5 py-3 h-11 w-full
                              font-roboto-condensed text-xs
                              focus:outline-none focus:border-[#02368c]
                            "
                          />
                        </div>
                      </div>

                      {/* Postal Code and Country */}
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-2">
                          <label className="font-poppins text-sm text-[#111] leading-normal">
                            Postal Code (optional)
                          </label>
                          <input
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) => handleFormChange('postalCode', e.target.value)}
                            placeholder="Postal/ZIP code"
                            className="
                              border border-[rgba(0,0,0,0.12)]
                              rounded-lg px-5 py-3 h-11 w-full
                              font-roboto-condensed text-xs
                              focus:outline-none focus:border-[#02368c]
                            "
                          />
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                          <label className="font-poppins text-sm text-[#111] leading-normal">
                            Country
                          </label>
                          <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => handleFormChange('country', e.target.value)}
                            placeholder="Country"
                            className="
                              border border-[rgba(0,0,0,0.12)]
                              rounded-lg px-5 py-3 h-11 w-full
                              font-roboto-condensed text-xs
                              focus:outline-none focus:border-[#02368c]
                            "
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
                          value={formData.landmark}
                          onChange={(e) => handleFormChange('landmark', e.target.value)}
                          placeholder="e.g. Near Shell Station, blue gate"
                          className="
                            border border-[rgba(0,0,0,0.12)]
                            rounded-lg px-5 py-3 h-11 w-full
                            font-roboto-condensed text-xs
                            focus:outline-none focus:border-[#02368c]
                          "
                        />
                      </div>

                      {/* Default Address Checkbox */}
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="default-address"
                          checked={formData.isDefault}
                          onChange={(e) => handleFormChange('isDefault', e.target.checked)}
                          className="
                            w-5 h-5
                            border border-[#75777f]
                            rounded
                            focus:outline-none focus:ring-2 focus:ring-[#02368c]
                          "
                        />
                        <label
                          htmlFor="default-address"
                          className="font-poppins text-sm text-[#111] leading-normal cursor-pointer"
                        >
                          Save as my default address
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={handleSubmitNewAddress}
                        disabled={isSubmitting}
                        className={`
                          w-full px-6 py-4 rounded-xl
                          font-roboto-condensed font-medium text-base
                          text-white text-center
                          transition-colors
                          ${isSubmitting
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-[#02368c] hover:bg-[#024189]'
                          }
                        `}
                      >
                        {isSubmitting ? 'Saving...' : 'Save & Continue'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Booking Summary (Sticky) */}
            <div className="lg:w-[420px] flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                {service && (
                  <BookingSummary
                    service={{
                      id: service.id,
                      title: service.name,
                      price: selectedPackage?.price || service.basePrice,
                      duration: selectedPackage?.durationEstimate || `${service.duration} min`,
                    }}
                    reviewSteps={reviewSteps}
                    platformFee={booking.platformFee}
                    onCheckout={onCheckout}
                    onChangeStep={handleChangeStep}
                    isDisabled={!selectedAddress}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
