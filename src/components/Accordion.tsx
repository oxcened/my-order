import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';

const Accordion = ({ children, isOpen, className, onOpenChange }: {
  children?: React.ReactNode;
  isOpen?: boolean;
  id?: string;
  className?: string;
  onOpenChange?: () => void;
}) => {
  const mChildren = React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }

    switch (child.type) {
      case AccordionHeader:
        return React.cloneElement<ComponentPropsWithoutRef<typeof AccordionHeader>>(child, {
          isOpen,
          onClick: onOpenChange
        });
      case AccordionBody:
        return React.cloneElement<ComponentPropsWithoutRef<typeof AccordionBody>>(child, {
          isOpen
        });
      default:
        return child;
    }
  });

  return <div className={className}>
    {mChildren}
  </div>;
}

export default Accordion;
