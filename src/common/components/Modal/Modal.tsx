import * as React from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './_modal.scss';

const ANIM_DURATON_MS = 350;

const Modal = ({ children, isOpen, className, onBackdropClick }: {
  children?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  onBackdropClick?: () => void;
}) => {
  const [innerOpen, setInnerOpen] = useState(false);

  useEffect(() => {
    const [body] = document.getElementsByTagName('body');

    if (isOpen) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }

    setInnerOpen(isOpen ?? false);
  }, [isOpen]);

  return <CSSTransition
    in={isOpen}
    timeout={ANIM_DURATON_MS}
    classNames='modal-transition'
    unmountOnExit
  >
    <div
      className={classNames(
        'top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 fixed flex p-3 overflow-x-hidden overflow-y-auto z-20'
      )}
      role='dialog'
      onClick={onBackdropClick}
    >
      <CSSTransition
        in={innerOpen}
        timeout={ANIM_DURATON_MS}
        classNames='modal-inner-transition'
        unmountOnExit
      >
        <div
          className={classNames('w-full max-w-md bg-white m-auto rounded-xl p-4', className)}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </CSSTransition>
    </div>
  </CSSTransition>;
};

export default Modal;
