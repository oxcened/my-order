import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/common/components//Navbar/Navbar';
import LoginModal from '@/common/components/LoginModal';
import AvatarModal from '@/common/components/AvatarModal';
import { useAuth } from '@/modules/auth/useAuth';

const Layout = () => {
  const { user, logout } = useAuth();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState<number>();
  const [currentName, setCurrentName] = useState('');

  useEffect(() => {
    if (!user) {
      setCurrentAvatar(undefined);
      setCurrentName('');
    }
  }, [user]);

  const onAvatarSubmit = (avatar: number) => {
    setCurrentAvatar(avatar);
    setShowAvatarModal(false);
  };

  return (
    <div>
      <Navbar user={user} onLogout={logout} />
      <Outlet />
      <LoginModal
        isOpen={!user?.name && !showAvatarModal}
        name={currentName}
        currentAvatar={currentAvatar}
        onAvatarChoose={() => setShowAvatarModal(true)}
        onNameChange={setCurrentName}
      />
      <AvatarModal
        isOpen={showAvatarModal}
        current={currentAvatar}
        onBackdropClick={() => setShowAvatarModal(false)}
        onSubmit={onAvatarSubmit}
      />
    </div>
  );
};

export default Layout;
