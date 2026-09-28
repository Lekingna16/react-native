import { useAppDispatch, useAppSelector } from '../store';
import {
  addToWishlist as addToWishlistAction,
  removeFromWishlist as removeFromWishlistAction,
  toggleWishlist as toggleWishlistAction,
  clearWishlist as clearWishlistAction,
  selectWishlistBookIds,
  selectWishlistCount,
} from '../store/wishlistSlice';

export function useWishlist() {
  const dispatch = useAppDispatch();
  const wishlistBookIds = useAppSelector(selectWishlistBookIds);
  const wishlistCount = useAppSelector(selectWishlistCount);

  const addToWishlist = (bookId: string) => {
    dispatch(addToWishlistAction(bookId));
  };

  const removeFromWishlist = (bookId: string) => {
    dispatch(removeFromWishlistAction(bookId));
  };

  const toggleWishlist = (bookId: string) => {
    dispatch(toggleWishlistAction(bookId));
  };

  const clearWishlist = () => {
    dispatch(clearWishlistAction());
  };

  const isInWishlist = (bookId: string) => {
    return wishlistBookIds.includes(bookId);
  };

  return {
    wishlistBookIds,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
  };
}
