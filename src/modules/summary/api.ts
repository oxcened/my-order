import { fakeBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { collection, getDocsFromServer, orderBy, query, where } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { firestore as db, functions } from '@/common/utils/firebase';
import { DateTime } from 'luxon';
import { DbCollection } from '@/common/models/DbCollection';
import { Order, SummaryOrder } from './models';

const api = createApi({
  reducerPath: 'summary',
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
    printOrderSummary: builder.query<void, SummaryOrder>({
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

export {
  api
};
