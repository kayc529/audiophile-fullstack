import React, { useState } from 'react';
import { CartItem } from '../../utils/interface';
import SummaryCartItem from './SummaryCartItem';

interface Props {
  cartItems?: CartItem[];
}

export default function OrderSummaryItems({ cartItems = [] }: Props) {
  const [showAllItems, setShowAllItems] = useState<boolean>(false);

  const oneItem = <SummaryCartItem cartItem={cartItems[0]} />;

  const itemList = (
    <ul className='flex flex-col space-y-4'>
      {cartItems.map((cartItem) => {
        return <SummaryCartItem key={cartItem.productId} cartItem={cartItem} />;
      })}
    </ul>
  );

  const toggleShowAllItems = () => {
    setShowAllItems((prev) => !prev);
  };

  return (
    <div className='w-full min-h-[140px] px-6 bg-mainGrey flex flex-col justify-center md:w-[244px]'>
      {showAllItems ? (
        <div className='py-6 flex flex-col'>
          {itemList}
          <>
            <div className='w-full h-[1px] mt-2 mb-3 bg-black opacity-20'></div>
            <p
              className='w-full text-center text-xxs font-bold opacity-50 cursor-pointer'
              onClick={toggleShowAllItems}
            >
              View less
            </p>
          </>
        </div>
      ) : (
        <>
          {oneItem}
          {cartItems.length > 1 && (
            <>
              <div className='w-full h-[1px] mt-2 mb-3 bg-black opacity-20'></div>
              <p
                className='w-full text-center text-xxs font-bold opacity-50 cursor-pointer'
                onClick={toggleShowAllItems}
              >
                and {cartItems.length - 1} other item(s)
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}
