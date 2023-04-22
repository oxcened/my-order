import { combineReducers, configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ordersApi from '@/modules/orders/orders.api';
import authSlice from '@/modules/auth/auth.slice';
import restaurantsApi from '@/modules/orderDetail/restaurants.api';
import avatarModalSlice from '@/modules/auth/AvatarModal/avatarModal.slice';

const reducerMap = {
  [ordersApi.reducerPath]: ordersApi.reducer,
  [restaurantsApi.reducerPath]: restaurantsApi.reducer,
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
        .concat(restaurantsApi.middleware);
    }
  });

  setupListeners(store.dispatch);

  const persistor = persistStore(store);

  return { store, persistor };
};

export type RootState = StateFromReducersMapObject<typeof reducerMap>;
