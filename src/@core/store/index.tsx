import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from '@/@core/store/productsSlice';
import { cartSlice } from '@/@core/store/cartSlice';
import { apiSlice } from '@/@core/store/apiSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    api: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
