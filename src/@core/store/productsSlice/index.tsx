import { productData } from '@/@core/data/product';
import { createSlice } from '@reduxjs/toolkit';
import { initialStateProductsSlice } from '../types/product';

const initialState = {
  products: productData,
  selectedProduct: undefined,
} as initialStateProductsSlice

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      const productId = action.payload;
      state.selectedProduct = state.products.find((p) => p._id === productId);
    },
  },
});
