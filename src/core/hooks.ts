import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const user = useAppSelector(store => store.auth.user);

  return { user };
};
