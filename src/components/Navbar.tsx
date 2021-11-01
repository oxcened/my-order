import Button from './Button';
import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { useState } from 'react';
import { navigate } from 'gatsby';
import { User } from '../models/User';
import '../styles/components/_navbar.scss';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ user, onLogout }: { user?: User, onLogout?: () => void }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const onLogoutClick = () => {
    setOpenDropdown(false);
    onLogout?.();
  };

  return <div className='sticky top-0 bg-primary h-14 flex items-center py-3 px-4 justify-between shadow-sm'>
    <div className='font-bold text-white sm:text-xl cursor-pointer' onClick={() => navigate('/')}>
      WinkEat
    </div>

    <CSSTransition
      unmountOnExit
      in={!!user}
      classNames='user-trans'
      timeout={350}
    >
      <div className='user-container relative'>
        <Button
          color='white'
          className='user-button'
          onClick={() => setOpenDropdown(state => !state)}
        >
          {user?.name ?? <FontAwesomeIcon icon={faCircleNotch} className='animate-spin' />}
          <ChevronDownIcon className='h-5 ml-1' />
        </Button>

        <CSSTransition
          unmountOnExit
          in={openDropdown}
          classNames='dropdown-trans'
          timeout={350}>
          <div className='dropdown absolute top-11 right-0 shadow-md rounded-md pt-1 w-56'>
            <Button color='white' className='w-full py-4' onClick={onLogoutClick}>
              <LogoutIcon className='h-5 mr-2 text-primary' />
              Logout
            </Button>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  </div>;
};

export default Navbar;
