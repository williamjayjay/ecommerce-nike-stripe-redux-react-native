import { CartListType } from "@/presentation/ui/components/CartList/types";

interface ApiConfig {
    focused: boolean;
    keepUnusedDataFor: number;
    middlewareRegistered: boolean;
    online: boolean;
    reducerPath: string;
    refetchOnFocus: boolean;
    refetchOnMountOrArgChange: boolean;
    refetchOnReconnect: boolean;
}
interface ApiState {
    config: ApiConfig;
    mutations: Record<string, unknown>;
    provided: Record<string, unknown>;
    queries: Record<string, unknown>;
    subscriptions: Record<string, unknown>;
}

interface CartState {
    deliveryFee: number;
    freeDeliveryFrom: number;
    items: CartListType[];
}

interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
}

interface ProductsState {
    products: Product[];
    selectedProduct: Product | undefined;
}

interface AppState {
    api: ApiState;
    cart: CartState;
    products: ProductsState;
}

export { AppState }
