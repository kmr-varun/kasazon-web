"use client";

import Image from "next/image";

const LocationPinIcon = () => (
  <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0C2.69 0 0 2.69 0 6C0 10.5 6 15 6 15C6 15 12 10.5 12 6C12 2.69 9.31 0 6 0ZM6 8.25C4.76 8.25 3.75 7.24 3.75 6C3.75 4.76 4.76 3.75 6 3.75C7.24 3.75 8.25 4.76 8.25 6C8.25 7.24 7.24 8.25 6 8.25Z" fill="#424655"/>
  </svg>
);

const StarIcon = ({ filled = true, size = 15 }: { filled?: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z" fill={filled ? "#F59E0B" : "#EAEDFF"}/>
  </svg>
);

const ProfileStrengthIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 0C3.8 0 0 3.8 0 8.5C0 13.2 3.8 17 8.5 17C13.2 17 17 13.2 17 8.5C17 3.8 13.2 0 8.5 0ZM8.5 15.3C4.7 15.3 1.7 12.3 1.7 8.5C1.7 4.7 4.7 1.7 8.5 1.7C12.3 1.7 15.3 4.7 15.3 8.5C15.3 12.3 12.3 15.3 8.5 15.3Z" fill="#02368C"/>
    <path d="M11.9 5.1L7.65 9.35L5.1 6.8L3.4 8.5L7.65 12.75L13.6 6.8L11.9 5.1Z" fill="#02368C"/>
  </svg>
);

const EditIcon = ({ color = "white" }: { color?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 11.0833V14H2.91667L11.5142 5.4025L8.5975 2.48583L0 11.0833ZM13.7525 3.16417C14.0825 2.83417 14.0825 2.30417 13.7525 1.97417L12.0258 0.2475C11.6958 -0.0825 11.1658 -0.0825 10.8358 0.2475L9.40833 1.675L12.325 4.59167L13.7525 3.16417Z" fill={color}/>
  </svg>
);

const IdCardIcon = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="4" width="25" height="19" rx="2" stroke="#02368C" strokeWidth="1.5"/>
    <circle cx="9" cy="12" r="3" stroke="#02368C" strokeWidth="1.5"/>
    <path d="M5 20C5 17.7909 6.79086 16 9 16C11.2091 16 13 17.7909 13 20" stroke="#02368C" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="16" y1="10" x2="23" y2="10" stroke="#02368C" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="16" y1="14" x2="21" y2="14" stroke="#02368C" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 3L2 12H5V25H12V17H17V25H24V12H27L14.5 3Z" stroke="#02368C" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const CertificateIcon = () => (
  <svg width="21" height="33" viewBox="0 0 21 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="19" height="25" rx="2" stroke="#02368C" strokeWidth="1.5"/>
    <line x1="5" y1="8" x2="16" y2="8" stroke="#02368C" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="5" y1="13" x2="16" y2="13" stroke="#02368C" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="5" y1="18" x2="12" y2="18" stroke="#02368C" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="14.5" cy="26" r="5.5" fill="white" stroke="#02368C" strokeWidth="1.5"/>
    <path d="M12 26L14 28L17 24" stroke="#02368C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="21" height="33" viewBox="0 0 21 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 2L2 6V14C2 21 10.5 28 10.5 28C10.5 28 19 21 19 14V6L10.5 2Z" stroke="#02368C" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M7 15L10 18L15 12" stroke="#02368C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PeopleIcon = () => (
  <svg width="29" height="33" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="8" r="4" stroke="#02368C" strokeWidth="1.5"/>
    <path d="M2 22C2 18.134 5.13401 15 9 15H11C14.866 15 18 18.134 18 22V24H2V22Z" stroke="#02368C" strokeWidth="1.5"/>
    <circle cx="20" cy="10" r="3" stroke="#02368C" strokeWidth="1.5"/>
    <path d="M22 24V22C22 19.5 20.5 17.5 18 16.5" stroke="#02368C" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ThumbsUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 5.5V11H1V5.5H3.5ZM5 5.5L6.5 1C7.33 1 8 1.67 8 2.5V4H10.5C11.33 4 12 4.67 12 5.5L10.5 10C10.33 10.67 9.83 11 9.17 11H5V5.5Z" fill="#004BC5"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 8L10.5 13L15 8" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface PersonalInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  emailVerified: boolean;
  dateOfBirth: string;
  gender: string;
  experience: string;
  country?: string;
  city?: string;
  address: string;
}

