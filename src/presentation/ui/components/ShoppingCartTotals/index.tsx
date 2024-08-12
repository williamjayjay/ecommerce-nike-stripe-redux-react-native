import { View, Text } from "react-native";
import { selectSubtotal, selectDeliveryPrice, selectTotal } from "@/@core/store/cartSlice";
import { useSelector } from "react-redux";

const ShoppingCartTotals = () => {
    const subtotal = useSelector(selectSubtotal);
    const deliveryFee = useSelector(selectDeliveryPrice);
    const total = useSelector(selectTotal);

    return (
        <View className='pt-3 m-5 border-t border-gray-300' >
            <View className='flex-row justify-between my-1' >
                <Text className='text-gray-400 font-karla400Regular text-base' >Subtotal</Text>
                <Text className='text-gray-400 font-karla400Regular text-base' >R$ {subtotal}</Text>
            </View>
            <View className='flex-row justify-between mx-[2px]'>
                <Text className='text-gray-400 font-karla400Regular text-base' >Entrega</Text>
                <Text className='text-gray-400 font-karla400Regular text-base' >R$ {deliveryFee}</Text>
            </View>
            <View className='flex-row justify-between mx-[2px]'>
                <Text className='text-primary-500 font-karla600SemiBold text-lg' >Total</Text>
                <Text className='text-primary-500 font-karla600SemiBold text-lg' >R$ {total}</Text>
            </View>
        </View>
    );
};

export {ShoppingCartTotals}