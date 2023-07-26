import React from 'react';
import PrimaryButton from './PrimaryButton';
import { useDispatch } from 'react-redux';
import { toggleCart } from '../../features/modal/modalSlice';

export default function EmptyCart() {
  const dispatch = useDispatch();

  const closeCart = () => {
    dispatch(toggleCart());
  };

  return (
    <div className='flex flex-col items-center'>
      <img
        className='w-20'
        src='/assets/shared/desktop/icon-cart-grey.svg'
        alt=''
      />
      <p className='py-5 text-lg opacity-50'>Your cart is empty</p>
      <PrimaryButton text='close' onButtonClick={closeCart} />
    </div>
  );
}
