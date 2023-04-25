import * as React from 'react';
import AccordionHeader from './AccordionHeader';
import Accordion from '@/common/components/Accordion/Accordion';

export const LoadingAccordion = () => {
  return <Accordion className='animate-pulse'>
    <AccordionHeader headerClassName='bg-gray-100 bg-opacity-70 h-5 w-full rounded-md mr-10'>
    </AccordionHeader>
  </Accordion>;
};

export default LoadingAccordion;
