import { ProductSelected } from '@/@core/store/types/product';

type CartListType = {
    product: ProductSelected;
    quantity: number;
  }
  
  type CartType = {
    cartItem: CartListType
  }

  
  export {CartType, CartListType}