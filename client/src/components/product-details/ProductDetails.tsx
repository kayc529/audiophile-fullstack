import { useDispatch, useSelector } from 'react-redux';
import { Cart, Product } from '../../utils/interface';
import { convertProductToCartItem } from '../../utils/productToCartItemHelper';
import { PrimaryButton, Counter } from '../common';
import { useState } from 'react';
import { updateCart } from '../../features/user/userSlice';
import { TOAST_MESSAGE_TYPE, toastMessage } from '../../utils/toastHelper';
import { addItemToCurrentCart } from '../../utils/cartHelper';
import { AppDispatch, RootState } from '../../store';

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const { cart } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = async () => {
    let cartItem = convertProductToCartItem(product);
    cartItem.quantity = quantity;

    if (cart) {
      let newCart: Cart = addItemToCurrentCart(cart, cartItem);
      try {
        dispatch(updateCart(newCart)).unwrap();
        toastMessage('Item added to cart');
      } catch (error: any) {
        console.log('addToCart', error);
        toastMessage(error.msg, TOAST_MESSAGE_TYPE.ERROR);
      }
    }
  };

  const onQuantityChange = (quantity: number) => {
    //the quantity must be at least 1
    setQuantity(quantity >= 1 ? quantity : 1);
  };

  return (
    <article className='w-full flex flex-col items-center space-y-8 md:flex-row md:space-x-[70px] md:space-y-0 lg:space-x-[125px]'>
      <picture className='lg:w-[560px]'>
        <source srcSet={product.image.mobile} media='(max-width:767px)' />
        <source srcSet={product.image.tablet} media='(max-width:967px)' />
        <img
          className='w-auto h-[352px] rounded-lg object-cover md:min-h-[480px] lg:h-auto'
          src={product.image.desktop}
          alt=''
        />
      </picture>
      <div className='w-full flex flex-col items-center md:w-[340px] md:items-start lg:w-[445px]'>
        {product.isNew && (
          <p className='w-full uppercase text-start text-mainOrange text-md leading-md tracking-md'>
            new product
          </p>
        )}
        <h2 className='w-full py-4 uppercase text-start text-h4 leading-h4 tracking-h4 font-bold md:w-[400px] md:pb-8 md:text-h4 md:leading-h4 md:tracking-h4 lg:text-h2 lg:leading-h2 lg:tracking-h2 lg:w-full'>
          {product.productName}
        </h2>
        <p className='pb-6 text-start text-lg leading-lg tracking-lg md:pb-8'>
          {product.description}
        </p>
        <p className='w-full pb-6 text-start text-h6 leading-h6 tracking-h6 font-bold md:pb-8 lg:pb-12'>
          $ {product.price?.toLocaleString('en-US') || ' - '}
        </p>
        <div className='w-full flex space-x-4'>
          <Counter onCountChanged={onQuantityChange} count={quantity} />
          <PrimaryButton text='add to cart' onButtonClick={addToCart} />
        </div>
      </div>
    </article>
  );
}
