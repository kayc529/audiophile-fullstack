import React from 'react';
import { ProductAccessory } from '../../utils/interface';

interface Props {
  includes: ProductAccessory[] | undefined;
}

export default function InTheBox({ includes }: Props) {
  return (
    <div className='w-full flex flex-col md:flex-row md:justify-between lg:w-[350px] lg:flex-col lg:justify-start'>
      <h3 className='w-full pb-6 uppercase text-h5 leading-h5 tracking-h5 font-bold md:pb-8 md:text-h3 md:leading-h3 md:tracking-h3 md:w-1/2 lg:w-auto'>
        in the box
      </h3>
      <ul className='w-full flex flex-col space-y-2 md:w-1/2 lg:w-auto'>
        {includes?.map((accessory) => {
          return (
            <li key={accessory.item} className='flex items-center'>
              <p className='w-10 text-darkOrange'>{accessory.quantity}x</p>
              <p className='capitalize text-lg font-medium'>{accessory.item}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
