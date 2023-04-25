import * as React from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import locale from '@/common/utils/locale';
import { Menu } from '@/modules/orderDetail/Menu';
import { Product } from '@/modules/orders/Product';
import Accordion from '@/common/components/Accordion/Accordion';
import LoadingAccordion from '@/common/components/LoadingAccordion';
import AccordionList from '@/common/components/AccordionList';
import AccordionBody from '@/common/components/AccordionBody';
import AccordionHeader from '@/common/components/AccordionHeader';
import IconButton from '@/common/components/IconButton';

const OrderMenu = ({ menu, isLoading, onAddProduct }: {
  menu?: Menu;
  isLoading?: boolean;
  onAddProduct?: (product: Product) => void;
}) => {
  const mCategories = menu?.categories.map(({ id, title, products }) => {
    const mProducts = products.map(p => {
      return <div
        key={p.id}
        className="bg-white p-4 border rounded-xl cursor-pointer"
        onClick={() => onAddProduct?.(p)}
      >
        <div className="flex justify-between items-center">
          <span className="font-bold text-md">{p.title}</span>

          <IconButton className="w-7 h-7" color="primary">
            <PlusIcon className="w-4" />
          </IconButton>
        </div>

        {p.description && <span>{p.description}</span>}
      </div>;
    });

    return <Accordion key={id} id={id}>
      <AccordionHeader className="font-bold">
        {title}
      </AccordionHeader>

      <AccordionBody className="space-y-3">
        {mProducts}
      </AccordionBody>
    </Accordion>;
  });

  return <div className="flex-1">
    <p className="text-lg mb-3">{locale.components.orderMenu.title}</p>

    {isLoading ? (
      new Array(3)
        .fill(undefined)
        .map((value, index) => <LoadingAccordion key={index} />)
    ) : (
      <AccordionList>
        {mCategories}
      </AccordionList>
    )}
  </div>;
};

export default OrderMenu;
