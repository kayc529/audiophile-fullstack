import React from 'react';
import { TertiaryButton } from '.';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { closeAllModals } from '../../features/modal/modalSlice';

interface Props {
  categoryName: string;
  children: JSX.Element;
}

export default function ProductCategory({ categoryName, children }: Props) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const goToProductPage = () => {
    dispatch(closeAllModals());
    navigate(`/${categoryName}`);
  };

  return (
    <article className='relative w-full h-productCategoryTablet rounded-lg flex flex-col items-center justify-start md:w-1/3 lg:h-productCategory'>
      <div className='absolute bottom-0 w-full h-[165px] bg-mainGrey rounded-lg lg:h-[204px]'>
        <div className='absolute bottom-7 w-full flex flex-col items-center'>
          <p className='pb-4 uppercase font-bold text-lg tracking-lg lg:text-h6 lg:tracking-h6'>
            {categoryName}
          </p>
          <TertiaryButton text='shop' onButtonClick={goToProductPage} />
        </div>
      </div>
      {children}
    </article>
  );
}
