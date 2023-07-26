import { AboutCompany } from '../components/common';
import Hero from '../components/home/Hero';
import HighlightedProducts from '../components/home/HighlightedProducts';
import { ProductCategories } from '../components/common';

export default function HomePage() {
  return (
    <div className='w-full pb-footerSpaceMobile flex flex-col md:pb-footerSpaceTablet lg:pb-footerSpace'>
      <Hero />
      <section className='w-full pt-10 px-4 flex flex-col items-center space-y-[120px] md:pt-[96px] md:space-y-[96px] lg:pt-30 lg:space-y-[168px]'>
        <ProductCategories />
        <HighlightedProducts />
        <AboutCompany />
      </section>
    </div>
  );
}
