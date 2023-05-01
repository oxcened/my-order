import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/common/utils/hooks';
import { cleanUser, setAvatar, setUser, User, cleanAvatarModal } from '@/modules/auth';
import { getAvatar } from '@/common/images/avatars/avatars';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(store => store.auth.user);

  return {
    user,
    setUser: (user: User) => dispatch(setUser(user)),
    setAvatar: (avatar: User['avatar']) => dispatch(setAvatar(avatar)),
    getAvatarImage: () => getAvatar(user?.avatar),
    logout: () => {
      dispatch(cleanUser());
      dispatch(cleanAvatarModal());
    }
  };
};
