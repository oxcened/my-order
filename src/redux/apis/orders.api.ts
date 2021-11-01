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
            id: '1',
            author: 'Alen',
            products: [{
              id: '1',
              title: 'Carbonara'
            }, {
              id: '2',
              title: 'Acqua'
            }, {
              id: '2',
              title: 'Acqua'
            }],
            created: '12-10-2021'
          }, {
            id: '2',
            author: 'Alen',
            products: [{
              id: '1',
              title: 'Carbonara'
            }, {
              id: '2',
              title: 'Acqua'
            }, {
              id: '2',
              title: 'Acqua'
            }, {
              id: '2',
              title: 'Acqua'
            }],
            created: '12-10-2021'
          }]
        };
      }
    }),
    getOrder: builder.query<Order, string>({
      queryFn: () => {
        return {
          data: {
            id: 'adasd',
            author: 'Alen',
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
    makeOrder: builder.query<void, Order>({
      queryFn: (arg) => {
        return new Promise((resolve => {
          window.setTimeout(() => {
            resolve({ data: void 0 });
          }, 1500);
        }));
      }
    })
  })
});

export default ordersApi;
