import { useLoaderData, useNavigate } from 'react-router-dom';
import { ComponentProps, useEffect, useState } from 'react';
import { Product } from '@/modules/orders/Product';
import ProductModal from '@/modules/orderDetail/ProductModal';
import { useMediaQuery, useSuccessModal } from '@/common/utils/hooks';
import locale from '@/common/utils/locale';
import ordersApi from '@/modules/orders/orders.api';

export const useCart = () => {
  const navigate = useNavigate();
  const { isEdit, id } = useLoaderData() as { isEdit: boolean; id?: string; };
  const [isCartOpen, setCartOpen] = useState(false);
  const [order, setOrder] = useState<Product[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    if (!isMobile && isCartOpen) {
      setCartOpen(false);
    }
  }, [isMobile, isCartOpen]);

  const [productModalPayload, setProductModalPayload] =
    useState<Readonly<Pick<ComponentProps<typeof ProductModal>, 'product' | 'quantity' | 'isEdit'>>>();

  const { renderModal: makeSuccessModal, showModal: showMakeSuccess } = useSuccessModal({
    children: locale.pages.orderDetail.orderPlaceSuccess
  });
  const { renderModal: updateSuccessModal, showModal: showUpdateSuccess } = useSuccessModal({
    children: locale.pages.orderDetail.orderUpdateSuccess
  });

  const [getOrder] = ordersApi.useLazyGetOrderQuery();
  const [postOrder, postOrderResult] = ordersApi.useLazyMakeOrderQuery();
  const [updateOrder] = ordersApi.useLazyUpdateOrderQuery();

  useEffect(() => {
    if (id) {
      getOrder(id).unwrap()
        .then((data) => {
          setOrder(data.products);
          setNotes(data.notes ?? '');
        })
        .catch(() => {
          navigate('/404', { replace: true });
        });
    }
  }, []);

  const openProduct = (product: Product, quantity?: number, isEdit?: boolean) => {
    setProductModalOpen(true);
    setProductModalPayload({
      product,
      quantity: quantity ?? 1,
      isEdit: isEdit ?? false
    });
  };

  const addProduct = (quantity: number) => {
    if (!productModalPayload?.product) return;

    const newProducts = new Array(quantity).fill(productModalPayload.product);
    setOrder(prevState => [...prevState, ...newProducts]);
    setProductModalOpen(false);
  };

  const deleteProduct = () => {
    if (!productModalPayload?.product) return;

    setOrder(order => order.filter(p => p.id !== productModalPayload.product?.id));
    setProductModalOpen(false);
  };

  const updateProduct = (quantity: number) => {
    if (!productModalPayload?.product) return;

    setOrder(order => {
      return [
        ...order.filter(p => p.id !== productModalPayload?.product?.id),
        ...new Array(quantity).fill(productModalPayload.product)
      ];
    });

    setProductModalOpen(false);
  };

  const makeOrder = () => {
    if (isEdit && id) {
      updateOrder({
        id,
        order: { products: order, notes }
      }).then(() => {
        showUpdateSuccess({ callback: () => navigate('/') });
      });
    } else {
      postOrder({ products: order, notes })
        .then(() => {
          showMakeSuccess({ callback: () => navigate('/') });
        });
    }
  };

  return {
    isCartOpen,
    order,
    notes,
    postOrderResult,
    isProductModalOpen,
    productModalPayload,
    makeSuccessModal,
    updateSuccessModal,
    setNotes,
    addProduct,
    deleteProduct,
    updateProduct,
    makeOrder,
    openProduct,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    cleanOpenedProduct: () => setProductModalOpen(false)
  };
};
