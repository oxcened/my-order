import * as React from 'react';
import OrderCart from './cart/OrderCart';
import { useLoaderData } from 'react-router-dom';
import { useDocumentScroll } from '@/common/utils/hooks';
import ProductModal from '@/modules/orderDetail/ProductModal';
import restaurantsApi from '@/modules/orderDetail/restaurants.api';
import OrderMenu from '@/modules/orderDetail/OrderMenu';
import { twMerge } from 'tailwind-merge';
import { useCart } from '@/modules/orderDetail/cart/useCart';
import Button from '@/common/components/Button/Button';
import locale from '@/common/utils/locale';

export type HeaderProps = {
  title?: string;
  counter: number;
  isLoading?: boolean;
  onButtonClick?: () => void;
};

const Header = ({ title, counter, isLoading, onButtonClick }: HeaderProps) => {
  const isScrolled = useDocumentScroll();

  return (
    <div className={twMerge('bg-white z-10 py-5 sticky top-[79px]', isScrolled && 'shadow-sm')}>
      <div
        className="container mx-auto px-4 sm:px-8 flex flex-row justify-between items-center gap-5">
        <div>
          <p className="text-black text-lg">
            {title}
          </p>
          <div className="text-gray-500 flex items-center">
            {title}
          </div>
        </div>

        <Button
          color="primary"
          onClick={onButtonClick}
          className="hidden sm:flex"
          disabled={isLoading || !counter}
        >
          {locale.pages.orderDetail.submitOrder}
          {!!counter && (
            <span className="bg-black/10 rounded-full px-1.5 ml-2">{counter}</span>
          )}
        </Button>
      </div>
    </div>
  );
};

const OrderDetail = () => {
  const { isEdit } = useLoaderData() as { isEdit: boolean; id?: string; };
  const { data: menu, isLoading } = restaurantsApi.useGetRestaurantMenuQuery();

  const {
    openCart,
    closeCart,
    isCartOpen,
    order,
    postOrderResult,
    notes,
    makeSuccessModal,
    updateSuccessModal,
    isProductModalOpen,
    productModalPayload,
    makeOrder,
    deleteProduct,
    updateProduct,
    addProduct,
    cleanOpenedProduct,
    setNotes,
    openProduct
  } = useCart();

  return <main>
    <Header
      title={menu?.title}
      isLoading={postOrderResult.isLoading}
      onButtonClick={makeOrder}
      counter={order.length}
    />

    <div className="container mx-auto px-4 sm:px-8 flex w-full gap-10">
      <OrderMenu
        menu={menu}
        isLoading={isLoading}
        onAddProduct={openProduct} />

      <OrderCart
        order={order}
        notes={notes}
        isEdit={isEdit}
        loadingMakeOrder={postOrderResult.isLoading}
        onProductClick={(p, q) => openProduct(p, q, true)}
        onMakeOrder={makeOrder}
        onNotesChange={setNotes}
      />
    </div>

    <Button color="primary" onClick={openCart} className="rounded-full fixed bottom-0 right-0 m-5 sm:hidden">
      {locale.pages.orderDetail.openCartButton}
      <span className="bg-black/10 rounded-full px-1.5 ml-2">{order.length}</span>
    </Button>

    <ProductModal
      isOpen={isProductModalOpen}
      product={productModalPayload?.product}
      quantity={productModalPayload?.quantity}
      isEdit={productModalPayload?.isEdit}
      onBackdropClick={cleanOpenedProduct}
      onSubmit={addProduct}
      onDelete={deleteProduct}
      onUpdate={updateProduct}
      onConfirm={cleanOpenedProduct}
    />

    {makeSuccessModal}
    {updateSuccessModal}
  </main>;
};

export default OrderDetail;
