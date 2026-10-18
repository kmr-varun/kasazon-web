'use client';

import { useState } from 'react';
import { Header, Footer } from "@/src/components/layout";
import { ReviewPageHeader, ReviewPageContent, MostBooked } from "@/src/components/sections";
import { BookingConfirmationModal } from "@/src/components/common/BookingConfirmationModal";

export default function ReviewPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePay = () => {
    console.log('Processing payment');
    // TODO: Process payment
    // Show confirmation modal after successful payment
    setShowConfirmation(true);
  };

  const handleAddService = (serviceId: string) => {
    console.log('Add service:', serviceId);
    // TODO: Add service to cart
  };

  const handleCall = () => {
    console.log('Call provider');
    // TODO: Initiate call
  };

  const handleChat = () => {
    console.log('Open chat');
    // TODO: Open chat with provider
  };

  const handleTrackBooking = () => {
    console.log('Track booking');
    // TODO: Navigate to tracking page
  };

  const handleBackToHome = () => {
    console.log('Back to home');
    // TODO: Navigate to home page
    window.location.href = '/';
  };

  const handleViewBooking = () => {
    console.log('View booking');
    // TODO: Navigate to booking details page
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ReviewPageHeader
          title="Review Your Booking"
          description="Check your service details before proceeding to payment."
        />
        <ReviewPageContent
          onPay={handlePay}
        />
        <MostBooked services={mostBookedServices} onAddService={handleAddService} />
      </main>
      <Footer />

      {/* Booking Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        serviceTitle="Home Cleaning"
        provider={{
          name: "Yaw Boateng",
          avatar: "/images/provider-avatar.png",
          rating: 4.9,
          specialty: "AC Servicing",
          distance: "2.3 km away",
        }}
        dateTime="Today, 2:00 PM – 4:00 PM"
        location="East Legon, Accra"
        onCall={handleCall}
        onChat={handleChat}
        onTrackBooking={handleTrackBooking}
        onBackToHome={handleBackToHome}
        onViewBooking={handleViewBooking}
      />
    </div>
  );
}
