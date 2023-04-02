import IconButton from './IconButton';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { Order as OrderM } from '../models/Order';
import { Product } from '../models/Product';
import { groupByKeyQuantity } from '../core/utils';
import { useAuth } from '../core/hooks';
import locale from '../core/locale';
import { avatars } from '../models/Avatars';

const Order = ({ order: { id, author, products, notes }, index, onDelete, onEdit }: {
  order: OrderM;
  index: number;
  onDelete?: () => void;
  onEdit?: () => void;
}) => {
  const { user } = useAuth();

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

  const isOwn = user?.name === author.name;

  return <div
    data-testid='order'
    key={id}
    className='bg-white rounded-md p-3 border'>
    <div className='flex justify-between'>
      <span className='font-bold text-lg flex items-center mb-2'>
        <img src={avatars[author.avatar ?? 0]} alt='avatar' className='h-10 w-10 mr-2 border' />
        <span data-testid='author-name'>{locale.formatString(locale.components.order.title, index.toString(), author.name)}</span>
      </span>

      {isOwn
        && <div className='flex'>
          <IconButton
            data-testid='edit-button'
            className='h-7 w-7'
            color='white'
            onClick={() => onEdit?.()}
          >
            <PencilIcon className='w-5 h-5 text-yellow-500' />
          </IconButton>

          <IconButton
            data-testid='delete-button'
            className='h-7 w-7 ml-3'
            color='white'
            onClick={() => onDelete?.()}>
            <TrashIcon className='w-5 h-5 text-red-500' />
          </IconButton>
        </div>}
    </div>

    <div className='mt-2 space-y-3'>
      {getProducts(products)}
    </div>

    {!!notes && <div className='mt-5 flex flex-col'>
      <span className='font-bold'>{locale.components.order.notesTitle}</span>
      <span>{notes}</span>
    </div>}
  </div>;
}

export default Order;
