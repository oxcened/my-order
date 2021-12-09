import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import Modal from './Modal';
import Button from './Button';
import locale from '../core/locale';

const ConfirmModal = (
  {
    title = locale.components.confirmModal.title,
    text = locale.components.confirmModal.subtitle,
    positiveButtonText = locale.shared.confirm,
    negativeButtonText = locale.shared.cancel,
    onPositive,
    onNegative,
    ...props
  }: {
    title?: string;
    text?: string;
    positiveButtonText?: string;
    negativeButtonText?: string;
    onPositive?: () => void;
    onNegative?: () => void;
  } & ComponentPropsWithoutRef<typeof Modal>) => {
  return <Modal {...props}>
    <p className='text-2xl font-bold'>
      {title}
    </p>

    <p className='text-gray-500 mt-2'>{text}</p>

    <Button
      color='primary'
      className='w-full mt-5 justify-center'
      onClick={onPositive}>
      {positiveButtonText}
    </Button>

    <Button
      color='white'
      className='w-full mt-2 justify-center'
      onClick={onNegative}>
      {negativeButtonText}
    </Button>
  </Modal>;
};

export default ConfirmModal;
