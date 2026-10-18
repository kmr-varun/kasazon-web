'use client';

import { Header, Footer } from "@/src/components/layout";
import { AddressPageHeader, AddressPageContent } from "@/src/components/sections";

export default function AddressPage() {
  const handleSave = () => {
    console.log('Save address');
    // TODO: Save address and navigate to next step
  };

  const handleCheckout = () => {
    console.log('Proceed to checkout');
    // TODO: Navigate to checkout page
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <AddressPageHeader
          title="Where should we provide the service?"
          description="Select a saved address or add a new address for your AC service."
        />
        <AddressPageContent
          onSave={handleSave}
          onCheckout={handleCheckout}
        />
      </main>
      <Footer />
    </div>
  );
}
