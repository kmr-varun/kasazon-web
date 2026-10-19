"use client";

const UserIcon = () => (
  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.9263 11.2698C11.9753 9.69168 10.5099 8.56006 8.79966 8.02362C9.64561 7.5402 10.3029 6.80359 10.6705 5.9269C11.0381 5.05021 11.0958 4.08191 10.8346 3.17072C10.5734 2.25953 10.0079 1.45582 9.22485 0.883022C8.4418 0.310221 7.48451 0 6.5 0C5.51549 0 4.55821 0.310221 3.77515 0.883022C2.99209 1.45582 2.42655 2.25953 2.1654 3.17072C1.90424 4.08191 1.9619 5.05021 2.32952 5.9269C2.69714 6.80359 3.35439 7.5402 4.20034 8.02362C2.49012 8.55946 1.02466 9.69108 0.0737016 11.2698C0.0388283 11.3244 0.0156971 11.3851 0.00567277 11.4484C-0.00435158 11.5117 -0.00106602 11.5763 0.0153356 11.6384C0.0317372 11.7005 0.0609227 11.7588 0.10117 11.8098C0.141417 11.8609 0.191911 11.9037 0.249672 11.9357C0.307434 11.9677 0.371292 11.9883 0.43748 11.9963C0.503669 12.0042 0.570846 11.9994 0.635048 11.982C0.699251 11.9646 0.759178 11.9351 0.811295 11.8951C0.863411 11.8552 0.906661 11.8056 0.938492 11.7493C2.11486 9.79776 4.1941 8.63258 6.5 8.63258C8.8059 8.63258 10.8851 9.79776 12.0615 11.7493C12.0933 11.8056 12.1366 11.8552 12.1887 11.8951C12.2408 11.9351 12.3007 11.9646 12.365 11.982C12.4292 11.9994 12.4963 12.0042 12.5625 11.9963C12.6287 11.9883 12.6926 11.9677 12.7503 11.9357C12.8081 11.9037 12.8586 11.8609 12.8988 11.8098C12.9391 11.7588 12.9683 11.7005 12.9847 11.6384C13.0011 11.5763 13.0044 11.5117 12.9943 11.4484C12.9843 11.3851 12.9612 11.3244 12.9263 11.2698ZM3.00337 4.31711C3.00337 3.65326 3.20845 3.00432 3.59266 2.45235C3.97688 1.90038 4.52297 1.47017 5.1619 1.21612C5.80082 0.962078 6.50388 0.895609 7.18216 1.02512C7.86044 1.15463 8.48348 1.4743 8.97249 1.94372C9.4615 2.41313 9.79452 3.0112 9.92944 3.66229C10.0644 4.31338 9.99511 4.98826 9.73046 5.60158C9.46581 6.2149 9.01764 6.73911 8.44262 7.10792C7.8676 7.47674 7.19157 7.67359 6.5 7.67359C5.57294 7.67264 4.68414 7.3187 4.02861 6.68945C3.37308 6.06019 3.00437 5.20701 3.00337 4.31711Z" fill="#222222"/>
  </svg>
);

const ClockBlueIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.00259971 4.80025 -0.11622 6.00666 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0891 10.3295 10.3201 10.9888 9.33342C11.6481 8.34672 12 7.18669 12 6C11.9983 4.40922 11.3656 2.88407 10.2408 1.75921C9.11593 0.63436 7.59078 0.0016799 6 0ZM6 11.0769C4.99588 11.0769 4.01431 10.7792 3.17941 10.2213C2.34452 9.66345 1.6938 8.87054 1.30954 7.94285C0.925277 7.01517 0.824737 5.99437 1.02063 5.00954C1.21653 4.02471 1.70006 3.12009 2.41008 2.41007C3.1201 1.70005 4.02472 1.21652 5.00954 1.02063C5.99437 0.824734 7.01517 0.925274 7.94286 1.30953C8.87054 1.69379 9.66345 2.34452 10.2213 3.17941C10.7792 4.01431 11.0769 4.99588 11.0769 6C11.0754 7.34601 10.54 8.63646 9.58824 9.58824C8.63646 10.54 7.34602 11.0754 6 11.0769ZM9.69231 6C9.69231 6.12241 9.64368 6.2398 9.55713 6.32636C9.47057 6.41291 9.35318 6.46154 9.23077 6.46154H6C5.87759 6.46154 5.7602 6.41291 5.67364 6.32636C5.58709 6.2398 5.53846 6.12241 5.53846 6V2.76923C5.53846 2.64682 5.58709 2.52943 5.67364 2.44287C5.7602 2.35632 5.87759 2.30769 6 2.30769C6.12241 2.30769 6.2398 2.35632 6.32636 2.44287C6.41291 2.52943 6.46154 2.64682 6.46154 2.76923V5.53846H9.23077C9.35318 5.53846 9.47057 5.58709 9.55713 5.67364C9.64368 5.7602 9.69231 5.87759 9.69231 6Z" fill="#02368c"/>
  </svg>
);

