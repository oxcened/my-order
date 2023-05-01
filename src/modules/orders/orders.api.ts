import { fakeBaseQuery } from '@reduxjs/toolkit/query';
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
import { httpsCallable } from 'firebase/functions';
import { firestore as db, functions } from '@/common/utils/firebase';
import { DateTime } from 'luxon';
import { Order, OrderDraft } from '@/modules/orders';
import { DbCollection } from '@/common/models/DbCollection';
import { RootState } from '@/common/utils/store';
import { User } from '@/modules/auth';

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
            } as Order;
          })
        };
      }
    }),
    getOrder: builder.query<Order, string>({
      queryFn: async (id) => {
        const ref = doc(db, DbCollection.ORDERS, id);

        try {
          const order = await getDocFromServer(ref);

          if (order.exists()) {
            return { data: order.data() as Order };
          } else {
            return { error: new Error('Not found') };
          }
        } catch (e) {
          console.error(e);
          return { error: e };
        }
      }
    }),
    makeOrder: builder.query<void, OrderDraft>({
      queryFn: async (order, { getState }) => {
        const { auth: { user } } = getState() as RootState;

        const ref = collection(db, DbCollection.ORDERS);

        await addDoc(ref, {
          created: serverTimestamp(),
          author: user,
          ...order
        });

        return {
          data: void 0
        };
      }
    }),
    updateOrder: builder.query<void, { id: string; order: OrderDraft; }>({
      queryFn: async ({ id, order }) => {
        const ref = doc(db, DbCollection.ORDERS, id);

        await updateDoc(ref, order);

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
    }),
    printOrderSummary: builder.query<void, {
      amount: number;
      orders: number;
      paid: boolean;
      author: User;
    }>({
      queryFn: async (args) => {
        try {
          const fun = httpsCallable<typeof args, {
            updates: { updatedRows: number }
          }>(functions, 'printOrderSummary');

          const res = await fun(args);

          if (res.data.updates.updatedRows > 0) {
            return {
              data: void 0
            };
          } else {
            return { error: new Error('Something went wrong during submission') };
          }
        } catch (error) {
          return { error };
        }
      }
    })
  })
});

export default ordersApi;
