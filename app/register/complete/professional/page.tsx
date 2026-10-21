'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { countries, type Country } from '@/data/locations';
import { serviceCategories, genders, relationships } from '@/data/professional';
import { countryCodes } from '@/data/registration';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';
import { register, type AccountType as AuthAccountType } from '@/src/lib/auth';

function ProfessionalRegisterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accountType = searchParams.get('type') || 'professional';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Identity & Location section
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState<{ name: string } | null>(null);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');

  // Load verified contact details from previous steps
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const verifiedEmail = sessionStorage.getItem('kasazon_verified_email') || '';
      const verifiedPhone = sessionStorage.getItem('kasazon_verified_phone') || '';
      setEmail(verifiedEmail);
      setPhone(verifiedPhone);
    }
  }, []);

  //  Documents
  const [selfieImage, setSelfieImage] = useState<File | null>(null);
  const [identityDoc, setIdentityDoc] = useState<File | null>(null);
  const [proofOfAddressDoc, setProofOfAddressDoc] = useState<File | null>(null);
  const [tradeCertDoc, setTradeCertDoc] = useState<File | null>(null);
  const [policeClearanceDoc, setPoliceClearanceDoc] = useState<File | null>(null);

  // Background Check section
  const [institution, setInstitution] = useState('');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  // Guaranteer section
  const [guaranteerName, setGuaranteerName] = useState('');
  const [guaranteerRelationship, setGuaranteerRelationship] = useState('');
  const [guaranteerCountryCode, setGuaranteerCountryCode] = useState('+233');
  const [guaranteerMobile, setGuaranteerMobile] = useState('');
  const [guaranteerOccupation, setGuaranteerOccupation] = useState('');
  const [guaranteerIdNumber, setGuaranteerIdNumber] = useState('');

  // Dropdown states
  const [showServiceCategoryDropdown, setShowServiceCategoryDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showRelationshipDropdown, setShowRelationshipDropdown] = useState(false);
  const [showGuaranteerCountryDropdown, setShowGuaranteerCountryDropdown] = useState(false);

  // Ref for selfie file input
  const selfieInputRef = useState<HTMLInputElement | null>(null)[1];

  const handleFileUpload = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSelfieCapture = () => {
    // Trigger the hidden file input
    const input = document.getElementById('selfie-input') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleSubmit = async () => {
    // Validation for required fields
    if (!fullName) {
      setSubmitError('Please enter your full name');
      return;
    }

    if (!email && !phone) {
      setSubmitError('Please complete the previous registration steps (email/phone verification)');
      return;
    }

    if (!dateOfBirth) {
      setSubmitError('Date of Birth is required for professional registration');
      return;
    }

    if (!selectedGender) {
      setSubmitError('Gender is required for professional registration');
      return;
    }

    // Guarantor validation
    if (!guaranteerName) {
      setSubmitError('Guarantor name is required for professional registration');
      return;
    }

    if (!guaranteerRelationship) {
      setSubmitError('Guarantor relationship is required for professional registration');
      return;
    }

    if (!guaranteerMobile || guaranteerMobile.length < 9) {
      setSubmitError('Valid guarantor mobile number is required for professional registration');
      return;
    }

    if (!guaranteerOccupation) {
      setSubmitError('Guarantor occupation is required for professional registration');
      return;
    }

    if (!guaranteerIdNumber) {
      setSubmitError('Guarantor ID number is required for professional registration');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Call backend registration API with required professional fields
      const authAccountType: AuthAccountType = 'PROFESSIONAL';

      const registrationResponse = await register({
        fullName,
        email: email || undefined,
        phone: phone || undefined,
        accountType: authAccountType,
        // Professional required fields
        dateOfBirth,
        gender: selectedGender,
        guarantorName: guaranteerName,
        guarantorRelationship: guaranteerRelationship,
        guarantorPhone: `${guaranteerCountryCode}${guaranteerMobile}`,
        guarantorOccupation: guaranteerOccupation,
        guarantorIdNumber: guaranteerIdNumber,
      });

      // Create address with location data if available
      if (selectedCountry && selectedCity && (addressLine1 || selectedState)) {
        try {
          const { api } = await import('@/src/lib/api');
          await api.addresses.create({
            type: 'HOME',
            label: 'Home Address',
            addressLine1: addressLine1 || selectedCity,
            addressLine2: addressLine2 || undefined,
            city: selectedCity,
            state: selectedState?.name || '',
            country: selectedCountry.name,
            isDefault: true,
          });
          console.log('✅ Address saved successfully');
        } catch (addrErr) {
          console.error('Failed to save address:', addrErr);
          // Don't block registration if address save fails
        }
      }

      // Log additional professional data that's not yet supported by backend
      const additionalData = {
        serviceCategory: selectedServiceCategory,
        documents: {
          selfie: selfieImage?.name,
          identity: identityDoc?.name,
          proofOfAddress: proofOfAddressDoc?.name,
          tradeCertificate: tradeCertDoc?.name,
          policeClearance: policeClearanceDoc?.name,
        },
        backgroundCheck: {
          institution,
          certificateNumber,
          expiryDate,
        },
      };
      console.log('Additional professional data (not yet sent to backend):', additionalData);

      // Clear session storage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('kasazon_pending_name');
        sessionStorage.removeItem('kasazon_pending_phone');
        sessionStorage.removeItem('kasazon_verified_email');
        sessionStorage.removeItem('kasazon_verified_phone');
      }

      // Redirect to success/activation page
      router.push('/register/complete/professional/success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceCategoryName = serviceCategories.find(s => s.id === selectedServiceCategory)?.name;
  const selectedGenderName = genders.find(g => g.id === selectedGender)?.name;
  const selectedRelationshipName = relationships.find(r => r.id === guaranteerRelationship)?.name;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex flex-col items-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="w-full max-w-[900px]">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 mb-8">
            <h1 className="font-roboto-condensed font-semibold text-3xl sm:text-4xl text-[#0f172a] tracking-[-0.65px] text-center px-2">
              Welcome to Kasazon
            </h1>

            {/* Progress Indicator - Step 3 */}
            <div className="flex gap-1 w-full max-w-[437px]">
              <div className="flex-1 h-[10px] bg-[#f2f2f2] rounded-full" />
              <div className="flex-1 h-[10px] bg-[#f2f2f2] rounded-full" />
              <div className="flex-1 h-[10px] bg-[#02368c] rounded-full" />
            </div>

            <p className="font-poppins text-sm text-[#64748b] text-center max-w-[384px] px-4">
              Please fill the details so we get to know you better
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white border border-[#dcdcdc] rounded-2xl px-6 sm:px-12 pt-10 pb-8 flex flex-col gap-10">

            {/* IDENTITY & LOCATION VERIFICATION */}
            <div className="border-b border-[rgba(0,0,0,0.2)] pb-8 flex flex-col gap-5">
              <h2 className="font-rubik text-base text-[#888] uppercase">IDENTITY & LOCATION VERIFICATION</h2>

              <div className="flex flex-col gap-5">
                {/* Take Selfie */}
                <div className="flex flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSelfieCapture}
                    className="bg-[rgba(217,217,217,0.44)] w-[100px] h-[100px] rounded-full flex items-center justify-center p-6 hover:bg-[rgba(217,217,217,0.6)] transition-colors"
                  >
                    {selfieImage ? (
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image src={URL.createObjectURL(selfieImage)} alt="Selfie" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="relative w-[52px] h-[52px]">
                        <Image src="/images/icons/camera-icon.svg" alt="" fill className="object-contain" />
                      </div>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleSelfieCapture}
                    className="font-poppins text-[10px] text-[#02368c] underline hover:opacity-80 transition-opacity"
                  >
                    {selfieImage ? 'Change selfie' : 'Take a quick selfie'}
                  </button>
                  {/* Hidden file input for selfie */}
                  <input
                    id="selfie-input"
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={handleFileUpload(setSelfieImage)}
                    className="hidden"
                  />
                </div>

                {/* Upload Identity Document */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">Upload Identity Verification Document</label>
                  <label className="bg-[#fafafa] border-2 border-[#d4d4d4] border-dashed rounded-md px-6 sm:px-20 py-8 flex flex-col items-center gap-3 cursor-pointer hover:border-[#02368c] transition-colors">
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp" onChange={handleFileUpload(setIdentityDoc)} className="hidden" />
                    <div className="flex items-center gap-3">
                      <div className="relative w-4 h-4">
                        <Image src="/images/icons/upload-icon.svg" alt="" fill className="object-contain" />
                      </div>
                      <span className="font-rubik text-sm text-[#02368c]">Upload</span>
                    </div>
                    <p className="font-rubik text-xs text-[#888] text-center">
                      Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG, GIF, WEBP
                    </p>
                    {identityDoc && <p className="font-rubik text-xs text-[#02368c]">{identityDoc.name}</p>}
                  </label>
                </div>

                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] font-rubik text-base outline-none"
                  />
                </div>

                {/* Display verified email and phone (read-only) */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Email - Verified and Read-only */}
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

                  {/* Phone - Verified and Read-only */}
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

                {/* Date of Birth */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">Date of Birth*</label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] font-rubik text-base text-[#222] outline-none bg-white"
                    required
                  />
                </div>

                {/* Service Category - Dropdown */}
                <div className="flex flex-col gap-2 relative">
                  <label className="font-rubik text-base text-[#222]">Service Category</label>
                  <button type="button" onClick={() => setShowServiceCategoryDropdown(!showServiceCategoryDropdown)} className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] flex items-center justify-between bg-white hover:border-[#02368c] transition-colors">
                    <span className={`font-rubik text-base ${selectedServiceCategory ? 'text-[#222]' : 'text-[rgba(0,0,0,0.25)]'}`}>
                      {selectedServiceCategoryName || 'Select'}
                    </span>
                    <div className="relative w-[15px] h-[12px]">
                      <Image src="/images/icons/dropdown-arrow.svg" alt="" fill className="object-contain" />
                    </div>
                  </button>
                  {showServiceCategoryDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9d9d9] rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-50">
                      {serviceCategories.map((cat) => (
                        <button key={cat.id} type="button" onClick={() => { setSelectedServiceCategory(cat.id); setShowServiceCategoryDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-[#f5f5f5] font-rubik text-base text-[#222] border-b border-[#f0f0f0] last:border-b-0">
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Gender - Dropdown */}
                <div className="flex flex-col gap-2 relative">
                  <label className="font-rubik text-base text-[#222]">Gender*</label>
                  <button type="button" onClick={() => setShowGenderDropdown(!showGenderDropdown)} className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] flex items-center justify-between bg-white hover:border-[#02368c] transition-colors">
                    <span className={`font-rubik text-base ${selectedGender ? 'text-[#222]' : 'text-[rgba(0,0,0,0.25)]'}`}>
                      {selectedGenderName || 'Select'}
                    </span>
                    <div className="relative w-[15px] h-[12px]">
                      <Image src="/images/icons/dropdown-arrow.svg" alt="" fill className="object-contain" />
                    </div>
                  </button>
                  {showGenderDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9d9d9] rounded-lg shadow-lg z-50">
                      {genders.map((g) => (
                        <button key={g.id} type="button" onClick={() => { setSelectedGender(g.id); setShowGenderDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-[#f5f5f5] font-rubik text-base text-[#222] border-b border-[#f0f0f0] last:border-b-0">
                          {g.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Country - Dropdown */}
                <div className="flex flex-col gap-2 relative">
                  <label className="font-rubik text-base text-[#222]">Country</label>
                  <button type="button" onClick={() => setShowCountryDropdown(!showCountryDropdown)} className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] flex items-center justify-between bg-white hover:border-[#02368c] transition-colors">
                    <span className={`font-rubik text-base ${selectedCountry ? 'text-[#222]' : 'text-[rgba(0,0,0,0.25)]'}`}>
                      {selectedCountry?.name || 'Select'}
                    </span>
                    <div className="relative w-[15px] h-[12px]">
                      <Image src="/images/icons/dropdown-arrow.svg" alt="" fill className="object-contain" />
                    </div>
                  </button>
                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9d9d9] rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-50">
                      {countries.map((c) => (
                        <button key={c.id} type="button" onClick={() => { setSelectedCountry(c); setShowCountryDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-[#f5f5f5] font-rubik text-base text-[#222] border-b border-[#f0f0f0] last:border-b-0">
                          {c.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* City */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">City</label>
                  <input type="text" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} placeholder="Enter city" className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] font-rubik text-base placeholder:text-[rgba(0,0,0,0.25)] outline-none" />
                </div>

                {/* Upload Proof of Address */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">Upload Proof of Address Document</label>
                  <label className="bg-[#fafafa] border-2 border-[#d4d4d4] border-dashed rounded-md px-6 sm:px-20 py-8 flex flex-col items-center gap-3 cursor-pointer hover:border-[#02368c] transition-colors">
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp" onChange={handleFileUpload(setProofOfAddressDoc)} className="hidden" />
                    <div className="flex items-center gap-3">
                      <div className="relative w-4 h-4">
                        <Image src="/images/icons/upload-icon.svg" alt="" fill className="object-contain" />
                      </div>
                      <span className="font-rubik text-sm text-[#02368c]">Upload</span>
                    </div>
                    <p className="font-rubik text-xs text-[#888] text-center">
                      Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG, GIF, WEBP
                    </p>
                    {proofOfAddressDoc && <p className="font-rubik text-xs text-[#02368c]">{proofOfAddressDoc.name}</p>}
                  </label>
                </div>
              </div>
            </div>

            {/* BACKGROUND CHECK */}
            <div className="border-b border-[rgba(0,0,0,0.2)] pb-8 flex flex-col gap-5">
              <h2 className="font-rubik text-base text-[#888] uppercase">BACKGROUND CHECK</h2>

              <div className="flex flex-col gap-5">
                {/* Upload Trade Certificate */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">Upload Trade Certificate</label>
                  <p className="font-poppins text-xs text-[#777]">Certified providers get priority visibility and a trust badge on their profile.</p>
                  <label className="bg-[#fafafa] border-2 border-[#d4d4d4] border-dashed rounded-md px-6 sm:px-20 py-8 flex flex-col items-center gap-3 cursor-pointer hover:border-[#02368c] transition-colors">
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp" onChange={handleFileUpload(setTradeCertDoc)} className="hidden" />
                    <div className="flex items-center gap-3">
                      <div className="relative w-4 h-4">
                        <Image src="/images/icons/upload-icon.svg" alt="" fill className="object-contain" />
                      </div>
                      <span className="font-rubik text-sm text-[#02368c]">Upload</span>
                    </div>
                    <p className="font-rubik text-xs text-[#888] text-center">
                      Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG, GIF, WEBP
                    </p>
                    {tradeCertDoc && <p className="font-rubik text-xs text-[#02368c]">{tradeCertDoc.name}</p>}
                  </label>
                </div>

                {/* Institution */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">Institution</label>
                  <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="eg. Boxton University" className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] font-rubik text-base placeholder:text-[rgba(0,0,0,0.25)] outline-none" />
                </div>

                {/* Certificate Number */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">Certificate Number (if any)</label>
                  <input type="text" value={certificateNumber} onChange={(e) => setCertificateNumber(e.target.value)} className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] font-rubik text-base outline-none" />
                </div>

                {/* Expiry Date */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">Expiry Date (if any)</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] font-rubik text-base text-[#222] outline-none bg-white"
                  />
                </div>

                {/* Upload Police Clearance */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">Upload Police Clearance Certificate</label>
                  <p className="font-poppins text-xs text-[#777]">For customer safety, all providers must submit a valid police clearance certificate</p>
                  <label className="bg-[#fafafa] border-2 border-[#d4d4d4] border-dashed rounded-md px-6 sm:px-20 py-8 flex flex-col items-center gap-3 cursor-pointer hover:border-[#02368c] transition-colors">
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp" onChange={handleFileUpload(setPoliceClearanceDoc)} className="hidden" />
                    <div className="flex items-center gap-3">
                      <div className="relative w-4 h-4">
                        <Image src="/images/icons/upload-icon.svg" alt="" fill className="object-contain" />
                      </div>
                      <span className="font-rubik text-sm text-[#02368c]">Upload</span>
                    </div>
                    <p className="font-rubik text-xs text-[#888] text-center">
                      Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG, GIF, WEBP
                    </p>
                    {policeClearanceDoc && <p className="font-rubik text-xs text-[#02368c]">{policeClearanceDoc.name}</p>}
                  </label>
                </div>

                {/* Info Banner */}
                <div className="bg-[rgba(59,156,156,0.1)] border border-[rgba(59,156,156,0.2)] rounded-lg p-3 flex gap-2">
                  <div className="relative w-4 h-4 flex-shrink-0 mt-0.5">
                    <Image src="/images/icons/help-icon.svg" alt="" fill className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="font-poppins font-medium text-sm text-[#111] mb-1">Don't have a police clearance certificate?</p>
                    <p className="font-poppins text-xs text-[#777] mb-2">You can obtain one from your local police station or the Ghana Police Service CID Headquarters.</p>
                    <button className="font-roboto-condensed font-medium text-xs text-[#02368c] underline">Learn how to apply</button>
                  </div>
                </div>
              </div>
            </div>

            {/* ADD GUARANTEER */}
            <div className="pb-4 flex flex-col gap-5">
              <h2 className="font-rubik text-base text-[#888] uppercase">ADD GUARANTEER</h2>
              <p className="font-poppins text-xs text-[#777]">Someone who can vouch for your character — a family member, employer, or community leader</p>

              <div className="flex flex-col gap-5">
                {/* Full Name of Guaranteer */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">Full Name of Guaranteer*</label>
                  <input type="text" value={guaranteerName} onChange={(e) => setGuaranteerName(e.target.value)} className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] font-rubik text-base outline-none" />
                </div>

                {/* Relationship to you */}
                <div className="flex flex-col gap-2 relative">
                  <label className="font-rubik text-base text-[#222]">Relationship to you*</label>
                  <button type="button" onClick={() => setShowRelationshipDropdown(!showRelationshipDropdown)} className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] flex items-center justify-between bg-white hover:border-[#02368c] transition-colors">
                    <span className={`font-rubik text-base ${guaranteerRelationship ? 'text-[#222]' : 'text-[rgba(0,0,0,0.25)]'}`}>
                      {selectedRelationshipName || 'Select'}
                    </span>
                    <div className="relative w-[15px] h-[12px]">
                      <Image src="/images/icons/dropdown-arrow.svg" alt="" fill className="object-contain" />
                    </div>
                  </button>
                  {showRelationshipDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d9d9d9] rounded-lg shadow-lg z-50">
                      {relationships.map((r) => (
                        <button key={r.id} type="button" onClick={() => { setGuaranteerRelationship(r.id); setShowRelationshipDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-[#f5f5f5] font-rubik text-base text-[#222] border-b border-[#f0f0f0] last:border-b-0">
                          {r.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">Mobile Number*</label>
                  <div className="flex gap-2">
                    <div className="relative flex-shrink-0">
                      <button type="button" onClick={() => setShowGuaranteerCountryDropdown(!showGuaranteerCountryDropdown)} className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] flex items-center gap-2 bg-white hover:border-[#02368c] transition-colors">
                        <span className="font-rubik text-base text-[#222] whitespace-nowrap">{guaranteerCountryCode}</span>
                        <div className="relative w-[15px] h-[12px]">
                          <Image src="/images/icons/dropdown-arrow.svg" alt="" fill className="object-contain" />
                        </div>
                      </button>
                      {showGuaranteerCountryDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-[#d9d9d9] rounded-lg shadow-lg py-1 z-50 min-w-[180px] max-h-[240px] overflow-y-auto">
                          {countryCodes.map((country) => (
                            <button key={country.code} type="button" onClick={() => { setGuaranteerCountryCode(country.code); setShowGuaranteerCountryDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-[#f5f5f5] font-rubik text-sm text-[#222] border-b border-[#f0f0f0] last:border-b-0">
                              {country.code} ({country.name})
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input type="tel" value={guaranteerMobile} onChange={(e) => setGuaranteerMobile(e.target.value.replace(/[^0-9]/g, ''))} placeholder="XXXXX-XXXXX" className="flex-1 border border-[#d9d9d9] rounded-lg px-3 h-[40px] font-rubik text-base placeholder:text-[rgba(0,0,0,0.25)] outline-none" />
                  </div>
                </div>

                {/* Occupation */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">Occupation*</label>
                  <input type="text" value={guaranteerOccupation} onChange={(e) => setGuaranteerOccupation(e.target.value)} className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] font-rubik text-base outline-none" />
                </div>

                {/* ID Number */}
                <div className="flex flex-col gap-2">
                  <label className="font-rubik text-base text-[#222]">ID Number*</label>
                  <input type="text" value={guaranteerIdNumber} onChange={(e) => setGuaranteerIdNumber(e.target.value)} className="border border-[#d9d9d9] rounded-lg px-3 h-[40px] font-rubik text-base outline-none" />
                </div>

                {/* Info Banner */}
                <div className="bg-[rgba(59,156,156,0.1)] border border-[rgba(59,156,156,0.2)] rounded-lg p-3 flex gap-2">
                  <div className="relative w-4 h-4 flex-shrink-0 mt-0.5">
                    <Image src="/images/icons/help-icon.svg" alt="" fill className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="font-poppins font-medium text-sm text-[#111] mb-1">Why do we need this?</p>
                    <p className="font-poppins text-xs text-[#777]">A guarantor helps us verify your background and adds an extra layer of accountability. We may contact them briefly to confirm your details — nothing more.</p>
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

              <div className="text-center pt-1">
                <p className="font-roboto-condensed font-medium text-sm text-[#64748b]">
                  Already have an account?{' '}
                  <Link href="/login" className="text-[#02368c] hover:underline">
                    Log in here
                  </Link>
                </p>
              </div>
            </div>

            {/* Footer - Legal Text */}
            <div className="border-t border-[#f1f5f9] pt-3">
              <p className="font-roboto-condensed text-xs text-[#777] text-center">
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

export default function ProfessionalRegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProfessionalRegisterContent />
    </Suspense>
  );
}
