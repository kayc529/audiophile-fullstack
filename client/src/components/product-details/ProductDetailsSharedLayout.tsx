import { Product } from '../../utils/interface';
import { AboutCompany, ProductCategories, TertiaryButton } from '../common';
import Features from './Features';
import InTheBox from './InTheBox';
import Gallery from './Gallery';
import { useNavigate } from 'react-router-dom';
import RelatedProducts from './RelatedProducts';
import ProductDetails from './ProductDetails';

interface Props {
  product: Product | null;
}

export default function ProductDetailsSharedLayout({ product = null }: Props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  if (!product) {
    return <div>lol</div>;
  }

  return (
    <section className='w-full max-w-mainContentMobile pt-4 pb-30 flex flex-col items-center md:max-w-mainContentTablet md:px-6 md:pt-8 lg:max-w-mainContent lg:pt-20 lg:pb-40'>
      <div className='w-full pb-6 lg:pb-14'>
        <TertiaryButton text='go back' onButtonClick={goBack} left={true} />
      </div>

      <div className='w-full space-y-20 flex flex-col md:space-y-30 lg:space-y-40'>
        <ProductDetails product={product} />
        <article className='space-y-20 flex flex-col justify-between md:space-y-30 lg:space-y-0 lg:space-x-4 lg:flex-row'>
          <Features features={product.features} />
          <InTheBox includes={product.includes} />
        </article>
        <Gallery images={product.gallery} />
        <RelatedProducts relatedProducts={product.relatedProducts} />
        <ProductCategories />
        <AboutCompany />
      </div>
    </section>
  );
}
