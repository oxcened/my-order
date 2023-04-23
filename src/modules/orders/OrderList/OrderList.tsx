import * as React from 'react';
import OrderCard from '@/modules/orders/OrderCard/OrderCard';
import LoadingCard from '@/common/components/LoadingCard';
import locale from '@/common/utils/locale';
import { useNavigate } from 'react-router-dom';
import { Order } from '@/modules/orders/Order';

const OrderList = (
  { orders, isLoading, onDelete }: {
    orders: Order[];
    isLoading?: boolean;
    onDelete?: (order: Order) => void;
  }
) => {
  const navigate = useNavigate();

  const mOrders = () => {
    if (isLoading) {
      return new Array(3)
        .fill(undefined)
        .map((value, index) => {
          return <LoadingCard key={index} index={index} />;
        });
    }

    if (!orders.length) {
      return <span className='text-gray-500'>{locale.components.orders.placeholder}</span>;
    }

    return orders.map((order, index) => {
      return <OrderCard
        key={order.id}
        order={order}
        index={index}
        onDelete={() => onDelete?.(order)}
        onEdit={() => navigate(`/order/${order.id}`)}
      />;
    });
  };

  return <div
    className='mb-14 sm:mb-0 flex flex-col max-w-screen-sm divide-y mt-4'>
    {mOrders()}
  </div>;
};

export default OrderList;
