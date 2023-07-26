import React from 'react';
import SummaryCartItem from './SummaryCartItem';
import SummaryPricing from './SummaryPricing';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

interface Props {
  onCheckOut?: (e?: React.MouseEvent<HTMLElement>) => void;
}

export default function Summary({ onCheckOut }: Props) {
  const { cart } = useSelector((state: RootState) => state.user);
  return (
    <section className='w-full h-max p-8 bg-white rounded-lg flex flex-col lg:w-1/3'>
      <h6 className='uppercase text-h6 leading-h6 tracking-h6 font-bold lg:w-1/3 lg:max-w-[350px]'>
        summary
      </h6>
      <ul className='py-8 flex flex-col space-y-6'>
        {cart?.items.map((cartItem) => {
          return (
            <SummaryCartItem key={cartItem.productId} cartItem={cartItem} />
          );
        })}
      </ul>
      <SummaryPricing onCheckout={onCheckOut} />
    </section>
  );
}
