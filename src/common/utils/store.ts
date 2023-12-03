import { combineReducers, configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ordersApi } from '@/modules/orders';
import { orderDetailApi } from '@/modules/orderDetail';
import { summaryApi } from '@/modules/summary';
import { authSlice, avatarModalSlice } from '@/modules/auth';

const reducerMap = {
  [ordersApi.reducerPath]: ordersApi.reducer,
  [orderDetailApi.reducerPath]: orderDetailApi.reducer,
  [summaryApi.reducerPath]: summaryApi.reducer,
  [authSlice.name]: authSlice.reducer,
  [avatarModalSlice.name]: avatarModalSlice.reducer
};

const reducer = combineReducers(reducerMap);

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  whitelist: [authSlice.name]
}, reducer);

export default (preloadedState = {}) => {
  const store = configureStore({
    devTools: true,
    reducer: persistedReducer,
    preloadedState,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
        .concat(ordersApi.middleware)
        .concat(orderDetailApi.middleware)
        .concat(summaryApi.middleware);
    }
  });

  setupListeners(store.dispatch);

  const persistor = persistStore(store);

  return { store, persistor };
};

export type RootState = StateFromReducersMapObject<typeof reducerMap>;
