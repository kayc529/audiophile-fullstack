import { getAllCheckoutAmount } from './checkoutAmountHelper';
import { CartItem, CheckoutFormInfo, Order } from './interface';

export const getOrderObject = (
  cartItems: CartItem[],
  checkoutInfo: CheckoutFormInfo
): Order => {
  const { total, grandTotal, tax, shipping } = getAllCheckoutAmount(cartItems);
  return {
    items: cartItems,
    grandTotal,
    subtotal: total,
    tax,
    shipping,
    shippingAddress: {
      attn: checkoutInfo.name?.value || '',
      unit: checkoutInfo.unit?.value || '',
      street: checkoutInfo.street?.value || '',
      city: checkoutInfo.city?.value || '',
      state: checkoutInfo.state?.value || '',
      postalCode: checkoutInfo.postalCode?.value || '',
      country: checkoutInfo.country?.value || '',
      phoneNumber: checkoutInfo.phoneNumber?.value || '',
    },
    paymentMethod: checkoutInfo.paymentMethod?.value || '',
    cardNumber: checkoutInfo.eMoneyNumber?.value || undefined,
  };
};

export const formatOrderId = (orderId: number | undefined): string => {
  if (!orderId) {
    return '';
  }
  let str = orderId.toString();
  let returnStr = [
    str.substring(0, 3),
    str.substring(3, 6),
    str.substring(6, str.length + 1),
  ].join('-');
  return returnStr;
};
