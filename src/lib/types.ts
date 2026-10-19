// ============================================
// Auth Types
// ============================================

export interface User {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  avatarUrl: string | null;
  accountType: 'CUSTOMER' | 'PROFESSIONAL';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterData {
  email: string;
  phone: string;
  fullName: string;
  password: string;
  accountType: 'CUSTOMER' | 'PROFESSIONAL';
}

// ============================================
// Service Types
// ============================================

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconUrl: string | null;
  imageUrl: string | null;
  displayOrder: number;
  serviceCount?: number; // Optional - may not always be returned
}

export interface ServiceCategoryDetail extends ServiceCategory {
  services: Service[];
  subcategories: ServiceSubcategory[];
}

export interface ServiceSubcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface ServicePackageItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  durationEstimate: string | null;
  includes: string[] | null;
  displayOrder: number;
  isActive: boolean;
  units?: number; // For packages like "2 AC", "3 AC"
}

export interface Service {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  subcategoryId: string | null;
  subcategoryName: string | null;
  basePrice: number;
  currency: string;
  duration: number; // in minutes
  imageUrl: string | null;
  rating: number;
  reviewCount: number;
  isPopular: boolean;
  packages?: ServicePackageItem[]; // Service packages with different pricing tiers
  includes?: string[]; // What's included in the service
}

export interface ServiceDetail extends Service {
  longDescription: string;
  includes: string[];
  excludes: string[];
  requirements: string[];
  faqs: FAQ[];
  vendor: VendorSummary;
  availableSlots: TimeSlot[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface VendorSummary {
  id: string;
  businessName: string;
  avatarUrl: string | null;
  rating: number;
  reviewCount: number;
  verified: boolean;
}

export interface TimeSlot {
  date: string; // ISO date string
  time: string; // HH:mm format
  available: boolean;
}

// ============================================
// Booking Types
// ============================================

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED';

export type BookingFilter = 'all' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled' | 'disputed';

export interface BookingStats {
  upcoming: number;
  ongoing: number;
  completed: number;
  cancelled: number;
  disputed: number;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceImageUrl: string | null;
  vendorId: string;
  vendorName: string;
  customerId: string;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  totalAmount: number;
  currency: string;
  addressId: string;
  address: AddressSummary;
  createdAt: string;
  updatedAt: string;
}

export interface BookingDetail extends Booking {
  service: Service;
  vendor: VendorSummary;
  customer: CustomerSummary;
  payments: Payment[];
  notes: string | null;
  cancellationReason: string | null;
  completedAt: string | null;
}

export interface CreateBookingData {
  serviceId: string;
  vendorId: string;
  scheduledDate: string;
  scheduledTime: string;
  addressId: string;
  notes?: string;
  paymentMethodId?: string;
}

export interface CustomerSummary {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  phone: string;
}

// ============================================
// Address Types
// ============================================

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  latitude: number | null;
  longitude: number | null;
  additionalInfo: string | null;
}

export interface AddressSummary {
  id: string;
  label: string;
  street: string;
  city: string;
}

export interface CreateAddressData {
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
  latitude?: number;
  longitude?: number;
  additionalInfo?: string;
}

// ============================================
// Payment Types
// ============================================

export type PaymentMethodType = 'CARD' | 'BANK_ACCOUNT' | 'MOBILE_MONEY' | 'WALLET';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  last4: string;
  brand: string | null; // For cards
  expiryMonth: number | null;
  expiryYear: number | null;
  isDefault: boolean;
  name: string;
}

export interface AddPaymentMethodData {
  type: PaymentMethodType;
  token: string; // From payment processor
  isDefault?: boolean;
}

export interface CheckoutResponse {
  success: boolean;
  paymentId: string;
  status: PaymentStatus;
  message: string;
  receiptUrl: string | null;
}

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED';

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethodId: string;
  createdAt: string;
  completedAt: string | null;
}

export interface WalletBalance {
  balance: number;
  currency: string;
  pendingBalance: number;
}

export interface WalletInfo extends WalletBalance {
  transactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  currency: string;
  description: string;
  createdAt: string;
  referenceId: string | null;
}

// ============================================
// Message Types
// ============================================

export interface Conversation {
  id: string;
  bookingId: string | null;
  participantId: string;
  participantName: string;
  participantAvatarUrl: string | null;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface ConversationDetail extends Conversation {
  messages: Message[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  readAt: string | null;
  attachments: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  type: 'IMAGE' | 'DOCUMENT' | 'AUDIO';
  url: string;
  name: string;
  size: number;
}

// ============================================
// Review Types
// ============================================

export interface Review {
  id: string;
  bookingId: string;
  serviceId: string;
  vendorId: string;
  customerId: string;
  customerName: string;
  customerAvatarUrl: string | null;
  rating: number; // 1-5
  title: string | null;
  comment: string;
  response: string | null;
  responseAt: string | null;
  createdAt: string;
  images: string[];
}

export interface CreateReviewData {
  bookingId: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
}

// ============================================
// User Profile Types
// ============================================

export interface UserProfile extends User {
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  defaultAddressId: string | null;
  notificationPreferences: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
}

export interface UpdateProfileData {
  fullName?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  notificationPreferences?: Partial<NotificationPreferences>;
}

// ============================================
// Dispute Types
// ============================================

export type DisputeStatus =
  | 'OPEN'
  | 'UNDER_REVIEW'
  | 'RESOLVED'
  | 'CLOSED';

export type DisputeReason =
  | 'SERVICE_NOT_COMPLETED'
  | 'POOR_QUALITY'
  | 'WRONG_SERVICE'
  | 'OVERCHARGED'
  | 'DAMAGE_CAUSED'
  | 'NO_SHOW'
  | 'OTHER';

export interface Dispute {
  id: string;
  bookingId: string;
  serviceName: string;
  status: DisputeStatus;
  reason: DisputeReason;
  description: string;
  createdAt: string;
  resolvedAt: string | null;
}

export interface DisputeDetail extends Dispute {
  booking: Booking;
  evidence: DisputeEvidence[];
  messages: DisputeMessage[];
  resolution: string | null;
  refundAmount: number | null;
}

export interface DisputeEvidence {
  id: string;
  type: 'IMAGE' | 'DOCUMENT' | 'VIDEO';
  url: string;
  description: string | null;
  uploadedAt: string;
}

export interface DisputeMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'CUSTOMER' | 'VENDOR' | 'SUPPORT';
  content: string;
  createdAt: string;
}

export interface CreateDisputeData {
  bookingId: string;
  reason: DisputeReason;
  description: string;
  evidenceUrls?: string[];
}

// ============================================
// Quotation Types
// ============================================

export type QuotationStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED';

export interface Quotation {
  id: string;
  bookingId: string | null;
  serviceId: string;
  serviceName: string;
  vendorId: string;
  vendorName: string;
  vendorAvatarUrl: string | null;
  status: QuotationStatus;
  amount: number;
  currency: string;
  validUntil: string;
  createdAt: string;
}

export interface QuotationDetail extends Quotation {
  service: Service;
  vendor: VendorSummary;
  items: QuotationItem[];
  notes: string | null;
  terms: string | null;
}

export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// ============================================
// API Response Wrappers
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}
