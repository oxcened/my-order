import { Product } from './Product';

export type Menu = {
  categories: {
    id: string;
    title: string;
    products: Product[];
  }[];
};
