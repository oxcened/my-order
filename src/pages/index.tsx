import * as React from "react"
import { useEffect } from "react"
import { ClipboardListIcon, PlusIcon } from '@heroicons/react/solid';
import Button from '../components/Button';
import Orders from '../components/Orders';
import ordersApi from '../redux/apis/orders.api';
import { navigate } from 'gatsby';
import { useAuth, useConfirmModal } from '../core/hooks';
import { DateTime } from 'luxon';
import locale from '../core/locale';

const IndexPage = () => {
  const { data = [], refetch, isLoading } = ordersApi.useGetTodayOrdersQuery();
  const [deleteOrder, deleteOrderResult] = ordersApi.useLazyDeleteOrderQuery();
  const { user } = useAuth();
  const { renderConfirmModal, askConfirm } = useConfirmModal();

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
      <p className='text-black text-3xl sm:text-5xl'>{getTitle()}</p>
      <p className='text-gray-500 text-2xl sm:text-3xl mt-1 sm:mt-2'>{locale.pages.index.subtitle}</p>

      <div className='flex mt-3 sm:mt-5'>
        <Button className='mr-3' color='primary' onClick={() => navigate('/summary')}>
          <ClipboardListIcon className='h-5 mr-1 cursor-pointer' />
          {locale.pages.index.summaryButton}
        </Button>

        <Button className='items-center hidden sm:flex' color='primary' onClick={onMakeOrder}>
          <PlusIcon className='h-5 mr-1 cursor-pointer' />
          {locale.pages.index.makeOrderButton}
        </Button>
      </div>

      <Orders
        orders={data}
        isLoading={isLoading}
        onDelete={({ id }) => askConfirm(() => deleteOrder(id))} />

      <Button
        color='primary'
        className='rounded-full fixed bottom-0 right-0 m-5 shadow-lg sm:hidden'
        onClick={onMakeOrder}
      >
        <PlusIcon className='h-5 mr-1 cursor-pointer' />
        {locale.pages.index.makeOrderButton}
      </Button>

      {renderConfirmModal}
    </main>
  )
}

export default IndexPage
