import { Address, AddressFormInfo } from './interface';

export const convertAddressToFormInfo = (address: Address): AddressFormInfo => {
  let formInfo: AddressFormInfo = {};

  formInfo.name = { value: address.attn, isError: false };
  formInfo.phoneNumber = { value: address.phoneNumber, isError: false };
  formInfo.unit = { value: address.unit || '', isError: false };
  formInfo.street = { value: address.street, isError: false };
  formInfo.city = { value: address.city, isError: false };
  formInfo.state = { value: address.state, isError: false };
  formInfo.postalCode = { value: address.postalCode, isError: false };
  formInfo.country = { value: address.country, isError: false };

  return formInfo;
};

export const reorderAddresses = (
  defaultAddress: Address | undefined,
  originalAddresses?: Address[] | undefined
): { defaultAddress: Address | undefined; addresses: Address[] } => {
  if (!defaultAddress || !originalAddresses) {
    return { defaultAddress: undefined, addresses: [] };
  }

  for (let i = 0; i < originalAddresses.length; i++) {
    //found the default address in the array
    if (originalAddresses[i]._id === defaultAddress._id) {
      //no need to change if the default address is already
      //in the first position of the array
      if (i === 0) {
        break;
      }
      //move the default array to the first position
      let temp = originalAddresses[0];
      originalAddresses[0] = originalAddresses[i];
      originalAddresses[i] = temp;
      break;
    }
  }

  return { defaultAddress, addresses: originalAddresses };
};
