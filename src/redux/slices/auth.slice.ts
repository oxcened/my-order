import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user?: {
    name: string;
  };
};

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<AuthState['user']>) => {
      state.user = payload;
    },
    cleanUser: (state) => {
      state.user = undefined;
    }
  }
});

export default authSlice;

export const { setUser, cleanUser } = authSlice.actions;
