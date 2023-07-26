export default function AboutCompany() {
  return (
    <section className='w-full max-w-mainContentMobile h-max flex flex-col space-y-10 md:max-w-mainContentTablet md:space-y-[64px] lg:max-w-mainContent lg:h-[588px] lg:flex-row-reverse lg:space-y-0 lg:space-x-reverse lg:space-x-[30px]'>
      <img
        className='--reveal --fadeIn --delay-animation-400 about-company-bg w-full h-[300px] rounded-lg lg:w-1/2 lg:h-full'
        src=''
        alt=''
      />
      <div className='w-full h-max flex flex-col justify-center items-center lg:w-1/2 lg:items-start'>
        <p className='--reveal --fadeLeft uppercase text-center text-h4 tracking-h4 leading-h4 font-bold md:w-[570px] md:text-h2 md:tracking-h2 md:leading-h2 lg:w-[445px] lg:text-start'>
          bringing you the <span className='text-darkOrange'>best</span> audio
          gear
        </p>
        <p className='--reveal --fadeLeft pt-8 text-lg text-center leading-lg tracking-lg md:md:w-[570px] lg:w-[445px] lg:text-start'>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </section>
  );
}
