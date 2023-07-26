import { Cart, CartItem } from './interface';
const _ = require('lodash');

export const addItemToCurrentCart = (
  currentCart: Cart,
  newItem: CartItem
): Cart => {
  let newCart: Cart = _.cloneDeep(currentCart);

  console.log('newCart._id', newCart._id.trim());

  const index = newCart.items.findIndex(
    (item: CartItem) => item.productId === newItem.productId
  );
  if (index !== -1) {
    newCart.items[index].quantity += newItem.quantity;
  } else {
    newCart.items.push(newItem);
  }

  return newCart;
};

export const updateCartItemQuantity = (
  currentCart: Cart,
  newItem: CartItem
): Cart => {
  let newCart: Cart = _.cloneDeep(currentCart);
  newCart.items.forEach((item) => {
    if (item.productId === newItem.productId) {
      item.quantity = newItem.quantity;
    }
  });
  return newCart;
};

export const removeItemFromCurrentCart = (
  currentCart: Cart,
  itemToRemove: CartItem
): Cart => {
  let newCart = _.cloneDeep(currentCart);

  newCart.items = newCart.items.filter(
    (item: CartItem) => item.productId !== itemToRemove.productId
  );

  return newCart;
};
