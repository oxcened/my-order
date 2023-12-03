import { fakeBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  addDoc,
  collection,
  doc,
  getDocFromServer,
  getDocsFromServer,
  limit,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { firestore as db } from '@/common/utils/firebase';
import { DbCollection } from '@/common/models/DbCollection';
import { Menu, Order, OrderDraft } from './models';
import { RootState } from '@/common/utils/store';

const api = createApi({
  reducerPath: 'restaurants',
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getRestaurantMenu: builder.query<Menu, void>({
      queryFn: async () => {
        const orderQuery = query(
          collection(db, DbCollection.RESTAURANTS),
          limit(1)
        );

        const response = await getDocsFromServer(orderQuery);

        return {
          data: response.docs[0].data() as Menu
        };
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
    })
  })
});

export {
  api
};
