import React from 'react';
import { CheckoutFormInfo } from '../../utils/interface';

interface Props {
  selections: string[];
  title: string;
  name: string;
  value?: string | undefined;
  placeholder?: string;
  isError?: boolean;
  errorMsg?: string;
  onSelectionChange?: (newInfo: CheckoutFormInfo) => void;
  isDisabled?: boolean;
}

export default function SelectField({
  selections,
  title,
  name,
  value = '',
  placeholder = 'Select',
  isError = false,
  errorMsg = '',
  onSelectionChange,
  isDisabled = false,
}: Props) {
  const optionChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onSelectionChange) {
      let newInfo = { [name]: { value: e.target.value, isError: false } };
      onSelectionChange(newInfo);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between pb-2'>
        <p
          className={`capitalize text-sm font-bold ${
            isError && ' text-errorRed'
          }`}
        >
          {title}
        </p>
        {isError && <p className='text-sm text-errorRed'>{errorMsg}</p>}
      </div>
      <select
        className={`w-full h-[55px] px-5 text-md rounded-lg border border-darkGrey focus:outline-none focus:border-darkOrange ${
          isError ? 'border-errorRed' : ''
        }`}
        onChange={optionChanged}
        value={value}
        disabled={isDisabled}
      >
        <option value='' disabled selected>
          {placeholder}
        </option>
        {selections.map((selection) => {
          return (
            <option key={selection} value={selection}>
              {selection}
            </option>
          );
        })}
      </select>
    </div>
  );
}
