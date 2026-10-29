"use client";

import { useState } from "react";

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18V18M6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11V11" fill="#575F69"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.6667 21.6667L17.3333 17.3333H6.5C5.90417 17.3333 5.3941 17.1212 4.96979 16.6969C4.54549 16.2726 4.33333 15.7625 4.33333 15.1667V14.0833H16.25C16.8458 14.0833 17.3559 13.8712 17.7802 13.4469C18.2045 13.0226 18.4167 12.5125 18.4167 11.9167V4.33333H19.5C20.0958 4.33333 20.6059 4.54549 21.0302 4.96979C21.4545 5.3941 21.6667 5.90417 21.6667 6.5V21.6667V21.6667M2.16667 11.0229L3.43958 9.75H14.0833V9.75V9.75V2.16667V2.16667V2.16667H2.16667V2.16667V2.16667V11.0229V11.0229M0 16.25V2.16667C0 1.57083 0.212153 1.06076 0.636458 0.636458C1.06076 0.212153 1.57083 0 2.16667 0H14.0833C14.6792 0 15.1892 0.212153 15.6135 0.636458C16.0378 1.06076 16.25 1.57083 16.25 2.16667V9.75C16.25 10.3458 16.0378 10.8559 15.6135 11.2802C15.1892 11.7045 14.6792 11.9167 14.0833 11.9167H4.33333L0 16.25V16.25M2.16667 9.75V2.16667V2.16667V2.16667V2.16667V2.16667V2.16667V9.75V9.75V9.75V9.75V9.75V9.75" fill="#02368C"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.3625 19.5C16.1056 19.5 13.8757 19.008 11.6729 18.024C9.47014 17.0399 7.46597 15.6451 5.66042 13.8396C3.85486 12.034 2.46007 10.0299 1.47604 7.82708C0.492014 5.62431 0 3.39444 0 1.1375C0 0.8125 0.108333 0.541667 0.325 0.325C0.541667 0.108333 0.8125 0 1.1375 0H5.525C5.77778 0 6.00347 0.0857639 6.20208 0.257292C6.40069 0.428819 6.51806 0.631944 6.55417 0.866667L7.25833 4.65833C7.29444 4.94722 7.28542 5.19097 7.23125 5.38958C7.17708 5.58819 7.07778 5.75972 6.93333 5.90417L4.30625 8.55833C4.66736 9.22639 5.09618 9.87188 5.59271 10.4948C6.08924 11.1177 6.63542 11.7181 7.23125 12.2958C7.79097 12.8556 8.37778 13.3747 8.99167 13.8531C9.60556 14.3316 10.2556 14.7694 10.9417 15.1667L13.4875 12.6208C13.65 12.4583 13.8622 12.3365 14.124 12.2552C14.3858 12.174 14.6431 12.1514 14.8958 12.1875L18.6333 12.9458C18.8861 13.0181 19.0938 13.149 19.2563 13.3385C19.4188 13.5281 19.5 13.7403 19.5 13.975V18.3625C19.5 18.6875 19.3917 18.9583 19.175 19.175C18.9583 19.3917 18.6875 19.5 18.3625 19.5V19.5M3.27708 6.5L5.06458 4.7125V4.7125V4.7125L4.60417 2.16667V2.16667V2.16667H2.19375V2.16667V2.16667C2.28403 2.90694 2.41042 3.63819 2.57292 4.36042C2.73542 5.08264 2.97014 5.79583 3.27708 6.5V6.5M12.9729 16.1958C13.6771 16.5028 14.3948 16.7465 15.126 16.9271C15.8573 17.1076 16.5931 17.225 17.3333 17.2792V17.2792V17.2792V14.8958V14.8958V14.8958L14.7875 14.3813V14.3813V14.3813L12.9729 16.1958V16.1958" fill="#131B2E"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 7L0 1.5L1.5 0L5.5 4L9.5 0L11 1.5L5.5 7Z" fill="#575F69"/>
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 0L11 5.5L9.5 7L5.5 3L1.5 7L0 5.5L5.5 0Z" fill="#575F69"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 0L15 5.5L9 11V6.5H0V4.5H9V0Z" fill="#02368C"/>
  </svg>
);

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface HelpCenterProps {
  faqs?: FAQItem[];
  onStartChat?: () => void;
  onCall?: () => void;
  onSearch?: (query: string) => void;
}

const defaultFAQs: FAQItem[] = [
  {
    id: "1",
    question: "When will I receive my earnings?",
    answer: "Earnings from completed domestic jobs are secured within the WallKas Escrow Vault until the homeowner validates the service handover using their confidential 4-digit PIN. Once entered on your technician terminal, funds are cleared automatically and disbursed to your registered MTN Mobile Money or Telecel Cash wallet within 60 seconds.",
  },
  {
    id: "2",
    question: "How do I accept a new job request?",
    answer: "When a new job request comes in, you'll receive a notification in your technician app. Tap on the notification to view the job details, then tap 'Accept' to confirm you're available. Make sure to accept within the time window shown.",
  },
  {
    id: "3",
    question: "How do I cancel or reschedule a booking?",
    answer: "To cancel or reschedule a booking, go to your Jobs section, find the booking, and tap on it. You'll see options to cancel or request a reschedule. Note that canceling too frequently may affect your service rating.",
  },
  {
    id: "4",
    question: "How do I update my weekly service availability?",
    answer: "Go to Settings > Availability in your technician app. Here you can set your working hours for each day of the week, mark days as unavailable, and add multiple time slots per day.",
  },
  {
    id: "5",
    question: "How do I adjust my standard service diagnostic pricing?",
    answer: "Navigate to Settings > Services & Pricing. Select the service you want to modify and update the diagnostic fee. Changes take effect immediately for new bookings.",
  },
  {
    id: "6",
    question: 'Why is my payment status showing "Processing"?',
    answer: "A 'Processing' status means the payment is being verified and transferred to your mobile money account. This typically takes 60 seconds but may take longer during high-volume periods or network issues.",
  },
  {
    id: "7",
    question: "How do I update my professional trade certifications?",
    answer: "Go to Profile > Certifications in your technician app. Upload clear photos of your valid certifications. Our team will verify them within 24-48 hours.",
  },
  {
    id: "8",
    question: "How do I contact a customer prior to arrival?",
    answer: "From your active job screen, tap the phone icon next to the customer's name. You can also send a message through the in-app chat. This helps coordinate arrival time and any special instructions.",
  },
];

