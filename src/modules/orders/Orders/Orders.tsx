import * as React from "react";
import { useEffect } from "react";
import { ClipboardListIcon, PlusIcon } from '@heroicons/react/solid';
import { DateTime } from 'luxon';
import locale from '@/common/utils/locale';
import { useAuth } from '@/modules/auth';
import { useConfirmModal } from '@/common/utils/hooks';
import { api } from '../api';
import Button from '@/common/components/Button/Button';
import { OrderList } from '../OrderList/OrderList';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { data = [], refetch, isLoading } = api.useGetTodayOrdersQuery();
  const [deleteOrder, deleteOrderResult] = api.useLazyDeleteOrderQuery();
  const { user } = useAuth();
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

  const getTitle = () => {
    const now = DateTime.now().get('hour');

    const getKey = () => {
      if (now >= 0 && now <= 6) {
        return 'night';
      } else if (now >= 7 && now <= 12) {
        return 'morning';
      } else if (now >= 13 && now <= 19) {
        return 'afternoon';
      } else {
        return 'evening';
      }
    };

    return locale.formatString(locale.pages.index.title[getKey()], user?.name ?? locale.shared.userPlaceholder);
  };

  return (
    <main>
      <p className="text-black text-3xl sm:text-5xl">{getTitle()}</p>
      <div className="text-gray-500 text-2xl sm:text-3xl mt-1 sm:mt-2 flex items-center">
        {locale.pages.index.subtitle}

        <div
          className="ml-3 bg-gray-400 text-white rounded-full h-7 sm:h-8 grid place-content-center aspect-ratio-1 bg-opacity-80">
          <span className="block text-center text-lg sm:text-xl">{data?.length ?? 0}</span>
        </div>
      </div>

      <div className="flex mt-3 sm:mt-5">
        <Button className="mr-3" color="primary" onClick={() => navigate('/summary')}>
          <ClipboardListIcon className="h-5 mr-1 cursor-pointer" />
          {locale.pages.index.summaryButton}
        </Button>

        <Button className="items-center hidden sm:flex" color="primary" onClick={onMakeOrder}>
          <PlusIcon className="h-5 mr-1 cursor-pointer" />
          {locale.pages.index.makeOrderButton}
        </Button>
      </div>

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
    </main>
  );
};

export {
  Orders
};
