'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { countries, documentTypes, type Country, type State, type City } from '@/data/locations';
import { LocationPicker } from '@/components/LocationPicker';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { register, type AccountType as AuthAccountType, getStoredUser } from '@/src/lib/auth';

function RegisterCompleteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accountType = searchParams.get('type') || 'customer';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Get stored data from previous steps
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pendingName = sessionStorage.getItem('kasazon_pending_name') || '';
      const verifiedEmail = sessionStorage.getItem('kasazon_verified_email') || '';
      const verifiedPhone = sessionStorage.getItem('kasazon_verified_phone') || '';

      setFullName(pendingName);
      setEmail(verifiedEmail);
      setPhone(verifiedPhone);

      // Check if user is already registered (came from login flow)
      const storedUser = getStoredUser();
      if (storedUser?.fullName && storedUser?.email) {
        // User is already registered, redirect to home
        router.push('/');
      }
    }
  }, [router]);

  // Redirect professionals to their dedicated page
  useEffect(() => {
    if (accountType === 'professional') {
      router.push(`/register/complete/professional?type=${accountType}`);
    }
  }, [accountType, router]);
  // Location state
  const [searchQuery, setSearchQuery] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [zipCode, setZipCode] = useState('');
  const [addressType, setAddressType] = useState<'home' | 'work' | 'other'>('home');
  const [saveAsDefault, setSaveAsDefault] = useState(false);

  // Dropdown state
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showDocTypeDropdown, setShowDocTypeDropdown] = useState(false);

  // Identity verification state
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Derived data
  const availableStates = useMemo(() => selectedCountry?.states || [], [selectedCountry]);
  const availableCities = useMemo(() => selectedState?.cities || [], [selectedState]);

  const handleLocationSelect = (location: any) => {
    const { address, addressComponents } = location;

    // Set search query
    setSearchQuery(address);

    // Auto-fill address fields
    setAddressLine1(addressComponents.line1 || '');
    setAddressLine2(addressComponents.line2 || '');
    setZipCode(addressComponents.zipCode || '');

    // Try to match country, state, and city from our data
    const matchedCountry = countries.find(
      c => c.name.toLowerCase() === addressComponents.country.toLowerCase()
    );

    if (matchedCountry) {
      setSelectedCountry(matchedCountry);

      const matchedState = matchedCountry.states.find(
        s => s.name.toLowerCase() === addressComponents.state.toLowerCase()
      );

      if (matchedState) {
        setSelectedState(matchedState);

        const matchedCity = matchedState.cities.find(
          c => c.name.toLowerCase() === addressComponents.city.toLowerCase()
        );

        if (matchedCity) {
          setSelectedCity(matchedCity);
        }
      }
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    setShowCountryDropdown(false);
  };

  const handleStateSelect = (state: State) => {
    setSelectedState(state);
    setSelectedCity(null);
    setShowStateDropdown(false);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
  };

  const handleDocTypeSelect = (docTypeId: string) => {
    setSelectedDocType(docTypeId);
    setShowDocTypeDropdown(false);
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!fullName && !email && !phone) {
      setSubmitError('Please complete the previous registration steps first.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Call the register API
      const authAccountType: AuthAccountType = accountType === 'professional' ? 'PROFESSIONAL' : 'CUSTOMER';

      await register({
        fullName: fullName || 'User',
        email: email || undefined,
        phone: phone || undefined,
        accountType: authAccountType,
      });

      // Clear session storage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('kasazon_pending_name');
        sessionStorage.removeItem('kasazon_pending_phone');
        sessionStorage.removeItem('kasazon_verified_email');
        sessionStorage.removeItem('kasazon_verified_phone');
      }

      // Log registration data for future address API integration
      const registrationData = {
        location: {
          searchQuery,
          addressLine1,
          addressLine2,
          country: selectedCountry?.name,
          state: selectedState?.name,
          city: selectedCity?.name,
          zipCode,
          type: addressType,
          isDefault: saveAsDefault,
        },
        identity: {
          documentType: selectedDocType,
          documentFile: selectedFile?.name,
        },
      };
      console.log('Additional registration data (for future address API):', registrationData);

      // Redirect to home or dashboard
      router.push('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const selectedDocTypeName = documentTypes.find(dt => dt.id === selectedDocType)?.name;

  // Close dropdowns when clicking outside
  const closeAllDropdowns = () => {
    setShowCountryDropdown(false);
    setShowStateDropdown(false);
    setShowCityDropdown(false);
    setShowDocTypeDropdown(false);
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-white flex flex-col items-center py-8 sm:py-12 lg:py-24 px-4 sm:px-6"
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName === 'DIV') {
            closeAllDropdowns();
          }
        }}
      >
        <div className="w-full max-w-[680px]">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-14">
          {/* Title */}
          <h1 className="
            font-roboto-condensed font-semibold text-3xl sm:text-4xl lg:text-[40px]
            text-[#0f172a]
            tracking-[-0.65px] leading-tight sm:leading-[35.75px]
            text-center
            px-2
          ">
            Welcome to Kasazon
          </h1>

          {/* Progress Indicator - Step 3 */}
          <div className="flex gap-1 w-full max-w-[437px]">
            <div className="flex-1 h-[10px] bg-[#f2f2f2] rounded-full" />
            <div className="flex-1 h-[10px] bg-[#f2f2f2] rounded-full" />
            <div className="flex-1 h-[10px] bg-[#02368c] rounded-full" />
          </div>

          {/* Description */}
          <p className="
            font-poppins text-sm text-[#64748b]
            leading-normal
            text-center
            max-w-[384px]
            px-4
          ">
            Please fill the details so we get to know you better
          </p>
        </div>

        {/* Main Card */}
        <div className="
          bg-white
          border border-[#dcdcdc]
          rounded-xl sm:rounded-2xl
          px-4 sm:px-8 lg:px-12
          pt-8 sm:pt-12
          pb-6 sm:pb-10
          flex flex-col gap-8 sm:gap-12
        ">
          {/* Form Content */}
          <div className="flex flex-col gap-10">
            {/* PERSONAL INFO Section */}
            <div className="
              border-b border-[rgba(0,0,0,0.2)]
              pb-10
              flex flex-col gap-3.5
            ">
              <h2 className="
                font-rubik text-base text-[#888] uppercase
                leading-[24px]
              ">
                PERSONAL INFO
              </h2>

              <div className="flex flex-col gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="
                    font-rubik text-base text-[#222]
                    leading-[24px]
                  ">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="
                      border border-[#d9d9d9]
                      rounded-lg
                      px-3
                      h-[40px]
                      font-rubik text-base
                      placeholder:text-[rgba(0,0,0,0.25)]
                      text-[#222]
                      leading-[24px]
                      outline-none
                      bg-white
                    "
                  />
                </div>

                {/* Display verified email and phone (read-only) */}
                {(email || phone) && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    {email && (
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="font-rubik text-base text-[#222] leading-[24px]">
                          Email
                        </label>
                        <div className="flex items-center gap-2 px-3 h-[40px] bg-[#f5f5f5] border border-[#d9d9d9] rounded-lg">
                          <span className="font-rubik text-base text-[#222] flex-1 truncate">{email}</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#10b981"/>
                            <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    )}
                    {phone && (
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="font-rubik text-base text-[#222] leading-[24px]">
                          Phone
                        </label>
                        <div className="flex items-center gap-2 px-3 h-[40px] bg-[#f5f5f5] border border-[#d9d9d9] rounded-lg">
                          <span className="font-rubik text-base text-[#222] flex-1 truncate">{phone}</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#10b981"/>
                            <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* LOCATION Section */}
            <div className="
              border-b border-[rgba(0,0,0,0.2)]
              pb-10
              flex flex-col gap-3.5
            ">
              <h2 className="
                font-rubik text-base text-[#888] uppercase
                leading-[24px]
              ">
                LOCATION
              </h2>

              <div className="flex flex-col gap-6">
                {/* Location Search */}
                <LocationPicker onLocationSelect={handleLocationSelect} />

                {/* Address Line 1 */}
                <div className="flex flex-col gap-2">
                  <label className="
                    font-rubik text-base text-[#222]
                    leading-[24px]
                  ">
                    Address Line 1*
                  </label>
                  <textarea
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="Address Line 1"
                    className="
                      border border-[#d9d9d9]
                      rounded-lg
                      px-3 py-2
                      h-[91px]
                      font-rubik text-base
                      placeholder:text-[rgba(0,0,0,0.25)]
                      text-[#222]
                      leading-[24px]
                      outline-none
                      resize-none
                      w-full
                    "
                  />
                </div>

                {/* Address Line 2 */}
                <div className="flex flex-col gap-2">
                  <label className="
                    font-rubik text-base text-[#222]
                    leading-[24px]
                  ">
                    Address Line 2
                  </label>
                  <textarea
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder="Address Line 2 (Optional)"
                    className="
                      border border-[#d9d9d9]
                      rounded-lg
                      px-3 py-2
                      h-[91px]
                      font-rubik text-base
                      placeholder:text-[rgba(0,0,0,0.25)]
                      text-[#222]
                      leading-[24px]
                      outline-none
                      resize-none
                      w-full
                    "
                  />
                </div>

                {/* Country & State */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex flex-col gap-2 relative">
                    <label className="
                      font-rubik text-base text-[#222]
                      leading-[24px]
                    ">
                      Country
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="
                        border border-[#d9d9d9]
                        rounded-lg
                        px-3
                        h-[40px]
                        flex items-center justify-between
                        bg-white
                        hover:border-[#02368c] transition-colors
                      "
                    >
                      <span className={`
                        font-rubik text-base
                        leading-[24px]
                        ${selectedCountry ? 'text-[#222]' : 'text-[rgba(0,0,0,0.25)]'}
                      `}>
                        {selectedCountry?.name || 'Select'}
                      </span>
                      <div className="relative w-[15px] h-[12px]">
                        <Image
                          src="/images/icons/dropdown-arrow.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </button>
                    {showCountryDropdown && (
                      <div className="
                        absolute top-full left-0 right-0 mt-1
                        bg-white
                        border border-[#d9d9d9]
                        rounded-lg
                        shadow-lg
                        max-h-[200px]
                        overflow-y-auto
                        z-50
                      ">
                        {countries.map((country) => (
                          <button
                            key={country.id}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="
                              w-full px-4 py-2 text-left
                              hover:bg-[#f5f5f5]
                              font-rubik text-base text-[#222]
                              border-b border-[#f0f0f0] last:border-b-0
                            "
                          >
                            {country.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col gap-2 relative">
                    <label className="
                      font-rubik text-base text-[#222]
                      leading-[24px]
                    ">
                      State
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowStateDropdown(!showStateDropdown)}
                      disabled={!selectedCountry}
                      className={`
                        border border-[#d9d9d9]
                        rounded-lg
                        px-3
                        h-[40px]
                        flex items-center justify-between
                        bg-white
                        transition-colors
                        ${selectedCountry ? 'hover:border-[#02368c]' : 'opacity-50 cursor-not-allowed'}
                      `}
                    >
                      <span className={`
                        font-rubik text-base
                        leading-[24px]
                        ${selectedState ? 'text-[#222]' : 'text-[rgba(0,0,0,0.25)]'}
                      `}>
                        {selectedState?.name || 'Select'}
                      </span>
                      <div className="relative w-[15px] h-[12px]">
                        <Image
                          src="/images/icons/dropdown-arrow.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </button>
                    {showStateDropdown && availableStates.length > 0 && (
                      <div className="
                        absolute top-full left-0 right-0 mt-1
                        bg-white
                        border border-[#d9d9d9]
                        rounded-lg
                        shadow-lg
                        max-h-[200px]
                        overflow-y-auto
                        z-50
                      ">
                        {availableStates.map((state) => (
                          <button
                            key={state.id}
                            type="button"
                            onClick={() => handleStateSelect(state)}
                            className="
                              w-full px-4 py-2 text-left
                              hover:bg-[#f5f5f5]
                              font-rubik text-base text-[#222]
                              border-b border-[#f0f0f0] last:border-b-0
                            "
                          >
                            {state.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* City & Zip */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex flex-col gap-2 relative">
                    <label className="
                      font-rubik text-base text-[#222]
                      leading-[24px]
                    ">
                      City
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCityDropdown(!showCityDropdown)}
                      disabled={!selectedState}
                      className={`
                        border border-[#d9d9d9]
                        rounded-lg
                        px-3
                        h-[40px]
                        flex items-center justify-between
                        bg-white
                        transition-colors
                        ${selectedState ? 'hover:border-[#02368c]' : 'opacity-50 cursor-not-allowed'}
                      `}
                    >
                      <span className={`
                        font-rubik text-base
                        leading-[24px]
                        ${selectedCity ? 'text-[#222]' : 'text-[rgba(0,0,0,0.25)]'}
                      `}>
                        {selectedCity?.name || 'Select'}
                      </span>
                      <div className="relative w-[15px] h-[12px]">
                        <Image
                          src="/images/icons/dropdown-arrow.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </button>
                    {showCityDropdown && availableCities.length > 0 && (
                      <div className="
                        absolute top-full left-0 right-0 mt-1
                        bg-white
                        border border-[#d9d9d9]
                        rounded-lg
                        shadow-lg
                        max-h-[200px]
                        overflow-y-auto
                        z-50
                      ">
                        {availableCities.map((city) => (
                          <button
                            key={city.id}
                            type="button"
                            onClick={() => handleCitySelect(city)}
                            className="
                              w-full px-4 py-2 text-left
                              hover:bg-[#f5f5f5]
                              font-rubik text-base text-[#222]
                              border-b border-[#f0f0f0] last:border-b-0
                            "
                          >
                            {city.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <label className="
                      font-rubik text-base text-[#222]
                      leading-[24px]
                    ">
                      Zip*
                    </label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="Enter zip code"
                      className="
                        border border-[#d9d9d9]
                        rounded-lg
                        px-3
                        h-[40px]
                        font-rubik text-base
                        placeholder:text-[rgba(0,0,0,0.25)]
                        text-[#222]
                        leading-[24px]
                        outline-none
                        bg-white
                      "
                    />
                  </div>
                </div>

                {/* Address Type Tags */}
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setAddressType('home')}
                    className={`
                      px-4 h-[39px]
                      rounded
                      border border-[rgba(0,0,0,0.1)]
                      font-poppins text-sm
                      leading-normal
                      transition-colors
                      ${addressType === 'home' ? 'bg-[#02368c] text-white' : 'bg-white text-[#111]'}
                    `}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => setAddressType('work')}
                    className={`
                      px-4 h-[39px]
                      rounded
                      border border-[rgba(0,0,0,0.1)]
                      font-poppins text-sm
                      leading-normal
                      transition-colors
                      ${addressType === 'work' ? 'bg-[#02368c] text-white' : 'bg-white text-[#111]'}
                    `}
                  >
                    Work
                  </button>
                  <button
                    onClick={() => setAddressType('other')}
                    className={`
                      px-4 h-[39px]
                      rounded
                      border border-[rgba(0,0,0,0.1)]
                      font-poppins text-sm
                      leading-normal
                      transition-colors
                      ${addressType === 'other' ? 'bg-[#02368c] text-white' : 'bg-white text-[#111]'}
                    `}
                  >
                    Other
                  </button>
                </div>

                {/* Save as Default Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="save-default"
                    checked={saveAsDefault}
                    onChange={(e) => setSaveAsDefault(e.target.checked)}
                    className="
                      w-5 h-5
                      border border-[#75777f]
                      rounded
                      cursor-pointer
                    "
                  />
                  <label
                    htmlFor="save-default"
                    className="
                      font-poppins text-sm text-[#111]
                      leading-normal
                      cursor-pointer
                    "
                  >
                    Save as my default address
                  </label>
                </div>
              </div>
            </div>

            {/* IDENTITY VERIFICATION Section */}
            <div className="
              border-b border-[rgba(0,0,0,0.2)]
              pb-6
              flex flex-col gap-3.5
            ">
              <h2 className="
                font-rubik text-base text-[#888] uppercase
                leading-[24px]
              ">
                IDENTITY VERIFICATION
              </h2>

              <div className="flex flex-col gap-6">
                {/* Take Selfie */}
                <div className="flex flex-col items-center gap-3">
                  <button className="
                    bg-[rgba(217,217,217,0.44)]
                    w-[100px] h-[100px]
                    rounded-full
                    flex items-center justify-center
                    p-6
                  ">
                    <div className="relative w-[52px] h-[52px]">
                      <Image
                        src="/images/icons/camera-icon.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </button>
                  <button className="
                    font-poppins text-[10px] text-[#02368c]
                    leading-normal
                    underline
                    text-center
                  ">
                    Take a quick selfie
                  </button>
                </div>

                {/* Document Type Dropdown */}
                <div className="flex flex-col gap-2 relative">
                  <label className="
                    font-rubik text-base text-[#222]
                    leading-[24px]
                  ">
                    Identity Verification Document Type
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowDocTypeDropdown(!showDocTypeDropdown)}
                    className="
                      border border-[#d9d9d9]
                      rounded-lg
                      px-3
                      h-[40px]
                      flex items-center justify-between
                      bg-white
                      hover:border-[#02368c] transition-colors
                    "
                  >
                    <span className={`
                      font-rubik text-base
                      leading-[24px]
                      ${selectedDocType ? 'text-[#222]' : 'text-[rgba(0,0,0,0.25)]'}
                    `}>
                      {selectedDocTypeName || 'Select'}
                    </span>
                    <div className="relative w-[15px] h-[12px]">
                      <Image
                        src="/images/icons/dropdown-arrow.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </button>
                  {showDocTypeDropdown && (
                    <div className="
                      absolute top-full left-0 right-0 mt-1
                      bg-white
                      border border-[#d9d9d9]
                      rounded-lg
                      shadow-lg
                      max-h-[200px]
                      overflow-y-auto
                      z-50
                    ">
                      {documentTypes.map((docType) => (
                        <button
                          key={docType.id}
                          type="button"
                          onClick={() => handleDocTypeSelect(docType.id)}
                          className="
                            w-full px-4 py-2 text-left
                            hover:bg-[#f5f5f5]
                            font-rubik text-base text-[#222]
                            border-b border-[#f0f0f0] last:border-b-0
                          "
                        >
                          {docType.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Upload Document */}
                <div className="flex flex-col gap-2">
                  <label className="
                    font-rubik text-base text-[#222]
                    leading-[24px]
                  ">
                    Upload document
                  </label>
                  <label className="
                    bg-[#fafafa]
                    border-2 border-[#d4d4d4] border-dashed
                    rounded-md
                    px-6 sm:px-20 py-8 sm:py-10
                    flex flex-col items-center gap-3
                    cursor-pointer
                    hover:border-[#02368c] transition-colors
                  ">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="flex items-center gap-3">
                      <div className="relative w-4 h-4">
                        <Image
                          src="/images/icons/upload-icon.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="
                        font-rubik text-sm text-[#02368c]
                        leading-[20px]
                      ">
                        Upload
                      </span>
                    </div>
                    <p className="
                      font-rubik text-xs text-[#888]
                      leading-normal
                      text-center
                    ">
                      Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG, GIF, WEBP
                    </p>
                    {selectedFile && (
                      <p className="
                        font-rubik text-xs text-[#02368c]
                        leading-normal
                      ">
                        {selectedFile.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            {/* Error Message */}
            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 text-center">
                  {submitError}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`
                bg-[#02368c]
                h-[49px]
                rounded-lg
                font-roboto-condensed text-lg text-white
                hover:bg-[#024189] transition-colors
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

            {/* Login Link */}
            <div className="text-center pt-1">
              <p className="
                font-roboto-condensed font-medium text-sm text-[#64748b]
                leading-normal
              ">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-[#02368c] hover:underline"
                >
                  Log in here
                </Link>
              </p>
            </div>
          </div>

          {/* Footer - Legal Text */}
          <div className="
            border-t border-[#f1f5f9]
            pt-3
          ">
            <p className="
              font-roboto-condensed text-xs text-[#777]
              leading-normal
              text-center
            ">
              By continuing, you agree to Kasazon's Terms & Conditions and Privacy Policy. All artisan credentials are encrypted and verified under Ghanaian regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default function RegisterCompletePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterCompleteContent />
    </Suspense>
  );
}
