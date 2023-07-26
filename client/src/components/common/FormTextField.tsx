import React, { useState } from 'react';
import { FormInfo } from '../../utils/interface';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface FormTextFieldProps {
  title?: string;
  name: string;
  value?: string | undefined;
  inputType?: string;
  placeholder?: string;
  maxLength?: number;
  isPasswordField?: boolean;
  isError?: boolean;
  errorMsg?: string;
  onInputChange?: (info: FormInfo) => void;
  isDisabled?: boolean;
}

const FormTextField = ({
  title = '',
  name,
  value,
  inputType = 'text',
  placeholder = '',
  maxLength = 100,
  isPasswordField = false,
  isError = false,
  errorMsg = '',
  onInputChange,
  isDisabled = false,
}: FormTextFieldProps) => {
  const [type, setType] = useState(inputType);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onInputChange) {
      let temp: FormInfo = {
        [e.target.name]: { value: e.target.value, isError: false },
      };
      onInputChange(temp);
    }
  };

  const getEyeIcon = () => {
    return type === 'password' ? (
      <AiOutlineEyeInvisible
        className='absolute top-11 right-4 w-6 h-6'
        style={{ color: 'grey' }}
        onClick={toggleEye}
      />
    ) : (
      <AiOutlineEye
        className='absolute top-11 right-4 w-6 h-6'
        style={{ color: 'grey' }}
        onClick={toggleEye}
      />
    );
  };

  const toggleEye = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  return (
    <div className='relative w-full flex flex-col'>
      <div className='flex justify-between'>
        <p
          className={`capitalize text-sm font-bold ${
            isError && ' text-errorRed'
          }`}
        >
          {title}
        </p>
        {isError && <p className='text-sm text-errorRed'>{errorMsg}</p>}
      </div>
      <input
        className={`w-full h-textField pl-6 pr-16 py-4 mt-2 text-md font-bold rounded-lg caret-darkOrange focus:outline-none ${
          isError
            ? 'border-2 border-errorRed'
            : 'border border-darkGrey focus:border-mainOrange'
        }`}
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
      {isPasswordField && getEyeIcon()}
    </div>
  );
};

export default FormTextField;
