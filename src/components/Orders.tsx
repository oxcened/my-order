import * as React from 'react';
import { Order } from '../models/Order';
import OrderComponent, { EMPTY_ORDER } from '../components/Order';

const Orders = (
  { orders, isLoading, onDelete }: {
    orders: Order[];
    isLoading?: boolean;
    onDelete?: (order: Order) => void;
  }
) => {
  const mOrders = () => {
    if (isLoading) {
      return new Array(3)
        .fill(undefined)
        .map((value, index) => {
          return <OrderComponent
            key={index}
            order={EMPTY_ORDER}
          />
        });
    }

    if (!orders.length) {
      return <span className='text-gray-500'>Be the first one to make an order!</span>;
    }

    return orders.map((order) => {
      return <OrderComponent
        key={order.id}
        order={order}
        onDelete={() => onDelete?.(order)}
      />;
    });
  };

  return <div className='mt-4 sm:mt-6 space-y-4'>
    {mOrders()}
  </div>;
};

export default Orders;
