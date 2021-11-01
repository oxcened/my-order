import IconButton from './IconButton';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import Button from './Button';
import Modal from './Modal';
import * as React from 'react';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { Product } from '../models/Product';

const ProductModal = (
  {
    product,
    quantity: pQuantity,
    isEdit = false,
    onSubmit,
    onUpdate,
    onDelete,
    onConfirm,
    ...props
  }: {
    product?: Product,
    quantity?: number;
    isEdit?: boolean;
    onSubmit?: (quantity: number) => void;
    onUpdate?: (quantity: number) => void;
    onDelete?: () => void;
    onConfirm?: () => void;
  } & ComponentPropsWithoutRef<typeof Modal>) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (props.isOpen) {
      setQuantity(pQuantity ?? 1);
    }
  }, [props.isOpen]);

  const isUpdated = isEdit && pQuantity !== quantity;

  const onSubmitClick = () => {
    if (isUpdated) {
      onUpdate?.(quantity);
    } else if (isEdit) {
      onConfirm?.();
    } else {
      onSubmit?.(quantity);
    }
  };

  return <Modal
    className='text-center'
    {...props}
  >
    {product
    && <>
      <div className='text-xl font-bold'>{product.title}</div>

      <div className='flex items-center justify-center space-x-5 mt-8'>
        <IconButton
          color='primary'
          className='w-7 h-7'
          disabled={quantity < 2}
          onClick={() => setQuantity(q => q - 1)}
        >
          <MinusIcon className='h-5 text-primary' />
        </IconButton>

        <p className='text-3xl'>{quantity}</p>

        <IconButton
          color='primary'
          className='w-7 h-7'
          onClick={() => setQuantity(q => q + 1)}
        >
          <PlusIcon className='h-5 text-primary' />
        </IconButton>
      </div>

      <div className='mt-8'>
        {isEdit
        && <Button
          color='danger'
          className='w-full justify-center mb-2'
          onClick={onDelete}
        >
          Remove from order
        </Button>}

        <Button
          color='primary'
          className='w-full justify-center'
          onClick={onSubmitClick}
        >
          {isUpdated
            ? 'Update'
            : isEdit
              ? 'Confirm'
              : 'Add to Order'}
        </Button>
      </div>
    </>}
  </Modal>;
};

export default ProductModal;
