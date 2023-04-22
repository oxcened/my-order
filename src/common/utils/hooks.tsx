import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import locale from './locale';
import ConfirmModal from '@/common/components/ConfirmModal';
import FeedbackModal from '@/common/components/FeedbackModal';
import { RootState } from '@/common/utils/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useConfirmModal = (props?: ComponentPropsWithoutRef<typeof ConfirmModal>) => {
  const [showModal, setShowModal] = useState(false);
  const [callback, setCallback] = useState<() => void>();

  const cleanModal = () => {
    setShowModal(false);
    setCallback(undefined);
  };

  const modal = (
    <ConfirmModal
      isOpen={showModal}
      onPositive={() => {
        callback?.();
        cleanModal();
      }}
      onNegative={cleanModal}
      onBackdropClick={cleanModal}
      {...props} />
  );

  return {
    renderConfirmModal: modal,
    askConfirm: (func: () => void) => {
      setShowModal(true);
      setCallback(() => func);
    }
  };
};

export const useFeedbackModal = (props?: ComponentPropsWithoutRef<typeof FeedbackModal>) => {
  const [showModal, setShowModal] = useState(false);
  const [callback, setCallback] = useState<() => void>();
  const [text, setText] = useState<string>();

  useEffect(() => {
    if (showModal) {
      window.setTimeout(() => {
        setShowModal(false);
        callback?.();
        setCallback(undefined);
        setText(undefined);
      }, 2000);
    }
  }, [showModal]);

  const modal = (
    <FeedbackModal
      isOpen={showModal}
      {...props}
      children={text ?? props?.children}
    />
  );

  return {
    renderModal: modal,
    showModal: (options?: { callback?: () => void; text?: string }) => {
      setShowModal(true);

      if (options?.callback) {
        setCallback(() => options?.callback);
      }

      if (options?.text) {
        setText(options?.text);
      }
    }
  };
};

export const useSuccessModal: typeof useFeedbackModal = (props) =>
  useFeedbackModal({ title: locale.components.successModal.title, ...props, isSuccess: true });

export const useFailureModal: typeof useFeedbackModal = (props) =>
  useFeedbackModal({ title: locale.components.failureModal.title, children: locale.components.failureModal.description, ...props, isSuccess: false });
