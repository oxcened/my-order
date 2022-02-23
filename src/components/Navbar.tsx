import Button from './Button';
import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { navigate } from 'gatsby';
import { User } from '../models/User';
import '../styles/components/_navbar.scss';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import locale from '../core/locale';
import Dropdown from './Dropdown';
import DropdownMenu from './DropdownMenu';


const Navbar = ({ user, onLogout }: { user?: User, onLogout?: () => void }) => {
  const onLogoutClick = () => {
    onLogout?.();
  };

  const menu = [
    { id: '1', label: locale.components.navbar.logout, icon: LogoutIcon }
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
            {user?.name ?? <FontAwesomeIcon icon={faCircleNotch} className='animate-spin' />}
            <ChevronDownIcon className='h-5 ml-1' />
          </Button>

          <DropdownMenu
            options={menu}
            onClick={() => onLogoutClick()}
          />
        </Dropdown>
      </div>
    </CSSTransition>
  </div>;
};

export default Navbar;
