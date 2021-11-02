import { fakeBaseQuery } from '@reduxjs/toolkit/query';
import { Order } from '../../models/Order';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocFromServer,
  getDocsFromServer,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { firestore as db } from '../../core/firebase';
import { DbCollection } from '../../models/DbCollection';
import { Product } from '../../models/Product';
import { RootState } from '../store';
import { DateTime } from 'luxon';

const ordersApi = createApi({
  reducerPath: 'orders',
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getTodayOrders: builder.query<Order[], void>({
      queryFn: async () => {
        const today = DateTime.now().startOf('day');

        const orderQuery = query(
          collection(db, DbCollection.ORDERS),
          where('created', '>=', today.toJSDate()),
          orderBy('created', 'desc')
        );

        const response = await getDocsFromServer(orderQuery);

        return {
          data: response.docs.map(d => {
            return {
              ...d.data(),
              id: d.id
            } as Order
          })
        };
      }
    }),
    getOrder: builder.query<Order, string>({
      queryFn: async (id) => {
        const ref = doc(db, DbCollection.ORDERS, id);

        const order = await getDocFromServer(ref);

        return { data: order.data() as Order }
      }
    }),
    makeOrder: builder.query<void, Product[]>({
      queryFn: async (products, { getState }) => {
        const { auth: { user } } = getState() as RootState;

        const ref = collection(db, DbCollection.ORDERS);

        await addDoc(ref, {
          created: serverTimestamp(),
          author: user,
          products
        });

        return {
          data: void 0
        };
      }
    }),
    updateOrder: builder.query<void, { id: string; products: Product[]; }>({
      queryFn: async ({ id, products }) => {
        const ref = doc(db, DbCollection.ORDERS, id);

        await updateDoc(ref, { products });

        return {
          data: void 0
        };
      }
    }),
    deleteOrder: builder.query<void, string>({
      queryFn: async (id, { getState }) => {
        const ref = doc(db, DbCollection.ORDERS, id);

        await deleteDoc(ref);

        return {
          data: void 0
        };
      }
    })
  })
});

export default ordersApi;
