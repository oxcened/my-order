import { ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import * as React from 'react';

export type AccordionHeaderProps = {
  children?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  headerClassName?: string;
  onClick?: () => void;
};

const AccordionHeader = ({ children, isOpen, className, headerClassName, onClick }: AccordionHeaderProps) => {
  return <div
    data-testid='accordion-header'
    className={classNames('py-3 text-xl flex justify-between items-center cursor-pointer', className)}
    onClick={onClick}
  >
    <span className={headerClassName}>{children}</span>
    <ChevronDownIcon className={classNames('h-7 transition transform', {
      'rotate-180': isOpen
    })} />
  </div>;
};

export default AccordionHeader;
