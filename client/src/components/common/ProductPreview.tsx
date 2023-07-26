import { useNavigate } from 'react-router-dom';
import { Product } from '../../utils/interface';
import { PrimaryButton, Counter } from '.';
import { useState } from 'react';

interface Props {
  product: Product;
  detail?: boolean;
}

export default function ProductPreview({ product, detail = false }: Props) {
  const navigate = useNavigate();

  const goToProductDetails = () => {
    navigate(`/product/${product.productId}`);
  };

  return (
    <article className='flex flex-col items-center space-y-8 md:space-y-12 lg:space-x-[125px] lg:space-y-0 odd:lg:flex-row even:lg:flex-row-reverse even:lg:space-x-reverse'>
      <picture>
        <source
          srcSet={product.categoryImage.mobile}
          media='(max-width:767px)'
        />
        <source
          srcSet={product.categoryImage.tablet}
          media='(max-width:967px)'
        />
        <img
          className='h-[352px] rounded-lg object-cover lg:min-h-[560px]'
          src={product.categoryImage.desktop}
          alt=''
        />
      </picture>
      <div className='flex flex-col items-center md:w-[572px] lg:w-[445px] lg:items-start'>
        {product.isNew && (
          <p className='uppercase text-center text-mainOrange text-md leading-md tracking-md lg:text-start'>
            new product
          </p>
        )}
        <h2 className='w-[400px] py-4  uppercase text-center text-h4 leading-h4 tracking-h4 font-bold md:pb-8 md:text-h2 md:leading-h2 md:tracking-h2 lg:w-full lg:text-start'>
          {product.productName}
        </h2>
        <p className='pb-10 text-center text-lg leading-lg tracking-lg lg:text-start'>
          {product.description}
        </p>
        <PrimaryButton text='see product' onButtonClick={goToProductDetails} />
      </div>
    </article>
  );
}
