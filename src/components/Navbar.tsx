import Button from './Button';
import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { useState } from 'react';
import { navigate } from 'gatsby';
import { User } from '../models/User';
import '../styles/components/_navbar.scss';
import { CSSTransition } from 'react-transition-group';
import locale from '../core/locale';
import Dropdown from './Dropdown';
import DropdownMenu from './DropdownMenu';
import AvatarModal from './AvatarModal';
import { avatars } from '../models/Avatars';

const Navbar = ({ user, onLogout }: { user?: User, onLogout?: () => void }) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const onMenuClick = (id: string) => {
    switch (id) {
      case 'logout':
        onLogout?.();
        break;
      case 'avatar':
        setShowAvatarModal(true);
        break;
    }
  };

  const menu = [
    {
      id: 'avatar',
      label: locale.components.navbar.avatar,
      icon: <img src={avatars[user?.avatar ?? 0]} alt='avatar' className='h-5 w-5' />
    },
    { id: 'logout', label: locale.components.navbar.logout, icon: <LogoutIcon className='h-5 text-primary-500' /> }
  ];

  return <div className='sticky top-0 bg-primary-500 h-14 flex items-center py-3 px-4 justify-between shadow-sm z-10'>
    <div className='font-bold text-white sm:text-xl cursor-pointer' onClick={() => navigate('/')}>
      {locale.shared.appName}
    </div>

    <CSSTransition
      unmountOnExit
      in={!!user}
      classNames='user-trans'
      timeout={350}
    >
      <div className='user-container relative'>
        <Dropdown id='dropdown'>
          <Button
            color='white'
            className='user-button'
            id='dropdown-toggle'
          >
            <img src={avatars[user?.avatar ?? 0]} alt='avatar' className='h-5 w-5 mr-2' />
            {user?.name ?? locale.shared.userPlaceholder}
            <ChevronDownIcon className='h-5 ml-1' />
          </Button>

          <DropdownMenu
            options={menu}
            onClick={onMenuClick}
          />
        </Dropdown>
      </div>
    </CSSTransition>

    <AvatarModal
      isOpen={showAvatarModal}
      onBackdropClick={() => setShowAvatarModal(false)}
      onSubmit={() => setShowAvatarModal(false)} />
  </div>;
};

export default Navbar;
