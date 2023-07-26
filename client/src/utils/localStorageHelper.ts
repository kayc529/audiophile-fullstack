import { CartItem, User } from './interface';

export const getCartFromLocalStorage = () => {
  try {
    const jsonStr = localStorage.getItem('cart');
    if (jsonStr) {
      const cartItems = JSON.parse(jsonStr);
      return cartItems;
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateCartInLocalStorage = (cartItems: CartItem[]) => {
  const jsonStr = JSON.stringify(cartItems);
  localStorage.setItem('cart', jsonStr);
};

export const removeCartInLocalStorage = () => {
  localStorage.removeItem('cart');
};

export const storeUserInfoInLocalStorage = (user: User) => {
  const jsonStr = JSON.stringify(user);
  localStorage.setItem('user', jsonStr);
};

export const getUserInfoFromLocalStorage = () => {
  try {
    const jsonStr = localStorage.getItem('user');
    if (jsonStr) {
      const user = JSON.parse(jsonStr);
      return user;
    }

    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const removeUserInfoFromLocalStorage = () => {
  localStorage.removeItem('user');
};
