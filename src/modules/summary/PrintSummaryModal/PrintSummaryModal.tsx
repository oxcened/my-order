import * as React from 'react';
import { ChangeEventHandler, ComponentPropsWithoutRef, FormEventHandler, useEffect, useState } from 'react';
import { CurrencyEuroIcon } from '@heroicons/react/outline';
import { UserGroupIcon } from '@heroicons/react/solid';
import locale from '@/common/utils/locale';
import Checkbox from '@/common/components/checkbox/Checkbox';
import Button from '@/common/components/button/Button';
import Modal from '@/common/components/modal/Modal';
import spinner from '@/common/images/spinner.svg';

const PrintSummaryModal = (
  {
    orders: pOrders,
    isLoading,
    onCancel,
    onConfirm,
    ...props
  }: {
    orders?: number,
    isLoading?: boolean,
    onCancel?: () => void;
    onConfirm?: (data: {
      amount: number;
      orders: number;
      paid: boolean;
    }) => void;
  } & ComponentPropsWithoutRef<typeof Modal>) => {
  const [amount, setAmount] = useState<number>();
  const [paid, setPaid] = useState(false);
  const [orders, setOrders] = useState(pOrders);

  useEffect(() => {
    if (props.isOpen) {
      setAmount(undefined);
      setOrders(pOrders);
      setPaid(false);
    }
  }, [props.isOpen]);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (amount && orders) {
      onConfirm?.({ amount, paid, orders });
    }
  };

  const onAmountChange: ChangeEventHandler<HTMLInputElement> = ({ target: { valueAsNumber } }) => {
    setAmount(isNaN(valueAsNumber) ? undefined : valueAsNumber);
  };

  const onOrdersChange: ChangeEventHandler<HTMLInputElement> = ({ target: { valueAsNumber } }) => {
    setOrders(isNaN(valueAsNumber) ? undefined : valueAsNumber);
  };

  const onPaidChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPaid(e.target.checked);
  };

  return <Modal
    className='text-center'
    {...props}
  >

    <p className='text-xl font-bold'>
      {locale.components.submitModal.title}
    </p>

    <form onSubmit={onSubmit} className='mt-6'>
      <div className='flex items-center'>
        <CurrencyEuroIcon className='h-7 mr-3 text-gray-500' />

        <input
          data-testid='price-input'
          className='w-full rounded-md shadow-inner bg-gray-100 p-3'
          placeholder={locale.components.submitModal.amountPlaceholder}
          value={amount}
          type='number'
          step={.01}
          onChange={onAmountChange}
        />
      </div>

      <div className='flex items-center pt-4'>
        <UserGroupIcon className='h-7 mr-3 text-gray-500' />

        <input
          data-testid='orders-input'
          className='w-full rounded-md shadow-inner bg-gray-100 p-3'
          placeholder={locale.components.submitModal.ordersPlaceholder}
          value={orders}
          type='number'
          onChange={onOrdersChange}
        />
      </div>

      <div className='flex pt-6 items-center'>
        <Checkbox
          id='amount-settled'
          checked={paid}
          onChange={onPaidChange}
        />

        <label htmlFor='amount-settled' className='ml-4 cursor-pointer select-none'>
          {locale.components.submitModal.amountSettled}
        </label>
      </div>

      <Button
        data-testid='submit-btn'
        disabled={!amount || !orders || isLoading}
        color='primary'
        className='w-full mt-6 justify-center'>

        {isLoading && (
          <img src={spinner} alt='loading' className='h-5 w-5 mr-2' />
        )}

        {locale.shared.submit}
      </Button>

      <Button
        data-testid='cancel-btn'
        color='light'
        type='button'
        className='w-full mt-2 justify-center'
        onClick={onCancel}>
        {locale.shared.cancel}
      </Button>
    </form>
  </Modal>;
};

export default PrintSummaryModal;
