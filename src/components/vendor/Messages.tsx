"use client";

import { useState } from "react";
import Image from "next/image";

const PhoneCallIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.2221 11.0316C13.2221 11.2483 13.174 11.471 13.0716 11.6876C12.9693 11.9043 12.8369 12.1089 12.6624 12.3015C12.3675 12.6265 12.0425 12.8612 11.6753 13.0117C11.3142 13.1622 10.923 13.2404 10.5017 13.2404C9.88785 13.2404 9.23183 13.096 8.5397 12.8011C7.84757 12.5061 7.15544 12.1089 6.46933 11.6094C5.7772 11.1038 5.12118 10.5441 4.49525 9.9242C3.87535 9.29828 3.31562 8.64226 2.81609 7.95615C2.32257 7.27004 1.92535 6.58392 1.63646 5.90383C1.34757 5.21772 1.20312 4.5617 1.20312 3.93578C1.20312 3.52652 1.27535 3.13531 1.41979 2.7742C1.56424 2.40707 1.79294 2.07004 2.11192 1.76911C2.49711 1.38994 2.9184 1.20337 3.36377 1.20337C3.53229 1.20337 3.70081 1.23948 3.85127 1.3117C4.00775 1.38392 4.14618 1.49226 4.25451 1.64874L5.65081 3.6168C5.75914 3.76726 5.83738 3.90568 5.89155 4.03809C5.94572 4.16448 5.97581 4.29087 5.97581 4.40522C5.97581 4.54967 5.93368 4.69411 5.84942 4.83254C5.77118 4.97096 5.65683 5.11541 5.51238 5.25985L5.05498 5.73531C4.98877 5.80152 4.95868 5.87976 4.95868 5.97605C4.95868 6.0242 4.9647 6.06633 4.97674 6.11448C4.99479 6.16263 5.01285 6.19874 5.02488 6.23485C5.13322 6.43346 5.31979 6.69226 5.58461 7.00522C5.85544 7.31818 6.14433 7.63717 6.45729 7.95615C6.78229 8.27513 7.09525 8.57004 7.41424 8.84087C7.7272 9.10568 7.98599 9.28624 8.19062 9.39457C8.22072 9.40661 8.25683 9.42466 8.29896 9.44272C8.34711 9.46078 8.39525 9.46679 8.44942 9.46679C8.55174 9.46679 8.62998 9.43068 8.69618 9.36448L9.15359 8.91309C9.30405 8.76263 9.4485 8.64828 9.58692 8.57605C9.72535 8.49179 9.86377 8.44967 10.0142 8.44967C10.1286 8.44967 10.249 8.47374 10.3814 8.52791C10.5138 8.58207 10.6522 8.66031 10.8027 8.76263L12.7948 10.177C12.9513 10.2853 13.0596 10.4117 13.1258 10.5622C13.186 10.7126 13.2221 10.8631 13.2221 11.0316Z" stroke="white" strokeWidth="0.9" strokeMiterlimit="10"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 13.3333V8.33333L6.66667 6.66667L0 5V0L15.8333 6.66667L0 13.3333V13.3333" fill="white"/>
  </svg>
);

const AttachmentIcon = () => (
  <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 4.16667V12.0833C9.5 14.2925 7.70917 16.0833 5.5 16.0833C3.29083 16.0833 1.5 14.2925 1.5 12.0833V3.33333C1.5 2.00417 2.5875 0.916667 3.91667 0.916667C5.24583 0.916667 6.33333 2.00417 6.33333 3.33333V11.25C6.33333 11.7083 5.95833 12.0833 5.5 12.0833C5.04167 12.0833 4.66667 11.7083 4.66667 11.25V4.16667H3.33333V11.25C3.33333 12.4458 4.30417 13.4167 5.5 13.4167C6.69583 13.4167 7.66667 12.4458 7.66667 11.25V3.33333C7.66667 1.2675 6.0325 -0.416667 3.91667 -0.416667C1.80083 -0.416667 0.166667 1.2675 0.166667 3.33333V12.0833C0.166667 15.0283 2.555 17.4167 5.5 17.4167C8.445 17.4167 10.8333 15.0283 10.8333 12.0833V4.16667H9.5Z" fill="#44474E"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.33333 5.33333C6.80667 5.33333 8 4.14 8 2.66667C8 1.19333 6.80667 0 5.33333 0C3.86 0 2.66667 1.19333 2.66667 2.66667C2.66667 4.14 3.86 5.33333 5.33333 5.33333ZM5.33333 6.66667C3.55333 6.66667 0 7.56 0 9.33333V10.6667H10.6667V9.33333C10.6667 7.56 7.11333 6.66667 5.33333 6.66667Z" fill="#44474E"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 0C2.24 0 0 2.24 0 5C0 8.75 5 14 5 14C5 14 10 8.75 10 5C10 2.24 7.76 0 5 0ZM5 6.75C4.035 6.75 3.25 5.965 3.25 5C3.25 4.035 4.035 3.25 5 3.25C5.965 3.25 6.75 4.035 6.75 5C6.75 5.965 5.965 6.75 5 6.75Z" fill="#777777"/>
  </svg>
);

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isVendor: boolean;
}

export interface ChatData {
  customerName: string;
  customerAvatar?: string;
  isOnline: boolean;
  serviceName: string;
  servicePrice: number;
  serviceImage?: string;
  distance: string;
  serviceTime: string;
  bookingDate: string;
  bookingTime: string;
  preferredTime: string;
  messages: Message[];
}

