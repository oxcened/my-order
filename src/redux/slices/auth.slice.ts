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
    }
  }
});

export default authSlice;

export const { setUser } = authSlice.actions;
