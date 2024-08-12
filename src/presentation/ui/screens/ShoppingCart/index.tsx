import {
    Text,
    FlatList,
    View,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useStripe } from '@stripe/stripe-react-native';
import { useCreateOrderMutation, useCreatePaymentIntentMutation } from '@/@core/store/apiSlice';
import { selectSubtotal, selectDeliveryPrice, selectTotal, cartSlice } from '@/@core/store/cartSlice';
import { CartListItem } from '@/presentation/ui/components/CartList';
import { TouchableOpacity } from 'react-native';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Toast from 'react-native-toast-message';
import { useState } from 'react';
import classNames from 'classnames';
import colors from '@/presentation/ui/styles/colors.json'
import { AppState } from './types';
import { ShoppingCartTotals } from '@/presentation/ui/components/ShoppingCartTotals';

const ShoppingCart = () => {
    const subtotal = useSelector(selectSubtotal);
    const deliveryFee = useSelector(selectDeliveryPrice);
    const total = useSelector(selectTotal);
    const dispatch = useDispatch();

    const [isLoadingLocal, setIsLoadingLocal] = useState(false);

    const cartItems = useSelector((state: AppState) => state.cart.items);

    const [createOrder, { isLoading }] = useCreateOrderMutation();

    const [createPaymentIntent] = useCreatePaymentIntentMutation();

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const onCheckout = async () => {
        setIsLoadingLocal(true)
        // 1. Create a payment intent
        const response = await createPaymentIntent({
            amount: Math.floor(total * 100),
        }) as { data: any; error: FetchBaseQueryError | SerializedError | any }

        if (response?.error) {
            Alert.alert('Ocorreu um erro.');
            setIsLoadingLocal(false)
            return;
        }

        // 2. Initialize the Payment sheet
        const initResponse = await initPaymentSheet({
            merchantDisplayName: 'willrpg',
            paymentIntentClientSecret: response?.data?.paymentIntent,

        });

        if (initResponse.error) {
            console.log(initResponse.error);
            Alert.alert('Ocorreu um erro.');
            setIsLoadingLocal(false)
            return;
        }

        // 3. Present the Payment Sheet from Stripe
        const paymentResponse = await presentPaymentSheet();

        if (paymentResponse?.error) {
            setIsLoadingLocal(false)
            Alert.alert(
                "Pagamento cancelado",
                "O fluxo de pagamento foi interrompido."
            );
            return;
        }

        // 4. If payment ok -> create the order
        onCreateOrder();
    };

    const onCreateOrder = async () => {
        const result = await createOrder({
            items: cartItems,
            subtotal,
            deliveryFee,
            total,
            customer: {
                name: 'Vadim',
                address: 'My home',
                email: 'vadim@notjust.dev',
            },
        }) as { data: any; error: FetchBaseQueryError | SerializedError | any }

        if (result.data?.status === 'OK') {
            setIsLoadingLocal(false)
            Toast.show({
                type: 'success',
                text1: `Pedido ${result.data.data.ref} realizado com sucesso!`,
            });
            dispatch(cartSlice.actions.clear());
        }

        setIsLoadingLocal(false)

    };

    return (
        <>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                ListFooterComponent={ShoppingCartTotals}
            />
            <View className='pb-24' />
            <TouchableOpacity disabled={isLoading || isLoadingLocal} onPress={() => onCheckout()}

                className={classNames(
                    'bg-primary-500 w-[90%] self-center h-14 rounded-full justify-center items-center absolute bottom-5',
                    { 'opacity-50': (isLoading || isLoadingLocal) })}>

                {
                    (isLoading || isLoadingLocal)
                        ?
                        <ActivityIndicator color={colors.base.light} />
                        :
                        <Text className='text-base-light font-karla500Medium text-lg'>Finalizar pedido</Text>
                }

            </TouchableOpacity>
        </>
    );
};


export { ShoppingCart };
