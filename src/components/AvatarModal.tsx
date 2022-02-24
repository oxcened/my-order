import * as React from 'react';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import locale from '../core/locale';
import { avatars } from '../models/Avatars';
import classNames from 'classnames';
import Button from './Button';
import { setUser } from '../redux/slices/auth.slice';
import { useAuth } from '../core/hooks';

export const AvatarModal = (props: { onSubmit?: () => void; } & ComponentPropsWithoutRef<typeof Modal>) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [current, setCurrent] = useState<number>();

  useEffect(() => {
    if (props.isOpen) {
      setCurrent(user?.avatar);
    }
  }, [props.isOpen, user?.avatar]);

  const onSubmit = () => {
    if (current !== undefined && user) {
      dispatch(setUser({ name: user.name, avatar: current }));
      props.onSubmit?.();
    }
  };

  return <Modal {...props}>
    <p className='text-xl font-bold'>{locale.components.avatarModal.title}</p>

    <div className='grid gap-3 grid-cols-[repeat(auto-fit,3rem)] justify-center py-5'>
      {avatars.map((a, i) => {
        const isCurrent = i === current;
        return (
          <img
            src={a}
            alt={`avatar_${a}`}
            className={classNames('border cursor-pointer', {
              'bg-primary-200 border-primary-500': isCurrent
            })}
            onClick={() => setCurrent(i)}
          />
        );
      })}
    </div>

    <Button
      color='primary'
      className='w-full justify-center'
      disabled={current === undefined}
      onClick={onSubmit}
    >{locale.shared.ok}</Button>
  </Modal>;
};

export default AvatarModal;
