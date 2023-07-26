import { User } from '../utils/interface';

export const dummyUser: User = {
  userId: '123456',
  email: 'john123@gmail.com',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+1 123-123-1234',
  defaultAddress: {
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
  role: 'USER',
};
