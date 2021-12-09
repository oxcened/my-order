import * as React from 'react';
import { ComponentProps, useEffect, useState } from 'react';
import ordersApi from '../redux/apis/orders.api';
import restaurantsApi from '../redux/apis/restaurants.api';
import OrderMenu from './OrderMenu';
import { Product } from '../models/Product';
import OrderCart from './OrderCart';
import ProductModal from './ProductModal';
import { navigate } from 'gatsby';
import { useSuccessModal } from '../core/hooks';
import locale from '../core/locale';

const OrderDetail = ({ id }: { id?: string }) => {
  const { data: menu, isLoading } = restaurantsApi.useGetRestaurantMenuQuery();
  const [getOrder, {
    data: cachedOrder,
    error: cachedOrderError
  }] = ordersApi.useLazyGetOrderQuery();
  const [makeOrder, makeOrderResult] = ordersApi.useLazyMakeOrderQuery();
  const [updateOrder, updateOrderResult] = ordersApi.useLazyUpdateOrderQuery();

  const [order, setOrder] = useState<Product[]>([]);

  const [showProductModal, setShowProductModal] = useState(false);

  const [productModalPayload, setProductModalPayload] =
    useState<Readonly<Pick<ComponentProps<typeof ProductModal>, 'product' | 'quantity' | 'isEdit'>>>();

  const { renderModal: makeSuccessModal, showModal: showMakeSuccess } = useSuccessModal({
    children: locale.pages.orderDetail.orderPlaceSuccess
  });
  const { renderModal: updateSuccessModal, showModal: showUpdateSuccess } = useSuccessModal({
    children: locale.pages.orderDetail.orderUpdateSuccess
  });

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, []);

  useEffect(() => {
    // Could not load order, exit
    if (cachedOrderError) {
      navigate('/404');
    }
  }, [cachedOrderError]);

  useEffect(() => {
    if (cachedOrder) {
      setOrder(cachedOrder.products);
    }
  }, [cachedOrder]);

  useEffect(() => {
    if (makeOrderResult.isSuccess) {
      showMakeSuccess({
        callback: () => navigate('/')
      });
    }

    if (updateOrderResult.isSuccess) {
      showUpdateSuccess({
        callback: () => navigate('/')
      });
    }
  }, [makeOrderResult, updateOrderResult]);

  const isEdit = !!id;

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

  const onMakeOrder = () => {
    if (isEdit && id) {
      updateOrder({ id, products: order });
    } else {
      makeOrder(order);
    }
  };

  return <main>
    <div className='flex w-full flex-col sm:flex-row-reverse'>
      <OrderCart
        order={order}
        isEdit={isEdit}
        loadingMakeOrder={makeOrderResult.isLoading}
        onProductClick={(p, q) => onOpenProduct(p, q, true)}
        onMakeOrder={onMakeOrder}
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

    {makeSuccessModal}
    {updateSuccessModal}
  </main>;
};

export default OrderDetail;
