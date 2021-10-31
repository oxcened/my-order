import * as React from 'react';
import { Order } from '../models/Order';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import IconButton from './IconButton';
import { Product } from '../models/Product';
import { groupByKey } from '../core/utils';

const Orders = ({ orders }: { orders: Order[] }) => {
  const mOrders = () => {
    if (!orders.length) {
      return <span className='text-gray-500'>Be the first one to make an order!</span>;
    }

    const getProducts = (products: Product[]) => {
      return Object.entries(groupByKey(products, 'id'))
        .reduce((prev: [Product, number][], [, products]) => {
          const newItem = [products[0], products.length] as ([Product, number]);
          return [...prev, newItem];
        }, [])
        .map(([prod, quantity]) => {
          return <div key={prod.id} className='flex items-center py-1'>
            <div className='bg-gray-100 rounded-full font-bold block text-sm h-6 w-6 grid place-content-center'>
              {quantity}
            </div>

            <span className='ml-3'>{prod.title}</span>
          </div>;
        });
    };

    return orders.map(({ id, author, products }) => {
      return <div key={id} className='bg-white rounded-md p-3 max-w-md border'>
        <div className='flex justify-between'>
          <span className='font-bold text-lg'>
          {author}'s order
        </span>

          <div className='flex'>
            <IconButton className='h-6 w-6' color='white'>
              <PencilIcon className='w-5 h-5' />
            </IconButton>

            <IconButton className='h-6 w-6 ml-3' color='white'>
              <TrashIcon className='w-5 h-5 text-red-500' />
            </IconButton>
          </div>
        </div>

        <div className='mt-1'>
          {getProducts(products)}
        </div>
      </div>
    });
  };

  return <div className='mt-4 sm:mt-6 space-y-4'>
    {mOrders()}
  </div>;
};

export default Orders;
