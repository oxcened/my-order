import * as React from 'react';
import { ComponentPropsWithoutRef, useState } from 'react';
import Accordion from './Accordion';

const AccordionList = ({ children }: {
  children?: React.ReactNode;
}) => {
  const [openAccordion, setOpenAccordion] = useState();

  const mChildren = React.Children.map(children, child => {
    if (!React.isValidElement(child) || child.type !== Accordion) {
      return child;
    }

    const isOpen = openAccordion === child.props.id;

    return React.cloneElement<ComponentPropsWithoutRef<typeof Accordion>>(child, {
      isOpen,
      onOpenChange: () => {
        if (isOpen) {
          setOpenAccordion(undefined);
        } else {
          setOpenAccordion(child.props.id);
        }
      }
    });
  });

  return <div className='divide-y'>
    {mChildren}
  </div>;
};

export default AccordionList;
