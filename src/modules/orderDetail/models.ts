import { Timestamp } from '@firebase/firestore';
import { User } from '@/modules/auth';

type Menu = {
  title: string;
  categories: {
    id: string;
    title: string;
    products: Product[];
  }[];
};

type OrderDraft = {
  products: Product[];
  notes?: string;
};

type Order = OrderDraft & {
  id: string;
  created: Timestamp;
  author: User;
};

type Product = {
  id: string;
  title: string;
  description?: string;
};

export type {
  Menu,
  OrderDraft,
  Order,
  Product
};
