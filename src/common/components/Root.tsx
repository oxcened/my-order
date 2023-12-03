import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/common/components//Navbar/Navbar';
import { AvatarModal } from '@/modules/auth';
import { LoginModal } from '@/modules/auth';

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
