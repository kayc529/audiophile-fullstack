import { Product } from '../../utils/interface';
import {
  ProductCategoryBanner,
  ProductCategories,
  AboutCompany,
  ProductPreview,
} from '../common';

interface Props {
  categoryName: string;
  products: Product[];
}

export default function ProductsPreviewPageSharedLayout({
  categoryName,
  products,
}: Props) {
  return (
    <div className='w-full pb-30 flex flex-col items-center lg:pb-40'>
      <ProductCategoryBanner name={categoryName} />
      <div className='w-full max-w-mainContentMobile px-4 pt-16 space-y-30 flex flex-col items-center md:max-w-mainContentTablet md:pt-30 lg:max-w-mainContent lg:pt-40 lg:space-y-40'>
        <section className='flex flex-col space-y-30 lg:space-y-40 '>
          {products.map((product, index) => {
            return <ProductPreview key={index} product={product} />;
          })}
        </section>
        <div className='w-full flex justify-center pt-12 lg:pt-20'>
          <ProductCategories />
        </div>
        <AboutCompany />
      </div>
    </div>
  );
}
