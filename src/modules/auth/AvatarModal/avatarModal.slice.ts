import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_AVATAR } from '@/common/images/avatars/avatars';

type AvatarModalState = {
  isAvatarModalOpen: boolean;
  avatar?: number;
};

const initialState: AvatarModalState = {
  isAvatarModalOpen: false
};

export const avatarModalSlice = createSlice({
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

export default avatarModalSlice;

export const {
  showAvatarModal,
  setAvatar,
  clean
} = avatarModalSlice.actions;
