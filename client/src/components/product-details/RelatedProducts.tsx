import React from 'react';
import { RelatedProducts as IRelatedProduct } from '../../utils/interface';
import RelatedProduct from './RelatedProduct';

interface Props {
  relatedProducts: IRelatedProduct[] | undefined;
}

export default function RelatedProducts({ relatedProducts }: Props) {
  return (
    <article className='w-full flex flex-col items-center'>
      <h3 className='pb-10 uppercase text-h5 leading-h5 tracking-h5 font-bold md:pb-14 md:text-h3 md:leading-h3 md:tracking-h3 lg:pb-16'>
        you may also like
      </h3>
      <ul className='w-full flex flex-col space-y-14 md:space-y-0 md:space-x-[11px] md:flex-row lg:space-x-[30px]'>
        {relatedProducts?.map((product) => {
          return <RelatedProduct key={product.productId} product={product} />;
        })}
      </ul>
    </article>
  );
}
