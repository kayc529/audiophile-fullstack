import ProductsPreviewPageSharedLayout from '../components/products-preview/ProductsPreviewPageSharedLayout';
import { earphonesData } from '../data/product-data';

export default function EarphonesPage() {
  return (
    <ProductsPreviewPageSharedLayout
      categoryName='earphones'
      products={earphonesData}
    />
  );
}
