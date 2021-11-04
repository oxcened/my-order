import { Product } from './Product';

export type Menu = {
  title: string;
  categories: {
    id: string;
    title: string;
    products: Product[];
  }[];
};
