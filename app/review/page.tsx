'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from "@/src/components/layout";
import { ReviewPageHeader, ReviewPageContent, MostBooked } from "@/src/components/sections";
import { BookingConfirmationModal } from "@/src/components/common/BookingConfirmationModal";
import { useBooking } from '@/src/lib/booking-context';
import { useAuth } from '@/src/lib/auth-context';
import { api } from '@/src/lib/api';
import type { Booking, PaymentMethod } from '@/src/lib/types';

export default function ReviewPage() {
  const router = useRouter();
  const { booking, canProceedToReview, clearBooking } = useBooking();
  const { isAuthenticated } = useAuth();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  // Redirect if booking state is invalid
  useEffect(() => {
    if (!canProceedToReview) {
      router.push('/services');
    }
  }, [canProceedToReview, router]);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.setItem('kasazon_redirect_after_login', '/review');
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Fetch payment methods
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await api.payments.getMethods();
        const methods = Array.isArray(response) ? response : response.paymentMethods || [];
        setPaymentMethods(methods);

        // Auto-select default payment method
        const defaultMethod = methods.find(m => m.isDefault);
        if (defaultMethod) {
          setSelectedPaymentMethod(defaultMethod.id);
        } else if (methods.length > 0) {
          setSelectedPaymentMethod(methods[0].id);
        }
      } catch (err) {
        console.error('Error fetching payment methods:', err);
      }
    };

    fetchPaymentMethods();
  }, [isAuthenticated]);

  const handlePay = async () => {
    if (!booking.service || !booking.selectedDate || !booking.selectedTime || !booking.selectedAddress) {
      alert('Booking information is incomplete');
      return;
    }

    // For now, allow proceeding without payment method (can add later or use wallet)
    // if (!selectedPaymentMethod) {
    //   alert('Please select a payment method');
    //   return;
    // }

    setIsProcessing(true);

    try {
      // Create booking
      const newBooking = await api.bookings.create({
        serviceId: booking.service.id,
        packageId: booking.selectedPackage?.id,
        addressId: booking.selectedAddress.id,
        scheduledDate: booking.selectedDate,
        scheduledTimeStart: booking.selectedTime, // Already in HH:mm format
        issueDescription: booking.notes || undefined,
      });

      // If payment method selected, process payment
      if (selectedPaymentMethod) {
        try {
          await api.payments.checkout(newBooking.id, selectedPaymentMethod);
        } catch (err) {
          console.error('Payment failed:', err);
          alert('Booking created but payment failed. You can pay later from your bookings page.');
        }
      }

      setCreatedBooking(newBooking);
      setShowConfirmation(true);

      // Clear booking context
      clearBooking();
    } catch (err) {
      console.error('Error creating booking:', err);
      alert(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddService = (serviceId: string) => {
    router.push(`/services/${serviceId}`);
  };

  const handleCall = () => {
    console.log('Call provider');
    alert('Call functionality coming soon!');
  };

  const handleChat = () => {
    console.log('Open chat');
    alert('Chat functionality coming soon!');
  };

  const handleTrackBooking = () => {
    if (createdBooking) {
      router.push(`/bookings/${createdBooking.id}`);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleViewBooking = () => {
    if (createdBooking) {
      router.push(`/bookings/${createdBooking.id}`);
    } else {
      router.push('/bookings');
    }
  };

  const mostBookedServices = [
    {
      id: '1',
      title: 'Home Cleaning',
      image: '/images/service-1.png',
      rating: 4.8,
      reviewCount: 168,
      startingPrice: 40,
    },
    {
      id: '2',
      title: 'Home Cleaning',
      image: '/images/service-2.png',
      rating: 4.8,
      reviewCount: 168,
      startingPrice: 40,
    },
    {
      id: '3',
      title: 'Home Cleaning',
      image: '/images/service-3.png',
      rating: 4.8,
      reviewCount: 168,
      startingPrice: 40,
    },
    {
      id: '4',
      title: 'Home Cleaning',
      image: '/images/service-4.png',
      rating: 4.8,
      reviewCount: 168,
      startingPrice: 40,
    },
  ];

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
        <ReviewPageHeader
          title="Review Your Booking"
          description="Check your service details before proceeding to payment."
        />
        <ReviewPageContent
          booking={booking}
          paymentMethods={paymentMethods}
          selectedPaymentMethod={selectedPaymentMethod}
          onPaymentMethodSelect={setSelectedPaymentMethod}
          onPay={handlePay}
          isProcessing={isProcessing}
        />
        <MostBooked services={mostBookedServices} onAddService={handleAddService} />
      </main>
      <Footer />

      {/* Booking Confirmation Modal */}
      {createdBooking && (
        <BookingConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          serviceTitle={booking.service?.name || 'Service'}
          provider={{
            name: createdBooking.vendorName,
            avatar: "/images/provider-avatar.png",
            rating: 4.9,
            specialty: booking.service?.categoryName || 'Professional',
            distance: "Nearby",
          }}
          dateTime={`${new Date(booking.selectedDate!).toLocaleDateString()} at ${booking.selectedTime}`}
          location={booking.selectedAddress?.label || 'Selected address'}
          onCall={handleCall}
          onChat={handleChat}
          onTrackBooking={handleTrackBooking}
          onBackToHome={handleBackToHome}
          onViewBooking={handleViewBooking}
        />
      )}
    </div>
  );
}