interface Certification {
  id: string;
  name: string;
  status: "verified" | "expiring" | "expired" | "pending";
  uploadedAt?: string;
  expiresIn?: string;
  details?: string;
  icon: "id" | "home" | "certificate" | "shield" | "people";
}

interface RatingBreakdown {
  stars: number;
  count: number;
}

export interface VendorProfileData {
  name: string;
  avatar?: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  profileStrength: number;
  profileTip: string;
  personalInfo: PersonalInfo;
  certifications: Certification[];
  overallRating: number;
  positiveFeedbackPercent: number;
  ratingBreakdown: RatingBreakdown[];
}

interface VendorProfileProps {
  profile?: VendorProfileData;
  onEditProfile?: () => void;
  onVerifyEmail?: () => void;
  onRenewCertification?: (certId: string) => void;
}

const defaultProfile: VendorProfileData = {
  name: "Yaw Boateng",
  title: "AC Technician & HVAC Specialist",
  location: "Accra, Greater Accra Region",
  rating: 4.5,
  reviewCount: 124,
  profileStrength: 90,
  profileTip: "Upload workshop photos to achieve 100% Top-Pro status.",
  personalInfo: {
    fullName: "Leo Boateng",
    phoneNumber: "+233 5678905643",
    email: "leo@hmail.com",
    emailVerified: false,
    dateOfBirth: "04/01/1998",
    gender: "Female",
    experience: "6+",
    address: "Flat 402, Sunshine Residency\nMG Road, Sector 12\nGurugram, Haryana – 122001",
  },
  certifications: [
    {
      id: "1",
      name: "National Identity Card",
      status: "verified",
      uploadedAt: "2 months ago",
      icon: "id",
    },
    {
      id: "2",
      name: "Proof of Address",
      status: "verified",
      uploadedAt: "2 months ago",
      icon: "home",
    },
    {
      id: "3",
      name: "Trade Certificate",
      status: "verified",
      uploadedAt: "2 months ago",
      details: "Electrician — NVTI Certified",
      icon: "certificate",
    },
    {
      id: "4",
      name: "Police Clearance",
      status: "expiring",
      expiresIn: "15 days",
      icon: "shield",
    },
    {
      id: "5",
      name: "Guarantor Details",
      status: "verified",
      details: "Kwame's Uncle — Ama Boateng",
      icon: "people",
    },
  ],
  overallRating: 4.9,
  positiveFeedbackPercent: 99.2,
  ratingBreakdown: [
    { stars: 5, count: 108 },
    { stars: 4, count: 12 },
    { stars: 3, count: 3 },
    { stars: 2, count: 0 },
    { stars: 1, count: 1 },
  ],
};

const CertificationIcon = ({ type }: { type: Certification["icon"] }) => {
  switch (type) {
    case "id":
      return <IdCardIcon />;
    case "home":
      return <HomeIcon />;
    case "certificate":
      return <CertificateIcon />;
    case "shield":
      return <ShieldIcon />;
    case "people":
      return <PeopleIcon />;
    default:
      return <IdCardIcon />;
  }
};

