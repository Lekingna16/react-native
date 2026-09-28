import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistState {
  bookIds: string[];
}

const initialState: WishlistState = {
  bookIds: ['1', '3'], // Giả lập sẵn 2 cuốn sách yêu thích để test
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      if (!state.bookIds.includes(bookId)) {
        state.bookIds.push(bookId);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.bookIds = state.bookIds.filter((id) => id !== action.payload);
    },
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      if (state.bookIds.includes(bookId)) {
        state.bookIds = state.bookIds.filter((id) => id !== bookId);
      } else {
        state.bookIds.push(bookId);
      }
    },
    clearWishlist: (state) => {
      state.bookIds = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistBookIds = (state: { wishlist: WishlistState }) =>
  state.wishlist.bookIds;

export const selectWishlistCount = (state: { wishlist: WishlistState }) =>
  state.wishlist.bookIds.length;

export const selectIsInWishlist =
  (bookId: string) => (state: { wishlist: WishlistState }) =>
    state.wishlist.bookIds.includes(bookId);

export default wishlistSlice.reducer;
