import { useGetOrderQuery } from '@/@core/store/apiSlice';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';

const TrackOrder = () => {
  const [ref, setRef] = useState('');
  const { data, isLoading, error } = useGetOrderQuery(ref);

  return (
    <View className='p-[10px]'>
      <TextInput
      className='p-[10px] rounded-[5px] border border-gray-500'
        value={ref}
        onChangeText={setRef}
        placeholder="Referência do seu pedido"
      />

      {isLoading && <ActivityIndicator />}
      {data?.status !== 'OK' && <Text className='font-karla400Regular text-gray-500 text-lg' >Pedido não encontrado</Text>}
      {data?.status === 'OK' && (
        <Text className='font-karla500Medium text-primary-500 text-base' >{JSON.stringify(data.data, null, 2)}</Text>
      )}
    </View>
  );
};

export  {TrackOrder};
