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
              }, {
                id: '2',
                title: 'Amatriciana'
              }, {
                id: '3',
                title: 'Arrabbiata'
              }]
            }, {
              id: '2',
              title: 'Insalata',
              products: [{
                id: '4',
                title: 'Mista'
              }, {
                id: '5',
                title: 'Caprese'
              }]
            }, {
              id: '3',
              title: 'Bevande',
              products: [{
                id: '6',
                title: 'Coca cola'
              }, {
                id: '7',
                title: 'Sprite'
              }, {
                id: '8',
                title: 'Acqua minerale'
              }]
            }]
          }
        };
      }
    })
  })
});

export default restaurantsApi;
