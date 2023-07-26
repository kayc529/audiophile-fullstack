import Logo from './Logo';
import Navbar from './Navbar';
import SocialMediaNavbar from './SocialMediaNavbar';

const Footer = () => {
  return (
    <footer className='w-full mt-auto px-10 pb-12 bg-backgroundBlack'>
      <section className='relative w-full mx-auto pt-16 flex flex-col items-center md:items-start md:max-w-mainContentTablet lg:max-w-mainContent'>
        <div className='absolute top-0 left-auto w-[101px] h-2 bg-darkOrange md:left-0'></div>
        <div className='w-full flex flex-col items-center space-y-12 md:items-start md:space-y-8 lg:flex-row lg:justify-between lg:items-center lg:space-y-0'>
          <Logo />
          <Navbar />
        </div>
        <div className='w-[327px] py-12 flex justify-between items-end md:w-[689px] md:pt-9 md:pb-20 lg:w-full lg:pb-14'>
          <p className='text-transparentWhite text-lg text-center leading-lg md:text-start lg:w-footerText'>
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>
          <div className='hidden lg:block'>
            <SocialMediaNavbar />
          </div>
        </div>
        <div className='w-full flex flex-col items-center space-y-12 md:flex-row md:justify-between md:space-y-0'>
          <p className='text-transparentWhite text-lg leading-lg'>
            Copyright 2021. All Rights Reserved
          </p>
          <div className='block lg:hidden'>
            <SocialMediaNavbar />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
