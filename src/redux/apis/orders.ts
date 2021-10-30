import { fakeBaseQuery } from '@reduxjs/toolkit/query';
import { Order } from '../../models/Order';
import { createApi } from '@reduxjs/toolkit/query/react';

const ordersApi = createApi({
  reducerPath: 'orders',
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getTodayOrders: builder.query<Order[], void>({
      queryFn: () => {
        return {
          data: [{
            id: 'adasd',
            author: 'Alen',
            content: ['Acqua', 'Carbonara', 'Acqua'],
            created: '12-10-2021'
          }, {
            id: 'adasd',
            author: 'Alen',
            content: ['Acqua', 'Carbonara', 'Carbonara', 'Acqua', 'Pizza margherita'],
            created: '12-10-2021'
          }]
        };
      }
    })
  })
});

export default ordersApi;
