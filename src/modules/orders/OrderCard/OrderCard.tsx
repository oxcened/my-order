import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { useAuth } from '@/modules/auth/useAuth';
import locale from '@/common/utils/locale';
import { Product } from '@/modules/orders/Product';
import { Order as OrderModel } from '@/modules/orders/Order';
import { groupByKeyQuantity } from '@/common/utils/misc';
import IconButton from '@/common/components/IconButton';
import { getAvatar } from '@/common/images/avatars/avatars';
import sodaIcon from '@/common/images/foodIcons/soda.png';
import { twMerge } from 'tailwind-merge';
import { DateTime } from 'luxon';

const OrderCard = ({ order: { id, author, products, notes, created }, index, onDelete, onEdit }: {
  order: OrderModel;
  index: number;
  onDelete?: () => void;
  onEdit?: () => void;
}) => {
  const { user } = useAuth();

  const getProducts = (products: Product[]) => {
    return groupByKeyQuantity(products, 'id').map(([prod, quantity]) => {
      return <div key={prod.id} className='flex justify-between'>
        <div className='flex gap-5 items-center'>
          <div className='w-10 h-10 p-1.5 bg-gray-100 rounded-xl relative grid place-content-center'>
            <img src={sodaIcon} className='' />
            {(quantity > 1) && (
              <div
                className='absolute top-0 right-0 bg-white border h-5 w-5 translate-x-1/3 -translate-y-1/3 rounded-full grid place-content-center text-xs'>
                {quantity}
              </div>
            )}
          </div>

          <div className='flex flex-col'>
            <span>{prod.title}</span>
            <span className='text-gray-500'>Drinks</span>
          </div>
        </div>
      </div>;
    });
  };

  const isOwn = user?.name === author.name;

  return <div
    data-testid='order'
    key={id}
    className={twMerge('flex justify-between pb-8', !!index && 'pt-8')}
  >
    <div className='flex gap-5 flex-1'>
      <img src={getAvatar(author?.avatar)} alt='avatar' className='h-12 w-12 rounded-full bg-gray-50' />

      <div className='flex flex-col flex-1'>
        <div className='flex items-center gap-2'>
          <p data-testid='author-name' className='font-bold'>
            {author.name}
          </p>

          <p className='text-sm text-gray-500'>
            {DateTime.fromMillis(created.toMillis()).toRelative()}
          </p>

          {isOwn && (
            <div className='flex ml-auto'>
              <IconButton
                data-testid='edit-button'
                className='h-7 w-7'
                color='light'
                title='Edit'
                onClick={() => onEdit?.()}
              >
                <PencilIcon className='w-5 h-5 text-gray-500' />
              </IconButton>

              <IconButton
                data-testid='delete-button'
                className='h-7 w-7 ml-3 group'
                color='danger'
                title='Delete'
                onClick={() => onDelete?.()}
              >
                <TrashIcon className='w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors' />
              </IconButton>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-3 mt-3'>
          {getProducts(products)}
        </div>
      </div>
    </div>

    {!!notes && (
      <div className='mt-5 flex flex-col'>
        <span className='font-bold'>{locale.components.order.notesTitle}</span>
        <span>{notes}</span>
      </div>
    )}
  </div>;
};

export default OrderCard;
