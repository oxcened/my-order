import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { cleanUser } from '../redux/slices/auth.slice';
import * as React from 'react';
import { ComponentPropsWithoutRef, useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(store => store.auth.user);

  return {
    user,
    logout: () => dispatch(cleanUser())
  };
};

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
      {...props} />
  );

  return {
    getConfirmModal: () => modal,
    askConfirm: (func: () => void) => {
      setShowModal(true);
      setCallback(() => func);
    }
  };
};
