import { ChevronLeftIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import locale from '@/common/utils/locale';
import IconButton from '@/common/components/IconButton';
import Button from '@/common/components/Button/Button';
import Modal from '@/common/components/Modal/Modal';
import { Product } from '@/modules/orders/Product';
import { twMerge } from 'tailwind-merge';

const ProductModal = (
  {
    product,
    quantity: pQuantity,
    isEdit = false,
    onSubmit,
    onUpdate,
    onDelete,
    onConfirm,
    className,
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
    containerClass="z-30"
    className={twMerge("text-center", className)}
    {...props}
  >
    {product
      && <>
        <div className="grid grid-cols-[38px,1fr,38px] gap-5 items-center">
          <Button
            outline
            className="px-2 py-2"
            color="light"
            onClick={onConfirm}
          >
            <ChevronLeftIcon className="h-5" />
          </Button>

          <span className="font-medium">
            {product.title}
          </span>
        </div>

        <div className="flex items-center justify-center space-x-5 mt-8">
          <IconButton
            outline
            color="light"
            className="w-8 h-8"
            disabled={quantity < 2}
            onClick={() => setQuantity(q => q - 1)}
          >
            <MinusIcon className="h-5" />
          </IconButton>

          <p className="text-3xl">{quantity}</p>

          <IconButton
            outline
            color="light"
            className="w-8 h-8"
            onClick={() => setQuantity(q => q + 1)}
          >
            <PlusIcon className="h-5" />
          </IconButton>
        </div>

        <div className="mt-8">
          {isEdit
            && <Button
              color="danger"
              className="w-full justify-center mb-2"
              onClick={onDelete}
            >
              {locale.components.productModal.remove}
            </Button>}

          <Button
            color="dark"
            className="w-full justify-center"
            onClick={onSubmitClick}
          >
            {isUpdated
              ? locale.shared.update
              : isEdit
                ? locale.shared.confirm
                : locale.components.productModal.add}
          </Button>
        </div>
      </>}
  </Modal>;
};

export default ProductModal;
