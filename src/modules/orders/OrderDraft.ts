import { Product } from '@/modules/orders/Product';

export type OrderDraft = {
  products: Product[];
  notes: string;
};
