"use client";

import { BookingCard, BookingCardData } from "./BookingCard";

interface BookingsGridProps {
  bookings?: BookingCardData[];
}

const defaultBookings: BookingCardData[] = [
  {
    id: "1",
    bookingId: "KB 12345",
    type: "contract",
    status: "in-progress",
    serviceName: "Home Cleaning",
    amount: 60.0,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    scheduledDate: "Tue, 24 Sept 2026",
    scheduledTime: "2:30pm",
    progress: { currentDay: 6, totalDays: 15, percentage: 65 },
  },
  {
    id: "2",
    bookingId: "KB 12346",
    type: "contract",
    status: "in-progress",
    serviceName: "Home Cleaning",
    amount: 60.0,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    scheduledDate: "Tue, 24 Sept 2026",
    scheduledTime: "2:30pm",
    progress: { currentDay: 6, totalDays: 15, percentage: 65 },
  },
  {
    id: "3",
    bookingId: "KB 12347",
    type: "contract",
    status: "in-progress",
    serviceName: "Home Cleaning",
    amount: 60.0,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    scheduledDate: "Tue, 24 Sept 2026",
    scheduledTime: "2:30pm",
    progress: { currentDay: 6, totalDays: 15, percentage: 65 },
  },
  {
    id: "4",
    bookingId: "KB 12348",
    type: "contract",
    status: "in-progress",
    serviceName: "Home Cleaning",
    amount: 60.0,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    scheduledDate: "Tue, 24 Sept 2026",
    scheduledTime: "2:30pm",
    progress: { currentDay: 6, totalDays: 15, percentage: 65 },
  },
  {
    id: "5",
    bookingId: "KB 12349",
    type: "contract",
    status: "in-progress",
    serviceName: "Home Cleaning",
    amount: 60.0,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    scheduledDate: "Tue, 24 Sept 2026",
    scheduledTime: "2:30pm",
    progress: { currentDay: 6, totalDays: 15, percentage: 65 },
  },
  {
    id: "6",
    bookingId: "KB 12350",
    type: "contract",
    status: "in-progress",
    serviceName: "Home Cleaning",
    amount: 60.0,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    scheduledDate: "Tue, 24 Sept 2026",
    scheduledTime: "2:30pm",
    progress: { currentDay: 6, totalDays: 15, percentage: 65 },
  },
];

export function BookingsGrid({ bookings = defaultBookings }: BookingsGridProps) {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
