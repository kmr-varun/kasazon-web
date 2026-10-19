"use client";

import { useMemo, useState } from "react";
import {
  TransactionsBalanceCard,
  TransactionsTable,
  WithdrawEarnings,
} from "@/src/components/vendor";
import { useVendorBalance, useVendorTransactions } from "@/src/hooks/useVendorApi";

// Loading skeleton
function TransactionsSkeleton() {
  return (
    <div className="flex flex-col gap-8 px-8 py-10 animate-pulse">
      <div className="h-12 w-48 bg-gray-200 rounded" />
      <div className="flex gap-2 items-start">
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-24 bg-gray-200 rounded-xl" />
          <div className="h-96 bg-gray-200 rounded-xl" />
        </div>
        <div className="w-72 h-80 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const [withdrawing, setWithdrawing] = useState(false);

  const {
    balance,
    loading: balanceLoading,
    error: balanceError,
    refetch: refetchBalance,
    withdraw,
  } = useVendorBalance();

  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
    refetch: refetchTransactions,
  } = useVendorTransactions({ limit: 20 });

  // Transform transactions for component
  const tableTransactions = useMemo(() => {
    return transactions.map((tx) => ({
      id: tx.id,
      bookingId: tx.booking?.bookingCode || "N/A",
      customerName: tx.booking?.customer?.fullName || "Customer",
      customerAvatar: tx.booking?.customer?.avatarUrl,
      serviceDescription: tx.booking?.service?.name || "Service",
      status: mapTransactionStatus(tx.status),
      serviceDate: tx.booking?.scheduledDate
        ? new Date(tx.booking.scheduledDate).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : new Date(tx.createdAt).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
      serviceTime: tx.booking?.scheduledTime || "",
      amount: tx.amount,
    }));
  }, [transactions]);

  const availableBalance = balance?.available || 0;

  const handleWithdraw = async (amount: number) => {
    setWithdrawing(true);
    // Note: You'd need to implement payout method selection
    const payoutMethodId = "default"; // This should come from user's saved payout methods
    const { error } = await withdraw(amount, payoutMethodId);
    setWithdrawing(false);

    if (!error) {
      refetchTransactions();
    }
  };

  const handleChangePayoutMethod = () => {
    // Navigate to payout method settings or open modal
    console.log("Change payout method");
  };

  const isLoading = balanceLoading || transactionsLoading;
  const error = balanceError || transactionsError;

  if (isLoading && !balance) {
    return <TransactionsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col gap-8 px-8 py-10">
        <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-6 text-center">
          <p className="text-[#dc2626] text-[14px] mb-4">{error.message}</p>
          <button
            onClick={() => {
              refetchBalance();
              refetchTransactions();
            }}
            className="bg-[#02368c] text-white px-4 py-2 rounded-lg text-[12px]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 px-8 py-10">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <span
          className="text-[12px] text-[#111]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Transactions
        </span>
        <h1
          className="text-[30px] font-medium text-[#111827] leading-[1.2]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Transactions
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex gap-2 items-start">
        {/* Left Column - Balance Card & Table */}
        <div className="flex-1 flex flex-col gap-2">
          <TransactionsBalanceCard balance={availableBalance} />
          <TransactionsTable transactions={tableTransactions} />
        </div>

        {/* Right Column - Withdraw Earnings */}
        <WithdrawEarnings
          availableBalance={availableBalance}
          onWithdraw={handleWithdraw}
          onChangePayoutMethod={handleChangePayoutMethod}
          isWithdrawing={withdrawing}
        />
      </div>
    </div>
  );
}

// Helper function to map API status to component status
function mapTransactionStatus(apiStatus: string): "completed" | "on-hold" | "pending" | "withdrawn" {
  switch (apiStatus.toLowerCase()) {
    case "paid":
    case "completed":
      return "completed";
    case "pending":
      return "pending";
    case "on_hold":
    case "held":
      return "on-hold";
    case "withdrawn":
      return "withdrawn";
    default:
      return "pending";
  }
}
