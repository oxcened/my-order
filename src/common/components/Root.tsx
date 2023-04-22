import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/common/components//Navbar/Navbar';
import AvatarModal from '@/modules/auth/AvatarModal/AvatarModal';
import LoginModal from '@/modules/auth/LoginModal/LoginModal';

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
