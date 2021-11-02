import * as React from 'react';
import { ComponentProps, useEffect, useState } from 'react';
import ordersApi from '../redux/apis/orders.api';
import restaurantsApi from '../redux/apis/restaurants.api';
import OrderMenu from './OrderMenu';
import { Product } from '../models/Product';
import OrderCart from './OrderCart';
import ProductModal from './ProductModal';
import { navigate } from 'gatsby';
import SuccessModal from './SuccessModal';

const TIMEOUT_SUCCESS_MODAL_MS = 2000;

const OrderDetail = ({ id }: { id?: string }) => {
  const { data: menu, isLoading } = restaurantsApi.useGetRestaurantMenuQuery();
  const [getOrder, cachedOrder] = ordersApi.useLazyGetOrderQuery();
  const [makeOrder, makeOrderResult] = ordersApi.useLazyMakeOrderQuery();

  const [order, setOrder] = useState<Product[]>([]);

  const [showProductModal, setShowProductModal] = useState(false);

  const [productModalPayload, setProductModalPayload] =
    useState<Readonly<Pick<ComponentProps<typeof ProductModal>, 'product' | 'quantity' | 'isEdit'>>>();

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, [])

  useEffect(() => {
    if (makeOrderResult.isSuccess) {
      window.setTimeout(() => {
        navigate('/');
      }, TIMEOUT_SUCCESS_MODAL_MS);
    }
  }, [makeOrderResult]);

  const onOpenProduct = (product: Product, quantity?: number, isEdit?: boolean) => {
    setShowProductModal(true);
    setProductModalPayload({
      product,
      quantity: quantity ?? 1,
      isEdit: isEdit ?? false
    });
  };

  const onAddProduct = (quantity: number) => {
    if (!productModalPayload?.product) {
      return;
    }

    const newProducts = new Array(quantity).fill(productModalPayload.product);

    setOrder(prevState => [...prevState, ...newProducts]);

    cleanOpenedProduct();
  };

  const onDeleteProduct = () => {
    if (!productModalPayload?.product) {
      return;
    }

    setOrder(order => order.filter(p => p.id !== productModalPayload.product?.id));

    cleanOpenedProduct();
  };

  const onUpdateProduct = (quantity: number) => {
    if (!productModalPayload?.product) {
      return;
    }

    setOrder(order => {
      return [
        ...order.filter(p => p.id !== productModalPayload?.product?.id),
        ...new Array(quantity).fill(productModalPayload.product)
      ]
    });

    cleanOpenedProduct();
  }

  const cleanOpenedProduct = () => {
    setShowProductModal(false);
  };

  return <main>
    <div className='flex w-full flex-col sm:flex-row-reverse'>
      <OrderCart
        order={order}
        loadingMakeOrder={makeOrderResult.isLoading}
        onProductClick={(p, q) => onOpenProduct(p, q, true)}
        onMakeOrder={() => makeOrder(order)}
      />

      <OrderMenu
        menu={menu}
        isLoading={isLoading}
        onAddProduct={onOpenProduct} />
    </div>

    <ProductModal
      isOpen={showProductModal}
      product={productModalPayload?.product}
      quantity={productModalPayload?.quantity}
      isEdit={productModalPayload?.isEdit}
      onBackdropClick={cleanOpenedProduct}
      onSubmit={onAddProduct}
      onDelete={onDeleteProduct}
      onUpdate={onUpdateProduct}
      onConfirm={cleanOpenedProduct}
    />

    <SuccessModal isOpen={makeOrderResult.isSuccess}>
      Your order has been placed
    </SuccessModal>
  </main>;
};

export default OrderDetail;
