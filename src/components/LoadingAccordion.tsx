import * as React from 'react';
import Accordion from './Accordion';
import AccordionHeader from './AccordionHeader';

export const LoadingAccordion = () => {
  return <Accordion className='animate-pulse'>
    <AccordionHeader headerClassName='bg-primary-500 bg-opacity-70 h-5 w-full rounded-md mr-10'>
    </AccordionHeader>
  </Accordion>;
};

export default LoadingAccordion;
