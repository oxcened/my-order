import { Product } from './Product';

export type OrderDraft = {
  products: Product[];
  notes: string;
};
