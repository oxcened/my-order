import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/solid';
import * as React from 'react';
import './_navbar.scss';
import { CSSTransition } from 'react-transition-group';
import locale from '@/common/utils/locale';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from '@/common/components/dropdown/Dropdown';
import DropdownMenu from '@/common/components/dropdown/DropdownMenu';
import Button from '@/common/components/button/Button';
import { useAuth, showAvatarModal } from '@/modules/auth';

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
      icon: <img src={getAvatarImage()} alt='avatar' className='h-5 w-5 rounded-full' />
    },
    { id: 'logout', label: locale.components.navbar.logout, icon: <LogoutIcon className='h-5 text-gray-500' /> }
  ];

  return <nav className='sticky top-0 z-20 border-b py-4 bg-white'>
    <div className='container mx-auto flex items-center justify-between px-4 sm:px-8 h-full'>
      <Link to='/'>
        <h1 className='font-bold text-primary-500 text-2xl cursor-pointer'>
          {locale.shared.appName}
        </h1>
      </Link>

      <CSSTransition
        in={!!user}
        classNames='user-trans'
        timeout={350}
      >
        <div className='user-container relative'>
          <Dropdown id='dropdown'>
            <Button
              outline
              color='light'
              className='user-button'
              id='dropdown-toggle'
            >
              <img src={getAvatarImage()} alt='avatar' className='h-5 w-5 mr-2 rounded-full' />
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
    </div>
  </nav>;
};

export default Navbar;