export function HelpCenter({
  faqs = defaultFAQs,
  onStartChat,
  onCall,
  onSearch,
}: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("1");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-8 px-8 py-10">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1
          className="text-[30px] font-medium text-[#111827] leading-[1.2]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Help Center
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-2">
        {/* Search Hero */}
        <div
          className="rounded-xl p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          style={{ background: "linear-gradient(169.5deg, #e2e7ff 0%, #eaedff 50%, #ffffff 100%)" }}
        >
          <div className="max-w-[768px]">
            <h2
              className="text-[16px] text-[#131b2e] pt-1"
              style={{ fontFamily: "Roboto Flex, sans-serif" }}
            >
              How can we help?
            </h2>
            <p
              className="text-[16px] text-[#424655] pb-5"
              style={{ fontFamily: "Roboto Flex, sans-serif" }}
            >
              Search for real-time help with escrow payouts, on-site PIN handovers, Ghana
              Card credentialing, and dispute mediation.
            </p>
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] flex items-center">
              <div className="pl-4 flex items-center">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help, bookings, payments, or account issues..."
                className="flex-1 h-[56px] pl-2 pr-8 py-[18px] text-[16px] text-[#575f69] outline-none"
                style={{ fontFamily: "Roboto Flex, sans-serif" }}
              />
            </form>
          </div>
        </div>

        {/* Common Questions */}
        <div className="py-3">
          <h2
            className="text-[16px] font-medium text-[#222]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Common Questions
          </h2>
          <div className="pt-4">
            <div className="bg-white rounded-xl shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] p-2">
              {faqs.map((faq, index) => (
                <div key={faq.id} className={index > 0 ? "pt-1" : ""}>
                  <div
                    className={`rounded-lg overflow-hidden ${
                      expandedId === faq.id ? "bg-[#f2f3ff]" : ""
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-4 flex items-center justify-between text-left"
                    >
                      <span
                        className="text-[16px] text-[#131b2e]"
                        style={{ fontFamily: "Roboto Flex, sans-serif" }}
                      >
                        {faq.question}
                      </span>
                      {expandedId === faq.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </button>
                    {expandedId === faq.id && (
                      <div className="px-4 pb-4">
                        <p
                          className="text-[16px] text-[#424655] leading-normal"
                          style={{ fontFamily: "Roboto Flex, sans-serif" }}
                        >
                          {faq.answer.split("60 seconds").map((part, i, arr) =>
                            i < arr.length - 1 ? (
                              <span key={i}>
                                {part}
                                <span className="text-[#131b2e] font-medium">60 seconds</span>
                              </span>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Need Direct Assistance */}
        <div>
          <h2
            className="text-[16px] font-medium text-[#222]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Need Direct Assistance?
          </h2>
          <div className="pt-4 flex gap-4">
            {/* Chat with Support */}
            <div className="bg-white rounded-xl shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] p-6 w-[309px] flex flex-col gap-4">
              <div className="pb-6 flex flex-col gap-1">
                <div className="w-12 h-12 bg-[rgba(0,75,197,0.1)] rounded-lg flex items-center justify-center">
                  <ChatIcon />
                </div>
                <div className="pt-3">
                  <p
                    className="text-[16px] text-[#131b2e]"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    Chat with Support
                  </p>
                </div>
                <p
                  className="text-[16px] text-[#424655] leading-normal"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  Get instant resolution from our domestic pro dispatchers directly inside your technician app.
                </p>
              </div>
              <button
                onClick={onStartChat}
                className="flex items-center gap-1 text-[16px] text-[#02368c]"
                style={{ fontFamily: "Roboto Flex, sans-serif" }}
              >
                Start Chat
                <ArrowRightIcon />
              </button>
            </div>

            {/* Call Support Hotline */}
            <div className="bg-white rounded-xl shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] p-6 w-[310px] flex flex-col gap-4">
              <div className="pb-6 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-[#eaedff] rounded-lg flex items-center justify-center">
                    <PhoneIcon />
                  </div>
                  <span
                    className="bg-[#eaedff] px-2.5 py-1 rounded-full text-[16px] text-[#424655]"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    Voice Hotline
                  </span>
                </div>
                <div className="pt-3">
                  <p
                    className="text-[16px] text-[#131b2e]"
                    style={{ fontFamily: "Roboto Flex, sans-serif" }}
                  >
                    Call Support Hotline
                  </p>
                </div>
                <p
                  className="text-[16px] text-[#424655] leading-normal"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  Speak directly with a WallKas pro account manager fluent in English, Twi, Ga, and Hausa.
                </p>
              </div>
              <button
                onClick={onCall}
                className="flex items-center gap-1 text-[16px] text-[#02368c]"
                style={{ fontFamily: "Roboto Flex, sans-serif" }}
              >
                Call
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
