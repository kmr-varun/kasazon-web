"use client";

import { useState } from "react";

const CheckboxChecked = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="13" height="13" rx="1.17308" fill="#FEAD4D"/>
    <rect x="0.5" y="0.5" width="13" height="13" rx="1.17308" stroke="#FEAD4D"/>
    <path d="M10.7971 4.73163L5.82034 9.70843C5.79146 9.73735 5.75715 9.76029 5.71939 9.77595C5.68163 9.7916 5.64115 9.79966 5.60028 9.79966C5.5594 9.79966 5.51892 9.7916 5.48116 9.77595C5.4434 9.76029 5.4091 9.73735 5.38021 9.70843L3.20286 7.53108C3.14449 7.47272 3.1117 7.39356 3.1117 7.31101C3.1117 7.22847 3.14449 7.14931 3.20286 7.09095C3.26122 7.03258 3.34038 6.99979 3.42293 6.99979C3.50547 6.99979 3.58463 7.03258 3.64299 7.09095L5.60028 9.04862L10.357 4.2915C10.4154 4.23313 10.4945 4.20034 10.5771 4.20034C10.6596 4.20034 10.7388 4.23313 10.7971 4.2915C10.8555 4.34986 10.8883 4.42902 10.8883 4.51156C10.8883 4.59411 10.8555 4.67327 10.7971 4.73163Z" fill="white"/>
  </svg>
);

const CheckboxUnchecked = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="13" height="13" rx="1.17308" stroke="#FEAD4D"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_trash)">
      <path d="M11.0833 3.49972V11.667C11.0833 11.9765 10.9604 12.2733 10.7416 12.4921C10.5228 12.7109 10.2261 12.8338 9.91667 12.8338H4.08333C3.77391 12.8338 3.47717 12.7109 3.25838 12.4921C3.03958 12.2733 2.91667 11.9765 2.91667 11.667V3.49972M1.75 3.49972H12.25M4.66667 3.49972V2.33296C4.66667 2.02352 4.78958 1.72675 5.00838 1.50794C5.22717 1.28913 5.52391 1.1662 5.83333 1.1662H8.16667C8.47609 1.1662 8.77283 1.28913 8.99162 1.50794C9.21042 1.72675 9.33333 2.02352 9.33333 2.33296V3.49972" stroke="#DD644E" strokeWidth="2" strokeLinecap="round"/>
    </g>
    <defs>
      <clipPath id="clip0_trash">
        <rect width="14" height="14" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

export interface DaySchedule {
  day: string;
  isAvailable: boolean;
  timeSlots: TimeSlot[];
}

interface AvailabilityScheduleProps {
  schedule?: DaySchedule[];
  onToggleDay?: (day: string) => void;
  onAddTimeSlot?: (day: string) => void;
  onDeleteTimeSlot?: (day: string, slotId: string) => void;
  onUpdateTimeSlot?: (day: string, slotId: string, field: "startTime" | "endTime", value: string) => void;
}

const defaultSchedule: DaySchedule[] = [
  {
    day: "Monday",
    isAvailable: true,
    timeSlots: [{ id: "1", startTime: "08:00 AM", endTime: "05:00 PM" }],
  },
  {
    day: "Tuesday",
    isAvailable: true,
    timeSlots: [
      { id: "1", startTime: "08:00 AM", endTime: "05:00 PM" },
      { id: "2", startTime: "06:00 PM", endTime: "09:00 PM" },
    ],
  },
  {
    day: "Wednesday",
    isAvailable: false,
    timeSlots: [],
  },
  {
    day: "Thursday",
    isAvailable: true,
    timeSlots: [
      { id: "1", startTime: "09:00 AM", endTime: "04:00 PM" },
      { id: "2", startTime: "09:00 AM", endTime: "04:00 PM" },
    ],
  },
  {
    day: "Friday",
    isAvailable: true,
    timeSlots: [{ id: "1", startTime: "08:00 AM", endTime: "06:00 PM" }],
  },
  {
    day: "Saturday",
    isAvailable: true,
    timeSlots: [{ id: "1", startTime: "10:00 AM", endTime: "02:00 PM" }],
  },
  {
    day: "Sunday",
    isAvailable: false,
    timeSlots: [],
  },
];

