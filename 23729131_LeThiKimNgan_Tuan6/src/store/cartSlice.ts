import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BOOKS_DATA } from '../data/books';

export interface CartItem {
  bookId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [
    { bookId: '1', quantity: 1 },
    { bookId: '2', quantity: 2 },
  ],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ bookId: string; quantity?: number }>
    ) => {
      const { bookId, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.bookId === bookId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ bookId, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.bookId !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ bookId: string; delta: number }>
    ) => {
      const { bookId, delta } = action.payload;
      const existingItem = state.items.find((item) => item.bookId === bookId);
      if (existingItem) {
        const newQty = existingItem.quantity + delta;
        if (newQty <= 0) {
          state.items = state.items.filter((item) => item.bookId !== bookId);
        } else {
          existingItem.quantity = newQty;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectTotalQuantity = (state: { cart: CartState }): number => {
  return state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
};

export const selectTotalAmount = (state: { cart: CartState }): number => {
  return state.cart.items.reduce((sum, item) => {
    const book = BOOKS_DATA.find((b) => b.id === item.bookId);
    return sum + (book ? book.price * item.quantity : 0);
  }, 0);
};

export default cartSlice.reducer;
