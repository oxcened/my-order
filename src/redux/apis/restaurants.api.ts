import { fakeBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Menu } from '../../models/Menu';
import { collection, getDocsFromServer, limit, query } from 'firebase/firestore';
import { firestore as db } from '../../core/firebase';
import { DbCollection } from '../../models/DbCollection';

const restaurantsApi = createApi({
  reducerPath: 'restaurants',
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getRestaurantMenu: builder.query<Menu, void>({
      queryFn: async (arg, { getState }) => {
        const orderQuery = query(
          collection(db, DbCollection.RESTAURANTS),
          limit(1)
        );

        const response = await getDocsFromServer(orderQuery);

        return {
          data: response.docs[0].data() as Menu
        };
      }
    })
  })
});

export default restaurantsApi;
