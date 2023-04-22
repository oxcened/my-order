import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/common/components//Navbar/Navbar';
import AvatarModal from '@/modules/auth/AvatarModal/AvatarModal';
import { useAuth } from '@/modules/auth/useAuth';
import LoginModal from '@/modules/auth/LoginModal/LoginModal';

const useLogin = () => {
  const { user, logout } = useAuth();
  /*
    useEffect(() => {
      if (!user) {
        setCurrentAvatar(undefined);
        setCurrentName('');
      }
    }, [user]);

    const onAvatarSubmit = (avatar: number) => {
      setCurrentAvatar(avatar);
      setShowAvatarModal(false);
    };*/
};

const Root = () => {
  return (
    <div>
      <Navbar />
      <LoginModal />
      <AvatarModal />
      <Outlet />
    </div>
  );
};

export default Root;
