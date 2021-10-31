import * as React from 'react';
import { useEffect, useState } from 'react';
import ordersApi from '../redux/apis/orders';
import restaurantsApi from '../redux/apis/restaurants';
import AccordionList from './AccordionList';
import AccordionBody from './AccordionBody';
import AccordionHeader from './AccordionHeader';
import Accordion from './Accordion';

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
      return <div key={p.id}>
        {p.title}
      </div>;
    });

    return <Accordion key={id} id={id}>
      <AccordionHeader>
        {title}
      </AccordionHeader>

      <AccordionBody>
        {mProducts}
      </AccordionBody>
    </Accordion>;
  });

  return <AccordionList>
    {mCategories}
  </AccordionList>;
};

export default OrderDetail;
