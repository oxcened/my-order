import { Product } from './Product';
import { Timestamp } from '@firebase/firestore';
import { User } from '@/modules/auth/User';

export type Order = {
  id: string;
  created: Timestamp;
  author: User;
  products: Product[];
  notes?: string;
};
