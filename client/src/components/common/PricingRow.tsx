import React from 'react';

interface Props {
  title: string;
  amount: number;
  highLightAmount?: boolean;
}

export default function PricingRow({
  title,
  amount,
  highLightAmount = false,
}: Props) {
  return (
    <div className='w-full flex justify-between items-center'>
      <p className='uppercase text-start text-lg tracking-lg leading-lg opacity-50'>
        {title}
      </p>
      {highLightAmount ? (
        <p className='text-darkOrange text-h6 text-end tracking-h6 leading-h6 font-bold'>
          $ {amount.toLocaleString()}
        </p>
      ) : (
        <p className='text-h6 text-end tracking-h6 leading-h6 font-bold'>
          $ {amount.toLocaleString()}
        </p>
      )}
    </div>
  );
}
