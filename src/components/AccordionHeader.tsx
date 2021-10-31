import { ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import * as React from 'react';

const AccordionHeader = ({ children, isOpen, className, onClick }: {
  children?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  return <div
    className={classNames('p-3 text-xl flex justify-between items-center cursor-pointer', className)}
    onClick={onClick}
  >
    <span>{children}</span>
    <ChevronDownIcon className={classNames('h-7 transition transform', {
      'rotate-180': isOpen
    })} />
  </div>;
};

export default AccordionHeader;
