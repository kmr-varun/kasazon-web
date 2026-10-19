// API Client
export { api, ApiError } from './api';
export type { ApiClient } from './api';

// Backward-compatible function exports
export {
  getAuthToken,
  isAuthenticated,
  getBookings,
  getBookingById,
  rescheduleBooking,
  cancelBooking,
  getBookingStats,
} from './api';

// Auth Context
export { AuthProvider, useAuth, useAuthenticatedUser, useIsAccountType } from './auth-context';

// Types - Auth
export type {
  User,
  AuthResponse,
  TokenPair,
  RegisterData,
} from './types';

// Types - Services
export type {
  ServiceCategory,
  ServiceCategoryDetail,
  ServiceSubcategory,
  Service,
  ServiceDetail,
  FAQ,
  VendorSummary,
  TimeSlot,
} from './types';

// Types - Bookings
export type {
  BookingStatus,
  BookingFilter,
  BookingStats,
  Booking,
  BookingDetail,
  CreateBookingData,
  CustomerSummary,
} from './types';

// Types - Addresses
export type {
  Address,
  AddressSummary,
  CreateAddressData,
} from './types';

// Types - Payments
export type {
  PaymentMethodType,
  PaymentMethod,
  AddPaymentMethodData,
  CheckoutResponse,
  PaymentStatus,
  Payment,
  WalletBalance,
  WalletInfo,
  WalletTransaction,
} from './types';

// Types - Messages
export type {
  Conversation,
  ConversationDetail,
  Message,
  MessageAttachment,
} from './types';

// Types - Reviews
export type {
  Review,
  CreateReviewData,
} from './types';

// Types - User Profile
export type {
  UserProfile,
  NotificationPreferences,
  UpdateProfileData,
} from './types';

// Types - Disputes
export type {
  DisputeStatus,
  DisputeReason,
  Dispute,
  DisputeDetail,
  DisputeEvidence,
  DisputeMessage,
  CreateDisputeData,
} from './types';

// Types - Quotations
export type {
  QuotationStatus,
  Quotation,
  QuotationDetail,
  QuotationItem,
} from './types';

// Types - API Helpers
export type {
  PaginatedResponse,
  ApiErrorResponse,
} from './types';
