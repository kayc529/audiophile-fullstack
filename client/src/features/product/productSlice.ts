import { createSlice } from '@reduxjs/toolkit';
import { productDetailsData } from '../../data/product-details-data';
import { Product } from '../../utils/interface';

interface ProductInitialState {
  isLoading: boolean;
  currentProduct: Product | null;
}
const initialState: ProductInitialState = {
  isLoading: false,
  currentProduct: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductWithId: (state, action) => {
      let productId = action.payload;
      let product =
        productDetailsData.find((p) => p.productId === productId) || null;
      return { ...state, currentProduct: product };
    },
  },
  extraReducers: {},
});

export const { getProductWithId } = productSlice.actions;
export default productSlice.reducer;
