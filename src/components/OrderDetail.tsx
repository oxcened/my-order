import * as React from 'react';
import { useEffect, useState } from 'react';
import ordersApi from '../redux/apis/orders.api';
import restaurantsApi from '../redux/apis/restaurants.api';
import OrderMenu from './OrderMenu';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import AccordionList from './AccordionList';
import Accordion from './Accordion';
import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';

const OrderDetail = ({ id }: { id?: string }) => {
  const { data: menu } = restaurantsApi.useGetRestaurantMenuQuery();
  const [getOrder, cachedOrder] = ordersApi.useLazyGetOrderQuery();
  const [order, setOrder] = useState<Readonly<Order>>({
    id: '',
    products: [],
    author: '',
    created: ''
  });

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, []);

  if (!menu) {
    return null;
  }

  const onAddProduct = (product: Product) => {
    // TODO add to order
    setOrder(prevState => ({
      ...prevState,
      products: [...prevState.products, product]
    }));
  };

  const getOrderProducts = () => {
    if (!order.products.length) {
      return <span>Your order starts here!</span>;
    }

    return order.products.map(p => {
      return <div key={p.id} className='py-3'>
        1x {p.title}
      </div>;
    });
  };

  return <div>
    <AccordionList>
      <Accordion id='1'>
        <AccordionHeader>
          <p className='text-3xl'>Your Order</p>
        </AccordionHeader>

        <AccordionBody>
          <div className='bg-white border rounded-md px-3 py-1 max-w-md divide-y'>
            {getOrderProducts()}
          </div>
        </AccordionBody>
      </Accordion>
    </AccordionList>

    <p className='text-3xl px-3 pt-4 pb-1'>Menu</p>
    <OrderMenu
      menu={menu}
      onAddProduct={onAddProduct}
    />
  </div>;
};

export default OrderDetail;
