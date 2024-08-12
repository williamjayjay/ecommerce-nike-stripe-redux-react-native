import { View, Text, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { cartSlice } from '@/@core/store/cartSlice';
import { CartType } from './types';
import Toast from 'react-native-toast-message';

const CartListItem = ({ cartItem }: CartType) => {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(
      cartSlice.actions.changeQuantity({
        productId: cartItem.product._id,
        amount: 1,
      })
    );
  };

  const decreaseQuantity = () => {

    if (cartItem.quantity === 1) {
      Toast.show({
        type: "error",
        text1: `${cartItem.product.name}, removido do carrinho.`,
      });
    }

    dispatch(
      cartSlice.actions.changeQuantity({
        productId: cartItem.product._id,
        amount: -1,
      })
    );
  };

  return (
    <View className='p-[10px] px-5 flex-row' >
      <Image source={{ uri: cartItem.product.image }} className='w-[40%] aspect-square '/>

      <View className='flex-1 ml-[10px]'>
        <Text className=' text-primary-500 font-karla600SemiBold text-lg' >{cartItem.product.name}</Text>

        <Text className='text-base font-karla400Regular text-gray-500'>Size {cartItem.product.size}</Text>

        <View className='mt-auto flex-row items-center' >
          <Feather
            onPress={decreaseQuantity}
            name="minus-circle"
            size={24}
            color="gray"
          />
          <Text className='text-gray-500 mx-[10px] font-karla700Bold '>{cartItem.quantity}</Text>
          <Feather
            onPress={increaseQuantity}
            name="plus-circle"
            size={24}
            color="gray"
          />
          <Text className='font-karla500Medium text-primary-500 ml-auto text-base'>
            R$ {cartItem.product.price * cartItem.quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};

export { CartListItem };
