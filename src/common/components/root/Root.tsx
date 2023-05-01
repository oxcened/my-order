import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/common/components/navbar/Navbar';
import { AvatarModal, LoginModal } from '@/modules/auth';

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
