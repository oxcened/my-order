import { Product } from './Product';
import { User } from './User';

export type Order = {
  id: string;
  created: string;
  author: User;
  products: Product[];
  notes?: string;
};
