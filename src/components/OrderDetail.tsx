import * as React from 'react';
import { useEffect, useState } from 'react';
import ordersApi from '../redux/apis/orders.api';
import restaurantsApi from '../redux/apis/restaurants.api';
import OrderMenu from './OrderMenu';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { groupByKey } from '../core/utils';
import Button from './Button';

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
    setOrder(prevState => ({
      ...prevState,
      products: [...prevState.products, { ...product, added: new Date() }]
    }));
  };

  const getOrderProducts = () => {
    if (!order.products.length) {
      return <p className='my-2'>Pick something from the Menu to get started</p>;
    }

    const mapped = Object.entries(groupByKey(order.products, 'id'))
      .reduce((prev: [Product, number][], [, products]) => {
        const newItem = [products[0], products.length] as ([Product, number]);
        return [...prev, newItem];
      }, []);

    return mapped.map(([product, quantity]) => {
      return <div key={product.id} className='py-3 flex justify-between items-center'>
        <span>{quantity}x {product.title}</span>
      </div>;
    });
  };

  return <div className='pt-6 sm:pt-8 px-4 sm:px-8 flex w-full flex-col sm:flex-row-reverse'>
    <div className='flex-1 sm:max-w-md'>
      <p className='text-3xl'>Your Order</p>

      <div className='bg-white border rounded-md px-3 py-1 divide-y mt-2 sm:mt-3'>
        {getOrderProducts()}
      </div>

      <Button
        color='primary'
        className='mt-2 w-full justify-center'
        disabled={!order.products.length}
      >
        Make Order
      </Button>
    </div>

    <div className='flex-1 mt-6 sm:mt-0 sm:mr-10'>
      <p className='text-3xl pb-1'>Menu</p>
      <OrderMenu
        menu={menu}
        onAddProduct={onAddProduct}
      />
    </div>
  </div>;
};

export default OrderDetail;
