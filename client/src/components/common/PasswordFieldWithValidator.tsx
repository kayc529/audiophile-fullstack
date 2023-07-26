import { useEffect, useState } from 'react';
import { FormInfo } from '../../utils/interface';
import {
  validatePasswordFormat,
  PasswordFormatValidator,
} from '../../utils/passwordHelper';
import FormTextField from './FormTextField';
import { TiTick, TiTimes } from 'react-icons/ti';
import { MAX_PASSWORD_LENGTH } from '../../utils/constants';

interface Props {
  title?: string;
  name: string;
  value?: string | undefined;
  inputType?: string;
  placeholder?: string;
  isError?: boolean;
  errorMsg?: string;
  onInputChange?: (info: FormInfo) => void;
  isDisabled?: boolean;
}

const PasswordFieldWithValidator = ({
  name,
  value,
  onInputChange,
  title = '',
  inputType = 'text',
  placeholder = '',
  isError = false,
  errorMsg = '',
  isDisabled = false,
}: Props) => {
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordFormatValidator>(validatePasswordFormat(value));

  const getTextColour = (isValid: boolean) => {
    return isValid ? 'text-green-700' : 'text-errorRed';
  };

  useEffect(() => {
    setPasswordValidation((prev) => ({
      ...prev,
      ...validatePasswordFormat(value),
    }));
  }, [value]);

  return (
    <div className='w-full flex flex-col'>
      <FormTextField
        title={title}
        name={name}
        value={value}
        inputType={inputType}
        placeholder={placeholder}
        maxLength={MAX_PASSWORD_LENGTH}
        isPasswordField={true}
        isError={isError}
        errorMsg={errorMsg}
        onInputChange={onInputChange}
        isDisabled={isDisabled}
      />
      <div className='w-full pt-2 flex flex-col'>
        <div className='w-full flex items-center'>
          {passwordValidation.correctLength ? (
            <TiTick style={{ color: 'green' }} />
          ) : (
            <TiTimes style={{ color: '#CD2C2C' }} />
          )}
          <p
            className={`${getTextColour(
              passwordValidation.correctLength
            )} text-sm pl-1 md:text-md`}
          >
            Must be at least 8 characters
          </p>
        </div>
        <div className='w-full flex items-center'>
          {passwordValidation.containsNumber ? (
            <TiTick style={{ color: 'green' }} />
          ) : (
            <TiTimes style={{ color: '#CD2C2C' }} />
          )}
          <p
            className={`${getTextColour(
              passwordValidation.containsNumber
            )} text-sm pl-1 md:text-md`}
          >
            Must contain at least 1 number
          </p>
        </div>
        <div className='w-full flex items-center'>
          {passwordValidation.containsUppercase ? (
            <TiTick style={{ color: 'green' }} />
          ) : (
            <TiTimes style={{ color: '#CD2C2C' }} />
          )}
          <p
            className={`${getTextColour(
              passwordValidation.containsUppercase
            )} text-sm pl-1 md:text-md`}
          >
            Must contain at least 1 uppercase alphabet
          </p>
        </div>
        <div className='w-full flex items-center'>
          {passwordValidation.containsSpecial ? (
            <TiTick style={{ color: 'green' }} />
          ) : (
            <TiTimes style={{ color: '#CD2C2C' }} />
          )}
          <p
            className={`${getTextColour(
              passwordValidation.containsSpecial
            )} text-sm pl-1 md:text-md`}
          >
            Must contain at least 1 special character
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordFieldWithValidator;
