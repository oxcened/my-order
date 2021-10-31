import { fakeBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Menu } from '../../models/Menu';

const restaurantsApi = createApi({
  reducerPath: 'restaurants',
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getRestaurantMenu: builder.query<Menu, void>({
      queryFn: (arg, { getState }) => {
        return {
          data: {
            categories: [{
              id: '1',
              title: 'Pasta',
              products: [{
                id: '1',
                title: 'Carbonara'
              },{
                id: '2',
                title: 'Carbonara'
              },{
                id: '3',
                title: 'Carbonara'
              }]
            }, {
              id: '2',
              title: 'Pasta',
              products: [{
                id: '1',
                title: 'Carbonara'
              }]
            }, {
              id: '3',
              title: 'Pasta',
              products: [{
                id: '1',
                title: 'Carbonara'
              }]
            }]
          }
        };
      }
    })
  })
});

export default restaurantsApi;
