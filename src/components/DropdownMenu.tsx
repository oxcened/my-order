import Button from './Button';
import { CSSTransition } from 'react-transition-group';
import * as React from 'react';

const DropdownMenu = ({ open, options, onClick }: {
  open?: boolean;
  options: { id: string, label: string, icon: React.ReactNode }[];
  onClick?: (id: string) => void;
}) => {
  return (
    <CSSTransition
      unmountOnExit
      in={open}
      classNames='dropdown-trans'
      timeout={350}>
      <div className='dropdown absolute top-11 right-0 shadow-md rounded-md pt-1 w-56'>
        {options.map(o => {
          return (
            <Button color='white' className='w-full py-4' onClick={() => onClick?.(o.id)}>
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
