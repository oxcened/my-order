import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/common/utils/hooks';
import { cleanUser } from '@/modules/auth/auth.slice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(store => store.auth.user);

  return {
    user,
    logout: () => dispatch(cleanUser()),
  };
};
