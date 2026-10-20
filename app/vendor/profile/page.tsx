"use client";

import { useMemo, useState, useEffect } from "react";
import { VendorProfile } from "@/src/components/vendor";
import { useVendorProfile } from "@/src/hooks/useVendorApi";
import { api } from "@/src/lib/api";
import type { Address } from "@/src/lib/types";

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

interface Service {
  id: string;
  name: string;
  description: string;
  category: {
    name: string;
  };
}

interface VendorService {
  id: string;
  serviceId: string;
  isAvailable: boolean;
  customPrice: number | null;
}

export default function ProfilePage() {
  const { profile, loading, error, refetch } = useVendorProfile();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [editForm, setEditForm] = useState({
    fullName: '',
    title: '',
    bio: '',
    dateOfBirth: '',
    gender: '',
    experienceYears: 0,
    guarantorName: '',
    guarantorRelationship: '',
    guarantorPhone: '',
    guarantorOccupation: '',
    guarantorIdNumber: '',
  });

  // Fetch user addresses and all services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [addressResponse, servicesResponse] = await Promise.all([
          api.addresses.list(),
          api.services.getAll(),
        ]);
        setAddresses(addressResponse.addresses || []);
        setAllServices(servicesResponse || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    if (profile) {
      fetchData();
      // Initialize edit form with current profile data
      setEditForm({
        fullName: profile.user?.fullName || '',
        title: profile.title || '',
        bio: profile.bio || '',
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
        gender: profile.gender || '',
        experienceYears: profile.experienceYears || 0,
        guarantorName: profile.guarantorName || '',
        guarantorRelationship: profile.guarantorRelationship || '',
        guarantorPhone: profile.guarantorPhone || '',
        guarantorOccupation: profile.guarantorOccupation || '',
        guarantorIdNumber: profile.guarantorIdNumber || '',
      });

      // Initialize selected services
      const currentServices = (profile.services || []).map((s: any) => s.serviceId);
      setSelectedServices(currentServices);
    }
  }, [profile]);

  // Get default address or first address
  const defaultAddress = useMemo(() => {
    const defAddr = addresses.find(a => a.isDefault);
    return defAddr || addresses[0];
  }, [addresses]);

  // Transform profile data for VendorProfile component
  const profileData = useMemo(() => {
    if (!profile) return undefined;

    const user = profile.user;
    const rating = parseFloat(profile.overallRating) || 0;

    // Transform rating breakdown to component format
    const ratingBreakdownArray = profile.ratingBreakdown ? [
      { stars: 5, count: profile.ratingBreakdown.fiveStarCount || 0 },
      { stars: 4, count: profile.ratingBreakdown.fourStarCount || 0 },
      { stars: 3, count: profile.ratingBreakdown.threeStarCount || 0 },
      { stars: 2, count: profile.ratingBreakdown.twoStarCount || 0 },
      { stars: 1, count: profile.ratingBreakdown.oneStarCount || 0 },
    ] : [];

    // Check if approved
    const isApproved = profile.verificationStatus === "APPROVED";

    // Format address
    const addressString = defaultAddress
      ? `${defaultAddress.city}, ${defaultAddress.state}, ${defaultAddress.country}`
      : "";

    return {
      name: user?.fullName || "Vendor",
      avatar: user?.avatarUrl || undefined,
      title: profile.title || "Service Professional",
      location: defaultAddress?.city || "Ghana",
      rating: rating,
      reviewCount: profile.totalReviews || 0,
      profileStrength: profile.profileStrength || 0,
      profileTip: !isApproved
        ? "Complete your verification to increase your profile strength."
        : "Upload workshop photos to achieve 100% Top-Pro status.",
      personalInfo: {
        fullName: user?.fullName || "",
        phoneNumber: user?.phone || "",
        email: user?.email || "",
        emailVerified: user?.emailVerified || false,
        dateOfBirth: profile.dateOfBirth
          ? new Date(profile.dateOfBirth).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "",
        gender: profile.gender || "",
        experience: profile.experienceYears
          ? `${profile.experienceYears}+`
          : "0",
        address: addressString,
      },
      certifications: [
        {
          id: "1",
          name: "National Identity Card",
          status: isApproved ? "verified" as const : "pending" as const,
          uploadedAt: "Recent",
          icon: "id" as const,
        },
        {
          id: "2",
          name: "Proof of Address",
          status: isApproved ? "verified" as const : "pending" as const,
          uploadedAt: "Recent",
          icon: "home" as const,
        },
        {
          id: "3",
          name: "Background Check",
          status: isApproved ? "verified" as const : "pending" as const,
          uploadedAt: "Recent",
          icon: "shield" as const,
        },
      ],
      overallRating: rating,
      positiveFeedbackPercent: calculateRecommendationRate(profile.ratingBreakdown),
      ratingBreakdown: ratingBreakdownArray,
    };
  }, [profile]);

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('kasazon_access_token') : null;

      if (!token) {
        alert('Not authenticated');
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

      // Update vendor profile
      const response = await fetch(`${API_URL}/vendor/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editForm.title || undefined,
          bio: editForm.bio || undefined,
          dateOfBirth: editForm.dateOfBirth || undefined,
          gender: editForm.gender || undefined,
          experienceYears: editForm.experienceYears > 0 ? editForm.experienceYears : undefined,
          guarantorName: editForm.guarantorName || undefined,
          guarantorRelationship: editForm.guarantorRelationship || undefined,
          guarantorPhone: editForm.guarantorPhone || undefined,
          guarantorOccupation: editForm.guarantorOccupation || undefined,
          guarantorIdNumber: editForm.guarantorIdNumber || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update profile');
      }

      // Refresh profile data
      await refetch();
      setShowEditModal(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  const handleVerifyEmail = () => {
    console.log("Verify email");
    alert("Email verification coming soon!");
  };

  const handleRenewCertification = (certId: string) => {
    console.log("Renew certification:", certId);
    alert("Certification renewal coming soon!");
  };

  const handleManageServices = () => {
    setShowServicesModal(true);
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSaveServices = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('kasazon_access_token') : null;

      if (!token) {
        alert('Not authenticated');
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

      // Get current vendor profile ID
      const profileId = profile?.id;
      if (!profileId) {
        alert('Profile not found');
        return;
      }

      // Get currently assigned services
      const currentServices = (profile?.services || []).map((s: any) => s.serviceId);

      // Determine which to add and which to remove
      const toAdd = selectedServices.filter(id => !currentServices.includes(id));
      const toRemove = currentServices.filter((id: string) => !selectedServices.includes(id));

      // Add new services
      for (const serviceId of toAdd) {
        await fetch(`${API_URL}/vendor/services`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            serviceId,
            isAvailable: true,
          }),
        });
      }

      // Remove unselected services
      const currentVendorServices = profile?.services || [];
      for (const serviceId of toRemove) {
        const vendorService = currentVendorServices.find((s: any) => s.serviceId === serviceId);
        if (vendorService) {
          await fetch(`${API_URL}/vendor/services/${vendorService.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
        }
      }

      // Refresh profile data
      await refetch();
      setShowServicesModal(false);
      alert('Services updated successfully!');
    } catch (err) {
      console.error('Failed to update services:', err);
      alert(err instanceof Error ? err.message : 'Failed to update services');
    }
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
    <>
      <VendorProfile
        profile={profileData}
        onEditProfile={handleEditProfile}
        onVerifyEmail={handleVerifyEmail}
        onRenewCertification={handleRenewCertification}
      />

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-2xl font-semibold text-[#0f172a]">Edit Profile</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#0f172a] border-b border-gray-200 pb-2">Personal Information</h3>

                {/* Full Name - Read Only */}
                <div>
                  <label className="block text-sm font-medium text-[#64748b] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.fullName}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Contact support to change your name</p>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-[#64748b] mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={editForm.dateOfBirth}
                    onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] focus:border-transparent outline-none"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-[#64748b] mb-2">
                    Gender
                  </label>
                  <select
                    value={editForm.gender}
                    onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] focus:border-transparent outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Professional Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#0f172a] border-b border-gray-200 pb-2">Professional Information</h3>

                {/* Professional Title */}
                <div>
                  <label className="block text-sm font-medium text-[#64748b] mb-2">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="e.g., Master Electrician, AC Specialist"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] focus:border-transparent outline-none"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-[#64748b] mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Tell customers about your experience and expertise..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] focus:border-transparent outline-none resize-none"
                  />
                </div>

                {/* Experience Years */}
                <div>
                  <label className="block text-sm font-medium text-[#64748b] mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={editForm.experienceYears}
                    onChange={(e) => setEditForm({ ...editForm, experienceYears: parseInt(e.target.value) || 0 })}
                    min="0"
                    max="50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Guarantor Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#0f172a] border-b border-gray-200 pb-2">Guarantor Information</h3>

                {/* Guarantor Name */}
                <div>
                  <label className="block text-sm font-medium text-[#64748b] mb-2">
                    Guarantor Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.guarantorName}
                    onChange={(e) => setEditForm({ ...editForm, guarantorName: e.target.value })}
                    placeholder="Guarantor's full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] focus:border-transparent outline-none"
                  />
                </div>

                {/* Guarantor Relationship */}
                <div>
                  <label className="block text-sm font-medium text-[#64748b] mb-2">
                    Relationship to You
                  </label>
                  <input
                    type="text"
                    value={editForm.guarantorRelationship}
                    onChange={(e) => setEditForm({ ...editForm, guarantorRelationship: e.target.value })}
                    placeholder="e.g., Uncle, Brother, Friend"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] focus:border-transparent outline-none"
                  />
                </div>

                {/* Guarantor Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#64748b] mb-2">
                    Guarantor Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editForm.guarantorPhone}
                    onChange={(e) => setEditForm({ ...editForm, guarantorPhone: e.target.value })}
                    placeholder="+233XXXXXXXXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] focus:border-transparent outline-none"
                  />
                </div>

                {/* Guarantor Occupation */}
                <div>
                  <label className="block text-sm font-medium text-[#64748b] mb-2">
                    Guarantor Occupation
                  </label>
                  <input
                    type="text"
                    value={editForm.guarantorOccupation}
                    onChange={(e) => setEditForm({ ...editForm, guarantorOccupation: e.target.value })}
                    placeholder="Guarantor's occupation"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] focus:border-transparent outline-none"
                  />
                </div>

                {/* Guarantor ID Number */}
                <div>
                  <label className="block text-sm font-medium text-[#64748b] mb-2">
                    Guarantor ID Number
                  </label>
                  <input
                    type="text"
                    value={editForm.guarantorIdNumber}
                    onChange={(e) => setEditForm({ ...editForm, guarantorIdNumber: e.target.value })}
                    placeholder="Guarantor's ID number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02368c] focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 px-4 py-3 bg-[#02368c] text-white rounded-lg hover:bg-[#024189] transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Services Modal */}
      {showServicesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowServicesModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-2xl font-semibold text-[#0f172a]">Manage Professional Services</h2>
              <p className="text-sm text-gray-600 mt-1">Select the services you offer to customers</p>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {allServices.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleToggleService(service.id)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#02368c] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <div className="flex-shrink-0 mt-1">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#02368c] border-[#02368c]'
                                : 'border-gray-300'
                            }`}
                          >
                            {isSelected && (
                              <svg
                                width="12"
                                height="10"
                                viewBox="0 0 12 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 5L4.5 8.5L11 1.5"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        {/* Service Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#0f172a] mb-1">
                            {service.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {service.description}
                          </p>
                          <span className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                            {service.category.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {allServices.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No services available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowServicesModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveServices}
                className="flex-1 px-4 py-3 bg-[#02368c] text-white rounded-lg hover:bg-[#024189] transition-colors font-medium"
              >
                Save Services ({selectedServices.length} selected)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating "Manage Services" Button */}
      <button
        onClick={handleManageServices}
        className="fixed bottom-6 right-6 bg-[#02368c] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#024189] transition-all hover:shadow-xl flex items-center gap-2 font-medium"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 5V15M5 10H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Manage Services
      </button>
    </>
  );
}

// Helper function to calculate recommendation rate
function calculateRecommendationRate(breakdown?: {
  oneStarCount: number;
  twoStarCount: number;
  threeStarCount: number;
  fourStarCount: number;
  fiveStarCount: number;
} | null): number {
  if (!breakdown) return 0;

  const total =
    breakdown.oneStarCount +
    breakdown.twoStarCount +
    breakdown.threeStarCount +
    breakdown.fourStarCount +
    breakdown.fiveStarCount;

  if (total === 0) return 0;

  const positive = breakdown.fourStarCount + breakdown.fiveStarCount;
  return Math.round((positive / total) * 100);
}
