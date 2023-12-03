import * as React from 'react';
import { useEffect, useState } from 'react';
import { CloudUploadIcon } from '@heroicons/react/outline';
import { api } from '../api';
import { useFailureModal, useSuccessModal } from '@/common/utils/hooks';
import locale from '@/common/utils/locale';
import { useAuth } from '@/modules/auth';
import { Product, SummaryOrderDraft } from '../models';
import { groupByKeyQuantity } from '@/common/utils/misc';
import Button from '@/common/components/Button/Button';
import LoadingCard from '@/common/components/LoadingCard';
import { PrintSummaryModal } from '../PrintSummaryModal/PrintSummaryModal';

const Summary = () => {
  const { data, isLoading } = api.useGetTodayOrdersQuery();
  const [printOrderSummary, printOrderSummaryRes] = api.useLazyPrintOrderSummaryQuery();
  const [showPrintModal, setShowPrintModal] = useState(false);
  const { renderModal: renderSuccess, showModal: showSuccess } = useSuccessModal({
    children: locale.pages.summary.submitSuccess
  });
  const { renderModal: renderFailure, showModal: showFailure } = useFailureModal();
  const { user } = useAuth();

  useEffect(() => {
    if (printOrderSummaryRes.isSuccess) {
      setShowPrintModal(false);
      showSuccess();
    }

    if (printOrderSummaryRes.isError) {
      setShowPrintModal(false);
      showFailure({
        text: (printOrderSummaryRes.error as Error).message
      });
    }
  }, [printOrderSummaryRes]);

  const onPrintConfirm = (data: SummaryOrderDraft) => {
    if (user) {
      printOrderSummary({ ...data, author: user });
    }
  };

  const getProducts = () => {
    if (!data?.length) {
      return <p className="my-2">Looks like there's nothing here</p>;
    }

    const products = data.reduce((res, curr) => {
      return [...res, ...curr.products];
    }, [] as Product[]);

    return (
      <div className="py-2 space-y-5">
        {groupByKeyQuantity(products, 'id').map(([product, quantity]) => {
          return <div
            key={product.id}
            className="flex items-center"
          >
            <div className="bg-gray-100 rounded-full font-bold block text-sm h-6 w-6 grid place-content-center">
              {quantity}
            </div>

            <span className="ml-3">{product.title}</span>
          </div>;
        })}
      </div>
    );
  };

  return <main>
    <p className="text-black text-3xl sm:text-5xl">{locale.pages.summary.title}</p>
    <p className="text-gray-500 text-2xl sm:text-3xl mt-1 sm:mt-2">{locale.pages.summary.subtitle}</p>

    <Button
      color="primary"
      className="mt-4"
      disabled={!data?.length}
      onClick={() => setShowPrintModal(true)}
    >
      <CloudUploadIcon className="h-5 mr-2" />
      {locale.pages.summary.submitButton}
    </Button>

    {isLoading
      ? <LoadingCard className="mt-3 sm:mt-5" />
      : <div className="mt-3 sm:mt-5 bg-white border rounded-md px-3 py-3 sm:max-w-md">
        {getProducts()}
      </div>}

    <PrintSummaryModal
      isOpen={showPrintModal}
      isLoading={printOrderSummaryRes.isLoading}
      orders={data?.length}
      onCancel={() => setShowPrintModal(false)}
      onBackdropClick={() => setShowPrintModal(false)}
      onConfirm={onPrintConfirm}
    />

    {renderSuccess}
    {renderFailure}
  </main>;
};

export {
  Summary
};
