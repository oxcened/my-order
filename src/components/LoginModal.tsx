import * as React from 'react';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/auth.slice';
import locale from '../core/locale';

export const LoginModal = (props: ComponentPropsWithoutRef<typeof Modal>) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(setUser({ name }));
  };

  useEffect(() => {
    if (props.isOpen) {
      setName('');
    }
  }, [props.isOpen]);

  return <Modal {...props}>
    <p className='text-xl font-bold'>{locale.components.loginModal.title}</p>
    <p className='text-gray-500'>{locale.components.loginModal.subtitle}</p>

    <form onSubmit={onSubmit}>
      <input
        required
        className='w-full rounded-md shadow-inner bg-gray-100 mt-3 p-3'
        placeholder={locale.shared.userPlaceholder}
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <Button
        color='primary'
        className='w-full mt-3 justify-center'>
        {locale.shared.confirm}
      </Button>
    </form>
  </Modal>;
};

export default LoginModal;
