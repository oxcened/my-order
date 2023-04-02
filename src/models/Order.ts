import { Product } from './Product';
import { User } from './User';
import { Timestamp } from '@firebase/firestore';

export type Order = {
  id: string;
  created: Timestamp;
  author: User;
  products: Product[];
  notes?: string;
};
