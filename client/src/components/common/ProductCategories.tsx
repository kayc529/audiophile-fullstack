import { useEffect } from 'react';
import ProductCategory from './ProductCategory';
import { revealAnimatedElements } from '../../utils/scrollingAnimation';

export default function ProductCategories() {
  useEffect(() => {
    revealAnimatedElements();
  }, []);
  return (
    <section className='w-full max-w-mainContentMobile flex flex-col items-center space-y-4 md:max-w-mainContentTablet md:space-y-0 md:space-x-[10px] md:flex-row lg:max-w-mainContent lg:space-x-[30px]'>
      <ProductCategory categoryName='headphones'>
        <img
          className='--reveal --fadeTop z-10 w-[150px] lg:w-[200px]'
          src='/assets/shared/desktop/image-category-thumbnail-headphones.png'
          alt=''
        />
      </ProductCategory>
      <ProductCategory categoryName='speakers'>
        <img
          className='--reveal --fadeTop --delay-animation-200 z-10 mt-3 w-[150px] lg:w-[200px]'
          src='/assets/shared/desktop/image-category-thumbnail-speakers.png'
          alt=''
        />
      </ProductCategory>
      <ProductCategory categoryName='earphones'>
        <img
          className='--reveal --fadeTop --delay-animation-400 z-10 mt-5 w-[150px] lg:w-[200px]'
          src='/assets/shared/desktop/image-category-thumbnail-earphones.png'
          alt=''
        />
      </ProductCategory>
    </section>
  );
}
