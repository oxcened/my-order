import { fakeBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { collection, deleteDoc, doc, getDocsFromServer, orderBy, query, where } from 'firebase/firestore';
import { firestore as db } from '@/common/utils/firebase';
import { DateTime } from 'luxon';
import { DbCollection } from '@/common/models/DbCollection';
import { Order } from './models';

const api = createApi({
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

export {
  api
};
