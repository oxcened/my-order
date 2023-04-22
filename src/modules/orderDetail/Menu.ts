import { Product } from '@/modules/orders/Product';

export type Menu = {
  title: string;
  categories: {
    id: string;
    title: string;
    products: Product[];
  }[];
};
