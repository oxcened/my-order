import * as React from 'react';
import locale from '@/common/utils/locale';
import { Product } from '@/modules/orders/Product';
import { groupByKey } from '@/common/utils/misc';
import Button from '@/common/components/Button/Button';

const OrderCart = ({ order, notes, loadingMakeOrder, isEdit, onProductClick, onMakeOrder, onNotesChange }: {
  order: Product[];
  notes: string;
  isEdit?: boolean;
  loadingMakeOrder?: boolean;
  onProductClick?: (product: Product, quantity: number) => void;
  onMakeOrder?: (notes: string) => void;
  onNotesChange?: (value: string) => void;
}) => {
  const getOrderProducts = () => {
    if (!order.length) {
      return <p className='my-3 text-gray-500'>{locale.components.orderCart.placeholer}</p>;
    }

    const mapped = Object.entries(groupByKey(order, 'id'))
      .reduce((prev: [Product, number][], [, products]) => {
        const newItem = [products[0], products.length] as ([Product, number]);
        return [...prev, newItem];
      }, []);

    return mapped.map(([product, quantity]) => {
      return <div
        key={product.id}
        className='py-3 flex items-center cursor-pointer'
        onClick={() => onProductClick?.(product, quantity)}
      >
        <div className='bg-gray-100 rounded-full font-bold block text-sm h-6 w-6 grid place-content-center'>
          {quantity}
        </div>

        <span className='ml-3'>{product.title}</span>
      </div>;
    });
  };

  return <div className='flex-1 hidden sm:block sm:max-w-md'>
    <p className='text-lg'>{locale.components.orderCart.title}</p>

    <div className='divide-y mt-2 sm:mt-3'>
      {getOrderProducts()}
    </div>

    <input
      className='w-full rounded-md border p-3 mt-2'
      placeholder={locale.components.orderCart.notesPlaceholder}
      value={notes}
      type='text'
      onChange={event => onNotesChange?.(event.target.value)}
    />

    <Button
      color='primary'
      className='mt-2 w-full justify-center hidden'
      disabled={!order.length || loadingMakeOrder}
      onClick={() => onMakeOrder?.(notes)}
    >
      <div className='mr-2'>
        {/*{loadingMakeOrder
          ? <FontAwesomeIcon icon={faCircleNotch} className='animate-spin h-4 w-5 mt-0.5 -mb-0.5' />
          : <CheckCircleIcon className='h-5' />}*/}
      </div>
      {isEdit
        ? locale.components.orderCart.update
        : locale.components.orderCart.submit}
    </Button>
  </div>;
};

export default OrderCart;
