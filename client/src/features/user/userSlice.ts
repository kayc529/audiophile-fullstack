import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  RegisterUser,
  User,
  LoginCredentials,
  UpdateUserInfo,
  Address,
  Cart,
  ResponseError,
} from '../../utils/interface';
import {
  getUserInfoFromLocalStorage,
  removeUserInfoFromLocalStorage,
  storeUserInfoInLocalStorage,
} from '../../utils/localStorageHelper';
import customFetch from '../../utils/customFetch';
import { RootState } from '../../store';
import { reorderAddresses } from '../../utils/addressHelper';
const _ = require('lodash');

export interface UserInitialState {
  isLoading: boolean;
  user: User | undefined;
  cart: Cart | undefined;
  isUsingDefaultAddress: boolean;
  defaultAddress: Address | undefined;
  addresses: Address[];
}

const initialState: UserInitialState = {
  isLoading: false,
  user: getUserInfoFromLocalStorage(),
  cart: undefined,
  isUsingDefaultAddress: false,
  defaultAddress: undefined,
  addresses: [],
};

export const loginUser = createAsyncThunk<
  { success: boolean; user: User; cart: Cart },
  LoginCredentials,
  { rejectValue: ResponseError }
>('user/login', async (credentials, thunkApi) => {
  try {
    const res = await customFetch.post('/auth/login', credentials);
    return res.data;
  } catch (error: any) {
    console.log('login', error);
    return thunkApi.rejectWithValue({
      success: false,
      msg: error.response.data.msg,
    });
  }
});

export const registerUser = createAsyncThunk<
  { success: boolean; user: User; cart: Cart },
  RegisterUser,
  { rejectValue: ResponseError }
>('user/register', async (newUser, thunkApi) => {
  try {
    const res = await customFetch.post('/auth/register', newUser);
    return res.data;
  } catch (error: any) {
    console.log('register', error);
    return thunkApi.rejectWithValue({
      success: false,
      msg: error.response.data.msg,
    });
  }
});

export const logoutUser = createAsyncThunk<
  { success: boolean },
  void,
  { rejectValue: ResponseError }
>('user/logout', async (_, thunkApi) => {
  try {
    const res = await customFetch.get('/auth/logout');
    return res.data;
  } catch (error: any) {
    console.log('logout:', error);
    return thunkApi.rejectWithValue({
      success: false,
      msg: error.response.data.msg,
    });
  }
});

export const updateUserInfo = createAsyncThunk<
  { success: boolean; user: User },
  { userId: string; user: UpdateUserInfo },
  { rejectValue: { success: boolean; msg: string } }
>('user/updateUserInfo', async (userInfo, thunkApi) => {
  try {
    const res = await customFetch.patch(
      `/user/${userInfo.userId}`,
      userInfo.user
    );
    return res.data;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue({
      success: false,
      msg: error.response.data.msg,
    });
  }
});

export const getUserAddresses = createAsyncThunk(
  'user/getUserAddresses',
  async (userId: string | undefined, thunkApi) => {
    try {
      const res = await customFetch.get(`/user/addresses/${userId}`);
      return res.data;
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue({
        success: false,
        msg: error.response.data.msg,
      });
    }
  }
);

export const updateUserAddresses = createAsyncThunk<
  { success: boolean; user: User },
  { userId: string; address: Address },
  { state: RootState }
>('user/updateUserAddresses', async (userInfo, thunkApi) => {
  try {
    const res = await customFetch.patch(
      `/user/addresses/${userInfo.userId}`,
      userInfo
    );
    return res.data;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue({
      success: false,
      msg: error.response.data.msg,
    });
  }
});

export const deleteUserAddress = createAsyncThunk<
  { success: boolean; user: UpdateUserInfo },
  string,
  { rejectValue: { success: boolean; msg: string } }
>('user/deleteUserAddress', async (addressId, thunkApi) => {
  try {
    const res = await customFetch.delete(`/user/addresses/${addressId}`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue({
      success: false,
      msg: error.response.data.msg,
    });
  }
});

export const getCart = createAsyncThunk<
  { success: boolean; cart: Cart },
  void,
  { rejectValue: ResponseError }
>('user/getCart', async (_, thunkApi) => {
  try {
    const res = await customFetch.get('/cart');
    return res.data;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue({
      success: false,
      msg: error.response.data.msg,
    });
  }
});

export const updateCart = createAsyncThunk<
  { success: boolean; cart: Cart },
  Cart,
  { rejectValue: ResponseError }
>('user/updateCart', async (newCart, thunkApi) => {
  try {
    console.log('udpateCart: ', newCart);
    const res = await customFetch.patch('/cart', newCart);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue({
      success: false,
      msg: error.response.data.msg,
    });
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleIsUsingDefaultAddress: (state) => {
      return { ...state, isUsingDefaultAddress: !state.isUsingDefaultAddress };
    },
  },
  extraReducers: (builder) => {
    //Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.user = undefined;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      storeUserInfoInLocalStorage(payload.user);
      state.isLoading = false;
      state.user = payload.user;
      state.cart = payload.cart;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      state.user = undefined;
    });
    //Register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.user = undefined;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      storeUserInfoInLocalStorage(payload.user);
      state.isLoading = false;
      state.user = payload.user;
      state.cart = payload.cart;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      state.user = undefined;
    });
    //Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
      removeUserInfoFromLocalStorage();
      state.isLoading = false;
      state.user = undefined;
      state.cart = undefined;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.isLoading = false;
    });
    //Update User Info
    builder.addCase(updateUserInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, { payload }) => {
      storeUserInfoInLocalStorage(payload.user);
      state.isLoading = false;
      state.user = payload.user;
    });
    builder.addCase(updateUserInfo.rejected, (state) => {
      state.isLoading = false;
    });
    //Get user addresses
    builder.addCase(getUserAddresses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserAddresses.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const { defaultAddress, addresses } = reorderAddresses(
        payload.user.defaultAddress,
        payload.user.addresses
      );
      state.defaultAddress = defaultAddress;
      state.addresses = addresses;
      if (state.user && state.user.defaultAddress !== defaultAddress) {
        storeUserInfoInLocalStorage({ ...state.user, defaultAddress });
        state.user.defaultAddress = defaultAddress;
      }
    });
    builder.addCase(getUserAddresses.rejected, (state) => {
      state.isLoading = false;
    });
    //Update user addresses
    builder.addCase(updateUserAddresses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserAddresses.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const { defaultAddress, addresses } = reorderAddresses(
        payload.user.defaultAddress,
        payload.user.addresses
      );
      state.defaultAddress = defaultAddress;
      state.addresses = addresses;
    });
    builder.addCase(updateUserAddresses.rejected, (state) => {
      state.isLoading = false;
    });
    //Delete user addresses
    builder.addCase(deleteUserAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUserAddress.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const { defaultAddress, addresses } = reorderAddresses(
        payload.user.defaultAddress,
        payload.user.addresses
      );
      state.defaultAddress = defaultAddress;
      state.addresses = addresses;
    });
    builder.addCase(deleteUserAddress.rejected, (state) => {
      state.isLoading = false;
    });
    //Get Cart
    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.cart = payload.cart;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.isLoading = false;
    });
    //Update Cart
    builder.addCase(updateCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCart.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.cart = payload.cart;
    });
    builder.addCase(updateCart.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { toggleIsUsingDefaultAddress } = userSlice.actions;

export default userSlice.reducer;
