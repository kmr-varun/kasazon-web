'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Service, Address } from './types';

// ============================================
// Types
// ============================================

export interface ServicePackage {
  id: string;
  units?: number;
  price: number;
  label: string;
  name?: string;
  description?: string | null;
  durationEstimate?: string | null;
  includes?: string[] | null;
  displayOrder?: number;
  isActive?: boolean;
}

export interface BookingState {
  // Service selection
  service: Service | null;
  selectedPackage: ServicePackage | null;

  // Time slot selection
  selectedDate: string | null; // ISO date string
  selectedTime: string | null; // HH:mm format

  // Address selection
  selectedAddress: Address | null;

  // Additional details
  notes: string;

  // Calculated totals
  subtotal: number;
  platformFee: number;
  total: number;
}

interface BookingContextType {
  booking: BookingState;

  // Actions
  setService: (service: Service, selectedPackage: ServicePackage) => void;
  setTimeSlot: (date: string, time: string) => void;
  setAddress: (address: Address) => void;
  setNotes: (notes: string) => void;
  clearBooking: () => void;

  // Computed values
  canProceedToTimeSlots: boolean;
  canProceedToAddress: boolean;
  canProceedToReview: boolean;
}

// ============================================
// Constants
// ============================================

const PLATFORM_FEE_PERCENTAGE = 0.03; // 3% platform fee

const INITIAL_BOOKING_STATE: BookingState = {
  service: null,
  selectedPackage: null,
  selectedDate: null,
  selectedTime: null,
  selectedAddress: null,
  notes: '',
  subtotal: 0,
  platformFee: 0,
  total: 0,
};

// ============================================
// Context
// ============================================

const BookingContext = createContext<BookingContextType | null>(null);

// ============================================
// Helper Functions
// ============================================

function calculateTotals(subtotal: number): {
  platformFee: number;
  total: number;
} {
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PERCENTAGE * 100) / 100;
  const total = subtotal + platformFee;

  return { platformFee, total };
}

// ============================================
// Provider Component
// ============================================

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(INITIAL_BOOKING_STATE);

  /**
   * Set the selected service and package
   */
  const setService = useCallback((service: Service, selectedPackage: ServicePackage) => {
    const subtotal = selectedPackage.price;
    const { platformFee, total } = calculateTotals(subtotal);

    setBooking(prev => ({
      ...prev,
      service,
      selectedPackage,
      subtotal,
      platformFee,
      total,
    }));
  }, []);

  /**
   * Set the selected time slot
   */
  const setTimeSlot = useCallback((date: string, time: string) => {
    setBooking(prev => ({
      ...prev,
      selectedDate: date,
      selectedTime: time,
    }));
  }, []);

  /**
   * Set the selected address
   */
  const setAddress = useCallback((address: Address) => {
    setBooking(prev => ({
      ...prev,
      selectedAddress: address,
    }));
  }, []);

  /**
   * Set additional notes
   */
  const setNotes = useCallback((notes: string) => {
    setBooking(prev => ({
      ...prev,
      notes,
    }));
  }, []);

  /**
   * Clear the entire booking state
   */
  const clearBooking = useCallback(() => {
    setBooking(INITIAL_BOOKING_STATE);
  }, []);

  // Computed values for navigation validation
  const canProceedToTimeSlots = !!(booking.service && booking.selectedPackage);
  const canProceedToAddress = !!(
    booking.service &&
    booking.selectedPackage &&
    booking.selectedDate &&
    booking.selectedTime
  );
  const canProceedToReview = !!(
    booking.service &&
    booking.selectedPackage &&
    booking.selectedDate &&
    booking.selectedTime &&
    booking.selectedAddress
  );

  const value: BookingContextType = {
    booking,
    setService,
    setTimeSlot,
    setAddress,
    setNotes,
    clearBooking,
    canProceedToTimeSlots,
    canProceedToAddress,
    canProceedToReview,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

export function useBooking(): BookingContextType {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
