"use client";

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.16667 11.6667L0 10.5L4.66667 5.83333L0 1.16667L1.16667 0L5.83333 4.66667L10.5 0L11.6667 1.16667L7 5.83333L11.6667 10.5L10.5 11.6667L5.83333 7L1.16667 11.6667V11.6667" fill="#9CA3AF"/>
  </svg>
);

export interface WorkCompletionOTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (otp: string) => void;
  customerName: string;
  onResendOTP?: () => void;
  onContactSupport?: () => void;
}

export function WorkCompletionOTPModal({
  isOpen,
  onClose,
  onConfirm,
  customerName,
  onResendOTP,
  onContactSupport,
}: WorkCompletionOTPModalProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", ""]);
      setCountdown(30);
      setCanResend(false);
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || canResend) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, canResend]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const focusIndex = Math.min(pastedData.length, 3);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = () => {
    const otpString = otp.join("");
    if (otpString.length === 4) {
      onConfirm(otpString);
    }
  };

  const handleResend = () => {
    if (canResend) {
      setCountdown(30);
      setCanResend(false);
      onResendOTP?.();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-6 w-[350px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col gap-5 items-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <CloseIcon />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-[54px] items-center w-full">
          <div className="flex flex-col gap-6 items-start w-full">
            {/* Header */}
            <div className="flex flex-col gap-1.5 pr-8 w-full">
              <h3
                className="text-[18px] font-semibold text-[#111]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Confirm site visit
              </h3>
              <p
                className="text-[14px] text-[#777]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Ask {customerName} for the 4-digit PIN to confirm your work completion.
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex gap-2 items-center w-full">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-[60px] h-[60px] rounded-lg border text-center text-[24px] font-medium outline-none transition-colors ${
                    digit || index === otp.findIndex((d) => d === "")
                      ? "border-[#02368c]"
                      : "border-black/[0.12]"
                  } focus:border-[#02368c]`}
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isComplete}
            className={`w-full h-[44px] rounded-lg text-[16px] text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors ${
              isComplete
                ? "bg-[#02368c] border border-[#02368c] hover:bg-[#012d73]"
                : "bg-[#02368c]/50 border border-[#02368c]/50 cursor-not-allowed"
            }`}
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Confirm Work Completion
          </button>
        </div>

        {/* Resend OTP */}
        <div className="flex items-center justify-center gap-1 py-2 w-full">
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`text-[12px] ${canResend ? "text-[#02368c] cursor-pointer" : "text-[#02368c]/50 cursor-not-allowed"}`}
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Resend OTP
          </button>
          <span
            className="text-[12px] text-[#02368c]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            ({formatTime(countdown)})
          </span>
        </div>

        {/* Contact Support */}
        <div className="text-center w-full">
          <span
            className="text-[12px] text-[#6b7280]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Didn't get a response?{" "}
          </span>
          <button
            onClick={onContactSupport}
            className="text-[12px] text-[#02368c] hover:underline"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Contact support
          </button>
        </div>
      </div>
    </div>
  );
}
