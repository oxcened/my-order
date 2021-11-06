import Modal from './Modal';
import * as React from 'react';
import { ChangeEventHandler, ComponentPropsWithoutRef, FormEventHandler, useState } from 'react';
import Button from './Button';
import { CurrencyEuroIcon } from '@heroicons/react/outline';
import Checkbox from './Checkbox';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PrintOrderSummaryModal = (
  {
    isLoading,
    onCancel,
    onConfirm,
    ...props
  }: {
    isLoading?: boolean,
    onCancel?: () => void;
    onConfirm?: (amount: number, paid: boolean) => void;
  } & ComponentPropsWithoutRef<typeof Modal>) => {
  const [amount, setAmount] = useState<number>();
  const [paid, setPaid] = useState(false);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (amount) {
      onConfirm?.(amount, paid);
    }
  };

  const onAmountChange: ChangeEventHandler<HTMLInputElement> = ({ target: { valueAsNumber } }) => {
    if (isNaN(valueAsNumber)) {
      setAmount(undefined);
    } else {
      setAmount(valueAsNumber);
    }
  };

  const onPaidChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPaid(e.target.checked);
  };

  return <Modal
    className='text-center'
    {...props}
  >

    <p className='text-xl font-bold'>
      Submit to Google Sheets
    </p>

    <form onSubmit={onSubmit} className='mt-6'>
      <div className='flex items-center'>
        <CurrencyEuroIcon className='h-7 mr-3 text-gray-500' />

        <input
          className='w-full rounded-md shadow-inner bg-gray-100 p-3'
          placeholder='Insert total amount'
          value={amount}
          type='number'
          onChange={onAmountChange}
        />
      </div>

      <div className='flex pt-6 items-center'>
        <Checkbox
          id='amount-settled'
          checked={paid}
          onChange={onPaidChange}
        />

        <label htmlFor='amount-settled' className='ml-4 cursor-pointer'>
          Amount settled
        </label>
      </div>

      <Button
        disabled={!amount || isLoading}
        color='primary'
        className='w-full mt-6 justify-center'>

        {isLoading
        && <FontAwesomeIcon icon={faCircleNotch} className='animate-spin h-4 w-5 mr-2' />}
        Confirm
      </Button>
    </form>
  </Modal>;
};

export default PrintOrderSummaryModal;
