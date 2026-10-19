"use client";

import Image from "next/image";

interface TransactionsBalanceCardProps {
  balance: number;
}

export function TransactionsBalanceCard({ balance }: TransactionsBalanceCardProps) {
  return (
    <div className="bg-[#02368c] rounded-[14px] px-7 py-9 shadow-[0px_4px_12px_0px_rgba(26,43,76,0.08)] relative overflow-hidden">
      <div className="absolute right-0 top-[-61px] w-[483px] h-[385px] pointer-events-none">
        <Image
          src="/images/vendor/transactions/wallet-3d.png"
          alt="Wallet"
          width={483}
          height={385}
          className="object-contain"
        />
      </div>
      <div className="relative z-10 flex flex-col gap-3 text-white">
        <span
          className="text-[20px]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Available Balance
        </span>
        <span
          className="text-[36px] font-bold tracking-[-0.64px]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          ₵{balance.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
