'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from "@/src/components/layout";
import { AddressPageHeader, AddressPageContent } from "@/src/components/sections";
import { useBooking } from '@/src/lib/booking-context';
import { useAuth } from '@/src/lib/auth-context';
import { api } from '@/src/lib/api';
import type { Address } from '@/src/lib/types';

export default function AddressPage() {
  const router = useRouter();
  const { booking, setAddress, canProceedToAddress } = useBooking();
  const { isAuthenticated } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect if booking state is invalid
  useEffect(() => {
    if (!canProceedToAddress) {
      router.push('/services');
    }
  }, [canProceedToAddress, router]);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.setItem('kasazon_redirect_after_login', '/address');
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        setError(null);
        const { addresses: fetchedAddresses } = await api.addresses.list();
        setAddresses(fetchedAddresses);
      } catch (err) {
        console.error('Error fetching addresses:', err);
        setError(err instanceof Error ? err.message : 'Failed to load addresses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [isAuthenticated]);

  const handleAddressSelect = async (address: Address) => {
    // Save to booking context
    setAddress(address);

    // Navigate to review page
    router.push('/review');
  };

  const handleAddAddress = async (newAddress: Omit<Address, 'id'>) => {
    try {
      const addressData = {
        ...newAddress,
        latitude: newAddress.latitude ?? undefined,
        longitude: newAddress.longitude ?? undefined,
        additionalInfo: newAddress.additionalInfo ?? undefined,
      };
      const createdAddress = await api.addresses.create(addressData);
      setAddresses(prev => [...prev, createdAddress]);

      // Auto-select the newly created address
      setAddress(createdAddress);

      // Navigate to review page
      router.push('/review');
    } catch (err) {
      console.error('Error creating address:', err);
      alert(err instanceof Error ? err.message : 'Failed to create address');
    }
  };

  const handleCheckout = () => {
    if (!booking.selectedAddress) {
      alert('Please select an address first');
      return;
    }
    router.push('/review');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#02368c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-poppins text-lg text-[#64748b]">Loading addresses...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <AddressPageHeader
          title="Where should we provide the service?"
          description="Select a saved address or add a new address for your service."
        />
        <AddressPageContent
          addresses={addresses}
          selectedAddress={booking.selectedAddress}
          service={booking.service}
          selectedPackage={booking.selectedPackage}
          booking={booking}
          onAddressSelect={handleAddressSelect}
          onAddAddress={handleAddAddress}
          onCheckout={handleCheckout}
        />
      </main>
      <Footer />
    </div>
  );
}
