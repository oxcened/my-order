import { combineReducers, configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';
import ordersApi from './apis/orders.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import restaurantsApi from './apis/restaurants.api';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/auth.slice';

const reducerMap = {
  [ordersApi.reducerPath]: ordersApi.reducer,
  [restaurantsApi.reducerPath]: restaurantsApi.reducer,
  [authSlice.name]: authSlice.reducer
};

const reducer = combineReducers(reducerMap);

const persistedReducer = persistReducer({
  key: 'root',
  storage
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
        .concat(restaurantsApi.middleware)
    }
  });

  setupListeners(store.dispatch);

  const persistor = persistStore(store);

  return { store, persistor };
};

export type RootState = StateFromReducersMapObject<typeof reducerMap>;
