import { CheckCircleIcon } from '@heroicons/react/solid';
import Modal from './Modal';
import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';

const SuccessModal = (props: ComponentPropsWithoutRef<typeof Modal>) => {
  return <Modal
    {...props}
    className='flex flex-col items-center justify-center w-60 h-60 sm:w-80 sm:h-80 pb-8 sm:pb-10'
  >
    <CheckCircleIcon className='h-16 sm:h-24 text-primary-500' />

    <span className='text-3xl sm:text-4xl mt-3 sm:mt-7'>Thank you!</span>
    <span className='text-sm sm:text-lg text-gray-400'>{props.children}</span>
  </Modal>;
};

export default SuccessModal;
