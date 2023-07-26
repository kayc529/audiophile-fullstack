import React from 'react';
import { RelatedProducts } from '../../utils/interface';
import { PrimaryButton } from '../common';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: RelatedProducts;
}

export default function RelatedProduct({ product }: Props) {
  const navigate = useNavigate();
  const goToProduct = () => {
    navigate(`/product/${product.productId}`);
  };

  return (
    <li className='w-full flex flex-col items-center md:w-1/3'>
      <div className='w-full rounded-lg flex justify-center bg-mainGrey'>
        <picture>
          <source src={product.image.tablet} media='(max-width:967px)' />
          <source src={product.image.mobile} media='(max-width:767px)' />
          <img
            className='h-[120px] rounded-lg object-cover md:h-[318px]'
            src={product.image.desktop}
            alt=''
          />
        </picture>
      </div>

      <h5 className='py-8 text-h5 tracking-h5 font-bold md:py-6 lg:py-8'>
        {product.productName}
      </h5>
      <PrimaryButton text='see product' onButtonClick={goToProduct} />
    </li>
  );
}
