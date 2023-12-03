import { User } from '@/modules/auth';
import { Timestamp } from '@firebase/firestore';

type SummaryOrderDraft = {
  amount: number;
  orders: number;
  paid: boolean;
};

type SummaryOrder = SummaryOrderDraft & {
  author: User;
};

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
  SummaryOrderDraft,
  SummaryOrder,
  Order,
  Product
};
