import * as React from 'react';
import { Order } from '../models/Order';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import IconButton from './IconButton';
import { Product } from '../models/Product';
import { groupByKeyQuantity } from '../core/utils';

const Orders = ({ orders, onDelete }: { orders: Order[]; onDelete?: (order: Order) => void; }) => {
  const mOrders = () => {
    if (!orders.length) {
      return <span className='text-gray-500'>Be the first one to make an order!</span>;
    }

    const getProducts = (products: Product[]) => {
      return groupByKeyQuantity(products, 'id').map(([prod, quantity]) => {
        return <div key={prod.id} className='flex items-center'>
          <div className='bg-gray-100 rounded-full font-bold block text-sm h-6 w-6 grid place-content-center'>
            {quantity}
          </div>

          <span className='ml-3'>{prod.title}</span>
        </div>;
      });
    };

    return orders.map((order) => {
      const { id, author, products } = order;

      return <div key={id} className='bg-white rounded-md p-3 max-w-md border'>
        <div className='flex justify-between'>
          <span className='font-bold text-lg'>
          {author.name}'s order
        </span>

          <div className='flex'>
            {/*<IconButton className='h-7 w-7' color='white'>
              <PencilIcon className='w-5 h-5' />
            </IconButton>*/}

            <IconButton
              className='h-7 w-7 ml-3'
              color='white'
              onClick={() => onDelete?.(order)}>
              <TrashIcon className='w-5 h-5 text-red-500' />
            </IconButton>
          </div>
        </div>

        <div className='mt-2 space-y-3'>
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
