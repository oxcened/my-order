import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import { useDispatch } from 'react-redux';
import locale from '@/common/utils/locale';
import { setUser } from '@/modules/auth/auth.slice';
import Modal from '@/common/components/Modal/Modal';
import Button from './Button/Button';
import { DEFAULT_AVATAR, getAvatar } from '@/common/images/avatars/avatars';

export const LoginModal = (props: {
  name?: string;
  currentAvatar?: number;
  onAvatarChoose?: () => void;
  onNameChange?: (name: string) => void;
} & ComponentPropsWithoutRef<typeof Modal>) => {
  const dispatch = useDispatch();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (props.name) {
      dispatch(setUser({ name: props.name, avatar: props.currentAvatar ?? DEFAULT_AVATAR }));
    }
  };

  return <Modal {...props}>
    <p className='text-xl font-bold'>{locale.components.loginModal.title}</p>
    <p className='text-gray-500'>{locale.components.loginModal.subtitle}</p>

    <form onSubmit={onSubmit}>
      <div className='flex items-center mt-3'>
        <img
          src={getAvatar(props.currentAvatar)}
          alt='avatar'
          className='h-12 aspect-ratio-1 mr-3 cursor-pointer shadow-inner rounded-md bg-gray-100 p-1'
          onClick={props.onAvatarChoose}
        />

        <input
          required
          className='w-full rounded-md shadow-inner bg-gray-100 p-3'
          placeholder={locale.shared.userPlaceholder}
          value={props.name}
          onChange={e => props.onNameChange?.(e.target.value)}
        />
      </div>

      <Button
        color='primary'
        className='w-full mt-3 justify-center'>
        {locale.shared.confirm}
      </Button>
    </form>
  </Modal>;
};

export default LoginModal;
