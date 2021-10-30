import { configureStore } from '@reduxjs/toolkit';
import ordersApi from './apis/orders';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  devTools: true,
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(ordersApi.middleware)
  }
});

export default store;

setupListeners(store.dispatch);
