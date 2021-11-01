import Button from './Button';
import * as React from 'react';
import { Order } from '../models/Order';
import { groupByKey } from '../core/utils';
import { Product } from '../models/Product';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckCircleIcon } from '@heroicons/react/solid';

const OrderCart = ({ order, loadingMakeOrder, onProductClick, onMakeOrder }: {
  order: Order;
  loadingMakeOrder?: boolean;
  onProductClick?: (product: Product, quantity: number) => void;
  onMakeOrder?: () => void;
}) => {
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

  return <div className='flex-1 sm:max-w-md'>
    <p className='text-3xl md:text-4xl lg:text-5xl'>Your Order</p>

    <div className='bg-white border rounded-md px-3 py-1 divide-y mt-2 sm:mt-3'>
      {getOrderProducts()}
    </div>

    <Button
      color='primary'
      className='mt-2 w-full justify-center'
      disabled={!order.products.length || loadingMakeOrder}
      onClick={onMakeOrder}
    >
      <div className='mr-2'>
        {loadingMakeOrder
          ? <FontAwesomeIcon icon={faCircleNotch} className='animate-spin h-4 w-5 mt-0.5 -mb-0.5' />
          : <CheckCircleIcon className='h-5' />}
      </div>
      Place Order
    </Button>
  </div>;
};

export default OrderCart;
