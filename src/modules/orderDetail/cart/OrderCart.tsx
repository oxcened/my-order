import * as React from 'react';
import locale from '@/common/utils/locale';
import { Product } from '@/modules/orders/Product';
import { groupByKey } from '@/common/utils/misc';
import Button from '@/common/components/Button/Button';
import { ChevronLeftIcon } from '@heroicons/react/outline';

const OrderCart = (
  {
    order,
    notes,
    loadingMakeOrder,
    isEdit,
    containerClass,
    onProductClick,
    onMakeOrder,
    onNotesChange,
    onBackButtonClick
  }: {
    order: Product[];
    notes: string;
    isEdit?: boolean;
    loadingMakeOrder?: boolean;
    containerClass?: string;
    onProductClick?: (product: Product, quantity: number) => void;
    onMakeOrder?: (notes: string) => void;
    onNotesChange?: (value: string) => void;
    onBackButtonClick?: () => void;
  }) => {
  const getOrderProducts = () => {
    if (!order.length) {
      return <p className="my-3 text-gray-500">{locale.components.orderCart.placeholer}</p>;
    }

    const mapped = Object.entries(groupByKey(order, 'id'))
      .reduce((prev: [Product, number][], [, products]) => {
        const newItem = [products[0], products.length] as ([Product, number]);
        return [...prev, newItem];
      }, []);

    return mapped.map(([product, quantity]) => {
      return <div
        key={product.id}
        className="py-3 flex items-center cursor-pointer"
        onClick={() => onProductClick?.(product, quantity)}
      >
        <div className="bg-gray-100 rounded-full font-bold block text-sm h-6 w-6 grid place-content-center">
          {quantity}
        </div>

        <span className="ml-3">{product.title}</span>
      </div>;
    });
  };

  return <div className={containerClass}>
    <div className="flex items-center gap-3 border-b pb-3 mb-3 sm:border-none sm:p-0 sm:m-0">
      <Button
        outline
        className="sm:hidden px-2 py-2"
        color="light"
        onClick={onBackButtonClick}
      >
        <ChevronLeftIcon className="h-5" />
      </Button>

      <p className="text-lg">{locale.components.orderCart.title}</p>
    </div>

    <div className="divide-y mt-2 sm:mt-3">
      {getOrderProducts()}
    </div>

    <input
      className="w-full rounded-md border p-3 mt-2"
      placeholder={locale.components.orderCart.notesPlaceholder}
      value={notes}
      type="text"
      onChange={event => onNotesChange?.(event.target.value)}
    />

    <Button
      color="primary"
      className="mt-5 w-full justify-center sm:hidden"
      disabled={!order.length || loadingMakeOrder}
      onClick={() => onMakeOrder?.(notes)}
    >
      {locale.pages.orderDetail.submitOrder}
    </Button>
  </div>;
};

export default OrderCart;
