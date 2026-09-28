import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabParamList } from './types';
import { HomeStackNavigator } from './HomeStackNavigator';
import { CategoryScreen } from '../screens/CategoryScreen';
import { CartStackNavigator } from './CartStackNavigator';
import { AccountScreen } from '../screens/AccountScreen';
import { CustomTabBar } from '../components/CustomTabBar';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{ title: 'Danh mục' }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{ title: 'Giỏ hàng' }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: 'Tài khoản' }}
      />
    </Tab.Navigator>
  );
};
