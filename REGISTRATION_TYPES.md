# Registration Flow - Customer vs Professional

## Overview
The registration flow now supports two account types with different requirements:
- **Customer**: For users who want to book services
- **Professional**: For service providers/artisans who want to offer services

## How It Works

### Account Type Tracking
The account type is passed through the registration flow via URL query parameter `?type=customer` or `?type=professional`

### Flow Diagram

```
Step 1: Account Type Selection
   ├─> Select "Customer" 
   │   └─> Navigate to /register/details?type=customer
   │
   └─> Select "Professional"
       └─> Navigate to /register/details?type=professional

Step 2: Basic Details (Same for Both)
   ├─> Email verification with OTP
   ├─> Mobile verification with OTP
   └─> Continue to /register/complete?type={customer|professional}

Step 3: Final Details (Different)
   ├─> Customer (type=customer)
   │   └─> Location search & Identity verification (simple)
   │
   └─> Professional (type=professional)
       └─> Redirects to /register/complete/professional
           └─> Comprehensive verification form
```

## Customer Registration (Step 3)

**URL**: `/register/complete?type=customer`

**Fields**:
- Location search (OpenStreetMap API)
- Address Line 1 & 2
- Country, State, City dropdowns
- Zip code
- Address type (Home/Work/Other)
- Save as default checkbox
- Upload Identity Document
- Document type dropdown
- Take selfie

**Time to Complete**: ~3-5 minutes

---

## Professional Registration (Step 3)

**URL**: `/register/complete/professional?type=professional`

**Section 1: Identity & Location Verification**
- Take selfie
- Upload Identity Verification Document
- Full Name
- Email
- Date of Birth
- Service Category (dropdown with 8 options)
- Gender (dropdown with 4 options)
- Country (dropdown)
- City
- Upload Proof of Address Document

**Section 2: Background Check**
- Upload Trade Certificate (optional, but recommended)
- Institution name
- Certificate Number (optional)
- Expiry Date (optional)
- Upload Police Clearance Certificate (required)
- Help links for certificate applications

**Section 3: Add Guaranteer**
- Full Name of Guaranteer (required)
- Relationship to you (dropdown)
- Mobile Number with country code (required)
- Occupation (required)
- ID Number (required)
- Info banner explaining why guarantor is needed

**Time to Complete**: ~15-20 minutes

---

## Key Differences

| Aspect | Customer | Professional |
|--------|----------|--------------|
| **Form Complexity** | Simple | Comprehensive |
| **Identity Verification** | Basic document upload | Multiple documents + selfie |
| **Background Check** | None | Trade cert + Police clearance required |
| **Guarantor** | Not required | Required |
| **Location** | Address search with map | Manual entry |
| **Time Required** | 3-5 minutes | 15-20 minutes |

---

## Technical Implementation

### URL Query Parameters
```typescript
// Step 1: Pass type forward
window.location.href = `/register/details?type=${accountType}`;

// Step 2: Read type and pass forward
const searchParams = useSearchParams();
const accountType = searchParams.get('type') || 'customer';
window.location.href = `/register/complete?type=${accountType}`;

// Step 3: Check type and redirect if needed
useEffect(() => {
  if (accountType === 'professional') {
    router.push(`/register/complete/professional?type=${accountType}`);
  }
}, [accountType, router]);
```

### File Structure
```
app/register/
├── page.tsx                          # Step 1: Account Type Selection
├── details/
│   └── page.tsx                      # Step 2: Basic Details (shared)
└── complete/
    ├── page.tsx                      # Step 3: Customer form
    └── professional/
        └── page.tsx                  # Step 3: Professional form
```

---

## Mock Data

### Service Categories (Professional Only)
```typescript
[
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Painting',
  'AC Servicing',
  'Cleaning',
  'Appliance Repair',
  'Masonry'
]
```

### Guarantor Relationships (Professional Only)
```typescript
[
  'Family Member',
  'Friend',
  'Employer',
  'Colleague',
  'Community Leader',
  'Other'
]
```

### Genders
```typescript
[
  'Male',
  'Female',
  'Other',
  'Prefer not to say'
]
```

---

## Testing

### Test Customer Flow
1. Go to http://localhost:3000/register
2. Select "I'm a Customer"
3. Click "Continue as Customer"
4. Verify URL shows `?type=customer`
5. Complete Step 2 (email + mobile OTP: 123456)
6. Complete Step 3 (simple location form)
7. Submit

### Test Professional Flow
1. Go to http://localhost:3000/register
2. Select "I'm a Professional"
3. Click "Continue as Professional"
4. Verify URL shows `?type=professional`
5. Complete Step 2 (email + mobile OTP: 123456)
6. Notice automatic redirect to `/register/complete/professional`
7. Complete all 3 sections:
   - Identity & Location
   - Background Check
   - Add Guaranteer
8. Submit

---

## Why Different Forms?

### Customer Form (Simple)
Customers just need basic verification to book services. Quick signup = better conversion.

### Professional Form (Comprehensive)
Service providers need thorough vetting for:
- **Safety**: Police clearance protects customers
- **Quality**: Trade certificates verify skills
- **Trust**: Guarantor adds accountability
- **Legal**: Meets regulatory requirements in Ghana

---

## Next Steps (Backend Integration)

### Customer Registration API
```typescript
POST /api/register/customer
{
  accountType: 'customer',
  email: string,
  mobile: string,
  location: {
    addressLine1: string,
    addressLine2: string,
    country: string,
    state: string,
    city: string,
    zipCode: string,
    type: 'home' | 'work' | 'other'
  },
  documents: {
    identity: File
  }
}
```

### Professional Registration API
```typescript
POST /api/register/professional
{
  accountType: 'professional',
  email: string,
  mobile: string,
  identity: {
    fullName: string,
    dateOfBirth: string,
    serviceCategory: string,
    gender: string,
    country: string,
    city: string
  },
  documents: {
    identity: File,
    proofOfAddress: File,
    tradeCertificate?: File,
    policeClearance: File
  },
  backgroundCheck: {
    institution?: string,
    certificateNumber?: string,
    expiryDate?: string
  },
  guarantor: {
    name: string,
    relationship: string,
    mobile: string,
    occupation: string,
    idNumber: string
  }
}
```

---

## Status Tracking

After registration, professionals go through approval stages:
1. **Pending Review** - Documents being verified
2. **Background Check** - Police clearance verification
3. **Guarantor Verification** - Contacting guarantor
4. **Approved** - Can start receiving jobs
5. **Rejected** - Missing/invalid documents

Customers are approved immediately after email/mobile verification.
