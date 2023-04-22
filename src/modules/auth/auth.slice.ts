import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/modules/auth/User';

type AuthState = {
  user?: User;
};

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<AuthState['user']>) => {
      state.user = payload;
    },
    setAvatar: (state, { payload }: PayloadAction<User['avatar']>) => {
      if (state.user) {
        state.user.avatar = payload;
      } else {
        console.error('Cannot set avatar on empty user');
      }
    },
    cleanUser: (state) => {
      state.user = undefined;
    }
  }
});

export default authSlice;

export const { setUser, setAvatar, cleanUser } = authSlice.actions;
