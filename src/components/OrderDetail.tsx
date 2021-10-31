import * as React from 'react';
import { useEffect, useState } from 'react';
import ordersApi from '../redux/apis/orders.api';
import restaurantsApi from '../redux/apis/restaurants.api';
import OrderMenu from './OrderMenu';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import OrderCart from './OrderCart';
import ProductModal from './ProductModal';

const OrderDetail = ({ id }: { id?: string }) => {
  const { data: menu } = restaurantsApi.useGetRestaurantMenuQuery();
  const [getOrder, cachedOrder] = ordersApi.useLazyGetOrderQuery();

  const [order, setOrder] = useState<Readonly<Order>>({
    id: '',
    products: [],
    author: '',
    created: ''
  });

  const [openedProduct, setOpenedProduct] = useState<Product>();

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, [])

  const onOpenProduct = (product: Product) => {
    setOpenedProduct(product);
  };

  const onAddProduct = (quantity: number) => {
    if (!openedProduct) {
      return;
    }

    const newProducts = new Array(quantity).fill(openedProduct);

    setOrder(prevState => ({
      ...prevState,
      products: [...prevState.products, ...newProducts]
    }));

    setOpenedProduct(undefined);
  };

  if (!menu) {
    return null;
  }

  return <>
    <div className='pt-6 sm:pt-8 px-4 sm:px-8 flex w-full flex-col sm:flex-row-reverse'>
      <OrderCart order={order} />

      <OrderMenu
        menu={menu}
        onAddProduct={onOpenProduct} />
    </div>

    <ProductModal
      product={openedProduct}
      onBackdropClick={() => setOpenedProduct(undefined)}
      onSubmit={onAddProduct}
    />
  </>;
};

export default OrderDetail;
