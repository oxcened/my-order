import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/common/utils/hooks';
import { cleanUser, setAvatar, setUser } from './slice';
import { User } from './models';
import { getAvatar } from '@/common/images/avatars/avatars';
import { clean as cleanAvatarModal } from './AvatarModal/slice';

const useAuth = () => {
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

export {
  useAuth
};
