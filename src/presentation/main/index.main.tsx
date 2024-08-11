import { FC } from "react";
import { store } from "@/@core/store";
import { STRIPE_KEY } from "@/@core/constants/stripe";
import { Routes } from "@/presentation/ui/routes/navigation";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Provider } from "react-redux";
import { IMain } from "./types/main.type";
import { useMain } from "./hooks/main.hook";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

export const Main: FC<IMain.Input> = (props = {}) => {

    const { onLayoutRootView, initialRoute, isLoaded } = useMain(props);
    if (!isLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Provider store={store}>

                <StripeProvider publishableKey={STRIPE_KEY}>
                    <View className="flex-1" testID="main" onLayout={onLayoutRootView}>

                        <Routes initialRoute={initialRoute} />
                    </View>
                </StripeProvider>
            </Provider>
        </NavigationContainer>

    );
};
