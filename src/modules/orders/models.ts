import { Timestamp } from '@firebase/firestore';
import { User } from '@/modules/auth';

type Order = {
  id: string;
  created: Timestamp;
  author: User;
  products: Product[];
  notes?: string;
};

type Product = {
  id: string;
  title: string;
  description?: string;
};

export type {
  Order,
  Product
};
