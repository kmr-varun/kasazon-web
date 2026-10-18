'use client';

import { Header, Footer } from "@/src/components/layout";
import { IssuesPageHeader, IssuesPageContent } from "@/src/components/sections";

export default function IssuesPage() {
  const handleContinue = () => {
    console.log('Continue to next step');
    // TODO: Navigate to next step (schedule/review)
  };

  const handleCheckout = () => {
    console.log('Proceed to checkout');
    // TODO: Navigate to checkout page
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <IssuesPageHeader
          title="Tell Us What's Going On"
          description="Help us understand your AC issue so the professional can arrive prepared with the right tools and equipment."
        />
        <IssuesPageContent
          onContinue={handleContinue}
          onCheckout={handleCheckout}
        />
      </main>
      <Footer />
    </div>
  );
}
