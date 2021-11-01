import Button from './Button';
import { ChevronDownIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { navigate } from 'gatsby';
import { User } from '../models/User';

const Navbar = ({ user }: { user?: User }) => {
  return <div className='sticky top-0 bg-primary h-14 flex items-center py-3 px-4 justify-between shadow-sm'>
    <div className='font-bold text-white sm:text-xl cursor-pointer' onClick={() => navigate('/')}>
      WinkEat
    </div>

    {user
    && <Button color='white'>
      {user.name}
      <ChevronDownIcon className='h-5 ml-1' />
    </Button>}
  </div>;
};

export default Navbar;
