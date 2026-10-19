"use client";

import { HelpCenter } from "@/src/components/vendor";

export default function HelpCenterPage() {
  const handleStartChat = () => {
    console.log("Start chat");
  };

  const handleCall = () => {
    console.log("Call support");
  };

  const handleSearch = (query: string) => {
    console.log("Search:", query);
  };

  return (
    <HelpCenter
      onStartChat={handleStartChat}
      onCall={handleCall}
      onSearch={handleSearch}
    />
  );
}
