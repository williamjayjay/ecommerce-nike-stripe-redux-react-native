import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Pressable, Text } from 'react-native';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectNumberOfItems } from '@/@core/store/cartSlice';
import { ProductDetailsScreen } from '@/presentation/ui/screens/ProductDetailsScreen';
import { ProductsScreen } from '@/presentation/ui/screens/ProductsScreen';
import { ShoppingCart } from '@/presentation/ui/screens/ShoppingCart';
import { TrackOrder } from '@/presentation/ui/screens/TrackOrder';
import { FC } from 'react';
import { IRoute } from './types/route.type';

const RootStackNavigator = createNativeStackNavigator<IRoute.PublicStackRoutes>();

type RoutesProps = Pick<IRoute.Input, 'initialRoute'>;

const Routes: FC<RoutesProps> = ({ initialRoute }) => {

  const numberOfItems = useSelector(selectNumberOfItems);

  return (
   
      <RootStackNavigator.Navigator
        screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
        initialRouteName={initialRoute.rootStackScreen}
      >
        <RootStackNavigator.Screen
          name="Produtos"
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Carrinho")}
                style={{ flexDirection: 'row' }}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                  {numberOfItems}
                </Text>
              </Pressable>
            ),
            headerLeft: () => (
              <MaterialCommunityIcons
                onPress={() => navigation.navigate("Ordem da compra")}
                name="truck-delivery"
                size={22}
                color="gray"
              />
            ),
          })}
        />
        <RootStackNavigator.Screen
          name="Detalhes"
          component={ProductDetailsScreen}
          options={{ presentation: 'modal' }}
        />
        <RootStackNavigator.Screen name="Carrinho" component={ShoppingCart} />
        <RootStackNavigator.Screen name="Ordem da compra" component={TrackOrder} />
      </RootStackNavigator.Navigator>
  );
};

export { Routes };
