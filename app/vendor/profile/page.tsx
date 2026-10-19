"use client";

import { useMemo } from "react";
import { VendorProfile } from "@/src/components/vendor";
import { useVendorProfile } from "@/src/hooks/useVendorApi";

// Loading skeleton
function ProfileSkeleton() {
  return (
    <div className="max-w-[1128px] space-y-6 animate-pulse">
      <div className="h-48 bg-gray-200 rounded-xl" />
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="h-48 bg-gray-200 rounded-xl" />
        </div>
        <div className="space-y-6">
          <div className="h-32 bg-gray-200 rounded-xl" />
          <div className="h-48 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { profile, loading, error, refetch } = useVendorProfile();

  // Transform profile data for VendorProfile component
  const profileData = useMemo(() => {
    if (!profile) return undefined;

    const user = profile.user;
    const ratingBreakdown = profile.ratingBreakdown || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    // Transform rating breakdown to component format
    const ratingBreakdownArray = [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: ratingBreakdown[stars as keyof typeof ratingBreakdown] || 0,
    }));

    return {
      name: user?.fullName || "Vendor",
      avatar: user?.avatarUrl,
      title: profile.title || "Service Professional",
      location: "Ghana", // Would need to fetch from user addresses
      rating: profile.rating || 0,
      reviewCount: profile.totalReviews || 0,
      profileStrength: calculateProfileStrength(profile),
      profileTip: profile.verificationStatus !== "approved"
        ? "Complete your verification to increase your profile strength."
        : "Upload workshop photos to achieve 100% Top-Pro status.",
      personalInfo: {
        fullName: user?.fullName || "",
        phoneNumber: user?.phoneNumber || "",
        email: user?.email || "",
        emailVerified: user?.emailVerified || false,
        dateOfBirth: user?.dateOfBirth
          ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "",
        gender: user?.gender || "",
        experience: profile.yearsOfExperience
          ? `${profile.yearsOfExperience}+`
          : "0",
        address: "", // Would need to fetch from user addresses
      },
      certifications: [
        {
          id: "1",
          name: "National Identity Card",
          status: profile.verificationStatus === "approved" ? "verified" as const : "pending" as const,
          uploadedAt: "Recent",
          icon: "id" as const,
        },
        {
          id: "2",
          name: "Proof of Address",
          status: profile.verificationStatus === "approved" ? "verified" as const : "pending" as const,
          uploadedAt: "Recent",
          icon: "home" as const,
        },
        {
          id: "3",
          name: "Background Check",
          status: profile.verificationStatus === "approved" ? "verified" as const : "pending" as const,
          uploadedAt: "Recent",
          icon: "shield" as const,
        },
      ],
      overallRating: profile.rating || 0,
      positiveFeedbackPercent: calculateRecommendationRate(profile.ratingBreakdown),
      ratingBreakdown: ratingBreakdownArray,
    };
  }, [profile]);

  const handleEditProfile = () => {
    console.log("Edit profile");
    // Would open edit modal or navigate to edit page
  };

  const handleVerifyEmail = () => {
    console.log("Verify email");
    // Would trigger email verification flow
  };

  const handleRenewCertification = (certId: string) => {
    console.log("Renew certification:", certId);
    // Would open certification renewal flow
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-[1128px]">
        <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-6 text-center">
          <p className="text-[#dc2626] text-[14px] mb-4">{error.message}</p>
          <button
            onClick={refetch}
            className="bg-[#02368c] text-white px-4 py-2 rounded-lg text-[12px]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <VendorProfile
      profile={profileData}
      onEditProfile={handleEditProfile}
      onVerifyEmail={handleVerifyEmail}
      onRenewCertification={handleRenewCertification}
    />
  );
}

// Helper function to calculate profile strength
function calculateProfileStrength(profile: {
  user?: { fullName?: string; email?: string; phoneNumber?: string; avatarUrl?: string };
  bio?: string;
  verificationStatus?: string;
  services?: unknown[];
}): number {
  let strength = 0;
  const checks = [
    profile.user?.fullName,
    profile.user?.email,
    profile.user?.phoneNumber,
    profile.user?.avatarUrl,
    profile.bio,
    profile.verificationStatus === "approved",
    (profile.services?.length || 0) > 0,
  ];

  checks.forEach((check) => {
    if (check) strength += 100 / checks.length;
  });

  return Math.round(strength);
}

// Helper function to calculate recommendation rate
function calculateRecommendationRate(breakdown?: Record<number, number>): number {
  if (!breakdown) return 0;

  const total = Object.values(breakdown).reduce((sum, count) => sum + count, 0);
  if (total === 0) return 0;

  const positive = (breakdown[4] || 0) + (breakdown[5] || 0);
  return Math.round((positive / total) * 100);
}
