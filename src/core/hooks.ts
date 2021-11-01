import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { cleanUser } from '../redux/slices/auth.slice';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(store => store.auth.user);

  return {
    user,
    logout: () => dispatch(cleanUser())
  };
};
