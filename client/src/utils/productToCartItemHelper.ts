import { CartItem, Product } from './interface';

export const convertProductToCartItem = (product: Product): CartItem => {
  let cartItem: CartItem = {
    productId: product.productId,
    productCode: product.productCode,
    thumbnail: product.categoryImage.desktop,
    price: product.price || 0,
    quantity: 1,
  };

  return cartItem;
};
