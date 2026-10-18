'use client';

import { useState } from 'react';
import Image from 'next/image';
import { OTPModal } from './OTPModal';
import { countryCodes } from '@/data/registration';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const languages = [
  { id: 'en', name: 'English' },
  { id: 'es', name: 'Spanish' },
  { id: 'fr', name: 'French' },
  { id: 'de', name: 'German' },
  { id: 'zh', name: 'Chinese' },
  { id: 'ar', name: 'Arabic' },
  { id: 'pt', name: 'Portuguese' },
  { id: 'hi', name: 'Hindi' },
];

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [fullName, setFullName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [countryCode, setCountryCode] = useState('+233');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState('');

  const selectedLanguageName = languages.find(l => l.id === selectedLanguage)?.name || '';

  const handleLogin = () => {
    // Validation
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!selectedLanguage) {
      setError('Please select a language');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 9) {
      setError('Please enter a valid phone number');
      return;
    }

    setError('');
    setShowOTP(true);
  };

  const handleOTPVerify = (otp: string) => {
    console.log('Login successful with OTP:', otp);
    setShowOTP(false);
    onLoginSuccess?.();
    onClose();
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    alert(`${provider} login coming soon!`);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="
            bg-white rounded-[26px] shadow-2xl
            w-full max-w-[480px]
            p-6 sm:p-8
            max-h-[90vh] overflow-y-auto
            animate-scaleIn
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              absolute top-3 right-3
              w-8 h-8 flex items-center justify-center
              hover:bg-gray-100 rounded-full transition-colors
            "
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Header */}
          <div className="flex flex-col items-center gap-1 mb-6">
            <h2 className="
              font-roboto-condensed font-semibold text-[26px]
              text-[#0f172a]
              tracking-[-0.65px] leading-[35.75px]
              text-center
            ">
              Login
            </h2>
            <p className="
              font-poppins text-xs text-[#777]
              leading-normal text-center
              max-w-[384px] px-1
            ">
              Enter your phone number to log in or create an account.
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-3 mb-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="font-poppins text-sm text-[#111] leading-normal">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your full name"
                className="
                  border border-[rgba(0,0,0,0.12)]
                  rounded-lg
                  h-[44px]
                  px-5
                  font-poppins text-xs
                  placeholder:text-[#777]
                  text-[#111]
                  leading-normal
                  outline-none
                  focus:border-[#02368c]
                  transition-colors
                "
              />
            </div>

            {/* Choose Language */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="font-poppins text-sm text-[#111] leading-normal">
                Choose Language
              </label>
              <button
                type="button"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="
                  border border-[rgba(0,0,0,0.12)]
                  rounded-lg
                  h-[44px]
                  px-5
                  flex items-center justify-between
                  font-poppins text-xs
                  text-[#777]
                  leading-normal
                  outline-none
                  hover:border-[#02368c]
                  transition-colors
                "
              >
                <span className={selectedLanguage ? 'text-[#111]' : ''}>
                  {selectedLanguageName || 'Choose your language'}
                </span>
                <div className="relative w-[14px] h-[14px]">
                  <Image
                    src="/images/icons/login-dropdown-arrow.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </button>

              {showLanguageDropdown && (
                <div className="
                  absolute top-full left-0 right-0 mt-1
                  bg-white
                  border border-[rgba(0,0,0,0.12)]
                  rounded-lg
                  shadow-lg
                  py-1
                  z-50
                  max-h-[200px]
                  overflow-y-auto
                ">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => {
                        setSelectedLanguage(lang.id);
                        setShowLanguageDropdown(false);
                        if (error) setError('');
                      }}
                      className="
                        w-full px-5 py-2 text-left
                        hover:bg-[#f5f5f5]
                        font-poppins text-xs text-[#111]
                        border-b border-[#f0f0f0] last:border-b-0
                      "
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="font-poppins text-sm text-[#111] leading-normal">
                Phone Number
              </label>
              <div className="
                border border-[rgba(0,0,0,0.12)]
                rounded-lg
                h-[44px]
                px-5
                flex items-center gap-5
                focus-within:border-[#02368c]
                transition-colors
              ">
                {/* Country Code Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="
                      font-poppins text-xs text-[#111]
                      leading-normal
                      whitespace-nowrap
                      hover:opacity-70 transition-opacity
                    "
                  >
                    {countryCode}
                  </button>

                  {showCountryDropdown && (
                    <div className="
                      absolute top-full left-0 mt-1
                      bg-white
                      border border-[rgba(0,0,0,0.12)]
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
                            font-poppins text-xs text-[#111]
                            border-b border-[#f0f0f0] last:border-b-0
                          "
                        >
                          {country.code} ({country.name})
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vertical Separator */}
                <div className="relative w-0 h-[35px] flex items-center justify-center">
                  <Image
                    src="/images/icons/login-separator-vertical.svg"
                    alt=""
                    width={35}
                    height={1}
                    className="rotate-90"
                  />
                </div>

                {/* Phone Input */}
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setPhoneNumber(value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your phone number"
                  className="
                    flex-1
                    font-poppins text-xs
                    placeholder:text-[#777]
                    text-[#111]
                    leading-normal
                    outline-none
                    bg-transparent
                    min-w-0
                  "
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-800 text-center">
                {error}
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="
              w-full
              bg-[#02368c]
              h-[49px]
              rounded-lg
              font-roboto-condensed font-medium text-lg text-white
              hover:bg-[#024189] transition-colors
              mb-4
            "
          >
            Login
          </button>

          {/* Terms */}
          <p className="
            font-poppins text-xs text-[#777]
            leading-normal text-center
            mb-5
          ">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-[#02368c] underline">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="/privacy" className="text-[#02368c] underline">
              Privacy Policy
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px">
              <Image
                src="/images/icons/login-separator-horizontal.svg"
                alt=""
                width={83}
                height={1}
                className="w-full"
              />
            </div>
            <p className="
              font-poppins text-xs text-[#777]
              leading-normal
              whitespace-nowrap
            ">
              or continue with
            </p>
            <div className="flex-1 h-px">
              <Image
                src="/images/icons/login-separator-horizontal.svg"
                alt=""
                width={83}
                height={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex items-center justify-center gap-[18px]">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="
                border border-[rgba(0,0,0,0.1)]
                rounded-lg
                p-[9px]
                hover:bg-gray-50 transition-colors
              "
            >
              <div className="relative w-7 h-7">
                <Image
                  src="/images/icons/google-logo.svg"
                  alt="Google"
                  fill
                  className="object-contain"
                />
              </div>
            </button>

            <button
              onClick={() => handleSocialLogin('Apple')}
              className="
                border border-[rgba(0,0,0,0.1)]
                rounded-lg
                p-[9px]
                hover:bg-gray-50 transition-colors
              "
            >
              <div className="relative w-7 h-7">
                <Image
                  src="/images/icons/apple-logo.svg"
                  alt="Apple"
                  fill
                  className="object-contain"
                />
              </div>
            </button>

            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="
                border border-[rgba(0,0,0,0.1)]
                rounded-lg
                p-[9px]
                hover:bg-gray-50 transition-colors
              "
            >
              <div className="relative w-7 h-7">
                <Image
                  src="/images/icons/facebook-logo.svg"
                  alt="Facebook"
                  fill
                  className="object-contain"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <OTPModal
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleOTPVerify}
        type="mobile"
        contact={`${countryCode} ${phoneNumber}`}
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}} />
    </>
  );
}
