import * as React from 'react';
import { useEffect, useState } from 'react';
import ordersApi from '../redux/apis/orders.api';
import { Product } from '../models/Product';
import { groupByKeyQuantity } from '../core/utils';
import LoadingCard from '../components/LoadingCard';
import Button from '../components/Button';
import { CloudUploadIcon } from '@heroicons/react/outline';
import PrintOrderSummaryModal from '../components/PrintOrderSummaryModal';
import { useSuccessModal } from '../core/hooks';

const Summary = () => {
  const { data, isLoading } = ordersApi.useGetTodayOrdersQuery();
  const [printOrderSummary, printOrderSummaryRes] = ordersApi.useLazyPrintOrderSummaryQuery();
  const [showPrintModal, setShowPrintModal] = useState(false);
  const { renderSuccessModal, showSuccess } = useSuccessModal({
    children: 'Submitted successfully'
  });

  useEffect(() => {
    if (printOrderSummaryRes.isSuccess) {
      setShowPrintModal(false);
      showSuccess();
    }

    if (printOrderSummaryRes.isError) {
      // TODO
      setShowPrintModal(false);
    }
  }, [printOrderSummaryRes]);

  const onPrintOrderSummary = (amount: number, paid: boolean) => {
    if (!data) return;

    printOrderSummary({
      amount,
      orders: data.length,
      paid
    });
  };

  const getProducts = () => {
    if (!data?.length) {
      return <p className='my-2'>Looks like there's nothing here</p>;
    }

    const products = data.reduce((res, curr) => {
      return [...res, ...curr.products];
    }, [] as Product[]);

    return (
      <div className='py-2 space-y-5'>
        {groupByKeyQuantity(products, 'id').map(([product, quantity]) => {
          return <div
            key={product.id}
            className='flex items-center'
          >
            <div className='bg-gray-100 rounded-full font-bold block text-sm h-6 w-6 grid place-content-center'>
              {quantity}
            </div>

            <span className='ml-3'>{product.title}</span>
          </div>;
        })}
      </div>
    );
  };

  return <main>
    <p className='text-black text-3xl sm:text-5xl'>Today's orders</p>
    <p className='text-gray-500 text-2xl sm:text-3xl mt-1 sm:mt-2'>Summary</p>

    <Button
      color='primary'
      className='mt-4'
      disabled={!data?.length}
      onClick={() => setShowPrintModal(true)}
    >
      <CloudUploadIcon className='h-5 mr-2' />
      Submit to Google Sheets
    </Button>

    {isLoading
      ? <LoadingCard className='mt-3 sm:mt-5' />
      : <div className='mt-3 sm:mt-5 bg-white border rounded-md px-3 py-3 sm:max-w-md'>
        {getProducts()}
      </div>}

    <PrintOrderSummaryModal
      isOpen={showPrintModal}
      isLoading={printOrderSummaryRes.isLoading}
      onCancel={() => setShowPrintModal(false)}
      onBackdropClick={() => setShowPrintModal(false)}
      onConfirm={onPrintOrderSummary}
    />

    {renderSuccessModal}
  </main>;
};

export default Summary;
