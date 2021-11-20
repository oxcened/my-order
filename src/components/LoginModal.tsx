import * as React from 'react';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/auth.slice';

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
    <p className='text-xl font-bold'>Welcome to WinkEat</p>
    <p className='text-gray-500'>To get started, please enter your name down below</p>

    <form onSubmit={onSubmit}>
      <input
        required
        className='w-full rounded-md shadow-inner bg-gray-100 mt-3 p-3'
        placeholder='John Doe'
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <Button
        color='primary'
        className='w-full mt-3 justify-center'>
        Confirm
      </Button>
    </form>
  </Modal>;
};

export default LoginModal;
