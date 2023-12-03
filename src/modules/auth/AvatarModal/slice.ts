import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AvatarModalState = {
  isAvatarModalOpen: boolean;
  avatar?: number;
};

const initialState: AvatarModalState = {
  isAvatarModalOpen: false
};

const slice = createSlice({
  name: 'avatarModal',
  initialState,
  reducers: {
    showAvatarModal: (state, { payload }: PayloadAction<boolean>) => {
      state.isAvatarModalOpen = payload;
    },
    setAvatar: (state, { payload }: PayloadAction<number>) => {
      state.avatar = payload;
    },
    clean: () => initialState
  }
});

const {
  showAvatarModal,
  setAvatar,
  clean
} = slice.actions;

export {
  slice,
  showAvatarModal,
  setAvatar,
  clean
}
