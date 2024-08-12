import {
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useGetProductQuery } from '@/@core/store/apiSlice';
import { cartSlice } from '@/@core/store/cartSlice';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Toast from 'react-native-toast-message';
import colors from '@/presentation/ui/styles/colors.json'

const ProductDetailsScreen = ({ route }: any) => {

  const id = route?.params?.id;

  const { data, isLoading, error } = useGetProductQuery(id);
  const product = data?.data;
  const hasError: FetchBaseQueryError | SerializedError | any = error

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  const addToCart = () => {

    Toast.show({
      type: 'success',
      text1: `${product.name}, adicionado ao carrinho!`,
    });
    dispatch(cartSlice.actions.addCartItem({ product }));

  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.primary[500]} className='flex-1 h-full self-center' />;
  }

  if (hasError) {
    return <Text className='font-karla400Regular text-primary-500' >Erro ao buscar o produto 1. {hasError?.error}</Text>;
  }

  return (
    <View>
      <ScrollView>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View className='p-5 pb-28' >
          <Text className='text-4xl font-karla500Medium my-[10px]' >{product.name}</Text>

          <Text className='font-karla500Medium text-lg'>R$ {product.price}</Text>

          <Text className='my-[10px] font-karla300Light leading-8 text-lg ' >{product.description}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={addToCart} className='bg-primary-500 w-[90%] self-center h-14 rounded-full justify-center items-center absolute bottom-5' >
        <Text className='text-base-light font-karla500Medium text-lg' >Adicionar</Text>
      </TouchableOpacity>

    </View>
  );
};

export { ProductDetailsScreen };
