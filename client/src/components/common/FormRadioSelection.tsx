import { useEffect, useState } from 'react';

interface FormRadioSelectionProps {
  id: string;
  label: string;
  name: string;
  isChecked: boolean;
  onCheckChange: (paymentMethod: string) => void | undefined;
}

const FormRadioSelection = ({
  id,
  label,
  name,
  isChecked,
  onCheckChange,
}: FormRadioSelectionProps) => {
  return (
    <div
      className={`w-full h-textField px-4 flex items-center space-x-4 rounded-lg border hover:border-mainOrange ${
        isChecked ? 'border-mainOrange' : 'border-mainGrey'
      }`}
    >
      <input
        className='form-radio-btn'
        type='radio'
        name={name}
        id={id}
        checked={isChecked}
        readOnly
        onClick={() => onCheckChange(id)}
      />
      <label htmlFor={id} className='text-md font-bold'>
        {label}
      </label>
    </div>
  );
};

export default FormRadioSelection;
