import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  HomeScreen: undefined;
  BookDetailScreen: { bookId: string };
};

export type CartStackParamList = {
  CartScreen: undefined;
  CheckoutScreen: { totalAmount: number };
};

export type BottomTabParamList = {
  Home: undefined;
  Category: undefined;
  Cart: undefined;
  Account: undefined;
};

export type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>;
export type BookDetailRouteProp = RouteProp<HomeStackParamList, 'BookDetailScreen'>;
export type BookDetailNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'BookDetailScreen'>;

export type CartNavigationProp = NativeStackNavigationProp<CartStackParamList, 'CartScreen'>;
export type CheckoutRouteProp = RouteProp<CartStackParamList, 'CheckoutScreen'>;
export type CheckoutNavigationProp = NativeStackNavigationProp<CartStackParamList, 'CheckoutScreen'>;