interface MessagesProps {
  chat?: ChatData;
  onSendMessage?: (message: string) => void;
  onCall?: () => void;
  onAttachment?: () => void;
}

const defaultChat: ChatData = {
  customerName: "Ama Owusu",
  isOnline: true,
  serviceName: "Home Cleaning",
  servicePrice: 60,
  distance: "1.8 km",
  serviceTime: "Today, 2:00 PM",
  bookingDate: "Today",
  bookingTime: "3:00 PM",
  preferredTime: "3:00 PM - 5:00 PM",
  messages: [
    {
      id: "1",
      text: "Hi, can you arrive 15 minutes earlier if possible?",
      timestamp: "9:41 AM",
      isVendor: false,
    },
    {
      id: "2",
      text: "Sure, I can be there by 1:45 instead of 2:00. See you soon!",
      timestamp: "9:43 AM",
      isVendor: true,
    },
    {
      id: "3",
      text: "Great, thank you!",
      timestamp: "9:43 AM",
      isVendor: false,
    },
  ],
};

export function Messages({
  chat = defaultChat,
  onSendMessage,
  onCall,
  onAttachment,
}: MessagesProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage?.(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-6 p-8 h-full">
      {/* Page Header */}
      <div className="flex items-center">
        <h1
          className="text-[30px] font-medium text-[#111827] leading-[1.2]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Messages
        </h1>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="bg-[#e5efff] p-4 flex items-center justify-between shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-[#e5eeff] flex items-center justify-center overflow-hidden">
                {chat.customerAvatar ? (
                  <Image
                    src={chat.customerAvatar}
                    alt={chat.customerName}
                    width={44}
                    height={44}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-[14px] font-medium text-[#002260]">
                    {chat.customerName.split(" ").map(n => n[0]).join("")}
                  </span>
                )}
              </div>
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#006242] rounded-full border-2 border-white" />
              )}
            </div>
            <span
              className="text-[18px] font-medium text-[#131b2e]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {chat.customerName}
            </span>
          </div>
          <button
            onClick={onCall}
            className="w-[30px] h-[30px] bg-[#02368c] rounded-full flex items-center justify-center"
          >
            <PhoneCallIcon />
          </button>
        </div>

        {/* Job Info Cards */}
        <div className="flex gap-4 p-4">
          {/* Service Card */}
          <div className="flex-1 bg-white border border-black/10 rounded-lg p-4 shadow-[0px_1px_1px_0px_rgba(26,43,76,0.05)]">
            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 rounded-full bg-[#f1f5f9] overflow-hidden flex-shrink-0">
                {chat.serviceImage ? (
                  <Image
                    src={chat.serviceImage}
                    alt={chat.serviceName}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#e5eeff] to-[#d9e8ff]" />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between">
                  <span
                    className="text-[14px] text-[#111]"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    {chat.serviceName}
                  </span>
                  <span
                    className="text-[14px] text-[#02368c]"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    ₵{chat.servicePrice}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <PersonIcon />
                  <span
                    className="text-[14px] text-[#44474e]"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    {chat.customerName}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <LocationIcon />
                  <span
                    className="text-[14px] text-[#777]"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    {chat.distance} · {chat.serviceTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="flex-1 bg-white border border-black/10 rounded-lg p-4 shadow-[0px_1px_1px_0px_rgba(26,43,76,0.05)]">
            <div className="flex flex-col gap-1.5">
              <span
                className="text-[14px] text-[#0f172a]"
                style={{ fontFamily: "Roboto Flex, sans-serif" }}
              >
                Booking Schedule
              </span>
              <div className="pt-1 flex flex-col gap-1">
                <span
                  className="text-[14px] text-[#0f172a]"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  {chat.bookingDate}, {chat.bookingTime}
                </span>
                <span
                  className="text-[14px] text-[#64748b]"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  Preferred time: {chat.preferredTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {/* Date Divider */}
          <div className="flex justify-center pb-3">
            <span
              className="text-[12px] text-[#777]"
              style={{ fontFamily: "Roboto Flex, sans-serif" }}
            >
              Today, 9:41 AM
            </span>
          </div>

          {/* Messages */}
          {chat.messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col max-w-[290px] ${
                message.isVendor ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <div
                className={`px-3 py-3 shadow-[0px_4px_6px_0px_rgba(26,43,76,0.04)] ${
                  message.isVendor
                    ? "bg-[#02368c] rounded-tl-[12px] rounded-tr-[2px] rounded-bl-[12px] rounded-br-[12px]"
                    : "bg-[#f5f5f5] rounded-tl-[2px] rounded-tr-[12px] rounded-bl-[12px] rounded-br-[12px]"
                }`}
              >
                <p
                  className={`text-[14px] leading-normal ${
                    message.isVendor ? "text-white" : "text-[#111]"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {message.text}
                </p>
              </div>
              <span
                className={`text-[12px] text-[#777] pt-1 ${
                  message.isVendor ? "pr-2" : "pl-2"
                }`}
                style={{ fontFamily: "Roboto Flex, sans-serif" }}
              >
                {message.timestamp}
              </span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="bg-white px-5 py-[22px] flex items-center gap-2">
          <div className="flex-1 bg-[#fcf9f8] border border-black/10 rounded-full shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] flex items-center px-3 py-2.5">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-[12px] text-[#44474e] outline-none px-2"
              style={{ fontFamily: "Roboto Flex, sans-serif" }}
            />
            <button onClick={onAttachment} className="p-1">
              <AttachmentIcon />
            </button>
          </div>
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-[#02368c] rounded-full flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(254,173,77,0.2)]"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
