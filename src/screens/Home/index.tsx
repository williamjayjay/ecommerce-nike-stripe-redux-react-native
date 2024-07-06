import React from 'react';
import { View, Text } from 'react-native';

export function Home() {
    return (
        <View >
            <Text className='text-base-light text-2xl font-karla200ExtraLight ' >teste - karla200ExtraLight</Text>
            <Text className='text-tertiary-success text-2xl font-karla300Light ' >teste - karla300Light</Text>
            <Text className='text-tertiary-warning text-2xl font-karla400Regular' >teste - karla400Regular</Text>
            <Text className="text-purple-400 py-8" >---||---</Text>
            <Text className='text-base-light text-2xl font-karla500Medium ' >teste - karla500Medium</Text>
            <Text className='text-tertiary-success text-2xl font-karla600SemiBold ' >teste - karla600SemiBold</Text>
            <Text className='text-tertiary-warning text-2xl font-karla700Bold' >teste - karla700Bold</Text>

        </View>
    )
}