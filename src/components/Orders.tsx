import * as React from 'react';
import { Order } from '../models/Order';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import IconButton from './IconButton';

const Orders = ({ orders }: { orders: Order[] }) => {
  const mOrders = () => {
    if (!orders.length) {
      return <span className='text-gray-500'>Be the first one to make an order!</span>;
    }

    return orders.map(({ id, author, content }) => {
      const getContent = (content: string[]) => {
        const groupedMap = content.reduce((previousValue, currentValue) => {
          const quantity = previousValue.get(currentValue);

          if (quantity) {
            previousValue.set(currentValue, quantity + 1);
          } else {
            previousValue.set(currentValue, 1);
          }

          return previousValue;
        }, new Map<string, number>());

        return [...groupedMap.entries()].map(([key, value]) => {
          return `${value}x ${key}`;
        });
      }

      return <div key={id} className='bg-white rounded-md p-3 max-w-md mt-4 shadow-sm'>
        <div className='flex justify-between'>
          <span className='font-bold text-lg'>
          {author}'s order
        </span>

          <div className='flex'>
            <IconButton className='h-6 w-6'>
              <PencilIcon className='w-5 h-5' />
            </IconButton>

            <IconButton className='h-6 w-6 ml-3'>
              <TrashIcon className='w-5 h-5 text-red-500' />
            </IconButton>
          </div>
        </div>

        <div>
          {getContent(content).map(c => (
            <div key={c}>
              {c}
            </div>
          ))}
        </div>
      </div>
    });
  };

  return <div className='mt-4 sm:mt-6'>
    {mOrders()}
  </div>;
};

export default Orders;
