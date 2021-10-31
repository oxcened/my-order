import { Product } from './Product';

export type Order = {
  id: string;
  created: string;
  author: string;
  products: Product[];
};
