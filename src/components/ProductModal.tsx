import IconButton from './IconButton';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import Button from './Button';
import Modal from './Modal';
import * as React from 'react';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { Product } from '../models/Product';

const ProductModal = ({ product, onSubmit, ...props }: {
  product?: Product,
  onSubmit?: (quantity: number) => void;
} & ComponentPropsWithoutRef<typeof Modal>) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) {
      // Clean quantity on product change
      setQuantity(1);
    }
  }, [product]);

  return <Modal
    className='text-center'
    isOpen={!!product}
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

      <Button
        color='primary'
        className='mt-8 w-full justify-center'
        onClick={() => onSubmit?.(quantity)}
      >
        Add to Order
      </Button>
    </>}
  </Modal>;
};

export default ProductModal;
