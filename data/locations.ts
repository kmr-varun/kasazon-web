/**
 * Mock location data for registration
 */

export interface Country {
  id: string;
  name: string;
  code: string;
  states: State[];
}

export interface State {
  id: string;
  name: string;
  cities: City[];
}

export interface City {
  id: string;
  name: string;
  zipCodes: string[];
}

export const countries: Country[] = [
  {
    id: 'gh',
    name: 'Ghana',
    code: 'GH',
    states: [
      {
        id: 'gr',
        name: 'Greater Accra',
        cities: [
          { id: 'acc', name: 'Accra', zipCodes: ['GA-001', 'GA-002', 'GA-003'] },
          { id: 'tem', name: 'Tema', zipCodes: ['GA-100', 'GA-101'] },
          { id: 'mad', name: 'Madina', zipCodes: ['GA-200', 'GA-201'] },
        ],
      },
      {
        id: 'as',
        name: 'Ashanti',
        cities: [
          { id: 'kum', name: 'Kumasi', zipCodes: ['AK-001', 'AK-002'] },
          { id: 'man', name: 'Mampong', zipCodes: ['AK-100'] },
        ],
      },
      {
        id: 'wes',
        name: 'Western',
        cities: [
          { id: 'tak', name: 'Takoradi', zipCodes: ['WR-001'] },
          { id: 'aha', name: 'Ahanta West', zipCodes: ['WR-100'] },
        ],
      },
    ],
  },
  {
    id: 'ng',
    name: 'Nigeria',
    code: 'NG',
    states: [
      {
        id: 'lag',
        name: 'Lagos',
        cities: [
          { id: 'iko', name: 'Ikeja', zipCodes: ['100001', '100002'] },
          { id: 'vit', name: 'Victoria Island', zipCodes: ['101001'] },
        ],
      },
    ],
  },
  {
    id: 'us',
    name: 'United States',
    code: 'US',
    states: [
      {
        id: 'ca',
        name: 'California',
        cities: [
          { id: 'sf', name: 'San Francisco', zipCodes: ['94102', '94103'] },
          { id: 'la', name: 'Los Angeles', zipCodes: ['90001', '90002'] },
        ],
      },
    ],
  },
];

export const documentTypes = [
  { id: 'passport', name: 'Passport' },
  { id: 'drivers_license', name: "Driver's License" },
  { id: 'national_id', name: 'National ID Card' },
  { id: 'voters_id', name: "Voter's ID" },
  { id: 'ghana_card', name: 'Ghana Card' },
];
