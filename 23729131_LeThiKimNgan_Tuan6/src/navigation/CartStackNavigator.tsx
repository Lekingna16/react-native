import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CartStackParamList } from './types';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';

const Stack = createNativeStackNavigator<CartStackParamList>();

export const CartStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitle: 'Giỏ hàng',
        headerTintColor: '#007AFF',
        headerTitleStyle: {
          fontWeight: '700',
          color: '#1a1a1a',
        },
      }}
    >
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          title: 'Thanh toán',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
