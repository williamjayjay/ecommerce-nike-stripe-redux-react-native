import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectNumberOfItems } from '@/@core/store/cartSlice';
import { ProductDetailsScreen } from '@/presentation/ui/screens/ProductDetailsScreen';
import { ProductsScreen } from '@/presentation/ui/screens/ProductsScreen';
import { ShoppingCart } from '@/presentation/ui/screens/ShoppingCart';
import { TrackOrder } from '@/presentation/ui/screens/TrackOrder';
import { FC } from 'react';
import { IRoute } from './types/route.type';
import colors from '@/presentation/ui/styles/colors.json'

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
          headerTitleStyle: {
            fontFamily: 'Karla_500Medium',
            fontSize: 22,
          },
          headerTintColor: '#272727',

          headerLeft: () => (
            <TouchableOpacity className='pr-1 items-center justify-center' onPress={() => navigation.navigate("Ordem da compra")}>
              <MaterialCommunityIcons
                name="truck-delivery"
                size={22}
                color={colors.primary[500]}
              />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity
              className='flex-row items-center'
              onPress={() => navigation.navigate("Carrinho")}>
              <FontAwesome5 name="shopping-cart" size={18}
                color={colors.primary[500]}
              />
              <Text className='font-karla500Medium text-primary-500 ml-1 text-base'>{numberOfItems}</Text>
            </TouchableOpacity>
          )

        })}
      />
      <RootStackNavigator.Screen
        name="Detalhes"
        component={ProductDetailsScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Karla_500Medium',
            fontSize: 22,
          },
          headerTintColor: '#272727',
          presentation: 'modal'
        }}
      />

      <RootStackNavigator.Screen name="Carrinho" component={ShoppingCart}
        options={{
          headerTitleStyle: {
            fontFamily: 'Karla_500Medium',
            fontSize: 22,
          },
          headerTintColor: '#272727',
        }}
      />
      <RootStackNavigator.Screen name="Ordem da compra" component={TrackOrder}
        options={{
          headerTitleStyle: {
            fontFamily: 'Karla_500Medium',
            fontSize: 22,
          },
          headerTintColor: '#272727',
        }} />
    </RootStackNavigator.Navigator>
  );
};

export { Routes };
