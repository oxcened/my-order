import * as React from 'react';
import { useEffect, useState } from 'react';
import ordersApi from '../redux/apis/orders.api';
import restaurantsApi from '../redux/apis/restaurants.api';
import OrderMenu from './OrderMenu';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { TrashIcon } from '@heroicons/react/solid';
import IconButton from './IconButton';
import { groupByKey } from '../core/utils';

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
      return <span>Your order starts here!</span>;
    }

    const onDelete = (product: Product) => {
      setOrder(order => ({
        ...order,
        products: [...order.products].splice(order.products.indexOf(product), 1)
      }))
    };

    const mapped = Object.entries(groupByKey(order.products, 'id'))
      .reduce((prev: [Product, number][], [, products]) => {
        const newItem = [products[0], products.length] as ([Product, number]);
        return [...prev, newItem];
      }, []);

    return mapped.map(([product, quantity]) => {
      return <div key={product.id} className='py-3 flex justify-between items-center'>
        <span>{quantity}x {product.title}</span>

        <IconButton className='h-6 w-6 ml-3' color='white' onClick={() => onDelete(product)}>
          <TrashIcon className='w-5 h-5 text-red-500' />
        </IconButton>
      </div>;
    });
  };

  return <div className='pt-6 sm:pt-8 px-4 sm:px-8'>
    <p className='text-3xl'>Your Order</p>

    <div className='bg-white border rounded-md p-3 max-w-md divide-y mt-1 sm:mt-2'>
      {getOrderProducts()}
    </div>

    <p className='text-3xl mt-6 sm:mt-8 pb-1'>Menu</p>
    <OrderMenu
      menu={menu}
      onAddProduct={onAddProduct}
    />
  </div>;
};

export default OrderDetail;
