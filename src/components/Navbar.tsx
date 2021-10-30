import Button from './Button';
import { ChevronDownIcon } from '@heroicons/react/solid';
import * as React from 'react';

const Navbar = () => {
  return <div className='sticky top-0 bg-primary h-14 flex items-center py-3 px-4 justify-between'>
    <div className='font-bold text-white'>
      WinkEat
    </div>

    <Button className='bg-white flex items-center'>
      Alen
      <ChevronDownIcon className='h-5 ml-1' />
    </Button>
  </div>;
};

export default Navbar;
