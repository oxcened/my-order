import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import locale from '@/common/utils/locale';
import Modal from '@/common/components/Modal/Modal';
import { DEFAULT_AVATAR, getAvatar } from '@/common/images/avatars/avatars';
import Button from '@/common/components/Button/Button';
import { useAppSelector } from '@/common/utils/hooks';
import { clean, showAvatarModal } from '@/modules/auth/AvatarModal/avatarModal.slice';
import { useAuth } from '@/modules/auth/useAuth';

export const LoginModal = () => {
  const isOpen = useAppSelector(state => !state.auth.user && !state.avatarModal.isAvatarModalOpen);
  const avatarDraft = useAppSelector(state => state.avatarModal.avatar);
  const [name, setName] = useState('');
  const { setUser } = useAuth();
  const dispatch = useDispatch();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (name) {
      setUser({ name: name, avatar: avatarDraft ?? DEFAULT_AVATAR });
      setName('');
      dispatch(clean());
    }
  };

  return <Modal isOpen={isOpen} className='max-w-sm'>
    <p className='text-xl font-bold'>{locale.components.loginModal.title}</p>
    <p className='text-gray-500'>{locale.components.loginModal.subtitle}</p>

    <form onSubmit={onSubmit}>
      <div className='flex items-center mt-5'>
        <img
          src={getAvatar(avatarDraft)}
          alt='avatar'
          className='h-12 aspect-ratio-1 mr-3 cursor-pointer rounded-full border'
          onClick={() => dispatch(showAvatarModal(true))}
        />

        <input
          required
          className='w-full rounded-md border p-3'
          placeholder={locale.shared.userPlaceholder}
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
      </div>

      <Button
        color='dark'
        className='w-full mt-5 justify-center'
        disabled={!name}
      >
        {locale.shared.confirm}
      </Button>
    </form>
  </Modal>;
};

export default LoginModal;
