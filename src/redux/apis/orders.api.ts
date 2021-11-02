import { fakeBaseQuery } from '@reduxjs/toolkit/query';
import { Order } from '../../models/Order';
import { createApi } from '@reduxjs/toolkit/query/react';
import { addDoc, collection, getDocsFromServer, query, serverTimestamp, where, orderBy } from 'firebase/firestore';
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
      queryFn: () => {
        return {
          data: {
            id: 'adasd',
            author: { name: 'Alen' },
            products: [{
              id: '1',
              title: 'Carbonara'
            }, {
              id: '2',
              title: 'Acqua'
            }, {
              id: '3',
              title: 'Acqua'
            }],
            created: '12-10-2021'
          }
        };
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
    })
  })
});

export default ordersApi;
