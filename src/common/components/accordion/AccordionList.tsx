import * as React from 'react';
import { ComponentPropsWithoutRef, useState } from 'react';
import Accordion, { AccordionProps } from '@/common/components/accordion/Accordion';

const AccordionList = ({ children }: {
  children?: React.ReactNode;
}) => {
  const [openAccordion, setOpenAccordion] = useState<string>();

  const mChildren = React.Children.map(children, child => {
    if (React.isValidElement<AccordionProps>(child) && child.type === Accordion) {
      const isOpen = openAccordion === child.props.id;

      return React.cloneElement(child, {
        isOpen,
        onOpenChange: () => {
          if (isOpen) {
            setOpenAccordion(undefined);
          } else {
            setOpenAccordion(child.props.id);
          }
        }
      });
    }

    return child;
  });

  return <div className='divide-y'>
    {mChildren}
  </div>;
};

export default AccordionList;
