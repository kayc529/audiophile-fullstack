import { Address } from '../utils/interface';

export const dummySavedAddresses: Address[] = [
  {
    _id: '123',
    attn: 'John Doe',
    unit: 'Unit 1201',
    street: '190 Borough Dr',
    city: 'Scarborough',
    state: 'Ontario',
    country: 'Canada',
    postalCode: 'M1P0B6',
    phoneNumber: '+1-123-123-1234',
    isDefault: true,
  },
  {
    _id: '124',
    attn: 'John Doe',
    unit: 'Unit 104',
    street: '1137 Williams Avenue',
    city: 'New York',
    state: 'New York',
    country: 'United States',
    postalCode: '10001',
    phoneNumber: '+1-234-1234-1234',
  },
  {
    _id: '125',
    attn: 'John Doe',
    unit: 'Suite 2B',
    street: '221 Baker Street',
    city: 'Lorem',
    state: 'Texas',
    country: 'United States',
    postalCode: '23541',
    phoneNumber: '+1-345-1234-1234',
  },
];
