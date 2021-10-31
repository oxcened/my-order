import { ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import * as React from 'react';

const AccordionHeader = ({ children, isOpen, onClick }: {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
}) => {
  return <div
    className='p-3 font-bold text-xl flex justify-between items-center cursor-pointer'
    onClick={onClick}
  >
    <span>{children}</span>
    <ChevronDownIcon className={classNames('h-7 transition transform', {
      'rotate-180': isOpen
    })} />
  </div>;
};

export default AccordionHeader;
