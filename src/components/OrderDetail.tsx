import * as React from 'react';
import { useEffect } from 'react';
import ordersApi from '../redux/apis/orders';
import restaurantsApi from '../redux/apis/restaurants';
import AccordionList from './AccordionList';
import AccordionBody from './AccordionBody';
import AccordionHeader from './AccordionHeader';
import Accordion from './Accordion';
import { PlusIcon } from '@heroicons/react/solid';
import IconButton from './IconButton';

const OrderDetail = ({ id }: { id?: string }) => {
  const { data: menu } = restaurantsApi.useGetRestaurantMenuQuery();
  const [getOrder, order] = ordersApi.useLazyGetOrderQuery();

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, []);

  if (!menu) {
    return null;
  }

  const mCategories = menu.categories.map(({ id, title, products }) => {
    const mProducts = products.map(p => {
      return <div key={p.id} className='bg-white p-3 border rounded-md max-w-md'>
        <div className='flex justify-between'>
          <span className='font-bold text-md'>{p.title}</span>

          <IconButton className='w-7 h-7' color='primary'>
            <PlusIcon className='w-4' />
          </IconButton>
        </div>

        {p.description && <span>{p.description}</span>}
      </div>;
    });

    return <Accordion key={id} id={id}>
      <AccordionHeader>
        {title}
      </AccordionHeader>

      <AccordionBody className='space-y-3'>
        {mProducts}
      </AccordionBody>
    </Accordion>;
  });

  return <div>
    <p className='text-3xl px-3 pt-3'>Your Order</p>
    <div className='bg-white border m-3 rounded-md p-3 max-w-md'>
      Your order starts here!
    </div>

    <p className='text-3xl px-3 pt-3 pb-1'>Menu</p>
    <AccordionList>
      {mCategories}
    </AccordionList>
  </div>;
};

export default OrderDetail;
