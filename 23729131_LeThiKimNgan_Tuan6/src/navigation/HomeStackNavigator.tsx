import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { BookDetailScreen } from '../screens/BookDetailScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitle: 'Quay lại',
        headerTintColor: '#007AFF',
        headerTitleStyle: {
          fontWeight: '700',
          color: '#1a1a1a',
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookDetailScreen"
        component={BookDetailScreen}
        options={{
          title: 'Chi tiết sách',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
