"use client";

import Image from "next/image";

const LocationIcon = () => (
  <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 2.57145C4.09545 2.57145 3.69998 2.69713 3.36361 2.93259C3.02723 3.16806 2.76506 3.50273 2.61025 3.89429C2.45543 4.28585 2.41492 4.71671 2.49385 5.13239C2.57277 5.54807 2.76758 5.92989 3.05365 6.22958C3.33971 6.52926 3.70417 6.73335 4.10095 6.81604C4.49773 6.89872 4.909 6.85628 5.28276 6.69409C5.65652 6.53191 5.97598 6.25725 6.20073 5.90485C6.42549 5.55246 6.54545 5.13815 6.54545 4.71433C6.54545 4.14601 6.32995 3.60096 5.94635 3.19909C5.56276 2.79722 5.04249 2.57145 4.5 2.57145ZM4.5 6.00006C4.25727 6.00006 4.01999 5.92465 3.81816 5.78338C3.61634 5.6421 3.45904 5.4413 3.36615 5.20636C3.27326 4.97142 3.24895 4.71291 3.29631 4.4635C3.34366 4.21409 3.46055 3.985 3.63219 3.80519C3.80382 3.62537 4.0225 3.50292 4.26057 3.45331C4.49864 3.4037 4.7454 3.42916 4.96966 3.52648C5.19391 3.62379 5.38559 3.78858 5.52044 4.00002C5.65529 4.21146 5.72727 4.46004 5.72727 4.71433C5.72727 5.05533 5.59797 5.38236 5.36781 5.62348C5.13765 5.8646 4.82549 6.00006 4.5 6.00006ZM4.5 0C3.30694 0.00141791 2.16313 0.498561 1.31951 1.38236C0.475894 2.26616 0.00135344 3.46445 0 4.71433C0 6.39649 0.741989 8.17937 2.14773 9.87064C2.77937 10.6349 3.49029 11.323 4.26733 11.9224C4.33611 11.9729 4.41806 12 4.50205 12C4.58603 12 4.66798 11.9729 4.73676 11.9224C5.51237 11.3228 6.2219 10.6346 6.85227 9.87064C8.25597 8.17937 9 6.39649 9 4.71433C8.99865 3.46445 8.52411 2.26616 7.68049 1.38236C6.83687 0.498561 5.69306 0.00141791 4.5 0ZM4.5 11.0358C3.65472 10.3394 0.818182 7.78133 0.818182 4.71433C0.818182 3.69134 1.20609 2.71026 1.89656 1.98689C2.58704 1.26353 3.52352 0.857151 4.5 0.857151C5.47648 0.857151 6.41296 1.26353 7.10344 1.98689C7.79391 2.71026 8.18182 3.69134 8.18182 4.71433C8.18182 7.78026 5.34528 10.3394 4.5 11.0358Z" fill="#222222"/>
  </svg>
);

const NavigationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.7524 0.250854C11.6446 0.14314 11.51 0.0661066 11.3625 0.0276888C11.215 -0.010729 11.0599 -0.00914251 10.9133 0.0322849H10.9052L0.619945 3.15225C0.452968 3.20035 0.304556 3.29805 0.194376 3.43239C0.0841952 3.56673 0.0174475 3.73136 0.00297801 3.90448C-0.0114914 4.0776 0.0270004 4.25103 0.113353 4.40179C0.199705 4.55254 0.329841 4.67351 0.486516 4.74865L5.03703 6.96434L7.25012 11.5109C7.31896 11.6577 7.4284 11.7818 7.56551 11.8685C7.70262 11.9552 7.86168 12.0008 8.0239 12C8.04855 12 8.0732 11.9989 8.09785 11.9968C8.27088 11.9828 8.43549 11.9162 8.56958 11.806C8.70368 11.6958 8.80085 11.5472 8.84805 11.3802L11.9668 1.09781C11.9668 1.09513 11.9668 1.09245 11.9668 1.08977C12.0087 0.943504 12.011 0.788701 11.9733 0.641266C11.9357 0.493831 11.8594 0.359079 11.7524 0.250854ZM8.02873 11.1348L8.02605 11.1423V11.1386L5.8794 6.7297L8.45152 4.1583C8.52852 4.07728 8.57081 3.96939 8.56938 3.85763C8.56795 3.74588 8.52291 3.63911 8.44386 3.56008C8.36481 3.48105 8.258 3.43602 8.14622 3.43459C8.03443 3.43316 7.92651 3.47544 7.84546 3.55242L5.27334 6.12381L0.861617 3.97777H0.857866H0.865368L11.1458 0.857274L8.02873 11.1348Z" fill="#02368C"/>
  </svg>
);

const ClockGrayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.00259971 4.80025 -0.11622 6.00666 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0891 10.3295 10.3201 10.9888 9.33342C11.6481 8.34672 12 7.18669 12 6C11.9983 4.40922 11.3656 2.88407 10.2408 1.75921C9.11593 0.63436 7.59078 0.0016799 6 0ZM6 11.0769C4.99588 11.0769 4.01431 10.7792 3.17941 10.2213C2.34452 9.66345 1.6938 8.87054 1.30954 7.94285C0.925277 7.01517 0.824737 5.99437 1.02063 5.00954C1.21653 4.02471 1.70006 3.12009 2.41008 2.41007C3.1201 1.70005 4.02472 1.21652 5.00954 1.02063C5.99437 0.824734 7.01517 0.925274 7.94286 1.30953C8.87054 1.69379 9.66345 2.34452 10.2213 3.17941C10.7792 4.01431 11.0769 4.99588 11.0769 6C11.0754 7.34601 10.54 8.63646 9.58824 9.58824C8.63646 10.54 7.34602 11.0754 6 11.0769ZM9.69231 6C9.69231 6.12241 9.64368 6.2398 9.55713 6.32636C9.47057 6.41291 9.35318 6.46154 9.23077 6.46154H6C5.87759 6.46154 5.7602 6.41291 5.67364 6.32636C5.58709 6.2398 5.53846 6.12241 5.53846 6V2.76923C5.53846 2.64682 5.58709 2.52943 5.67364 2.44287C5.7602 2.35632 5.87759 2.30769 6 2.30769C6.12241 2.30769 6.2398 2.35632 6.32636 2.44287C6.41291 2.52943 6.46154 2.64682 6.46154 2.76923V5.53846H9.23077C9.35318 5.53846 9.47057 5.58709 9.55713 5.67364C9.64368 5.7602 9.69231 5.87759 9.69231 6Z" fill="#222222"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#02368c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

interface NewRequest {
  id: string;
  service: string;
  price: string;
  customer: string;
  avatar: string;
  distance: string;
  time: string;
  bookingId?: string;
}

interface NewRequestsProps {
  requests?: NewRequest[];
  onAccept?: (bookingId: string) => void;
  onDecline?: (bookingId: string) => void;
}

const defaultRequests: NewRequest[] = [
  {
    id: "#KB 12345",
    service: "Home Cleaning",
    price: "GH₵ 60.00",
    customer: "Kofi Asante",
    avatar: "/images/vendor/customer-avatar.png",
    distance: "1.8 Km Away",
    time: "1:20pm",
  },
  {
    id: "#KB 12345",
    service: "Home Cleaning",
    price: "GH₵ 60.00",
    customer: "Kofi Asante",
    avatar: "/images/vendor/customer-avatar.png",
    distance: "1.8 Km Away",
    time: "1:20pm",
  },
  {
    id: "#KB 12345",
    service: "Home Cleaning",
    price: "GH₵ 60.00",
    customer: "Kofi Asante",
    avatar: "/images/vendor/customer-avatar.png",
    distance: "1.8 Km Away",
    time: "1:20pm",
  },
];

export function NewRequests({ requests = defaultRequests, onAccept, onDecline }: NewRequestsProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-[18px] border-b border-[rgba(0,0,0,0.12)]">
        <h3
          className="text-[16px] font-medium text-[#222]"
          style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
        >
          New Requests
        </h3>
        <button
          className="text-[12px] text-[#02368c] border border-[#02368c] px-3 py-2 rounded-md shadow-[0px_1px_1px_0px_rgba(16,24,40,0.05)]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          View All Bookings
        </button>
      </div>

      {/* Request Cards */}
      <div className="p-4 flex gap-3">
        {requests.map((request, index) => (
          <div
            key={index}
            className="flex-1 border border-[rgba(226,232,240,0.8)] rounded-xl px-[19px] py-[17px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(248, 250, 252, 0.6) 0%, rgba(248, 250, 252, 0.6) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
            }}
          >
            <div className="flex flex-col gap-6">
              {/* Request Info */}
              <div className="flex flex-col gap-3">
                {/* Top row: ID, Service, Price, Details */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <span
                        className="text-[12px] text-[#666]"
                        style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                      >
                        {request.id}
                      </span>
                      <h4
                        className="text-[18px] font-semibold text-[#0f172a] leading-[1.2]"
                        style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                      >
                        {request.service}
                      </h4>
                    </div>
                    <p
                      className="text-[16px] font-bold text-[#02368c]"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      {request.price}
                    </p>
                  </div>
                  <button
                    className="flex items-center text-[12px] font-medium text-[#02368c]"
                    style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                  >
                    Details
                    <ChevronRightIcon />
                  </button>
                </div>

                {/* Customer Info Box */}
                <div className="bg-white rounded-lg p-2 flex flex-col gap-[10px]">
                  {/* Customer Avatar and Name */}
                  <div className="flex items-center gap-2">
                    <Image
                      src={request.avatar}
                      alt={request.customer}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span
                      className="text-[16px] text-[#222]"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      {request.customer}
                    </span>
                  </div>

                  {/* Location and Time */}
                  <div className="border-t border-[rgba(0,0,0,0.08)] pt-[10px] flex flex-col gap-[10px]">
                    <div className="flex items-center gap-2">
                      <div className="w-[13px] flex items-center">
                        <LocationIcon />
                      </div>
                      <span
                        className="text-[16px] text-[#222]"
                        style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                      >
                        {request.distance}
                      </span>
                      <NavigationIcon />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-[13px] flex items-center">
                        <ClockGrayIcon />
                      </div>
                      <span
                        className="text-[16px] text-[#222]"
                        style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                      >
                        {request.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => onDecline?.(request.bookingId || "")}
                  className="flex-1 bg-white border border-[#ff3b30] text-[#ff3b30] text-[12px] font-medium py-3 rounded-lg shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] hover:bg-[#fff5f5] transition-colors"
                  style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                >
                  Decline
                </button>
                <button
                  onClick={() => onAccept?.(request.bookingId || "")}
                  className="flex-1 bg-[#02368c] text-white text-[12px] font-medium py-3 rounded-lg shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] hover:bg-[#012c70] transition-colors"
                  style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
