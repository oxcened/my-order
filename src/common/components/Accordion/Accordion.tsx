import * as React from 'react';
import AccordionHeader, { AccordionHeaderProps } from '@/common/components/AccordionHeader';
import AccordionBody, { AccordionBodyProps } from '@/common/components/AccordionBody';

export type AccordionProps = {
  children?: React.ReactNode;
  isOpen?: boolean;
  id?: string;
  className?: string;
  onOpenChange?: () => void;
};

const Accordion = ({ children, isOpen, className, onOpenChange }: AccordionProps) => {
  const mChildren = React.Children.map(children, child => {
    if (React.isValidElement<AccordionHeaderProps>(child) && child.type === AccordionHeader) {
      return React.cloneElement(child, {
        isOpen,
        onClick: onOpenChange
      });
    }

    if (React.isValidElement<AccordionBodyProps>(child) && child.type === AccordionBody) {
      return React.cloneElement(child, {
        isOpen
      });
    }

    return child;
  });

  return <div className={className} data-testid='accordion'>
    {mChildren}
  </div>;
};

export default Accordion;
