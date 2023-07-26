import { CartItem } from './interface';

const VAT = 0.13;

export const calculateTotalAmount = (cartItems?: CartItem[]) => {
  if (!cartItems) {
    return 0;
  }
  return cartItems.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
    0
  );
};

export const calculateShipping = () => {
  return 50;
};

export const calculateVAT = (cartItems?: CartItem[] | number) => {
  if (!cartItems) {
    return 0;
  }

  return Array.isArray(cartItems)
    ? calculateTotalAmount(cartItems) * VAT
    : cartItems * VAT;
};

export const calculateGrandTotalAmount = (cartItems?: CartItem[]) => {
  if (!cartItems) {
    return 0;
  }
  let total = calculateTotalAmount(cartItems);
  return total + calculateShipping() + calculateVAT(total);
};

export const getAllCheckoutAmount = (cartItems?: CartItem[]) => {
  if (!cartItems) {
    return {
      total: 0,
      tax: 0,
      grandTotal: 0,
      shipping: 0,
    };
  }
  return {
    total: calculateTotalAmount(cartItems),
    tax: calculateVAT(cartItems),
    grandTotal: calculateGrandTotalAmount(cartItems),
    shipping: calculateShipping(),
  };
};
