"use client";

import {
  ServicesAndPricing,
  AvailabilitySchedule,
} from "@/src/components/vendor";

export default function ServicesAndAvailabilityPage() {
  const handleAddService = () => {
    console.log("Add service");
  };

  const handleEditService = (serviceId: string) => {
    console.log("Edit service:", serviceId);
  };

  const handleToggleDay = (day: string) => {
    console.log("Toggle day:", day);
  };

  const handleAddTimeSlot = (day: string) => {
    console.log("Add time slot for:", day);
  };

  const handleDeleteTimeSlot = (day: string, slotId: string) => {
    console.log("Delete time slot:", day, slotId);
  };

  return (
    <div className="flex flex-col gap-8 px-8 py-10">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <span
          className="text-[12px] text-[#111]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Services & Availability
        </span>
        <h1
          className="text-[30px] font-medium text-[#111827] leading-[1.2]"
          style={{ fontFamily: "Roboto Flex, sans-serif" }}
        >
          Services & Availability
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-2">
        <ServicesAndPricing
          onAddService={handleAddService}
          onEditService={handleEditService}
        />
        <AvailabilitySchedule
          onToggleDay={handleToggleDay}
          onAddTimeSlot={handleAddTimeSlot}
          onDeleteTimeSlot={handleDeleteTimeSlot}
        />
      </div>
    </div>
  );
}
