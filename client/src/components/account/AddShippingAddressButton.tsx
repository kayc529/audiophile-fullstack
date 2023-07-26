import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
interface Props {
  onButtonClick: () => void;
}

export default function AddShippingAddressButton({ onButtonClick }: Props) {
  return (
    <div
      className='w-max mt-8 flex items-center cursor-pointer'
      onClick={onButtonClick}
    >
      <AiOutlinePlus className='w-6 h-6' />
      <p className='pl-2 capitalize text-lg font-bold hover:underline'>
        Add shipping address
      </p>
    </div>
  );
}
