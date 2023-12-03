import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './models';

type AuthState = {
  user?: User;
};

const initialState: AuthState = {};

const slice = createSlice({
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

const { setUser, setAvatar, cleanUser } = slice.actions;

export {
  slice,
  setUser,
  setAvatar,
  cleanUser
};