export function VendorProfile({
  profile = defaultProfile,
  onEditProfile,
  onVerifyEmail,
  onRenewCertification,
}: VendorProfileProps) {
  const totalRatings = profile.ratingBreakdown.reduce((sum, r) => sum + r.count, 0);
  const maxCount = Math.max(...profile.ratingBreakdown.map((r) => r.count));

  return (
    <div className="flex flex-col gap-8 px-8 py-10">
      {/* Page Header */}
      <h1
        className="text-[30px] font-medium text-[#111827] leading-[1.2]"
        style={{ fontFamily: "Roboto Flex, sans-serif" }}
      >
        Profile
      </h1>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Profile Hero Card */}
        <div className="bg-white rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6 mb-3 relative overflow-hidden">
          {/* Decorative blur */}
          <div className="absolute -right-[151px] -top-[76px] w-[320px] h-[320px] rounded-full bg-[rgba(0,75,197,0.05)] blur-[32px]" />

          <div className="relative flex items-center justify-between h-32">
            {/* User Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-28 h-28 rounded-full shadow-[0px_0px_0px_4px_white,0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden bg-gray-200 flex-shrink-0">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#8B7355] to-[#6B5344] flex items-center justify-center">
                    <span className="text-white text-3xl font-medium">
                      {profile.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="flex flex-col">
                <h2
                  className="text-[24px] font-medium text-[#131b2e] tracking-[-0.6px] pb-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {profile.name}
                </h2>
                <div className="flex flex-col gap-1 pb-1">
                  <span
                    className="text-[14px] font-medium text-[#02368c]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {profile.title}
                  </span>
                  <div className="flex items-center gap-1">
                    <LocationPinIcon />
                    <span
                      className="text-[14px] text-[#424655]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {profile.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  <StarIcon size={15} />
                  <span
                    className="text-[14px] text-[#131b2e]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {profile.rating}
                  </span>
                  <span
                    className="text-[14px] text-[#575f69]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    ({profile.reviewCount} verified reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Strength & Actions */}
            <div className="flex items-center gap-6 pl-6">
              {/* Profile Strength Card */}
              <div className="bg-[#f2f3ff] rounded-lg p-4 min-w-[260px]">
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-1">
                    <ProfileStrengthIcon />
                    <span
                      className="text-[14px] font-medium text-[#131b2e]"
                      style={{ fontFamily: "Roboto Flex, sans-serif" }}
                    >
                      Profile Strength
                    </span>
                  </div>
                  <span
                    className="text-[14px] font-medium text-[#02368c]"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    {profile.profileStrength}%
                  </span>
                </div>
                <div className="pb-2">
                  <div className="h-2 bg-[#eaedff] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#02368c] rounded-full"
                      style={{ width: `${profile.profileStrength}%` }}
                    />
                  </div>
                </div>
                <p
                  className="text-[12px] text-[#777]"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  {profile.profileTip}
                </p>
              </div>

              {/* Edit Profile Button */}
              <button
                onClick={onEditProfile}
                className="bg-[#02368c] text-white px-5 py-2.5 rounded-lg flex items-center gap-1 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]"
              >
                <EditIcon />
                <span
                  className="text-[14px] tracking-[0.14px]"
                  style={{ fontFamily: "Roboto Condensed, sans-serif" }}
                >
                  Edit Profile
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-3">
          {/* Left Column - Personal Information */}
          <div className="flex-1 bg-white rounded-xl shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] p-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4">
              <div>
                <h3
                  className="text-[20px] font-medium text-[#131b2e]"
                  style={{ fontFamily: "Roboto Condensed, sans-serif" }}
                >
                  Personal Information
                </h3>
                <p
                  className="text-[14px] text-[#575f69]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Private identity verified details
                </p>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={onEditProfile}>
                <EditIcon color="#131b2e" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-[18px]">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Full Name
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3">
                  <span
                    className="text-[13px] text-[#111]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {profile.personalInfo.fullName}
                  </span>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Phone Number
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3">
                  <span
                    className="text-[13px] text-[#111]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {profile.personalInfo.phoneNumber}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Email
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3 flex items-center justify-between">
                  <span
                    className="text-[13px] text-[#111]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {profile.personalInfo.email}
                  </span>
                  {!profile.personalInfo.emailVerified && (
                    <button
                      onClick={onVerifyEmail}
                      className="text-[12px] text-[#02368c] underline"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Date of Birth
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3">
                  <span
                    className="text-[13px] text-[#111]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {profile.personalInfo.dateOfBirth}
                  </span>
                </div>
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Gender
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3">
                  <span
                    className="text-[13px] text-[#111]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {profile.personalInfo.gender}
                  </span>
                </div>
              </div>

              {/* Experience */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Experience
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3">
                  <span
                    className="text-[13px] text-[#111]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {profile.personalInfo.experience}
                  </span>
                </div>
              </div>

              {/* Country */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Country
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3 flex items-center justify-between">
                  <span
                    className="text-[12px] text-[#777]"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    {profile.personalInfo.country || "Choose your country"}
                  </span>
                  <ChevronDownIcon />
                </div>
              </div>

              {/* City */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  City
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-3 flex items-center justify-between">
                  <span
                    className="text-[12px] text-[#777]"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    {profile.personalInfo.city || "Choose your city"}
                  </span>
                  <ChevronDownIcon />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] text-[#111]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Address
                </label>
                <div className="border border-black/12 rounded-lg px-5 py-4 min-h-[71px]">
                  <p
                    className="text-[12px] text-[#777] whitespace-pre-line"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    {profile.personalInfo.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Certifications Card */}
            <div className="bg-white rounded-xl shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] p-6">
              <h3
                className="text-[20px] font-medium text-[#131b2e] pb-4"
                style={{ fontFamily: "Roboto Condensed, sans-serif" }}
              >
                Certifications
              </h3>

              <div className="flex flex-col gap-4">
                {profile.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-[#f5f5f5] rounded-lg p-4 flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <CertificationIcon type={cert.icon} />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-start justify-between">
                        <span
                          className="text-[16px] text-[#111]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {cert.name}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-1 rounded-full ${
                            cert.status === "verified"
                              ? "bg-[rgba(46,158,91,0.1)] text-[#2e9e5b]"
                              : cert.status === "expiring"
                              ? "bg-[rgba(232,155,60,0.1)] text-[#e89b3c]"
                              : "bg-gray-100 text-gray-500"
                          }`}
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {cert.status === "verified"
                            ? "Verified"
                            : cert.status === "expiring"
                            ? "Expiring Soon"
                            : cert.status}
                        </span>
                      </div>
                      <span
                        className="text-[14px] text-[#777]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {cert.uploadedAt
                          ? `Uploaded ${cert.uploadedAt}`
                          : cert.expiresIn
                          ? `Expires in ${cert.expiresIn}`
                          : ""}
                      </span>
                      {cert.details && (
                        <span
                          className="text-[12px] text-[#111] pt-1"
                          style={{ fontFamily: "Roboto Flex, sans-serif" }}
                        >
                          {cert.details}
                        </span>
                      )}
                      {cert.status === "expiring" && (
                        <button
                          onClick={() => onRenewCertification?.(cert.id)}
                          className="bg-[#02368c] text-white text-[12px] px-5 py-2 rounded-lg w-fit mt-2"
                          style={{ fontFamily: "Roboto Flex, sans-serif" }}
                        >
                          Renew Now
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Rating Card */}
            <div className="bg-white rounded-xl border border-[#eff0f1] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] px-6 py-6">
              <h3
                className="text-[18px] font-medium text-[#131b2e] pt-1.5"
                style={{ fontFamily: "Roboto Condensed, sans-serif" }}
              >
                Your Overall Rating
              </h3>

              <div className="pt-2 flex flex-col gap-5">
                {/* Big Score */}
                <div className="flex flex-col items-center pr-4">
                  <span
                    className="text-[32px] font-semibold text-[#131b2e] tracking-[-1.2px] leading-[56px]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {profile.overallRating} / 5.0
                  </span>
                  <div className="flex gap-1 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} size={20} />
                    ))}
                  </div>
                  <div className="pt-3">
                    <div className="bg-[#eaedff] rounded-md px-2.5 py-1 flex items-center gap-1.5">
                      <ThumbsUpIcon />
                      <span
                        className="text-[12px] text-[#004bc5]"
                        style={{ fontFamily: "Roboto Flex, sans-serif" }}
                      >
                        {profile.positiveFeedbackPercent}% Positive Feedback
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="flex flex-col gap-2.5">
                  {profile.ratingBreakdown.map((item) => {
                    const barWidth = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                    const barColor =
                      item.stars >= 4
                        ? "#f59e0b"
                        : item.stars === 3
                        ? "#575f69"
                        : "#ba1a1a";
                    return (
                      <div
                        key={item.stars}
                        className="flex items-center gap-3"
                      >
                        <div className="flex items-center justify-end gap-1 w-12">
                          <span
                            className="text-[14px] font-medium text-[#131b2e]"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {item.stars}
                          </span>
                          <StarIcon size={12} />
                        </div>
                        <div className="flex-1 h-2.5 bg-[#eaedff] rounded-full overflow-hidden">
                          {item.count > 0 && (
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${barWidth}%`,
                                backgroundColor: barColor,
                              }}
                            />
                          )}
                        </div>
                        <span
                          className={`text-[14px] font-medium text-right w-8 ${
                            item.count === 0 ? "text-[#424655]" : "text-[#131b2e]"
                          }`}
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {item.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
