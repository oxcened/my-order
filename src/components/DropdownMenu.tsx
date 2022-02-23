import Button from './Button';
import locale from '../core/locale';
import { CSSTransition } from 'react-transition-group';
import * as React from 'react';

const DropdownMenu = ({ open, options, onClick }: {
  open?: boolean;
  options: { id: string, label: string, icon: React.ComponentType<React.ComponentPropsWithoutRef<'svg'>> }[];
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
          const Icon = o.icon;
          return (
            <Button color='white' className='w-full py-4' onClick={() => onClick?.(o.id)}>
              <Icon className='h-5 mr-2 text-primary-500' />
              {locale.components.navbar.logout}
            </Button>
          );
        })}
      </div>
    </CSSTransition>
  );
};

export default DropdownMenu;
