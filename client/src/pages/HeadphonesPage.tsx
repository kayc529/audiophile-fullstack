import ProductsPreviewPageSharedLayout from '../components/products-preview/ProductsPreviewPageSharedLayout';
import { headphonesData } from '../data/product-data';

export default function HeadphonesPage() {
  return (
    <ProductsPreviewPageSharedLayout
      categoryName='headphones'
      products={headphonesData}
    />
  );
}
