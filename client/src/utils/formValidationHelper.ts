import { ERROR_MESSAGE } from './constants';
import { FormInfo, InfoObject } from './interface';
import { isCorrectPasswordFormat } from './passwordHelper';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_NUMBER_REGEX =
  /^\+?([0-9]{0,3})\)?[-. ]?([0-9]{3,4})[-. ]?([0-9]{3,4})[-. ]([0-9]{3,4})$/;
const EMONEY_NUMBER_REGEX = /^[0-9]{9}$/;
const NUMBER_REGEX = /^[0-9]*$/;

export const FIELD_NAMES = {
  NAME: 'name',
  EMAIL: 'email',
  RETYPE_EMAIL: 'retypeEmail',
  PHONE_NUMBER: 'phoneNumber',
  SUITE: 'suite',
  STREET: 'street',
  CITY: 'city',
  STATE: 'state',
  POSTAL_CODE: 'postalCode',
  COUNTRY: 'country',
  PAYMENT_METHOD: 'paymentMethod',
  E_MONEY_NUMBER: 'eMoneyNumber',
  E_MONEY_PIN: 'eMoneyPin',
  PASSWORD: 'password',
  NEW_PASSWORD: 'newPassword',
  CURRENT_PASSWORD: 'currentPassword',
  RETYPE_PASSWORD: 'retypePassword',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
};

export const validateNotBlankField = (info?: InfoObject) => {
  if (!info || !info.value) {
    info = {
      value: '',
      isError: true,
      errorMsg: ERROR_MESSAGE.BLANK,
    };
  } else {
    info.isError = false;
    info.errorMsg = '';
  }

  return info;
};

export const validateNewPassword = (info?: InfoObject) => {
  const correctFormat = isCorrectPasswordFormat(info?.value);

  if (!info || !info.value) {
    info = {
      value: '',
      isError: true,
      errorMsg: ERROR_MESSAGE.BLANK,
    };
  } else if (!correctFormat) {
    info.isError = true;
    info.errorMsg = ERROR_MESSAGE.INVALID_FORMAT;
  } else {
    info.isError = false;
    info.errorMsg = '';
  }

  return info;
};

export const validateEMoneyNumber = (emoneyNumberInfo?: InfoObject) => {
  if (!emoneyNumberInfo || !emoneyNumberInfo.value) {
    emoneyNumberInfo = {
      value: '',
      isError: true,
      errorMsg: ERROR_MESSAGE.BLANK,
    };
  } else if (!EMONEY_NUMBER_REGEX.test(emoneyNumberInfo.value)) {
    emoneyNumberInfo.isError = true;
    emoneyNumberInfo.errorMsg = ERROR_MESSAGE.INVALID_FORMAT;
  } else {
    emoneyNumberInfo.isError = false;
    emoneyNumberInfo.errorMsg = '';
  }

  return emoneyNumberInfo;
};

export const validateNumberOnlyField = (info?: InfoObject) => {
  if (!info || !info.value) {
    info = {
      value: '',
      isError: true,
      errorMsg: ERROR_MESSAGE.BLANK,
    };
  } else if (!NUMBER_REGEX.test(info.value)) {
    info.isError = true;
    info.errorMsg = ERROR_MESSAGE.INVALID_FORMAT;
  } else {
    info.isError = false;
    info.errorMsg = '';
  }

  return info;
};

export const validateEmail = (emailInfo?: InfoObject) => {
  if (!emailInfo || !emailInfo.value) {
    emailInfo = {
      value: '',
      isError: true,
      errorMsg: ERROR_MESSAGE.BLANK,
    };
  } else if (!EMAIL_REGEX.test(emailInfo.value)) {
    emailInfo.isError = true;
    emailInfo.errorMsg = ERROR_MESSAGE.INVALID_FORMAT;
  } else {
    emailInfo.isError = false;
    emailInfo.errorMsg = '';
  }

  return emailInfo;
};

export const validatePhoneNumber = (phoneNumberInfo?: InfoObject) => {
  if (!phoneNumberInfo || !phoneNumberInfo.value) {
    phoneNumberInfo = {
      value: '',
      isError: true,
      errorMsg: ERROR_MESSAGE.BLANK,
    };
  } else if (!PHONE_NUMBER_REGEX.test(phoneNumberInfo.value)) {
    phoneNumberInfo.isError = true;
    phoneNumberInfo.errorMsg = ERROR_MESSAGE.INVALID_FORMAT;
  } else {
    phoneNumberInfo.isError = false;
    phoneNumberInfo.errorMsg = '';
  }

  return phoneNumberInfo;
};

export const areValuesMatch = (
  field: string,
  comparingValue: string | number | undefined,
  infoObject?: InfoObject,
  callback?: (newInfoObject: FormInfo) => void
) => {
  if (!infoObject) {
    if (callback) {
      callback({
        [field]: {
          value: '',
          isError: true,
          errorMsg: 'Cannot be blank',
        },
      });
    }
    return false;
  }

  let isMatch = comparingValue === infoObject.value;

  if (callback) {
    callback({
      [field]: {
        value: infoObject.value,
        isError: !isMatch,
        errorMsg: isMatch ? '' : 'Two values do not match',
      },
    });
  }

  return isMatch;
};

export const isInputFieldValid = (
  field: string,
  infoObject: InfoObject | undefined,
  callback?: (newInfoObject: FormInfo) => any
) => {
  if (!infoObject) {
    if (callback) {
      callback({
        [field]: {
          value: undefined,
          isError: true,
          errorMsg: 'Canont be blank',
        },
      });
    }
    return false;
  }

  let newInfoObject: InfoObject = { ...infoObject };

  switch (field) {
    case FIELD_NAMES.PHONE_NUMBER:
      newInfoObject = validatePhoneNumber(infoObject);
      break;
    case FIELD_NAMES.EMAIL:
      newInfoObject = validateEmail(infoObject);
      break;
    case FIELD_NAMES.E_MONEY_NUMBER:
      newInfoObject = validateEMoneyNumber(infoObject);
      break;
    case FIELD_NAMES.E_MONEY_PIN:
      newInfoObject = validateNumberOnlyField(infoObject);
      break;
    case FIELD_NAMES.NEW_PASSWORD:
      newInfoObject = validateNewPassword(infoObject);
      break;
    case FIELD_NAMES.NAME:
    case FIELD_NAMES.PASSWORD:
    case FIELD_NAMES.CURRENT_PASSWORD:
    case FIELD_NAMES.STREET:
    case FIELD_NAMES.CITY:
    case FIELD_NAMES.STATE:
    case FIELD_NAMES.POSTAL_CODE:
    case FIELD_NAMES.COUNTRY:
    case FIELD_NAMES.PAYMENT_METHOD:
    default:
      newInfoObject = validateNotBlankField(infoObject);
      break;
  }

  if (callback) {
    callback({ [field]: newInfoObject });
  }

  return !newInfoObject.isError;
};
