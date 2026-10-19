"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface VendorHeaderProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  messageCount?: number;
}

interface UserData {
  fullName?: string;
  avatarUrl?: string;
}

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.2158 17.615L15.3303 14.73C16.1666 13.726 16.5836 12.4381 16.4946 11.1344C16.4056 9.83062 15.8174 8.61139 14.8524 7.7303C13.8873 6.84921 12.6197 6.37409 11.3133 6.40378C10.0069 6.43347 8.76216 6.96568 7.83814 7.88971C6.91411 8.81374 6.38189 10.0584 6.3522 11.3649C6.32251 12.6713 6.79763 13.9389 7.67873 14.9039C8.55982 15.869 9.77905 16.4572 11.0828 16.5462C12.3865 16.6352 13.6744 16.2182 14.6785 15.3818L17.5634 18.2674C17.6062 18.3102 17.6571 18.3442 17.7131 18.3674C17.769 18.3905 17.829 18.4025 17.8896 18.4025C17.9502 18.4025 18.0102 18.3905 18.0661 18.3674C18.1221 18.3442 18.1729 18.3102 18.2158 18.2674C18.2586 18.2245 18.2926 18.1737 18.3158 18.1177C18.339 18.0617 18.3509 18.0017 18.3509 17.9412C18.3509 17.8806 18.339 17.8206 18.3158 17.7646C18.2926 17.7087 18.2586 17.6578 18.2158 17.615ZM7.28571 11.4866C7.28571 10.666 7.52906 9.86373 7.985 9.18137C8.44093 8.49902 9.08897 7.96719 9.84717 7.65313C10.6054 7.33908 11.4397 7.25691 12.2446 7.41701C13.0494 7.57711 13.7888 7.9723 14.3691 8.5526C14.9494 9.13289 15.3446 9.87224 15.5047 10.6771C15.6648 11.482 15.5826 12.3163 15.2686 13.0745C14.9545 13.8327 14.4227 14.4808 13.7403 14.9367C13.058 15.3926 12.2557 15.636 11.4351 15.636C10.335 15.6348 9.28026 15.1972 8.50237 14.4193C7.72448 13.6414 7.28693 12.5867 7.28571 11.4866Z" fill="black"/>
  </svg>
);

const NotificationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12C22 16.418 17.97 19.9999 13 19.9999C11.5286 20.005 10.0748 19.6807 8.745 19.0509L4 19.9999L5.395 16.28C4.512 15.042 4 13.574 4 12C4 7.58199 8.03 4 13 4C17.97 4 22 7.58199 22 12Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MessageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.143 17.082C11.041 17.3071 12.959 17.3071 14.857 17.082C16.7202 16.8614 18.5509 16.4217 20.311 15.772C18.8204 14.1208 17.9967 11.9745 18 9.75V9C18 7.4087 17.3679 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.88258 3.63214 7.75736 4.75736C6.63214 5.88258 6 7.4087 6 9V9.75C6.00302 11.9746 5.17899 14.121 3.688 15.772C5.421 16.412 7.248 16.857 9.143 17.082ZM14.857 17.082C15.0011 17.5319 15.0369 18.0094 14.9616 18.4757C14.8862 18.942 14.7018 19.384 14.4234 19.7656C14.1449 20.1472 13.7803 20.4576 13.3592 20.6716C12.9381 20.8856 12.4724 20.9972 12 20.9972C11.5276 20.9972 11.0619 20.8856 10.6408 20.6716C10.2197 20.4576 9.85507 20.1472 9.57662 19.7656C9.29817 19.384 9.11376 18.942 9.03841 18.4757C8.96306 18.0094 8.9989 17.5319 9.143 17.082" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function VendorHeader({
  userName: propUserName,
  userAvatar: propUserAvatar,
  notificationCount = 0,
  messageCount = 0,
}: VendorHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const stored = localStorage.getItem("kasazon_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          setUserData({
            fullName: parsed.fullName,
            avatarUrl: parsed.avatarUrl,
          });
        }
      } catch {
        // Ignore parse errors
      }
    };

    loadUserData();

    // Listen for storage changes
    window.addEventListener("storage", loadUserData);
    return () => window.removeEventListener("storage", loadUserData);
  }, []);

  // Use props if provided, otherwise fall back to stored data or defaults
  const userName = propUserName || userData?.fullName || "Vendor";
  const userAvatar = propUserAvatar || userData?.avatarUrl || "/images/vendor/header-avatar.png";

  return (
    <header className="fixed top-0 left-[248px] right-0 h-auto bg-white border-b border-[rgba(0,0,0,0.08)] flex items-center justify-between px-8 py-6 z-40">
      {/* Search Bar */}
      <div className="flex items-center bg-[rgba(248,249,255,0.4)] border border-[#e1e1e1] rounded-lg pl-[9px] pr-[33px] py-[9px] w-[333px] overflow-hidden">
        <div className="shrink-0">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search booking ID, provider, customer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-[12px] text-[#434652] placeholder-[#434652] outline-none font-normal whitespace-nowrap"
          style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative h-[28px] w-[29px]">
          <div className="absolute left-0 top-[4px] w-6 h-6">
            <NotificationIcon />
          </div>
          {notificationCount > 0 && (
            <div className="absolute left-[14px] top-[-2px] bg-[#dd644e] rounded-[17px] px-[5px] py-[1.5px] flex items-center justify-center overflow-hidden">
              <span
                className="text-[12px] font-semibold text-white text-center tracking-[0.15px]"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {notificationCount}
              </span>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="relative h-[28px] w-[29px]">
          <div className="absolute left-0 top-[4px] w-6 h-6">
            <MessageIcon />
          </div>
          {messageCount > 0 && (
            <div className="absolute left-[14px] top-[-2px] bg-[#dd644e] rounded-[17px] px-[5px] py-[1.5px] flex items-center justify-center overflow-hidden">
              <span
                className="text-[12px] font-semibold text-white text-center tracking-[0.15px]"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {messageCount}
              </span>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <div className="relative w-[42px] h-[42px] rounded-full overflow-hidden shrink-0">
            <Image
              src={userAvatar}
              alt={userName}
              fill
              className="object-cover"
            />
          </div>
          <span
            className="text-[16px] font-medium text-[#222] tracking-[0.15px] whitespace-nowrap"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {userName}
          </span>
        </div>
      </div>
    </header>
  );
}
