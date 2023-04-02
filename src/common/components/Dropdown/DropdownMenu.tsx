import { CSSTransition } from 'react-transition-group';
import * as React from 'react';
import './_dropdown_menu.scss';
import Button from '@/common/components/Button/Button';

export const TRANSITION_TIMEOUT = 350;

export type DropdownMenuProps = {
  open?: boolean;
  options: { id: string, label: string, icon: React.ReactNode }[];
  onClick?: (id: string) => void;
};

const DropdownMenu = ({ open, options, onClick }: DropdownMenuProps) => {
  return (
    <CSSTransition
      unmountOnExit
      in={open}
      classNames='dropdown-trans'
      timeout={TRANSITION_TIMEOUT}>
      <div data-testid='dropdown-menu' className='dropdown-menu absolute top-11 right-0 shadow-md rounded-md pt-1 w-56'>
        {options.map(o => {
          return (
            <Button color='light' className='w-full py-4' onClick={() => onClick?.(o.id)}>
              {o.icon}
              <span className='ml-2'>{o.label}</span>
            </Button>
          );
        })}
      </div>
    </CSSTransition>
  );
};

export default DropdownMenu;
