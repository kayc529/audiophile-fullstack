import { useEffect } from 'react';
import ProductDetailsSharedLayout from '../components/product-details/ProductDetailsSharedLayout';
import { productDetailsData } from '../data/product-details-data';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import { getProductWithId } from '../features/product/productSlice';

export default function ProductDetailPage() {
  const { currentProduct } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    let productId = params.productId;
    if (productId) {
      dispatch(getProductWithId(productId));
    }
  }, [params, dispatch]);

  return <ProductDetailsSharedLayout product={currentProduct} />;
}
