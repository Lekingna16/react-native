import { useAppDispatch, useAppSelector } from '../store';
import {
  login as loginAction,
  logout as logoutAction,
  updateProfile as updateProfileAction,
  selectCurrentUser,
  selectIsLoggedIn,
  selectAuthToken,
  UserInfo,
} from '../store/authSlice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const token = useAppSelector(selectAuthToken);

  const login = (userInfo?: UserInfo, authToken?: string) => {
    dispatch(loginAction({ user: userInfo, token: authToken }));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const updateProfile = (data: Partial<UserInfo>) => {
    dispatch(updateProfileAction(data));
  };

  return {
    user,
    token,
    isLoggedIn,
    login,
    logout,
    updateProfile,
  };
}
