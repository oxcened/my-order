import { Timestamp } from '@firebase/firestore';
import { User } from '@/modules/auth';

export type Order = {
  id: string;
  created: Timestamp;
  author: User;
  products: Product[];
  notes?: string;
};

export type Product = {
  id: string;
  title: string;
  description?: string;
};
