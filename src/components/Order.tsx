import IconButton from './IconButton';
import { TrashIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { Order as OrderM } from '../models/Order';
import { Product } from '../models/Product';
import { groupByKeyQuantity } from '../core/utils';
import classNames from 'classnames';

export const EMPTY_ORDER: OrderM = {
  id: '',
  created: '',
  author: { name: '' },
  products: []
};

const Order = ({ order, onDelete }: {
  order: OrderM;
  onDelete?: () => void;
}) => {
  const { id, author, products } = order;

  const getProducts = (products: Product[]) => {
    if (!products.length) {
      return new Array(4)
        .fill(undefined)
        .map((value, index) => (
          <div className='bg-primary h-5 w-32 rounded-md bg-opacity-60'>

          </div>
        ));
    }

    return groupByKeyQuantity(products, 'id').map(([prod, quantity]) => {
      return <div key={prod.id} className='flex items-center'>
        <div className='bg-gray-100 rounded-full font-bold block text-sm h-6 w-6 grid place-content-center'>
          {quantity}
        </div>

        <span className='ml-3'>{prod.title}</span>
      </div>;
    });
  };

  return <div
    key={id}
    className={classNames('bg-white rounded-md p-3 max-w-md border', { 'animate-pulse': order === EMPTY_ORDER })}>
    <div className='flex justify-between'>
      {author.name.length
        ? <span className='font-bold text-lg'>
            {author.name}'s order
        </span>
        : <div className='w-full bg-primary rounded-md bg-opacity-60 h-5' />}

      <div className='flex'>
        {/*<IconButton className='h-7 w-7' color='white'>
              <PencilIcon className='w-5 h-5' />
            </IconButton>*/}

        {!!id.length
        && <IconButton
          className='h-7 w-7 ml-3'
          color='white'
          onClick={() => onDelete?.()}>
          <TrashIcon className='w-5 h-5 text-red-500' />
        </IconButton>}
      </div>
    </div>

    <div className='mt-2 space-y-3'>
      {getProducts(products)}
    </div>
  </div>;
}

export default Order;
