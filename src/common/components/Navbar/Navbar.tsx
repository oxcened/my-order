import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/solid';
import * as React from 'react';
import './_navbar.scss';
import { CSSTransition } from 'react-transition-group';
import locale from '@/common/utils/locale';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from '@/common/components/Dropdown/Dropdown';
import DropdownMenu from '@/common/components/Dropdown/DropdownMenu';
import Button from '@/common/components/Button/Button';
import { useAuth } from '@/modules/auth/useAuth';
import { showAvatarModal } from '@/modules/auth/AvatarModal/avatarModal.slice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, logout, getAvatarImage } = useAuth();

  const onMenuClick = (id: string) => {
    switch (id) {
      case 'logout':
        logout();
        break;
      case 'avatar':
        dispatch(showAvatarModal(true));
        break;
    }
  };

  const menu = [
    {
      id: 'avatar',
      label: locale.components.navbar.avatar,
      icon: <img src={getAvatarImage()} alt='avatar' className='h-5 w-5' />
    },
    { id: 'logout', label: locale.components.navbar.logout, icon: <LogoutIcon className='h-5 text-primary-500' /> }
  ];

  return <nav className='sticky top-0 bg-primary-500 h-14 flex items-center py-3 px-4 justify-between shadow-sm z-10'>
    <Link to='/'>
      <h1 className='font-bold text-white sm:text-xl cursor-pointer'>
        {locale.shared.appName}
      </h1>
    </Link>

    <CSSTransition
      unmountOnExit
      in={!!user}
      classNames='user-trans'
      timeout={350}
    >
      <div className='user-container relative'>
        <Dropdown id='dropdown'>
          <Button
            color='light'
            className='user-button'
            id='dropdown-toggle'
          >
            <img src={getAvatarImage()} alt='avatar' className='h-5 w-5 mr-2' />
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
  </nav>;
};

export default Navbar;
