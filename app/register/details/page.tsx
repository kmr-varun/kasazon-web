'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { countryCodes } from '@/data/registration';
import { OTPModal } from '@/components/OTPModal';
import { Header } from '@/src/components/layout/Header';
import { Footer } from '@/src/components/layout/Footer';

export default function RegisterDetailsPage() {
  const searchParams = useSearchParams();
  const accountType = searchParams.get('type') || 'customer';
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [showEmailOTP, setShowEmailOTP] = useState(false);

  const [countryCode, setCountryCode] = useState('+233');
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [mobileVerified, setMobileVerified] = useState(false);
  const [showMobileOTP, setShowMobileOTP] = useState(false);

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleVerifyEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    setEmailError('');
    setShowEmailOTP(true);
  };

  const handleEmailOTPVerify = (otp: string) => {
    console.log('Email verified with OTP:', otp);
    setEmailVerified(true);
    setShowEmailOTP(false);
  };

  const handleVerifyMobile = () => {
    if (!mobile) {
      setMobileError('Mobile number is required');
      return;
    }
    if (mobile.length < 9) {
      setMobileError('Please enter a valid mobile number');
      return;
    }
    setMobileError('');
    setShowMobileOTP(true);
  };

  const handleMobileOTPVerify = (otp: string) => {
    console.log('Mobile verified with OTP:', otp);
    setMobileVerified(true);
    setShowMobileOTP(false);
  };

  const handleContinue = () => {
    // Validate before continuing
    if (!email) {
      setEmailError('Please enter your email');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (!emailVerified) {
      setEmailError('Please verify your email first');
      return;
    }
    if (!mobile) {
      setMobileError('Please enter your mobile number');
      return;
    }
    if (mobile.length < 9) {
      setMobileError('Please enter a valid mobile number');
      return;
    }
    if (!mobileVerified) {
      setMobileError('Please verify your mobile number first');
      return;
    }

    console.log('Continue to step 3 as:', accountType);
    window.location.href = `/register/complete?type=${accountType}`;
  };

  const selectedCountryName = countryCodes.find(c => c.code === countryCode)?.name || '';

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex flex-col items-center py-8 sm:py-12 lg:py-24 px-4 sm:px-6">
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

          {/* Progress Indicator - Step 2 */}
          <div className="flex gap-1 w-full max-w-[437px]">
            <div className="flex-1 h-[10px] bg-[#f2f2f2] rounded-full" />
            <div className="flex-1 h-[10px] bg-[#02368c] rounded-full" />
            <div className="flex-1 h-[10px] bg-[#f2f2f2] rounded-full" />
          </div>

          {/* Description */}
          <p className="
            font-poppins text-sm text-[#64748b]
            leading-normal
            text-center
            max-w-[384px]
            px-4
          ">
            Let's Get Started with the basic details
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
          {/* Form Fields */}
          <div className="flex flex-col gap-6 sm:gap-10 py-3">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="
                font-rubik text-base text-[#222]
                leading-[24px]
              ">
                Email*
              </label>
              <div className="flex flex-col gap-2">
                <div className={`
                  border
                  ${emailError ? 'border-[#d10002]' : 'border-[#d9d9d9]'}
                  rounded-lg
                  px-3
                  h-[40px]
                  flex items-center
                  bg-white
                `}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="john@gmail.com"
                    className="
                      flex-1
                      font-rubik text-base
                      placeholder:text-[rgba(0,0,0,0.25)]
                      text-[#222]
                      leading-[24px]
                      outline-none
                      bg-transparent
                      min-w-0
                    "
                  />
                  {emailVerified ? (
                    <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill="#10b981"/>
                        <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="font-rubik text-xs text-[#10b981] whitespace-nowrap">Verified</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleVerifyEmail}
                      type="button"
                      className="
                        font-rubik text-sm text-[#02368c]
                        leading-[22px]
                        underline
                        ml-2
                        hover:opacity-80 transition-opacity
                        flex-shrink-0
                        whitespace-nowrap
                      "
                    >
                      Verify
                    </button>
                  )}
                </div>
                {emailError && (
                  <p className="
                    font-rubik text-xs text-[#d10002]
                    leading-normal
                    flex items-center gap-2
                  ">
                    {emailError}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile Number Field */}
            <div className="flex flex-col gap-2">
              <label className="
                font-rubik text-base text-[#222]
                leading-[24px]
              ">
                Mobile Number*
              </label>

              <div className="flex gap-2">
                {/* Country Code Dropdown */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    type="button"
                    className="
                      border border-[#d9d9d9]
                      rounded-lg
                      px-3
                      h-[40px]
                      flex items-center gap-2
                      bg-white
                      hover:border-[#02368c] transition-colors
                    "
                  >
                    <span className="
                      font-rubik text-base text-[#222]
                      leading-[24px]
                      whitespace-nowrap
                    ">
                      {countryCode}
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

                  {/* Dropdown Menu */}
                  {showCountryDropdown && (
                    <div className="
                      absolute top-full mt-1 left-0
                      bg-white
                      border border-[#d9d9d9]
                      rounded-lg
                      shadow-lg
                      py-1
                      z-50
                      min-w-[180px]
                      max-h-[240px]
                      overflow-y-auto
                    ">
                      {countryCodes.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setCountryCode(country.code);
                            setShowCountryDropdown(false);
                          }}
                          className="
                            w-full px-4 py-2 text-left
                            hover:bg-[#f5f5f5]
                            font-rubik text-sm text-[#222]
                            border-b border-[#f0f0f0] last:border-b-0
                          "
                        >
                          {country.code} ({country.name})
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Input */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className={`
                    border
                    ${mobileError ? 'border-[#d10002]' : 'border-[#d9d9d9]'}
                    rounded-lg
                    px-3
                    h-[40px]
                    flex items-center
                    bg-white
                  `}>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setMobile(value);
                        if (mobileError) setMobileError('');
                      }}
                      placeholder="XXXXX-XXXXX"
                      className="
                        flex-1
                        font-rubik text-base
                        placeholder:text-[rgba(0,0,0,0.25)]
                        text-[#222]
                        leading-[24px]
                        outline-none
                        bg-transparent
                        min-w-0
                      "
                    />
                    {mobileVerified ? (
                      <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="8" fill="#10b981"/>
                          <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-rubik text-xs text-[#10b981] whitespace-nowrap">Verified</span>
                      </div>
                    ) : (
                      <button
                        onClick={handleVerifyMobile}
                        type="button"
                        className="
                          font-rubik text-sm text-[#02368c]
                          leading-[22px]
                          underline
                          ml-2
                          hover:opacity-80 transition-opacity
                          flex-shrink-0
                          whitespace-nowrap
                        "
                      >
                        Verify
                      </button>
                    )}
                    {mobileError && !mobileVerified && (
                      <div className="relative w-4 h-4 ml-2 flex-shrink-0">
                        <Image
                          src="/images/icons/close-circle-error.svg"
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* Error Message */}
                  {mobileError && (
                    <p className="
                      font-rubik text-xs text-[#d10002]
                      leading-normal
                    ">
                      {mobileError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="
                bg-[#02368c]
                h-[49px]
                rounded-lg
                font-roboto-condensed text-lg text-white
                hover:bg-[#024189] transition-colors
              "
            >
              Continue
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

      {/* OTP Modals */}
      <OTPModal
        isOpen={showEmailOTP}
        onClose={() => setShowEmailOTP(false)}
        onVerify={handleEmailOTPVerify}
        type="email"
        contact={email}
      />

      <OTPModal
        isOpen={showMobileOTP}
        onClose={() => setShowMobileOTP(false)}
        onVerify={handleMobileOTPVerify}
        type="mobile"
        contact={`${countryCode} ${mobile}`}
      />
    </>
  );
}
