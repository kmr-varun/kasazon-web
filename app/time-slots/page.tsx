'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { Header, Footer } from "@/src/components/layout";
import { TimeSlotPageHeader, TimeSlotPageContent } from "@/src/components/sections";
import { useBooking } from '@/src/lib/booking-context';
import { useAuth } from '@/src/lib/auth-context';

function TimeSlotsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { booking, canProceedToTimeSlots } = useBooking();
  const { isAuthenticated } = useAuth();

  // Redirect if no service selected
  useEffect(() => {
    if (!canProceedToTimeSlots) {
      router.push('/services');
    }
  }, [canProceedToTimeSlots, router]);

  const handleContinue = () => {
    // Check authentication before proceeding
    if (!isAuthenticated) {
      // Store intended destination
      sessionStorage.setItem('kasazon_redirect_after_login', '/address');
      router.push('/login');
      return;
    }

    // Navigate to address selection
    router.push('/address');
  };

  const handleCheckout = () => {
    // Same as continue - go to address selection
    handleContinue();
  };

  if (!booking.service) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#02368c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-poppins text-lg text-[#64748b]">Loading...</p>
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
        <TimeSlotPageHeader
          title="Choose Your Service Time"
          description="Select a convenient appointment window for your certified professional."
        />
        <TimeSlotPageContent
          service={booking.service}
          selectedPackage={booking.selectedPackage}
          onContinue={handleContinue}
          onCheckout={handleCheckout}
        />
      </main>
      <Footer />
    </div>
  );
}

export default function TimeSlotsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#02368c] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </main>
        <Footer />
      </div>
    }>
      <TimeSlotsContent />
    </Suspense>
  );
}
