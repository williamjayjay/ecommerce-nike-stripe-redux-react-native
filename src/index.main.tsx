import { FC } from "react";
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { IMain } from "./main.dto";
import { useMain } from "./main.hook";
import * as SplashScreen from 'expo-splash-screen'
import { Home } from "@/screens/Home";

SplashScreen.preventAutoHideAsync().then()

export const Main: FC<IMain.Input> = (props = {}) => {
    const { fontsLoaded, fontError, onLayoutRootView } = useMain(props);
    console.log('open screen main')

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View onLayout={onLayoutRootView} className="flex-1 items-center justify-center bg-primary-500">
            <Home />
            <StatusBar style="light" />
        </View>
    );
};
