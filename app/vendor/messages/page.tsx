"use client";

import { Messages } from "@/src/components/vendor";

export default function MessagesPage() {
  const handleSendMessage = (message: string) => {
    console.log("Send message:", message);
  };

  const handleCall = () => {
    console.log("Call customer");
  };

  const handleAttachment = () => {
    console.log("Add attachment");
  };

  return (
    <Messages
      onSendMessage={handleSendMessage}
      onCall={handleCall}
      onAttachment={handleAttachment}
    />
  );
}
