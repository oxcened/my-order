import { configureStore } from '@reduxjs/toolkit';
import ordersApi from './apis/orders';
import { setupListeners } from '@reduxjs/toolkit/query';
import restaurantsApi from './apis/restaurants';

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
