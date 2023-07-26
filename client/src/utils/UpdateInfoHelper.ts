import {
  AccountInfoFormInfo,
  Address,
  AddressFormInfo,
  UpdateUserInfo,
} from './interface';

export const convertAccountInfoToUpdateUserInfoObject = (
  accountInfo: AccountInfoFormInfo
): UpdateUserInfo => {
  const entries = Object.entries(accountInfo);
  let returnObj: any = {};

  entries.forEach((entry) => {
    returnObj[entry[0]] = entry[1].value;
  });

  returnObj.password = accountInfo.newPassword?.value;

  return returnObj;
};

export const getUpdateAddressObject = (
  addressInfo: AddressFormInfo
): Address => {
  const entries = Object.entries(addressInfo);
  let returnObj: any = {};

  entries.forEach((entry) => {
    let key = entry[0] === 'name' ? 'attn' : entry[0];
    returnObj[key] = entry[1].value;
  });

  return returnObj;
};
