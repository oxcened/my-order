import * as React from 'react';
import { ComponentProps, useEffect, useState } from 'react';
import OrderCart from './OrderCart';
import locale from '@/common/utils/locale';
import { useLoaderData, useNavigate } from 'react-router-dom';
import ordersApi from '@/modules/orders/orders.api';
import { Product } from '@/modules/orders/Product';
import { useSuccessModal } from '@/common/utils/hooks';
import ProductModal from '@/modules/orderDetail/ProductModal';
import restaurantsApi from '@/modules/orderDetail/restaurants.api';
import OrderMenu from '@/modules/orderDetail/OrderMenu';

const OrderDetail = () => {
  const navigate = useNavigate();
  const { isEdit, id } = useLoaderData() as { isEdit: boolean; id?: string; };

  const { data: menu, isLoading } = restaurantsApi.useGetRestaurantMenuQuery();
  const [getOrder, {
    data: cachedOrder,
    error: cachedOrderError
  }] = ordersApi.useLazyGetOrderQuery();
  const [makeOrder, makeOrderResult] = ordersApi.useLazyMakeOrderQuery();
  const [updateOrder, updateOrderResult] = ordersApi.useLazyUpdateOrderQuery();

  const [order, setOrder] = useState<Product[]>([]);
  const [notes, setNotes] = useState<string>('');

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
      navigate('/404', { replace: true });
    }
  }, [cachedOrderError]);

  useEffect(() => {
    if (cachedOrder) {
      setOrder(cachedOrder.products);

      setNotes(cachedOrder.notes ?? '');
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
      ];
    });

    cleanOpenedProduct();
  };

  const cleanOpenedProduct = () => {
    setShowProductModal(false);
  };

  const onMakeOrder = (notes: string) => {
    if (isEdit && id) {
      updateOrder({
        id,
        order: {
          products: order,
          notes
        }
      });
    } else {
      makeOrder({
        products: order,
        notes
      });
    }
  };

  return <main>
    <div className='flex w-full flex-col sm:flex-row-reverse'>
      <OrderCart
        order={order}
        notes={notes}
        isEdit={isEdit}
        loadingMakeOrder={makeOrderResult.isLoading}
        onProductClick={(p, q) => onOpenProduct(p, q, true)}
        onMakeOrder={onMakeOrder}
        onNotesChange={setNotes}
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
