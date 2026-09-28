import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  membershipTier?: 'Thành viên Đồng' | 'Thành viên Bạc' | 'Thành viên Vàng' | 'Thành viên VIP';
}

export interface AuthState {
  user: UserInfo | null;
  token: string | null;
  isLoggedIn: boolean;
}

const mockUser: UserInfo = {
  id: 'usr_23729131',
  name: 'Lê Thị Kim Ngân',
  email: 'kimngan.le@example.com',
  phone: '0901 234 567',
  membershipTier: 'Thành viên Vàng',
};

// Khởi tạo trạng thái ban đầu với dữ liệu giả để test
const initialState: AuthState = {
  user: mockUser,
  token: 'mock_jwt_token_23729131_tuan6',
  isLoggedIn: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user?: UserInfo; token?: string } | undefined>
    ) => {
      state.isLoggedIn = true;
      state.user = action?.payload?.user ?? mockUser;
      state.token = action?.payload?.token ?? 'mock_jwt_token_23729131_tuan6';
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserInfo>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;

export default authSlice.reducer;
