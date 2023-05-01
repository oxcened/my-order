import * as React from "react";
import { useEffect } from "react";
import { ClipboardListIcon, DotsHorizontalIcon, PlusIcon } from '@heroicons/react/outline';
import locale from '@/common/utils/locale';
import { useConfirmModal, useDocumentScroll } from '@/common/utils/hooks';
import { OrderList, ordersApi } from '@/modules/orders';
import Button from '@/common/components/button/Button';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import IconButton from '@/common/components/iconButton/IconButton';
import Dropdown from '@/common/components/dropdown/Dropdown';
import DropdownMenu from '@/common/components/dropdown/DropdownMenu';

export type HeaderProps = {
  ordersLength: number;
  onMakeOrder?: () => void;
};

const Header = ({ ordersLength, onMakeOrder }: HeaderProps) => {
  const navigate = useNavigate();
  const isScrolled = useDocumentScroll();

  return (
    <div className={twMerge('bg-white z-10 py-5 sticky top-[79px]', isScrolled && 'shadow-sm')}>
      <div
        className="container mx-auto px-4 sm:px-8 flex flex-row justify-between items-center gap-5">
        <div>
          <p className="text-black text-lg">{locale.pages.index.title}</p>
          <div className="text-gray-500 flex items-center">
            {locale.formatString(locale.pages.index.subtitle, ordersLength)}
          </div>
        </div>

        <div className="gap-3 hidden sm:flex">
          <Button color="light" outline onClick={() => navigate('/summary')}>
            <ClipboardListIcon className="h-5 mr-1 cursor-pointer" />
            {locale.pages.index.summaryButton}
          </Button>

          <Button className="items-center" color="primary" onClick={onMakeOrder}>
            <PlusIcon className="h-5 mr-1 cursor-pointer" />
            {locale.pages.index.makeOrderButton}
          </Button>
        </div>

        <Dropdown id="orders-dropdown">
          <IconButton color="light" className="h-7 w-7 sm:hidden" id="orders-dropdown-toggle"
                      onClick={() => alert('ciao')}>
            <DotsHorizontalIcon className="w-5 h-5" />
          </IconButton>

          <DropdownMenu
            options={[{
              id: '1',
              label: locale.pages.index.summaryButton,
              icon: <ClipboardListIcon className="w-5 h-5" />
            }]}
            onClick={() => navigate('/summary')}
          />
        </Dropdown>
      </div>
    </div>
  );
};

const Orders = () => {
  const { data = [], refetch, isLoading } = ordersApi.useGetTodayOrdersQuery();
  const [deleteOrder, deleteOrderResult] = ordersApi.useLazyDeleteOrderQuery();
  const { renderConfirmModal, askConfirm } = useConfirmModal();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (deleteOrderResult.isSuccess) {
      refetch();
    }
  }, [deleteOrderResult]);

  const onMakeOrder = () => {
    navigate('/order/new');
  };

  return (
    <main>
      <Header ordersLength={data.length} onMakeOrder={onMakeOrder} />

      <div className="container mx-auto px-4 sm:px-8">
        <OrderList
          orders={data}
          isLoading={isLoading}
          onDelete={({ id }) => askConfirm(() => deleteOrder(id))} />

        <Button
          color="primary"
          className="rounded-full fixed bottom-0 right-0 m-5 shadow-lg sm:hidden"
          onClick={onMakeOrder}
        >
          <PlusIcon className="h-5 mr-1 cursor-pointer" />
          {locale.pages.index.makeOrderButton}
        </Button>

        {renderConfirmModal}
      </div>
    </main>
  );
};

export default Orders;
