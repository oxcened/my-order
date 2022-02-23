import * as React from 'react';
import { ComponentPropsWithoutRef, HTMLProps, useEffect, useState } from 'react';
import DropdownMenu from './DropdownMenu';

const Dropdown = ({ children, id }: {
  children?: React.ReactNode;
  id?: string;
}) => {
  const toggleId = `${id}-toggle`;

  useEffect(() => {
    const listener: EventListener = (e) => {
      if (!e.target || !(e.target instanceof Element)) {
        return;
      }

      if (id && document.getElementById(id)?.contains(e.target)) {
        return;
      }

      if (id && document.getElementById(toggleId)?.contains(e.target)) {
        return;
      }

      setOpenDropdown(false);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, []);

  const [openDropdown, setOpenDropdown] = useState(false);

  const mChildren = React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.props.id === toggleId) {
      return React.cloneElement<HTMLProps<HTMLElement>>(child, {
        onClick: () => setOpenDropdown(state => !state)
      });
    } else if (child.type === DropdownMenu) {
      return React.cloneElement<ComponentPropsWithoutRef<typeof DropdownMenu>>(child, {
        open: openDropdown
      });
    } else {
      return child;
    }
  });

  return <>
    {mChildren}
  </>;
};

export default Dropdown;
