import { useGetProductsQuery } from '@/@core/store/apiSlice';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
const ProductsScreen = ({ navigation }: any) => {
  const { data, isLoading, error } = useGetProductsQuery({});
  const hasError: FetchBaseQueryError | SerializedError | any = error

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (hasError) {
    return <Text className='font-karla400Regular text-primary-500' >Erro ao buscar o produto 1: {hasError.error}</Text>;
  }

  const products = data.data;

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Detalhes", { id: item?._id });
          }}
          className='w-[50%] p-1 '
        >
          <Image source={{ uri: item.image }} className='w-full aspect-square' />
        </TouchableOpacity>
      )}
      numColumns={2}
    />
  );
};

export { ProductsScreen };
