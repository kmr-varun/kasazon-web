"use client";

import { VendorSidebar } from "@/src/components/vendor/VendorSidebar";
import { VendorHeader } from "@/src/components/vendor/VendorHeader";
import { VendorAuthWrapper } from "@/src/components/vendor/VendorAuthWrapper";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VendorAuthWrapper>
      <div className="min-h-screen bg-[#f9fafb]">
        <VendorSidebar />
        <VendorHeader />
        <main className="ml-[248px] pt-[96px]">
          <div className="px-8 py-10">{children}</div>
        </main>
      </div>
    </VendorAuthWrapper>
  );
}
