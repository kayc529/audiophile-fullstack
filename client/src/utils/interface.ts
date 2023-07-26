export interface ProductAccessory {
  item: string;
  quantity: number;
}

export interface ProductPhoto {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface RelatedProducts {
  productId: string;
  productName: string;
  image: ProductPhoto;
}

export interface Product {
  productId: string;
  productName: string;
  productCode: string;
  description: string;
  category: string;
  image: ProductPhoto;
  categoryImage: ProductPhoto;
  isNew: boolean;

  //detail page only
  features?: string;
  price?: number;
  includes?: ProductAccessory[];
  gallery?: ProductPhoto[];
  relatedProducts?: RelatedProducts[];
}

export interface InfoObject {
  value: string;
  isError: boolean;
  errorMsg?: string;
}

export const isInfoObject = (object: any) => {
  return object.value;
};

export interface FormInfo {}

export interface AddressFormInfo extends FormInfo {
  name?: InfoObject;
  unit?: InfoObject;
  street?: InfoObject;
  city?: InfoObject;
  state?: InfoObject;
  postalCode?: InfoObject;
  country?: InfoObject;
  phoneNumber?: InfoObject;
}
export interface CheckoutFormInfo extends AddressFormInfo {
  email?: InfoObject;
  paymentMethod?: InfoObject;
  eMoneyNumber?: InfoObject;
  eMoneyPin?: InfoObject;
}

export interface LoginRegisterFormInfo extends FormInfo {
  email?: InfoObject;
  password?: InfoObject;
  newPassword?: InfoObject;
  retypePassword?: InfoObject;
  firstName?: InfoObject;
  lastName?: InfoObject;
}

export interface AccountInfoFormInfo extends FormInfo {
  firstName?: InfoObject;
  lastName?: InfoObject;
  email?: InfoObject;
  retypeEmail?: InfoObject;
  currentPassword?: InfoObject;
  password?: InfoObject;
  newPassword?: InfoObject;
  retypePassword?: InfoObject;
}

export interface Cart {
  _id: string;
  items: CartItem[];
  createdAt: string;
}

export interface CartItem {
  productId: string;
  productCode: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

export interface Address {
  _id?: string;
  attn: string;
  unit?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault?: boolean;
}
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  defaultAddress?: Address;
  addresses?: Address[];
  role: string;
}

export interface Order {
  _id?: string;
  customerId?: string;
  orderId?: number;
  status?: string;
  items: CartItem[];
  grandTotal: number;
  subtotal: number;
  tax: number;
  shipping: number;
  shippingAddress: Address;
  paymentMethod: string;
  cardNumber?: string;
  createdAt?: string;
  shippedAt?: string;
}

export interface ResponseError {
  success: boolean;
  msg: string;
}

export interface RegisterUser {
  firstName: string | undefined;
  lastName: string | undefined;
  password: string | undefined;
  email: string | undefined;
}

export interface LoginCredentials {
  email: string | undefined;
  password: string | undefined;
}

export interface UpdateUserInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  currentPassword?: string;
  password?: string;
  defaultAddress?: Address;
  addresses?: Address[];
  role?: string;
}
