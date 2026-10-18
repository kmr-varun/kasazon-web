'use client';

import { Header, Footer } from "@/src/components/layout";
import { TimeSlotPageHeader, TimeSlotPageContent } from "@/src/components/sections";

export default function TimeSlotsPage() {
  const handleContinue = () => {
    console.log('Continue to next step');
    // TODO: Navigate to next step (review/checkout)
  };

  const handleCheckout = () => {
    console.log('Proceed to checkout');
    // TODO: Navigate to checkout page
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <TimeSlotPageHeader
          title="Choose Your Service Time"
          description="Select a convenient 2-hour appointment window for your certified AC technician."
        />
        <TimeSlotPageContent
          onContinue={handleContinue}
          onCheckout={handleCheckout}
        />
      </main>
      <Footer />
    </div>
  );
}
