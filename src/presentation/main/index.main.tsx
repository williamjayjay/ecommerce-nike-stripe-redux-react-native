import { FC } from "react";
import { store } from "@/@core/store";
import { Routes } from "@/presentation/ui/routes/route";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Provider } from "react-redux";
import { IMain } from "./types/main.type";
import { useMain } from "./hooks/main.hook";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import Toast from 'react-native-toast-message';
import { ToastNotification } from '@/presentation/ui/components/ToastNotification/toastNotification.index';

export const Main: FC<IMain.Input> = (props = {}) => {

    const { onLayoutRootView, initialRoute, isLoaded } = useMain(props);
    if (!isLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Provider store={store}>

                <StripeProvider publishableKey={process?.env?.EXPO_PUBLIC_STRIPE_PUBLIC_KEY || ""}>
                    <View className="flex-1" testID="main" onLayout={onLayoutRootView}>
                        <Routes initialRoute={initialRoute} />
                        <Toast
                                position="top"
                                config={{
                                    success: (props) => <ToastNotification   {...props} type="success" />,
                                    error: (props) => <ToastNotification   {...props} type="error" />,
                                }}
                            />
                    </View>
                </StripeProvider>
            </Provider>
        </NavigationContainer>

    );
};
