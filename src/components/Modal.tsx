import * as React from 'react';
import { useEffect } from 'react';
import classNames from 'classnames';

const Modal = ({ children, isOpen, className, onBackdropClick }: {
  children?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  onBackdropClick?: () => void;
}) => {
  useEffect(() => {
    const [body] = document.getElementsByTagName('body');

    if (isOpen) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return <div
    className={classNames(
      'top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 fixed flex p-3 overflow-x-hidden overflow-y-auto',
      {
        'hidden': !isOpen
      }
    )}
    onClick={onBackdropClick}
  >
    <div
      className={classNames('w-full max-w-md bg-white m-auto rounded-md p-4', className)}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>
  </div>;
}

export default Modal;
