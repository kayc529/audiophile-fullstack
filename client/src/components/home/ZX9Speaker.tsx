import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../common';

export default function ZX9Speaker() {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate('/product/zx9-speaker');
  };

  return (
    <article className='--scroll-opacity zx9-speaker zx9-speaker-container w-full h-[600px] rounded-lg bg-darkOrange flex flex-col justify-center overflow-hidden md:h-[720px] lg:h-[560px] lg:grid lg:grid-rows-1 lg:grid-cols-2'>
      <div className='relative hidden flex items-end lg:block'>
        <img
          className='absolute left-[130px] -bottom-3 w-[370px] h-auto'
          src='/assets/home/desktop/image-speaker-zx9.png'
          alt=''
        />
      </div>

      <img
        className='block w-[170px] mx-auto md:w-[150px] lg:hidden'
        src='/assets/home/desktop/image-speaker-zx9.png'
        alt=''
      />

      <div className='mx-auto pt-8 flex flex-col justify-center items-center md:pt-16 lg:pt-0 lg:items-start'>
        <p className='w-[200px] text-white text-center text-h2 tracking-h2 leading-h2 font-bold md:w-[260px] md:text-h1 md:tracking-h1 md:leading-h1 lg:text-start'>
          ZX9 SPEAKER
        </p>
        <p className='w-[280px] pt-6 pb-6 text-white text-center text-lg font-medium tracking-lg leading-lg md:w-[350px] md:pb-10 lg:text-start'>
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <SecondaryButton
          text='see product'
          darkMode={true}
          onButtonClick={goToProduct}
        />
      </div>
    </article>
  );
}
