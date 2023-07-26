import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../common';

export default function YX1Eaphones() {
  const navigate = useNavigate();
  const goToProduct = () => {
    navigate('/product/yx1-wireless-earphones');
  };

  return (
    <article className='w-full flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-3 lg:space-x-[30px]'>
      <div className='--scroll-opacity yx1-earphones-1 home-yx1-earphones-bg w-full h-[200px] rounded-lg md:w-1/2 md:h-[320px]'></div>
      <div className='--scroll-opacity yx1-earphones-2 w-full h-[200px] pl-6 rounded-lg bg-mainGrey flex flex-col justify-center md:w-1/2 md:h-[320px] md:pl-[41px] lg:pl-[95px]'>
        <p className='mb-8 uppercase text-h4 text-black font-bold tracking-h4'>
          yx1 earphones
        </p>
        <SecondaryButton
          text='see product'
          darkMode={false}
          onButtonClick={goToProduct}
        />
      </div>
    </article>
  );
}
