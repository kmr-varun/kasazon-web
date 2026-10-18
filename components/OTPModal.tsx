'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  type: 'email' | 'mobile';
  contact: string;
}

export function OTPModal({ isOpen, onClose, onVerify, type, contact }: OTPModalProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Mock OTP for testing: 123456
  const MOCK_OTP = '123456';

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    const lastFilledIndex = Math.min(pastedData.length, 6) - 1;
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleVerify = () => {
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);

    // Simulate API call
    setTimeout(() => {
      if (otpString === MOCK_OTP) {
        onVerify(otpString);
        setOtp(['', '', '', '', '', '']);
        setError('');
      } else {
        setError('Invalid OTP. Please try again.');
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    alert(`New OTP sent to your ${type}! (Mock: ${MOCK_OTP})`);
    inputRefs.current[0]?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#eff6ff] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="#02368c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="#02368c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="#02368c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="font-roboto-condensed font-semibold text-2xl text-[#0f172a] mb-2">
            Verify Your {type === 'email' ? 'Email' : 'Mobile Number'}
          </h2>
          <p className="font-poppins text-sm text-[#64748b] leading-normal">
            We've sent a 6-digit code to
          </p>
          <p className="font-poppins text-sm text-[#02368c] font-medium mt-1">
            {contact}
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="mb-6">
          <div className="flex gap-2 sm:gap-3 justify-center mb-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`
                  w-12 h-12 sm:w-14 sm:h-14
                  text-center
                  text-2xl font-semibold
                  border-2 rounded-lg
                  outline-none
                  transition-all
                  ${error
                    ? 'border-[#d10002] bg-[#fef2f2]'
                    : digit
                    ? 'border-[#02368c] bg-[#eff6ff]'
                    : 'border-[#d9d9d9] bg-white'
                  }
                  focus:border-[#02368c] focus:ring-2 focus:ring-[#02368c]/20
                `}
              />
            ))}
          </div>

          {error && (
            <p className="text-[#d10002] text-sm text-center font-rubik mt-2">
              {error}
            </p>
          )}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isVerifying || otp.join('').length !== 6}
          className={`
            w-full h-12 rounded-lg
            font-roboto-condensed text-lg text-white
            transition-all
            ${isVerifying || otp.join('').length !== 6
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#02368c] hover:bg-[#024189]'
            }
          `}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>

        {/* Resend */}
        <div className="text-center mt-6">
          <p className="font-poppins text-sm text-[#64748b]">
            Didn't receive the code?{' '}
            <button
              onClick={handleResend}
              className="text-[#02368c] font-medium hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </div>

        {/* Mock OTP Hint (Remove in production) */}
        <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800 text-center">
            <strong>Test Mode:</strong> Use OTP: <code className="font-mono bg-yellow-100 px-2 py-1 rounded">123456</code>
          </p>
        </div>
      </div>

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
    </div>
  );
}