export function AvailabilitySchedule({
  schedule = defaultSchedule,
  onToggleDay,
  onAddTimeSlot,
  onDeleteTimeSlot,
  onUpdateTimeSlot,
}: AvailabilityScheduleProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-black/[0.12] h-[75px] px-5 py-[18px] flex items-center">
        <div className="flex flex-col gap-1">
          <p
            className="text-[16px] font-medium text-[#222]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Availability
          </p>
          <p
            className="text-[13px] text-[#777]"
            style={{ fontFamily: "Roboto Flex, sans-serif" }}
          >
            Set your available hours for each day of the week
          </p>
        </div>
      </div>

      {/* Schedule List */}
      <div className="px-5 pt-2 pb-5">
        {schedule.map((daySchedule, index) => (
          <div
            key={daySchedule.day}
            className={`py-3 flex items-start gap-3 ${
              index < schedule.length - 1 ? "border-b border-black/[0.06]" : ""
            }`}
          >
            {/* Day Checkbox */}
            <div className="w-[120px] flex items-center gap-2 shrink-0">
              <button
                onClick={() => onToggleDay?.(daySchedule.day)}
                className="flex items-center"
              >
                {daySchedule.isAvailable ? <CheckboxChecked /> : <CheckboxUnchecked />}
              </button>
              <span
                className="text-[14px] font-semibold text-[#111]"
                style={{ fontFamily: "Roboto Flex, sans-serif" }}
              >
                {daySchedule.day}
              </span>
            </div>

            {/* Time Slots or Unavailable */}
            <div className="flex-1 flex items-start justify-between">
              {daySchedule.isAvailable && daySchedule.timeSlots.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {daySchedule.timeSlots.map((slot) => (
                    <div key={slot.id} className="flex items-center gap-2">
                      {/* Start Time */}
                      <div className="w-[110px] bg-[#f8f9ff] border border-[#cbd5e1] rounded-md px-3 py-1.5">
                        <span
                          className="text-[13px] text-[#434652]"
                          style={{ fontFamily: "Roboto Flex, sans-serif" }}
                        >
                          {slot.startTime}
                        </span>
                      </div>
                      <span
                        className="text-[13px] text-[#777]"
                        style={{ fontFamily: "Roboto Flex, sans-serif" }}
                      >
                        to
                      </span>
                      {/* End Time */}
                      <div className="w-[110px] bg-[#f8f9ff] border border-[#cbd5e1] rounded-md px-3 py-1.5">
                        <span
                          className="text-[13px] text-[#434652]"
                          style={{ fontFamily: "Roboto Flex, sans-serif" }}
                        >
                          {slot.endTime}
                        </span>
                      </div>
                      {/* Delete Button */}
                      <button
                        onClick={() => onDeleteTimeSlot?.(daySchedule.day, slot.id)}
                        className="p-1 border border-[#e2e8f0] rounded-md bg-white hover:bg-gray-50"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <span
                  className="text-[13px] text-[#94a3b8]"
                  style={{ fontFamily: "Roboto Flex, sans-serif" }}
                >
                  Unavailable
                </span>
              )}

              {/* Add Time Button */}
              <button
                onClick={() => onAddTimeSlot?.(daySchedule.day)}
                className="flex items-center gap-2 px-3 py-2 border border-[#02368c] rounded-md text-[#02368c] hover:bg-[#02368c]/5 shadow-[0px_1px_1px_0px_rgba(16,24,40,0.05)]"
              >
                <PlusIcon />
                <span
                  className="text-[12px]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Add Time
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
