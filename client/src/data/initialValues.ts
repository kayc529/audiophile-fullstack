import {
  AddressFormInfo,
  CheckoutFormInfo,
  LoginRegisterFormInfo,
} from '../utils/interface';

const initialInfoObjectValue = {
  value: '',
  isError: false,
};

export const initialLoginFormInfo: LoginRegisterFormInfo = {
  email: initialInfoObjectValue,
  password: initialInfoObjectValue,
};

export const initialRegisterFormInfo: LoginRegisterFormInfo = {
  email: initialInfoObjectValue,
  firstName: initialInfoObjectValue,
  lastName: initialInfoObjectValue,
  password: initialInfoObjectValue,
  retypePassword: initialInfoObjectValue,
};

export const initialAddressFormInfo: AddressFormInfo = {
  name: initialInfoObjectValue,
  unit: initialInfoObjectValue,
  street: initialInfoObjectValue,
  city: initialInfoObjectValue,
  state: initialInfoObjectValue,
  postalCode: initialInfoObjectValue,
  country: initialInfoObjectValue,
  phoneNumber: initialInfoObjectValue,
};

export const initialCheckFormInfo: CheckoutFormInfo = {
  ...initialAddressFormInfo,
  email: initialInfoObjectValue,
  paymentMethod: initialInfoObjectValue,
  eMoneyNumber: initialInfoObjectValue,
  eMoneyPin: initialInfoObjectValue,
};
