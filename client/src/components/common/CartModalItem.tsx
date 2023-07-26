import React from 'react';
import { Cart, CartItem } from '../../utils/interface';
import Counter from './Counter';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../features/user/userSlice';
import {
  removeItemFromCurrentCart,
  updateCartItemQuantity,
} from '../../utils/cartHelper';
import { AppDispatch, RootState } from '../../store';
import { TOAST_MESSAGE_TYPE, toastMessage } from '../../utils/toastHelper';
var _ = require('lodash');

interface Props {
  cartItem: CartItem;
}

export default function CartModalItem({ cartItem }: Props) {
  const { cart } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const countChanged = (newCount: number) => {
    //TODO if the newCount is 0
    //remove item
    if (newCount !== cartItem.quantity && cart) {
      let newCart: Cart | undefined = undefined;
      if (newCount === 0) {
        newCart = removeItemFromCurrentCart(cart, cartItem);
      } else {
        const newCartItem = _.cloneDeep(cartItem);
        newCartItem.quantity = newCount;
        newCart = updateCartItemQuantity(cart, newCartItem);
      }

      try {
        dispatch(updateCart(newCart)).unwrap();
      } catch (error: any) {
        console.log('item count changed', error);
        toastMessage(error.msg, TOAST_MESSAGE_TYPE.ERROR);
      }
    }
  };

  return (
    <li className='flex justify-between items-center'>
      <div className='flex space-x-4 items-center'>
        <img
          className='w-16 h-16 rounded-lg object-cover'
          src={cartItem.thumbnail}
          alt=''
        />
        <div>
          <p className='text-lg tracking-lg font-bold'>
            {cartItem.productCode}
          </p>
          <p className='text-lg tracking-lg font-bold opacity-50'>
            $ {cartItem.price.toLocaleString()}
          </p>
        </div>
      </div>
      <Counter
        forCart={true}
        count={cartItem.quantity}
        onCountChanged={countChanged}
      />
    </li>
  );
}
