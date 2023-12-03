import * as React from 'react';
import { OrderCard } from '../OrderCard/OrderCard';
import LoadingCard from '@/common/components/LoadingCard';
import locale from '@/common/utils/locale';
import { useNavigate } from 'react-router-dom';
import { Order } from '../models';

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
          return <LoadingCard key={index} />;
        });
    }

    if (!orders.length) {
      return <span className="text-gray-500">{locale.components.orders.placeholder}</span>;
    }

    return orders.map((order, index) => {
      return <OrderCard
        key={order.id}
        order={order}
        index={index + 1}
        onDelete={() => onDelete?.(order)}
        onEdit={() => navigate(`/order/${order.id}`)}
      />;
    });
  };

  return <div
    className="mt-4 sm:mt-6 mb-14 sm:mb-0 grid md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-md md:max-w-4xl xl:max-w-7xl">
    {mOrders()}
  </div>;
};

export {
  OrderList
};
