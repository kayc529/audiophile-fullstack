import ProductsPreviewPageSharedLayout from '../components/products-preview/ProductsPreviewPageSharedLayout';
import { speakersData } from '../data/product-data';

export default function SpeakersPage() {
  return (
    <ProductsPreviewPageSharedLayout
      categoryName='speakers'
      products={speakersData}
    />
  );
}
