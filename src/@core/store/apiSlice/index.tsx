import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_URL_STORE }),
  endpoints: (builder) => ({

    getProducts: builder.query({
      query: () => 'products',
    }),

    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: 'orders',
        method: 'POST',
        body: newOrder,
      }),
    }),
    
    getOrder: builder.query({
      query: (ref) => `orders/${ref}`,
    }),
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: 'payments/intents',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useCreatePaymentIntentMutation
} = apiSlice;
