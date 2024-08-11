import { productData } from '@/@core/data/product';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: productData,
  selectedProduct: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      const productId = action.payload;
      state.selectedProduct = state.products.find((p) => p.id === productId);
    },
  },
});
