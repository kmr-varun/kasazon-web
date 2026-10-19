"use client";

import { use } from "react";
import { DisputeDetail, DisputeDetailData } from "@/src/components/vendor";

const mockDispute: DisputeDetailData = {
  id: "1",
  bookingId: "KB-12345",
  serviceName: "AC Servicing",
  serviceCategory: "contract",
  status: "rework-requested",
  location: "East Legon, Greater Accra",
  postalCode: "GA-382-0192",
  bookedDate: "Oct 24, 2024",
  bookedTime: "08:30 GMT",
  customerComplaint: "The AC still makes a rattling noise after the service and the condensate pan is still leaking slightly. I want the provider to return and complete the final performance check and drainage flush again.",
  requestedRework: "Re-inspect the blower wheel, tighten any loose mounts, and verify zero overflow from the drainage pan.",
  vendorResponse: "",
  afterImages: [
    "/images/vendor/sample-ac-1.jpg",
    "/images/vendor/sample-ac-2.jpg",
    "/images/vendor/sample-ac-3.jpg",
  ],
  categoryType: "AC Servicing",
  serviceDetails: [
    "AC Servicing × 1",
    "Foam-Jet Cleaning",
    "Filter Cleaning",
    "Basic Performance Check",
  ],
  estimatedDate: "Today, Oct 24, 2024",
  estimatedTime: "09:00 - 13:00 GMT",
  estimatedDuration: "4.0 hrs",
  customerIssue: "My AC is not cooling properly and is making a strange noise.",
  evidencePhotos: [
    "/images/vendor/sample-ac-1.jpg",
    "/images/vendor/sample-ac-2.jpg",
    "/images/vendor/sample-ac-3.jpg",
  ],
  serviceAmount: 150,
  platformFee: 5,
  platformFeePercent: 3,
  escrowHeld: 150,
  yourEarnings: 155,
  customerName: "Akua Mensah",
  customerInitials: "AM",
  memberSince: "Feb 2023",
  servicesBooked: 14,
  customerAddress: {
    line1: "Plot 14, Boundary Road",
    line2: "East Legon, Accra",
    postalCode: "GA-382-0192",
  },
  isVerifiedUser: true,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DisputeDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const handleAcceptRework = () => {
    console.log("Accept rework for dispute:", id);
  };

  const handleCallCustomer = () => {
    console.log("Call customer");
  };

  const handleMessageCustomer = () => {
    console.log("Message customer");
  };

  const handleUploadImages = () => {
    console.log("Upload images");
  };

  const handleOpenInMaps = () => {
    console.log("Open in maps");
  };

  return (
    <DisputeDetail
      dispute={mockDispute}
      onAcceptRework={handleAcceptRework}
      onCallCustomer={handleCallCustomer}
      onMessageCustomer={handleMessageCustomer}
      onUploadImages={handleUploadImages}
      onOpenInMaps={handleOpenInMaps}
    />
  );
}
