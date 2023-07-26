import React from 'react';
import { CartItem } from '../../utils/interface';

interface Props {
  cartItem: CartItem;
}

export default function SummaryCartItem({ cartItem }: Props) {
  return (
    <li className='flex space-x-4'>
      <img className='w-16 h-16 rounded-lg' src={cartItem.thumbnail} alt='' />
      <div className='w-full flex flex-col'>
        <div className='flex justify-between'>
          <p className='text-lg tracking-lg leading-lg font-bold'>
            {cartItem.productCode}
          </p>
          <p className='text-lg tracking-lg leading-lg font-bold opacity-50'>
            x{cartItem.quantity}
          </p>
        </div>
        <p className='text-lg tracking-lg leading-lg font-bold opacity-50'>
          $ {cartItem.price.toLocaleString()}
        </p>
      </div>
    </li>
  );
}