interface ActiveJob {
  id: number;
  service: string;
  price: string;
  customer: string;
  startTime: string;
  progress: number;
  currentDay: number;
  totalDays: number;
  bookingId?: string;
}

interface ActiveJobsProps {
  jobs?: ActiveJob[];
}

const defaultJobs: ActiveJob[] = [
  {
    id: 1,
    service: "Home Cleaning",
    price: "GH₵ 60.00",
    customer: "Kofi Asante",
    startTime: "10:04 AM",
    progress: 65,
    currentDay: 6,
    totalDays: 15,
  },
  {
    id: 2,
    service: "Home Cleaning",
    price: "GH₵ 60.00",
    customer: "Kofi Asante",
    startTime: "10:04 AM",
    progress: 65,
    currentDay: 6,
    totalDays: 15,
  },
];

export function ActiveJobs({ jobs = defaultJobs }: ActiveJobsProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-[18px] border-b border-[rgba(0,0,0,0.12)]">
        <h3
          className="text-[16px] font-medium text-[#222]"
          style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
        >
          Active Jobs
        </h3>
        <button
          className="text-[12px] text-[#02368c] border border-[#02368c] px-3 py-2 rounded-md shadow-[0px_1px_1px_0px_rgba(16,24,40,0.05)]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          View All Bookings
        </button>
      </div>

      {/* Job Cards */}
      <div className="p-4 flex gap-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex-1 bg-[rgba(255,255,255,0.6)] border border-[rgba(226,232,240,0.8)] rounded-xl px-[19px] py-[17px]"
          >
            <div className="flex flex-col gap-6">
              {/* Job Info Section */}
              <div className="flex flex-col gap-4">
                {/* Service and Price */}
                <div className="flex flex-col gap-2">
                  <h4
                    className="text-[18px] font-semibold text-[#0f172a] leading-[1.2]"
                    style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                  >
                    {job.service}
                  </h4>
                  <p
                    className="text-[16px] font-bold text-[#02368c]"
                    style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                  >
                    {job.price}
                  </p>
                </div>

                {/* Customer Info Box */}
                <div className="bg-[#f9f9f9] rounded-lg p-3 flex flex-col gap-[10px]">
                  <div className="flex items-center gap-2">
                    <UserIcon />
                    <span
                      className="text-[16px] text-[#222]"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      Customer: <strong>{job.customer}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockBlueIcon />
                    <span
                      className="text-[16px] text-[#02368c]"
                      style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                    >
                      Started {job.startTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="flex flex-col gap-3">
                {/* Progress Info */}
                <div className="flex flex-col gap-1">
                  <p
                    className="text-[16px] text-[#222]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Day {job.currentDay} of {job.totalDays}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-end">
                      <span
                        className="text-[12px] font-bold text-[#334155]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {job.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-[rgba(254,173,77,0.12)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#fead4d] rounded-full"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Manage Booking Button */}
                <button
                  className="w-full bg-[#02368c] text-white text-[12px] font-medium py-3 rounded-lg shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)]"
                  style={{ fontFamily: "Roboto Flex, Roboto, sans-serif" }}
                >
                  Manage Booking
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
