import AccordionList from './AccordionList';
import * as React from 'react';
import IconButton from './IconButton';
import { PlusIcon } from '@heroicons/react/solid';
import Accordion from './Accordion';
import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';
import { Menu } from '../models/Menu';
import { Product } from '../models/Product';

const OrderMenu = ({ menu, onAddProduct }: {
  menu: Menu;
  onAddProduct?: (product: Product) => void
}) => {
  const mCategories = menu.categories.map(({ id, title, products }) => {
    const mProducts = products.map(p => {
      return <div key={p.id} className='bg-white p-3 border rounded-md sm:max-w-md'>
        <div className='flex justify-between'>
          <span className='font-bold text-md'>{p.title}</span>

          <IconButton className='w-7 h-7' color='primary'>
            <PlusIcon className='w-4' onClick={() => onAddProduct?.(p)} />
          </IconButton>
        </div>

        {p.description && <span>{p.description}</span>}
      </div>;
    });

    return <Accordion key={id} id={id}>
      <AccordionHeader className='font-bold'>
        {title}
      </AccordionHeader>

      <AccordionBody className='space-y-3'>
        {mProducts}
      </AccordionBody>
    </Accordion>;
  });

  return <AccordionList>
    {mCategories}
  </AccordionList>;
};

export default OrderMenu;
