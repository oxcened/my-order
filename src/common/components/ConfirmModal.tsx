import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import locale from '@/common/utils/locale';
import Button from '@/common/components/Button/Button';
import Modal from '@/common/components/Modal/Modal';
import { twMerge } from 'tailwind-merge';

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
  return <Modal {...props} className={twMerge('max-w-sm', props.className)}>
    <p className='text-2xl font-bold'>
      {title}
    </p>

    <p className='text-gray-500 mt-2'>{text}</p>

    <div className='flex mt-5 justify-between'>
      <Button
        color='light'
        outline
        onClick={onNegative}>
        {negativeButtonText}
      </Button>

      <Button
        color='dark'
        onClick={onPositive}>
        {positiveButtonText}
      </Button>
    </div>
  </Modal>;
};

export default ConfirmModal;
