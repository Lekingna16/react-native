import { useAppDispatch, useAppSelector } from '../store';
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
  selectCartItems,
  selectTotalQuantity,
  selectTotalAmount,
  CartItem,
} from '../store/cartSlice';

export function useCart() {
  const dispatch = useAppDispatch();
  const items: CartItem[] = useAppSelector(selectCartItems);
  const totalQuantity: number = useAppSelector(selectTotalQuantity);
  const totalAmount: number = useAppSelector(selectTotalAmount);

  const addToCart = (bookId: string, quantity: number = 1) => {
    dispatch(addToCartAction({ bookId, quantity }));
  };

  const removeFromCart = (bookId: string) => {
    dispatch(removeFromCartAction(bookId));
  };

  const updateQuantity = (bookId: string, delta: number) => {
    dispatch(updateQuantityAction({ bookId, delta }));
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  const getItemQuantity = (bookId: string) => {
    const item = items.find((i) => i.bookId === bookId);
    return item ? item.quantity : 0;
  };

  return {
    items,
    totalQuantity,
    totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
  };
}
