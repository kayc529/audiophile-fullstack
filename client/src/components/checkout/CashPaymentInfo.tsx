import React from 'react';

export default function CashPaymentInfo() {
  return (
    <div className='flex space-x-4 md:space-x-8'>
      <img
        className='w-12 h-12'
        src='/assets/checkout/icon-cash-on-delivery.svg'
        alt=''
      />
      <p className='w-full text-lg leading-lg tracking-lg opacity-50'>
        The ‘Cash on Delivery’ option enables you to pay in cash when our
        delivery courier arrives at your residence. Just make sure your address
        is correct so that your order will not be cancelled.
      </p>
    </div>
  );
}
