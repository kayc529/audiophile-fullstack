import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Order, ResponseError } from '../../utils/interface';
import customFetch from '../../utils/customFetch';

interface OrderInitialState {
  isLoading: boolean;
  orders: Order[];
}
const initialState: OrderInitialState = {
  isLoading: false,
  orders: [],
};

export const getOrders = createAsyncThunk<
  {
    success: boolean;
    orders: Order[];
  },
  void,
  { rejectValue: ResponseError }
>('order/getOrders', async (_, thunkApi) => {
  try {
    const res = await customFetch.get('/order/order-history');
    return res.data;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue({
      success: false,
      msg: error.response.data.msg,
    });
  }
});

export const createOrder = createAsyncThunk<
  { success: boolean; order: Order },
  Order,
  { rejectValue: ResponseError }
>('order/createOrder', async (newOrder: Order, thunkApi) => {
  try {
    const res = await customFetch.post('/order', newOrder);
    return res.data;
  } catch (error: any) {
    console.log(error);
    return thunkApi.rejectWithValue({
      success: false,
      msg: error.response.data.msg,
    });
  }
});

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async () => {}
);

const { actions, reducer } = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get orders
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orders = payload.orders;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.isLoading = false;
    });
    //Create order
    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      state.isLoading = false;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = actions;
export default reducer;
