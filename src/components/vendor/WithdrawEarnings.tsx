"use client";

import { useState } from "react";

const MobileMoneyIcon = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0H3C1.34315 0 0 1.34315 0 3V17C0 18.6569 1.34315 20 3 20H15C16.6569 20 18 18.6569 18 17V3C18 1.34315 16.6569 0 15 0Z" fill="#02368C"/>
    <path d="M9 16C10.1046 16 11 15.1046 11 14C11 12.8954 10.1046 12 9 12C7.89543 12 7 12.8954 7 14C7 15.1046 7.89543 16 9 16Z" fill="white"/>
    <rect x="4" y="4" width="10" height="6" rx="1" fill="white"/>
  </svg>
);

interface WithdrawEarningsProps {
  availableBalance: number;
  payoutMethod?: string;
  payoutAccountEnding?: string;
  onWithdraw?: (amount: number) => void;
  onChangePayoutMethod?: () => void;
  isWithdrawing?: boolean;
}

export function WithdrawEarnings({
  availableBalance,
  payoutMethod = "Mobile Money (MTN)",
  payoutAccountEnding = "4521",
  onWithdraw,
  onChangePayoutMethod,
  isWithdrawing = false,
}: WithdrawEarningsProps) {
  const [amount, setAmount] = useState<string>("");

  const quickAmounts = [100, 500];

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleWithdrawAll = () => {
    setAmount(availableBalance.toString());
  };

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && numAmount <= availableBalance) {
      onWithdraw?.(numAmount);
    }
  };

  const isValidAmount = parseFloat(amount) > 0 && parseFloat(amount) <= availableBalance;

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden w-[334px]">
      {/* Header */}
      <div className="border-b border-black/[0.12] px-5 py-[18px] h-[56px] flex items-center">
        <h2
          className="text-[16px] font-medium text-[#222]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Withdraw Earnings
        </h2>
      </div>

      {/* Content */}
      <div className="px-5 py-4 flex flex-col gap-4">
        {/* Amount Input */}
        <div className="flex flex-col gap-2">
          <label
            className="text-[14px] text-[#111]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            How much would you like to withdraw?
          </label>
          <input
            type="text"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            className="h-[44px] px-5 border border-black/[0.12] rounded-lg text-[12px] placeholder:text-[#777] outline-none focus:border-[#02368c]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          />

          {/* Quick Amount Chips */}
          <div className="flex gap-1 overflow-auto">
            {quickAmounts.map((value) => (
              <button
                key={value}
                onClick={() => handleQuickAmount(value)}
                className="h-[30px] px-[25px] rounded-full border border-black/10 text-[12px] text-[#111] bg-white hover:bg-gray-50"
                style={{ fontFamily: "Roboto Flex, sans-serif" }}
              >
                ₵{value}
              </button>
            ))}
            <button
              onClick={handleWithdrawAll}
              className="h-[30px] px-[25px] rounded-full border border-black/10 text-[12px] text-[#111] bg-white hover:bg-gray-50"
              style={{ fontFamily: "Roboto Flex, sans-serif" }}
            >
              All (₵{availableBalance.toLocaleString()})
            </button>
          </div>
        </div>

        {/* Payout Destination */}
        <div className="flex flex-col gap-1 pt-1">
          <label
            className="text-[12px] font-medium text-[#424655] tracking-[0.24px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Payout Destination
          </label>
          <div className="bg-[#eef4ff] rounded p-2.5 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <MobileMoneyIcon />
              </div>
              <span
                className="text-[14px] text-[#1b1c1c]"
                style={{ fontFamily: "Roboto Flex, sans-serif" }}
              >
                {payoutMethod} ••••{payoutAccountEnding}
              </span>
            </div>
            <button
              onClick={onChangePayoutMethod}
              className="text-[12px] font-medium text-[#02368c] tracking-[0.24px] underline text-left"
              style={{ fontFamily: "Roboto Flex, sans-serif" }}
            >
              Change
            </button>
          </div>
        </div>

        {/* Withdraw Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValidAmount || isWithdrawing}
          className={`w-full h-[48px] rounded-lg text-[16px] text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex items-center justify-center gap-2 ${
            isValidAmount && !isWithdrawing
              ? "bg-[#02368c] border border-[#02368c] hover:bg-[#012d73]"
              : "bg-[#02368c]/50 border border-[#02368c]/50 cursor-not-allowed"
          }`}
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {isWithdrawing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            "Withdraw"
          )}
        </button>
      </div>
    </div>
  );
}
