import { configureStore } from '@reduxjs/toolkit';
import ordersApi from './apis/orders.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import restaurantsApi from './apis/restaurants.api';

const store = configureStore({
  devTools: true,
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    [restaurantsApi.reducerPath]: restaurantsApi.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware()
      .concat(ordersApi.middleware)
      .concat(restaurantsApi.middleware)
  }
});

export default store;

setupListeners(store.dispatch);
