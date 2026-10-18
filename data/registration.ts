/**
 * Mock data types and initial state for registration flow
 */

export type AccountType = 'customer' | 'professional';
export type AddressType = 'home' | 'work' | 'other';

export interface RegistrationData {
  // Step 1: Account Type
  accountType: AccountType | null;

  // Step 2: Basic Details
  email: string;
  emailVerified: boolean;
  countryCode: string;
  mobileNumber: string;
  mobileVerified: boolean;

  // Step 3: Location
  location: {
    searchQuery: string;
    addressLine1: string;
    addressLine2: string;
    country: string | null;
    state: string | null;
    city: string | null;
    zipCode: string;
    type: AddressType;
    isDefault: boolean;
  };

  // Step 3: Identity
  identity: {
    selfieUrl: string | null;
    documentType: string | null;
    documentFile: File | null;
  };
}

export const initialRegistrationData: RegistrationData = {
  accountType: null,
  email: '',
  emailVerified: false,
  countryCode: '+233',
  mobileNumber: '',
  mobileVerified: false,
  location: {
    searchQuery: '',
    addressLine1: '',
    addressLine2: '',
    country: null,
    state: null,
    city: null,
    zipCode: '',
    type: 'home',
    isDefault: false,
  },
  identity: {
    selfieUrl: null,
    documentType: null,
    documentFile: null,
  },
};

export const countryCodes = [
  { code: '+233', name: 'Ghana', flag: '🇬🇭' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
];
