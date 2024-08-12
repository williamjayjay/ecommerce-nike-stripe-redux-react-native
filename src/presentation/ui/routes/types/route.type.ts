
export namespace IRoute {

    export interface Input {
        initialRoute: {
            rootStack: "public";
            rootStackScreen: "Produtos" | "Detalhes" | "Carrinho" | "Ordem da compra";
        };
    }

    export type RootStackParamList = {
        public: {
            screen: "Produtos" | "Detalhes" | "Carrinho" | "Ordem da compra"
        }
    }

    export type PublicStackRoutes = {
        "Produtos": undefined;
        "Detalhes": undefined;
        "Carrinho": undefined;
        "Ordem da compra": undefined;
    };
}




