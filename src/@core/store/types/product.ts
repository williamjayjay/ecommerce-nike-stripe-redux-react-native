type Product = {
    _id: string;
    image: string;
    images: string[];
    name: string;
    price: number;
    sizes: number[];
    description: string;
};

type ProductSelected = {
    _id: string;
    image: string;
    name: string;
    price: number;
    size: number;
    description: string;
};


type initialStateProductsSlice = {
    products: Product[],
    selectedProduct: Product | undefined,
}

interface CartItemSlice {
    product: Product;
    quantity: number;
  }

  interface InitialStateCartStateSlice {
    items: CartItemSlice[];
    deliveryFee: number;
    freeDeliveryFrom: number;
  }
  

export { Product, initialStateProductsSlice, InitialStateCartStateSlice, ProductSelected }
