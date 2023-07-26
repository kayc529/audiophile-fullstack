import React from 'react';
import { CartItem } from '../../utils/interface';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: CartItem;
}

export default function OrderItem({ item }: Props) {
  const navigate = useNavigate();

  const goToProductPage = () => {
    navigate(`/product/${item.productId}`);
  };

  return (
    <li className='flex items-center'>
      <img
        className='w-25 h-25 cursor-pointer'
        src={item.thumbnail}
        alt=''
        onClick={goToProductPage}
      />
      <div className='pl-4 flex flex-col'>
        <p
          className='text-lg font-bold cursor-pointer hover:text-darkOrange'
          onClick={goToProductPage}
        >
          {item.productCode}
        </p>
        <p className='text-md'>$ {item.price}</p>
        <p className='text-md'>Quantity: {item.quantity}</p>
      </div>
    </li>
  );
}
